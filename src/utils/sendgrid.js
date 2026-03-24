// utils/sendEmail.js

import dotenv from 'dotenv';

dotenv.config();

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(process.env.SENDGRID_API_KEY)

export const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: "smartedu.support@gmail.com", // MUST be verified in SendGrid
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error("Email error:", error.response?.body || error.message);
  }
};