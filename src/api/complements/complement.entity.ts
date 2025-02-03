

export interface ComplementInput {
    id: string;
    categoryId: string;
    name: string;
    imageUrl: string;
    currentPrice: number;
}

export class Complement {
    id: string;
    categoryId: string;
    name: string;
    imageUrl: string;
    currentPrice: number;

    constructor(input: ComplementInput) {
        this.id = input.id;
        this.categoryId = input.categoryId;
        this.name = input.name;
        this.imageUrl = input.imageUrl;
        this.currentPrice = input.currentPrice;
    }
}