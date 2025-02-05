import { ulid } from 'ulid';
import { Resource, ResourceInput } from '../../../src/api/resources/resource.entity';
import { ResourceService } from '../../../src/api/resources/resource.services'
import { UnitTypes } from '../../../src/enums/unitTypes';

describe("Unitary test of resource services methods", () => {

  const resourceRepositoryMock = {
    save: jest.fn(),
    findById: jest.fn()
  };

  const resourceService = new ResourceService(resourceRepositoryMock);

  let resourceCreated: ResourceInput = {
    id: ulid(),
    name: "Farinha de Trigo",
    quantity: 100,
    averageCostPerUnit: 1.5,
    unitId: UnitTypes.kg,
  }

  let outputResource = new Resource(resourceCreated);

  afterAll(() => {
    jest.clearAllMocks();
  })

  it("1° Create and save a new Resource", async() => {

    resourceRepositoryMock.save.mockResolvedValue(outputResource);

    const result = await resourceService.create(resourceCreated);

    expect(result).toEqual(outputResource);
    expect(resourceRepositoryMock.save).toHaveBeenCalledWith(resourceCreated);
  })

  it("2° Retrieve a resource", async() => {

    resourceRepositoryMock.findById.mockResolvedValue(outputResource);

    const result = await resourceService.getById(resourceCreated.id);

    expect(result).toEqual(outputResource);
    expect(resourceRepositoryMock.findById).toHaveBeenCalledWith(resourceCreated.id);
  })
})