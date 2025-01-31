import { record, z } from "zod";
import { RecordStatus } from "../../enums/recordStatus";
import { create } from "domain";
import { UnitTypes } from "../../enums/unitTypes";
import { PizzaSizes } from "../../enums/pizzaSizes";

export const PizzaRequirementsInputDTOSchema = z.object({
    resourceId: z.string().length(26),
    quantityRequired: z.number()
})

export const PizzaFlavorInputDTOSchema = z.object({    
    flavor: z.string().min(2).max(70),
    sizes: z.array(z.number()).min(1).max(4),
    currentPrice: z.number().min(30),
    pizzaRequirements: z.array(PizzaRequirementsInputDTOSchema),
    createdBy: z.string().min(2).max(70)
})

export type PizzaFlavorInputDTO = z.infer<typeof PizzaFlavorInputDTOSchema>

export const PizzaRequirementsOutputDTOSchema = z.object({
    id: z.string().length(26),
    pizzaId: z.string().length(26),
    resourceId: z.string().length(26),
    quantityRequired: z.number(),
    unitId: z.nativeEnum(UnitTypes),
    editedAt: z.string().nullable(),
    editedBy: z.string().length(26).nullable(),
    createdAt: z.string(),
    createdBy: z.string().length(26)
})

export type PizzaRequirementsOutputDTO = z.infer<typeof PizzaRequirementsOutputDTOSchema>

export const PizzaFlavorOutputDTOSchema = z.object({   
    id: z.string().length(26), 
    flavor: z.string().min(2).max(70),
    sizes: z.array(z.number()).min(1).max(4),
    currentPrice: z.number().min(30),
    pizzaRequirements: z.array(PizzaRequirementsOutputDTOSchema).optional(),
    recordStatusId: z.nativeEnum(RecordStatus),
    createdAt: z.string(),
    editedAt: z.string().nullable(),
    editedBy: z.string().length(26).nullable(),
    createdBy: z.string().min(2).max(70)
})

export type PizzaFlavorOutputDTO = z.infer<typeof PizzaFlavorOutputDTOSchema>


export const PizzaOrderDTOSchema = z.object({
    items: z.array(z.object({
        itemId: z.string().min(1).transform(value => Number(value)),
        pizzaId: z.string().length(26),
        size: z.nativeEnum(PizzaSizes),
    }))
})

export type PizzaOrderDTO = z.infer<typeof PizzaOrderDTOSchema>