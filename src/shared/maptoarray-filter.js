/**
 *  Transforms a Map into an array
 *  Inspired by  the filter at https://github.com/petebacondarwin/angular-toArrayFilter
 *  use this to ng-repeat on a Map
 **/

import angular from 'angular'

export default angular.module('MapToArrayFilter', [])

.filter('mapToArray', () => function(obj) {

    if (!angular.isObject(obj) || !obj.get) {
        return obj
    }
    return Array.from(obj.values())
})
