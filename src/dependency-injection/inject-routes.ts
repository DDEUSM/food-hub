import { Container } from "inversify";
import { PizzaRoutes } from "../api/pizzas/pizza.routes";

export function injectRoutes(container: Container){

    container.get(PizzaRoutes)

}