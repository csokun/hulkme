'use strict';
angular.module('hulkme.filters', [])

.filter('humanizer', function() {
    return function (size) {
        if (size === undefined) return 'unkown';
        var i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }
});