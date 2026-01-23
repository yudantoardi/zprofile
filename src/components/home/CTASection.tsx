'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
}

export default function CTASection({ title, description, buttonText }: CTASectionProps) {
    return (
        <section className="py-24">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-[3rem] py-20 px-10 text-center relative overflow-hidden shadow-2xl shadow-primary/30"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 tracking-tight">
                            {title || 'Ready to Elevate Your Business Online?'}
                        </h2>
                        <p className="text-lg text-blue-100 mb-10 leading-relaxed">
                            {description || "Let's discuss how we can help you achieve your goals with our professional digital services."}
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center bg-white text-primary font-bold px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl group">
                            {buttonText || 'Contact Us Now'}
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
