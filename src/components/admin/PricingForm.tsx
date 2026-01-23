'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { savePricing } from '@/app/admin/pricing/actions';
import { PricingPlan } from '@prisma/client';

interface PricingFormProps {
    pricing?: PricingPlan | null;
    onClose: () => void;
}

export default function PricingForm({ pricing, onClose }: PricingFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);
        await savePricing(formData);
        setIsSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-border flex justify-between items-center bg-slate-50">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                        {pricing ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {pricing && <input type="hidden" name="id" value={pricing.id} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Plan Name</label>
                            <input
                                name="name"
                                defaultValue={pricing?.name}
                                required
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="e.g. Basic, Pro, Enterprise"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Price</label>
                            <input
                                name="price"
                                defaultValue={pricing?.price}
                                required
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="e.g. $49, Rp 500.000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Billing Period</label>
                            <select
                                name="period"
                                defaultValue={pricing?.period || 'month'}
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="month">Per Month</option>
                                <option value="year">Per Year</option>
                                <option value="once">One Time</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Display Order</label>
                            <input
                                type="number"
                                name="order"
                                defaultValue={pricing?.order || 0}
                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Description (Optional)</label>
                        <textarea
                            name="description"
                            defaultValue={pricing?.description || ''}
                            rows={2}
                            className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="Brief plan summary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Features (One per line)</label>
                        <textarea
                            name="features"
                            defaultValue={pricing?.features || ''}
                            required
                            rows={5}
                            className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        />
                    </div>

                    <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <input
                            type="checkbox"
                            name="isPopular"
                            id="isPopular"
                            value="true"
                            defaultChecked={pricing?.isPopular}
                            className="w-5 h-5 rounded border-primary text-primary focus:ring-primary"
                        />
                        <label htmlFor="isPopular" className="text-sm font-bold text-primary">Mark as Popular / Recommended Plan</label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="btn-secondary px-8 py-3">Cancel</button>
                        <button type="submit" disabled={isSaving} className="btn-primary px-10 py-3 flex items-center gap-2">
                            <Save size={18} /> {isSaving ? 'Saving...' : 'Save Plan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
