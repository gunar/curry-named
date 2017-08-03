'use strict'

const parseFn = require('parse-function')().parse
const omit = require('lodash.omit')
const reject = require('lodash.reject')

const CATCHALL_ARGUMENT = 'opts'
const isCatchAll = x => x == CATCHALL_ARGUMENT
const objArgsToArray = ({ obj, args }) =>
  args.reduce((acc, param) =>
    param === CATCHALL_ARGUMENT
      ? [...acc, omit(obj, reject(args, isCatchAll))]
      : [...acc, obj[param]]
  , [])

function namedCurry (fn) {
  const { args } = (parseFn(fn))
  return function helper (cache) {
    return function (...objects) {
      const incoming = Object.assign({}, ...objects)
      const argsOverridden = includesSome(Object.keys(cache), Object.keys(incoming))
      const error = `The following arguments were overidden: ${argsOverridden}`
      if (argsOverridden.length > 0) throw Error(error)
      const obj = Object.assign({}, cache, ...objects)
      const mandatoryArgs = reject(args, isCatchAll)
      return includesEvery(mandatoryArgs, Object.keys(obj))
        ? fn(...objArgsToArray({ obj, args }))
        : helper(obj)
    }
  }({})
}

const includesEvery = (mandatory, received) =>
  mandatory.every(key =>
    received.includes(key))

const includesSome = (mandatory, received) =>
  mandatory.filter(key =>
    received.includes(key))

module.exports = namedCurry
