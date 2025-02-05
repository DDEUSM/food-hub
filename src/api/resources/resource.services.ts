import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { IResourceRepository, IResourceService } from "./resource.contracts";
import { ResourceRepository } from "./resource.repository";
import { ResourceCreate } from "./resource.dto";

@provide(ResourceService)
export class ResourceService implements IResourceService {

  constructor (
    @inject(ResourceRepository) private repository: IResourceRepository
  ) {}

  async create(resourceInput: ResourceCreate) {
    return await this.repository.save(resourceInput);
  }

  async getById(id: string) {
    return await this.repository.findById(id);
  }
}