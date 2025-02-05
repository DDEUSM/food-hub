import { ulid } from 'ulid';
import { ProductCategoryCreate } from '../../../src/api/product-category/productCategory.dto';
import { ProductCategoryService } from '../../../src/api/product-category/productCategory.services'
import { ProductCategory } from '../../../src/api/product-category/productCategory.entity';
import { ProductCategoryRepository } from '../../../src/api/product-category/productCategory.repository';

describe("Teste unitário de ProductCategoryService", () => {

    let repositoryMock: ProductCategoryRepository = {} as any

    let productCategoryService = new ProductCategoryService(repositoryMock);

    const productCategory: ProductCategoryCreate = {
        name: 'Pizzas',
    }

    const id = ulid();

    test("1º Criar um novo productCategory", async () => {
        repositoryMock.create = async(product: ProductCategoryCreate) => new ProductCategory({
            id: id,
            name: productCategory.name,
            createdAt: new Date()
        });

        const productCategoryCreated = await productCategoryService.create(productCategory);

        expect(productCategoryCreated?.id).toBe(id);
        expect(productCategoryCreated?.name).toBe(productCategory.name);
    });

    test("2º recuperar um productCategory pelo id", async () => {
        repositoryMock.findById = async(id: string) => new ProductCategory({
            id: id,
            name: productCategory.name,
            createdAt: new Date()
        }); 

        const productCategoryCreated = await productCategoryService.getById(id);

        expect(productCategoryCreated?.id).toBe(id);
        expect(productCategoryCreated?.name).toBe(productCategory.name);
    });
})