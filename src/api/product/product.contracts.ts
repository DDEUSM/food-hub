import { ProductCreate } from "./product.dto";
import { Product } from "./product.entity";

export interface IProductRepository {
    
    save(productInput: ProductCreate): Promise<Product>;

    findById(id: string): Promise<Product | null>;
}