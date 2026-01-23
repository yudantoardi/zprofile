import prisma from "@/lib/prisma";
import TestimonialClient from "./TestimonialClient";

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { order: 'asc' }
    });

    return <TestimonialClient initialData={testimonials} />;
}
