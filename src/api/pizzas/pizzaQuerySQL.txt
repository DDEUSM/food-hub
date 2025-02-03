import { Prisma } from "@prisma/client";
import { PizzaOrderDTO } from "./pizza.dto";
import { SizeQuoeficientMap } from "../../enums/pizzaSizes";

type PizzaQuoeficient = Record<string, { pizzaId: string, sizeQuoeficient: number }>

function replacePlaceholders(template: string, values: Record<string, any>): string {
    return template.replace(/\$(\w+)/g, (_, key) => {
        return values[key];
    });
}

function genPizzaTransactionCases(pizzasQuoeficient: PizzaQuoeficient) {
    return Object.values(pizzasQuoeficient).map(pizza => {        
        return Prisma.sql`WHEN pizza_id = ${pizza.pizzaId} THEN ${pizza.sizeQuoeficient} * quantity_required`;
    });
}

function genPizzaPriceCases(pizzasQuoeficient: PizzaQuoeficient) {
    return Object.values(pizzasQuoeficient).map(pizza => {        
        return Prisma.sql`WHEN id = ${pizza.pizzaId} THEN ${pizza.sizeQuoeficient} * current_price`;
    });
}

function getPizzaIds(order: PizzaQuoeficient) {
    return Object.values(order).map(pizza => pizza.pizzaId);
}

function countPizzaQuoeficents(order: PizzaOrderDTO){
    return order.items.reduce((pizzaGroup, pizza) => {
        pizzaGroup[pizza.pizzaId] 
            ? pizzaGroup[pizza.pizzaId].sizeQuoeficient += SizeQuoeficientMap[pizza.size]
            : pizzaGroup[pizza.pizzaId] = { pizzaId: pizza.pizzaId, sizeQuoeficient: SizeQuoeficientMap[pizza.size] };
        return pizzaGroup;
    }, {} as any);
}

export type ExtractedResources = {
    id: string,
    quantity: number
}


export function ExtractResources(order: PizzaOrderDTO) {

    const pizzaCases = genPizzaTransactionCases(countPizzaQuoeficents(order));
    const pizzaIds = getPizzaIds(countPizzaQuoeficents(order));

    return Prisma.sql`
        WITH pizza_ingredients AS (
            SELECT 
                pizza_id,
                resource_id,
                SUM(
                    CASE
                        ${Prisma.join(pizzaCases, ' ')}
                        ELSE 0.0
                    END
                ) AS quantity_required
            FROM pizza_requirements
            WHERE pizza_id IN (${Prisma.join(pizzaIds)})
            GROUP BY pizza_id, resource_id
        ),        
        resource_requirements AS (
            SELECT 
                resource_id,
                SUM(quantity_required) AS quantity
            FROM pizza_ingredients 
            JOIN resources ON resources.id = pizza_ingredients.resource_id
            GROUP BY resource_id
        )

        UPDATE resources
        SET quantity = resources.quantity - resource_requirements.quantity
        FROM resource_requirements
        WHERE resources.id = resource_requirements.resource_id
        RETURNING resources.id, resources.quantity;
    `
}

export type CountPizzaPrice = {
    pizza_id: string,
    price: number
}

export function CountPizzaPrice(order: PizzaOrderDTO){
    
    const pizzaIds = getPizzaIds(countPizzaQuoeficents(order));
        
    return Prisma.sql`
        SELECT 
            id AS pizza_id,
            current_price AS price
        FROM pizzas
        WHERE id IN (${Prisma.join(pizzaIds)});
    `
}