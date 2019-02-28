
export const AppConfig = {
    apiRoot: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api",
    userEndpoint: {
        session: '/user/session',
        login: '/user',
        logout: '/user/logout',
        createAccount: '/user'
    }
};