import prisma from "@/lib/prisma";
import MenuClient from "./MenuClient";

export default async function MenuManagementPage() {
    const menus = await prisma.menu.findMany({
        orderBy: { order: 'asc' }
    });

    const customPages = await prisma.customPage.findMany({
        orderBy: { title: 'asc' }
    });

    return <MenuClient initialMenus={menus} customPages={customPages} />;
}
