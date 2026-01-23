'use client';

import { Calendar, Mail, Phone, Trash2, CheckCircle } from "lucide-react";
import { markAsRead, deleteMessage } from "./actions";
import { Message } from "@prisma/client";
import { useState } from "react";

interface MessageCardProps {
    message: Message;
}

export default function MessageCard({ message }: MessageCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isMarking, setIsMarking] = useState(false);

    const handleMarkAsRead = async () => {
        setIsMarking(true);
        await markAsRead(message.id);
        setIsMarking(false);
    };

    const handleDelete = async () => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            setIsDeleting(true);
            await deleteMessage(message.id);
        }
    };

    return (
        <div
            className={`bg-white rounded-3xl p-8 transition-all ${message.isRead
                    ? 'border-0 shadow-sm'
                    : 'border-2 border-primary shadow-lg shadow-primary/5'
                } ${isDeleting ? 'opacity-50' : ''}`}
        >
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                        {!message.isRead && (
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                New Inquiry
                            </span>
                        )}
                        <h3 className="text-xl font-heading font-bold text-foreground">{message.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-muted font-medium">
                        <div className="flex items-center gap-2">
                            <Mail size={16} /> {message.email}
                        </div>
                        {message.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={16} /> {message.phone}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar size={16} /> {new Date(message.createdAt).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 leading-relaxed border border-border">
                        {message.message}
                    </div>
                </div>
                <div className="shrink-0 flex md:flex-col gap-2">
                    {!message.isRead && (
                        <button
                            onClick={handleMarkAsRead}
                            disabled={isMarking}
                            className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all disabled:opacity-50"
                            title="Tandai sudah dibaca"
                        >
                            <CheckCircle size={18} />
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-3 bg-slate-100 hover:bg-red-50 text-red-400 rounded-xl transition-all disabled:opacity-50"
                        title="Hapus pesan"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
