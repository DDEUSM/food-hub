import { z } from "zod";

export const ProductCategorySchema = z.object({
    name: z.string().min(2).max(70)    
});

export interface ProductCategoryCreate {
    name: string;
};