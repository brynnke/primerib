// deprendcies 
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// mysql connect
const connection = mysql.createConnection({
    host: 'localhost',

    // port
    port:3001,

    // useranme
    user: 'root',

    //password
    password: 'placeholder',
    database: 'employeeDB'
});

// mysql server connected and sql database connected
connection.connect(function (err){
    if (err) throw err;
    // run start function after connect made
    firstPrompt();
});

// function which prompts for action user should take
function firstPrompt() {
    inquirer
        .prompt({
            type: "list",
            name:"task",
            message:"What would you like?",
            choices: [
                "view employees by section",
                "view employees by ",
                "add employees",
                "remove employees",
                "update employees positions",
                "add new role",
                "END"]
        })
        .then(function ({task}){
            switch (task){
                case "view employee":
                    viewEmployee();
                    break;
                case "view employee by section":
                    viewEmployeeBySection();
                    break;
                case "Add employee":
                    addEmployee ();
                    break;
                case "Remove employee":
                    removeEmployees ();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole ();
                    break; 
                case "Add roles":
                    addRole ();
                    break;
            }
        });
}

// emmployee view fucion

function viewEmployee () {
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

    connection.query(query, function (err, res){
        if (err) throw err;

        console.table(res);
        console.log("employees viewed \n");

        firstPrompt ();
    });

}

// section array

function viewEmployeeBySection () {
    console.log("Viewing employees by department\n");

    var query =
    `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`

    connection.query(query, function (err, res){
        
    })
  
}