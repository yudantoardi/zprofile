'use client';

import { useState } from "react";
import { CustomPage } from "@prisma/client";
import { Plus, Edit, Trash2, Save, X, FileText, Upload } from "lucide-react";
import { savePage, deletePage } from "./actions";
import RichTextEditor from "@/components/RichTextEditor";

export default function PageClient({ initialPages }: { initialPages: CustomPage[] }) {
    const [pages, setPages] = useState(initialPages);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CustomPage | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [content, setContent] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('content', content);
        await savePage(formData);
        setIsFormOpen(false);
        window.location.reload();
    };

    const openForm = (page: CustomPage | null) => {
        setEditingItem(page);
        setPreview(page?.image || null);
        setContent(page?.content || '');
        setIsFormOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Custom Pages</h1>
                    <p className="text-muted">Create additional pages for your website.</p>
                </div>
                <button onClick={() => openForm(null)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Page
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pages.length === 0 ? (
                    <div className="col-span-full bg-white rounded-[2rem] border border-border p-20 text-center text-muted italic">
                        No custom pages created yet.
                    </div>
                ) : (
                    pages.map(page => (
                        <div key={page.id} className="bg-white p-8 rounded-3xl border border-border shadow-sm group hover:shadow-xl transition-all h-full flex flex-col">
                            <div className="aspect-video mb-6 bg-slate-50 rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                                {page.image ? (
                                    <img src={page.image} alt={page.title} className="w-full h-full object-cover" />
                                ) : (
                                    <FileText className="text-primary/20" size={48} />
                                )}
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-2">{page.title}</h3>
                            <p className="text-sm text-muted mb-6 flex-1">/{page.slug}</p>
                            <div className="flex gap-2">
                                <button onClick={() => openForm(page)} className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    <Edit size={16} /> Edit
                                </button>
                                <button onClick={async () => { if (confirm('Delete?')) await deletePage(page.id); window.location.reload(); }} className="py-3 px-4 bg-slate-50 hover:bg-red-50 text-red-500 rounded-xl transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-heading font-bold">{editingItem ? 'Edit Page' : 'Add Page'}</h2>
                            <button onClick={() => setIsFormOpen(false)}><X /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-8">
                            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Page Title</label>
                                        <input name="title" required defaultValue={editingItem?.title || ''} className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="E.g. Privacy Policy" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Slug</label>
                                        <input name="slug" required defaultValue={editingItem?.slug || ''} className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. privacy-policy" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Featured Image</label>
                                    <label className="block cursor-pointer group">
                                        <div className="aspect-video bg-slate-50 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-primary transition-all relative">
                                            {preview ? (
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <Upload className="mx-auto text-muted mb-2 group-hover:text-primary transition-all" size={24} />
                                                    <span className="text-xs font-medium text-muted">Upload page header image</span>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Content</label>
                                <RichTextEditor
                                    content={content}
                                    onChange={setContent}
                                    placeholder="Write your page content..."
                                />
                            </div>

                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary flex-1 py-4 flex items-center justify-center gap-2">
                                    <Save size={18} /> Save Page
                                </button>
                                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 bg-slate-100 rounded-xl font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
