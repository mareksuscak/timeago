# timeAgo [![CircleCI Status](https://circleci.com/gh/chute/timeago.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/chute/timeago) [![npm version](https://badge.fury.io/js/%40chute%2Ftimeago.svg)](https://badge.fury.io/js/%40chute%2Ftimeago)

A byte-sized library for displaying a human-readable relative time. Produces the same output as [Moment's](http://momentjs.com/) `fromNow` and `toNow` except it comes in a much smaller package.

## Installation

```sh
# NPM
npm install @chute/timeago --save

# Yarn
yarn add @chute/timeago
```

## Usage

```js
// Common.js & AMD
var timeAgo = require('@chute/timeago')

// ES modules
import timeAgo from '@chute/timeago'

// Browser Global
// <script src="https://unpkg.com/@chute/timeago">

// Usage
timeAgo()                       // uses current date
timeAgo(new Date())             // explicitly passing current date
timeAgo(1491953789490)          // explicitly passing a unix timestamp
timeAgo('2017-04-11T23:36:46Z') // explicitly passing an ISO8601 date string
```

## Tests

```sh
# CI server
npm test

# Development
npm test -- --watch
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
