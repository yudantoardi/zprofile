import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import PartnersSection from "@/components/home/PartnersSection";
import WorksSection from "@/components/home/WorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import prisma from "@/lib/prisma";

export default async function Home() {
  let content: any[] = [];
  let services: any[] = [];
  let portfolios: any[] = [];
  let testimonials: any[] = [];

  try {
    content = await prisma.staticContent.findMany({
      where: { page: 'homepage' }
    });

    services = await prisma.service.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
      orderBy: { order: 'asc' },
      take: 4
    });

    portfolios = await prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        Category: {
          select: { id: true, name: true }
        }
      },
      orderBy: { order: 'asc' },
      take: 3
    });

    testimonials = await prisma.testimonial.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        content: true,
        rating: true,
        image: true,
      },
      orderBy: { order: 'asc' },
      take: 5
    });
  } catch (error) {
    // Handle database connection errors during build
    console.warn('Database not available during build, using default values');
    content = [];
    services = [];
    portfolios = [];
    testimonials = [];
  }

  const getContent = (key: string) => content.find(c => c.key === key)?.value;

  return (
    <>
      <Hero
        subtitle={getContent('hero_subtitle')}
        title={getContent('hero_title')}
        description={getContent('hero_description')}
        ctaText={getContent('hero_cta_text')}
        ctaLink={getContent('hero_cta_link')}
        bgImage={getContent('hero_bg_image')}
      />
      <PartnersSection
        subtitle={getContent('partners_subtitle')}
        title={getContent('partners_title')}
      />
      <AboutSection
        subtitle={getContent('about_subtitle')}
        title={getContent('about_title')}
        description={getContent('about_description')}
        ctaText={getContent('about_cta_text')}
        image={getContent('about_image')}
      />
      <ServicesSection
        subtitle={getContent('services_subtitle')}
        title={getContent('services_title')}
        description={getContent('services_description')}
        services={services}
      />
      <WorksSection
        subtitle={getContent('works_subtitle')}
        title={getContent('works_title')}
        description={getContent('works_description')}
        ctaText={getContent('works_cta_text')}
        portfolios={portfolios}
      />
      <TestimonialsSection
        subtitle={getContent('testimonials_subtitle')}
        title={getContent('testimonials_title')}
        description={getContent('testimonials_description')}
        testimonials={testimonials}
      />
      <CTASection
        title={getContent('cta_title')}
        description={getContent('cta_description')}
        buttonText={getContent('cta_button_text')}
      />
    </>
  );
}
