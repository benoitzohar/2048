import angular from 'angular';

import ModalTemplate from './modal-template.html';
import ModalStyles from './modal-styles.scss';

export default angular.module('modal', [])
    .component('modalComponent', {
        bindings: {
            title: '@',
            content: '@',
            action: '@',
            actionHandler: '&'
        },
        templateUrl: ModalTemplate
    });
