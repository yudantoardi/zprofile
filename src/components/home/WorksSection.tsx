'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    Category?: { name: string } | null;
}

interface WorksSectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    portfolios?: Project[];
}

export default function WorksSection({
    subtitle,
    title,
    description,
    ctaText,
    portfolios
}: WorksSectionProps) {
    const displayPortfolios = portfolios || [];

    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-4">
                            {subtitle || 'Our Works'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight mb-4">
                            {title || 'Excellence in Every Project'}
                        </h2>
                        {description && <p className="text-muted text-lg">{description}</p>}
                    </div>
                    <div>
                        <Link href="/portfolio" className="btn-secondary group px-8 py-4">
                            {ctaText || 'All Our Work'}
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayPortfolios.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-muted italic">
                            No projects to display at the moment.
                        </div>
                    ) : (
                        displayPortfolios.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-[2.5rem] mb-6 aspect-video bg-slate-100 border border-border">
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500 z-10" />
                                    {item.thumbnail ? (
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic">
                                            Project Thumbnail
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold text-primary uppercase shadow-sm tracking-wider">
                                            {item.Category?.name || 'Uncategorized'}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-muted leading-relaxed mb-6 line-clamp-2">
                                    {item.description}
                                </p>
                                <Link href="/portfolio" className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors group/link">
                                    See Case Study <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
