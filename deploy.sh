#!/usr/bin/env sh

bundle exec middleman build
cd build
surge -d qqquorum.surge.sh -p .
cd ..
