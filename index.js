// Sorry for the mess.  But I had fun!

// Welcome
console.log(`\n\x1b[100m\x1b[34mWelcome to yet another README file generator.\x1b[0m\x1b[0m
    Application output is given in literal form. ie: back ticks
    Don't forget this is a markdown file.
    Meaning it'll recognize input using markup(html) language.
    May be useful to use with your input.\n`);

// Target utilities.
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Dry up validate function.  
// while no input given, personal alert then question repeats, input 'must' be at least one character to return true.
const requireInput = input => {
    while(input.length === 0){
        console.log(`\n\x1b[41m\x1b[30m Input Required \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};  

// Questions Array for prompt to cycle through.
// Some messages will be skipped depending on confirm input values.
const questions = [
    {
        //Title Heading.
        name: 'Title',
        message: 'Enter a Title Name for your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Title Description
        name: 'Description',
        message: 'Enter a Welcoming Description about your project and why it was developed.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Table of Contents. Yes or No
        name: 'Contents',
        message: 'Would you like to use a table of contents?\n',
        type: 'confirm'
    }
    ,
    {   //Getting Started. Yes or No
        name: 'queryGettingStarted',
        message: 'Will you be needing a Getting Started Section?\n',
        type: 'confirm'
    }
    ,
    {   //Getting Started. Yes.
        name: 'gettingStarted',
        message: 'Enter a getting started description about pre-requisites to this installation.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Installations.  Yes or No
        name: 'queryInstallations',
        message: 'Are there any Installations (dependancies) needed for your project?\n',
        type: 'confirm'
    }
    ,
    {   //Installations.  Dependancy name.             This section bothers me but I'm leaving it as it for the moment.
        name: 'Installations',
     // when: the above prompt is true, prompt this message next. If not true, skip to next prompt.
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Enter Installation/Dependancy name.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Installations.  Fenced code block.  Yes or No
        name: 'addCode1',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Two fenced code blocks available, lng=shell? They will appear under the installation description.\n',
        type: 'confirm'
    }
    ,
    {   //Installations. How To.
        name: 'howToInstall',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Describe step-by-step how to install this dependancy.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Installations. Fenced code block 1.  Yes
        name: 'code1',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Enter code to install dependancy.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Installations.  Fenced code block 2. Yes or No
        name: 'addCode2',
        when: previousPrompt => previousPrompt.addCode1 === true,
        message: 'Do you need an additional code block?\n',
        type: 'confirm',
    }
    ,
    {   //Installations.  Fenced code block 2.  Yes
        name: 'code2',
        when: previousPrompt => previousPrompt.addCode2 === true,
        message: 'Enter another code block.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Usage.
        name: 'Usage',
        message: 'Enter a thorough description on how to USE your project.\n',
        type: 'input',
        validate: requireInput, 
    }
    ,
    {   //Usage.  Add file.  Yes or No
        name: 'queryAddFile',
        message: 'Would you like to add an image or gif to your Usage section?\n',
        type: 'confirm'
    }
    ,
    {   //Usage. Add file. Personal or Auto.
        name: 'whichSyntaxFile',
        message: 'Select Option for add file:',
        type: 'list',
        choices: ['Apply personal syntax to file.','Use generator for auto syntax.'],
    }
    ,
    {   //Usage. Add file. Personal.
        name: 'userSyntaxFile',
        when: previousPrompt => previousPrompt.whichSyntaxFile === 'Apply personal syntax to file.',
        message: 'Enter personal syntax for file.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Usage. Add file. Auto.  Description
        name: 'descriptionOfFile',
        when: previousPrompt => previousPrompt.whichSyntaxFile === 'Use generator for auto syntax.',
        message: 'Enter a short description of the file.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Usage. Add file. Auto. Location.
        name:'locationOfFile',
        when: previousPrompt => previousPrompt.whichSyntaxFile === 'Use generator for auto syntax.',
        message: 'Enter the link to the file.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Contributions.  Yes or No
        name: 'queryContributions',
        message: 'Will this project be open-source and allow contributions?\n',
        type: 'confirm'
    }
    ,
    {   //Contributions.  Yes
        name: 'Contributions',
        when: previousPrompt => previousPrompt.queryContributions === true,
        message: 'Enter description on how others can contribute to your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Tests.  Yes or No
        name: 'queryTests',
        message: 'Are there any tests that can be run on your project?\n',
        type: 'confirm'
    }
    ,
    {   //Tests.  Yes
        name: 'Tests',
        when: previousPrompt => previousPrompt.queryTests === true,
        message: 'What tests can be run?  Enter a brief description of each.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Questions.  Yes or No
        name: 'queryQuestions',
        message: 'Would you like to provide an email to receive Questions about your project?\n',
        type: 'confirm'
    }
    ,
    {   //Questions.  Yes
        name: 'questionsEmail',
        when: previousPrompt => previousPrompt.queryQuestions === true,
        message: 'Enter Email Address for questions about your project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Credits.  Yes or No
        name: 'queryCredits',
        message: 'Are there any other persons to acknowledge for this project?\n',
        type: 'confirm'
    }
    ,
    {   //Credits.  Asks which or BOTH
        name: 'CreditsANDORContributors',
        message: 'Choose acknowledgment type below.',
        type: 'list',
        choices: ['Team Members', 'Contributors', 'BOTH'],
    }
    ,
    {   //Credits.  Team Members
        name: 'Credits',
        when: previousPrompt => previousPrompt.CreditsANDORContributors === 'Team Members' || previousPrompt.CreditsANDORContributors === 'BOTH',
        message: 'Enter each team members name who worked on the project.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Credits.  Contributors
        name: 'Contributors',
        when: previousPrompt => previousPrompt.CreditsANDORContributors === 'Contributors' || previousPrompt.CreditsANDORContributors === 'BOTH',
        message: 'Enter the names of those who supported this project in any way.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Resources.  Yes or No
        name: 'queryResources',
        message: 'Are there any resources you would like to add to your project?\n',
        type: 'confirm'
    }
    ,
    {   //Resources.  Yes
        name: 'Resources',
        when: previousPrompt => previousPrompt.queryResources === true,
        message: 'Please enter your resources.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Location.
        name: 'Location',
        message: 'Please provide a link to your project.\n',
        type: 'input',
        validate: requireInput, 
    }
    ,
    {   //License.  When 'none' selected. it does go into the questions array but... it's ignored.
        name: 'License',
        message: 'Choose a license or select "NONE".',
        type: 'list',
        choices: ['Unlicensed', 'MIT', 'Apache2.0', 'GPLv3', 'BSD', 'Boost'],
    }
];




// Function to write README file.  Future possibly implement generate License markdown file through generator.
function writeToFile(README, data) {
    fs.writeFile(README, data, (err) =>{
        err ? console.error(err) : console.log('\n\x1b[32mSUCCESS!\x1b[0m\n    README document generated.\n    You may now view your new file.\n');
    });

}

// Initialize inquirer prompt. Then writetofile once data is sorted through generateMarkdown function.
function init() {
    inquirer
    .prompt(questions)
    .then((data) => {   //data = name: input value.
        writeToFile('README.md', generateMarkdown(data));   //Change name after video.
    });
}

// Node.js intialize function call here.
init();


// User will need to install inquirer package.
// [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4). 
// Node,js pre-requisite
//npm init -y
//npm i inquirer@8.2.4
//invoke using node index.js

// Because this application won’t be deployed, you’ll also need to provide a link to a walkthrough video 
// that demonstrates its functionality. 
// Revisit the Screencastify Tutorial in the prework as a refresher on 
// how to record video from your computer. 
// You’ll need to submit a link to the video _and_ add it to the README of your project.
