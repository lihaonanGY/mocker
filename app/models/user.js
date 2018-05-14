'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: String,
  password: String,
  nick_name: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ username: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
