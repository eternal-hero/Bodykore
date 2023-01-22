import { EMAIL_CONFIG, getTransporter } from "./config";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
dayjs.extend(timezone)

export interface IemailData {
    name: string,
    phone: string,
    email: string,
    message: string,
    timestamp: string,
}

export const sendEmail = async (emailData: any) => {
    const transporter = getTransporter();
    try {
        const info = await transporter.sendMail({
            from: EMAIL_CONFIG.USERNAME, // sender address
            to: EMAIL_CONFIG.EMAIL_TO,
            subject: `Contact inqury from ${emailData.name}`,
            html: toHTML({ ...emailData }),
        });

        transporter.close();
        return { status: true, messageId: info.messageId };
    } catch (e) {
        console.error(e); // Uncomment for dev
        transporter.close();
        return { status: false, messageId: 'Failed to send email' };
    }
};


export const toHTML = (
    {
      name,
      phone,
      email,
      message,
      timestamp,
    }:IemailData,
  ) => {
    return (
        `<!DOCTYPE html>
        <html>
        <body>
        <h3>Contact Inquiry</h3>
        <p>First name: ${name || ''}</p>
        <p>Email: ${email || ''}</p>
        <p>Phone: ${phone || ''}</p>
        <p>Message: ${message || ''}</p>
        <p>Date, Time: ${dayjs(timestamp).tz('America/Los_Angeles').format('MMM DD YYYY, HH:mm') || ''}</p>
        </body>
        </html>`
    );
  };