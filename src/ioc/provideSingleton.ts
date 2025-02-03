import { interfaces } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";

export function provideSingleton<T>(identifier: interfaces.ServiceIdentifier<T>){
    return fluentProvide(identifier).inSingletonScope().done()
}