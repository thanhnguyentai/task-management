
export const AppConfig = {
    apiRoot: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api",
    sessionEndpoint: '/user/session',
    loginEndpoint: '/user',
    logoutEndpoint: '/user/logout',
    createAccountEndpoint: '/user'
};