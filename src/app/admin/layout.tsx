import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if the route is login, if so don't show sidebar
    // However, the layout is only for /admin
    // Next.js handles this via route groups if needed, but here we can just check

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
}
