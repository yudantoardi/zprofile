'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function saveStaticContent(formData: FormData) {
    const page = formData.get('page') as string;
    const entries = Array.from(formData.entries());

    for (const [key, value] of entries) {
        if (key === 'page') continue;

        let finalValue: string;

        if (value instanceof File && value.size > 0) {
            finalValue = await uploadFile(value);
        } else if (value instanceof File && value.size === 0) {
            // Skip empty file uploads if they are not existing values
            continue;
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
    }

    revalidatePath('/admin/content');
    revalidatePath('/', 'layout');
}
