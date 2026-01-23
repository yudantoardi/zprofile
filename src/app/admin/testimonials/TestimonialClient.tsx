'use client';

import { useState } from "react";
import { Testimonial } from "@prisma/client";
import TestimonialList from "@/components/admin/TestimonialList";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { saveTestimonial, deleteTestimonial } from "./actions";

export default function TestimonialClient({ initialData }: { initialData: Testimonial[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: Testimonial) => {
        setEditingItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete testimonial?')) {
            await deleteTestimonial(id);
            window.location.reload();
        }
    };

    const handleSave = async (fd: FormData) => {
        await saveTestimonial(fd);
        setIsFormOpen(false);
        window.location.reload();
    };

    return (
        <div className="space-y-10">
            <TestimonialList
                testimonials={initialData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />
            {isFormOpen && (
                <TestimonialForm
                    initialData={editingItem}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
