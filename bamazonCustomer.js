var mysql = require('mysql');
var inquirer = require('inquirer');

//connects to bamazon database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon',
});

connection.connect();
