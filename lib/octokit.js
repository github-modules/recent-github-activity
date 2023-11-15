const { Octokit } = require('@octokit/core')
const { paginateRest } = require('@octokit/plugin-paginate-rest')

module.exports = async function getOctokit () {
  const auth = process.env.GITHUB_RECENT_ACTIVITY_PERSONAL_ACCESS_TOKEN
  const MyOctokit = Octokit.plugin(paginateRest)
  const octokit = new MyOctokit({ auth })
  return octokit
}
