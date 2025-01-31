import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import 'reflect-metadata'
import { PizzaFlavorInputDTO, PizzaFlavorOutputDTO, PizzaOrderDTO } from "./pizza.dto";
import { PizzaFlavor } from "./pizza.entity";
import { ulid } from "ulid";
import { RecordStatus } from "../../enums/recordStatus";
import { PizzaRequirements } from "./pizzaRequirements.entity";
import { UnitTypes } from "../../enums/unitTypes";
import { mapToPizzaFlavorOutputDTO } from "./pizza.mapper";
import { CountPizzaPrice, ExtractResources } from "./pizzaQuerySQL";
import { OrderItem, PizzaOrder } from "./pizzaOrder.entity";
import { SizeQuoeficientMap } from "../../enums/pizzaSizes";

@injectable()
export class PizzaServices {

    constructor(
        @inject(PrismaClient) private repository: PrismaClient
    ){}

    async registerPizzaFlavor(pizzaFlavorDTO: PizzaFlavorInputDTO){
        const pizzaId = ulid()        

        const pizzaRequirements = pizzaFlavorDTO.pizzaRequirements.map(requirement => {
            return new PizzaRequirements({
                id: ulid(),
                resourceId: requirement.resourceId,
                quantityRequired: requirement.quantityRequired,
                createdAt: new Date(),
                createdBy: pizzaFlavorDTO.createdBy,
                pizzaId: pizzaId,
                unitId: UnitTypes.kg
            })
        })
        
        const pizzaFlavor = new PizzaFlavor({
            id: pizzaId,
            flavor: pizzaFlavorDTO.flavor,
            currentPrice: pizzaFlavorDTO.currentPrice,
            recordStatusId: RecordStatus.activated,
            sizes: pizzaFlavorDTO.sizes,
            createdAt: new Date(),
            createdBy: pizzaFlavorDTO.createdBy,
            pizzaRequirements: pizzaRequirements
        })


        const newPizzaDTO = await this.repository.pizzas.create({
            data: {
                id: pizzaFlavor.id,
                flavor: pizzaFlavor.flavor,
                current_price: pizzaFlavor.currentPrice,
                record_status_id: pizzaFlavor.recordStatusId,
                sizes: pizzaFlavor.sizes as number[],
                created_at: pizzaFlavor.createdAt.toISOString(),
                created_by: pizzaFlavor.createdBy               
            }
        }).then(pizzaFounded => ({
            id: pizzaFounded.id,
            flavor: pizzaFounded.flavor!,
            currentPrice: Number(pizzaFounded.current_price),
            recordStatusId: pizzaFounded.record_status_id!,
            sizes: pizzaFounded.sizes,
            createdAt: pizzaFounded.created_at?.toISOString(),
            createdBy: pizzaFounded.created_by!,
            editedAt: pizzaFounded.edited_at? pizzaFounded.edited_at.toISOString(): null,
            editedBy: pizzaFounded.edited_by                        
        }as PizzaFlavorOutputDTO)  )

        await this.repository.pizza_requirements.createMany({            
            data: pizzaFlavor.pizzaRequirements.map(requirement => {
                return {
                    id: requirement.id,
                    pizza_id: requirement.pizzaId,
                    resource_id: requirement.resourceId,
                    quantity_required: requirement.quantityRequired,
                    unit_id: requirement.unitId,
                    created_at: requirement.createdAt.toISOString(),
                    created_by: requirement.createdBy
                }
            })
        })

        return newPizzaDTO
    }


    async getPizzasById(pizzaIds: Array<string>){

        const pizzaDTOs = await this.repository.pizzas.findMany({
            where: {
                id: {
                    in: pizzaIds
                }
            },
            include: {
                pizza_requirements: true
            }
        }).then(pizzasFounded => pizzasFounded.map(pizza => mapToPizzaFlavorOutputDTO(pizza)))

        return pizzaDTOs
    }
    

    async getPizzaFlavorById(pizzaId: string){

        const pizzaDTO = await this.repository.pizzas.findUnique({
            where: {
                id: pizzaId
            },
            include: {
                pizza_requirements: true
            }
        }).then(pizzaFounded => mapToPizzaFlavorOutputDTO(pizzaFounded))

        if(!pizzaDTO){
            throw new Error('Pizza not found')
        }     

        return pizzaDTO
    }


    async pizzaOrder(order: PizzaOrderDTO){
    
        const extractResourceSQL = ExtractResources(order);  
        const countPizzaPriceSQL = CountPizzaPrice(order);         

        await this.repository.$transaction(async(prisma) => {

            const resourcesQuantity: Array<{ id: string, quantity: number}> = await prisma.$queryRaw(extractResourceSQL) as any;  

            if(resourcesQuantity.some(resource => resource.quantity < 0)){
                throw new Error('Insufficient resources');
            }            
        })

        const pizzaPricesData: Array<CountPizzaPrice> = await this.repository.$queryRaw(countPizzaPriceSQL) as any;       
        
        let orderPrices: Record<string, number> = {}

        const orderItems = order.items.reduce((finalOrder, item, index) => {

            let pizzaPrice = pizzaPricesData.find(pizza => pizza.pizza_id == item.pizzaId)   
            
            const proportionalPrice = pizzaPrice?.price! * SizeQuoeficientMap[item.size]

            if(orderPrices[item.itemId]){
                orderPrices[item.itemId] < proportionalPrice ? orderPrices[item.itemId] = pizzaPrice?.price! : null
            }else{
                orderPrices[item.itemId] = proportionalPrice
            }

            let formatedItem = {
                orderItemId: item.itemId, 
                itemId: item.pizzaId, 
                price:  orderPrices[item.itemId],
                size: item.size
            } as OrderItem

            finalOrder.push(formatedItem)

            return finalOrder
        }, [] as Array<OrderItem>)
        
        return new PizzaOrder(ulid(), orderItems)
    }
}