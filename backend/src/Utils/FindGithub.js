const axios = require("axios");
module.exports = async function findGithub(github_username) {
  return await axios.get(`https://api.github.com/users/${github_username}`);
};