import { z } from 'zod';

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    productId: z.string(),
    supplierId: z.string(),
    category: z.string(),
    price: z.string(),
    weight: z.string(),
    stockLevel: z.number(),
    recLevel: z.number(),
    image: z.string().url().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const metricsSchema = z.object({
    title: z.string(),
    value: z.string(),
    trend: z.number(),
    data: z.array(z.object({ value: z.number() })),
    trendLabel: z.string().optional(),
});

export type Metric = z.infer<typeof metricsSchema>;
