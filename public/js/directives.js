'use strict';

angular.module('hulkme.directives', [])

.directive('hulkMeNavbar', ['$rootScope', 'jwt', function($rootScope, jwt) {
    return {
        restrict: 'E',
        templateUrl: 'views/hulk-me-navbar.html',
        scope: {},
        link: function(scope, element, attr) {
            $rootScope.$watch('loggedIn', function(n, o) {
                scope.isLoggedIn = n;
            });

            scope.isLoggedIn = false;
            
            scope.logout = function () {
                jwt.logout();
            }
            
            scope.login = function () {
                console.log('login');
                var data = {
                    callback: function (key) {
                        jwt.login(key);
                    }
                };
                $rootScope.$broadcast('login:clicked', data);
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

.directive('hulkMeLoginModal', ['$rootScope', function($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'views/hulk-me-login-modal.html',
        link: function(scope, element, att) {
            $rootScope.$on('login:clicked', function (event, data) {
                $('#loginModal').modal({closable: false,
                    onApprove: function() {
                        if(!$('form[name="loginform"]').form('validate form')) return;
                        var key = $('form[name="loginform"] input[name="passphrase"]').val();
                        data.callback(key);
                    }
                });
                
                $('#loginModal form').removeClass('error');
                $('form[name="loginform"]').form('clear');
                $('#loginModal').modal('show');
            });
        }
    }
}])
;