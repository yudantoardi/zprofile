import prisma from "@/lib/prisma";
import ServiceClient from "./ServiceClient";

export default async function ServicesManagementPage() {
    let services: any[] = [];
    try {
        services = await prisma.service.findMany({
            orderBy: { order: 'asc' }
        });
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }

    return <ServiceClient initialServices={services} />;
}
