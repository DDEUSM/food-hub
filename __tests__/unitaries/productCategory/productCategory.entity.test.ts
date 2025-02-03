import { ulid } from 'ulid'
import { ProductCategory } from '../../../src/api/product-category/productCategory.entity'

describe("Testando a entidade de product Category", () => {

    const input = {
        id: ulid(),
        name: 'Pizzas',
        createdAt: new Date()
    };

    const newProductCategory = new ProductCategory({
        id: input.id,
        name: input.name,
        createdAt: input.createdAt
    });        

    test("1º Criando uma nova instânica de productCategory", () => {

        expect(newProductCategory.id).toHaveLength(26);
        expect(newProductCategory.name).toBe(input.name);
        expect(newProductCategory.createdAt).toBe(input.createdAt);
        expect(newProductCategory.productsCount).toBe(0);
    })

    test("2º Incrementando um número de produto na categoria", () => {

        let quantity = 10;
        newProductCategory.incrementProductsCount(quantity);

        expect(newProductCategory.productsCount).toBe(quantity);

        let quantity2 = 6;
        newProductCategory.incrementProductsCount(quantity2);

        expect(newProductCategory.productsCount).toBe(quantity+quantity2);
    })

    test("3º Decrementando um número de produtos na categoria", () => {

        let oldProductsCount = newProductCategory.productsCount;

        let quantity = 10;
        newProductCategory.decrementProductsCount(quantity);

        expect(newProductCategory.productsCount).toBe(oldProductsCount - quantity);

        let quantity2 = 5;
        newProductCategory.decrementProductsCount(quantity2);

        expect(newProductCategory.productsCount).toBe(oldProductsCount - (quantity+quantity2));
    })

    test("4º Provocando erro ao incrementar um valor negativo a productsCount", () => {

        let quantity = -1;
        try {
            newProductCategory.incrementProductsCount(quantity);    
        } catch (error: any) {
            expect(error.message).toBe("Um valor menor < 0 não pode ser incrementado");
        }                
    })

    test("5º Provocando erro ao decrementar um valor maior que o de productsCount", () => {
        let quantity = 100;
        try {
            newProductCategory.decrementProductsCount(quantity);    
        } catch (error: any) {
            expect(error.message).toBe("Um valor maior que o atual não pode ser decrementado");
        }                  
    })
})