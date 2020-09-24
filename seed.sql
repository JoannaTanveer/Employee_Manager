DROP DATABASE IF EXISTS staffDB;
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
    PRIMARY KEY (id),
	INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
 
);
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),

    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
INSERT INTO department (name) values ("Administration");
INSERT INTO department (name) values ("Production");
INSERT INTO department (name) values ("Sales");

INSERT INTO employee (first_name, last_name) values ("Joanna", "Tanveer");
INSERT INTO employee (first_name, last_name) values ("Asha", "Tanveer");
INSERT INTO employee (first_name, last_name) values ("Bobby", "Tanveer");
INSERT INTO employee (first_name, last_name) values ("Erin", "Frasier");
INSERT INTO employee (first_name, last_name) values ("Cindy", "Oehler");
INSERT INTO employee (first_name, last_name) values ("Benny", "Boi");
INSERT INTO employee (first_name, last_name) values ("Johnny", "Bananas");
INSERT INTO employee (first_name, last_name) values ("Chubby", "Butter");


INSERT INTO role (title, salary, department_id) values ("CEO", "100000", 1);
Insert into role (title, salary, department_id) values ("Manager", "80000", 1);
Insert into role (title, salary, department_id) values ("Sales", "40000", 3);
Insert into role (title, salary, department_id ) values ("Designer", "75000", 2);
Insert into role (title, salary, department_id) values ("seamstress", "70000", 2);
Insert into role (title, salary, department_id) values ("Cat/model", "1000", 2);
Insert into role (title, salary, department_id) values ("Cat/model", "1000", 2);
Insert into role (title, salary, department_id) values ("Cat/model", "1000", 2);


SELECT * FROM role




