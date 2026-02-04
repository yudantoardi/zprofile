import nodemailer from 'nodemailer';

// Email configuration - Matching .env.example names
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

const DEFAULT_RECIPIENT = 'yudantoardi@gmail.com';

export async function sendInquiryEmail(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
}) {
    // If EMAIL_SERVER_USER is not set, we can't send real emails
    if (!process.env.EMAIL_SERVER_USER) {
        console.log('--- MOCK EMAIL SENDING ---');
        console.log(`To: ${DEFAULT_RECIPIENT}`);
        console.log(`From: ${data.email}`);
        console.log(`Subject: New Inquiry from ${data.name}`);
        console.log(`Message: ${data.message}`);
        console.log('--- END MOCK ---');
        return true;
    }

    try {
        await transporter.sendMail({
            from: `"${data.name}" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`,
            to: DEFAULT_RECIPIENT,
            replyTo: data.email, // Crucial for anti-spam: user replies go to the sender
            subject: `[Contact Form] New Message from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nMessage:\n${data.message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h2 style="color: #1e293b; margin: 0; font-size: 24px;">New Inquiry Received</h2>
                        <p style="color: #64748b; margin: 4px 0 0;">Someone just filled out your contact form.</p>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #f1f5f9;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; width: 100px;"><strong>Name</strong></td>
                                <td style="padding: 8px 0; color: #1e293b;">: ${data.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td>
                                <td style="padding: 8px 0; color: #1e293b;">: <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Phone</strong></td>
                                <td style="padding: 8px 0; color: #1e293b;">: ${data.phone || 'Not provided'}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #64748b; margin-bottom: 8px;"><strong>Message:</strong></p>
                            <div style="color: #1e293b; line-height: 1.6; white-space: pre-wrap; background: white; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0;">${data.message}</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 32px; font-size: 12px; color: #94a3b8;">
                        <p style="margin: 0;">This email was sent automatically from your Company Profile Website.</p>
                    </div>
                </div>
            `,
            headers: {
                'X-Priority': '1 (Highest)',
                'X-MSMail-Priority': 'High',
                'Importance': 'High',
            }
        });
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
