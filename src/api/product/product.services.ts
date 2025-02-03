import { inject } from "inversify";
import { ProductCreate } from "./product.dto";
import { Product } from "./product.entity";
import { provide } from "inversify-binding-decorators";
import { ProductRepository } from "./product.repository";
import { IProductRepository } from "./product.contracts";

@provide(ProductServices)
export class ProductServices {

    constructor(
        @inject(ProductRepository) private repository: IProductRepository
    ){}

    async create(product: ProductCreate ): Promise<Product> {
        return await this.repository.save(product);       
    }
    
    async getById(id: string): Promise<Product|null> {
        return await this.repository.findById(id);
    }
}