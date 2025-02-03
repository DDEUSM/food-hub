import { product_categories } from "@prisma/client";
import { ProductCategory } from "./productCategory.entity";

export class ProductCategoryMapper {

    static mapToDB(entity: ProductCategory): product_categories {
        return {
            id: entity.id,
            name: entity.name,
            products_count: entity.productsCount,
            created_at: entity.createdAt
        };
    }

    static mapToEntity(dbModel?: product_categories|null): ProductCategory|null|undefined {
        if (!dbModel) return dbModel;
        return new ProductCategory({
            id: dbModel.id,
            name: dbModel.name,
            productsCount: dbModel.products_count,
            createdAt: dbModel.created_at
        });
    }
    
}