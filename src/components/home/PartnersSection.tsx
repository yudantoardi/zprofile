import prisma from "@/lib/prisma";
import PartnerMarquee from "./PartnerMarquee";

interface PartnersSectionProps {
    subtitle?: string;
    title?: string;
}

export default async function PartnersSection({ subtitle, title }: PartnersSectionProps) {
    let partners: any[] = [];

    try {
        partners = await prisma.partnerLogo.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
        // Handle database connection errors during build
        console.warn('Database not available during build, using default values for partners');
        partners = [];
    }

    if (partners.length === 0) return null;

    return (
        <section className="py-20 bg-white border-y border-border overflow-hidden">
            <div className="container-custom">
                <div className="text-center mb-10">
                    <p className="text-sm font-bold text-muted uppercase tracking-[0.2em]">
                        {subtitle || 'Trusted by Industry Leaders'}
                    </p>
                    {title && <h2 className="text-2xl font-bold mt-2">{title}</h2>}
                </div>
                <PartnerMarquee partners={partners} />
            </div>
        </section>
    );
}
