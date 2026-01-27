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
    const logoUrl = formData.get('logoUrl') as string;
    const faviconUrl = formData.get('faviconUrl') as string;

    // Logo is now uploaded client-side, so we just get the URL
    // If logoUrl is present (not empty), we use it. 
    // If it's empty/null, we might want to keep existing or allow clearing?
    // The previous logic was: if (logoFile && logoFile.size > 0) -> update.
    // So if logoUrl is provided, we update it.

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
            ...(logoUrl ? { logo: logoUrl } : {}),
            ...(faviconUrl ? { favicon: faviconUrl } : {})
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
            logo: logoUrl || '',
            favicon: faviconUrl || ''
        }
    });

    revalidatePath('/admin/settings');
    revalidatePath('/');
}
