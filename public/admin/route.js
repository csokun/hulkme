'use strict';

angular.module('hulkme.admin', [
    'hulkme.admin.controllers',
    'hulkme.admin.services',
    'hulkme.admin.directives'
]);

angular.module('hulkme.admin').config(['$stateProvider', function ($stateProvider) {
	
    $stateProvider
    .state('admin', {
        'url': '/admin',
        template: '<div ui-view></div>',
        abstract: true
    })
    .state('admin.home', {
        'url': '/home',
        templateUrl: 'admin/views/home.html',
        controller: 'AdminHomeCtrl',
        authenticate: true
    })
    .state('admin.upload', {
        'url': '/upload',
        templateUrl: 'admin/views/upload.html',
        controller: 'AdminUploadCtrl',
        authenticate: true
    })
    .state('admin.login', {
        'url': '/login',
        templateUrl: 'admin/views/login.html',
        controller: 'AdminLoginCtrl',
        authenticate: false
    })
    .state('admin.logout', {
        'url': '/logout',
        controller: 'AdminLogoutCtrl',
        authenticate: true  
    })
    ;
    
}]);