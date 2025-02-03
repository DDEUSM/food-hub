import { PrismaClient, products } from '@prisma/client';
import { ProductRepository } from '../../../src/api/product/product.repository';
import { Product, ProductInput } from '../../../src/api/product/product.entity';
import { ulid } from 'ulid';
import { ProductCreate } from '../../../src/api/product/product.dto';
import { Decimal } from '@prisma/client/runtime/library';

describe("Test unitário do repositório de Products", () => {

    const prismaClientMock: PrismaClient = {
        products: {
            create: jest.fn()
        }
    } as any; 

    const productRepository = new ProductRepository(prismaClientMock); 

    const id = ulid();

    const productInput: ProductCreate = {        
        categoryId: '',
        name: 'Mussarela',
        imageUrl: 'https://images.com/image.png',
        currentPrice: 45.00,
        description: 'Sabor de pizza mais clássico de todos',
        recordStatusId: 1,
        sizes: [],        
        createdBy: ''
    }

    test("1º Criar registro de um novo Product no banco", async () => {
        const createFn: any = async (arg: any) => ({
            id: id,
            category_id: productInput.categoryId,
            name: productInput.name,
            image_url: productInput.imageUrl,
            current_price: new Decimal(productInput.currentPrice),
            record_status_id: 1,
            sizes: [1],
            description: '',
            created_by: productInput.createdBy,
            created_at: new Date(),
            edited_at: null,
            edited_by: null
        }) as products;

        prismaClientMock.products.create = createFn;

        const result = await productRepository.save(productInput);

        expect(result.id).toBe(id);
        expect(result.name).toBe(productInput.name);
        expect(result.createdBy).toBe(productInput.createdBy);
        expect(result.categoryId).toBe(productInput.categoryId);
        expect(result.currentPrice).toBe(productInput.currentPrice);
        expect(result.imageUrl).toBe(productInput.imageUrl);
    })

    test("2º Recuperar um registro de um novo Product no banco", async () => {
        const findUniqueFn: any = async (arg: any) => ({
            id: id,
            category_id: productInput.categoryId,
            name: productInput.name,
            image_url: productInput.imageUrl,
            current_price: new Decimal(productInput.currentPrice),
            record_status_id: 1,
            sizes: [1],
            description: '',
            created_by: productInput.createdBy,
            created_at: new Date(),
            edited_at: null,
            edited_by: null
        });

        prismaClientMock.products.findUnique = findUniqueFn;

        const result = await productRepository.findById(id) as Product;

        expect(result.id).toBe(id);
        expect(result.name).toBe(productInput.name);
        expect(result.createdBy).toBe(productInput.createdBy);
        expect(result.categoryId).toBe(productInput.categoryId);
        expect(result.currentPrice).toBe(productInput.currentPrice);
        expect(result.imageUrl).toBe(productInput.imageUrl);
    })
})