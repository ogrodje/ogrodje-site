#!/usr/bin/env bash
set -ex

GH_ENDPOINT="https://api.github.com/repos/ogrodje/ogrodje-site/actions/workflows/build.yml/dispatches"

curl -D - -X POST \
		-H "Accept: application/vnd.github+json" \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
		$GH_ENDPOINT

