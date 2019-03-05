
export const AppConfig = {
    apiRoot: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api",
    userEndpoint: {
        session: '/user/session',
        login: '/user',
        logout: '/user/logout',
        createAccount: '/user'
    },
    projectEndpoint: {
        list: '/project/list',
        create: '/project/create',
        update: '/project/update',
        delete: '/project/delete',
        users: '/project/users',
        addUser: '/project/add-user',
        changeUserRole: '/project/change-role',
        removeUser: '/project/remove-user'
    }
};