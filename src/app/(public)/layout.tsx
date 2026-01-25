import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import prisma from "@/lib/prisma";
export const dynamic = 'force-dynamic';

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let settings = null;
    try {
        settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
    } catch {
        console.warn('Database settings not available during build');
    }

    return (
        <>
            <Header settings={settings} />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <FloatingWA />
        </>
    );
}
