#!/usr/bin/env node

var fs = require('fs');
var chalk = require('chalk');
var emoji = require('node-emoji');

//Path to quotes json file
var QUOTES_JSON_PATH = "./quoteswritten.json";

console.log('')

//Creates a file for storing your quotes
function init() {
	//create file if it's present.
	if (!fs.existsSync(QUOTES_JSON_PATH)) {
		console.log("Initialising storage.\n Creating `quoteswritten.json` file");
		console.log('');
		setData({
			quoteswritten: []
		});
	}

}

//Used to read some data from the JSON file
function getData() {
	//read file contents
	var contents = fs.readFileSync(QUOTES_JSON_PATH, 'utf8');

	//parse contents
	var data = JSON.parse(contents);

	return data;
}

//Used to write data to the JSON file
function setData(data) {
	// makes the object a JSON string
	var dataString = JSON.stringify(data, null, 2);

	//write to  file
	fs.writeFileSync(QUOTES_JSON_PATH, dataString, 'utf8');
}

//Displays usage
function usage() {
	console.log(chalk.yellowBright('Usage:\n \nquoteswritten [command]\n \nExamples:\n \nquoteswritten add "My First Quotes" \nquoteswritten list --List all Quotes from the Database \nquoteswritten clear --Clear all quotes from the database \nquoteswritten delete 1 --DELETE a quotes with given id \nquoteswritten random --Display Random Quotes \nquoteswritten help'));
}

//Adds a Quotes
function add(quotes) {
	//get data
	var data = getData();

	//add item to quoteswritten
	data.quoteswritten.push({
		quotes: quotes
	});

	//set data
	setData(data);

	//list
	list();
}

//Lists all quotes
function list(){
	var data = getData();

if (data.quoteswritten.length) {
	printCompleted(data);	
} else {
	displayError("No Quotes Found on the database");
 }
}

// Display Random Quotes on Terminal
function random(){
var quotesContent = require(QUOTES_JSON_PATH);
var random = quotesContent.quoteswritten[Math.floor(Math.random() * quotesContent.quoteswritten.length)];
console.log(emoji.get('nerd_face'), chalk.bgYellowBright.bold.black(random.quotes));
}

//Remove quotes from the list.
function del(quotes) {
	//get data
	var data = getData();

	if(data.quoteswritten[quotes]){
		//delete item
		//https://stackoverflow.com/a/21660092
		data.quoteswritten.splice(quotes, 1);

		//set data
		setData(data);
		displayError("Deleted");
	}else{
		displayError("Quotes Not Found OR Add the Quotes List ID to delete");
	}
	
	console.log('')

	//list
	list();
}

//Clear all quotes from the Database
function clear() {
	var data = getData();
	if(data.quoteswritten.length){
		data.quoteswritten = [];
		setData(data);
		displayError("Quotes Database cleared");
	}else{
		displayError("No Quotes in the Database");
	}
}

//Formating for errors
function displayError(string){
	console.log(emoji.get('pushpin'), chalk.bgGreenBright(chalk.bold.black(string)), emoji.get('file_cabinet'));
}

// Print Stored Quotes
function printCompleted(data){
	if (data.quoteswritten.length) {
				//print the Quotes list. using ANSI colors and formating
				console.log(emoji.get('nerd_face'), chalk.underline.bold.bgMagenta("Quotes Written"), emoji.get('wink'));
				console.log('')
				data.quoteswritten.forEach(function (quotes, index) {
					console.log(chalk.yellowBright(index + 1 + ". ["), emoji.get('point_right'), chalk.yellowBright("] "), quotes.quotes);
				});
			}
}

//Entry point
var command = process.argv[2];
var argument = process.argv[3];

init();

switch (command) {
	case "add":
		add(argument);
		break;
	case "delete":
		del(argument - 1);
		break;
	case "clear":
		clear();
		break;
	case "help":
		usage();
		break;
	case "list":
		list();
		break;
	case "random":
		random();
	    break;
	case undefined:
		list();
		break;
	default:
		displayError("Command not found!!");
		console.log('')
		usage();
		break;
}

console.log('')
