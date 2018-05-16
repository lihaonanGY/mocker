'use strict'

const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/mocker', {
  server: {
    poolSize: 20
  }
}, (err) => {
  if (err) {
    console.error('connect to %s error: ', 'mongodb://localhost:27017/mocker', err.message)
    process.exit(1)
  }
})

exports.User = require('./user')
exports.Project = require('./project')
