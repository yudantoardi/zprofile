import prisma from "@/lib/prisma";

export default async function generateMetadata({ params }: { params: { id: string } }) {
    const service = await prisma.service.findUnique({
        where: { id: params.id }
    });

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} | Our Services`,
        description: service.description,
    };
}
