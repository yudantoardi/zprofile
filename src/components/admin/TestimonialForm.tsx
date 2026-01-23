'use client';

import { useState } from "react";
import { Testimonial } from "@prisma/client";
import { X, Save, Upload, Star } from "lucide-react";

interface TestimonialFormProps {
    initialData?: Testimonial | null;
    onClose: () => void;
    onSave: (data: FormData) => void;
}

export default function TestimonialForm({ initialData, onClose, onSave }: TestimonialFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.image || null);
    const [rating, setRating] = useState(initialData?.rating || 5);

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
            <div className="bg-white rounded-[2.5rem] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
                <div className="p-8 border-b border-border flex justify-between items-center bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-heading font-bold">{initialData ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl"><X /></button>
                </div>

                <form action={onSave} className="p-8 space-y-6">
                    {initialData && <input type="hidden" name="id" value={initialData.id} />}

                    <div className="flex justify-center mb-6">
                        <label className="cursor-pointer group relative">
                            <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-all">
                                {preview ? (
                                    <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="text-muted group-hover:text-primary transition-colors" size={24} />
                                )}
                            </div>
                            <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Client Name</label>
                            <input name="name" required defaultValue={initialData?.name} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Role/Company</label>
                            <input name="role" required defaultValue={initialData?.role} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. CEO at TechCorp" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    className={`p-1 transition-colors ${s <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
                                >
                                    <Star size={24} fill={s <= rating ? 'currentColor' : 'none'} />
                                </button>
                            ))}
                            <input type="hidden" name="rating" value={rating} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Testimonial Content</label>
                        <textarea name="content" required defaultValue={initialData?.content} rows={4} className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none" placeholder="What the client said..."></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                        <Save size={18} /> Save Testimonial
                    </button>
                </form>
            </div>
        </div>
    );
}
