import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs: { name: string; href: string }[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
    return (
        <section className="bg-secondary py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl">
                    <nav className="flex items-center gap-2 text-sm font-medium text-muted mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        {breadcrumbs.map((item, index) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <ChevronRight size={14} />
                                <Link
                                    href={item.href}
                                    className={`${index === breadcrumbs.length - 1 ? 'text-primary font-bold' : 'hover:text-primary transition-colors'}`}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-muted leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
