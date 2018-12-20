workflow "New workflow" {
  on = "push"
  resolves = ["npm audit"]
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
