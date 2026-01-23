import PageHeader from "@/components/PageHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CTASection from "@/components/home/CTASection";

export default async function CustomPageDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = await prisma.customPage.findUnique({
        where: { slug }
    });

    if (!page) {
        return notFound();
    }

    return (
        <>
            <PageHeader
                title={page.title}
                description=""
                breadcrumbs={[
                    { name: 'Home', href: '/' },
                    { name: page.title, href: `/${slug}` }
                ]}
            />

            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
