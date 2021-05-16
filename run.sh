#!/usr/bin/env bash
set -eo pipefail

case $1 in
  build)
   # The '| cat' is to trick Node that this is an non-TTY terminal
    yarn build | cat
    ;;
  test)
    yarn test $@
    ;;
  linc)
    yarn linc $@
    ;;
  lint)
    yarn lint $@
    ;;
  prettier)
    yarn prettier $@
    ;; 
  debug)
    yarn debug-test $@
    ;;
  *)
    exec "$@"
    ;;
esac