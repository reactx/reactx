#!/bin/bash

set -e

if [ -z "$CI_PULL_REQUEST" ] && [ -n "$BUILD_SERVER_ENDPOINT" ]; then
  curl \
    -F "reactx-components.development=@build/dist/reactx-components.development.js" \
    -F "reactx-components.production.min=@build/dist/reactx-components.production.min.js" \    
    -F "reactx-svg-components.development=@build/dist/reactx-svg-components.development.js" \
    -F "reactx-svg-components.production.min=@build/dist/reactx-svg-components.production.min.js" \    
    -F "results.json=@build/../scripts/rollup/results.json" \
    -F "commit=$CIRCLE_SHA1" \
    -F "date=$(git log --format='%ct' -1)" \
    -F "pull_request=false" \
    -F "token=$BUILD_SERVER_TOKEN" \
    -F "branch=$CIRCLE_BRANCH" \
    "$BUILD_SERVER_ENDPOINT"
fi
