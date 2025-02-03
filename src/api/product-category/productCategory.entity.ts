export interface ProductCategoryInput {
    id: string;
    name: string;
    productsCount?: number;
    createdAt: Date;
}

export class ProductCategory {
    id: string;
    name: string;
    private _productsCount: number;
    createdAt: Date;

    constructor(input: ProductCategoryInput){
        this.id = input.id;
        this.name = input.name;
        this._productsCount = input.productsCount ?? 0;
        this.createdAt = input.createdAt;
    }

    incrementProductsCount(quantity: number){
        if (quantity < 0) {
            throw Error("Um valor menor < 0 não pode ser incrementado");
        }
        this._productsCount += quantity;
    }

    decrementProductsCount(quantity: number){
        if (quantity > this._productsCount) {
            throw new Error("Um valor maior que o atual não pode ser decrementado")
        }
        this._productsCount -= quantity;
    }

    get productsCount(){
        return this._productsCount;
    }
}