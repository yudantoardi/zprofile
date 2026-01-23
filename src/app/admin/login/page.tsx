'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // We use a simple server action or API
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                router.push('/admin/dashboard');
                router.refresh();
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-primary" size={32} />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Admin Login</h1>
                    <p className="text-muted">Enter password to access the CMS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-foreground">Password</label>
                            <button
                                type="button"
                                onClick={() => alert('Please contact the system administrator to reset your password.')}
                                className="text-xs font-bold text-primary hover:underline transition-all"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm font-bold text-center">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 text-lg"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
