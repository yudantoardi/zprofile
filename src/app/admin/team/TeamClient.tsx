'use client';

import { useState } from "react";
import { TeamMember } from "@prisma/client";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { saveTeamMember, deleteTeamMember } from "./actions";
import TeamForm from "@/components/admin/TeamForm";

export default function TeamClient({ initialTeam }: { initialTeam: TeamMember[] }) {
    const [team, setTeam] = useState(initialTeam);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TeamMember | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (member: TeamMember) => {
        setEditingItem(member);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Remove this team member?')) {
            await deleteTeamMember(id);
            setTeam(team.filter(m => m.id !== id));
        }
    };

    const handleSave = async (formData: FormData) => {
        await saveTeamMember(formData);
        setIsFormOpen(false);
        window.location.reload();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Team Management</h1>
                    <p className="text-muted">Manage your team members and their roles.</p>
                </div>
                <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-6 group">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                            {member.image ? <img src={member.image} className="w-full h-full object-cover" /> : <Users className="text-slate-300" size={24} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-heading font-bold text-foreground truncate">{member.name}</h4>
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">{member.role}</p>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => handleEdit(member)} className="p-2 text-muted hover:text-primary transition-colors"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(member.id)} className="p-2 text-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <TeamForm
                    initialData={editingItem}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
