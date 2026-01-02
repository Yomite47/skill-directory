import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

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
