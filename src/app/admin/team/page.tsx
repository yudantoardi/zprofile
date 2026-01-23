import prisma from "@/lib/prisma";
import TeamClient from "./TeamClient";

export default async function TeamManagementPage() {
    const team = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' }
    });

    return <TeamClient initialTeam={team} />;
}
