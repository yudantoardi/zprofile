import prisma from "@/lib/prisma";
import ContentClient from "./ContentClient";

export default async function ContentManagementPage() {
    let content: any[] = [];
    try {
        content = await prisma.staticContent.findMany();
    } catch (error) {
        console.error('Failed to fetch content:', error);
    }

    return <ContentClient initialContent={content} />;
}
