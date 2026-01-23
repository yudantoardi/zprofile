'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function saveTeamMember(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const imageFile = formData.get('imageFile') as File;

    let image: string | undefined;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile);
    }

    const data = {
        name,
        role,
        ...(image ? { image } : {})
    };

    if (id) {
        await prisma.teamMember.update({
            where: { id },
            data
        });
    } else {
        await prisma.teamMember.create({
            data: {
                ...data,
                image: image || ''
            }
        });
    }

    revalidatePath('/admin/team');
    revalidatePath('/about');
    revalidatePath('/');
}

export async function deleteTeamMember(id: string) {
    await prisma.teamMember.delete({
        where: { id }
    });
    revalidatePath('/admin/team');
    revalidatePath('/about');
    revalidatePath('/');
}
