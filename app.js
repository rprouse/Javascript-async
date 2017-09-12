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
  return request('https://api.github.com/issues', options);
}

function getComments(issue) {
    return request(issue.comments_url, options);
}

function displayIssuesWithComments() {
  getIssues().then(function(data){
    let issues = JSON.parse(data);
    for (let issue of issues) {
        getComments(issue).then(function(data) {
          let comments = JSON.parse(data);
          console.log(issue.repository.full_name + '#' + issue.number + ' - ' + issue.title + ' (' + comments.length + ' comments)');
      }).catch(function(error) {
          console.error(error);
      });
    }
  }).catch(function(error) {
    console.error(error);
  });
}

displayIssuesWithComments();

