import { resources } from "@prisma/client";
import { Resource } from "./resource.entity";
import { Decimal } from "@prisma/client/runtime/library";

export class ResourceMapper {
  static mapToDB(entity: Resource): resources {
    return {
      id: entity.id,
      name: entity.name,
      quantity: entity.quantity,
      average_cost_per_unit: new Decimal(entity.averageCostPerUnit),
      unit_id: entity.unitId,
      last_entry_at: entity.lastEntryAt,
    };
  }

  static mapToEntity(dbModel: resources | null): Resource | null {
    if (!dbModel) return dbModel;
    return new Resource({
      id: dbModel.id,
      name: dbModel.name,
      quantity: dbModel.quantity,
      averageCostPerUnit: Number(dbModel.average_cost_per_unit),
      unitId: dbModel.unit_id,
      lastEntryAt: dbModel.last_entry_at,
    });
  }
}