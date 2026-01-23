'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function saveMenu(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const order = parseInt(formData.get('order') as string || '0');

    if (id) {
        await prisma.menu.update({
            where: { id },
            data: { title, link, order }
        });
    } else {
        await prisma.menu.create({
            data: { title, link, order }
        });
    }

    revalidatePath('/admin/menu');
    revalidatePath('/', 'layout');
}

export async function deleteMenu(id: string) {
    const menu = await prisma.menu.findUnique({ where: { id } });
    if (menu?.isDefault) {
        throw new Error("Cannot delete default menu items.");
    }

    await prisma.menu.delete({
        where: { id }
    });
    revalidatePath('/admin/menu');
    revalidatePath('/', 'layout');
}

export async function updateMenuOrder(updates: { id: string, order: number }[]) {
    // Simple way: loop (for small menu sets this is fine)
    for (const update of updates) {
        await prisma.menu.update({
            where: { id: update.id },
            data: { order: update.order }
        });
    }
    revalidatePath('/admin/menu');
    revalidatePath('/', 'layout');
}
