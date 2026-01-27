'use client';

import { Testimonial } from "@prisma/client";
import { Edit, Trash2, Plus, Star } from "lucide-react";

interface TestimonialListProps {
    testimonials: Testimonial[];
    onEdit: (item: Testimonial) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export default function TestimonialList({ testimonials, onEdit, onDelete, onAdd }: TestimonialListProps) {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Testimonials</h1>
                    <p className="text-muted">Manage what clients say about you.</p>
                </div>
                <button onClick={onAdd} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.length === 0 ? (
                    <div className="col-span-full bg-white rounded-[2.5rem] border border-border p-20 text-center text-muted italic">
                        No testimonials yet.
                    </div>
                ) : (
                    testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-border overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
                                    <p className="text-xs text-muted font-bold uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                                ))}
                            </div>

                            <p className="text-sm text-slate-600 italic leading-relaxed flex-1 mb-8">
                                &quot;{item.content}&quot;
                            </p>

                            <div className="flex gap-2">
                                <button onClick={() => onEdit(item)} className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    <Edit size={16} /> Edit
                                </button>
                                <button onClick={() => onDelete(item.id)} className="py-3 px-4 bg-slate-50 hover:bg-red-50 text-red-500 rounded-xl transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
