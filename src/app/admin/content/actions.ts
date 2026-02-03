'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

import fs from 'fs';
import path from 'path';

export async function saveStaticContent(formData: FormData) {
    try {
        const page = formData.get('page') as string;
        const entries = Array.from(formData.entries())
            .filter(([key]) => key !== 'page' && !key.startsWith('$ACTION_ID'));

        console.log(`[StaticContent] Saving page: ${page} with ${entries.length} fields`);

        // Use sequential loop instead of Promise.all to prevent DB connection explosion
        for (const [key, value] of entries) {
            let finalValue: string;

            if (value instanceof File && value.size > 0) {
                finalValue = await uploadFile(value);
            } else if (value instanceof File && value.size === 0) {
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
        console.log(`[StaticContent] Successfully saved ${page}`);
        return { success: true };
    } catch (error: any) {
        console.error('[StaticContent] Error saving content:', error);
        return { success: false, error: error.message || 'Failed to save content' };
    }
}
