import prisma from "@/lib/prisma";
import PricingClient from "./PricingClient";

export default async function PricingManagementPage() {
    const pricings = await prisma.pricingPlan.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="container mx-auto py-10">
            <PricingClient initialPricings={pricings} />
        </div>
    );
}
