'use strict';

angular.module('hulkme.admin.controllers', [])

.controller('AdminHomeCtrl', ['$scope', 'AdminFileService', 'AuthService',
 function($scope, AdminFileService, AuthService) {
    if (AuthService.redirectIfNotLoggedIn()) return;

    AdminFileService.getFiles().success(
        function(files) {
            $scope.files = files;
        });

    $scope.uploadFiles = function(files) {
        if (files == null || files === undefined) return;
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            AdminFileService.uploadFile(file)
                .success(function(f) {
                    $scope.files.push(f);
                });
        }
    };
    
    $scope.deleteFile = function(f) {
        AdminFileService.confirmDelete(f, function() {
            AdminFileService.deleteFile (f)
                .success(function(result) {
                    $('#file_' + f.fileId).remove();
                });
        });
    };
    
    $scope.isDirty = function (f) {
        return (f._description != f.description || f._published != f.published) ? "": "disabled";    
    };
    
    $scope.updateFile = function (f) {
        AdminFileService.updateFile (f);
    };
}])

.controller('AdminLoginCtrl', ['$scope', 'AuthService', '$state',
function($scope, AuthService, $state) {
    $scope.login = function () {
        AuthService.login()
            .success(function() {
                $state.go('admin.home');
            })
    }
}])

.controller('AdminLogoutCtrl', ['$scope', 'AuthService', '$state', 
function($scope, AuthService, $state) {
    AuthService.logout();
    $state.go('home.index');
}])
;