'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function savePortfolio(formData: FormData) {

    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const categoryId = formData.get('categoryId') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const thumbnailFile = formData.get('thumbnailFile') as File;

    let thumbnail: string | undefined;
    if (thumbnailFile && thumbnailFile.size > 0) {
        thumbnail = await uploadFile(thumbnailFile);
    }

    const data = {
        title,
        slug,
        categoryId: categoryId || null,
        description,
        content,
        ...(thumbnail ? { thumbnail } : {})
    };

    if (id) {
        await prisma.portfolio.update({
            where: { id },
            data
        });
    } else {
        await prisma.portfolio.create({
            data
        });
    }

    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}

export async function deletePortfolio(id: string) {
    await prisma.portfolio.delete({
        where: { id }
    });
    revalidatePath('/admin/portfolio');
    revalidatePath('/portfolio');
}
