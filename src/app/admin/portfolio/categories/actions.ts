'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function saveCategory(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    if (id) {
        await prisma.portfolioCategory.update({
            where: { id },
            data: { name }
        });
    } else {
        await prisma.portfolioCategory.create({
            data: { name }
        });
    }

    revalidatePath('/admin/portfolio');
}

export async function deleteCategory(id: string) {
    // Note: This will fail if there are portfolios in this category unless cascading
    // or manual handling. For now, let's keep it simple.
    await prisma.portfolioCategory.delete({
        where: { id }
    });
    revalidatePath('/admin/portfolio');
}
