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

