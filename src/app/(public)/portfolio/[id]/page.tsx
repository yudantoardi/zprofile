import PageHeader from "@/components/PageHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CTASection from "@/components/home/CTASection";

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const portfolio = await prisma.portfolio.findUnique({
        where: { id }
    });

    if (!portfolio) {
        // Fallback for demo
        if (id.length < 5) return notFound();
    }

    const displayData = portfolio || {
        title: 'Project Title',
        category: 'Development',
        description: 'A comprehensive study of our success in delivering this project.',
        content: '<p>Detailed case study information goes here. We focused on user experience and technical scalability.</p>'
    };

    return (
        <>
            <PageHeader
                title={displayData.title}
                description={displayData.description}
                breadcrumbs={[
                    { name: 'Portfolio', href: '/portfolio' },
                    { name: displayData.title, href: `/portfolio/${id}` }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none [&_p]:min-h-[10px] [&_p]:mb-[10px]">
                            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Challenge</h2>
                            <div dangerouslySetInnerHTML={{ __html: displayData.content || '' }} />
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            <div className="bg-secondary p-8 rounded-3xl border border-border">
                                <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-xs">Project Info</h4>
                                <ul className="space-y-4">
                                    <li className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted text-sm">Category</span>
                                        <span className="font-bold text-sm tracking-tight">{displayData.category}</span>
                                    </li>
                                    <li className="flex justify-between py-3 border-b border-border">
                                        <span className="text-muted text-sm">Client</span>
                                        <span className="font-bold text-sm tracking-tight">Confidential</span>
                                    </li>
                                    <li className="flex justify-between py-3">
                                        <span className="text-muted text-sm">Date</span>
                                        <span className="font-bold text-sm tracking-tight">Jan 2024</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
