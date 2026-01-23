'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Linkedin, Bookmark, Menu as MenuIcon, X, Dribbble } from 'lucide-react';
import { useState } from 'react';
import { SiteSettings } from '@prisma/client';

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact Us', href: '/contact' },
];

export default function Header({ settings }: { settings: SiteSettings | null }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="glass-header">
            <div className="container-custom">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {settings?.logo ? (
                            <img src={settings.logo} alt={settings.companyName} className="h-10 w-auto" />
                        ) : (
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">
                                    {(settings?.companyName || 'C').charAt(0)}
                                </span>
                            </div>
                        )}
                        <span className="text-xl font-heading font-bold text-foreground tracking-tight">
                            {settings?.companyName || 'CorpProfile'}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold transition-colors hover:text-primary ${pathname === item.href ? 'text-primary' : 'text-muted'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Icons & CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-3 pr-4 border-r border-border">
                            {settings?.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {settings?.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {settings?.behance && (
                                <a href={settings.behance} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">
                                    <Bookmark size={18} />
                                </a>
                            )}
                            {settings?.dribbble && (
                                <a href={settings.dribbble} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">
                                    <Dribbble size={18} />
                                </a>
                            )}
                        </div>
                        <Link href="/contact" className="btn-primary py-2 px-5 text-sm">
                            Let's Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-muted"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-border absolute w-full left-0 py-6 px-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-lg font-semibold ${pathname === item.href ? 'text-primary' : 'text-foreground'
                                }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 mt-2 pt-4 border-t border-border">
                        {settings?.instagram && (
                            <a href={settings.instagram} target="_blank" className="text-muted">
                                <Instagram size={20} />
                            </a>
                        )}
                        {settings?.linkedin && (
                            <a href={settings.linkedin} target="_blank" className="text-muted">
                                <Linkedin size={20} />
                            </a>
                        )}
                        <Link href="/contact" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                            Let's Talk
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
