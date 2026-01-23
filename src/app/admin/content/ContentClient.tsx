'use client';

import { useState } from "react";
import { StaticContent } from "@prisma/client";
import { Save, Info, Layout, Briefcase, Image as ImageIcon, Upload, Layers, DollarSign } from "lucide-react";
import { saveStaticContent } from "./actions";

type PageKey = 'homepage' | 'about' | 'services' | 'portfolio' | 'pricing';

interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image';
    section?: string;
}

const PAGE_CONFIG: Record<PageKey, { label: string; icon: any; fields: FieldConfig[] }> = {
    homepage: {
        label: 'Homepage',
        icon: Layout,
        fields: [
            { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', section: 'Hero Section' },
            { key: 'hero_title', label: 'Hero Title', type: 'text', section: 'Hero Section' },
            { key: 'hero_description', label: 'Hero Description', type: 'textarea', section: 'Hero Section' },
            { key: 'hero_cta_text', label: 'Hero CTA Text', type: 'text', section: 'Hero Section' },
            { key: 'hero_cta_link', label: 'Hero CTA Link', type: 'text', section: 'Hero Section' },
            { key: 'hero_bg_image', label: 'Hero Background Image (Right Side)', type: 'image', section: 'Hero Section' },

            { key: 'about_subtitle', label: 'About Section: Subtitle', type: 'text', section: 'About Section' },
            { key: 'about_title', label: 'About Section: Title', type: 'text', section: 'About Section' },
            { key: 'about_description', label: 'About Section: Description', type: 'textarea', section: 'About Section' },
            { key: 'about_cta_text', label: 'About Section: Read More Text', type: 'text', section: 'About Section' },
            { key: 'about_image', label: 'About Section: Image', type: 'image', section: 'About Section' },

            { key: 'services_subtitle', label: 'Services Section: Subtitle', type: 'text', section: 'Services Section' },
            { key: 'services_title', label: 'Services Section: Title', type: 'text', section: 'Services Section' },
            { key: 'services_description', label: 'Services Section: Description', type: 'textarea', section: 'Services Section' },

            { key: 'partners_subtitle', label: 'Partners Section: Subtitle', type: 'text', section: 'Partners Section' },
            { key: 'partners_title', label: 'Partners Section: Title', type: 'text', section: 'Partners Section' },

            { key: 'works_subtitle', label: 'Works Section: Subtitle', type: 'text', section: 'Works Section' },
            { key: 'works_title', label: 'Works Section: Title', type: 'text', section: 'Works Section' },
            { key: 'works_description', label: 'Works Section: Description', type: 'textarea', section: 'Works Section' },
            { key: 'works_cta_text', label: 'Works Section: View All Text', type: 'text', section: 'Works Section' },

            { key: 'testimonials_subtitle', label: 'Testimonials Section: Subtitle', type: 'text', section: 'Testimonials Section' },
            { key: 'testimonials_title', label: 'Testimonials Section: Title', type: 'text', section: 'Testimonials Section' },
            { key: 'testimonials_description', label: 'Testimonials Section: Description', type: 'textarea', section: 'Testimonials Section' },

            { key: 'cta_title', label: 'Final CTA: Title', type: 'text', section: 'CTA Section' },
            { key: 'cta_description', label: 'Final CTA: Description', type: 'textarea', section: 'CTA Section' },
            { key: 'cta_button_text', label: 'Final CTA: Button Text', type: 'text', section: 'CTA Section' },
        ]
    },
    about: {
        label: 'About Page',
        icon: Info,
        fields: [
            { key: 'about_page_subtitle', label: 'Section Subtitle', type: 'text', section: 'About Section' },
            { key: 'about_page_title', label: 'Section Title', type: 'text', section: 'About Section' },
            { key: 'about_page_description', label: 'About Paragraph', type: 'textarea', section: 'About Section' },
            { key: 'about_page_image', label: 'Section Image', type: 'image', section: 'About Section' },

            { key: 'counter_clients', label: 'Happy Clients count', type: 'text', section: 'Counter Section' },
            { key: 'counter_projects', label: 'Websites Built count', type: 'text', section: 'Counter Section' },
            { key: 'counter_visitors', label: 'Total Visitors count (e.g. 5M+)', type: 'text', section: 'Counter Section' },

            { key: 'team_section_title', label: 'Team Section Title', type: 'text', section: 'Our Team Section' },
        ]
    },
    services: {
        label: 'Services Page',
        icon: Briefcase,
        fields: [
            { key: 'services_page_title', label: 'Page Title', type: 'text' },
            { key: 'services_page_description', label: 'Page Description', type: 'textarea' },
        ]
    },
    portfolio: {
        label: 'Portfolio Page',
        icon: ImageIcon,
        fields: [
            { key: 'portfolio_page_title', label: 'Page Title', type: 'text', section: 'Page Header' },
            { key: 'portfolio_page_description', label: 'Page Description', type: 'textarea', section: 'Page Header' },
        ]
    },
    pricing: {
        label: 'Pricing Page',
        icon: DollarSign,
        fields: [
            { key: 'pricing_page_title', label: 'Page Title', type: 'text', section: 'Page Header' },
            { key: 'pricing_page_description', label: 'Page Description', type: 'textarea', section: 'Page Header' },
        ]
    }
};

export default function ContentClient({ initialContent }: { initialContent: StaticContent[] }) {
    const [activeTab, setActiveTab] = useState<PageKey>('homepage');
    const [isSaving, setIsSaving] = useState(false);
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const getContentValue = (page: string, key: string) => {
        return initialContent.find(c => c.page === page && c.key === key)?.value || '';
    };

    const handleImageChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        await saveStaticContent(formData);
        setIsSaving(false);
        alert('Content saved successfully!');
        window.location.reload();
    };

    const config = PAGE_CONFIG[activeTab];

    // Group fields by section
    const groupedFields: Record<string, FieldConfig[]> = {};
    config.fields.forEach(field => {
        const section = field.section || 'General Settings';
        if (!groupedFields[section]) groupedFields[section] = [];
        groupedFields[section].push(field);
    });

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Static Content</h1>
                    <p className="text-muted">Manage the static text, descriptions, and images across your website.</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 border-b border-border pb-6 overflow-x-auto">
                {(Object.entries(PAGE_CONFIG) as [PageKey, typeof PAGE_CONFIG['homepage']][]).map(([key, cfg]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === key
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                            : 'bg-white text-muted hover:bg-slate-50 border border-border'
                            }`}
                    >
                        <cfg.icon size={18} />
                        {cfg.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm p-6 md:p-10">
                <form key={activeTab} onSubmit={handleSave} className="space-y-12">
                    <input type="hidden" name="page" value={activeTab} />

                    {Object.entries(groupedFields).map(([sectionName, fields]) => (
                        <div key={sectionName} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg text-primary">
                                    <Layers size={18} />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground">{sectionName}</h3>
                                <div className="flex-1 h-px bg-slate-100" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-2 lg:px-6">
                                {fields.map(field => (
                                    <div key={field.key} className={field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}>
                                        <label className="block text-sm font-bold text-foreground mb-3">{field.label}</label>

                                        {field.type === 'image' ? (
                                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                                <div className="w-full md:w-64 aspect-video bg-slate-50 border-2 border-dashed border-border rounded-2xl overflow-hidden flex items-center justify-center relative group shadow-inner">
                                                    {(previews[field.key] || getContentValue(activeTab, field.key)) ? (
                                                        <img src={previews[field.key] || getContentValue(activeTab, field.key)} alt={field.label} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <ImageIcon className="text-slate-200" size={48} />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <label className="btn-secondary inline-flex items-center gap-2 cursor-pointer py-3 px-6 hover:bg-slate-50 transition-colors">
                                                        <Upload size={18} /> Upload Image
                                                        <input type="file" name={field.key} accept="image/*" onChange={(e) => handleImageChange(field.key, e)} className="hidden" />
                                                    </label>
                                                    <p className="text-xs text-muted">Recommended: High resolution, WebP/JPG/PNG.</p>
                                                </div>
                                            </div>
                                        ) : field.type === 'textarea' ? (
                                            <textarea
                                                name={field.key}
                                                defaultValue={getContentValue(activeTab, field.key)}
                                                rows={4}
                                                className="w-full bg-slate-50 border border-border p-5 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:bg-slate-100/50"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name={field.key}
                                                defaultValue={getContentValue(activeTab, field.key)}
                                                className="w-full bg-slate-50 border border-border p-5 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:bg-slate-100/50"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-10 border-t border-border flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary px-16 py-5 flex items-center gap-3 disabled:opacity-50 text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
                        >
                            <Save size={24} /> {isSaving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
