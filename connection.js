const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3333,

  user: "root",

  password: "",
  database: "employees_db",
});

module.exports = connection;
