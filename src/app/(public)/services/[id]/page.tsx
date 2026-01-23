import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/home/CTASection";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const service = await prisma.service.findUnique({
        where: { id }
    });

    if (!service) {
        notFound();
    }

    // Get other services for the sidebar
    const otherServices = await prisma.service.findMany({
        where: {
            id: { not: id }
        },
        orderBy: { order: 'asc' },
        take: 5
    });

    return (
        <>
            <PageHeader
                title={service.title}
                description={service.description}
                breadcrumbs={[
                    { name: 'Services', href: '/services' },
                    { name: service.title, href: `/services/${service.id}` }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: service.content || '' }}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                {/* CTA Card */}
                                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white">
                                    <h3 className="text-2xl font-heading font-bold mb-4">
                                        Interested in this service?
                                    </h3>
                                    <p className="text-blue-100 mb-6">
                                        Let's discuss how we can help your business grow.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                                    >
                                        Get Started <ArrowRight size={18} />
                                    </Link>
                                </div>

                                {/* Other Services */}
                                {otherServices.length > 0 && (
                                    <div className="bg-slate-50 rounded-3xl p-8 border border-border">
                                        <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                                            Other Services
                                        </h3>
                                        <div className="space-y-4">
                                            {otherServices.map((otherService) => (
                                                <Link
                                                    key={otherService.id}
                                                    href={`/services/${otherService.id}`}
                                                    className="block p-4 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
                                                >
                                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                                                        {otherService.title}
                                                    </h4>
                                                    <p className="text-sm text-muted line-clamp-2">
                                                        {otherService.description}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link
                                            href="/services"
                                            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-6"
                                        >
                                            View All Services <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
