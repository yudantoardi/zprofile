import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram, Linkedin, Bookmark, Dribbble } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function Footer() {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
    const services = await prisma.service.findMany({
        orderBy: { order: 'asc' },
        take: 4 // Limit to 4 services for footer
    });

    return (
        <footer className="bg-slate-900 text-slate-300 py-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="text-xl font-heading font-bold text-white tracking-tight">
                                {settings?.companyName || 'Corp'}
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Helping businesses scale with innovative digital solutions. We combine design thinking with technical excellence to deliver value.
                        </p>
                        <div className="flex items-center gap-4">
                            {settings?.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {settings?.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {settings?.behance && (
                                <a href={settings.behance} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all">
                                    <Bookmark size={18} />
                                </a>
                            )}
                            {settings?.dribbble && (
                                <a href={settings.dribbble} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all">
                                    <Dribbble size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-heading font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Our Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-heading font-bold mb-6">Our Services</h4>
                        <ul className="space-y-4 text-sm">
                            {services.length === 0 ? (
                                <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
                            ) : (
                                services.map((service) => (
                                    <li key={service.id}>
                                        <Link href={`/services/${service.id}`} className="hover:text-primary transition-colors">
                                            {service.title}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-heading font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            {settings?.address && (
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-primary shrink-0" />
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings?.email && (
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-primary shrink-0" />
                                    <span>{settings.email}</span>
                                </li>
                            )}
                            {settings?.phone && (
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-primary shrink-0" />
                                    <span>{settings.phone}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {settings?.companyName || 'CorpProfile'}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
