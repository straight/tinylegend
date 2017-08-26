'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Player = mongoose.model('Player'),
  _ = require('lodash');


/**
 * Find player by id
*/ 
exports.player = function(req, res, next, id) {
  Player.load(id, function(err, player) {
    if (err) return next(err);
    if (!player) return next(new Error('Failed to load player ' + id));
    req.player = player;
    next();
  });
};


/**
 * Create a player
*/ 
exports.create = function(req, res) {
  var player = new Player(req.body);
  
  player.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the player'
      });
    }
    res.json(player);

  });
};


/**
 * Update a player
*/ 
exports.update = function(req, res) {
  var player = req.player;

  player = _.extend(player, req.body);

  player.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the player'
      });
    }
    res.json(player);

  });
};


/**
 * Delete a player
*/ 
exports.destroy = function(req, res) {
  var player = req.player;

  player.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the player'
      });
    }
    res.json(player);

  });
};


/**
 * Show a player
*/
exports.show = function(req, res) {
  res.json(req.player);
};
  

/**
 * List of Players
 */
exports.all = function(req, res) {
  Player.find().sort('-lv').exec(function(err, players) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the players'
      });
    }
    res.json(players);

  });
};
