
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 0. Hardcoded Demo User (Always works)
        if (credentials.email === 'demo@example.com' && credentials.password === 'password123') {
          return { email: 'demo@example.com', name: 'Demo User' };
        }

        // Try connecting to MongoDB first
        try {
          const hasDbConnection = await dbConnect();
          
          if (hasDbConnection) {
            const user = await User.findOne({ email: credentials.email });
            
            if (!user) {
              throw new Error('No user found with this email');
            }

            const isValid = await bcrypt.compare(credentials.password, user.password);

            if (!isValid) {
              throw new Error('Invalid password');
            }

            return { email: user.email, name: user.name };
          }
        } catch (error) {
          // If DB connection fails or error occurs, fall through to file system check
          // But if it was a user/password error from DB, we should rethrow it
          if (error.message === 'No user found with this email' || error.message === 'Invalid password') {
            throw error;
          }
          console.error('Database auth error, falling back to file system:', error);
        }

        // Fallback to File System (for local dev without DB)
        const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
        
        if (!fs.existsSync(filePath)) {
          throw new Error('No users found');
        }

        const fileData = fs.readFileSync(filePath);
        const users = JSON.parse(fileData);

        const user = users.find(u => u.email === credentials.email);

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { email: user.email, name: user.name };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-this',
  pages: {
    signIn: '/auth/login',
  }
});
