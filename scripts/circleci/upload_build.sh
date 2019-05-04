#!/bin/bash

set -e

if [ -z "$CI_PULL_REQUEST" ] && [ -n "$BUILD_SERVER_ENDPOINT" ]; then
  curl \
    -F "react-components.development=@build/dist/react-components.development.js" \
    -F "react-components.production.min=@build/dist/react-components.production.min.js" \    
    -F "react-svg-components.development=@build/dist/react-svg-components.development.js" \
    -F "react-svg-components.production.min=@build/dist/react-svg-components.production.min.js" \    
    -F "results.json=@build/../scripts/rollup/results.json" \
    -F "commit=$CIRCLE_SHA1" \
    -F "date=$(git log --format='%ct' -1)" \
    -F "pull_request=false" \
    -F "token=$BUILD_SERVER_TOKEN" \
    -F "branch=$CIRCLE_BRANCH" \
    "$BUILD_SERVER_ENDPOINT"
fi
