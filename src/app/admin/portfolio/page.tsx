import prisma from "@/lib/prisma";
import PortfolioClient from "./PortfolioClient";

export default async function PortfolioManagementPage() {
    const portfolios = await prisma.portfolio.findMany({
        orderBy: { order: 'asc' },
        include: { Category: true }
    });

    const categories = await prisma.portfolioCategory.findMany({
        orderBy: { name: 'asc' }
    });

    return <PortfolioClient initialPortfolios={portfolios} categories={categories} />;
}
