'use client';

import { useState } from "react";
import { Portfolio, PortfolioCategory } from "@prisma/client";
import PortfolioList from "@/components/admin/PortfolioList";
import PortfolioForm from "@/components/admin/PortfolioForm";
import CategoryList from "./categories/CategoryList";
import { savePortfolio, deletePortfolio } from "./actions";
import { LayoutGrid, Tags } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function PortfolioClient({
    initialPortfolios,
    categories
}: {
    initialPortfolios: Portfolio[],
    categories: PortfolioCategory[]
}) {
    const [activeTab, setActiveTab] = useState<'projects' | 'categories'>('projects');
    const [portfolios, setPortfolios] = useState(initialPortfolios);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
    const { showToast, ToastComponent } = useToast();

    const handleAdd = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (portfolio: Portfolio) => {
        setEditingItem(portfolio);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deletePortfolio(id);
        setPortfolios(portfolios.filter(p => p.id !== id));
        showToast('Portfolio deleted successfully', 'success');
    };

    const handleSave = async (formData: FormData) => {
        await savePortfolio(formData);
        setIsFormOpen(false);
        showToast(editingItem ? 'Portfolio updated successfully!' : 'Portfolio created successfully!', 'success');
        setTimeout(() => window.location.reload(), 1000);
    };

    return (
        <div className="space-y-8">
            {ToastComponent}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-foreground">Portfolio</h1>
                    <p className="text-muted">Manage your projects and their categories.</p>
                </div>
            </div>

            <div className="flex gap-4 border-b border-border pb-6">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'projects'
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-white text-muted hover:bg-slate-50 border border-border'
                        }`}
                >
                    <LayoutGrid size={18} /> Projects
                </button>
                <button
                    onClick={() => setActiveTab('categories')}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'categories'
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-white text-muted hover:bg-slate-50 border border-border'
                        }`}
                >
                    <Tags size={18} /> Categories
                </button>
            </div>

            {activeTab === 'projects' ? (
                <PortfolioList
                    portfolios={portfolios}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                />
            ) : (
                <CategoryList categories={categories} />
            )}

            {isFormOpen && (
                <PortfolioForm
                    initialData={editingItem}
                    categories={categories}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
