import angular from 'angular';
import AppStyles from './app.scss';

import GridComponent from './components/grid/grid-component.js';

export default angular.module("2048", [GridComponent.name]);
