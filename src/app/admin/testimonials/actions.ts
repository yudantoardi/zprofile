'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function saveTestimonial(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const content = formData.get('content') as string;
    const rating = parseInt(formData.get('rating') as string || '5');
    const imageFile = formData.get('imageFile') as File;

    let image: string | undefined;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile);
    }

    const data = {
        name,
        role,
        content,
        rating,
        ...(image ? { image } : {})
    };

    if (id) {
        await prisma.testimonial.update({
            where: { id },
            data
        });
    } else {
        await prisma.testimonial.create({
            data
        });
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({
        where: { id }
    });
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}
