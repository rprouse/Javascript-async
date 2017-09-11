"use strict";

const request = require("request-promise");
const dotenv = require("dotenv");
dotenv.config();

// Token for authenticating against the GitHub API
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("You must set the environment variable GITHUB_TOKEN. See the README.");
  process.exit(-1);
}

const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      authorization: 'token ' + token,
      'cache-control': 'no-cache',
      'User-Agent': 'NodeJS'
  }
};

function getRepositories() {
  return request('https://api.github.com/orgs/nunit/repos', options).then(function(data){
    return JSON.parse(data);
  }).catch(function(err) {
    return [];
  })
}

getRepositories().then(function(repos){
  for (let repo of repos) {
    console.log(repo.name);
  }
});

