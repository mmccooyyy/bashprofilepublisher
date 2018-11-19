const fs = require('fs');
const homedir = require('os').homedir();
const GitHubClient = require('./libs/GitHubClient.js').GitHubClient;
const gists = require('./libs/features/gists');
const bashprofuri = homedir+"/.bash_profile";

let githubCli = new GitHubClient({
    baseUri:"https://api.github.com",
    token:process.env.GITHUB_PERSONAL_TOKEN
}, gists);

fs.readFile(bashprofuri, 'utf8', function(err, data) {  
    if (err) throw err;
    var bashProfContents = data;

    githubCli.editGist({gistId:'2d6b4b93894be88894ca8d17b0e8328f', fileName:'.bash_profile', content:bashProfContents})
	  .then(gist => {
	    console.log('.bash_profile synced to gist: '+gist.url);
	  })
});