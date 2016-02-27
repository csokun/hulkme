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

.directive('hulkMeConfirmDeleteModal', ['$rootScope', function($rootScope){
    return {
        restrict: 'E',
        templateUrl: 'admin/views/hulk-me-confirm-delete-modal.html',
        link: function(scope) {
            console.log('loaded confirm');

            $rootScope.$on('delete:confirm', function (event, data) {
                scope.file = data.file;
                // activate modal
                $('#deleteConfirmModal').modal({
                    onApprove: function() {
                        data.callback();
                    }
                });

                $('#deleteConfirmModal').modal('show');
            });
        }
    }
}])
;