import prisma from "@/lib/prisma";
import ContentClient from "./ContentClient";

export default async function ContentManagementPage() {
    const content = await prisma.staticContent.findMany();

    return <ContentClient initialContent={content} />;
}
