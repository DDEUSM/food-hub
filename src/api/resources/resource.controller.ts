import { inject } from "inversify";
import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import { ApiError } from "../../errors/api.error";
import { provideSingleton } from "../../ioc/provideSingleton";
import { UlidSchema } from "../../shared/ulid.schema";
import { IResourceService } from "./resource.contracts";
import { ResourceCreate, ResourceCreateSchema } from "./resource.dto";
import { ResourceService } from "./resource.services";

@Route("resources")
@provideSingleton(ResourceController)
export class ResourceController extends Controller {

  constructor (
    @inject(ResourceService) private resourceServices: IResourceService
  ) { super(); }

  @Post()
  async create(@Body() resourceInput: ResourceCreate) {
    const resourceValidated = ResourceCreateSchema.parse(resourceInput); 
    const createdResource = await this.resourceServices.create(resourceValidated);
    this.setStatus(201);
    return createdResource;
  }


  @Get("{id}")
  async getById(@Path() id: string) {
    const idValidated = UlidSchema.parse(id);
    const resourceFounded = await this.resourceServices.getById(idValidated);
    if (!resourceFounded) {
      throw ApiError.NotFounded();
    }
    return resourceFounded;
  }
}