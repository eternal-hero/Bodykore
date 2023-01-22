import mg from "nodemailer-mailgun-transport";
import nodemailer from "nodemailer";

export const EMAIL_CONFIG = {
  EMAIL_TO: process.env.EMAIL_TO,
  HOST: process.env.EMAIL_SMTP_HOST,
  PORT: parseInt(process.env.EMAIL_SMTP_PORT || "0", 10),
  USERNAME: process.env.EMAIL_SMTP_USERNAME,
  PASSWORD: process.env.EMAIL_SMTP_PASSWORD,
}
// create reusable transporter object using the default SMTP transport
export const getTransporter = () => {
   return nodemailer.createTransport({
    host: EMAIL_CONFIG.HOST,
    port: EMAIL_CONFIG.PORT,
    secure: true, // true for 465, false for other ports
    pool: true,
    auth: {
      user: EMAIL_CONFIG.USERNAME,
      pass: EMAIL_CONFIG.PASSWORD,
    },
  });

}
