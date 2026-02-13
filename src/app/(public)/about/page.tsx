import prisma from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import * as LucideIcons from "lucide-react";
import { Smile, Globe, Users } from "lucide-react";
import { getPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return getPageMetadata('about');
}

export default async function AboutPage() {
    let content: any[] = [];
    let team: any[] = [];

    try {
        content = await prisma.staticContent.findMany({
            where: { page: 'about' }
        });

        team = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' }
        });
    } catch {
        // Handle database connection errors during build
        console.warn('Database not available during build, using default values');
        content = [];
        team = [];
    }

    const getContent = (key: string) => content.find(c => c.key === key)?.value;

    const getCounter = (index: number, defaultLabel: string, defaultValue: string, DefaultIcon: any) => {
        const title = getContent(`counter_${index}_title`);
        const value = getContent(`counter_${index}_number`);
        const iconName = (getContent(`counter_${index}_icon`) || '').trim();

        let IconComponent = DefaultIcon;
        if (iconName) {
            const iconKeys = Object.keys(LucideIcons);
            const match = iconKeys.find(
                key => key.toLowerCase() === iconName.toLowerCase()
            ) as keyof typeof LucideIcons;
            if (match && typeof LucideIcons[match] !== 'string') {
                IconComponent = LucideIcons[match];
            }
        }

        return {
            label: title || defaultLabel,
            value: value || defaultValue,
            icon: <IconComponent className="text-primary" size={24} />
        };
    };

    const stats = [
        getCounter(1, 'Happy Clients', '500+', Smile),
        getCounter(2, 'Websites Built', '1,200+', Globe),
        getCounter(3, 'Total Visitors', '5M+', Users),
    ];

    return (
        <>
            <PageHeader
                title={getContent('about_page_title') || "About Us"}
                description={getContent('about_page_description')?.substring(0, 100) || "We are a digital agency that helps your business grow with modern technology."}
                breadcrumbs={[{ name: 'About', href: '/about' }]}
            />

            <AboutSection
                subtitle={getContent('about_page_subtitle') || 'About Our Agency'}
                title={getContent('about_page_title') || "We're On Mission to Help Business Grow Faster"}
                description={getContent('about_page_description') || "We are a team of passionate designers, developers, and thinkers dedicated to creating meaningful digital experiences."}
                image={getContent('about_page_image')}
                points={getContent('about_page_points')}
                ctaText="Learn More"
            />

            {/* Counter Section */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white">{stat.value}</div>
                                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-4 px-4 py-1 bg-primary/10 rounded-full inline-block">Our Team</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
                            {getContent('team_section_title') || 'Meet the Creative Minds Behind Our Success'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                        {team.map((member) => (
                            <div key={member.id} className="group">
                                <div className="aspect-[3/4] rounded-[2.5rem] bg-slate-100 overflow-hidden mb-8 shadow-sm border border-border group-hover:shadow-2xl transition-all duration-500 relative group-hover:-translate-y-2">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic">
                                            Member Photo
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-2xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h4>
                                    <p className="text-primary font-bold text-sm tracking-widest uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
