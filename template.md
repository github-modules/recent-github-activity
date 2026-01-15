{% if closedIssues.size > 0 %}
## Closed Issues
{% for event in closedIssues %}
- [{{event.repo.name}}#{{event.payload.issue.number}}]({{ event.payload.issue.html_url }}) {{ event.payload.issue.title }} - {{event.timeago}}
{%- endfor %}
{% endif %}{% if mergedPullRequests.size > 0 %}
## Merged Pull Requests
{% for event in mergedPullRequests %}
- [{{event.repo.name}}#{{event.payload.number}}](https://github.com/{{ event.repo.name }}/pull/{{ event.payload.number }}) {{ event.payload.pull_request.title }} - {{event.timeago}}
{%- endfor %}
{% endif %}{% if closedPullRequests.size > 0 %}
## Closed Pull Requests
{% for event in closedPullRequests %}
- [{{event.repo.name}}#{{event.payload.number}}](https://github.com/{{ event.repo.name }}/pull/{{ event.payload.number }}) {{ event.payload.pull_request.title }} - {{event.timeago}}
{%- endfor %}
{% endif %}{% if openedIssues.size > 0 %}
## Opened Issues
{% for event in openedIssues %}
- [{{event.repo.name}}#{{event.payload.issue.number}}]({{ event.payload.issue.html_url }}) {{ event.payload.issue.title }} - {{event.timeago}}
{%- endfor %}
{% endif %}{% if openedPullRequests.size > 0 %}
## Opened Pull Requests
{% for event in openedPullRequests %}
- [{{event.repo.name}}#{{event.payload.number}}](https://github.com/{{ event.repo.name }}/pull/{{ event.payload.number }}) {{ event.payload.pull_request.title }} - {{event.timeago}}
{%- endfor %}
{% endif %}
