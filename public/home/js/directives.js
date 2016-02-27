'use strict';

angular.module('hulkme.home.directives', [])

.directive('hulkMeFileList', function() {
    return {
        restrict: 'E',
        templateUrl: 'home/views/hulk-me-file-list.html',
        link: function(scope, element, attr) {
        }
    }
})
;