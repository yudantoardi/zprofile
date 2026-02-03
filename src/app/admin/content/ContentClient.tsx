'use client';

import { useState } from "react";
import { StaticContent } from "@prisma/client";
import { Save, Info, Layout, Briefcase, Image as ImageIcon, Upload, Layers, DollarSign } from "lucide-react";
import { saveStaticContent } from "./actions";

type PageKey = 'homepage' | 'about' | 'services' | 'portfolio' | 'pricing';

interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'list';
    section?: string;
}

const PAGE_CONFIG: Record<PageKey, { label: string; icon: any; fields: FieldConfig[] }> = {
    homepage: {
        label: 'Homepage',
        icon: Layout,
        fields: [
            { key: 'seo_title', label: 'Page Title (SEO)', type: 'text', section: 'SEO Settings' },
            { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea', section: 'SEO Settings' },
            { key: 'seo_og_image', label: 'OG Image (SEO)', type: 'image', section: 'SEO Settings' },

            { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text', section: 'Hero Section' },
            { key: 'hero_title', label: 'Hero Title', type: 'text', section: 'Hero Section' },
            { key: 'hero_description', label: 'Hero Description', type: 'textarea', section: 'Hero Section' },
            { key: 'hero_cta_text', label: 'Hero CTA Text', type: 'text', section: 'Hero Section' },
            { key: 'hero_cta_link', label: 'Hero CTA Link', type: 'text', section: 'Hero Section' },
            { key: 'hero_bg_image', label: 'Hero Background Image (Right Side)', type: 'image', section: 'Hero Section' },

            { key: 'about_subtitle', label: 'About Section: Subtitle', type: 'text', section: 'About Section' },
            { key: 'about_title', label: 'About Section: Title', type: 'text', section: 'About Section' },
            { key: 'about_description', label: 'About Section: Description', type: 'textarea', section: 'About Section' },
            { key: 'about_points', label: 'About Section: Bullet Points', type: 'list', section: 'About Section' },
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
            { key: 'seo_title', label: 'Page Title (SEO)', type: 'text', section: 'SEO Settings' },
            { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea', section: 'SEO Settings' },
            { key: 'seo_og_image', label: 'OG Image (SEO)', type: 'image', section: 'SEO Settings' },

            { key: 'about_page_subtitle', label: 'Section Subtitle', type: 'text', section: 'About Section' },
            { key: 'about_page_title', label: 'Section Title', type: 'text', section: 'About Section' },
            { key: 'about_page_description', label: 'About Paragraph', type: 'textarea', section: 'About Section' },
            { key: 'about_page_points', label: 'Bullet Points', type: 'list', section: 'About Section' },
            { key: 'about_page_image', label: 'Section Image', type: 'image', section: 'About Section' },
            { key: 'team_section_title', label: 'Team Section Title', type: 'text', section: 'About Section' },

            { key: 'counter_1_icon', label: 'Icon Name (Lucide)', type: 'text', section: 'Counter 1' },
            { key: 'counter_1_title', label: 'Title', type: 'text', section: 'Counter 1' },
            { key: 'counter_1_number', label: 'Number (e.g. 500+)', type: 'text', section: 'Counter 1' },

            { key: 'counter_2_icon', label: 'Icon Name (Lucide)', type: 'text', section: 'Counter 2' },
            { key: 'counter_2_title', label: 'Title', type: 'text', section: 'Counter 2' },
            { key: 'counter_2_number', label: 'Number (e.g. 1,200+)', type: 'text', section: 'Counter 2' },

            { key: 'counter_3_icon', label: 'Icon Name (Lucide)', type: 'text', section: 'Counter 3' },
            { key: 'counter_3_title', label: 'Title', type: 'text', section: 'Counter 3' },
            { key: 'counter_3_number', label: 'Number (e.g. 5M+)', type: 'text', section: 'Counter 3' },
        ]
    },
    services: {
        label: 'Services Page',
        icon: Briefcase,
        fields: [
            { key: 'seo_title', label: 'Page Title (SEO)', type: 'text', section: 'SEO Settings' },
            { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea', section: 'SEO Settings' },
            { key: 'seo_og_image', label: 'OG Image (SEO)', type: 'image', section: 'SEO Settings' },

            { key: 'services_page_title', label: 'Page Title', type: 'text', section: 'Header Section' },
            { key: 'services_page_description', label: 'Page Description', type: 'textarea', section: 'Header Section' },

            { key: 'services_delivers_title', label: 'Process Title', type: 'text', section: 'Process Config' },
            { key: 'services_delivers_description', label: 'Process Description', type: 'textarea', section: 'Process Config' },

            { key: 'services_step_1_title', label: 'Title', type: 'text', section: 'Process Step 1' },
            { key: 'services_step_1_desc', label: 'Description', type: 'text', section: 'Process Step 1' },
            { key: 'services_step_2_title', label: 'Title', type: 'text', section: 'Process Step 2' },
            { key: 'services_step_2_desc', label: 'Description', type: 'text', section: 'Process Step 2' },
            { key: 'services_step_3_title', label: 'Title', type: 'text', section: 'Process Step 3' },
            { key: 'services_step_3_desc', label: 'Description', type: 'text', section: 'Process Step 3' },
            { key: 'services_step_4_title', label: 'Title', type: 'text', section: 'Process Step 4' },
            { key: 'services_step_4_desc', label: 'Description', type: 'text', section: 'Process Step 4' },

            { key: 'services_specialized_title', label: 'Specialized Title', type: 'text', section: 'Specialized Section' },
            { key: 'services_specialized_description', label: 'Specialized Description', type: 'textarea', section: 'Specialized Section' },
        ]
    },
    portfolio: {
        label: 'Portfolio Page',
        icon: ImageIcon,
        fields: [
            { key: 'seo_title', label: 'Page Title (SEO)', type: 'text', section: 'SEO Settings' },
            { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea', section: 'SEO Settings' },
            { key: 'seo_og_image', label: 'OG Image (SEO)', type: 'image', section: 'SEO Settings' },

            { key: 'portfolio_page_title', label: 'Page Title', type: 'text', section: 'Page Header' },
            { key: 'portfolio_page_description', label: 'Page Description', type: 'textarea', section: 'Page Header' },
        ]
    },
    pricing: {
        label: 'Pricing Page',
        icon: DollarSign,
        fields: [
            { key: 'seo_title', label: 'Page Title (SEO)', type: 'text', section: 'SEO Settings' },
            { key: 'seo_description', label: 'Meta Description (SEO)', type: 'textarea', section: 'SEO Settings' },
            { key: 'seo_og_image', label: 'OG Image (SEO)', type: 'image', section: 'SEO Settings' },

            { key: 'pricing_page_title', label: 'Page Title', type: 'text', section: 'Page Header' },
            { key: 'pricing_page_description', label: 'Page Description', type: 'textarea', section: 'Page Header' },
        ]
    }
};

export default function ContentClient({ initialContent }: { initialContent: StaticContent[] }) {
    const [activeTab, setActiveTab] = useState<PageKey>('homepage');
    const [isSaving, setIsSaving] = useState(false);
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [listItems, setListItems] = useState<Record<string, string[]>>({});

    const getContentValue = (page: string, key: string) => {
        return initialContent.find(c => c.page === page && c.key === key)?.value || '';
    };

    const getListValue = (key: string): string[] => {
        if (listItems[key]) return listItems[key];
        const value = getContentValue(activeTab, key);
        if (!value) return [''];
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : [''];
        } catch {
            return [''];
        }
    };

    const updateListItem = (key: string, index: number, value: string) => {
        const current = getListValue(key);
        const updated = [...current];
        updated[index] = value;
        setListItems(prev => ({ ...prev, [key]: updated }));
    };

    const addListItem = (key: string) => {
        const current = getListValue(key);
        setListItems(prev => ({ ...prev, [key]: [...current, ''] }));
    };

    const removeListItem = (key: string, index: number) => {
        const current = getListValue(key);
        if (current.length <= 1) return; // Keep at least one item
        const updated = current.filter((_, i) => i !== index);
        setListItems(prev => ({ ...prev, [key]: updated }));
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

        // Process list fields - convert arrays to JSON strings
        Object.keys(listItems).forEach(key => {
            const items = listItems[key].filter(item => item.trim() !== '');
            if (items.length > 0) {
                formData.set(key, JSON.stringify(items));
            }
        });

        try {
            const result = await saveStaticContent(formData);
            if (result && !result.success) {
                alert(`Error: ${result.error}`);
            } else {
                alert('Content saved successfully!');
                window.location.reload();
            }
        } catch (error: any) {
            console.error('Failed to save:', error);
            alert('A network error occurred. Please try again.');
        } finally {
            setIsSaving(false);
        }
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

                    {Object.entries(groupedFields).map(([sectionName, fields]) => {
                        const isCounterOrSimple = fields.every(f => f.type === 'text') && fields.length <= 3;

                        return (
                            <div key={sectionName} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-heading font-bold text-foreground">{sectionName}</h3>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>

                                <div className={`bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100 grid grid-cols-1 ${isCounterOrSimple ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 lg:gap-8`}>
                                    {fields.map(field => (
                                        <div key={field.key} className={(!isCounterOrSimple && (field.type === 'textarea' || field.type === 'image')) ? 'md:col-span-2' : ''}>
                                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">{field.label}</label>

                                            {field.type === 'image' ? (
                                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                                    <div className="w-full md:w-64 aspect-video bg-white border-2 border-dashed border-border rounded-xl overflow-hidden flex items-center justify-center relative group shadow-sm">
                                                        {(previews[field.key] || getContentValue(activeTab, field.key)) ? (
                                                            <img src={previews[field.key] || getContentValue(activeTab, field.key)} alt={field.label} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon className="text-slate-200" size={48} />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <label className="btn-secondary inline-flex items-center gap-2 cursor-pointer py-2 px-5 text-sm hover:bg-white transition-colors">
                                                            <Upload size={16} /> Upload Image
                                                            <input type="file" name={field.key} accept="image/*" onChange={(e) => handleImageChange(field.key, e)} className="hidden" />
                                                        </label>
                                                        <p className="text-[10px] text-muted">Recommended: High resolution, WebP/JPG/PNG.</p>
                                                    </div>
                                                </div>
                                            ) : field.type === 'textarea' ? (
                                                <textarea
                                                    name={field.key}
                                                    defaultValue={getContentValue(activeTab, field.key)}
                                                    rows={4}
                                                    className="w-full bg-white border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-primary/30"
                                                />
                                            ) : field.type === 'list' ? (
                                                <div className="space-y-3">
                                                    {getListValue(field.key).map((item, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={item}
                                                                onChange={(e) => updateListItem(field.key, index, e.target.value)}
                                                                placeholder={`Item ${index + 1}`}
                                                                className="flex-1 bg-white border border-border p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-primary/30"
                                                            />
                                                            {getListValue(field.key).length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeListItem(field.key, index)}
                                                                    className="px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                                                    title="Remove item"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => addListItem(field.key)}
                                                        className="w-full py-3 px-4 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        Add Item
                                                    </button>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={field.key}
                                                    defaultValue={getContentValue(activeTab, field.key)}
                                                    className="w-full bg-white border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-primary/30"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

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
