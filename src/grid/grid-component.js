import angular from 'angular'
import ngAnimate from 'angular-animate'

import MapToArrayFilter from '../shared/maptoarray-filter'

import GridController from './grid-controller.js'
import GridModel from './grid-model.js'
import GridTemplate from './grid-template.html'
import GridStyles from './grid-styles.scss'

import TileComponent from '../tile/tile-component.js'

export default angular.module('grid', [TileComponent.name, MapToArrayFilter.name, ngAnimate])
    .factory("GridModel", GridModel)
    .component("gridComponent", {
        bindings: {
            grid: '<'
        },
        controller: GridController,
        templateUrl: GridTemplate
    })
