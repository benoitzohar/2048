import angular from 'angular';

import ScoreController from './score-controller.js';
import ScoreService from './score-service.js';
import ScoreTemplate from './score-template.html';
import ScoreStyles from './score-styles.scss';


export default angular.module('score', [])
    .service('ScoreService', ScoreService)
    .component('scoreComponent', {
        controller: ScoreController,
        templateUrl: ScoreTemplate
    });
