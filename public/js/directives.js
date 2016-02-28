'use strict';

angular.module('hulkme.directives', [])

.directive('hulkMeNavbar', ['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'views/hulk-me-navbar.html',
        scope: {},
        link: function(scope, element, attr) {
            $rootScope.$watch('loggedIn', function(n, o) {
                console.log(n, o);
                scope.isLoggedIn = n;
            });
            
            scope.isLoggedIn = false;
            
            scope.logout = function () {
                console.log('logout');
                $rootScope.loggedIn = false;
            }
            
            scope.login = function () {
                console.log('login');
                $rootScope.loggedIn = true;
            }
            
        }
    }
}])

.directive('hulkMeBlockUi', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/hulk-me-block-ui.html',
    link: function($scope, $element, attrs) {
      var show = function(result) {
        jQuery('body').css({ 'overflow': 'hidden' });
        $('#blockUI').width($(window).width()).height($(window).height());
        jQuery('#blockUI').addClass('active');
      };

      var hide = function() {
        jQuery('#blockUI').removeClass('active');
        jQuery('#blockUI').addClass('disable');
        jQuery('body').css({ 'overflow': 'visible' });
      };

      $scope.$on('ajax:loading', show);
      $scope.$on('ajax:completed', hide);

      hide();
    }
  };
})

;