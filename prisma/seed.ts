const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Clear existing data to avoid duplicates if re-running
    await prisma.menu.deleteMany();
    await prisma.staticContent.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.portfolioCategory.deleteMany();
    await prisma.service.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.teamMember.deleteMany();

    // Site Settings
    await prisma.siteSettings.upsert({
        where: { id: 'singleton' },
        update: {},
        create: {
            id: 'singleton',
            companyName: 'CorpProfile Digital',
            address: 'Jl. Melati No. 123, Jakarta Selatan, Indonesia',
            email: 'hello@corpprofile.com',
            phone: '+62 812 3456 7890',
            instagram: 'https://instagram.com/corpprofile',
            linkedin: 'https://linkedin.com/company/corpprofile',
            behance: 'https://behance.net/corpprofile',
            dribbble: 'https://dribbble.com/corpprofile',
            seoTitle: 'CorpProfile - Best Digital Agency',
            seoDescription: 'Helping businesses scale with innovative digital solutions.'
        },
    });

    // Static Content
    const staticContent = [
        { page: 'homepage', key: 'hero_title', value: 'We Create Digital Masterpieces' },
        { page: 'homepage', key: 'hero_description', value: 'We are a team of creative designers and developers dedicated to delivering the best digital products for our clients.' },
        { page: 'homepage', key: 'services_title', value: 'Our Expertise' },
        { page: 'homepage', key: 'portfolio_title', value: 'Recent Projects' },
        { page: 'about', key: 'about_title', value: 'Who We Are' },
        { page: 'about', key: 'about_description', value: 'CorpProfile is a leading digital agency with over 10 years of experience in the industry.' },
        { page: 'services', key: 'services_page_title', value: 'Services We Provide' },
        { page: 'portfolio', key: 'portfolio_page_title', value: 'Our Creative Portfolio' },
    ];

    for (const content of staticContent) {
        await prisma.staticContent.create({ data: content });
    }

    // Default Menus
    const menus = [
        { title: 'Home', link: '/', order: 0, isDefault: true },
        { title: 'About', link: '/about', order: 1, isDefault: true },
        { title: 'Services', link: '/services', order: 2, isDefault: true },
        { title: 'Portfolio', link: '/portfolio', order: 3, isDefault: true },
        { title: 'Pricing', link: '/pricing', order: 4, isDefault: true },
        { title: 'Contact Us', link: '/contact', order: 5, isDefault: true },
    ];

    for (const menu of menus) {
        await prisma.menu.create({ data: menu });
    }

    // Services
    const services = [
        { title: 'Web Development', description: 'Building high-performance, responsive websites using the latest technologies.', order: 1 },
        { title: 'UI/UX Design', description: 'Creating intuitive and Aesthetic designs that delight users.', order: 2 },
        { title: 'Digital Marketing', description: 'Results-driven marketing strategies to grow your online presence.', order: 3 },
    ];

    for (const service of services) {
        await prisma.service.create({ data: service });
    }

    // Portfolio Categories
    const categories = [
        { name: 'Branding' },
        { name: 'Web Design' },
        { name: 'Mobile App' },
    ];

    const cats = [];
    for (const cat of categories) {
        const c = await prisma.portfolioCategory.create({ data: cat });
        cats.push(c);
    }

    // Portfolio Items
    const portfolios = [
        { title: 'E-commerce Redesign', description: 'A complete overhaul of a fashion brand\'s online store.', categoryId: cats[1].id, order: 1, content: '<p>Detailed case study here...</p>' },
        { title: 'Fitness App', description: 'Mobile application for tracking fitness goals and workouts.', categoryId: cats[2].id, order: 2, content: '<p>Detailed case study here...</p>' },
        { title: 'Legacy Tech Branding', description: 'Brand identity design for a tech startup.', categoryId: cats[0].id, order: 3, content: '<p>Detailed case study here...</p>' },
    ];

    for (const portfolio of portfolios) {
        await prisma.portfolio.create({ data: portfolio });
    }

    // Testimonials
    const testimonials = [
        { name: 'John Doe', role: 'CEO at StartupX', content: 'CorpProfile transformed our business. Their attention to detail is unmatched.', rating: 5, order: 1 },
        { name: 'Jane Smith', role: 'Marketing Manager', content: 'The new website is stunning and fast. Our conversion rates have doubled!', rating: 5, order: 2 },
    ];

    for (const testimonial of testimonials) {
        await prisma.testimonial.create({ data: testimonial });
    }

    // Team Members
    const team = [
        { name: 'Alex Rivera', role: 'Creative Director', order: 1 },
        { name: 'Sarah Chen', role: 'Lead Developer', order: 2 },
    ];

    for (const member of team) {
        await prisma.teamMember.create({ data: member });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
