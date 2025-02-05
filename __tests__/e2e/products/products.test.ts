import { ulid } from 'ulid';
import { ProductCategoryCreate } from '../../../src/api/product-category/productCategory.dto'; 
import { ProductCategory } from '../../../src/api/product-category/productCategory.entity';
import { ProductCreate } from '../../../src/api/product/product.dto';
import { Product } from '../../../src/api/product/product.entity';
import { api } from '../../utils/apiProvider';

describe("Teste e2e no módulo Products", () => {

    const newProductInput = {
        name: 'Mussarela',
        categoryId: '',
        sizes: [1],
        createdBy: ulid(),
        currentPrice: 46.0,
        description: "Pizza clássica",
        imageUrl: "https://localhost:3445/image.png",
        recordStatusId: 1
    } as ProductCreate;

    const newCategoryInput: ProductCategoryCreate = {
        name: "Kalzones"
    }

    let newCategory: ProductCategory;

    let productId: string;

    test("1° Criando uma categoria", async () => {

        const response = await api.post('/product-categories', newCategoryInput)

        const data: ProductCategory = await response.json() as any;        
        
        expect(data.name).toBe(newCategoryInput.name);

        newCategory = data;
    })

    test("2º Criar um novo produto para uma dada categoria", async () => {

        newProductInput.categoryId = newCategory.id;
       
        const response = await api.post(`/products`, newProductInput);

        expect(response.status).toBe(201);

        const responseBody: Product = await response.json() as any;
        expect(responseBody.name).toBe(newProductInput.name);

        productId = responseBody.id;
    });

    test("3º Recuperar um produto pelo ID", async () => {       

        const response = await api.get(`/products/${productId}`)
        expect(response.status).toBe(200);

        const responseBody: Product = await response.json() as any;
        expect(responseBody.id).toBe(productId);
        expect(responseBody.name).toBe(newProductInput.name);
    });

    test("3º Retornar 404 ao tentar recuperar uma categoria inexistente", async () => {
        const nonExistentId = ulid();

        const response = await api.get(`/products/${nonExistentId}`)

        expect(response.status).toBe(404);

        const responseBody = await response.json() as any;
        expect(responseBody).toHaveProperty("message");
    });
});