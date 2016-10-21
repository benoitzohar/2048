import angular from 'angular'

import TileModel from './tile-model.js'
import TileTemplate from './tile-template.html'
import TileStyles from './tile-styles.scss'

export default angular.module('tile', [])
    .factory('TileModel', TileModel)
    .component("tileComponent", {
        bindings: {
            model: '<'
        },
        templateUrl: TileTemplate
    })
