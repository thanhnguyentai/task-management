
export const AppConfig = {
    apiRoot: process.env.NODE_ENV === "production" ? "" : "http://localhost:3001/api",
    isLoginEndpoint: '/user/isloggin',
    loginEndpoint: '/user',
    createAccountEndpoint: '/user'
};