import { AnyObject } from "@interfaces/basic/AnyObject.interface";
interface Role {
    id: number;
    name: string;
    title: string;
    contains: string[];
}
interface RoleMainPage {
    name: string;
    mainPage: string;
}

export default class UserRolesUtility {
    private static roles: Role[] = [
        {
            id: 1,
            name: "admin",
            title: "Administrator",
            contains: [
                "administrator",
                "external_expedition",
                "external_billing",
                "muk_billing",
                "muk_guest",
            ],
        },
        {
            id: 2,
            name: "muk_billing",
            title: "MUK billing",
            contains: ["external_expedition", "external_billing", "muk_guest"],
        },
        {
            id: 2,
            name: "external_expedition",
            title: "External Expedition",
            contains: [],
        },
        {
            id: 2,
            name: "external_billing",
            title: "External Billing",
            contains: [],
        },
        {
            id: 2,
            name: "muk_guest",
            title: "MUK guest",
            contains: [],
        },
    ];

    private static entitiesPermissions: AnyObject = {
        users: {
            read: ["admin"],
            create: ["admin"],
            update: ["admin"],
            delete: ["admin"],
        },
        deliveryNotes: {
            read: [
                "admin",
                "external_expedition",
                "external_billing",
                "muk_billing",
                "muk_guest",
            ],
            create: ["admin", "external_expedition"],
            update: ["admin", "external_expedition"],
            delete: ["admin", "external_expedition"],
            invoice: ["admin", "external_billing", "muk_billing"],
            export: [
                "admin",
                "external_billing",
                "muk_billing",
                "muk_guest",
                "external_expedition",
            ],
        },
        shippers: {
            read: ["admin", "external_expedition", "muk_billing", "muk_guest"],
            create: ["admin", "external_expedition"],
            update: ["admin", "external_expedition"],
            delete: ["admin", "external_expedition"],
        },
        orders: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
        pexs: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
        products: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
        customers: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
        carriers: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
        destinations: {
            read: ["admin", "muk_billing", "muk_guest"],
            create: ["admin", "muk_billing"],
            update: ["admin", "muk_billing"],
            delete: ["admin", "muk_billing"],
        },
    };

    private static rolesMainPages: RoleMainPage[] = [];

    public static hasPermission(
        userRoleName: string,
        accessRole: string[] | undefined
    ): boolean {
        //Role check
        const role = UserRolesUtility.roles.filter(
            (role) => role.name === userRoleName
        )[0];

        let rolePermission = false;
        if (accessRole && role) {
            const hasPermission = accessRole.some((accessRole) =>
                role.contains.some(
                    (roleContains) => roleContains === accessRole
                )
            );
            rolePermission = accessRole.includes(role.name) || hasPermission;
        } else {
            rolePermission = true;
        }

        return rolePermission;
    }

    public static getRole(UserRoleName: string): Role {
        return UserRolesUtility.roles.filter(
            (role) => role.name === UserRoleName
        )[0];
    }

    public static getRoleMainPage(UserRoleName: string): string {
        const mainPage = UserRolesUtility.rolesMainPages.filter(
            (rolesMainPages) => rolesMainPages.name === UserRoleName
        );
        if (mainPage.length > 0) {
            return mainPage[0].mainPage;
        }
        return "/";
    }

    public static getRoles(): Role[] {
        return UserRolesUtility.roles;
    }

    public static hasAccessToEntity(
        userRoleName: string,
        entity: string,
        action: string
    ): boolean {
        const role = UserRolesUtility.getRole(userRoleName);
        if (role) {
            const entityPermissions =
                UserRolesUtility.entitiesPermissions[entity];
            if (entityPermissions) {
                return entityPermissions[action].some(
                    (roleName: string) =>
                        role.contains.some(
                            (roleContains: string) => roleContains === roleName
                        ) || role.name === roleName
                );
            }
        }
        return false;
    }

    public static getAllowedRolesForEntity(
        entity: string,
        action: string
    ): string[] {
        const entityPermissions = UserRolesUtility.entitiesPermissions[entity];
        if (entityPermissions) {
            return entityPermissions[action];
        }
        return [];
    }
}
