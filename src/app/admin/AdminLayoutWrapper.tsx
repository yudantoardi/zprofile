import prisma from '@/lib/prisma';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch data on server side
    const unreadCount = await prisma.message.count({ where: { isRead: false } });

    return (
        <AdminLayoutClient unreadCount={unreadCount}>
            {children}
        </AdminLayoutClient>
    );
}