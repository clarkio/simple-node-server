workflow "New workflow" {
  on = "push"
  resolves = ["./node_modules/.bin/snyk"]
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

action "./node_modules/.bin/snyk" {
  uses = "./node_modules/.bin/snyk"
  needs = ["npm audit"]
  args = "test"
}
