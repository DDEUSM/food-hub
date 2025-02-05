import { ulid } from "ulid";
import { Resource, ResourceInput } from "../../../src/api/resources/resource.entity";
import { UnitTypes } from "../../../src/enums/unitTypes";

describe("Testing the Resource entity class", () => {

  const resourceData: ResourceInput = {
    id: ulid(),
    name: "Farinha de Trigo",
    quantity: 100,
    averageCostPerUnit: 1.5,
    unitId: UnitTypes.kg,
  };

  const resource = new Resource(resourceData);

  it("should create a Resource instance with correct properties", () => {
    
    expect(resource.id).toBe(resourceData.id);
    expect(resource.name).toBe(resourceData.name);
    expect(resource.quantity).toBe(resourceData.quantity);
    expect(resource.averageCostPerUnit).toBe(resourceData.averageCostPerUnit);
    expect(resource.unitId).toBe(resourceData.unitId);
    expect(resource.lastEntryAt).toEqual(null);
  });

  it("should update the quantity of the resource", () => {
    resource.quantity += 50;
    expect(resource.quantity).toBe(150);
  });

  it("should update the last entry date of the resource", () => {

    const newDate = new Date("2025-01-01T00:00:00.000Z");
    resource.lastEntryAt = newDate;

    expect(resource.lastEntryAt).toEqual(newDate);
  });
});