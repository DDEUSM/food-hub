import { PizzaSizes } from "../../src/enums/pizzaSizes"
import { RecordStatus } from "../../src/enums/recordStatus"

import { ulid } from 'ulid'
import { PizzaRequirements, PizzaRequirementsInput, PizzaRequirementsUpdate } from "../../src/pizzas/pizzaRequirements.entity"
import { UnitTypes } from "../../src/enums/unitTypes"
describe('Testing PizzaFlavor entity', () => {

    let pizzaRequirementsInput: PizzaRequirementsInput = {
        id: ulid(),
        pizzaId: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
        resourceId: '01JG2MHPB8PA8Y4ZFKA42NBJRF',
        quantityRequired: 0.2,
        unitId: UnitTypes.kg,  
        createdAt: new Date(),
        createdBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF' 
    } 

    let entity: PizzaRequirements

    test('1º Creating a new PizzaFlavor entity', () => {

        entity = new PizzaRequirements(pizzaRequirementsInput)

        expect(entity.createdAt.getDate()).toBe(new Date().getDate())
        expect(entity.pizzaId).toBe(pizzaRequirementsInput.pizzaId)
        expect(entity.resourceId).toBe(pizzaRequirementsInput.resourceId)
        expect(entity.id).toBe(pizzaRequirementsInput.id)
        expect(entity.editedAt).toBe(null)
    })

    test('2º Updating a PizzaFlavor entity', () => {

        const body: PizzaRequirementsUpdate = {
            quantityRequired: 1.0,            
            editedBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF' 
        }

        entity.update(body)
     
        expect(entity.quantityRequired).toBe(body.quantityRequired)
        expect(entity.editedAt).not.toBe(null)
        expect(entity.editedBy).toBe('01JG2MHPB8PA8Y4ZFKA42NBJRF')
    })

    test('3º Updating a PizzaFlavor entity with Error', () => {
        const body: PizzaRequirementsUpdate = {
            quantityRequired: 0.0,            
            editedBy: '01JG2MHPB8PA8Y4ZFKA42NBJRF' 
        }

        try {
            entity.update(body)
        } catch (error: any) {
            expect(error.message).toBe('Invalid quantity')
        }        
    })
})