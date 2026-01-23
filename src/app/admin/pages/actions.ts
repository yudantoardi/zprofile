'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function savePage(formData: FormData) {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('imageFile') as File;

    let image: string | undefined;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile);
    }

    const data = {
        title,
        slug,
        content,
        ...(image ? { image } : {})
    };

    if (id) {
        await prisma.customPage.update({
            where: { id },
            data
        });
    } else {
        await prisma.customPage.create({
            data
        });
    }

    revalidatePath('/admin/pages');
    revalidatePath(`/${slug}`);
}

export async function deletePage(id: string) {
    await prisma.customPage.delete({
        where: { id }
    });
    revalidatePath('/admin/pages');
}
