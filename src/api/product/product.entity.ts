
export interface ProductInput {
    id: string;
    categoryId: string;
    name: string;
    imageUrl: string;
    description: string;
    currentPrice: number;
    recordStatusId: number;
    sizes: number[];
    createdBy: string;
    createdAt: Date;    
    editedAt?: Date | null;
    editedBy?: string | null;       
}


export class Product {

    id: string;
    categoryId: string;
    name: string;
    imageUrl: string;
    description: string;
    currentPrice: number;
    recordStatusId: number;
    sizes: number[];
    createdBy: string;
    createdAt: Date;    
    editedAt?: Date | null;
    editedBy?: string | null;

    constructor(input: ProductInput){
        this.id = input.id;
        this.categoryId = input.categoryId;
        this.name = input.name;
        this.imageUrl = input.imageUrl;
        this.description = input.description;
        this.currentPrice = input.currentPrice;
        this.recordStatusId = input.recordStatusId;
        this.sizes = input.sizes;
        this.createdAt = input.createdAt;
        this.createdBy = input.createdBy;
        this.editedAt = input.editedAt;
        this.editedBy = input.editedBy;
    }
}