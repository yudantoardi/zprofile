import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/home/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function PricingPage() {
    let content: any[] = [];
    let pricings: any[] = [];
    let faqs: any[] = [];

    try {
        content = await prisma.staticContent.findMany({
            where: { page: 'pricing' }
        });

        pricings = await prisma.pricingPlan.findMany({
            orderBy: { order: 'asc' }
        });

        faqs = await prisma.faq.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
        // Handle database connection errors during build
        console.warn('Database not available during build, using default values');
        content = [];
        pricings = [];
        faqs = [];
    }

    const getContent = (key: string) => content.find(c => c.key === key)?.value;

    return (
        <>
            <PageHeader
                title={getContent('pricing_page_title') || "Simple & Transparent Pricing"}
                description={getContent('pricing_page_description') || "Choose the best plan for your business and scale with confidence."}
                breadcrumbs={[{ name: 'Pricing', href: '/pricing' }]}
            />

            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {pricings.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-muted italic bg-slate-50 rounded-[3rem] border border-dashed border-border">
                                No pricing plans available at the moment.
                            </div>
                        ) : (
                            pricings.map((plan) => (
                                <div key={plan.id} className={`relative flex flex-col p-10 rounded-[3rem] border-2 transition-all hover:shadow-2xl ${plan.isPopular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'}`}>
                                    {plan.isPopular && (
                                        <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest">
                                            Recommended
                                        </div>
                                    )}
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{plan.name}</h3>
                                        <div className="flex items-baseline">
                                            <span className="text-5xl font-heading font-bold text-foreground tracking-tight">{plan.price}</span>
                                            <span className="text-muted ml-2 italic">/{plan.period}</span>
                                        </div>
                                        <p className="mt-4 text-muted font-medium">{plan.description}</p>
                                    </div>
                                    <div className="space-y-4 mb-10 flex-1">
                                        {plan.features.split('\n').filter((f: string) => f.trim()).map((feature: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                    <Check size={12} className="text-primary" />
                                                </div>
                                                <span className="text-slate-600 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href="/contact"
                                        className={`w-full py-5 rounded-2xl font-bold transition-all text-center ${plan.isPopular ? 'bg-primary text-white hover:scale-105 shadow-xl shadow-primary/20' : 'bg-slate-50 text-foreground hover:bg-slate-100 border border-border'}`}
                                    >
                                        Choose {plan.name}
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-24 max-w-7xl mx-auto bg-white rounded-[2.5rem] p-12 border border-border shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h3>
                                <p className="text-muted mb-8 italic">Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support team.</p>
                                <Link href="/contact" className="btn-primary inline-block">Contact Support</Link>
                            </div>
                            <div className="lg:col-span-2">
                                {faqs.length === 0 ? (
                                    <div className="p-10 border border-dashed border-border rounded-2xl text-center text-muted italic bg-slate-50">
                                        No FAQs available at the moment.
                                    </div>
                                ) : (
                                    <FAQAccordion items={faqs} />
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
