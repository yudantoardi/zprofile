'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/admin/auth');
                const data = await response.json();
                setIsAuthenticated(data.authenticated);
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }

            const isLoginPage = pathname === '/admin/login';

            if (!isAuthenticated && !isLoginPage) {
                router.push('/admin/login');
            } else if (isAuthenticated && isLoginPage) {
                router.push('/admin/dashboard');
            }
        };

        checkAuth();
    }, [pathname, router, isAuthenticated]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    const isLoginPage = pathname === '/admin/login';

    return (
        <div className="flex min-h-screen bg-slate-50">
            {!isLoginPage && <AdminSidebar />}
            <main className={`flex-1 p-8 md:p-12 overflow-y-auto max-h-screen ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
                {children}
            </main>
        </div>
    );
}
