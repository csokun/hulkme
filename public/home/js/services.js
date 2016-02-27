'use strict';

angular.module('hulkme.home.services', [])

.service('FileService', ['$http', 'toastr', function ($http, toastr) {
    this.getFiles = function () {
        return $http.get('/api/published')
            .success(function (files) {
                return files;
            }).error(function (err) {
                toastr.error(err.message);
            });
    };
}])
;