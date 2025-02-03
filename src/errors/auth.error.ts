export class AuthError extends Error {

    constructor(
        public statusCode: number = 401,
        message: string = 'Token Inválido'
    ){super(message)}

    static get InvalidToken(){
        return new AuthError(400, "Token Inválido")
    }

    static get UnauthorizedToken(){
        return new AuthError(401, "Permissão de acesso insuficiente")
    }

    static get TokenNotProvided(){
        return new AuthError(400, "Cabeçalho de autorização vazio")
    }
}