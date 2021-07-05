const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./connection");

function init(){

}

connection.connect((err) =>{
    if (err) throw err;
    init();
});