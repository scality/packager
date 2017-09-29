const levelup = require('levelup')
const encode = require('encoding-down')

function packager (leveldown) {
  function Level (location, options, callback) {
    if (typeof options === 'function')
      callback = options
    if (typeof options !== 'object' || options === null)
      options  = {}

    return levelup(encode(leveldown(location)), options, callback)
  }

  [ 'destroy', 'repair' ].forEach(function (m) {
    if (typeof leveldown[m] === 'function') {
      Level[m] = function (location, env, callback) {
        leveldown[m](location, env || 0, callback || function () {})
      }
    }
  })

  return Level
}

module.exports = packager
