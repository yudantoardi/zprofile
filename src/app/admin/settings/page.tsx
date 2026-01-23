import prisma from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
    const settings = await prisma.siteSettings.findUnique({
        where: { id: 'singleton' }
    }) || {
        companyName: 'CorpProfile',
        address: '',
        email: '',
        phone: '',
        instagram: '',
        linkedin: '',
        behance: '',
        dribbble: '',
        logo: ''
    };

    return <SettingsClient settings={settings} />;
}
