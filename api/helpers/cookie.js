const LOGIN_COOKIE_NAME = "task-manager-cookie-login";
const LOGIN_COOKIE_MAXAGE = 30*24*60*60*1000;

const cookieHelper = {
    setCookieForAuthenticate(res, userData) {
        res.cookie(LOGIN_COOKIE_NAME, userData, {
            path: "/",
            maxAge: Date.now() + LOGIN_COOKIE_MAXAGE,
            httpOnly: true,
            signed: true
        });
    },

    getAuthenticatedCookie(req) {
        return req.signedCookies[LOGIN_COOKIE_NAME];
    },

    clearAuthenticatedCookie(res) {
        res.clearCookie(LOGIN_COOKIE_NAME);
    }
};

module.exports = cookieHelper;