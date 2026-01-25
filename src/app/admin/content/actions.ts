'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function saveStaticContent(formData: FormData) {
    const page = formData.get('page') as string;
    const entries = Array.from(formData.entries()).filter(([key]) => key !== 'page');

    await Promise.all(entries.map(async ([key, value]) => {
        let finalValue: string;

        if (value instanceof File && value.size > 0) {
            finalValue = await uploadFile(value);
        } else if (value instanceof File && value.size === 0) {
            // Skip empty file uploads
            return;
        } else {
            finalValue = value as string;
        }

        await prisma.staticContent.upsert({
            where: {
                page_key: {
                    page,
                    key
                }
            },
            update: { value: finalValue },
            create: {
                page,
                key,
                value: finalValue
            }
        });
    }));

    revalidatePath('/admin/content');
    revalidatePath('/', 'layout');
}
