import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, message } = req.body;

  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'subscribers.json');
    
    if (!fs.existsSync(filePath)) {
        return res.status(200).json({ message: 'No subscribers found' });
    }

    const fileData = fs.readFileSync(filePath);
    const subscribers = JSON.parse(fileData);

    if (subscribers.length === 0) {
        return res.status(200).json({ message: 'No subscribers to notify' });
    }

    // Create a transporter using Ethereal for testing
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

    // Send emails
    const promises = subscribers.map(email => {
        return transporter.sendMail({
            from: '"Skill Directory Updates" <updates@skilldirectory.com>',
            to: email,
            subject: subject || "New Updates from Skill Directory",
            text: message || "Check out the latest skills and resources added to the directory!",
            html: `<div style="font-family: sans-serif;">
                    <h2>New Updates!</h2>
                    <p>${message || "Check out the latest skills and resources added to the directory!"}</p>
                    <a href="http://localhost:3000" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Visit Skill Directory</a>
                   </div>`,
        });
    });

    const results = await Promise.all(promises);
    
    const previewUrl = results.length > 0 ? nodemailer.getTestMessageUrl(results[0]) : null;

    console.log(`Sent notifications to ${subscribers.length} subscribers`);
    if (previewUrl) {
        console.log("Preview URL:", previewUrl);
    }

    return res.status(200).json({ 
        message: `Sent notifications to ${subscribers.length} subscribers`,
        previewUrl: previewUrl
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
