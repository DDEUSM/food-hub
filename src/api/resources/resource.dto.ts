import { z } from "zod";
import { UnitTypes } from "../../enums/unitTypes";

export const ResourceCreateSchema = z.object({
  name: z.string().min(2).max(50),
  quantity: z.number().min(0),
  averageCostPerUnit: z.number().min(0),
  unitId: z.nativeEnum(UnitTypes)    
})

export interface ResourceCreate {
  name: string;
  quantity: number;
  averageCostPerUnit: number;
  unitId: UnitTypes
}