const express = require("express");
const app = express();
const apiRouter = require("./routers/route");
const router = express.Router();

module.exports = async (app) => {
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        console.log("req path", req.path);
        next();
    });

    app.get("/", (req, res) => {
        res.status(200).send("The App is healthy");
    });

    app.use("/api", router);

    (async () => {
        await apiRouter(router);
    })();
};
