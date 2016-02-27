'use strict';

angular.module('hulkme.admin.services', [])

.factory('AuthService', ['$cookies', '$state', function($cookies, $state) {
    return {
        redirectIfNotLoggedIn: function () {
            if ($cookies.getObject('user') === undefined) {
                $state.go('admin.login');
                return true;
            }
            return false;
        }
    };
}])

.service('AdminFileService', ['$http', 'toastr', '$rootScope',
function($http, toastr, $rootScope) {
    
    this.confirmDelete = function(f, callback) {
      var data = {
        file: f,
        "callback": callback
      };
      $rootScope.$broadcast('delete:confirm', data);
    };
    
    this.getFiles = function () {
        return $http.get('/api/files')
            .success(function(files) {
                // to support dirty check ;)
                files.forEach(function(f) {
                   f._description = f.description;
                   f._published = f.published; 
                });
                return files;
            }).error(function(err) {
                toastr.error(err.message);
            });
    };
    
    this.uploadFile = function (f) {
        var fd = new FormData();
        fd.append('file', f);
        
        return $http.post('/api/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (data) {
            return data;
        }).error(function(err) {
            toastr.error(err.message);
        });  
    };
    
    this.updateFile = function (f) {
        var payload = {
            description: f.description,
            published: f.published
        };
        
        return $http.post('/api/file/' + f.fileId, angular.toJson(payload), 
            {headers: {'Content-Type': 'application/json'}})
            .success(function (result) {
                // copy new value to shawdow properties
                f._description = f.description;
                f._published = f.published;
                toastr.success(result.message);
            }).error(function (err) {
                toastr.error(err.message);
            });
    };
    
    this.deleteFile = function (f) {
        return $http.delete('/api/file/' + f.fileId)
            .success(function(result) {
                return result;
            }).error(function(err) {
                toastr.error(err.message);
            });
    }
    
}])
;