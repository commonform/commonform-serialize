import isArray from 'is-array'
import isObject from 'is-object'

export function stringify (argument) {
  if (typeof argument === 'string') {
    return quote(argument)
  } else if (isArray(argument)) {
    return list('[', argument.map(stringify), ']')
  } else if (isObject(argument)) {
    return list(
      '{',
      Object.keys(argument)
        .sort() // Sorting of keys occurs here.
        .map(function (name) {
          return quote(name) + ':' + stringify(argument[name])
        }),
      '}'
    )
  } else {
    throw new TypeError(
      'argument to stringify contains other than object, array, or ' +
      'string'
    )
  }
}

function quote (string) {
  return '"' + string.replace(/"/g, '\\"') + '"'
}

function list (start, values, end) {
  return start + values.join(',') + end
}

export const parse = JSON.parse.bind(JSON)
