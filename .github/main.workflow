workflow "Install, Test, Build and Publish" {
  resolves = ["Publish"]
  on = "push"
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run test:ci"
}

action "Build" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "run build"
}

# Filter for a new tag
action "Tag" {
  needs = ["Test", "Build"]
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "Tag"
  uses = "actions/npm@master"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
