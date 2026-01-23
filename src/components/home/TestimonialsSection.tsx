'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string | null;
}

interface TestimonialsSectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    testimonials?: Testimonial[];
}

export default function TestimonialsSection({
    subtitle,
    title,
    description,
    testimonials
}: TestimonialsSectionProps) {
    const displayTestimonials = testimonials || [];

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <Quote className="absolute -top-10 -left-10 w-64 h-64 text-primary/5 opacity-50 rotate-12" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-4">
                            {subtitle || 'Testimonials'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 tracking-tight">
                            {title || 'What Our Clients Say About Us'}
                        </h2>
                        {description && <p className="text-lg text-muted mb-8 leading-relaxed">{description}</p>}

                        <div className="flex gap-4">
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border flex-1">
                                <div className="text-3xl font-heading font-bold text-foreground mb-1 text-primary">99%</div>
                                <div className="text-xs font-bold text-muted uppercase tracking-wider">Client Satisfaction</div>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border flex-1">
                                <div className="text-3xl font-heading font-bold text-foreground mb-1 text-primary">200+</div>
                                <div className="text-xs font-bold text-muted uppercase tracking-wider">Projects Completed</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {displayTestimonials.length === 0 ? (
                            <div className="bg-white p-10 rounded-[2.5rem] border border-border text-center text-muted italic">
                                No testimonials to show yet.
                            </div>
                        ) : (
                            displayTestimonials.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-border relative hover:shadow-xl transition-all group"
                                >
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                                        ))}
                                    </div>
                                    <p className="text-lg text-foreground leading-relaxed italic mb-8 group-hover:text-primary transition-colors">
                                        &ldquo;{item.content}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-100 rounded-full overflow-hidden border-2 border-primary/20 p-1">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-white rounded-full">
                                                    {item.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-heading font-bold text-foreground">{item.name}</h4>
                                            <p className="text-sm text-muted font-medium">{item.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
