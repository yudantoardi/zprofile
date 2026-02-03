const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

async function main() {
    console.log('Populating slugs for existing portfolios...');

    const portfolios = await prisma.portfolio.findMany({
        where: {
            OR: [
                { slug: null },
                { slug: '' }
            ]
        }
    });

    console.log(`Found ${portfolios.length} portfolios without slugs.`);

    for (const portfolio of portfolios) {
        let baseSlug = generateSlug(portfolio.title);
        let currentSlug = baseSlug;
        let counter = 1;

        // Ensure uniqueness
        while (true) {
            const existing = await prisma.portfolio.findFirst({
                where: {
                    slug: currentSlug,
                    NOT: { id: portfolio.id }
                }
            });

            if (!existing) break;

            currentSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        await prisma.portfolio.update({
            where: { id: portfolio.id },
            data: { slug: currentSlug }
        });

        console.log(`Updated portfolio "${portfolio.title}" with slug "${currentSlug}"`);
    }

    console.log('Slug population completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
