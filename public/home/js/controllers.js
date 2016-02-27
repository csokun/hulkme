'use strict';

angular.module('hulkme.home.controllers', [])

.controller('HomeCtrl', ['$scope', 'FileService', function ($scope, FileService) {
   
   FileService.getFiles().success(function (files) {
        $scope.files = files;
    });
    
}])
;