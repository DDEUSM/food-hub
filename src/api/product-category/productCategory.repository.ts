import { PrismaClient } from "@prisma/client";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { ProductCategory } from "./productCategory.entity";
import { ulid } from "ulid";
import { ProductCategoryMapper } from "./productCategory.mapper";
import { ProductCategoryCreate } from "./productCategory.dto";
import { IProductCategoryRespository } from "./productCategory.contract";

@provide(ProductCategoryRepository)
export class ProductCategoryRepository implements IProductCategoryRespository {

    constructor (
        @inject(PrismaClient) private prismaClient: PrismaClient
    ) {}

    async create(productCategory: ProductCategoryCreate): Promise<ProductCategory> {

        const newProductCategory = new ProductCategory({
            id: ulid(),
            name: productCategory.name,
            productsCount: 0,
            createdAt: new Date()
        });

        return await this.prismaClient.product_categories.create({
            data: ProductCategoryMapper.mapToDB(newProductCategory)
        })
        .then(productCategoryCreated => ProductCategoryMapper.mapToEntity(productCategoryCreated)!);
    } 

    async findById(id: string): Promise<ProductCategory|null|undefined> {
        return await this.prismaClient.product_categories.findUnique({
            where: { id: id }
        })
        .then(productCategory => ProductCategoryMapper.mapToEntity(productCategory));
    }
}