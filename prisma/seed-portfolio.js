const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedPortfolio() {
    console.log('🌱 Seeding portfolio data...');

    // Create categories first
    const webCategory = await prisma.portfolioCategory.upsert({
        where: { name: 'Web Development' },
        update: {},
        create: { name: 'Web Development' }
    });

    const mobileCategory = await prisma.portfolioCategory.upsert({
        where: { name: 'Mobile Apps' },
        update: {},
        create: { name: 'Mobile Apps' }
    });

    const brandingCategory = await prisma.portfolioCategory.upsert({
        where: { name: 'Branding' },
        update: {},
        create: { name: 'Branding' }
    });

    const uiuxCategory = await prisma.portfolioCategory.upsert({
        where: { name: 'UI/UX Design' },
        update: {},
        create: { name: 'UI/UX Design' }
    });

    // Portfolio items
    const portfolioItems = [
        {
            title: 'E-Commerce Platform Redesign',
            description: 'Complete redesign and development of a modern e-commerce platform with advanced features.',
            categoryId: webCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>We partnered with a leading retail brand to completely redesign their e-commerce platform, focusing on user experience and conversion optimization.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Advanced product filtering and search</li>
                    <li>Personalized product recommendations</li>
                    <li>One-click checkout process</li>
                    <li>Real-time inventory management</li>
                    <li>Mobile-first responsive design</li>
                </ul>
                
                <h3>Results</h3>
                <p>The new platform resulted in a <strong>45% increase in conversion rate</strong> and <strong>60% improvement in page load speed</strong>.</p>
                
                <h3>Technologies Used</h3>
                <p>Next.js, React, TypeScript, Tailwind CSS, Stripe, PostgreSQL</p>
            `,
            order: 1
        },
        {
            title: 'FinTech Mobile Application',
            description: 'Secure and intuitive mobile banking app with advanced financial management features.',
            categoryId: mobileCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>Developed a comprehensive mobile banking application that provides users with complete control over their finances.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Biometric authentication</li>
                    <li>Real-time transaction notifications</li>
                    <li>Budget tracking and analytics</li>
                    <li>Bill payment automation</li>
                    <li>Investment portfolio management</li>
                </ul>
                
                <h3>Results</h3>
                <p>Achieved <strong>4.8-star rating</strong> on app stores with over <strong>100,000 downloads</strong> in the first month.</p>
                
                <h3>Technologies Used</h3>
                <p>React Native, Node.js, MongoDB, Firebase, Plaid API</p>
            `,
            order: 2
        },
        {
            title: 'Corporate Brand Identity',
            description: 'Complete brand identity design for a tech startup including logo, guidelines, and marketing materials.',
            categoryId: brandingCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>Created a comprehensive brand identity for an emerging tech startup in the AI industry.</p>
                
                <h3>Deliverables</h3>
                <ul>
                    <li>Logo design and variations</li>
                    <li>Brand style guide</li>
                    <li>Business card and stationery</li>
                    <li>Social media templates</li>
                    <li>Presentation deck design</li>
                </ul>
                
                <h3>Brand Strategy</h3>
                <p>We developed a modern, tech-forward identity that communicates innovation and trustworthiness.</p>
                
                <h3>Impact</h3>
                <p>The new brand helped the client secure <strong>$2M in seed funding</strong> and establish a strong market presence.</p>
            `,
            order: 3
        },
        {
            title: 'SaaS Dashboard Interface',
            description: 'Intuitive dashboard design for a project management SaaS platform.',
            categoryId: uiuxCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>Designed a comprehensive dashboard interface for a project management platform serving enterprise clients.</p>
                
                <h3>Design Process</h3>
                <ul>
                    <li>User research and persona development</li>
                    <li>Information architecture</li>
                    <li>Wireframing and prototyping</li>
                    <li>Usability testing</li>
                    <li>High-fidelity design</li>
                </ul>
                
                <h3>Key Features</h3>
                <p>Customizable widgets, real-time collaboration, advanced reporting, and intuitive task management.</p>
                
                <h3>Results</h3>
                <p>User satisfaction increased by <strong>85%</strong> and task completion time reduced by <strong>40%</strong>.</p>
            `,
            order: 4
        },
        {
            title: 'Restaurant Booking Platform',
            description: 'Online reservation system with real-time availability and table management.',
            categoryId: webCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>Built a comprehensive restaurant booking platform that connects diners with restaurants.</p>
                
                <h3>Features</h3>
                <ul>
                    <li>Real-time table availability</li>
                    <li>Instant booking confirmation</li>
                    <li>Menu preview and special requests</li>
                    <li>Loyalty program integration</li>
                    <li>Restaurant management dashboard</li>
                </ul>
                
                <h3>Impact</h3>
                <p>Platform now serves <strong>500+ restaurants</strong> and processes <strong>10,000+ bookings monthly</strong>.</p>
                
                <h3>Technologies</h3>
                <p>Next.js, PostgreSQL, Redis, Stripe, Google Maps API</p>
            `,
            order: 5
        },
        {
            title: 'Fitness Tracking App',
            description: 'Comprehensive fitness and wellness tracking mobile application.',
            categoryId: mobileCategory.id,
            thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
            content: `
                <h2>Project Overview</h2>
                <p>Developed a feature-rich fitness tracking app that helps users achieve their health goals.</p>
                
                <h3>Features</h3>
                <ul>
                    <li>Workout tracking and planning</li>
                    <li>Nutrition logging</li>
                    <li>Progress analytics and insights</li>
                    <li>Social challenges and leaderboards</li>
                    <li>Integration with wearable devices</li>
                </ul>
                
                <h3>Results</h3>
                <p>Featured in App Store with <strong>4.9-star rating</strong> and <strong>250,000+ active users</strong>.</p>
                
                <h3>Tech Stack</h3>
                <p>Flutter, Firebase, HealthKit, Google Fit API</p>
            `,
            order: 6
        }
    ];

    // Delete existing portfolio items first
    await prisma.portfolio.deleteMany({});
    console.log('🗑️  Cleared existing portfolio items');

    // Create portfolio items
    await prisma.portfolio.createMany({
        data: portfolioItems
    });

    console.log(`✅ Created ${portfolioItems.length} portfolio items`);
    console.log('✨ Portfolio seeding completed!');
}

seedPortfolio()
    .catch((e) => {
        console.error('❌ Error seeding portfolio:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
