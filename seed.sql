CREATE DATABASE staffDB;

USE staffDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
    CONSTRAINT fk_category
    FOREIGN KEY (department_id)
    REFERENCE department(role)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),

    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCE employee(role),

    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
    REFERENCE employee(last_name)

);











department:

id - INT PRIMARY KEY
name - VARCHAR(30) to hold department name

role:

id - INT PRIMARY KEY
title - VARCHAR(30) to hold role title
salary - DECIMAL to hold role salary
department_id - INT to hold reference to department role belongs to

employee:

id - INT PRIMARY KEY
first_name - VARCHAR(30) to hold employee first name
last_name - VARCHAR(30) to hold employee last name
role_id - INT to hold reference to role employee has
manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager