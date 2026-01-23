'use client';

import { useState } from "react";
import { Service } from "@prisma/client";
import ServiceList from "@/components/admin/ServiceList";
import ServiceForm from "@/components/admin/ServiceForm";
import { saveService, deleteService } from "./actions";
import { useToast } from "@/components/Toast";

export default function ServiceClient({ initialServices }: { initialServices: Service[] }) {
    const [services, setServices] = useState(initialServices);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Service | null>(null);
    const { showToast, ToastComponent } = useToast();

    const handleAdd = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingItem(service);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await deleteService(id);
            setServices(services.filter(s => s.id !== id));
            showToast('Service deleted successfully', 'success');
        }
    };

    const handleSave = async (formData: FormData) => {
        await saveService(formData);
        setIsFormOpen(false);
        showToast(editingItem ? 'Service updated successfully!' : 'Service created successfully!', 'success');
        setTimeout(() => window.location.reload(), 1000);
    };

    return (
        <>
            {ToastComponent}
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Manage Services</h1>
                        <p className="text-muted">Edit or add services that appear on your website.</p>
                    </div>
                    <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
                        <span>Add Service</span>
                    </button>
                </div>

                <ServiceList
                    services={services}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
            {isFormOpen && (
                <ServiceForm
                    initialData={editingItem}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
