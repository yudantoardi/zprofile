import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Simple logic to help Next.js pick up major schema changes in dev mode
if (process.env.NODE_ENV !== 'production' && globalForPrisma.prisma) {
    // If you add new models and they aren't appearing, this check helps trigger a refresh
    if (!('faq' in globalForPrisma.prisma) && ('siteSettings' in globalForPrisma.prisma)) {
        // @ts-ignore
        globalForPrisma.prisma = undefined;
    }
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
