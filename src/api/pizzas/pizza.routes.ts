import { Router } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata'
import { PizzaServices } from "./pizza.services";
import { PizzaFlavorInputDTOSchema, PizzaOrderDTOSchema } from "./pizza.dto";

@injectable()
export class PizzaRoutes {

    constructor(
        @inject(Router) private router: Router,
        @inject(PizzaServices) private services: PizzaServices
    ){
        this.initRoutes()
    }

    private routeName = (path?: string) => `/pizzas${path ?? ''}`

    private initRoutes(){

        this.router.post(
            this.routeName(),
            async(req, res, next) => {
                try {
                    const dto = PizzaFlavorInputDTOSchema.parse(req.body)                
                    const newPizzaFlavor = await this.services.registerPizzaFlavor(dto)                    
                    res.status(200).json(newPizzaFlavor)

                } catch (error) {

                    next(error)
                }               
            }
        )

        this.router.post(
            this.routeName("/pizza-order"),
            async(req, res, next) => {
                try {                    
                    const dto = PizzaOrderDTOSchema.parse(req.body)                
                    const order = await this.services.pizzaOrder(dto)                
                    res.status(200).json(order)
                } catch (error) {
                    next(error)
                }
            }
        )

        this.router.get(
            this.routeName('/:id'),
            async(req, res, next) => {
                try {
                    const pizzaFounded = await this.services.getPizzaFlavorById(req.params.id)
                    res.status(200).json(pizzaFounded)
                } catch (error) {
                    next(error)
                }                
            }
        )   

        this.router.get(
            this.routeName(),
            async(req, res) => {
                let result = null

                res.status(result? 200 : 400)
                .json(result ?? new Error('ocorreu algum erro'))
            }
        ) 
                
    }
}