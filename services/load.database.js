const mysql = require("mysql");
const { makeDb } = require("mysql-async-simple");
const util = require("node:util");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bitespeed",
});
connection.connect();
const query = util.promisify(connection.query).bind(connection);
console.log("DB connected and exported");
const closeConnection = async () => {
    connection.end();
};

exports.query = query;
exports.closeConnection = closeConnection;
