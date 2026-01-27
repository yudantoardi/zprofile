import prisma from "@/lib/prisma";
import PartnerClient from "./PartnerClient";

export default async function PartnersManagementPage() {
    let partners: any[] = [];
    try {
        partners = await prisma.partnerLogo.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
        console.error('Failed to fetch partners:', error);
    }

    return <PartnerClient initialPartners={partners} />;
}
