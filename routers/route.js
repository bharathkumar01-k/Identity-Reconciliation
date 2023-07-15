const identifyRoute = require("./identify.route");
const userRoute = require("./user.route");

module.exports = async (router) => {
    identifyRoute(router);
    userRoute(router);
};
