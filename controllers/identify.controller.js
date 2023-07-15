const { query } = require("../services/load.database");

const identifyCheckController = async (req, res) => {
    res.status(200).send({
        status: 200,
        res: "The App is routing and the request is processed",
    });
};

const identifyController = async (req, res) => {};
exports.identifyCheckController = identifyCheckController;
