export const passwordResetEmail = (token) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2 style="color: #2563eb;">Student Scheduler Password Reset</h2>
        <p>You requested a password reset. Click the link below to continue:</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${token}" 
           style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
          Reset Password
        </a>
        <p>If you didn't request this reset, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        <small style="color: #6b7280;">
          This link will expire in 1 hour. For security reasons, please do not share this email.
        </small>
      </div>
    `
  });