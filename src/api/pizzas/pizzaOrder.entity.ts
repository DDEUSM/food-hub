import { PizzaSizes } from "../../enums/pizzaSizes"

export type OrderItem = { 
    orderItemId: number,   
    itemId: string,
    size?: PizzaSizes
    price: number    
}



export class PizzaOrder {

    id: string
    items: Array<OrderItem>

    constructor(id: string, items: Array<OrderItem>){
        this.id = id
        this.items = items
    }
}