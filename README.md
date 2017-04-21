# Quorum Landing Page

The quorum landing page available at http://quorum-landing-page.surge.sh.

## Setup

```
bundle install
bundle exec middleman
```

## Add collaborator to surge

```
bundle exec middleman
cd build
surge -a <email> -d quorum-landing-page.surge.sh -p .
```

## Deployment

```
./deploy.sh
```
