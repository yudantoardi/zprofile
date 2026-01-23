'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Your email address"
                        className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-foreground mb-2">Phone</label>
                <input
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-foreground mb-2">Message</label>
                <textarea
                    name="message"
                    required
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="w-full bg-white border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-5 text-lg group"
            >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
            </button>

            {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center font-bold">
                    Thank you! Your message has been sent successfully.
                </div>
            )}
            {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-bold">
                    Oops! Something went wrong. Please try again later.
                </div>
            )}
        </form>
    );
}
