'use client';

import { useState } from "react";
import { Upload } from "lucide-react";

export default function FaviconUploader({ initialFavicon }: { initialFavicon?: string | null }) {
    const [preview, setPreview] = useState<string | null>(initialFavicon || null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-foreground">Site Favicon</label>
            <label className="block cursor-pointer">
                <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden hover:border-primary transition-all">
                    {preview ? (
                        <img src={preview} alt="Favicon" className="w-full h-full object-contain p-2" />
                    ) : (
                        <Upload size={16} className="text-muted" />
                    )}
                </div>
                <input type="file" name="faviconFile" accept="image/x-icon,image/png,image/svg+xml" onChange={handleChange} className="hidden" />
            </label>
            <p className="text-xs text-muted">Upload .ico, .png, or .svg</p>
        </div>
    );
}
