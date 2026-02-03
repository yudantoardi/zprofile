'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutClientProps {
    children: React.ReactNode;
    unreadCount: number;
    initialIsAuthenticated?: boolean;
}

export default function AdminLayoutClient({
    children,
    unreadCount,
    initialIsAuthenticated = false
}: AdminLayoutClientProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
    const [isLoading, setIsLoading] = useState(!initialIsAuthenticated);
    const router = useRouter();
    const pathname = usePathname();

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
    };

    useEffect(() => {
        if (!initialIsAuthenticated) {
            checkAuth();
        }
    }, [initialIsAuthenticated]);

    useEffect(() => {
        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener('auth-change', handleAuthChange);
        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const isLoginPage = pathname === '/admin';

        if (!isAuthenticated && !isLoginPage) {
            // Fallback check if navigating to protected route while state says unauthenticated
            checkAuth();
            router.push('/admin');
        } else if (isAuthenticated && isLoginPage) {
            router.push('/admin/dashboard');
        }
    }, [pathname, router, isAuthenticated, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    const isLoginPage = pathname === '/admin';

    // Show login form if not authenticated and on login page
    if (!isAuthenticated && isLoginPage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <main className="flex items-center justify-center w-full">
                    {children}
                </main>
            </div>
        );
    }

    // Don't render anything if not authenticated and not on login page (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {!isLoginPage && <AdminSidebar unreadCount={unreadCount} />}
            <main className={`flex-1 p-8 md:p-12 overflow-y-auto max-h-screen ${isLoginPage ? 'flex items-center justify-center' : ''}`}>
                {children}
            </main>
        </div>
    );
}
