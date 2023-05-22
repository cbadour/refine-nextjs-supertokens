export interface IRole {
    id: number,
    name: string
}

export interface IPermissions {
    name: string
}

export interface IRolePermissions extends IPermissions {

}