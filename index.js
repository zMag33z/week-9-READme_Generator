// Included packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// Created an array of questions for user input
const questions = [
    {
        // object tree schem
        // message: 'What is your name?',
        // name: 'name',
        // type: 'input'
        //EXAMPLE I may use.
//         var company;

// while (true) {
//     company = prompt("What the name of the company that developed the javascript language?", "");
//     if (company === 'netscape') {
//         break;
//     }
//     alert("wrong answer");
// }
// alert("correct answer!");
    },
    {
        //choices example
        // message: 'What languages do you know?',
        // name: 'languages',
        // type: 'checkbox',
        // choices: ['Java', 'Javascript', 'Python', 'C++', 'C#', 'other']
    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
    {

    },
];

// Created function to write README file
function writeToFile(fileName, data) {

    //error example: err ? console.error(err) : console.log('Commit logged!')
}

// Created function to initialize app
function init() {
    //EXAMPLE
    // inquirer
    // .prompt(questions)
    // .then((answers) => { //create answers.json file and stringify answers to file and if error write to file also return the error in console otherwise it was successful
    //     fs.writeFile('answers.json', JSON.stringify(answers), (error) => {
    //         return error 
    //         ? console.error(error) 
    //         : console.log('File written successfully');  
    //     });
    // });
}

// Function called here to initialize app
init();





//invoke using node index.js

//# 09 Node.js Challenge: Professional README Generator

// ## Your Task
// When creating an open source project on GitHub, 
// it’s important to have a high-quality README for the app. 
// This should include what the app is for, how to use the app, 
// how to install it, how to report issues, and how to make contributions.

// You can quickly and easily create a README file by using a 
// command-line application to generate one. 
// This allows the project creator to devote more time to working on 
// the project.

// Your task is to create a command-line application that dynamically
// generates a professional README.md file from a user's input using the 
// [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4). 
// [Professional README Guide](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide) 



// ## User Story

// AS A developer
// I WANT a README generator
// SO THAT I can quickly create a professional README for a new project

// ## Acceptance Criteria

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with
// the title of my project 
// and sections entitled
// Description, 
// Table of Contents,
// Installation,
// Usage,
// License,
// Contributing,
// Tests,
// and Questions

// WHEN I enter my project title
// THEN this is displayed as the title of the README

// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests

// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile

// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions

// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

// Because this application won’t be deployed, you’ll also need to provide a link to a walkthrough video 
// that demonstrates its functionality. 
// Revisit the Screencastify Tutorial in the prework as a refresher on 
// how to record video from your computer. 
// You’ll need to submit a link to the video _and_ add it to the README of your project.
