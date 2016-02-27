'use strict';

angular.module('hulkme.home', [
    'hulkme.home.controllers',
    'hulkme.home.services',
    'hulkme.home.directives'
]);

angular.module('hulkme.home').config(['$stateProvider', function ($stateProvider) {
	
    $stateProvider
    .state('home', {
        'url': '/',
        template: '<div ui-view></div>',
        abstract: true
    })
    .state('home.index', {
        'url': 'home',
        templateUrl: 'home/views/index.html',
        controller: 'HomeCtrl',
        authenticate: true
    })
    ;
    
}]);