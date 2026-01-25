import prisma from '@/lib/prisma';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch data on server side with error handling
    let unreadCount = 0;
    try {
        if (process.env.DATABASE_URL) {
            unreadCount = await prisma.message.count({ where: { isRead: false } });
        }
    } catch {
        console.error('Failed to fetch unread messages');
    }

    return (
        <AdminLayoutClient unreadCount={unreadCount}>
            {children}
        </AdminLayoutClient>
    );
}