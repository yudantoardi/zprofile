'use client';

import { useState } from "react";
import { PartnerLogo } from "@prisma/client";
import { Plus, Edit, Trash2, Upload, X, Save } from "lucide-react";
import { savePartner, deletePartner } from "./actions";

export default function PartnerClient({ initialPartners }: { initialPartners: PartnerLogo[] }) {
    const [partners, setPartners] = useState(initialPartners);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PartnerLogo | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setPreview(null);
        setIsFormOpen(true);
    };

    const handleEdit = (partner: PartnerLogo) => {
        setEditingItem(partner);
        setPreview(partner.image);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this client logo?')) {
            await deletePartner(id);
            setPartners(partners.filter(p => p.id !== id));
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

    const handleSave = async (formData: FormData) => {
        await savePartner(formData);
        setIsFormOpen(false);
        window.location.reload();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Client Logos</h1>
                    <p className="text-muted">Manage the partner logos displayed in the scrolling marquee.</p>
                </div>
                <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Logo
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {partners.map((partner) => (
                    <div key={partner.id} className="bg-white p-6 rounded-3xl border border-border shadow-sm group relative">
                        <img src={partner.image} alt={partner.name || 'Client'} className="w-full h-12 object-contain grayscale group-hover:grayscale-0 transition-all" />
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => handleEdit(partner)} className="p-1.5 bg-white shadow-md rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(partner.id)} className="p-1.5 bg-white shadow-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl">
                        <div className="p-8 border-b border-border flex justify-between items-center">
                            <h2 className="text-xl font-heading font-bold">{editingItem ? 'Edit Logo' : 'Add Logo'}</h2>
                            <button onClick={() => setIsFormOpen(false)}><X /></button>
                        </div>
                        <form action={handleSave} className="p-8 space-y-6">
                            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}
                            <div>
                                <label className="block text-sm font-bold mb-2">Client Name</label>
                                <input name="name" defaultValue={editingItem?.name || ''} className="w-full bg-slate-50 border border-border p-3 rounded-xl outline-none" placeholder="E.g. Google" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Logo Image</label>
                                <label className="block cursor-pointer">
                                    <div className="aspect-video bg-slate-50 border-2 border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden">
                                        {preview ? <img src={preview} className="h-full object-contain p-4" /> : <Upload className="text-muted" />}
                                    </div>
                                    <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                                <Save size={18} /> Save Logo
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
