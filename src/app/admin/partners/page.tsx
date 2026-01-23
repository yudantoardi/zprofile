import prisma from "@/lib/prisma";
import PartnerClient from "./PartnerClient";

export default async function PartnersManagementPage() {
    const partners = await prisma.partnerLogo.findMany({
        orderBy: { order: 'asc' }
    });

    return <PartnerClient initialPartners={partners} />;
}
