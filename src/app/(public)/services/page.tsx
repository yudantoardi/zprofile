import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";

export default async function ServicesPage() {
    let content: any[] = [];
    let services: any[] = [];

    try {
        content = await prisma.staticContent.findMany({
            where: { page: 'services' }
        });

        services = await prisma.service.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
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
                                How We Deliver Results
                            </h2>
                            <p className="text-lg text-muted mb-8">
                                Our process is designed to be transparent, collaborative, and focused on delivering high-quality outcomes.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: '1. Discovery', desc: 'Understanding your goals and market landscape.' },
                                    { title: '2. Strategy', desc: 'Planning the roadmap to achieve your objectives.' },
                                    { title: '3. Execution', desc: 'Developing and designing with precision.' },
                                    { title: '4. Optimization', desc: 'Continuous improvement based on data.' }
                                ].map((step) => (
                                    <div key={step.title}>
                                        <h4 className="font-heading font-bold text-foreground mb-1">{step.title}</h4>
                                        <p className="text-muted">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-secondary rounded-3xl p-12 lg:p-20 flex items-center justify-center">
                            <div className="w-full aspect-square bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-300 italic font-bold">
                                Process Illustration
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
