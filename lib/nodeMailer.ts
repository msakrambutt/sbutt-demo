import nodemailer, { TransportOptions } from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:process.env.SERVICE_NAME,
    host:process.env.HOST_NAME,
    auth: {
      user:process.env.MAIL_ID,
      pass:process.env.MAIL_PWD,
    }
  }as TransportOptions);
  export const mailOptions={
    from:process.env.MAIL_ID,
  }