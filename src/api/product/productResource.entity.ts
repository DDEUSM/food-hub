import { UnitTypes } from "../../enums/unitTypes";

export interface ProductResourcesRequirementsInput {
    id: string;
    productId: string;
    resourceId: string;
    quantity: number;
    createdBy: string;
    createdAt: Date;
    unitId: UnitTypes;
    editedAt?: Date | null,
    editedBy?: string | null
}

export class ProductResourceRequirements {
    id: string;
    productId: string;
    resourceId: string;
    quantity: number;
    unitId: UnitTypes;
    createdAt: Date;
    createdBy: string;
    editedAt: Date | null;
    editedBy: string | null;

    constructor(input: ProductResourcesRequirementsInput) {
        this.id = input.id;
        this.productId = input.productId;
        this.resourceId = input.resourceId;
        this.quantity = input.quantity;
        this.unitId = input.unitId;
        this.createdAt = input.createdAt;
        this.createdBy = input.createdBy;
        this.editedAt = input.editedAt ?? null;
        this.editedBy = input.editedBy ?? null;
    }
}