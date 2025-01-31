import { PizzaFlavorOutputDTO, PizzaRequirementsOutputDTO } from "./pizza.dto";


export function mapToPizzaFlavorOutputDTO(pizzaFounded: any): PizzaFlavorOutputDTO | null {
    if (!pizzaFounded) {
        return null;
    }

    const pizzaRequirements: PizzaRequirementsOutputDTO[] = pizzaFounded.pizza_requirements ? pizzaFounded.pizza_requirements.map((requirement: any) => ({
        id: requirement.id,
        pizzaId: requirement.pizza_id,
        resourceId: requirement.resource_id,
        quantityRequired: Number(requirement.quantity_required),
        unitId: requirement.unit_id,
        createdAt: requirement.created_at?.toISOString(),
        createdBy: requirement.created_by,
        editedAt: requirement.edited_at ? requirement.edited_at.toISOString() : null,
        editedBy: requirement.edited_by
    })) : [];

    return {
        id: pizzaFounded.id,
        flavor: pizzaFounded.flavor!,
        currentPrice: Number(pizzaFounded.current_price),
        recordStatusId: pizzaFounded.record_status_id!,
        sizes: pizzaFounded.sizes,
        createdAt: pizzaFounded.created_at?.toISOString(),
        createdBy: pizzaFounded.created_by!,
        editedAt: pizzaFounded.edited_at ? pizzaFounded.edited_at.toISOString() : null,
        editedBy: pizzaFounded.edited_by,
        pizzaRequirements: pizzaRequirements
    };
}