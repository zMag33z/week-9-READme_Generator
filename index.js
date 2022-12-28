// Target utilities.
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Dry up validate function.  
// while no input given, question repeats, input 'must' be at least one character to return true value.
const requireInput = input => {
    while(input.length === 0){
        if (input.length >= 1){
            break;
        }
        console.log(`\n\x1b[41m Input Required \x1b[0m`);
        return false;
    }
    return true;
};  



// Questions Array for prompt to cycle through.
// Some messages will be skipped depending on confirm input values.
const questions = [
    // Provide input examples for best readme output.
    {
        name: 'Title',
        message: 'Enter a Title Name for your project.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Description',
        message: 'Enter a Welcoming Description about your project and why it was developed.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Contents',
        message: 'Would you like to use a table of contents?',
        type: 'confirm'
    }
    ,
    {
        name: 'queryInstallations',
        message: 'Are there any Installations (dependancies) needed for your project?',
        type: 'confirm'
    }
    ,
    {
        name: 'Installations',
     // when: the above prompt is true, prompt this message next. If not true, skip to next prompt.
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Enter Installation/Dependancy name.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'addCode1',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Would you like to add a code highlight?',
        type: 'confirm'
    }
    ,
    {
        name: 'howToInstall1',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'If highlight selected it will appear below your provided installation description.  Describe how to install.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'snippet1',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Enter code to install dependancy.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'additionalSnippet1',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Do you need an additional code highlight?',
        type: 'confirm',
    }
    ,
    {
        name: 'additionalSnippet1',
        when: previousPrompt => previousPrompt.additionalSnippet1 === true,
        message: 'Enter more code.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Usage',
        message: 'Enter a thorough description on how to USE your project.',
        type: 'input',
        validate: requireInput, 
    }
    // ADD SCREENSHOT -------------------------==================----------------------------------------
    // like to add a screenshot?
    // add a description of image
    // add location to image file
    // like to add style code to image?
    // enter style code.
    ,
    {
        name: 'queryContributions',
        message: 'Will this project be open-source and allow contributions?',
        type: 'confirm'
    }
    ,
    {
        name: 'Contributions',
        when: previousPrompt => previousPrompt.queryContributions === true,
        message: 'Enter description on how others can contribute to your project.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryTests',
        message: 'Are there any tests that can be run on your project?',
        type: 'confirm'
    }
    ,
    {
        name: 'Tests',
        when: previousPrompt => previousPrompt.queryTests === true,
        message: 'What tests can be run and enter a brief descript of each.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryQuestions',
        message: 'Would you like to provide an email to receive Questions about your project?',
        type: 'confirm'
    }
    ,
    {
        name: 'Questions',
        when: previousPrompt => previousPrompt.queryQuestions === true,
        message: 'Enter Email Address for questions about your project.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryCredits',
        message: 'Are there any other developers involved in your project?',
        type: 'confirm'
    }
    ,
    {
        name: 'Credits',
        when: previousPrompt => previousPrompt.queryCredits === true,
        message: 'Enter each person who helped create your project.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryResources',
        message: 'Are there any resources you would like to add to your project?',
        type: 'confirm'
    }
    ,
    {
        name: 'Resources',
        when: previousPrompt => previousPrompt.queryResources === true,
        message: 'Please enter your resources.',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Location',
        message: 'Please provide a link to your project.',
        type: 'input',
        validate: requireInput, 
    }
    ,
    {
        name: 'License',
        message: 'Choose a license or select NONE.',
        type: 'list',
        choices: ['NONE', 'MIT', 'Apache2.0', 'GPLv3', 'BSD', 'Boost'],
    }
];

// Created function to write README file
function writeToFile(README, data) {
    fs.writeFile(README, data, (err) =>{
        err ? console.error(err) : console.log('SUCCESS! README document generated.  You may now view your new file.')
    });

}

// Created function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {   //data = name: input value.
        writeToFile('newREADME.md', generateMarkdown(data));
    });
}

// Function call here to initialize app
init();


// User will need to install inquirer package.
// [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4). 

//npm init -y
//npm i inquirer@8.2.4
//invoke using node index.js

// Because this application won’t be deployed, you’ll also need to provide a link to a walkthrough video 
// that demonstrates its functionality. 
// Revisit the Screencastify Tutorial in the prework as a refresher on 
// how to record video from your computer. 
// You’ll need to submit a link to the video _and_ add it to the README of your project.
