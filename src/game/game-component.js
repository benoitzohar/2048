import angular from 'angular';

import GameController from './game-controller.js';
import GameModel from './game-model.js';
import GameTemplate from './game-template.html';
import GameStyles from './game-styles.scss';

import GridComponent from '../grid/grid-component.js';
import InteractionComponent from '../interaction/interaction-component.js';
import ScoreComponent from '../score/score-component.js';
import ModalComponent from '../shared/modal/modal-component.js';

export default angular.module('game', [GridComponent.name, InteractionComponent.name, ModalComponent.name, ScoreComponent.name])
    .factory('GameModel', GameModel)
    .component('gameComponent', {
        controller: GameController,
        templateUrl: GameTemplate
    });
