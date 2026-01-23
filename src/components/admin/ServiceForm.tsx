'use client';

import { useState } from "react";
import { Service } from "@prisma/client";
import { X, Save } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface ServiceFormProps {
    initialData?: Service | null;
    onClose: () => void;
    onSave: (data: FormData) => void;
}

export default function ServiceForm({ initialData, onClose, onSave }: ServiceFormProps) {
    const [content, setContent] = useState(initialData?.content || '');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('content', content);
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[1.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-8 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                        {initialData ? 'Edit Service' : 'Add New Service'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {initialData && <input type="hidden" name="id" value={initialData.id} />}

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Service Title</label>
                        <input name="title" required defaultValue={initialData?.title} className="w-full bg-slate-50 border border-border p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E.g. Web Development" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Icon Name (Lucide)</label>
                        <input name="icon" defaultValue={initialData?.icon || ''} className="w-full bg-slate-50 border border-border p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E.g. Code, Palette, Smartphone" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Short Description</label>
                        <textarea name="description" required defaultValue={initialData?.description} rows={2} className="w-full bg-slate-50 border border-border p-3 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Briefly describe the service..."></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Detailed Content</label>
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                            placeholder="Write detailed service description..."
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                            <Save size={18} />
                            {initialData ? 'Update Service' : 'Save Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
