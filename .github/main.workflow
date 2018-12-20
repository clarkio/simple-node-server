workflow "New workflow" {
  on = "push"
  resolves = [
    "Snyk",
    "npm audit",
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

action "Snyk" {
  uses = "clarkio/snyk-cli-action@master"
  needs = ["npm audit"]
  args = "test"
}
