'use client';

import { useState } from "react";
import { TeamMember } from "@prisma/client";
import { X, Save, Upload } from "lucide-react";

interface TeamFormProps {
    initialData?: TeamMember | null;
    onClose: () => void;
    onSave: (data: FormData) => void;
}

export default function TeamForm({ initialData, onClose, onSave }: TeamFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.image || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl">
                <div className="p-8 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-heading font-bold">{initialData ? 'Edit Member' : 'Add Member'}</h2>
                    <button onClick={onClose}><X /></button>
                </div>
                <form action={onSave} className="p-8 space-y-6">
                    {initialData && <input type="hidden" name="id" value={initialData.id} />}
                    <div className="flex justify-center">
                        <label className="block cursor-pointer">
                            <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-border rounded-full flex items-center justify-center overflow-hidden">
                                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Upload className="text-muted" />}
                            </div>
                            <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input name="name" required defaultValue={initialData?.name || ''} className="w-full bg-slate-50 border border-border p-3 rounded-xl outline-none" placeholder="E.g. John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Role</label>
                        <input name="role" required defaultValue={initialData?.role || ''} className="w-full bg-slate-50 border border-border p-3 rounded-xl outline-none" placeholder="E.g. Lead Developer" />
                    </div>
                    <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                        <Save size={18} /> Save Member
                    </button>
                </form>
            </div>
        </div>
    );
}
