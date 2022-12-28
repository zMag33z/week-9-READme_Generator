// Create a function that returns a license badge based on which license is passed in

// If there is no license, return an empty string
function renderLicenseBadge(license) {
  // badge example
  // [![npm version](https://img.shields.io/npm/v/inquirer-press-to-continue)](https://npmjs.com/package/inquirer-press-to-continue)
}

// If there is no license, return an empty string
function renderLicenseLink(license) {

}

// If there is no license, return an empty string
function renderLicenseSection(license) {

}

// Generate Document with imported data.
function generateMarkdown(data, ) {
  let compiled =[];
  let contents = `## Table of contents:\n\n`;
  let titleNdescription = `# ${data.Title}\n\n## Description:\n${data.Description}\n\n`;
  compiled.push(titleNdescription);

  if(data.queryInstallations === true){
    let installations = `## Installations:\n${data.Installations}\n\n`; // work on installations snippet code and description
    let contentInstallations = `- [Installations](#installations)\n`;
    compiled.push(installations);
    contents += contentInstallations;
  }

  let usage = `## Usage:\n${data.Usage}\n\n`;
  let contentUsage = `- [Usage](#usage)\n`;
  compiled.push(usage);
  contents += contentUsage;

  if(data.queryContributions === true){
    let contributions = `## Contributions:\n${data.Contributions}\n\n`;
    let contentContributions = `- [Contributions](#contributions)\n`;
    compiled.push(contributions);
    contents += contentContributions;
  }

  if(data.queryTests === true){
    let tests = `## Tests:\n${data.Tests}\n\n`;
    let contentTests = `- [Tests](#tests)\n`;
    compiled.push(tests);
    contents += contentTests;
  }

  if(data.queryQuestions === true){
    let inquiries = `## Questions:\n${data.Questions}\n\n`;
    let contentQuestions = `- [Questions](#questions)\n`;
    compiled.push(inquiries);
    contents += contentQuestions;
  }

  if(data.queryCredits === true){
    let credits = `## Credits:\n${data.Credits}\n\n`;
    let contentCredits = `- [Credits](#credits)\n`;
    compiled.push(credits);
    contents += contentCredits;
  }

  if (data.queryResources === true){
    let resources = `## Resources:\n${data.Resources}\n\n`;
    let contentResources = `- [Resources](#resources)\n`;
    compiled.push(resources);
    contents += contentResources;
  }
  
  let location = `## Project:\n${data.Location}\n\n`;
  let contentLocation = `- [Project](#project)\n`;
  compiled.push(location);
  contents += contentLocation;

  if(data.Contents === true){
    compiled.splice(1, 0, contents);
  }


console.log(data);
console.log(contents);


   return compiled.join('');
}
// End of generateMarkdown function

module.exports = generateMarkdown;
