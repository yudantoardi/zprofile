'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PricingList from '@/components/admin/PricingList';
import PricingForm from '@/components/admin/PricingForm';
import { PricingPlan } from '@prisma/client';

interface PricingClientProps {
    initialPricings: PricingPlan[];
}

export default function PricingClient({ initialPricings }: PricingClientProps) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPricing, setEditingPricing] = useState<PricingPlan | null>(null);

    const handleEdit = (pricing: PricingPlan) => {
        setEditingPricing(pricing);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingPricing(null);
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Pricing Management</h1>
                    <p className="text-muted">Manage your service packages and pricing plans.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary flex items-center gap-2 px-8 py-4 "
                >
                    <Plus size={20} /> Add Plan
                </button>
            </div>

            <PricingList pricings={initialPricings} onEdit={handleEdit} />

            {isFormOpen && (
                <PricingForm
                    pricing={editingPricing}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
}
