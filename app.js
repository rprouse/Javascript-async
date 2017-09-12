"use strict";

const request = require("request-promise-native");
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

function getIssues() {
  request('https://api.github.com/issues', options).then(function(data){
    let issues = JSON.parse(data);
    for (let issue of issues) {
      console.log( issue.repository.full_name + '#' + issue.number + " - " + issue.title);
    }
  }).catch(function(error) {
    console.log(error);
  });
}

getIssues();

