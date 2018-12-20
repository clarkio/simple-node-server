workflow "New workflow" {
  on = "push"
  resolves = [
    "npm audit",
    "clarkio/snyk-cli-action@master",
  ]
}

action "npm install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "npm audit" {
  uses = "actions/npm@e7aaefe"
  needs = ["npm install"]
  args = "audit"
}

action "clarkio/snyk-cli-action@master" {
  uses = "clarkio/snyk-cli-action@master"
  args = "test"
  secrets = ["SNYK_TOKEN"]
}
