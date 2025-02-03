import { PrismaClient } from "@prisma/client";
import { inject } from "inversify";
import { ProductCreate } from "./product.dto";
import { provide } from "inversify-binding-decorators";
import 'reflect-metadata';
import { IProductRepository } from "./product.contracts";
import { Product } from "./product.entity";
import { ulid } from "ulid";
import { ProductMapper } from "./product.mapper";

@provide(ProductRepository)
export class ProductRepository implements IProductRepository {

    constructor (
        @inject(PrismaClient) private prismaClient: PrismaClient
    ){}

    async save(productInput: ProductCreate) {
        const newProduct = new Product({
            id: ulid(),
            categoryId: productInput.categoryId,
            description: productInput.description,
            currentPrice: productInput.currentPrice,
            imageUrl: productInput.imageUrl,
            name: productInput.name,
            recordStatusId: productInput.recordStatusId,            
            sizes: productInput.sizes,
            createdAt: new Date(),
            createdBy: productInput.createdBy
        });

        return await this.prismaClient.products.create({
            data: ProductMapper.mapProductToDB(newProduct)            
        }).then(productCreated => ProductMapper.mapDBToProduct(productCreated)!);        
    }


    async findById(id: string): Promise<Product | null> {
        return await this.prismaClient.products.findUnique({
            where: { id: id }
        }).then(productFounded => ProductMapper.mapDBToProduct(productFounded))
    }
}