import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { provideSingleton } from "../../ioc/provideSingleton";
import { inject } from "inversify";
import { ProductServices } from "./product.services";
import { ProductCreate, ProductCreateSchema } from "./product.dto";
import { UlidSchema } from "../../shared/ulid.schema";
import { ApiError } from "../../errors/api.error";

@Route("products")
@provideSingleton(ProductController)
export class ProductController extends Controller {

    constructor (
        @inject(ProductServices) private productServices: ProductServices
    ) { super(); }

    @Post()
    async create(@Body() product: ProductCreate ) {
        const inputValidated = ProductCreateSchema.parse(product);
        const productCreated = await this.productServices.create(inputValidated);
        this.setStatus(201);
        return productCreated;
    }   

    @Get('/category/{categoryId}')
    async getByCategory(@Path() categoryId: string) {

    }

    @Get('{id}')
    async getById(@Path() id: string) {
        const idValidated = UlidSchema.parse(id);
        const productFounded = await this.productServices.getById(idValidated);
        if (!productFounded) {
            throw ApiError.NotFounded();
        }
        return productFounded;
    }

    @Delete('{id}')
    async deleteById(@Path() id: string) {

    }

    @Put('{id}')
    async update(@Path() id: string, @Body() update: any) {

    }

    // registrar produto
    // recuperar produtos por categoria
    // recuperar produto pelo id
    // excluir produto pelo id
    // excluir produtos pelos ids
    // Modificar produto
}
