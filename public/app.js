'use strict';

var app = angular.module('hulkme', [
    'ui.router',
    'ngCookies',
    'ngFileUpload',
    
    'hulkme.controllers',
    'hulkme.services',
    'hulkme.filters',
    'hulkme.directives',
    
    'hulkme.admin',
    'hulkme.home'
]);

app.value('toastr', toastr);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider) {

    toastr.options = {
        "positionClass":"toast-top-right",
        "progressBar":false,
        "closeButton":true,
        "hideDuration":"300",
        "timeOut":"5000"
    };

    $urlRouterProvider.otherwise('/home');
    
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.interceptors.push('globalHttpInterceptor');
}])

app.run(['$rootScope', '$state', function ($rootScope, $state) {
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    //     var requireLogin = toState.authenticate;
    // 
    //     if (requireLogin && $rootScope.loggedIn === false) {
    //         event.preventDefault();
    //         $state.go('login');
    //     }
    });

}]);