import { Metadata } from "next";
import prisma from "@/lib/prisma";

export async function getPageMetadata(pageKey: string): Promise<Metadata> {
  try {
    const [content, settings] = await Promise.all([
      prisma.staticContent.findMany({
        where: { 
          page: pageKey, 
          key: { in: ['seo_title', 'seo_description', 'seo_og_image'] } 
        }
      }),
      prisma.siteSettings.findUnique({
        where: { id: 'singleton' }
      })
    ]);

    const getValue = (key: string) => content.find(c => c.key === key)?.value;

    const title = getValue('seo_title') || settings?.seoTitle || settings?.companyName || "Ziraymedia";
    const description = getValue('seo_description') || settings?.seoDescription || "Innovative digital solutions.";
    const ogImage = getValue('seo_og_image');

    const metadata: Metadata = {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
      },
    };

    if (ogImage) {
      metadata.openGraph!.images = [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ];
    }

    return metadata;
  } catch (error) {
    console.warn(`Failed to generate metadata for ${pageKey}:`, error);
    return {};
  }
}
