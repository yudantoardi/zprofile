import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === '/admin/login';
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isAuthenticated = request.cookies.get('admin_session')?.value === 'true';

    if (isAdminRoute && !isLoginPage && !isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (isLoginPage && isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
