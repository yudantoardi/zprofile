'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";

export async function saveSettings(formData: FormData) {
    const companyName = formData.get('companyName') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const instagram = formData.get('instagram') as string;
    const linkedin = formData.get('linkedin') as string;
    const behance = formData.get('behance') as string;
    const dribbble = formData.get('dribbble') as string;
    const logoFile = formData.get('logoFile') as File;

    let logo: string | undefined;
    if (logoFile && logoFile.size > 0) {
        logo = await uploadFile(logoFile);
    }

    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: {
            companyName,
            address,
            email,
            phone,
            instagram,
            linkedin,
            behance,
            dribbble,
            ...(logo ? { logo } : {})
        },
        create: {
            id: 'singleton',
            companyName,
            address,
            email,
            phone,
            instagram,
            linkedin,
            behance,
            dribbble,
            logo: logo || ''
        }
    });

    revalidatePath('/admin/settings');
    revalidatePath('/');
}
