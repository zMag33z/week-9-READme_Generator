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

    //Add file.  User syntax
    if(data.whichSyntaxFile === 'Apply personal syntax to file.'){
      let personalFile = `${data.userSyntaxFile}\n\n`;
      usageSection += personalFile;
    }  
    //Add file. Auto syntax
    if(data.whichSyntaxFile === 'Use generator for auto syntax.'){
      let autoFile = `![${data.descriptionOfFile}](${data.locationOfFile})\n\n`;
      if(data.queryAddLabel === true){
        autoFile += `${data.AddLabel}\n\n`;
      }
      usageSection += autoFile;
    }
    return usageSection;
  }
  

function credits(data){
  // let trythis = data.Credits.split(';');
  // console.log(trythis);
  // console.log(trythis[0]);
  
  
  let togetherOrNo;
  
// lol Couldn't think what to call it. Must be some debt to collect out there.
  let creditors = `
## Credits:
    
**_Project Creators:_**
  
A quick shout out to those who helped bring this project together.
  
${data.Credits}
\n`;
  
  let addContributesFile = `
**_Contributors:_**
  
[View Contributors Here](${data.addContributorsFile})
\n`;
  
  let contributors = `
**_Contributors:_**
  
Would also like to thank all contributors at this time.&nbsp;&nbsp;All of the input is and was greatly appreciated and this project would not be as far as it is without it.
  
&nbsp;&nbsp;Again.  Thank you.
  
${data.Contributors}
\n`;
  
  //Check the value of prompt input.
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
  
// Render license badge.
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
  
// Render license link.
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
  
// Render license section.  Badge and link render sent out to the two above functions.  Then returned.
function license(data){
  let clickHere = '[***here***]';
  let endREADME = '<br><br>';
  let section = `
## License:
  
![License: ${data.License}](${renderLicenseBadge(data)})
  
See *Terms & Conditions* of the license ${clickHere}(${renderLicenseLink(data)}).
`;
return section + endREADME;
}

// Export to required -- generateMarkdown
module.exports = {
  installations: installations,
  usage: usage,
  credits: credits,
  license: license
}

    /*  zMag33z  */