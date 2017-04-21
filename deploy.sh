#!/usr/bin/env sh

bundle exec middleman build
cd build
surge -d quorum-landing-page.surge.sh -p .
cd ..
