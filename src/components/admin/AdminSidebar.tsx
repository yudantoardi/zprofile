import {
    LayoutDashboard,
    Settings,
    Briefcase,
    Image,
    Users,
    MessageSquare,
    FileText,
    Menu as MenuIcon,
    Star,
    LayoutGrid,
    DollarSign,
    HelpCircle
} from 'lucide-react';
import prisma from '@/lib/prisma';
import SidebarClient from './SidebarClient';

const menus = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Static Content', href: '/admin/content', icon: <FileText size={20} /> },
    { name: 'Services', href: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Portfolio', href: '/admin/portfolio', icon: <LayoutGrid size={20} /> },
    { name: 'Partners', href: '/admin/partners', icon: <Image size={20} /> },
    { name: 'Team', href: '/admin/team', icon: <Users size={20} /> },
    { name: 'Pricing', href: '/admin/pricing', icon: <DollarSign size={20} /> },
    { name: 'FAQ', href: '/admin/faq', icon: <HelpCircle size={20} /> },
    { name: 'Testimonials', href: '/admin/testimonials', icon: <Star size={20} /> },
    { name: 'Custom Pages', href: '/admin/pages', icon: <FileText size={20} /> },
    { name: 'Navigation', href: '/admin/menu', icon: <MenuIcon size={20} /> },
    { name: 'Messages', href: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
];

export default async function AdminSidebar() {
    const unreadCount = await prisma.message.count({ where: { isRead: false } });

    return <SidebarClient menus={menus} unreadCount={unreadCount} />;
}
