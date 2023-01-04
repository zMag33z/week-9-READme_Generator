// Sorry for the mess.  But I had fun!                          Future note: Look into separating questions array with reactive interface.

// Welcome
console.log(`\n\x1b[100m\x1b[34mWelcome to yet another README file generator.\x1b[0m\x1b[0m
    Markdown files use lightweight markup language(LML).
    In some instances it will recognize HTML.
    This may be useful to use with your input.
    Especially with double spaces (&nbsp;&nbsp;) and line breaks<br><br>.\n`);

// Target utilities.
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// while no input given, personal alert then question repeats, input 'must' be at least one character to return true.
const requireInput = (input) => {
    while(input.length === 0){
        console.log(`\n\x1b[41m\x1b[30m Input Required \x1b[0m\x1b[0m\n`);
        return false;
    }
    return true;
};  


// Questions Array for prompt to cycle through.
// Some messages will be skipped depending upon previous prompt values.
const questions = [
    {
        name: 'Title',
        message: 'Enter a Title Name for your project.\n',
        type: 'input',
        validate: requireInput,
        filter: input => input.trim(),  //trimming to bold text.
    }
    ,
    {
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
    {   //Getting Started.
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
    {   //Installations.  Dependancy name.
        name: 'Installations',
     // when: the above prompt is value, prompt this message. If no true value, skip to next prompt.
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Enter Installation/Dependancy name.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Installations.  Fenced code block.  Yes or No                         Add more languages to snippets and find a way to add more snippets without adding more messages to questions.
        name: 'addCode1',
        when: previousPrompt => previousPrompt.queryInstallations === true,
        message: 'Two fenced code blocks available.  They will appear as *examples under the installation description.\n',
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
        message: 'Enter block of code.  Example 1.\n',
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
        message: 'Enter block of code.  Example 2.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Usage. Code block Yes or No
        name: 'queryUsageCode',
        message: 'Next is the Usage Section. Will you be needing a code block for your description?\n',
        type: 'confirm',
    }
    ,
    {   //Usage.
        name: 'Usage',
        message: 'Enter a thorough description on how to USE your project.\n',
        type: 'input',
        validate: requireInput, 
    }
    ,
    {
        name: 'UsageCodeBlock',
        when: previousPrompt => previousPrompt.queryUsageCode === true,
        message: 'Enter block of code.\n',
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
    {   //Usage. Add file. Personal or Auto.                       Implement a way to add more than one file.       Also create an object to create links and images with input data.
        name: 'whichSyntaxFile',
        when: previousPrompt => previousPrompt.queryAddFile === true,
        message: 'Select Option for add an image file:',
        type: 'list',
        choices: ['Apply personal syntax to file.','Use generator for auto syntax.'],
    }
    ,
    {   //Usage. Add file. Personal.
        name: 'userSyntaxFile',
        when: previousPrompt => previousPrompt.whichSyntaxFile === 'Apply personal syntax to file.',
        message: 'Enter personal syntax for file.  Syntax line breaks and spaces where needed.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Usage. Add file. Auto.  Description                        Find a way to repeat these two next questions consecutively. example: Enter file location 1. Enter description 1 ; Enter file location 2. Enter description 2.  ETC.
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
    {   //Usage. Add file. Auto. Label bottom Yes or No
        name: 'queryAddLabel',
        when: previousPrompt => previousPrompt.whichSyntaxFile === 'Use generator for auto syntax.', 
        message: 'Would you like to the label the bottom of the file?\n',
        type: 'confirm'
    }
    ,
    {   //Usage. Add file. Auto. Label bottom
        name: 'AddLabel',
        when: previousPrompt => previousPrompt.queryAddLabel === true,
        message: 'Enter label now.\n',
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
    {   //Tests.  Yes                       Separate input if using numbers beginning 1. 2. 3. into an array.  Add . and line break to end of each. If beginning not number dot notation ignore.
        name: 'Tests',
        when: previousPrompt => previousPrompt.queryTests === true,
        message: 'What tests can be run?  Enter a brief description of each.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Questions.  Yes or No                     Add more contact methods.
        name: 'queryQuestions',
        message: 'Would you like to provide an email to receive Questions about your project?\n',
        type: 'confirm'
    }
    ,
    {   //Questions.  Yes
        name: 'UserName',
        when: previousPrompt => previousPrompt.queryQuestions === true,
        message: 'Enter your name/nickname.\n',
        type: 'input',
        validate: requireInput,
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
    {   //Credits.  Yes or No                                       Find a way to separate name from social link to create a clickable link of name.
        name: 'queryCredits',
        message: 'Are there any other persons to acknowledge for this project?\n',
        type: 'confirm'
    }
    ,
    {   //Credits.  Asks which or BOTH
        name: 'CreditsANDORContributors',
        when: previousPrompt => previousPrompt.queryCredits === true,
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
    {   //Credits.  Contributors.  Add File or Input Each.
        name: 'contributorAddFile',
        when: previousPrompt => previousPrompt.CreditsANDORContributors === 'Contributors' || previousPrompt.CreditsANDORContributors === 'BOTH',
        message: 'Add Contributor file or input each individually?',
        type: 'list',
        choices: ['Add File', 'Input Each'],
    }
    ,
    {   //Credits. Contributors. Add File
        name: 'addContributorsFile',
        when: previousPrompt => previousPrompt.contributorAddFile === 'Add File',
        message: 'Enter file location.\n',
        validate: requireInput,
    }
    ,
    {   //Credits.  Contributors.  Input Each.
        name: 'Contributors',
        when: previousPrompt => previousPrompt.contributorAddFile === 'Input Each',
        message: 'Enter the names of those who supported this project in any way.\n',
        type: 'input',
        validate: requireInput,
    }
    ,
    {   //Resources.  Yes or No                          Find a way to separate resources like credits.
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
    {   //License.              If you don't want a license you may as well choose unlicensed.      Future note: Add more licenses.
        name: 'License',
        message: 'Choose a license.',
        type: 'list',
        choices: ['Unlicensed', 'MIT', 'Apache2.0', 'GPLv3', 'BSD', 'Boost'],
    }
    ,
    { //License. Personal link or Auto link.
        name: 'LinkLicense',
        message: 'Add personal link to license or auto link to general info license site',
        type: 'list',
        choices: ['Personal link', 'Auto link'],
    }
    ,
    { //License. Add personal link.
        name: 'personalLicense',
        when: previousPrompt => previousPrompt.LinkLicense === 'Personal link',
        message: 'Enter personal license url.\n',
        type: 'input',
        validate: requireInput,
    }
];

// Function to write README file.                    Future possibly implement generate License markdown file through generator.
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
        writeToFile('susan.md', generateMarkdown(data));
    });
}

// Node.js intialize function call here.
init();


/*  zMag33z  */