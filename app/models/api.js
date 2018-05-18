'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  description: String,
  url: String,
  method: String,
  response_mock: Object,
  response_api_tree: Array,
  create_time: {
    type: Date,
    default: Date.now
  }
})

schema.index({ create_time: -1 }, { unique: true })

module.exports = mongoose.model('Api', schema)
