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

function updateRole() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    // console.log(data);
    const choices = data.map((role) => role.title);
    console.log(choices);

    inquirer
      .prompt([
        {
          type: "list",
          name: "oldRole",
          message: "Which role would you like to update?",
          choices: choices,
        },
        {
          type: "input",
          name: "newRole",
          message: "What would you like to rename this role?",
        },
      ])
      .then(function (data) {
        console.log(data.newRole);
        connection.query(
          `UPDATE role SET ? WHERE ?`,
          [{ title: `${data.newRole}` }, { title: `${data.oldRole}` }],
            readRoles()
        );
      });
  });
}

connection.connect((err) => {
  if (err) throw err;
  init();
});
