#!/usr/bin/env bash

log() {
	printf '%s\n' "$*"
}

error() {
	log "$1" >&2
}

# Ensure we're in a git repo
if [[ ! -d .git ]]; then
	error "not a git repository"
	exit 1
fi

# Get GitHub origin URL
origin_url="$(git config --get remote.origin.url || true)"

if [[ -z "$origin_url" ]]; then
	error "no origin URL found"
	exit 1
fi
log "> Found origin_url: $origin_url"

# Parse owner and repo name
if [[ $origin_url =~ github\.com[:/]+([^/]+)/([^/]+)\.git$ ]]; then
	owner="${BASH_REMATCH[1]}"
	repo="${BASH_REMATCH[2]}"
elif [[ $origin_url =~ github\.com[:/]+([^/]+)/([^/]+)$ ]]; then
	owner="${BASH_REMATCH[1]}"
	repo="${BASH_REMATCH[2]}"
else
	echo "failed to parse GitHub origin URL: $origin_url" >&2
	exit 1
fi

if [[ -z "$owner" || -z "$repo" ]]; then
	error "parsed owner or repo is empty (owner='$owner', repo='$repo')"
	exit 1
fi
log "> Found owner: $owner"
log "> Found repo: $repo"

# Enable automatically delete head branches on merge
if ! command -v gh >/dev/null 2>&1; then
	error "gh (GitHub CLI) is not installed"
	exit 1
fi

gh api -X PATCH -H "Accept: application/vnd.github+json" \
	"repos/$owner/$repo" -f delete_branch_on_merge=true >/dev/null
log "> Enabled automatically delete head branches on merge"

# Only allow squash merging
gh api -X PATCH -H "Accept: application/vnd.github+json" \
	"repos/$owner/$repo" -f allow_squash_merge=true -f allow_merge_commit=false -f allow_rebase_merge=false >/dev/null
log "> Enabled allow squash merging only"

# Allow GitHub Actions to create and approve pull requests
gh api -X PUT -H "Accept: application/vnd.github+json" \
	"repos/$owner/$repo/actions/permissions/workflow" \
	-F can_approve_pull_request_reviews=true >/dev/null
log "> Allowed GitHub Actions to create and approve pull requests"

# Create branch protection ruleset
# When working on a team make "required_approving_review_count": 1 and "dismiss_stale_reviews_on_push": true
gh api -X POST -H "Accept: application/vnd.github+json" \
	"repos/$owner/$repo/rulesets" \
	--input - >/dev/null <<'JSON'
{
  "name": "default-branch",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["~DEFAULT_BRANCH"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false,
        "automatic_copilot_code_review_enabled": false,
        "allowed_merge_methods": ["squash"]
      }
    }
  ]
}
JSON
log "> Created branch protection ruleset"

log "Package '$repo' set up successfully ✓"
