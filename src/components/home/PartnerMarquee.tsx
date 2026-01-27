'use client';

import { PartnerLogo } from "@prisma/client";

export default function PartnerMarquee({ partners }: { partners: PartnerLogo[] }) {
    if (partners.length === 0) return null;

    // Duplicate partners exactly once for seamless infinite scroll
    const displayPartners = [...partners, ...partners];

    return (
        <div className="flex overflow-hidden relative group py-8">
            {/* Left & Right Faded Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
                {displayPartners.map((partner, index) => (
                    <div key={`${partner.id}-${index}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 w-32 shrink-0 h-10 px-4">
                        <img src={partner.image} alt={partner.name || 'Partner'} className="h-full w-full object-contain" />
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    will-change: transform;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
