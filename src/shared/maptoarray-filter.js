/**
 *  Transforms a Map into an array, and organize it by id (to )
 *  Inspired by  the filter at https://github.com/petebacondarwin/angular-toArrayFilter
 *  use this to ng-repeat on a Map
 **/

import angular from 'angular'
import _sortBy from 'lodash/sortBy'

export default angular.module('MapToArrayFilter', [])

.filter('mapToArray', () => function(obj) {

    if (!angular.isObject(obj) || !obj.get) {
        return []
    }

    //extract array from the Map
    let res = Array.from(obj.values())

    //sort the array by unique identifier to avoid ng-repeat reorganizing the DOM
    //and thus messing with our css transitions
    res = _sortBy(res, 'id')

    return res
})
