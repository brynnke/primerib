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
                case 
            }
        })
}