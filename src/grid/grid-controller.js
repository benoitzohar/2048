export default class GridController {
    constructor(TILES_PER_ROW) {
        // prepare an array to generate the background tiles
        // (visual purpose only)
        this.completeGrid = new Array(TILES_PER_ROW * TILES_PER_ROW)
    }
}

GridController.$inject = ['TILES_PER_ROW']
