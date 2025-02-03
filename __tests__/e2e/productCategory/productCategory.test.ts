import { ulid } from 'ulid';
import { ProductCategoryCreate } from '../../../src/api/product-category/productCategory.dto'; 
import { ProductCategory } from '../../../src/api/product-category/productCategory.entity';

const BASE_URL = `http://localhost:1445`; // Ajuste conforme necessário

describe("Teste e2e no módulo ProductCategory", () => {

    const newCategory = {
        name: 'Bebidas'
    } as ProductCategoryCreate;

    let id: string;

    test("1º Criar uma nova categoria de produto", async () => {
       
        const response = await fetch(`${BASE_URL}/product-categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        });

        expect(response.status).toBe(201);

        const responseBody: ProductCategory = await response.json() as any;
        expect(responseBody.name).toBe(newCategory.name);

        id = responseBody.id;
    });

    test("2º Recuperar uma categoria de produto pelo ID", async () => {       

        const response = await fetch(`${BASE_URL}/product-categories/${id}`, {
            method: 'GET'
        });

        expect(response.status).toBe(200);

        const responseBody = await response.json() as any;
        expect(responseBody.id).toBe(id);
        expect(responseBody.name).toBe(newCategory.name);
    });

    test("3º Retornar 404 ao tentar recuperar uma categoria inexistente", async () => {
        const nonExistentId = ulid();

        const response = await fetch(`${BASE_URL}/product-categories/${nonExistentId}`, {
            method: 'GET'
        });

        expect(response.status).toBe(404);

        const responseBody = await response.json() as any;
        expect(responseBody).toHaveProperty("message");
    });
});