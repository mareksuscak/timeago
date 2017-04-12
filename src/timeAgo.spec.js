/* eslint-env node, jest */

const MockDate = require('mockdate')
const timeAgo = require('./timeAgo')

beforeEach(() => {
  MockDate.set('2017-04-06T12:00:00Z')
})

afterEach(() => {
  MockDate.reset()
})

test('accepts a string representing an ISO8601 formatted date', () => {
  expect(timeAgo('2100-01-01T00:00:00Z')).toEqual('in 82 years')
})

test('accepts a number representing a unix timestamp', () => {
  expect(timeAgo(4102444800000)).toEqual('in 82 years')
})

test('accepts a Date object', () => {
  expect(timeAgo(new Date())).toEqual('just now')
})

test('uses current date when no param was passed in', () => {
  expect(timeAgo()).toEqual('just now')
})

test('throws when anything else is passed in', () => {
  expect(() => timeAgo(true)).toThrow()
  expect(() => timeAgo(false)).toThrow()
  expect(() => timeAgo(null)).toThrow()
})

test('handles a negative time difference of 0 to 44 seconds', () => {
  expect(timeAgo('2017-04-06T11:59:16Z')).toEqual('a few seconds ago')
  expect(timeAgo('2017-04-06T11:59:59Z')).toEqual('a few seconds ago')
})

test('handles a positive time difference of 0 to 44 seconds', () => {
  expect(timeAgo('2017-04-06T12:00:01Z')).toEqual('in seconds')
  expect(timeAgo('2017-04-06T12:00:44Z')).toEqual('in seconds')
})

test('handles a negative time difference of 45 to 89 seconds', () => {
  expect(timeAgo('2017-04-06T11:58:31Z')).toEqual('a minute ago')
  expect(timeAgo('2017-04-06T11:59:15Z')).toEqual('a minute ago')
})

test('handles a positive time difference of 45 to 89 seconds', () => {
  expect(timeAgo('2017-04-06T12:00:45Z')).toEqual('in a minute')
  expect(timeAgo('2017-04-06T12:01:29Z')).toEqual('in a minute')
})

test('handles a negative time difference of 90 seconds to 44 minutes', () => {
  expect(timeAgo('2017-04-06T11:15:01Z')).toEqual('44 minutes ago')
  expect(timeAgo('2017-04-06T11:58:30Z')).toEqual('2 minutes ago')
})

test('handles a positive time difference of 90 seconds to 44 minutes', () => {
  expect(timeAgo('2017-04-06T12:01:30Z')).toEqual('in 2 minutes')
  expect(timeAgo('2017-04-06T12:44:59Z')).toEqual('in 44 minutes')
})

test('handles a negative time difference of 45 to 89 minutes', () => {
  expect(timeAgo('2017-04-06T11:15:00Z')).toEqual('an hour ago')
  expect(timeAgo('2017-04-06T10:30:01Z')).toEqual('an hour ago')
})

test('handles a positive time difference of 45 to 89 minutes', () => {
  expect(timeAgo('2017-04-06T12:45:00Z')).toEqual('in an hour')
  expect(timeAgo('2017-04-06T13:29:59Z')).toEqual('in an hour')
})

test('handles a negative time difference of 90 minutes to 21 hours', () => {
  expect(timeAgo('2017-04-05T14:00:01Z')).toEqual('21 hours ago')
  expect(timeAgo('2017-04-06T10:30:00Z')).toEqual('2 hours ago')
})

test('handles a positive time difference of 90 minutes to 21 hours', () => {
  expect(timeAgo('2017-04-06T13:30:00Z')).toEqual('in 2 hours')
  expect(timeAgo('2017-04-07T09:59:59Z')).toEqual('in 21 hours')
})

test('handles a negative time difference of 22 to 35 hours', () => {
  expect(timeAgo('2017-04-05T00:00:01Z')).toEqual('a day ago')
  expect(timeAgo('2017-04-05T14:00:00Z')).toEqual('a day ago')
})

test('handles a positive time difference of 22 to 35 hours', () => {
  expect(timeAgo('2017-04-07T10:00:00Z')).toEqual('in a day')
  expect(timeAgo('2017-04-07T23:59:59Z')).toEqual('in a day')
})

test('handles a negative time difference of 36 hours to 25 days', () => {
  expect(timeAgo('2017-03-11T12:00:01Z')).toEqual('25 days ago')
  expect(timeAgo('2017-04-05T00:00:00Z')).toEqual('2 days ago')
})

test('handles a negative time difference of 36 hours to 25 days', () => {
  expect(timeAgo('2017-04-08T00:00:00Z')).toEqual('in 2 days')
  expect(timeAgo('2017-05-02T11:59:59Z')).toEqual('in 25 days')
})

test('handles a negative time difference of 26 to 45 days', () => {
  expect(timeAgo('2017-03-11T12:00:00Z')).toEqual('a month ago')
  expect(timeAgo('2017-02-20T13:00:01Z')).toEqual('a month ago')
})

test('handles a positive time difference of 26 to 45 days', () => {
  expect(timeAgo('2017-05-02T12:00:00Z')).toEqual('in a month')
  expect(timeAgo('2017-05-21T11:59:59Z')).toEqual('in a month')
})

test('handles a negative time difference of 46 to 319 days', () => {
  expect(timeAgo('2016-05-21T12:00:01Z')).toEqual('10 months ago')
  expect(timeAgo('2017-02-19T12:00:00Z')).toEqual('2 months ago')
})

test('handles a positive time difference of 46 to 319 days', () => {
  expect(timeAgo('2017-05-22T12:00:00Z')).toEqual('in 2 months')
  expect(timeAgo('2018-02-20T11:59:59Z')).toEqual('in 10 months')
})

test('handles a negative time difference of 320 to 547 days (1.5 years)', () => {
  expect(timeAgo('2015-10-06T12:00:01Z')).toEqual('a year ago')
  expect(timeAgo('2016-05-21T12:00:00Z')).toEqual('a year ago')
})

test('handles a positive time difference of 320 to 547 days (1.5 years)', () => {
  expect(timeAgo('2018-02-20T12:00:00Z')).toEqual('in a year')
  expect(timeAgo('2018-10-06T11:59:59Z')).toEqual('in a year')
})

test('handles a negative time difference of 548 days+', () => {
  expect(timeAgo('1997-04-06T12:00:00Z')).toEqual('20 years ago')
  expect(timeAgo('2015-10-06T12:00:00Z')).toEqual('2 years ago')
})

test('handles a positive time difference of 548 days+', () => {
  expect(timeAgo('2018-10-06T12:00:00Z')).toEqual('in 2 years')
  expect(timeAgo('2037-04-06T12:00:00Z')).toEqual('in 20 years')
})
