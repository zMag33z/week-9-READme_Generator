// File required by index.js.
// Rendering license badge. Called from within generateMarkdown function. Returns value needed.
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

// Rendering license link. Called from within generateMarkdown function. Returns value needed.
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

// Generate Document with imported data.
// Depending on if user wanted section.
function generateMarkdown(data) {
  // variables: compiled is all sections without ifs, and if true, go inside the array. if false ignore
  let compiled =[];
  let contents = `## Table of contents:\n\n`;
   // no if: automatically add this section. 
  let titleNdescription = `# ${data.Title}\n\n## Description:\n${data.Description}\n\n`;
  compiled.push(titleNdescription);

  if(data.queryInstallations === true){
    let installations = `## Installations:\n${data.Installations}\n\n`; // work on installations snippet code and description
    let contentInstallations = `- [Installations](#installations)\n`;
    compiled.push(installations);
    contents += contentInstallations;
  }
 // no if: automatically add this section. 
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
 // no if: automatically add this section. 
  let location = `## Location:\n${data.Location}\n\n`;
  let contentLocation = `- [Location](#location)\n`;
  compiled.push(location);
  contents += contentLocation;

  if(data.License != 'NONE'){ // At this point.  Render License Section function pointless. Omitted above, added here.
    let license = `## License:\n![License: ${data.License}](${renderLicenseBadge(data)})\n\n[View License Here](${renderLicenseLink(data)})`
    let contentLicense = `- [License](#license)\n\n`;
    compiled.push(license);
    contents += contentLicense;
  }else{
    contents += '\n';  // Space needed under Table if license not added.
  }
  // Tables of Contents down here so 'contents' updates throughout ifs.  It is then spliced to contents array.
  if(data.Contents === true){
    compiled.splice(1, 0, contents);
  }

   return compiled.join('');
}
// End of generateMarkdown function.  Pushes to writeToFile.

module.exports = generateMarkdown;
