import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import ErrorApp from '@shared/errors/ErrorApp';
config();

class EmailConfig {
  to: string;
  subject: string;
  html: string;

  sendEmail(): void {
    const mailOptions = {
      from: process.env.USER,
      to: this.to,
      subject: this.subject,
      html: this.html,
    };

    const transport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new ErrorApp(error.message);
      }
    });
  }
}

export default EmailConfig;
