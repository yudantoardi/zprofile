'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    description: string;
    icon?: string | null;
}

interface ServicesSectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    services?: Service[];
}

export default function ServicesSection({
    subtitle,
    title,
    description,
    services
}: ServicesSectionProps) {
    const displayServices = services || [];

    return (
        <section className="py-24 bg-secondary/30">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-4">
                        {subtitle || 'Our Services'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
                        {title || 'Tailored Solutions for Your Digital Needs'}
                    </h2>
                    <p className="text-lg text-muted">
                        {description || 'We offer a wide range of services to help you establish a strong digital presence and achieve your business goals.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayServices.length === 0 ? (
                        <div className="col-span-full py-20 text-center text-muted italic">
                            No services to display at the moment.
                        </div>
                    ) : (
                        displayServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all group h-full flex flex-col"
                            >
                                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                                    <div className="group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                                        {(() => {
                                            // Handle potential case mismatches or spaces
                                            const rawName = (service.icon || '').trim();
                                            if (!rawName) return <Briefcase size={32} />;

                                            // Find best match in LucideIcons keys
                                            const iconKeys = Object.keys(LucideIcons);
                                            const match = iconKeys.find(
                                                key => key.toLowerCase() === rawName.toLowerCase()
                                            ) as keyof typeof LucideIcons;

                                            const IconComponent = match ? LucideIcons[match] : LucideIcons.Briefcase;

                                            // Ensure it's a valid component
                                            const isValid = typeof IconComponent === 'function' || (typeof IconComponent === 'object' && ('render' in IconComponent || '$$typeof' in (IconComponent as any)));

                                            if (isValid) {
                                                // @ts-ignore
                                                return <IconComponent size={32} />;
                                            }

                                            return <Briefcase size={32} />;
                                        })()}
                                    </div>
                                </div>
                                <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted leading-relaxed mb-8 flex-1">
                                    {service.description}
                                </p>
                                <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-auto group/btn">
                                    Read More <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
