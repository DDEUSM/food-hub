import { ProductServices } from '../../../src/api/product/product.services';
import { ProductCreate } from '../../../src/api/product/product.dto';
import { Product } from '../../../src/api/product/product.entity';
import { ulid } from 'ulid';


describe('ProductServices', () => {
    let productServices: ProductServices;
    let productRepositoryMock = {
        save: jest.fn(),
        findById: jest.fn()        
    };
   

    beforeEach(() => {             
        productServices = new ProductServices(productRepositoryMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const productInput: ProductCreate = {
        categoryId: 'category-id',
        name: 'Mussarela',
        imageUrl: 'https://images.com/image.png',
        currentPrice: 45.00,
        description: 'Sabor de pizza mais clássico de todos',
        recordStatusId: 1,
        sizes: [10, 12, 14],
        createdBy: 'user-id'
    };

    const productOutput: Product = new Product({
        id: ulid(),
        ...productInput,
        createdAt: new Date(),
        editedAt: null,
        editedBy: null
    });

    test('1º Criar um novo produto', async () => {

        productRepositoryMock.save.mockResolvedValue(productOutput);
       

        const result = await productServices.create(productInput);

        expect(result).toEqual(productOutput);
        expect(productRepositoryMock.save).toHaveBeenCalledWith(productInput);
    });

    test('2º Recuperar um produto pelo ID', async () => {
        productRepositoryMock.findById.mockResolvedValue(productOutput);

        const result = await productServices.getById(productOutput.id);

        expect(result).toEqual(productOutput);
        expect(productRepositoryMock.findById).toHaveBeenCalledWith(productOutput.id);
    });

    test('3º Retornar null ao tentar recuperar um produto inexistente pelo ID', async () => {
        productRepositoryMock.findById.mockResolvedValue(null);

        const result = await productServices.getById('non-existent-id');

        expect(result).toBeNull();
        expect(productRepositoryMock.findById).toHaveBeenCalledWith('non-existent-id');
    });
});