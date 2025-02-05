import { ulid } from "ulid";
import { Resource, ResourceInput } from "../../../src/api/resources/resource.entity";
import { ResourceRepository } from "../../../src/api/resources/resource.repository";
import { UnitTypes } from "../../../src/enums/unitTypes";
import { resources } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ResourceMapper } from "../../../src/api/resources/resource.mapper";

describe("Unitary test of resource repository", () => {

  const prismaClientMock = {
    resources: {
      create: null,
      findUnique: null
    }
  } as any

  const resourceRepository = new ResourceRepository(prismaClientMock);

  const resourceData: ResourceInput = {
    id: ulid(),
    name: "Farinha de Trigo",
    quantity: 100,
    averageCostPerUnit: 1.5,
    unitId: UnitTypes.kg,
  };

  const dbOutput: resources = {
    id: resourceData.id,
    name: resourceData.name,
    quantity: resourceData.quantity,
    unit_id: resourceData.unitId,
    average_cost_per_unit: new Decimal(resourceData.averageCostPerUnit),
    last_entry_at: null
  }

  afterAll(() => {
    jest.clearAllMocks();
  })

  it("1° Create and save a new resource", async () => {

    prismaClientMock.resources.create = async (arg: any) => arg.data;

    const result = await resourceRepository.save({      
      name: "Farinha de Trigo",
      quantity: 100,
      averageCostPerUnit: 1.5,
      unitId: UnitTypes.kg
    });

    expect(result).toEqual({
      ...resourceData,
      id: result.id,
      lastEntryAt: null
    });    
  })

  it("2° Retrieve the resource by id", async () => {

    prismaClientMock.resources.findUnique = async (arg: any) => ResourceMapper.mapToDB(new Resource({...resourceData, id: arg.where.id}))

    const result = await resourceRepository.findById(resourceData.id);

    expect(result).toEqual(new Resource(resourceData));    
  })
})