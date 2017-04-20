var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//connects to bamazon database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazon',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connection established');
});

//diplay contents of bamazon database as a table with ID 
connection.query('SELECT * FROM products', function (err, results, fields) {
  if (err) throw error;
  var table = new Table({
    head: ['ID', 'Product Name', 'Price'],
    colWidths: [10, 45, 10]
  });
  console.log('Welcome to Bamazon');
  for (var i = 0; i < results.length; i++) {
    table.push([results[i].id, results[i].product_name, results[i].price]);
  };
  console.log(table.toString());

  purchaseProduct();
});

//prompt the user asking them for the ID of the product they would like to buy
var purchaseProduct = function () {
  inquirer.prompt([{
      name: 'product',
      type: 'input',
      message: 'Please select the item you would like to purchase',
      filter: Number,
      validate:
    },
//prompt the user asking them how many units of the product they would like to buy
    {
      name: 'quantity',
      type: 'input',
      message: 'How many do you require?',
      filter: Number,
      default: 1,
      validate:
    }
  ]).then(function (answer) {
    console.log(answer);
  });
};

//once the order is placed, check database to see if there is enough stock to fill the order

//if there is not enough stock to fill the order, log "Insufficient quantity!" and then prevent the order from going through

//if there is enough stock to fill the order, fulfill the order

//update the SQL database to reflect the remaining quantity

//upon updating the database, show the customer the total cost of their purchase

connection.end();