const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What action would you like to preform?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee's Roles",
        "END TASK",
      ],
    })
    .then(function (data) {
      if (data.mainMenu === "View Departments") {
        readDepartment();
      } else if (data.mainMenu === "View Roles") {
        readRoles();
      } else if (data.mainMenu === "View Employees") {
        readEmployees();
      } else if (data.mainMenu === "Add Department") {
        writeDepartment();
      } else if (data.mainMenu === "Add Roles") {
        writeRoles();
      } else if (data.mainMenu === "Add Employee") {
        writeEmployee();
      } else if (data.mainMenu === "Update Employee's Roles") {
        updateRole();
      } else if (data.mainMenu === "Remove Employee") {
        deleteEmployee();
      } else {
        console.log("OK,Good bye!");
        process.exit(0);
      }
    });
}

function readDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.log("=== Departments ===");
    console.table(data);
    init();
  });
}

function readRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.log("===================== Roles =====================");
    console.table(data);
    init();
  });
}

function readEmployees() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.log("================== Employees =================");
    console.table(data);
    init();
  });
}

function writeDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the new department?",
    })
    .then(function (data) {
      connection.query("INSERT INTO department SET ?", {
        name: data.department,
      });
      readDepartment();
    });
}

function writeRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the Salary for this role?",
      },
      {
        type: "input",
        name: "departmentID",
        message: "what is the department ID for this role?",
      },
    ])
    .then(function (data) {
      connection.query("INSERT INTO role SET ?", {
        title: data.role,
        salary: data.salary,
        department_id: data.departmentID,
      });
      readRoles();
    });
}
function updateRole(){
  connection.query("SELECT * FROM role", (err, data) =>{
    if (err) throw err;
    inquirer.prompt([
      {
        message: "what is the ID of the employee whose role you'd like to change?",
        name: "id",
      },
      {
        message: "What is the new role Id you'd like to give them?",
        name: "role_id",
      }
    ])
    .then (function(data) {
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", {
        role_id: data.role_id,
        id: data.id
      });
      readEmployees();
    });
  });
}
connection.connect((err) => {
  if (err) throw err;
  init();
});
