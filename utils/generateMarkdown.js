// File required by index.js.

// Rendering license badge.
function renderLicenseBadge(data) {
  let badge;
if(data.License === 'MIT'){
  badge = `https://img.shields.io/badge/license-MIT-brightgreen`;
}
if(data.License === 'Apache2.0'){
  badge = `https://img.shields.io/badge/license-Apache2.0-yellow`;
}
if(data.License === 'GPLv3'){
  badge = `https://img.shields.io/badge/license-GPLv3-blue`;
}
if(data.License === 'BSD'){
  badge = `https://img.shields.io/badge/license-BSD_3--Clause-orange`;
}
if(data.License === 'Boost'){
  badge = `https://img.shields.io/badge/license-Boost_1.0-lightblue`;
}
return badge;
}

// Rendering license link.
function renderLicenseLink(data) {
  let link;
if(data.License === 'MIT'){
  link = `https://opensource.org/licenses/MIT`;
}
if(data.License === 'Apache2.0'){
  link = `https://www.apache.org/licenses/LICENSE-2.0`;
}
if(data.License === 'GPLv3'){
  link = `https://www.gnu.org/licenses/gpl-3.0.en.html`;
}
if(data.License === 'BSD'){
  link = `https://opensource.org/licenses/BSD-3-Clause`;
}
if(data.License === 'Boost'){
  link = `https://www.boost.org/LICENSE_1_0.txt`;
}
return link;
}

// Render license section.  Badge and link render sent out to the above functions.  Then returned to generateMarkdown function.
function renderLicenseSection(data){
  let section = `## License:\n![License: ${data.License}](${renderLicenseBadge(data)})\n\n[View License Here](${renderLicenseLink(data)})`;
  return section;
  }


// Beginning generateMarkdown function.  Generate Document with imported data.
function generateMarkdown(data) {
  // compiled = only sections without ifs are mandatory, and if trues (user selected), go inside this array. if false ignore.
  let compiled =[];

  // Title and Description: mandatory
  let titleNdescription = `# ${data.Title}\n\n## Description:\n${data.Description}\n\n`;
  compiled.push(titleNdescription);

  // Tables of Contents.  As it cycles through, content sections are added if user selected yes for section.
  let contents = `## Table of contents:\n\n`;

  // Installation: mandatory
  if(data.queryInstallations === true){
    let installations = `## Installation:\n${data.Installations}\n\n`;
    let contentInstallations = `- [Installation](#installation)\n`;
    compiled.push(installations);
    contents += contentInstallations;
  }
  // Installation:
  // codeBlock: if user selected code block.
  if(data.addCode1 === true){
    let tripleTicks = '```';
    let code1 = tripleTicks + `shell\n${data.code1}\n` + tripleTicks + '\n\n';
    compiled.push(code1);
  }
  // Installation:
  // codeBlock: if user selected another code block.
  if(data.addCode2 === true){
    let tripleTicks = '```';
    let code2 = tripleTicks + `shell\n${data.code2}\n` + tripleTicks + '\n\n';
    compiled.push(code2);
  }

  // Usage: mandatory
  let usage = `## Usage:\n${data.Usage}\n\n`;
  let contentUsage = `- [Usage](#usage)\n`;
  compiled.push(usage);
  contents += contentUsage;

  // Add file to usage?---------------------------------------------------------------

  // Contributions: add?
  if(data.queryContributions === true){
    let contributions = `## Contributions:\n${data.Contributions}\n\n`;
    let contentContributions = `- [Contributions](#contributions)\n`;
    compiled.push(contributions);
    contents += contentContributions;
  }

  // Tests: add?
  if(data.queryTests === true){
    let tests = `## Tests:\n${data.Tests}\n\n`;
    let contentTests = `- [Tests](#tests)\n`;
    compiled.push(tests);
    contents += contentTests;
  }

  // Questions: add?
  if(data.queryQuestions === true){
    let inquiries = `## Questions:\n${data.Questions}\n\n`;
    let contentQuestions = `- [Questions](#questions)\n`;
    compiled.push(inquiries);
    contents += contentQuestions;
  }

  // Credits: add?
  if(data.queryCredits === true){
    let credits = `## Credits:\n${data.Credits}\n\n`;
    let contentCredits = `- [Credits](#credits)\n`;
    compiled.push(credits);
    contents += contentCredits;
  }

  // Resources: add?
  if (data.queryResources === true){
    let resources = `## Resources:\n${data.Resources}\n\n`;
    let contentResources = `- [Resources](#resources)\n`;
    compiled.push(resources);
    contents += contentResources;
  }

 // Location: mandatory 
  let location = `## Location:\n${data.Location}\n\n`;
  let contentLocation = `- [Location](#location)\n`;
  compiled.push(location);
  contents += contentLocation;

  // License: add?
  if(data.License != 'NONE'){
    let license = renderLicenseSection(data);
    let contentLicense = `- [License](#license)\n\n`;
    compiled.push(license);
    contents += contentLicense;
  }else{
    contents += '\n';  // Space needed under Table if license not added.
  }

  // Tables of Contents: add?
  // down here so 'contents' updates throughout ifs. 
  // It is then spliced to contents array to index 1.  Title and Description are in index 0.
  if(data.Contents === true){
    compiled.splice(1, 0, contents);
  }
  console.log(data);
   return compiled.join(''); // join lays everything inside compiled out as strings.
}
// End of generateMarkdown function.
// Return to writeToFile.
module.exports = generateMarkdown;