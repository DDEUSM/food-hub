import { PizzaSizes } from "../../enums/pizzaSizes"
import { RecordStatus } from "../../enums/recordStatus"
import { EntityBase } from "../../shared/date.base"
import { PizzaRequirements } from "./pizzaRequirements.entity"

export type PizzaFlavorInput = {
    readonly id: string
    flavor: string
    currentPrice: number
    recordStatusId: RecordStatus
    sizes: Array<PizzaSizes> | PizzaSizes
    readonly createdAt: Date
    readonly createdBy: string
    editedAt?: Date
    editedBy?: string
    pizzaRequirements: Array<PizzaRequirements>
}

export type PizzaFlavorUpdate = {
    flavor?: string,
    currentPrice?: number,
    recordStatusId?: RecordStatus,
    sizes?: Array<PizzaSizes> | PizzaSizes
    pizzaRequirements?: Array<PizzaRequirements>
    editedBy: string
}

export class PizzaFlavor extends EntityBase {
    readonly id: string
    flavor: string
    private _currentPrice: number
    recordStatusId: RecordStatus
    private _sizes: Array<PizzaSizes>
    private _pizzaRequirements: Array<PizzaRequirements>

    constructor (data: PizzaFlavorInput) {
        super(
            data.createdAt,
            data.createdBy,
            data.editedAt,
            data.editedBy
        )
        this.id = data.id
        this.flavor = data.flavor
        this._currentPrice = this.currentPriceLogic(data.currentPrice)
        this.recordStatusId = data.recordStatusId
        this._sizes = this.sizeLogic(data.sizes)
        this._pizzaRequirements = data.pizzaRequirements 
    }

    get currentPrice(){ return this._currentPrice }

    get sizes(){ return this._sizes }

    get pizzaRequirements(){ return this._pizzaRequirements }

    set currentPrice(price: number){
        this._currentPrice = this.currentPriceLogic(price)
    }

    set sizes(size: PizzaSizes | Array<PizzaSizes>){ 
       let newSizes = new Set(this.sizeLogic(size).concat(this._sizes))
       this._sizes = Array.from(newSizes)
    }

    set pizzaRequirements(requirements: Array<PizzaRequirements>){
        this._pizzaRequirements = this.pizzaRequirementsLogic(this._pizzaRequirements.concat(requirements))
    }


    update(body: PizzaFlavorUpdate){
        for (const key in body) {
            this[key as keyof PizzaFlavorUpdate] = body[key as keyof PizzaFlavorUpdate] as never
        }
        this._editedAt = new Date()
    }

    private pizzaRequirementsLogic(pizzaRequirements: Array<PizzaRequirements>){
        const uniquePizzaRequirements: Record<string,any> = {}
        pizzaRequirements.forEach(req => {
            const key = req.pizzaId.concat(req.resourceId)
            uniquePizzaRequirements[key] ? null : uniquePizzaRequirements[key] = req 
        })
        return Object.values(uniquePizzaRequirements)
    }

    private currentPriceLogic(price: number){
        if(price < 30) throw new Error('Invalid price!')
        return price
    }

    private sizeLogic(size: PizzaSizes | Array<PizzaSizes>){
        if(!(size instanceof Array)){
            return [size]
        } else if(size.length > 0) {
            return size
        } 
        throw new Error('Invalid Size')
    }

    
}

