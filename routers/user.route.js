const userController = require("../controllers/user.controller");

module.exports = async (router) => {
    router.post("/create_user_table", userController.createUserTable);
    router.post("/add_new_user", userController.addUserController);
    router.get("/list_all_users", userController.listAllUsers);
};
