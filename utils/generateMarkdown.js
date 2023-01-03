// Need to create new file renderSections.js for renderfunctions.

// Rendering Installation section.
function renderInstallationsSection(data){
  let installationsSection = `
## Installations:

${data.Installations}

${data.howToInstall}
\n`;

  let tripleTicks = '```';

  // codeBlock: if user selected code block.
  if(data.addCode1 === true){
    let example = `*Example 1:*\n`;
    let code1 = example + tripleTicks + `shell\n${data.code1}\n` + tripleTicks + '\n\n';
    installationsSection += code1;
  }

  // codeBlock: if user selected another code block.
  if(data.addCode2 === true){
    let example = `*Example 2:*\n`;
    let code2 = example + tripleTicks + `shell\n${data.code2}\n` + tripleTicks + '\n';
    installationsSection += code2;
  }

  return installationsSection;
}

// Rendering Usage section.
function renderUsageSection(data){

  let usageSection = `
## Usage:

${data.Usage}
\n`;

  if(data.queryUsageCode === true){
    let example = `*Example:*\n`;
    let tripleTicks = '```';
    let usageCode = example + tripleTicks + `shell\n${data.UsageCodeBlock}\n` + tripleTicks + '\n';
    usageSection += usageCode;
  }

  //Add file.  User syntax
  if(data.whichSyntaxFile === 'Apply personal syntax to file.'){
    let personalFile = `${data.userSyntaxFile}\n\n`;
    usageSection += personalFile;
  }

  //Add file. Auto
  if(data.whichSyntaxFile === 'Use generator for auto syntax.'){
    let autoFile = `![${data.descriptionOfFile}](${data.locationOfFile})\n\n`;
    if(data.queryAddLabel === true){
      autoFile += `${data.AddLabel}\n\n`;
    }
    usageSection += autoFile;
  }


  return usageSection;
}

// Rendering Credits section.
function renderCredits(data){
  // let trythis = data.Credits.split(';');
  // console.log(trythis);
  // console.log(trythis[0]);


  let togetherOrNo;

// lol Couldn't think what to call it. Must be some debt to collect out there.
  let creditors = `
## Acknowledgements:
  
-**_Project Creators:_**

A huge **Thanks** to those who worked hard to bring this project together.

${data.Credits}
\n`;

  let addContributesFile = `
-**_Contributors:_**

[View Contributors Here](${data.addContributorsFile})
\n`;

  let contributors = `
-**_Contributors:_**

Would also like to **Thank** all contributors at this time.&nbsp;&nbsp;All of the input was and will always be *greatly appreciated* and this project would not be what it is without it.

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
  if(data.LinkLicense === 'Personal link'){
    link = data.personalLicense;
  }

  if(data.LinkLicense === 'Auto link'){

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
      link = clickHere + `https://www.boost.org/LICENSE_1_0.txt`;
    }
  }

return link;
}

// Render license section.  Badge and link render sent out to the above functions.  Then returned to generateMarkdown function.
function renderLicenseSection(data){
  let clickHere = '[***here***]';
  let endREADME = '<br><br>';
  let section = `
## License:

![License: ${data.License}](${renderLicenseBadge(data)})

See *Terms & Conditions* of the license ${clickHere}(${renderLicenseLink(data)}).
`;
  return section + endREADME;
  }


// Beginning generateMarkdown function.  Generate Document with imported data.
function generateMarkdown(data) {

console.log(data);

  // compiled = only sections that are mandatory or true.
  let compiled =[];
  data.Description += '<br><br>';

  // Title and Description: mandatory
  let titleNdescription = `# **${data.Title}**\n\n### ${data.Description}\n\n`;
  compiled.push(titleNdescription);

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
    let installations = renderInstallationsSection(data);
    let contentInstallations = `- [Installations](#installations)\n`;
    compiled.push(installations);
    contents += contentInstallations;
  }

  // Usage:
  let usage = renderUsageSection(data);
  let contentUsage = `- [Usage](#usage)\n`;
  compiled.push(usage);
  contents += contentUsage;

  // Contributions: add?
  if(data.queryContributions === true){
    let contributions = `## Contributions:\n\n${data.Contributions}\n\n`;
    let contentContributions = `- [Contributions](#contributions)\n`;
    compiled.push(contributions);
    contents += contentContributions;
  }

  // Tests: add?
  if(data.queryTests === true){
    let tests = `## Tests:\n\n${data.Tests}\n\n`;
    let contentTests = `- [Tests](#tests)\n`;
    compiled.push(tests);
    contents += contentTests;
  }

  // Questions: add?
  if(data.queryQuestions === true){
    let inquiries = `## Questions:\n\nFor any questions or additional feedback.\n\n**_Contact Information:_**\n\nEmail:&nbsp;&nbsp;[${data.UserName}](${data.questionsEmail})\n`;
    let contentQuestions = `- [Questions](#questions)\n`;
    compiled.push(inquiries);
    contents += contentQuestions;
  }

  // Credits: add?
  if(data.queryCredits === true){
    let credits = renderCredits(data);
    let contentCredits = `- [Acknowledgements:](#acknowledgements)\n`;
    compiled.push(credits);
    contents += contentCredits;
  }

  // Resources: add?
  if (data.queryResources === true){
    let resources = `## Resources:\n\n${data.Resources}\n\n`;
    let contentResources = `- [Resources](#resources)\n`;
    compiled.push(resources);
    contents += contentResources;
  }

  // Location:
  let location = `## Location:\n\n[${data.Title}](${data.Location})\n`;
  let contentLocation = `- [Location](#location)\n`;
  compiled.push(location);
  contents += contentLocation;

  // License:
  let license = renderLicenseSection(data);
  let contentLicense = `- [License](#license)\n\n`;
  compiled.push(license);
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