import angular from 'angular'
import AppStyles from './app.scss'

import GameComponent from './game/game-component.js'

export default angular.module("2048", [GameComponent.name])
    //Number of tiles per row and per column (since the grid is square)
    //if you change this value, make sure to change it in variables.scss as well
    .constant('TILES_PER_ROW', 5)
