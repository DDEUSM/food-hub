export class ApiError extends Error {
    constructor(
        public statusCode: 400 | 404 | 500,
        message?: string
    ){
        super(message)
    }

    static NotFounded(message: string = "Resource not founded") {
        return new ApiError(404, message);
    }   
}