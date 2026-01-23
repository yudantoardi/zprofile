'use client';

import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { deletePricing, updatePricingOrder } from '@/app/admin/pricing-actions';
import { PricingPlan } from '@prisma/client';

interface PricingListProps {
    pricings: PricingPlan[];
    onEdit: (pricing: PricingPlan) => void;
}

export default function PricingList({ pricings, onEdit }: PricingListProps) {
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this pricing plan?')) {
            await deletePricing(id);
        }
    };

    const handleMove = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
        await updatePricingOrder(id, newOrder);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricings.length === 0 ? (
                <div className="col-span-full py-20 text-center text-muted italic bg-white rounded-3xl border border-border">
                    No pricing plans found. Click "Add Plan" to create one.
                </div>
            ) : (
                pricings.map((plan) => (
                    <div key={plan.id} className={`bg-white p-8 rounded-[2.5rem] border-2 transition-all group ${plan.isPopular ? 'border-primary shadow-xl shadow-primary/5' : 'border-border shadow-sm'}`}>
                        {plan.isPopular && (
                            <span className="bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest absolute -top-3 left-1/2 -translate-x-1/2 shadow-lg shadow-primary/20">
                                Most Popular
                            </span>
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-1">{plan.name}</h3>
                                <p className="text-sm text-muted">{plan.description || 'Flexible plan for your needs'}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit(plan)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(plan.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-8">
                            <span className="text-4xl font-heading font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted ml-1 italic">/{plan.period}</span>
                        </div>

                        <div className="space-y-3 mb-8">
                            {plan.features.split('\n').filter(f => f.trim()).map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleMove(plan.id, plan.order, 'up')} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                                <ArrowUp size={16} />
                            </button>
                            <button onClick={() => handleMove(plan.id, plan.order, 'down')} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                                <ArrowDown size={16} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
