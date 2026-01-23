'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function savePricing(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const period = formData.get('period') as string;
    const description = formData.get('description') as string;
    const features = formData.get('features') as string;
    const isPopular = formData.get('isPopular') === 'true';
    const order = parseInt(formData.get('order') as string || '0');

    if (id) {
        await prisma.pricingPlan.update({
            where: { id },
            data: { name, price, period, description, features, isPopular, order }
        });
    } else {
        await prisma.pricingPlan.create({
            data: { name, price, period, description, features, isPopular, order }
        });
    }

    revalidatePath('/admin/pricing');
    revalidatePath('/pricing');
}

export async function deletePricing(id: string) {
    await prisma.pricingPlan.delete({ where: { id } });
    revalidatePath('/admin/pricing');
    revalidatePath('/pricing');
}

export async function updatePricingOrder(id: string, newOrder: number) {
    await prisma.pricingPlan.update({
        where: { id },
        data: { order: newOrder }
    });
    revalidatePath('/admin/pricing');
}
