'use client';

import { useState } from "react";
import { Portfolio, PortfolioCategory } from "@prisma/client";
import { X, Save, Upload } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface PortfolioFormProps {
    initialData?: Portfolio | null;
    categories: PortfolioCategory[];
    onClose: () => void;
    onSave: (data: FormData) => void;
}

export default function PortfolioForm({ initialData, categories, onClose, onSave }: PortfolioFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.thumbnail || null);
    const [content, setContent] = useState(initialData?.content || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [isSaving, setIsSaving] = useState(false);
    const [progress, setProgress] = useState(0);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (!initialData) { // Only auto-generate slug for new projects
            setSlug(generateSlug(title));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setProgress(0);

        const formData = new FormData(e.currentTarget);
        formData.set('content', content);
        formData.set('slug', slug);

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            await onSave(formData);
            setProgress(100);
            clearInterval(progressInterval);
        } catch (error) {
            clearInterval(progressInterval);
            setIsSaving(false);
            setProgress(0);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
                <div className="p-10 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                        {initialData ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all" disabled={isSaving}><X /></button>
                </div>

                {isSaving && (
                    <div className="px-10 pt-6">
                        <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-foreground">Saving portfolio...</span>
                                <span className="font-bold text-primary">{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    {initialData && <input type="hidden" name="id" value={initialData.id} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Project Title</label>
                                <input name="title" required defaultValue={initialData?.title} onChange={handleTitleChange} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E.g. Digital Transformation" disabled={isSaving} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Slug</label>
                                <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="digital-transformation" disabled={isSaving} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Category</label>
                                <select name="categoryId" defaultValue={initialData?.categoryId || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" disabled={isSaving}>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Thumbnail</label>
                            <label className={`block ${isSaving ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} group`}>
                                <div className="aspect-video bg-slate-50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-all relative">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-4">
                                            <Upload className="mx-auto text-muted mb-2 group-hover:text-primary transition-colors" size={24} />
                                            <span className="text-xs font-medium text-muted">Upload project cover</span>
                                        </div>
                                    )}
                                    <input type="file" name="thumbnailFile" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isSaving} />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Short Description</label>
                        <textarea name="description" required defaultValue={initialData?.description} rows={3} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Briefly describe the project..." disabled={isSaving}></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Detailed Content</label>
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                            placeholder="Write detailed case study content..."
                        />
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving}>
                            <Save size={20} />
                            {isSaving ? 'Saving...' : (initialData ? 'Update Project' : 'Save Project')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
