const { query } = require("../services/load.database");
const { DateTime } = require("luxon");
const createUserTable = async (req, res) => {
    console.log("inside user controller", query);
    const sql =
        "CREATE TABLE USERS_BITESPEED (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,phoneNumber VARCHAR(255),email VARCHAR(255),linkedId INT,linkPrecedence VARCHAR(255) NOT NULL,createdAt DATETIME NOT NULL,updatedAt DATETIME NOT NULL,deletedAt DATETIME)";
    try {
        const rows = await query(sql);
        console.log("rows", rows);
    } catch (err) {
        console.log(err);
    }
};

const addUserController = async (req, res) => {
    const body = req.body;
    console.log(body);
    const sql = "INSERT INTO USERS_BITESPEED VALUES (?,?,?,?,?,?,?,?)";
    const dt = DateTime.fromSQL(body.createdAt).toSQL({ includeOffset: false });
    console.log(dt);
    const values = [
        body.id,
        body.phoneNumber,
        body.email,
        body.linkedId,
        body.linkPrecedence,
        DateTime.fromSQL(body.createdAt).toSQL({ includeOffset: false }),
        DateTime.fromSQL(body.updatedAt).toSQL({ includeOffset: false }),
        body.deletedAt
            ? DateTime.fromSQL(body.deletedAt).toSQL({ includeOffset: false })
            : null,
    ];
    const rows = await query(sql, values);
    console.log(rows);
    res.status(201).send({
        success: true,
        res: rows,
    });
};

const listAllUsers = async (req, res) => {
    const sql = "SELECT * FROM USERS_BITESPEED";
    const rows = await query(sql);
    res.status(200).send({
        success: true,
        res: rows,
    });
};
exports.createUserTable = createUserTable;
exports.addUserController = addUserController;
exports.listAllUsers = listAllUsers;
