import { UnitTypes } from "../../enums/unitTypes";

export interface ResourceInput {
  id: string;
  name: string;
  quantity: number;
  averageCostPerUnit: number;
  unitId: UnitTypes;
  lastEntryAt?: Date | null;
}

export class Resource {
  id: string;
  name: string;
  quantity: number;
  averageCostPerUnit: number;
  unitId: UnitTypes;
  lastEntryAt: Date | null;

  constructor(input: ResourceInput) {
    this.id = input.id;
    this.name = input.name;
    this.quantity = input.quantity;
    this.averageCostPerUnit = input.averageCostPerUnit;
    this.unitId = input.unitId;
    this.lastEntryAt = input.lastEntryAt ?? null;
  }  
}