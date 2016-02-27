'use strict';

angular.module('hulkme.admin.directives', [])

.directive('hulkMeAdminFileList', function() {
    return {
        restrict: 'E',
        templateUrl: 'admin/views/hulk-me-admin-file-list.html',
        link: function(scope, element, attr) {
        }
    }
})

.directive('hulkMeEditFileModal', function(){
    return {
        restrict: 'E',
        templateUrl: 'admin/views/hulk-me-edit-file-modal.html',
        link: function (scope, element, attr) {
            
        }
    }
})
;