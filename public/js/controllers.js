'use strict';

angular.module('hulkme.controllers', [])

.controller('RootCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    $rootScope.openModal = function(modalName, data) {
        while(jQuery('.modal.'+modalName).length > 1) {
            jQuery('.modal.'+modalName).get(0).remove();
        }
        
        jQuery('.modal.'+ modalName)
        .modal({ onApprove: function() { return false;}, closable: false })
        .modal('show');
        
        // clear form inside popup
        $('.' + modalName + ' form').removeClass('error');
        $('.' + modalName + ' div[class^="field"]').removeClass('error');
        $rootScope.$broadcast('modal:'+ modalName +':opened', data);
    };
    
    // if(user != undefined) {
    //     $rootScope.loggedIn = true
    //     
    //     var authToken = authr.getToken();
    //     $http.defaults.headers.common['Authorization'] = "Token " + user['userId'] + ":" + authToken;
    // }
}])
;

