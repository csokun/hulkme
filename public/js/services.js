'use strict';
angular.module('hulkme.services', [])

.factory('_', ['$window', function($window) {
  return $window._;
}])

/*
 * httpErrorInterceptor: intercept all server error response message
 * and present it to end-user in a user-friendly fashion.
 */
.factory('globalHttpInterceptor', ['$q', '$rootScope', '$cookies', function ($q, $rootScope, $cookies) {
  var activeRequests = 0;
  
  var started = function() {
    if(activeRequests==0) {
      $rootScope.$broadcast('ajax:loading');
    }
    activeRequests++;
  };

  var ended = function() {
    activeRequests--;
    if(activeRequests==0) {
      $rootScope.$broadcast('ajax:completed');
    }
  };

  return {
    'request': function(config) {
      started();
      return config || $q.when(config);
    },

   'requestError': function(rejection) {
      ended();
      return $q.reject(rejection);
    },

    'response': function(response) {
      ended();
      return response || $q.when(response);
    },

   'responseError': function(rejection) {
      ended();
      return $q.reject(rejection);
    }
  };

}])

;