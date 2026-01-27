'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    subtitle?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    bgImage?: string;
}

export default function Hero({
    subtitle,
    title,
    description,
    ctaText,
    ctaLink,
    bgImage
}: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
            {/* Background Decorative Elements or Image */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/50 -skew-x-12 translate-x-1/4 pointer-events-none" />

            {bgImage && (
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
                    <img src={bgImage} alt="" className="w-full h-full object-cover" />
                </div>
            )}

            <div className="container-custom relative z-10 py-20 lg:py-32">
                <div className="max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-primary/20">
                            {subtitle || 'Best Digital Agency'}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-foreground leading-[1.1] mb-8 tracking-tighter">
                            {title || 'Grow Your Business Faster & Smarter'}
                        </h1>
                        <p className="text-xl text-muted leading-relaxed mb-10 max-w-2xl">
                            {description || 'We provide innovative digital solutions tailored to your business needs.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href={ctaLink || "/contact"} className="btn-primary w-full sm:w-auto px-8 py-4 text-lg group shadow-xl shadow-primary/20">
                                {ctaText || 'Get Started Now'}
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/portfolio" className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg backdrop-blur-sm bg-white/50">
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="hidden lg:block absolute right-0 top-1/2 w-[40%] pr-20"
                initial={{ opacity: 0, x: 50, y: "-50%" }}
                animate={{ opacity: 1, x: 0, y: "-50%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="aspect-square bg-white rounded-[3rem] shadow-2xl relative overflow-hidden border border-border p-4 group">
                    <div className="w-full h-full bg-slate-100 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                        {bgImage ? (
                            <img src={bgImage} alt="Hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                            <span className="text-slate-300 font-bold text-lg">Digital Agency</span>
                        )}
                    </div>
                    {/* Floating Accent */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                </div>
            </motion.div>
        </section>
    );
}
