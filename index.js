// Welcome
console.log(`\n\x1b[100m\x1b[34mWelcome to yet another README file generator.\x1b[0m\x1b[0m\nDon't forget that markdown files accept html languaging.\nAlso you may use markdown syntax on files and links.\nMay be useful to use with your input.\n`);

// Target utilities.
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Dry up validate function.  
// while no input given, question repeats, input 'must' be at least one character to return true.
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
    {
        name: 'Title',
        message: 'Enter a Title Name for your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Description',
        message: 'Enter a Welcoming Description about your project and why it was developed.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Contents',
        message: 'Would you like to use a table of contents?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'queryInstallations',
        message: 'Are there any Installations (dependancies) needed for your project?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Installations',
     // when: the above prompt is true, prompt this message next. If not true, skip to next prompt.
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Enter Installation/Dependancy name.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'addCode1',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Would you like to add fenced code blocks? They will appear under the installation description.\n',
        type: 'confirm'
    }
    ,
    {
        name: 'howToInstall',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Describe step-by-step how to install this dependancy.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'code1',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Enter code to install dependancy.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'addCode2',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Do you need an additional code block?\n',
        type: 'confirm',
    }
    ,
    {
        name: 'code2',
        when: previousPrompt => previousPrompt.addCode2 === true,
        message: 'Enter another code block.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Usage',
        message: 'Enter a thorough description on how to USE your project.\n',
        type: 'input',
        validate: requireInput, 
    }
    ,
    {
        name: 'queryAddFile',
        message: 'Would you like to add an image, gif, or video to your Usage section?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'whichSyntaxFile',
        message: 'Select Option for add file',
        type: 'list',
        choices: []
    }
    ,
    {
        name: 'userSyntaxFile',
        message: 'Example input: ![alt text=image description](file extension ./ or url.com)\nPlease enter file as example given above.\n',
        type: 'input',
    }

    // Select Option for add file: use personal syntax on file or use generator for syntax on file.
    // add a description of image
    // add location to image file
    // does file need a specified width?
    // example 300px: Enter desired width for file.
    ,
    {
        name: 'queryContributions',
        message: 'Will this project be open-source and allow contributions?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Contributions',
        when: previousPrompt => previousPrompt.queryContributions === true,
        message: 'Enter description on how others can contribute to your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryTests',
        message: 'Are there any tests that can be run on your project?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Tests',
        when: previousPrompt => previousPrompt.queryTests === true,
        message: 'What tests can be run?  Enter a brief description of each.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryQuestions',
        message: 'Would you like to provide an email to receive Questions about your project?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Questions',
        when: previousPrompt => previousPrompt.queryQuestions === true,
        message: 'Enter Email Address for questions about your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryCredits',
        message: 'Are there any other developers to credit for this project?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Credits',
        when: previousPrompt => previousPrompt.queryCredits === true,
        message: 'Enter each person who helped create your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'queryResources',
        message: 'Are there any resources you would like to add to your project?\n',
        type: 'confirm'
    }
    ,
    {
        name: 'Resources',
        when: previousPrompt => previousPrompt.queryResources === true,
        message: 'Please enter your resources.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {
        name: 'Location',
        message: 'Please provide a link to your project.\n',
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
        err ? console.error(err) : console.log('\n\x1b[32mSUCCESS!\x1b[0m\n    README document generated.\n    You may now view your new file.\n');
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
