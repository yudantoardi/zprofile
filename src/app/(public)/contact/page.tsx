import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/home/CTASection";
import ContactForm from "./ContactForm";
import { Mail, MapPin, Phone, Instagram, Linkedin, Bookmark } from "lucide-react";

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact Us"
                description="Have a project in mind? We'd love to hear from you. Get in touch with our team."
                breadcrumbs={[{ name: 'Contact Us', href: '/contact' }]}
            />

            <section className="py-24 bg-white relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info Column */}
                        <div>
                            <div className="mb-12">
                                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Get in Touch</h2>
                                <p className="text-lg text-muted">
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0 border border-border">
                                        <MapPin className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-foreground mb-1">Our Office</h4>
                                        <p className="text-muted">Jl. Melati No. 123, Jakarta Selatan, Indonesia</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0 border border-border">
                                        <Mail className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-foreground mb-1">Email Us</h4>
                                        <p className="text-muted">hello@company.com</p>
                                        <p className="text-muted">support@company.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0 border border-border">
                                        <Phone className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-foreground mb-1">Call Us</h4>
                                        <p className="text-muted">+62 812 3456 7890</p>
                                        <p className="text-muted">+62 815 7830 1145</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-10 border-t border-border">
                                <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-wider text-xs">Follow Us</h4>
                                <div className="flex items-center gap-4">
                                    {[
                                        { icon: <Instagram size={20} />, href: '#' },
                                        { icon: <Linkedin size={20} />, href: '#' },
                                        { icon: <Bookmark size={20} />, href: '#' },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            className="w-12 h-12 bg-white border border-border rounded-xl flex items-center justify-center text-muted hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="bg-secondary/30 p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
