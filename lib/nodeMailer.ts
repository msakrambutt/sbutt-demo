import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    // Configure your email service
    service: 'gmail',
    host:'smtp.gmail.com',
    auth: {
      user: 'msakrambutt@gmail.com',
      pass: process.env.GMAIL_PWD,
    }
  });
  export const mailOptions={
    from: 'msakrambutt@gmail.com',
    to: 'msakrambutt@gmail.com',
      
  }