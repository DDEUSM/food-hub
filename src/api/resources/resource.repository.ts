import { PrismaClient } from "@prisma/client";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { Resource } from "./resource.entity";
import { IResourceRepository } from "./resource.contracts";
import { ulid } from "ulid";
import { ResourceMapper } from "./resource.mapper";
import { ResourceCreate } from "./resource.dto";

@provide(ResourceRepository)
export class ResourceRepository implements IResourceRepository {
  
  constructor(@inject(PrismaClient) private prismaClient: PrismaClient) {}

  async save(resourceInput: ResourceCreate): Promise<Resource> {
    const newResource = new Resource({
      id: ulid(),
      name: resourceInput.name,
      quantity: resourceInput.quantity,
      averageCostPerUnit: resourceInput.averageCostPerUnit,
      unitId: resourceInput.unitId      
    });

    return await this.prismaClient.resources.create({
      data: ResourceMapper.mapToDB(newResource),
    })
    .then(resource => ResourceMapper.mapToEntity(resource)!);
  }


  async findById(id: string): Promise<Resource | null> {
    return await this.prismaClient.resources.findUnique({
      where: { id: id },
    }).then(resource => ResourceMapper.mapToEntity(resource));    
  }
}