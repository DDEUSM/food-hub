import { PrismaClient } from "@prisma/client";
import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

const iocContainer = new Container();

decorate(injectable(), Controller); // Torna a classe Controller e suas Sub-classes em injetáveis na resolução do container

iocContainer.load(buildProviderModule());

const prismaClient = new PrismaClient({ log: ['query'] })

iocContainer.bind<PrismaClient>(PrismaClient).toConstantValue(prismaClient);

export { iocContainer }