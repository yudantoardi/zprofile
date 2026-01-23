'use client';

import { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import FAQList from '@/components/admin/FAQList';
import FAQForm from '@/components/admin/FAQForm';
import { Faq } from '@prisma/client';
import { useToast } from '@/components/Toast';

interface FAQClientProps {
    initialFAQs: Faq[];
}

export default function FAQClient({ initialFAQs }: FAQClientProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState<Faq | null>(null);
    const { showToast, ToastComponent } = useToast();

    const handleEdit = (faq: Faq) => {
        setEditingFAQ(faq);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingFAQ(null);
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <HelpCircle className="text-primary" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground leading-none mb-2">FAQ Management</h1>
                        <p className="text-sm text-muted">Manage the frequently asked questions displayed on the pricing page.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary flex items-center gap-2 px-8 py-4 "
                >
                    <Plus size={20} />
                    Add FAQ
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm p-8">
                {initialFAQs.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-dashed border-border text-slate-300">
                            <HelpCircle size={32} />
                        </div>
                        <p className="text-muted italic">No FAQs added yet. Start by adding one!</p>
                    </div>
                ) : (
                    <FAQList faqs={initialFAQs} onEdit={handleEdit} />
                )}
            </div>

            {isFormOpen && (
                <FAQForm
                    faq={editingFAQ}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
