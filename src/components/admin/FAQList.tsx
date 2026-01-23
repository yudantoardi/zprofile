'use client';

import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { deleteFAQ, updateFAQOrder } from '@/app/admin/faq/actions';
import { Faq } from '@prisma/client';

interface FAQListProps {
    faqs: Faq[];
    onEdit: (faq: Faq) => void;
}

export default function FAQList({ faqs, onEdit }: FAQListProps) {
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this FAQ?')) {
            await deleteFAQ(id);
        }
    };

    const handleMove = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
        await updateFAQOrder(id, newOrder);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq) => (
                <div key={faq.id} className="bg-white p-6 rounded-3xl border border-border shadow-sm group hover:border-primary/50 transition-all">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">{faq.question}</h3>
                            <p className="text-sm text-muted line-clamp-2">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(faq)}
                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(faq.id)}
                                className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-400 uppercase tracking-widest">Order: {faq.order}</span>
                        <div className="flex gap-1">
                            <button
                                onClick={() => handleMove(faq.id, faq.order, 'up')}
                                className="p-1.5 hover:bg-slate-50 rounded text-slate-400 hover:text-primary transition-colors"
                                title="Move Up"
                            >
                                <ArrowUp size={14} />
                            </button>
                            <button
                                onClick={() => handleMove(faq.id, faq.order, 'down')}
                                className="p-1.5 hover:bg-slate-50 rounded text-slate-400 hover:text-primary transition-colors"
                                title="Move Down"
                            >
                                <ArrowDown size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
