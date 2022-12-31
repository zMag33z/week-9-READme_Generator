// File required by index.js.

// Rendering Credits section.
function renderCredits(data){
  let trythis = data.Credits.split(';');

  console.log(trythis);

  let togetherOrNo;
// lol Couldn't think what to call it. Must be some debt to collect out there.
  let creditors = `
  ## Credits:
  
  _Project Creators:_

  A quick shout out to those who helped bring this project together.

  ${data.Credits}
  \n`;

  let addContributesFile = `
  _Contributors:_

  [View Contributors Here](${data.addContributorsFile})
  \n`;

  let contributors = `
_Contributors:_

Would also like to thank all contributors at this time.&nbsp;&nbsp;All of the input is and was greatly appreciated and this project would not be as far as it is without it.

&nbsp;&nbsp;Again.  Thank you.

${data.Contributors}
\n`;

  //Checks the value of prompt input.
  if(data.CreditsANDORContributors === 'Team Members'){
    togetherOrNo = creditors;
  }
  if(data.contributorAddFile === 'Add File'){
    togetherOrNo = addContributesFile;
  }
  if(data.CreditsANDORContributors === 'Contributors'){
    togetherOrNo = contributors;
  }
  if(data.CreditsANDORContributors === 'BOTH' && data.contributorAddFile === 'Input Each'){
    togetherOrNo = creditors + contributors;
  }
  if(data.CreditsANDORContributors === 'BOTH' && data.contributorAddFile === 'Add File'){
    togetherOrNo = creditors + addContributesFile;
  }

  return togetherOrNo;
}

// Rendering license badge.
function renderLicenseBadge(data) {
  let badge;

  //checks the value of prompt input.
  if(data.License === 'Unlicensed'){
    badge = `https://img.shields.io/badge/license-unlicensed-lightgrey`;
  }
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

// Rendering license link.  Only general license links added.  I prefer a link to the one in my REPO. ---====
function renderLicenseLink(data) {
  let link;

  //checks value of prompt input
  if(data.License === 'Unlicensed'){
    link = `https://opensource.org/licenses/unlicense`;
  }
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
  let section = `
## License:

![License: ${data.License}](${renderLicenseBadge(data)})

See _Terms & Conditions_ of the license [**HERE**.](${renderLicenseLink(data)})
`;
  return section;
  }


// Beginning generateMarkdown function.  Generate Document with imported data.
function generateMarkdown(data) {
  // compiled = only sections without ifs are mandatory, and if trues (user selected), go inside this array. if false ignore.
  let compiled =[];

  // Title and Description: mandatory    OOOOYYYYY BITCH    DON"T FORGET TO REMOVE OOPS   ${data.Title}\n\n-------------------------------------------------------------===================
  let titleNdescription = `# **OOPS! Looks like I'm under construction**\n\n## Description:\n${data.Description}\n\n`;
  compiled.push(titleNdescription);

  // Tables of Contents.  As it cycles through, content sections are added if user selected yes for section.
  let contents = `### Table of contents:\n\n`;

  // Getting Started: Yes
  if(data.queryGettingStarted === true){
    let startUpSection = `## Getting Started:\n${data.gettingStarted}\n\n`;
    let contentStartUpSection = `- [Getting Started](#getting)\n`
    compiled.push(startUpSection);
    contents += contentStartUpSection;
  }

  // Installation: Yes
  if(data.queryInstallations === true){
    let installations = `## Installations:\n${data.Installations}\n\n\n${data.howToInstall}\n\n`;
    let contentInstallations = `- [Installations](#installations)\n`;
    compiled.push(installations);
    contents += contentInstallations;
  }
  // Installation:
  // codeBlock: if user selected code block.
  if(data.addCode1 === true){
    let example1 = '_Example 1:_\n'
    let tripleTicks = '```';
    let code1 = example1 + tripleTicks + `shell\n${data.code1}\n` + tripleTicks + '\n\n';
    compiled.push(code1);
  }
  // Installation:
  // codeBlock: if user selected another code block.
  if(data.addCode2 === true){
    let example2 = '_Example 2:_\n'
    let tripleTicks = '```';
    let code2 = example2 + tripleTicks + `shell\n${data.code2}\n` + tripleTicks + '\n\n';
    compiled.push(code2);
  }

  // Usage: mandatory
  let usage = `## Usage:\n${data.Usage}\n\n`;
  let contentUsage = `- [Usage](#usage)\n`;
  compiled.push(usage);
  contents += contentUsage;

  //Usage. Add file.  User syntax
  if(data.whichSyntaxFile === 'Apply personal syntax to file.'){
    let personalFile = `${data.userSyntaxFile}\n\n`;
    compiled.push(personalFile);
  }

  //Usage.  Add file.
  if(data.whichSyntaxFile === 'Use generator for auto syntax.'){
    let autoFile = `![${data.descriptionOfFile}](${data.locationOfFile})\n\n`;
    compiled.push(autoFile);
  }

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
    let inquiries = `## Questions:\n\nFor any questions or additional feedback.\n\n_Contact Information:_\n\nEmail:&nbsp;&nbsp;[${data.UserName}](${data.questionsEmail})\n\n`;
    let contentQuestions = `- [Questions](#questions)\n`;
    compiled.push(inquiries);
    contents += contentQuestions;
  }

  // Credits: add?
  if(data.queryCredits === true){
    let credits = renderCredits(data);
    let contentCredits = `- [Credits](#credits)\n`;
    compiled.push(credits);
    contents += contentCredits;
  }

  // Resources: add?
  if (data.queryResources === true){                        //
    let resources = `## Resources:\n${data.Resources}\n\n`;
    let contentResources = `- [Resources](#resources)\n`;
    compiled.push(resources);
    contents += contentResources;
  }

  // Location: mandatory 
  let location = `## Location:\n[${data.Title}](${data.Location})\n\n`;
  let contentLocation = `- [Location](#location)\n`;
  compiled.push(location);
  contents += contentLocation;

  // License: add?
  let license = renderLicenseSection(data);
  let contentLicense = `- [License](#license)\n\n`;
  compiled.push(license);
  contents += contentLicense;

  // Tables of Contents: add?
  // down here so 'contents' updates throughout ifs. 
  // It is then spliced to contents array to index 1.  Title and Description are in index 0.
  if(data.Contents === true){
    let backToTop = `\n### [Back to top](#)`;
    compiled.push(backToTop);
    compiled.splice(1, 0, contents);
  }

   return compiled.join(''); // join lays everything inside compiled out as strings.
}

// End of generateMarkdown function.
// Return to writeToFile.
module.exports = generateMarkdown;