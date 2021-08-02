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
      } else if (data.mainMenu === "Add Role") {
        writeRole();
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

function writeRole() {
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
        message: "What is this new role's salary?",
      },
      {
        type: "input",
        name: "departmentID",
        message: "What is the department id for this role?",
      },
    ])
    .then(function (data) {
      connection.query("INSERT INTO role SET ?", {
        title: data.role,
        salary: data.salary,
        department_id: data.department_id,
      });
      readRoles();
    });
};

function writeEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new employee's first name??",
      },
      {
        type: "input",
        name: "lastName",
        message: "Their last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "Their role Id?",
      },
      {
        type: "input",
        name: "managerId",
        message: "Their managers id?(If any)",
      },
    ])
    .then(function (data) {
      connection.query("INSERT INTO role SET ?", {
        first_name: data.firstName,
        last_Name: data.lastName,
        role_id: data.roleId,
        manager_id: data.managerId,
      });
      readEmployees();
    });
};

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
