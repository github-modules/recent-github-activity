# recent-github-activity

Generate a markdown report of your recent activity on GitHub

## Usage

Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new?scopes=repo&description=npx%20recent-github-activity) with the `repo` scope, then add it to your environment:

```
export GITHUB_RECENT_ACTIVITY_PERSONAL_ACCESS_TOKEN="ghp_..."
```

Then run:

```
npx recent-github-activity <username>
```

If you specify _your own GitHub username_, you'll see all of your recent activity, both public and private.

If you specify someone else's username, you'll see all of their public activity.


You can save the output to a file:

```
npx recent-github-activity zeke > recent.md
```

or pipe it right to [`vmd`](https://ghub.io/vmd):

```
npx recent-github-activity zeke | npx vmd
```

This is what a generated report looks like in `vmd`:

<img width="1009" alt="screenshot" src="https://user-images.githubusercontent.com/2289/76592714-7bf71200-64b1-11ea-8294-4d26ef90499a.png">
