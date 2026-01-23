'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function savePartner(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const imageFile = formData.get('imageFile') as File;

    let image: string | undefined;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile);
    }

    const data = {
        name,
        ...(image ? { image } : {})
    };

    if (id) {
        await prisma.partnerLogo.update({
            where: { id },
            data
        });
    } else {
        if (!image) throw new Error("Image is required for new partner logo");
        await prisma.partnerLogo.create({
            data: {
                name,
                image: image!
            }
        });
    }

    revalidatePath('/admin/partners');
    revalidatePath('/');
}

export async function deletePartner(id: string) {
    await prisma.partnerLogo.delete({
        where: { id }
    });
    revalidatePath('/admin/partners');
    revalidatePath('/');
}
