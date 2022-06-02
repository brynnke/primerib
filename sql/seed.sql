USE employeeDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, section_id)
VALUES ("Sales Lead", 10000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Belushi", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Louis", "Armstrong", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Tan", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Rowland", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Macy", "Gray", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Jackson", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "McGraw", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Slater", 1, 2);