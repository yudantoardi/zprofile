import prisma from "@/lib/prisma";
import ServiceClient from "./ServiceClient";

export default async function ServicesManagementPage() {
    const services = await prisma.service.findMany({
        orderBy: { order: 'asc' }
    });

    return <ServiceClient initialServices={services} />;
}
