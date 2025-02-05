import { ResourceCreate } from "./resource.dto";
import { Resource } from "./resource.entity";

export interface IResourceRepository {
  save(resourceInput: ResourceCreate): Promise<Resource>;
  findById(id: string): Promise<Resource|null>;
}

export interface IResourceService {
  create(resourceInput: ResourceCreate): Promise<Resource>;
  getById(id: string): Promise<Resource|null>;
}