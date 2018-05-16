'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  description: String,
  create_user: Object,
  create_time: {
    type: Date,
    default: Date.now
  },
  is_public: Boolean,
  members: []
})

schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('Project', schema)
