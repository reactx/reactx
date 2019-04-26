#!/bin/bash

set -e

if [ -n "$GITHUB_TOKEN" ]; then
  
  echo "machine github.com login behzad888 password $GITHUB_TOKEN" >~/.netrc
  git config --global user.name "Circle CI"
  git config --global user.email "behzad88.2012@gmail.com"

fi
