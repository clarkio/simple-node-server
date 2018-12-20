workflow "New workflow" {
  on = "push"
  resolves = ["snyk test"]
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

action "snyk test" {
  uses = "actions/bin/sh@master"
  needs = ["npm audit"]
  args = "test"
  runs = "./node_modules/.bin/snyk"
}
