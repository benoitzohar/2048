import angular from 'angular';

import GameController from './game-controller.js';
import GameModel from './game-model.js';
import GameTemplate from './game-template.html';
import GameStyles from './game-styles.scss';

import GridComponent from '../grid/grid-component.js';
import InteractionComponent from '../interaction/interaction-component.js';

export default angular.module('game', [GridComponent.name, InteractionComponent.name])
    .component("gameComponent", {
        controller: GameController,
        templateUrl: GameTemplate
    });
