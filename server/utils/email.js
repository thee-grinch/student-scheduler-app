import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: 'Student Scheduler <noreply@studentscheduler.com>',
    to,
    subject,
    text,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #2563eb;">Student Scheduler Notification</h2>
      <p>${text}</p>
      <hr style="margin: 20px 0;">
      <small>This is an automated message. Please do not reply.</small>
    </div>`
  };

  await transporter.sendMail(mailOptions);
};