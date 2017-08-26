'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  job: {
    type: String,
    required: true,
    trim: true
  },
  lv: Number,
  hp: Number,
  exp: Number,
  honor: Number
});

/**
 * Validations
 */


/**
 * Statics
 */
PlayerSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Player', PlayerSchema);
