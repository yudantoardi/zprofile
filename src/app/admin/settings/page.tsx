import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
    let settingsRaw: any = null;
    try {
        settingsRaw = await prisma.siteSettings.findUnique({
            where: { id: 'singleton' }
        });
    } catch (error) {
        console.error('Failed to fetch settings:', error);
    }

    const settings = {
        companyName: settingsRaw?.companyName || 'CorpProfile',
        address: settingsRaw?.address || '',
        email: settingsRaw?.email || '',
        phone: settingsRaw?.phone || '',
        instagram: settingsRaw?.instagram || '',
        linkedin: settingsRaw?.linkedin || '',
        behance: settingsRaw?.behance || '',
        dribbble: settingsRaw?.dribbble || '',
        logo: settingsRaw?.logo || '',
        favicon: settingsRaw?.favicon || ''
    };

    return <SettingsClient settings={settings} />;
}
