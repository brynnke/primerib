// deprendcies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const { type } = require("express/lib/response");
require("console.table");

// mysql connect
const connection = mysql.createConnection({
    host: 'localhost',

    // port
    port: 3001,

    // useranme
    user: 'root',

    //password
    password: 'placeholder',
    database: 'employeeDB'
});

// mysql server connected and sql database connected
connection.connect(function (err) {
    if (err) throw err;
    // run start function after connect made
    firstPrompt();
});

// function which prompts for action user should take
function firstPrompt() {
    inquirer
        .prompt({
            type: "list",
            name: "task",
            message: "What would you like?",
            choices: [
                "view employees by section",
                "view employees by ",
                "add employees",
                "remove employees",
                "update employees positions",
                "add new role",
                "END"]
        })
        .then(function ({ task }) {
            switch (task) {
                case "view employee":
                    viewEmployee();
                    break;
                case "view employee by section":
                    viewEmployeeBySection();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Remove employee":
                    removeEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Add roles":
                    addRole();
                    break;
            }
        });
}

// emmployee view fucion

function viewEmployee() {
    console.log("Viewing employee\n");

    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("employees viewed \n");

        firstPrompt();
    });

}

// section array

function viewEmployeeBySection() {
    console.log("Viewing employees by department\n");

    var query =
        `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const sectionChoices = res.map(data => ({
            value: data.id, name: data.name
        }));

        console.table(res);
        console.log("Section view success\n");

        promptSection(sectionChoices);
    });

}

// chose section list, the pop up menu

function promptSection(sectionChoices) {

    inquirer
        .prompt([
            {
                type: "list",
                name: "sectionId",
                message: "Which section would you choose?",
                choices: sectionChoices
            }
        ])
        .then(function (answer) {
            console.log("answer", answer.sectionId):

            var query =
                `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
        FROM employee e
        JOIN role r
          ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        WHERE d.id = ?`

            connection.query(query, answer.sectionId, function (err, res) {
                if (err) throw err;

                console.table("response", res);
                console.log(res.affectedRows + "Employes have been view \n");

                firstPrompt();
            });
        });

    // employee array created

    function addEmployee() {
        console.log("inserting an employee")

        var query =
            `SELECT r.id, r.title, r.salary 
      FROM role r`

        connection.query(query, function (err, res) {
            if (err) throw err;

            const roleChoice = res.map(({ id, title, salary }) => ({
                value: id, title: `$(title)`, salary: `{salary}`
            }));

            console.table(res);
            console.log("RoleToinstert");

            promptInsert(roleChoice);
        });
    }

    function promptInsert(roleChoice) {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "first",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "last",
                    message: "What is the employee last name?"
                },

            ])
            .then(function (answer) {
                console.log(answer);

                var query = `INSERT INTO employee SET?`

                connection.query(query,
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.roleId,
                        manager_id: answer.managerId,
                    },
                    function (err, res) {
                        if (err) throw err;

                        console.table(res);
                        console.log(res.insertedRows + "Inserted successfully!\n");

                        firstPrompt();
                    });
            });
    }

    // make array to delete employees

    function removeEmployees() {
        console.log("Deleting an employee");

        var query =
            `SELECT e.id, e.first_name, e.last_name
        FROM employee e`

        connection.query(query, function (err, res) {
            if (err) throw err;

            const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
                value: id, name: `${id} ${first_name} ${last_name}`
            }));

            console.table(res);
            console.log("ArrayToDelete\n");

            promptDelete(deleteEmployeeChoices);
        });
    }

    // user choose employee list, then can delete employee

    function promptDelete(deleteEmployeeChoices) {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee would you like to remove?",
                    choices: deleteEmployeeChoices
                }
            ])
            .then(function (answer) {
                var query = `DELEtE FROM employee WHERE?`;

                connection.query(query, { id: answer.employeeId }, function (err, res) {
                    if (err) throw err;

                    console.table(res);
                    console.log(res.affectedRows + "DELETED!!\n");

                    firstPrompt();
                });

            });
    }
    // update employee role 

    function updateEmployeeRole() {
        employeeArray();

    }

    function employeeArray() {
        console.log("updating employee");

        var query =
            `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role r
          ON e.role_id = r.id
        JOIN department d
        ON d.id = r.department_id
        JOIN employee m
          ON m.id = e.manager_id`

        connection.query(query, function (err, res) {
            if (err) throw err;

            const deleteChoices = res.map(({ id, first_name, last_name }) => ({
                value: id, name: `${first_name} ${last_name}`
            }));

            console.table(res);
            console.log("employeeArray update\n")

            roleAray(employeeChoices);
        });
    }

    function roleAray(employeeChoices) {
        console.log("Updating the role");

        var query =
            `SELECT r.id, r.title, r.salary 
            FROM role r`
        let roleChoices;

        connection.query(query, function (err, res) {
            if (err) throw err;

            roleChoices = res.map(({ id, title, salary }) => ({
                value: id, title: `${title}`, salary: `${salary}`
            }));

            console.table(res);
            console.log("roleArray to update.\n")

            promptEmployeeRole(employeeChoices, roleChoice);
        });
    }

    function promptEmployeeRole(employeeChoices, roleChoice) {

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee do you want to set with this role?",
                    choices: employeeChoices
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "Which role do you want to update?",
                    choices: roleChoices
                },
            ])
            .then(function (answer) {
                var query = `UPDATE employee SET role_id = ? WHERE id = ?`

                connection.query(query,
                    [answer.roleId,
                    answer.employeeId
                    ],
                    function (err, res) {
                        if (err) throw err;

                        console.table(res);
                        console.log(res.affectedRows + "updated successfully");

                        firstPrompt();
                    });
            });
    }

    // add role

    function addRole() {

        var query =
            `SELECT d.id, d.name, r.salary AS budget
            FROM employee e
            JOIN role r
            ON e.role_id = r.id
            JOIN department d
            ON d.id = r.department_id
            GROUP BY d.id, d.name`

        connection.query(query, function (err, res) {
            if (err) throw err;

            const sectionChoices = res.map(({ id, name }) => ({
                value: id, name: `${id} ${name}`
            }));

            console.table(res);
            console.log("Section array");

            promptAddRole(sectionChoices) {

                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "roleTitle",
                            message: "Role title"
                        },
                        {
                            type: "input",
                            name: "roleSalary",
                            message: "Role salary"
                        },
                        {
                            type: "list",
                            name: "sectionId",
                            message: "Section",
                            choices: sectionChoices
                        },
                    ])
                    .then(function (answer) {

                        var query = `INSERT INTO role SET`

                        connection.query(query, {
                            title: answer.title,
                            salary: answer.salary,
                            section_id: answer.sectionId
                        },
                            function (err, res) {
                                if (err) throw err;

                                console.table(res);
                                console.log("role inserted");

                                firstPrompt();
                            });
                    });
            }
        })
    }
}


