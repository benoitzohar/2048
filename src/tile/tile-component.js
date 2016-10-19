import angular from 'angular'

import TileController from './tile-controller.js'
import TileModel from './tile-model.js'
import TileTemplate from './tile-template.html'
import TileStyles from './tile-styles.scss'

export default angular.module('tile', [])
    .component("tileComponent", {
        bindings: {
            model: '<'
        },
        controller: TileController,
        templateUrl: TileTemplate
    })
