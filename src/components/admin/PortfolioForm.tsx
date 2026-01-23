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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('content', content);
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
                <div className="p-10 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                        {initialData ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    {initialData && <input type="hidden" name="id" value={initialData.id} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Project Title</label>
                                <input name="title" required defaultValue={initialData?.title} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E.g. Digital Transformation" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Category</label>
                                <select name="categoryId" defaultValue={initialData?.categoryId || ''} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none">
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Thumbnail</label>
                            <label className="block cursor-pointer group">
                                <div className="aspect-video bg-slate-50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-all relative">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center p-4">
                                            <Upload className="mx-auto text-muted mb-2 group-hover:text-primary transition-colors" size={24} />
                                            <span className="text-xs font-medium text-muted">Upload project cover</span>
                                        </div>
                                    )}
                                    <input type="file" name="thumbnailFile" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Short Description</label>
                        <textarea name="description" required defaultValue={initialData?.description} rows={3} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Briefly describe the project..."></textarea>
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
                        <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-2 text-lg">
                            <Save size={20} />
                            {initialData ? 'Update Project' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
