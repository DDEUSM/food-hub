import { product_resource_requirements, products } from "@prisma/client";
import { Product } from "./product.entity";
import { Decimal } from "@prisma/client/runtime/library";
import { ProductResourceRequirements } from "./productResource.entity";

export class ProductMapper {

    static mapDBToProduct(dbModel: products|null): Product|null {
        if (!dbModel) {
            return dbModel;
        }
        return new Product({
            id: dbModel.id,
            categoryId: dbModel.category_id,
            name: dbModel.name,
            imageUrl: dbModel.image_url ?? '',
            description: dbModel.description!,
            currentPrice: Number(dbModel.current_price),
            recordStatusId: dbModel.record_status_id,
            sizes: dbModel.sizes,
            createdAt: dbModel.created_at,
            createdBy: dbModel.created_by,
            editedAt: dbModel.edited_at,
            editedBy: dbModel.edited_by,      
        });
    }

    static mapProductToDB(product: Product): products {
        
        return {
            id: product.id,
            category_id: product.categoryId,
            name: product.name,
            image_url: product.imageUrl,
            description: product.description,
            current_price: new Decimal(product.currentPrice),
            record_status_id: product.recordStatusId,
            sizes: product.sizes,
            created_at: product.createdAt,
            created_by: product.createdBy,
            edited_at: product.editedAt ?? null,
            edited_by: product.editedBy ?? null 
        };
    }
}



export function mapProductResourceRequirementsToDB(productResource: ProductResourceRequirements){
    return {
        id: productResource.id,
        product_id: productResource.productId,
        quantity_required: productResource.quantity,
        resource_id: productResource.resourceId,
        unit_id: productResource.unitId,
        created_at: productResource.createdAt,
        created_by: productResource.createdBy,
        edited_by: productResource.editedBy,
        edited_at: productResource.editedAt
    } as product_resource_requirements;
}

export function mapAllProductResourceRequirementsToDB(productResources: ProductResourceRequirements[]){
    return productResources.map(productResource => mapProductResourceRequirementsToDB(productResource))
}

export function mapDBToProductRequirements(productResourceRequirement: product_resource_requirements): ProductResourceRequirements {
    return new ProductResourceRequirements ({
        id: productResourceRequirement.id,
        productId: productResourceRequirement.product_id,
        resourceId: productResourceRequirement.resource_id!,
        quantity: productResourceRequirement.quantity_required,
        createdAt: productResourceRequirement.created_at,
        unitId: productResourceRequirement.unit_id,
        createdBy: productResourceRequirement.created_by,
        editedAt: productResourceRequirement.edited_at,
        editedBy: productResourceRequirement.edited_by
    });
}

export function mapAllDBtoProductResourceRequirements(productResourceRequirements: product_resource_requirements[]){
    return productResourceRequirements.map(resource => mapDBToProductRequirements(resource))
}