import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !email.includes('@') || !password || password.length < 6) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    
    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(filePath);
    let users = [];
    try {
      users = JSON.parse(fileData);
    } catch (e) {
      users = [];
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'User created', user: { name, email } });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
