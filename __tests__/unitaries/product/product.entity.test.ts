import { ulid } from 'ulid';
import { Product, ProductInput } from '../../../src/api/product/product.entity';

describe("Teste unitário da classe Product", () => {
    
    const productInput: ProductInput = {
        id: ulid(),
        categoryId: '',
        name: 'Mussarela',
        imageUrl: 'https://images.com/image.png',
        currentPrice: 45.00,
        description: 'Sabor de pizza mais clássico de todos',
        recordStatusId: 1,
        sizes: [],
        createdAt: new Date(),
        createdBy: ''
    }

    const newProduct = new Product(productInput);

    test("1° Criando uma instância de Product", () => {

        expect(newProduct.id).toBe(productInput.id);
        expect(newProduct.name).toBe(productInput.name);
        expect(newProduct.currentPrice).toBe(productInput.currentPrice);
        expect(newProduct.description).toBe(productInput.description);
        expect(newProduct.createdAt > productInput.createdAt).toBeFalsy();
        expect(newProduct.createdBy).toBe(productInput.createdBy);
    })
})