import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface AccessOptions {
    resource?: string,
    action: string
}

const useAccessControl = () => {
    const session = useSessionContext();

    const canAccess = (accessOption: AccessOptions): boolean => {
        if (session.loading) {
            return false;
        }

        const { permissions } = session.accessTokenPayload as { permissions: any[] };

        const detailedPermissions = permissions?.map((permission: string) => {
            const permissionSections = permission.split(":");

            return {
                resource: permissionSections[0],
                action: permissionSections[1]
            }
        })

        return !!detailedPermissions?.find(dp => dp.action === accessOption.action && dp.resource === accessOption.resource)
    }

    return {
        canAccess
    }
}

export {
    useAccessControl
}