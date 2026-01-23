'use client';

import { Service } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ServiceListProps {
    services: Service[];
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
}

export default function ServiceList({ services, onEdit, onDelete }: ServiceListProps) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-border">
                        <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted">Title</th>
                        <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted">Icon</th>
                        <th className="px-8 py-6 font-bold text-xs uppercase tracking-wider text-muted text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-8 py-20 text-center text-muted italic">No services found.</td>
                        </tr>
                    ) : (
                        services.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="font-bold text-foreground text-sm">{item.title}</div>
                                    <div className="text-xs text-muted line-clamp-1">{item.description}</div>
                                </td>
                                <td className="px-8 py-6 text-sm text-muted">{item.icon || 'None'}</td>
                                <td className="px-8 py-6 text-right space-x-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-muted hover:text-primary transition-colors inline-block"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
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
    );
}
