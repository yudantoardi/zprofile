import prisma from "@/lib/prisma";
import { Search, Globe, Save } from "lucide-react";

export default async function SEOPage() {
    const settings = await prisma.siteSettings.findFirst() || {};

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">SEO Optimization</h1>
                <p className="text-muted">Enhance your website&apos;s visibility on search engines and track performance.</p>
            </div>

            <form className="max-w-4xl space-y-10">
                <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm space-y-8">
                    <h3 className="font-heading font-bold text-lg flex items-center gap-2 border-b border-border pb-4 mb-6">
                        <Globe size={18} className="text-primary" /> Meta Tags
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Meta Title Template</label>
                            <input type="text" defaultValue={settings.seoTitle || 'CorpProfile - Best Digital Agency'} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Meta Description</label>
                            <textarea defaultValue={settings.seoDescription || ''} rows={4} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"></textarea>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm space-y-8">
                    <h3 className="font-heading font-bold text-lg flex items-center gap-2 border-b border-border pb-4 mb-6">
                        <Search size={18} className="text-primary" /> Analytics & Tracking
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Google Tag Manager (GTM) ID</label>
                            <input type="text" defaultValue={settings.gtmId || ''} placeholder="GTM-XXXXXXX" className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                    </div>

                    <div className="pt-10">
                        <button type="submit" className="btn-primary px-10 py-5 flex items-center justify-center gap-2 ml-auto">
                            <Save size={20} /> Update SEO Settings
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
