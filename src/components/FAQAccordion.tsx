'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 ${openId === item.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border bg-slate-50/50 hover:bg-slate-50'
                        }`}
                >
                    <button
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        className="w-full flex justify-between items-center p-6 text-left"
                    >
                        <span className="font-heading font-bold text-foreground pr-8">{item.question}</span>
                        <ChevronDown
                            size={20}
                            className={`text-primary transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`}
                        />
                    </button>
                    <AnimatePresence>
                        {openId === item.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 text-muted leading-relaxed">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
