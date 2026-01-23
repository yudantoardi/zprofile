import prisma from "@/lib/prisma";
import MessageCard from "./MessageCard";

export default async function MessagesManagement() {
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Message Inbox</h1>
                <p className="text-muted">Read and manage inquiries from your visitors.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-border p-20 text-center text-muted italic shadow-sm">
                        No messages received yet.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <MessageCard key={msg.id} message={msg} />
                    ))
                )}
            </div>
        </div>
    );
}
