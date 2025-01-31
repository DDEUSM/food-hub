import { UnitTypes } from "../../enums/unitTypes"
import { EntityBase } from "../../shared/date.base"

export type PizzaRequirementsInput = {
    readonly id: string
    readonly pizzaId: string
    readonly resourceId: string
    quantityRequired: number
    unitId: UnitTypes
    editedAt?: Date
    editedBy?: string
    readonly createdAt: Date
    readonly createdBy: string
}

export type PizzaRequirementsUpdate = {
    quantityRequired?: number,
    editedBy: string
}

export class PizzaRequirements extends EntityBase {

    readonly id: string
    readonly pizzaId: string
    readonly resourceId: string
    private _quantityRequired: number
    unitId: UnitTypes

    constructor(data: PizzaRequirementsInput){
        super(
            data.createdAt, 
            data.createdBy, 
            data.editedAt, 
            data.editedBy
        )
        this.id = data.id
        this.pizzaId = data.pizzaId
        this.resourceId = data.resourceId
        this._quantityRequired = this.quantityRequiredLogic(data.quantityRequired)
        this.unitId = data.unitId
    }

    update(body: PizzaRequirementsUpdate){
        for (const key in body) {
            this[key as keyof PizzaRequirementsUpdate] = body[key as keyof PizzaRequirementsUpdate] as never
        }
        this._editedAt = new Date()
    }

    private quantityRequiredLogic(quantity: number){
        if(quantity > 0.0){
            return quantity
        } else {
            throw new Error('Invalid quantity')
        }
    }

    get quantityRequired(){ return this._quantityRequired }

    set quantityRequired(quantity: number){
        this._quantityRequired = this.quantityRequiredLogic(quantity)
    }
}
