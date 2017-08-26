'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'system/views/index.html'
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'system/views/intro.html'
      })
      .state('hall', {
        url: '/hall',
        templateUrl: 'system/views/hall.html'
      })
      .state('rank', {
        url: '/players/rank',
        templateUrl: 'system/views/rank.html'
      })
      .state('create player', {
        url: '/players/create',
        templateUrl: 'system/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit player', {
        url: '/players/:playerId/edit',
        templateUrl: 'system/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('player by id', {
        url: '/players/:playerId',
        templateUrl: 'players/views/view.html'
      });

  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
