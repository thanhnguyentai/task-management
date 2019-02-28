const cookieHelper = require('../helpers/cookie');

module.exports = function(req, res, next) {
    const userSession = cookieHelper.getAuthenticatedCookie(req);
    if(!userSession || !userSession._id) {
        res.status(401);
        res.json({
            error: 'You are not allowed to access this endpoint'
        });
    } else {
        next();
    }
}