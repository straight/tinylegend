'use strict';

angular.module('mean.system').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Global', 'Players',
  function($scope, $stateParams, $location, Global, Players) {
    $scope.global = Global;

    $scope.hasAuthorization = function(player) {
      /*
      if (!player || !player.user) return false;
      return $scope.global.isAdmin || player.user._id === $scope.global.user._id;
      */
      return true;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var player = new Players({
          name: this.name,
          job: this.job,
          lv: this.lv,
          hp: this.hp,
          exp: this.exp,
          honor: this.honor
        });
        player.$save(function(response) {
          $location.path('players/' + response._id);
        });

        this.name = '';
        this.job = '';
        this.lv =0;
        this.hp = 20;
        this.exp = 0;
        this.honor = 0;
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(player) {
      if (player) {
        player.$remove();

        for (var i in $scope.players) {
          if ($scope.players[i] === player) {
            $scope.players.splice(i, 1);
          }
        }
      } else {
        $scope.player.$remove(function(response) {
          $location.path('players');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var player = $scope.player;
        if (!player.updated) {
          player.updated = [];
        }
        player.updated.push(new Date().getTime());

        player.$update(function() {
          $location.path('players/' + player._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Players.query(function(players) {
        $scope.players = players;
      });
    };

    $scope.findOne = function() {
      Players.get({
        playerId: $stateParams.playerId
      }, function(player) {
        $scope.player = player;
      });
    };
  }
]);
