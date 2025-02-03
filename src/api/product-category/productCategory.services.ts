import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { ProductCategoryRepository } from "./productCategory.repository";
import { ProductCategory } from "./productCategory.entity";
import { ProductCategoryCreate } from "./productCategory.dto";

@provide(ProductCategoryService)
export class ProductCategoryService {

    constructor (
        @inject(ProductCategoryRepository) private repository: ProductCategoryRepository
    ) {}

    async create(productCategoryInput: ProductCategoryCreate): Promise<ProductCategory|null> {
        return await this.repository.create(productCategoryInput);        
    }

    async getById(id: string){
        return await this.repository.findById(id);
    }
} 