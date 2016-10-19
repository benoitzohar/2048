import GridModel from '../grid/grid-model'

export default class GameModel {

    constructor() {
        this.grid = new GridModel()

    }

    addRandomTiles(count) {
        console.log("[debug] count", count);
        this.grid.addRandomTiles(count);
    }
}
