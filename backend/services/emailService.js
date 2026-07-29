const nodemailer = require('nodemailer');

const createTransporter = async () => {
  // Defensive fallbacks for development/tests
  const isDummyHost = !process.env.EMAIL_HOST || process.env.EMAIL_HOST.includes('mailtrap');
  const isMocked = !process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_mailtrap_user';

  if (isMocked) {
    console.log('Using simulated/test email transporter (development fallback).');
    // We can return a mock transporter that logs rather than throws
    return {
      sendMail: async (mailOptions) => {
        console.log('\n--- SIMULATED EMAIL DISPATCH ---');
        console.log(`From: ${mailOptions.from}`);
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body (Text):\n${mailOptions.text}`);
        console.log('---------------------------------\n');
        return { messageId: 'simulated-id-' + Date.now() };
      },
    };
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: parseInt(process.env.EMAIL_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendContactEmail = async ({ toEmail, senderName, senderEmail, message, username }) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"${senderName} via CodeFolio" <${process.env.EMAIL_FROM || 'noreply@portfoliobuilder.com'}>`,
      to: toEmail,
      replyTo: senderEmail,
      subject: `New Portfolio Message from ${senderName} (${username}'s Profile)`,
      text: `You have received a new message from your portfolio contact form:
      
Name: ${senderName}
Email: ${senderEmail}
Message:
${message}

---
Sent via CodeFolio Portfolio Builder`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #4F46E5; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px;">New Message Received</h2>
          <p>Hi <strong>${username}</strong>,</p>
          <p>You have received a new contact submission from your portfolio page:</p>
          <div style="background-color: #F9FAFB; padding: 15px; border-radius: 8px; border: 1px solid #E5E7EB; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${senderName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #4B5563;">"${message}"</p>
          </div>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 30px;">
            This email was sent to you because someone submitted a form on your CodeFolio page.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully routed: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Failed to send contact email:', error.message);
    throw new Error(`Email delivery failure: ${error.message}`);
  }
};

module.exports = {
  sendContactEmail,
};
