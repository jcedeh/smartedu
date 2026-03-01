
import { transporter } from '../config/mail.js';
import dotenv from 'dotenv';
dotenv.config();


//create send mail function
export const sendMail = async ({ to, subject, html })=> {

    const info = await transporter.sendMail(
      {
        from:process.env.EMAIL_USER,
        to: to,
        subject:subject,
        text: html
      }
      

    );
    console.log("email sent to user")

}