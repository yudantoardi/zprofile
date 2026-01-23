'use client';

import { useState } from 'react';
import { Globe, Save, Mail, Phone, MapPin, Instagram, Linkedin, Bookmark, Dribbble } from "lucide-react";
import { saveSettings } from "./actions";
import LogoUploader from "./LogoUploader";
import { useToast } from "@/components/Toast";

interface SettingsClientProps {
    settings: {
        companyName: string;
        address: string | null;
        email: string | null;
        phone: string | null;
        instagram: string | null;
        linkedin: string | null;
        behance: string | null;
        dribbble: string | null;
        logo: string | null;
    };
}

export default function SettingsClient({ settings }: SettingsClientProps) {
    const { showToast, ToastComponent } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData(e.currentTarget);
        await saveSettings(formData);

        setIsSaving(false);
        showToast('Settings saved successfully!', 'success');
    };

    return (
        <div className="space-y-10">
            {ToastComponent}
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Company Settings</h1>
                <p className="text-muted">Manage your core company information and logo.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm space-y-8">
                    <h3 className="font-heading font-bold text-lg flex items-center gap-2 border-b border-border pb-4 mb-6">
                        <Globe size={18} className="text-primary" /> Identity
                    </h3>

                    <LogoUploader initialLogo={settings.logo} />

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Company Name</label>
                            <input name="companyName" type="text" defaultValue={settings.companyName} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm space-y-8">
                    <h3 className="font-heading font-bold text-lg flex items-center gap-2 border-b border-border pb-4 mb-6">
                        <Bookmark size={18} className="text-primary" /> Contact & Socials
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <MapPin size={16} /> Address
                            </label>
                            <textarea name="address" defaultValue={settings.address || ''} rows={2} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                    <Mail size={16} /> Email
                                </label>
                                <input name="email" type="email" defaultValue={settings.email || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                    <Phone size={16} /> Phone
                                </label>
                                <input name="phone" type="tel" defaultValue={settings.phone || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Instagram size={16} /> Instagram
                            </label>
                            <input name="instagram" type="text" defaultValue={settings.instagram || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Linkedin size={16} /> LinkedIn
                            </label>
                            <input name="linkedin" type="text" defaultValue={settings.linkedin || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Bookmark size={16} /> Behance
                            </label>
                            <input name="behance" type="text" defaultValue={settings.behance || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                <Dribbble size={16} /> Dribbble
                            </label>
                            <input name="dribbble" type="text" defaultValue={settings.dribbble || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary w-full py-5 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Save size={20} /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
