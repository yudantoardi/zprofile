import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

import prisma from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' }
    }) as any;

    return {
      title: settings?.seoTitle || settings?.companyName || "Ziraymedia - Professional Digital Agency",
      description: settings?.seoDescription || "Innovative digital solutions for your business growth.",
      icons: {
        icon: settings?.favicon || '/favicon.ico',
      },
    };
  } catch (error) {
    console.warn('Metadata generation failed, using defaults.', error);
    return {
      title: "Ziraymedia - Professional Digital Agency",
      description: "Innovative digital solutions for your business growth.",
      icons: {
        icon: '/favicon.ico',
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${montserrat.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
