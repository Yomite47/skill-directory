import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'subscribers.json');
    
    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(filePath);
    let subscribers = [];
    try {
      subscribers = JSON.parse(fileData);
    } catch (e) {
      subscribers = [];
    }

    if (subscribers.includes(email)) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    subscribers.push(email);
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    // Send Welcome Email
    try {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        
        const info = await transporter.sendMail({
            from: '"Skill Directory" <no-reply@skilldirectory.com>',
            to: email,
            subject: "Welcome to Skill Directory! 🚀",
            text: "Thanks for subscribing! You'll be the first to know about new skills and resources.",
            html: "<b>Thanks for subscribing!</b><br>You'll be the first to know about new skills and resources.",
        });

        console.log("Welcome email sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (emailError) {
        console.error("Failed to send welcome email (simulated):", emailError);
    }

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
