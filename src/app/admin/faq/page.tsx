import prisma from "@/lib/prisma";
import FAQClient from "./FAQClient";

export default async function FAQManagementPage() {
    const faqs = await prisma.faq.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="container mx-auto py-10">
            <FAQClient initialFAQs={faqs} />
        </div>
    );
}
