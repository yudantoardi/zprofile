'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function saveService(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const icon = formData.get('icon') as string;

    const data = {
        title,
        description,
        content,
        icon
    };

    if (id) {
        await prisma.service.update({
            where: { id },
            data
        });
    } else {
        await prisma.service.create({
            data
        });
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
}

export async function deleteService(id: string) {
    await prisma.service.delete({
        where: { id }
    });
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
}
