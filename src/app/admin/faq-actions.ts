'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFAQ(formData: FormData) {
    const id = formData.get('id') as string;
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const order = parseInt(formData.get('order') as string || '0');

    if (id) {
        await prisma.faq.update({
            where: { id },
            data: { question, answer, order }
        });
    } else {
        await prisma.faq.create({
            data: { question, answer, order }
        });
    }

    revalidatePath('/admin/faq');
    revalidatePath('/pricing');
}

export async function deleteFAQ(id: string) {
    await prisma.faq.delete({ where: { id } });
    revalidatePath('/admin/faq');
    revalidatePath('/pricing');
}

export async function updateFAQOrder(id: string, newOrder: number) {
    await prisma.faq.update({
        where: { id },
        data: { order: newOrder }
    });
    revalidatePath('/admin/faq');
}
