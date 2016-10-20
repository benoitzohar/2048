import angular from 'angular'

import InteractionService from './interaction-service.js'

export default angular.module('interaction', [])
    .service('InteractionService', InteractionService)
    .constant('KEYS', {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        ENTER: 'enter',
    })
