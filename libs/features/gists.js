/*
# Gist features

## Setup

```javascript
const GitHubClient = require('../libs/GitHubClient.js').GitHubClient;
const gists = require('../libs/features/gists');


let githubCli = new GitHubClient({
  baseUri: "http://github.at.home/api/v3",
  token: process.env.TOKEN_GHITHUB_ENTERPRISE
}, gists); //<-- add gists features
```
*/

/*
## listGists

- parameter: `handle`
- return: `Promise`

### Description

`listGists` lists the gists for a user (`handle`)

*/
function listGists({handle}) { // get gists
  return this.getData({path:`/users/${handle}/gists`})
    .then(response => {
      return response.data;
    });
}

/*
## fetchGist

- parameter: `gistId`
- return: `Promise`

### Description

`fetchGist` gets a specific gist (`gistId`)

*/
function fetchGist({gistId}) { //https://developer.github.com/v3/gists/#get-a-single-gist
  return this.getData({path:`/gists/${gistId}`})
    .then(response => {
      return response.data;
    })
}

/*
## createGist

- parameter: `files, description, isPublic`
- return: `Promise`

### Description

`createGist` create a gist (`files, description, isPublic`)

*/
function createGist({files, description, isPublic}) {
  return this.postData({path:`/gists`, data:{
    files: files,
    descrption: description,
    public: !!isPublic,
  }}).then(response => {
    return response.data;
  })
}

/*
## editGist

- parameter: `gistId, fileName, content`
- return: `Promise`

### Description

`editGist` edit a gist (`gistId, fileName, content`)

*/
function editGist({gistId, fileName, content}) {
  return this.fetchGist({'gistId': gistId})
    .then(gist => {
      let gistId = gist.id;
      let description = gist.description;
      if (typeof gist.files === 'object' && Object.keys(gist.files).length > 0) {
        if (typeof gist.files[fileName] === 'object') {
          // File exists
          let files = {};
          files[fileName] = {"content": content};
          let data = {
            description: description,
            files: files
          };
          return this.patchData({path:`/gists/${gistId}`, data:{
            files: files
          }}).then(response => {
            return response.data;
          });
        }
      }
    });
}

module.exports = {
  listGists: listGists,
  fetchGist: fetchGist,
  createGist: createGist,
  editGist, editGist
};

