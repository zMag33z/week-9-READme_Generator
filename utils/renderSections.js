// required by generateMarkdown file.

function installations(data){
  let installationsSection = `
## Installations:
  
${data.Installations}
  
${data.howToInstall}
\n`;
  
  let tripleTicks = '```';    // javascript doesn't like triple ticks inside of ticks.  Used variable joining.
  
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
  

function usage(data){  
  let usageSection = `
## Usage:
  
${data.Usage}
\n`;

  if(data.queryUsageCode === true){
    let tripleTicks = '```';
    let example = `*Example:*\n`;
    let usageCode = example + tripleTicks + `shell\n${data.UsageCodeBlock}\n` + tripleTicks + '\n\n';
    usageSection += usageCode;
  } 

  if(data.whichSyntaxFile === 'Apply personal syntax to file.'){
    let personalFile = `${data.userSyntaxFile}\n\n`;
    usageSection += personalFile;
  }  

  if(data.whichSyntaxFile === 'Use generator for auto syntax.'){
    let autoFile = `![${data.descriptionOfFile}](${data.locationOfFile})\n\n`;

    if(data.queryAddLabel === true) autoFile += `${data.AddLabel}\n\n`;

    usageSection += autoFile;
  }
return usageSection;
}
  
function questions(data){
  let questions = `## Questions:
For any questions or additional feedback.

**_-Contact Information:_**

Email:&nbsp;&nbsp;[${data.UserName}](${data.questionsEmail})

[GitHub Profile *here*](https://github.com/${data.questionsGitHub})
\n`;

  return questions;
}

function acknowledgements(data){
  // let trythis = data.Credits.split(';');   Leaving this for future use *idea.  May have to implement idea in index with filter:.  Also future boil this function down into another function.
  // console.log(trythis);
  // console.log(trythis[0]);

  let acknowledgementType = data.CreditsANDORContributors;
  let contributorsFileOrInput = data.contributorAddFile;
  

  let acknowledgements = `## Acknowledgements:
\n`;

  let teamMembers = ` 
**_-Project Creators:_**
  
A huge **Thanks** to those who worked hard to bring this project together.
  
${data.Credits}
\n`;

  let contributors = `
**_-Contributors:_**
\n`;

  let addContributesFile = `View Contributors [*here*](${data.addContributorsFile}).
\n`;
  
  let contributeMessage = `Would like to **Thank** all contributors at this time.&nbsp;&nbsp;All of the input was and will always be *greatly appreciated* and this project would not be what it is without it.
&nbsp;&nbsp;Again.  Thank you.
\n`;

  let contributeMessageWithTeam = contributeMessage.replace('Would', 'Would also');

  let inputEachContributor = `${data.Contributors}
\n`;

  let acknowledgementsSection;
  if(acknowledgementType === 'Team Members') acknowledgementsSection = acknowledgements + teamMembers;

  if(acknowledgementType === 'Contributors') acknowledgementsSection = acknowledgements + contributors + contributeMessage + inputEachContributor;

  if(contributorsFileOrInput === 'Add File') acknowledgementsSection = acknowledgements + contributors + contributeMessage + addContributesFile;

  if(acknowledgementType === 'BOTH' && contributorsFileOrInput === 'Input Each') acknowledgementsSection = acknowledgements + teamMembers + contributors + contributeMessageWithTeam + inputEachContributor;

  if(acknowledgementType === 'BOTH' && contributorsFileOrInput === 'Add File') acknowledgementsSection = acknowledgements + teamMembers + contributors + contributeMessageWithTeam + addContributesFile;
  
  return acknowledgementsSection;
}
  

function getLicenseBadge(data) {
  let licenseChoice = data.License;

  let badge;  
  if(licenseChoice === 'Unlicensed') badge = `https://img.shields.io/badge/license-unlicensed-lightgrey`;

  if(licenseChoice === 'MIT') badge = `https://img.shields.io/badge/license-MIT-brightgreen`;

  if(licenseChoice === 'Apache2.0') badge = `https://img.shields.io/badge/license-Apache2.0-yellow`;

  if(licenseChoice === 'GPLv3') badge = `https://img.shields.io/badge/license-GPLv3-blue`;

  if(licenseChoice === 'BSD') badge = `https://img.shields.io/badge/license-BSD_3--Clause-orange`;

  if(licenseChoice === 'Boost') badge = `https://img.shields.io/badge/license-Boost_1.0-lightblue`;

  return badge;
}
  

function getLicenseLink(data) {
  let licenseLinkInputType = data.LinkLicense;
  let licenseChoice = data.License;

  let link;
  if(licenseLinkInputType === 'Personal link') link = data.personalLicense;  
  
  if(licenseLinkInputType === 'Auto link'){

    if(licenseChoice === 'Unlicensed') link = `https://opensource.org/licenses/unlicense`;
    
    if(licenseChoice === 'MIT') link = `https://opensource.org/licenses/MIT`;
    
    if(licenseChoice === 'Apache2.0') link = `https://www.apache.org/licenses/LICENSE-2.0`;
    
    if(licenseChoice === 'GPLv3') link = `https://www.gnu.org/licenses/gpl-3.0.en.html`;
    
    if(licenseChoice === 'BSD') link = `https://opensource.org/licenses/BSD-3-Clause`;
    
    if(licenseChoice === 'Boost') link = `https://www.boost.org/LICENSE_1_0.txt`;    
  }  
  return link;
}
  
// Render license section.  Get badge and link sent out to the two above functions.  Then returned.
function license(data){

let licenseSection = `
## License:
  
![License: ${data.License}](${getLicenseBadge(data)})
  
See *Terms & Conditions* of the license [***here***](${getLicenseLink(data)}).

<br>

`;    // DO NOT CHANGE.. Looks like error but is not error.  Spacing for <br>.  Interferes with back to top button syntax when button added.
return licenseSection;
}

// Export to required -- generateMarkdown ONLY when function called.
module.exports = {
  installations: installations,
  usage: usage,
  questions: questions,
  acknowledgements: acknowledgements,
  license: license
}

    /*  zMag33z  */