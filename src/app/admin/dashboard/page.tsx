import prisma from "@/lib/prisma";
import { MessageSquare, Users, Briefcase, Eye } from "lucide-react";

export default async function AdminDashboard() {
    const messageCount = await prisma.message.count({ where: { isRead: false } });
    const serviceCount = await prisma.service.count();
    const portfolioCount = await prisma.portfolio.count();

    const stats = [
        { label: 'Unread Messages', value: messageCount, icon: <MessageSquare className="text-blue-600" />, color: 'bg-blue-50' },
        { label: 'Total Services', value: serviceCount, icon: <Briefcase className="text-purple-600" />, color: 'bg-purple-50' },
        { label: 'Portfolio Items', value: portfolioCount, icon: <Users className="text-orange-600" />, color: 'bg-orange-50' },
        { label: 'Site Visitors', value: '1,234', icon: <Eye className="text-emerald-600" />, color: 'bg-emerald-50' },
    ];

    const recentMessages = await prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted">Welcome back! Here is what is happening with your website today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-6">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</div>
                            <div className="text-xs font-bold text-muted uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-border flex justify-between items-center">
                        <h3 className="font-heading font-bold text-foreground">Recent Messages</h3>
                        <a href="/admin/messages" className="text-sm font-bold text-primary hover:underline">View All</a>
                    </div>
                    <div className="divide-y divide-border">
                        {recentMessages.length === 0 ? (
                            <div className="p-20 text-center text-muted italic">No messages yet.</div>
                        ) : (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className={`p-6 flex justify-between items-center ${!msg.isRead ? 'bg-primary/5' : ''}`}>
                                    <div>
                                        <div className="font-bold text-foreground">{msg.name}</div>
                                        <div className="text-sm text-muted">{msg.email}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-muted uppercase tracking-wider">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                        {!msg.isRead && <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full mt-1 inline-block">NEW</span>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    <h3 className="font-heading font-bold text-xl mb-6 relative z-10">Quick Actions</h3>
                    <div className="space-y-4 relative z-10">
                        <a href="/admin/services" className="block w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl text-sm font-bold transition-all">Manage Services</a>
                        <a href="/admin/portfolio" className="block w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl text-sm font-bold transition-all">Manage Portfolio</a>
                        <a href="/admin/settings" className="block w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl text-sm font-bold transition-all">Edit Company Info</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
