'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface AboutSectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    image?: string;
}

export default function AboutSection({
    subtitle,
    title,
    description,
    ctaText,
    image
}: AboutSectionProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-20 border-8 border-white group">
                            {image ? (
                                <img src={image} alt="About Us" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    <span className="text-slate-300 font-bold italic">About Our Agency</span>
                                </div>
                            )}
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl z-10 animate-pulse" />
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/20 rounded-full blur-3xl z-10 animate-pulse" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-4 px-4 py-1 bg-secondary/10 rounded-full inline-block">
                                {subtitle || 'About Us'}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight tracking-tight">
                                {title || "We're On Mission to Help Business Grow Faster"}
                            </h2>
                        </div>
                        <p className="text-lg text-muted leading-relaxed">
                            {description || "We are a team of passionate designers, developers, and thinkers dedicated to creating meaningful digital experiences. We believe that every business has a unique story to tell, and we're here to help you tell yours in the most impactful way possible."}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Innovative Design', 'Technical Excellence', 'Customer Centric', 'Scalable Solutions'].map((item) => (
                                <li key={item} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-border">
                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                    </div>
                                    <span className="font-semibold text-foreground text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Link href="/about" className="btn-primary px-8 py-4">
                                {ctaText || 'Read More'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
