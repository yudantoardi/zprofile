'use client';

import { useState } from "react";
import { Menu, CustomPage } from "@prisma/client";
import { Plus, Edit, Trash2, Save, X, ArrowUp, ArrowDown, Lock, Link as LinkIcon, FileText } from "lucide-react";
import { saveMenu, deleteMenu, updateMenuOrder } from "./actions";

export default function MenuClient({
    initialMenus,
    customPages
}: {
    initialMenus: Menu[],
    customPages: CustomPage[]
}) {
    const [menus, setMenus] = useState(initialMenus);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Menu | null>(null);

    const handleSave = async (formData: FormData) => {
        await saveMenu(formData);
        setIsFormOpen(false);
        window.location.reload();
    };

    const handleMove = async (id: string, direction: 'up' | 'down') => {
        const index = menus.findIndex(m => m.id === id);
        if (direction === 'up' && index > 0) {
            const newMenus = [...menus];
            const temp = newMenus[index];
            newMenus[index] = newMenus[index - 1];
            newMenus[index - 1] = temp;

            // Update order values
            const updates = newMenus.map((m, i) => ({ id: m.id, order: i }));
            setMenus(newMenus);
            await updateMenuOrder(updates);
        } else if (direction === 'down' && index < menus.length - 1) {
            const newMenus = [...menus];
            const temp = newMenus[index];
            newMenus[index] = newMenus[index + 1];
            newMenus[index + 1] = temp;

            const updates = newMenus.map((m, i) => ({ id: m.id, order: i }));
            setMenus(newMenus);
            await updateMenuOrder(updates);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Navigation Menu</h1>
                    <p className="text-muted">Manage your website's header navigation. Default menus are protected.</p>
                </div>
                <button onClick={() => { setEditingItem(null); setIsFormOpen(true); }} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Menu Item
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-border text-muted font-bold uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-10 py-5">Order</th>
                            <th className="px-10 py-5">Title</th>
                            <th className="px-10 py-5">Link</th>
                            <th className="px-10 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {menus.map((item, index) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-5 font-mono text-xs text-muted">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleMove(item.id, 'up')}
                                            disabled={index === 0}
                                            className="p-1 hover:text-primary disabled:opacity-30"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleMove(item.id, 'down')}
                                            disabled={index === menus.length - 1}
                                            className="p-1 hover:text-primary disabled:opacity-30"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                        <span className="ml-2">{item.order}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-5 font-bold text-foreground">
                                    <div className="flex items-center gap-2">
                                        {item.isDefault && <Lock size={12} className="text-primary" />}
                                        {item.title}
                                    </div>
                                </td>
                                <td className="px-10 py-5 text-muted text-sm">{item.link}</td>
                                <td className="px-10 py-5 text-right space-x-2">
                                    <button
                                        onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    {!item.isDefault ? (
                                        <button
                                            onClick={async () => { if (confirm('Delete?')) await deleteMenu(item.id); window.location.reload(); }}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    ) : (
                                        <span className="p-2 text-slate-200 cursor-not-allowed">
                                            <Trash2 size={18} />
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl p-10 animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-heading font-bold">{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                            <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X /></button>
                        </div>
                        <form action={handleSave} className="space-y-6">
                            {editingItem && <input type="hidden" name="id" value={editingItem.id} />}

                            <div>
                                <label className="block text-sm font-bold mb-2">Title</label>
                                <input
                                    name="title"
                                    required
                                    defaultValue={editingItem?.title || ''}
                                    className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    placeholder="e.g. Services"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold mb-2">Link Source</label>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-muted mb-2 flex items-center gap-2"><LinkIcon size={12} /> External or Static Link</p>
                                        <input
                                            name="link"
                                            id="menu_link_input"
                                            defaultValue={editingItem?.link || ''}
                                            className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="e.g. /about or https://google.com"
                                        />
                                    </div>

                                    {customPages.length > 0 && (
                                        <div>
                                            <p className="text-xs font-bold text-muted mb-2 flex items-center gap-2"><FileText size={12} /> Or select Custom Page</p>
                                            <select
                                                className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                onChange={(e) => {
                                                    const input = document.getElementById('menu_link_input') as HTMLInputElement;
                                                    if (e.target.value) {
                                                        input.value = `/${e.target.value}`;
                                                    }
                                                }}
                                            >
                                                <option value="">-- Choose Page --</option>
                                                {customPages.map(page => (
                                                    <option key={page.id} value={page.slug}>{page.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Display Order</label>
                                <input
                                    name="order"
                                    type="number"
                                    defaultValue={editingItem?.order ?? menus.length}
                                    className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="submit" className="btn-primary flex-1 py-5 flex items-center justify-center gap-2">
                                    <Save size={20} /> Save Changes
                                </button>
                                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 bg-slate-100 rounded-xl font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
