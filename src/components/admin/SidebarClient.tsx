'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

interface SidebarClientProps {
    menus: Array<{
        name: string;
        href: string;
        icon: React.ReactNode;
    }>;
    unreadCount: number;
}

export default function SidebarClient({ menus, unreadCount }: SidebarClientProps) {
    const pathname = usePathname();

    if (pathname === '/admin/login') return null;

    return (
        <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
            <div className="p-8 border-b border-slate-800">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="font-heading font-bold text-white tracking-tight">Admin CMS</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menus.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm relative ${pathname.startsWith(item.href)
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        {item.name}
                        {item.name === 'Messages' && unreadCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                {unreadCount}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => logoutAction()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-400 hover:bg-red-500/10 w-full text-left"
                >
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
