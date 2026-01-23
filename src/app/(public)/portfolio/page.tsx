import PageHeader from "@/components/PageHeader";
import WorksSection from "@/components/home/WorksSection";
import CTASection from "@/components/home/CTASection";
import prisma from "@/lib/prisma";

export default async function PortfolioPage() {
    const content = await prisma.staticContent.findMany({
        where: { page: 'portfolio' }
    });

    const portfolios = await prisma.portfolio.findMany({
        orderBy: { order: 'asc' },
        include: { Category: true }
    });

    const categories = await prisma.portfolioCategory.findMany({
        orderBy: { name: 'asc' }
    });

    const getContent = (key: string) => content.find(c => c.key === key)?.value;

    return (
        <>
            <PageHeader
                title={getContent('portfolio_page_title') || "Our Portfolio"}
                description={getContent('portfolio_page_description') || "A showcase of our best work across various industries and technologies."}
                breadcrumbs={[{ name: 'Portfolio', href: '/portfolio' }]}
            />

            <WorksSection portfolios={portfolios} categories={categories} />

            <section className="py-24 bg-white border-t border-border">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Want specialized solutions?</h2>
                    <p className="text-muted mb-10 max-w-xl mx-auto italic">
                        &quot;Every project is a unique challenge. We approach each one with fresh ideas and technical precision.&quot;
                    </p>
                </div>
            </section>

            <CTASection />
        </>
    );
}
