'use strict';

var players = require('../controllers/players');


module.exports = function(Players, app, auth) {

  app.route('/players')
    .get(players.all)
      .post(auth.requiresLogin, players.create);
  app.route('/players/:playerId')
    .get(players.show)
    .put(auth.requiresLogin, players.update)
    .delete(auth.requiresLogin, players.destroy)
  
  // Finish with setting up the playerId param
  app.param('playerId', players.player);
};
