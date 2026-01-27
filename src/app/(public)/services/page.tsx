import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import * as LucideIcons from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    let content: any[] = [];
    let services: any[] = [];

    try {
        content = await prisma.staticContent.findMany({
            where: { page: 'services' }
        });

        services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
            select: {
                id: true,
                title: true,
                description: true,
                icon: true,
            }
        });
    } catch {
        console.warn('Database not available during build, using default values');
    }

    const getContent = (key: string) => content.find(c => c.key === key)?.value;

    return (
        <>
            <PageHeader
                title={getContent('services_page_title') || "Our Services"}
                description={getContent('services_page_description') || "Comprehensive digital solutions designed to help your business thrive in the modern world."}
                breadcrumbs={[{ name: 'Services', href: '/services' }]}
            />

            <ServicesSection services={services} />

            <section className="py-24 bg-white border-t border-border">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 tracking-tight">
                                {getContent('services_delivers_title') || 'How We Deliver Results'}
                            </h2>
                            <p className="text-lg text-muted mb-8">
                                {getContent('services_delivers_description') || 'Our process is designed to be transparent, collaborative, and focused on delivering high-quality outcomes.'}
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: getContent('services_step_1_title') || '1. Discovery', desc: getContent('services_step_1_desc') || 'Understanding your goals and market landscape.' },
                                    { title: getContent('services_step_2_title') || '2. Strategy', desc: getContent('services_step_2_desc') || 'Planning the roadmap to achieve your objectives.' },
                                    { title: getContent('services_step_3_title') || '3. Execution', desc: getContent('services_step_3_desc') || 'Developing and designing with precision.' },
                                    { title: getContent('services_step_4_title') || '4. Optimization', desc: getContent('services_step_4_desc') || 'Continuous improvement based on data.' }
                                ].map((step) => (
                                    <div key={step.title}>
                                        <h4 className="font-heading font-bold text-foreground mb-1">{step.title}</h4>
                                        <p className="text-muted">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-secondary rounded-3xl p-12 lg:p-20 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-full aspect-square bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center relative z-10">
                                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                                    {getContent('services_specialized_title') || 'Want specialized solutions?'}
                                </h3>
                                <p className="text-muted mb-8">
                                    {getContent('services_specialized_description') || 'We provide custom digital strategies tailored to your specific business needs and industry requirements.'}
                                </p>
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                    <LucideIcons.Sparkles size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
