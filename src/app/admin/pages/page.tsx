import prisma from "@/lib/prisma";
import PageClient from "./PageClient";

export default async function PagesManagementPage() {
    const pages = await prisma.customPage.findMany({
        orderBy: { updatedAt: 'desc' }
    });

    return <PageClient initialPages={pages} />;
}
