import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import { provideSingleton } from "../../ioc/provideSingleton";
import { inject } from "inversify";
import 'reflect-metadata';
import { ProductCategoryService } from "./productCategory.services";
import { ProductCategoryCreate, ProductCategorySchema } from "./productCategory.dto";
import { UlidSchema } from "../../shared/ulid.schema";
import { ApiError } from "../../errors/api.error";

@Route("product-categories")
@provideSingleton(ProductCategoryController)
export class ProductCategoryController extends Controller {

    constructor (
        @inject(ProductCategoryService) private productCategoryServices: ProductCategoryService
    ){ super(); }

    @Post()
    async create(@Body() productCategoryCreate: ProductCategoryCreate) {
        console.log('foi')
        const inputValidated = ProductCategorySchema.parse(productCategoryCreate);
        const productCategoryCreated = await this.productCategoryServices.create(inputValidated);
        this.setStatus(201);
        return productCategoryCreated;
    }

    @Get("{id}")
    async getById(@Path() id: string) {
        console.log('foi')
        const idValidated = UlidSchema.parse(id); // Ulid validation
        const productCategoryFounded = await this.productCategoryServices.getById(idValidated);
        if (!productCategoryFounded) {
            throw ApiError.NotFounded();
        }
        return productCategoryFounded;
    }
}