export class EntityBase {
    
    readonly createdAt: Date
    readonly createdBy: string
    protected _editedAt: Date | null
    protected _editedBy: string | null

    constructor(
        createdAt: Date,
        createdBy: string,
        editedAt?: Date,
        editedBy?: string
    ){
        this.createdAt = createdAt
        this.createdBy = createdBy
        this._editedAt = editedAt ?? null 
        this._editedBy = editedBy ?? null
    }

    get editedAt(){ return this._editedAt }

    get editedBy(){ return this._editedBy }

    protected set editedBy(userId: string | null){ 
        this._editedBy = userId    
    }
}