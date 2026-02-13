import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendInquiryEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        const newMessage = await prisma.message.create({
            data: {
                name,
                email,
                phone,
                message,
                subject: 'New Inquiry from Contact Form'
            }
        });

        /* 
        // Send email notification (don't await to avoid blocking response)
        sendInquiryEmail({ name, email, phone, message }).catch(err =>
            console.error('Email notification failed:', err)
        );
        */

        return NextResponse.json(newMessage);
    } catch (error) {
        console.error('Failed to save message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
