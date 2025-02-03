import { ulid } from "ulid";
import { ProductCategoryRepository } from "../../../src/api/product-category/productCategory.repository";
import { ProductCategoryCreate } from "../../../src/api/product-category/productCategory.dto";
import { PrismaClient, product_categories } from "@prisma/client";


describe("Teste unitário de ProductCategoryRepository", () => {

    const prismaClientMock: PrismaClient = { 
        product_categories: {} 
    } as any;

    let productCategoryRepository = new ProductCategoryRepository(prismaClientMock);

    const productCategory: ProductCategoryCreate = {
        name: 'Pizzas',
    }

    const id = ulid();

    test("1º Criar um novo productCategory", async () => {
        const createfn: any = async(arg: any) => ({
            id: id,
            name: productCategory.name,
            products_count: 0,
            created_at: new Date()
        }) as product_categories;

        prismaClientMock.product_categories.create = createfn; 

        const productCategoryCreated = await productCategoryRepository.create(productCategory);

        expect(productCategoryCreated?.id).toBe(id);
        expect(productCategoryCreated?.name).toBe(productCategory.name);
    });

    test("2º recuperar um productCategory pelo id", async () => {

        const findUniqueFn: any = async (arg: any) => ({
            id: id,
            name: productCategory.name,
            products_count: 0,
            created_at: new Date()
        }) as product_categories; 

        prismaClientMock.product_categories.findUnique = findUniqueFn;

        const productCategoryFounded = await productCategoryRepository.findById(id);

        expect(productCategoryFounded?.id).toBe(id);
        expect(productCategoryFounded?.name).toBe(productCategory.name);
    });
})