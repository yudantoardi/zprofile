import { MessageCircle } from 'lucide-react';

export default function FloatingWA() {
    return (
        <a
            href="https://wa.me/6281578301145"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center group"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle size={24} fill="white" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 ease-in-out font-bold">
                Chat With Us
            </span>
        </a>
    );
}
