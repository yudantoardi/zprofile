import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWA from "@/components/FloatingWA";
import prisma from "@/lib/prisma";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

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
