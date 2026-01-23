'use client';

import { useState } from "react";
import { PortfolioCategory } from "@prisma/client";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";
import { saveCategory, deleteCategory } from "./actions";

export default function CategoryList({ categories }: { categories: PortfolioCategory[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioCategory | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-heading font-bold text-xl">Categories</h3>
                <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                    <Plus size={16} /> Add New Category
                </button>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-border overflow-hidden">
                {categories.length === 0 ? (
                    <div className="p-8 text-center text-muted italic">No categories created yet.</div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white border-b border-border text-muted font-bold uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-100 transition-colors">
                                    <td className="p-4 font-bold text-foreground">{cat.name}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => { setEditingItem(cat); setIsFormOpen(true); }}
                                            className="p-2 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={async () => { if (confirm('Delete category?')) await deleteCategory(cat.id); }}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-heading font-bold">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
                            <button onClick={() => setIsFormOpen(false)}><X /></button>
                        </div>
                        <form action={async (fd) => { await saveCategory(fd); setIsFormOpen(false); }} className="space-y-6">
                            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}
                            <div>
                                <label className="block text-sm font-bold mb-2">Category Name</label>
                                <input
                                    name="name"
                                    required
                                    defaultValue={editingItem?.name || ''}
                                    className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. Branding"
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                                <Save size={18} /> Save Category
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
