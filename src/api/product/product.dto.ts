import { z } from "zod";
import { UnitTypes } from "../../enums/unitTypes";


export const ProductResourcesCreateSchema = z.object({
    resourceId: z.string().length(26),
    quantityRequired: z.number()
});

export interface ProductResourcesCreate {
    resourceId: string,
    quantity: number
}

export const ProductCreateSchema = z.object({
    categoryId: z.string().length(26),
    name: z.string().min(5).max(75),
    imageUrl: z.string().url(),
    description: z.string().max(650),
    currentPrice: z.number(),
    recordStatusId: z.number().min(1),
    sizes: z.array(z.number().min(1)).min(1),
    createdBy: z.string().length(26),
});

export interface ProductCreate {
    categoryId: string,
    name: string,
    imageUrl: string,
    description: string,
    currentPrice: number,
    recordStatusId: number,
    sizes: number[],
    createdBy: string
}

export interface ProductResourceOutput {
    id: string,
    productId: string,
    resourceId: string,
    quantityRequired: number,
    unitId: UnitTypes,
    editedAt: string,
    editedBy: string,
    createdAt: string,
    createdBy: string 
}

export interface ProductOutput {
    id: string;
    categoryId: string;
    name: string;
    imageUrl: string;
    description: string;
    currentPrice: number;
    recordStatusId: number;
    sizes: number[];
    createdAt: Date;
    createdBy: string;
    editedAt: Date | null;
    editedBy: string | null;
}