import angular from 'angular';

import GridController from './grid-controller.js';
import GridService from './grid-service.js';
import GridTemplate from './grid-template.html';
import GridStyles from './grid-styles.scss';

export default angular.module('grid', [])
                .service("gridService", GridService)
                .component("gridComponent", {
                  controller: GridController,
                  templateUrl: GridTemplate
                });
