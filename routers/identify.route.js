const identifyController = require("../controllers/identify.controller");

module.exports = async (router) => {
    router.get(
        "/identifyRouteCheck",
        identifyController.identifyCheckController
    );
    router.post("/identify", identifyController.identifyCheckController);
};
