const mysql = require("mysql2");
const util = require("node:util");
const connection = mysql.createConnection({
    host: "mysql-db",
    user: "root",
    password: "password",
    database: "bitespeed",
    port: 3306,
});
connection.connect();
const query = util.promisify(connection.query).bind(connection);
console.log("DB connected and exported");
const closeConnection = async () => {
    connection.end();
};
const createTable =
    "CREATE TABLE IF NOT EXISTS USERS_BITESPEED (id INT NOT NULL,phoneNumber VARCHAR(255) NULL,email VARCHAR(45) NULL,linkedId INT NULL,linkPrecedence VARCHAR(45) NOT NULL,createdAt DATETIME NOT NULL,updatedAt DATETIME NOT NULL,deletedAt DATETIME NULL,PRIMARY KEY (id));";
(async () => {
    try {
        const rows = await query(createTable);
        console.log("TABLE CREATED");
    } catch (err) {
        console.log(err);
    }
})();
exports.query = query;
exports.closeConnection = closeConnection;
