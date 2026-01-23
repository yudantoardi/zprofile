'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { saveFAQ } from '@/app/admin/faq/actions';
import { Faq } from '@prisma/client';

interface FAQFormProps {
    faq?: Faq | null;
    onClose: () => void;
}

export default function FAQForm({ faq, onClose }: FAQFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);

        const formData = new FormData(e.currentTarget);
        await saveFAQ(formData);

        setIsSaving(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-foreground">
                            {faq ? 'Edit FAQ' : 'Add New FAQ'}
                        </h2>
                        <p className="text-sm text-muted">Manage your frequently asked questions.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-border">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {faq?.id && <input type="hidden" name="id" value={faq.id} />}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Question</label>
                            <input
                                name="question"
                                defaultValue={faq?.question}
                                required
                                placeholder="e.g., Can I change plans anytime?"
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">Answer</label>
                            <textarea
                                name="answer"
                                defaultValue={faq?.answer}
                                required
                                rows={4}
                                placeholder="Provide a detailed answer..."
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">Display Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    defaultValue={faq?.order || 0}
                                    className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary px-8 py-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn-primary px-10 py-3 flex items-center gap-2"
                        >
                            <Save size={18} />
                            {isSaving ? 'Saving...' : 'Save FAQ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
