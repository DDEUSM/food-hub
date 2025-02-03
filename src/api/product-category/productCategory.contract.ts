import { ProductCategoryCreate } from "./productCategory.dto";
import { ProductCategory } from "./productCategory.entity";

export interface IProductCategoryRespository {
    create (productCategory: ProductCategoryCreate): Promise<ProductCategory>;
    findById (id: string): Promise<ProductCategory|null|undefined>;
}