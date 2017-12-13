# status-board
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/jameswlane/status-board.svg?branch=master)](https://travis-ci.org/jameswlane/status-board)
[![dependencies Status](https://david-dm.org/jameswlane/status-board/status.svg)](https://david-dm.org/jameswlane/status-board)
[![devDependencies Status](https://david-dm.org/jameswlane/status-board/dev-status.svg)](https://david-dm.org/jameswlane/status-board?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/jameswlane/status-board.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/jameswlane/status-board/badge.svg?branch=master)](https://coveralls.io/github/jameswlane/status-board?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswlane%2Fstatus-board.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswlane%2Fstatus-board?ref=badge_shield)

Status Board is a fork of [Atlasboard](https://atlasboard.bitbucket.io) dashboard framework written in nodejs.

The last real update was over a year ago it seems development has went stale for the project.

I decided to fork it and release it under another name, and continue to improve it.

# Installation

```
npm install status-board
```

This is specially useful during development so you only bring up the components you need.

## Running your wallboard using Atlasboard as a module

From your wallboard directory, assuming that you have ``start.js`` run:

```
npm start
```

``start.js`` looks like this and it is included in > 1.0:

```
var statusBoard = require('status-board');
statusBoard({port: process.env.ATLASBOARD_PORT || 3000, install: true}, function (err) {
  if (err) {
    throw err;
  }
});
```

You'll need to add the Status Board dependency to your ``package.json``.

## Packages and resources

# Documentation

## Migrating from Atlasboard

Nothing is supposed to break once you upgrade but you may want to update a few things:

# Roadmap

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswlane%2Fstatus-board.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswlane%2Fstatus-board?ref=badge_large)
## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/794161?v=4" width="100px;"/><br /><sub><b>James W. Lane III</b></sub>](http://fueledbydreams.com)<br />[💻](https://github.com/jameswlane/status-board/commits?author=jameswlane "Code") [🚇](#infra-jameswlane "Infrastructure (Hosting, Build-Tools, etc)") [🔧](#tool-jameswlane "Tools") | [<img src="https://avatars1.githubusercontent.com/u/14790466?v=4" width="100px;"/><br /><sub><b>Greenkeeper</b></sub>](https://greenkeeper.io/)<br />[🚇](#infra-greenkeeperio-bot "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!