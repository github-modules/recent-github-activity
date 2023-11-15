#!/usr/bin/env node

const { chain } = require('lodash')
const getEvents = require('./lib/events')
const render = require('./lib/render')
const args = process.argv.slice(2)
const username = args[0]

main()

async function main () {

  if (!username) {
    console.error('Usage: github-recent-activity <username>')
    process.exit(0)
  }

  if (!process.env.GITHUB_RECENT_ACTIVITY_PERSONAL_ACCESS_TOKEN) {
    console.error('Error: GITHUB_RECENT_ACTIVITY_PERSONAL_ACCESS_TOKEN is not set\n')
    console.error('Generate a token at https://github.com/settings/tokens/new?scopes=repo&description=npx%20recent-github-activity\n')
    console.error('Then run: GITHUB_RECENT_ACTIVITY_PERSONAL_ACCESS_TOKEN=ghp_...')
    process.exit(0)
  }

  const events = await getEvents(username)

  const eventTypes = chain(events)
    .map(event => event.type)
    .uniq()
    .sort()
    .value()

  const repos = chain(events)
    .filter(event => event.repo)
    .map(event => event.repo.name)
    .uniq()
    .sort()
    .value()

  const closedIssues = chain(events)
    .filter(event => event.type === 'IssuesEvent')
    .filter(event => event.payload.action === 'closed')
    .value()

  const openedIssues = chain(events)
    .filter(event => event.type === 'IssuesEvent')
    .filter(event => event.payload.action === 'opened')
    .value()

  const openedPullRequests = chain(events)
    .filter(event => event.type === 'PullRequestEvent')
    .filter(event => event.payload.action === 'opened')
    .value()

  const closedPullRequests = chain(events)
    .filter(event => event.type === 'PullRequestEvent')
    .filter(event => event.payload.action === 'closed')
    .value()

  const context = {
    eventTypes,
    repos,
    closedIssues,
    openedIssues,
    openedPullRequests,
    closedPullRequests
  }

  const template = require('fs').readFileSync(require('path').join(__dirname, './template.md'), 'utf8')
  const output = await render(template, context)

  process.stdout.write(output)
}
