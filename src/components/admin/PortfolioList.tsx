'use client';

import { Portfolio, PortfolioCategory } from "@prisma/client";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

type PortfolioWithCategory = Portfolio & {
    Category: PortfolioCategory | null;
};

interface PortfolioListProps {
    portfolios: PortfolioWithCategory[];
    onEdit: (portfolio: PortfolioWithCategory) => void;
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export default function PortfolioList({ portfolios, onEdit, onDelete, onAdd }: PortfolioListProps) {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Manage Portfolio</h1>
                    <p className="text-muted">Showcase your best projects to your visitors.</p>
                </div>
                <button
                    onClick={onAdd}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-border">
                            <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted">Title</th>
                            <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted">Category</th>
                            <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {portfolios.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-8 py-20 text-center text-muted italic">No projects found. Add your first project.</td>
                            </tr>
                        ) : (
                            portfolios.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-foreground text-sm">{item.title}</div>
                                        <div className="text-xs text-muted line-clamp-1">{item.description}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {item.Category ? (
                                            <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider border border-primary/10">
                                                {item.Category.name}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted italic">No category</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="p-2 text-muted hover:text-primary transition-colors inline-block"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this project?')) {
                                                    onDelete(item.id);
                                                }
                                            }}
                                            className="p-2 text-muted hover:text-red-500 transition-colors inline-block"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
