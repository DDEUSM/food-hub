import { PizzaSizes } from "../../src/enums/pizzaSizes"
import { RecordStatus } from "../../src/enums/recordStatus"
import { PizzaFlavor, PizzaFlavorInput, PizzaFlavorUpdate } from "../../src/contexts/pizzas/pizza.entity"
import { ulid } from 'ulid'
import { PizzaRequirements } from "../../src/contexts/pizzas/pizzaRequirements.entity"
import { UnitTypes } from "../../src/enums/unitTypes"
describe('Testing PizzaFlavor entity', () => {

    let pizzaFlavorInput: PizzaFlavorInput = {
        id: ulid(),
        flavor: 'Pizza Mussarela',
        sizes: [PizzaSizes.tiny, PizzaSizes.big],
        currentPrice: 60,
        recordStatusId: RecordStatus.activated,
        createdAt: new Date(),
        createdBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
        pizzaRequirements: [] 
    } 

    let entity: PizzaFlavor

    test('1º Creating a new PizzaFlavor entity', () => {

        entity = new PizzaFlavor(pizzaFlavorInput)

        expect(entity.createdAt.getDate()).toBe(new Date().getDate())
        expect(entity.flavor).toBe(pizzaFlavorInput.flavor)
        expect(entity.currentPrice).toBe(pizzaFlavorInput.currentPrice)
        expect(entity.editedAt).toBe(null)
    })

    test('2º Updating a PizzaFlavor entity', () => {
        let id = ulid()
        const body: PizzaFlavorUpdate = {
            currentPrice: 65.0,
            sizes: [
                PizzaSizes.big,
                PizzaSizes.medium,
                PizzaSizes.middle
            ],
            editedBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
            pizzaRequirements: [ 
                new PizzaRequirements({
                    id: id,
                    pizzaId: entity.id,
                    resourceId: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
                    createdAt: new Date(),
                    createdBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
                    quantityRequired: 0.4,
                    unitId: UnitTypes.kg
                }),
                new PizzaRequirements({
                    id: id,
                    pizzaId: entity.id,
                    resourceId: '01JG2MHPB8PA8Y4ZFKA42NBJRV',
                    createdAt: new Date(),
                    createdBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
                    quantityRequired: 0.4,
                    unitId: UnitTypes.kg
                }),
                new PizzaRequirements({
                    id: ulid(),
                    pizzaId: entity.id,
                    resourceId: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
                    createdAt: new Date(),
                    createdBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
                    quantityRequired: 0.4,
                    unitId: UnitTypes.kg
                })
            ] 
        }

        entity.update(body)
     
        expect(entity.currentPrice).toBe(body.currentPrice)
        expect(entity.editedAt).not.toBe(null)
        expect(entity.editedBy).toBe('01JG2MHPB8PA8Y4ZFKA42NBJRF')
        expect(entity.pizzaRequirements.length).toBe(2)
        console.log(entity)
    })

    test('3º Updating a PizzaFlavor entity with Error', () => {
        const body: PizzaFlavorUpdate = {
            currentPrice: 29.0,
            sizes: [],
            editedBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF' 
        }
        const newSizes: PizzaSizes[] = []

        try {
            entity.update(body)
        } catch (error: any) {
            expect(error.message).toBe('Invalid price!')
        }        
    })
})