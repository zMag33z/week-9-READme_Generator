// Require renderSections file.
const renderSection = require('./renderSections');

// Beginning generateMarkdown function.  Generate Document with imported data.
function generateMarkdown(data) {

console.log(data);

  // compiled = only sections that are mandatory or true.
  let compiled =[];
  data.Description += '<br><br>';

  // Title and Description: mandatory
  let titleNdescriptionSections = `# **${data.Title}**\n\n### ${data.Description}\n\n`;
  compiled.push(titleNdescriptionSections);

  // Tables of Contents.  Will cycle through collecting sections.
  let contents = `### **Table of contents:**\n\n`;

  // Getting Started: Add?
  if(data.queryGettingStarted === true){
    let startUpSection = `## Getting Started:\n\n${data.gettingStarted}\n`;
    let contentStartUpSection = `- [Getting Started](#getting)\n`;
    compiled.push(startUpSection);
    contents += contentStartUpSection;
  }

  // Installations: Add?
  if(data.queryInstallations === true){
    let installationsSection = renderSection.installations(data);
    let contentInstallations = `- [Installations](#installations)\n`;
    compiled.push(installationsSection);
    contents += contentInstallations;
  }

  // Usage:
  let usageSection = renderSection.usage(data);
  let contentUsage = `- [Usage](#usage)\n`;
  compiled.push(usageSection);
  contents += contentUsage;

  // Contributions: add?
  if(data.queryContributions === true){
    let contributionsSection = `## Contributions:\n\n${data.Contributions}\n\n`;
    let contentContributions = `- [Contributions](#contributions)\n`;
    compiled.push(contributionsSection);
    contents += contentContributions;
  }

  // Tests: add?
  if(data.queryTests === true){
    let testsSection = `## Tests:\n\n${data.Tests}\n\n`;
    let contentTests = `- [Tests](#tests)\n`;
    compiled.push(testsSection);
    contents += contentTests;
  }

  // Questions: add?
  if(data.queryQuestions === true){
    let questionsSection = renderSection.questions(data);
    let contentQuestions = `- [Questions](#questions)\n`;
    compiled.push(questionsSection);
    contents += contentQuestions;
  }

  // Credits: add?
  if(data.queryCredits === true){
    let creditsSection = renderSection.acknowledgements(data);
    let contentCredits = `- [Acknowledgements:](#acknowledgements)\n`;
    compiled.push(creditsSection);
    contents += contentCredits;
  }

  // Resources: add?
  if (data.queryResources === true){
    let resourcesSection = `## Resources:\n\n${data.Resources}\n\n`;
    let contentResources = `- [Resources](#resources)\n`;
    compiled.push(resourcesSection);
    contents += contentResources;
  }

  // Location:
  let locationSection = `## Location:\n\n[${data.Title}](${data.Location})\n`;
  let contentLocation = `- [Location](#location)\n`;
  compiled.push(locationSection);
  contents += contentLocation;

  // License:
  let licenseSection = renderSection.license(data);
  let contentLicense = `- [License](#license)\n\n`;
  compiled.push(licenseSection);
  contents += contentLicense;

  // Tables of Contents: add?
  if(data.Contents === true){ //contents now cycled. Push button, splice contents.
    let backToTop = `\n#### [**Back to top**](#)`;
    compiled.push(backToTop);
    compiled.splice(1, 0, contents);
  }

   return compiled.join(''); // join('')turns compiled into a string of strings.
}
// End of generateMarkdown function.

module.exports = generateMarkdown;

/*  zMaG33  */