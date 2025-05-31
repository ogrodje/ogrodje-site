#!/usr/bin/env bash
set -ex

GH_ENDPOINT="https://api.github.com/repos/ogrodje/ogrodje-site/actions/workflows/build.yml/dispatches"

curl -D - -X POST \
	-H "Authorization: Bearer ${GITHUB_TOKEN}" \
	-H "Accept: application/vnd.github.v3+json" \
	-d '{"ref": "refs/heads/master"}' \
	$GH_ENDPOINT


