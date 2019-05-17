#!/usr/bin/env bash
set -eo pipefail

case $1 in
  build)
    yarn build 
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
  prettier-all)
    yarn prettier-all $@
    ;;
  flow)
    yarn flow dom $@
    ;;
  debug)
    yarn debug-test $@
    ;;
  *)
    exec "$@"
    ;;
esac