import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Simple logic to help Next.js pick up major schema changes in dev mode
if (process.env.NODE_ENV !== 'production' && globalForPrisma.prisma) {
    // Check if we have the expected models, if not, reset the client
    const hasExpectedModels = 'siteSettings' in globalForPrisma.prisma && 'service' in globalForPrisma.prisma;
    if (!hasExpectedModels) {
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
