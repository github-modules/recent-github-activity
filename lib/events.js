const timeago = require('time-ago').ago

module.exports = async function getEvents (username) {
  let totalEvents = 0
  const maxEvents = 1000
  const octokit = await require('./octokit')()
  const events = await octokit.paginate(
    'GET /users/:username/events',
    {
      username: username,
      per_page: 100
    },
    (response, done) => {
      totalEvents += response.data.length
      if (totalEvents >= maxEvents) done()
      return response.data
    }
  )

  // Enrich PullRequestEvent payloads with full PR data (title, html_url, etc.)
  const prEvents = events.filter(e => e.type === 'PullRequestEvent')
  await Promise.all(prEvents.map(async (event) => {
    try {
      const [owner, repo] = event.repo.name.split('/')
      const { data: pr } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
        owner,
        repo,
        pull_number: event.payload.number
      })
      event.payload.pull_request = pr
    } catch (err) {
      // If we can't fetch the PR, keep the limited data
    }
  }))

  return events
    .map(event => {
      event.created_at = new Date(event.created_at)
      event.timeago = timeago(event.created_at)
      return event
    })
    .sort((a, b) => b.created_at - a.created_at)
}
