import angular from 'angular'
import './swipe'

import InteractionService from './interaction-service.js'

export default angular.module('interaction', ['swipe'])
    .service('InteractionService', InteractionService)
    .constant('KEYS', {
        UP: 'up',
        DOWN: 'down',
        LEFT: 'left',
        RIGHT: 'right',
        ENTER: 'enter',
    })
