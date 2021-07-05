const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require ("console.table");
const connection = require("./db/connection");

function init(){
    inquirer.prompt({
        type: "list",
        name: "mainMenu",
        message: "What action would you like to preform?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "View Employees by Manager",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee's Roles",
            "END TASK" 
        ],
      }).then(function(data) {
        if(data.option === "View Departments") {
           readDepartment();
        } else if (data.option ===  "View Roles") {
           readRoles();
        } else if (data.option === "View Employees") {
           readEmployees();
        } else if (data.option === "View Employees by Manager") {
           readEmployeesMng();
        } else if (data.option === "Add Department") {
           writeDepartment();
        } else if (data.option === "Add Roles") {
           writeRole();
        } else if (data.option === "Add Employee") {
           writeEmployee();
        } else if (data.option === "Update Employee's Roles") {
           updateRole();
        } else if (data.option === "Remove Employee") {
           deleteEmployee();
        } else {
           console.log("OK,Good bye!");
           process.exit(0);
        };
    });
 };

connection.connect((err) =>{
    if (err) throw err;
    init();
});