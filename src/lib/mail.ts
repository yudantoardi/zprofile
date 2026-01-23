import nodemailer from 'nodemailer';

// Email configuration - In production, these should be in .env
// For now, these are placeholders that the user can update
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const DEFAULT_RECIPIENT = 'yudantoardi@gmail.com';

export async function sendInquiryEmail(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
}) {
    // If SMTP_USER is not set, we can't send real emails
    // But we'll log it as if we were sending
    if (!process.env.SMTP_USER) {
        console.log('--- MOCK EMAIL SENDING ---');
        console.log(`To: ${DEFAULT_RECIPIENT}`);
        console.log(`Subject: New Inquiry from ${data.name}`);
        console.log(`Body: ${data.message}`);
        console.log('--- END MOCK ---');
        return true;
    }

    try {
        await transporter.sendMail({
            from: `"Company Website" <${process.env.SMTP_USER}>`,
            to: DEFAULT_RECIPIENT,
            subject: `New Inquiry from ${data.name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
                    <h2 style="color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Inquiry Received</h2>
                    <p>You have received a new message from your website contact form.</p>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
                        <p style="margin-top: 20px;"><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${data.message}</p>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #64748b;">
                        This email was sent automatically from your website CMS.
                    </p>
                </div>
            `,
        });
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
