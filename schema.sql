DROP DATABASE IF EXISTS Employee_DB;
CREATE DATABASE Employee_DB;

USE Employee_DB;

CREATE TABLE department{
    id INT
    name VARCHAR(30)
    PRIMARY KEY (id)
};

CREATE TABLE role{
    id INT
    tite VARCHAR(30)
    salary DECIMAL
    department_id INT
    PRIMARY KEY (id)
};

CREATE TABLE employee{
    id INT
    first_name VARCHAR(30)
    last_name  VARCHAR(30)
    role_id INT
    manager_id INT
};