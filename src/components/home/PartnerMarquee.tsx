'use client';

import { PartnerLogo } from "@prisma/client";

export default function PartnerMarquee({ partners }: { partners: PartnerLogo[] }) {
    if (partners.length === 0) return null;

    // Duplicate partners for infinite scroll
    const displayPartners = [...partners, ...partners, ...partners];

    return (
        <div className="flex overflow-hidden relative group">
            <div className="flex gap-16 animate-marquee whitespace-nowrap py-4">
                {displayPartners.map((partner, index) => (
                    <div key={`${partner.id}-${index}`} className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-32 shrink-0 h-12">
                        <img src={partner.image} alt={partner.name || 'Client'} className="h-full w-full object-contain" />
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
