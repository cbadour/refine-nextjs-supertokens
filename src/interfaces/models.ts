export interface IRole {
    id: number,
    name: string
}

export interface IPermission {
    name: string
}

export interface IRolePermissions {
    roleId: number,
    permissionId: number
}

export interface IUserRoles {
    userId: number,
    roleId: number
}