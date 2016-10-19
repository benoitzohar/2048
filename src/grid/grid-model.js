import _random from 'lodash/random'

class GridModel {

    constructor(TileModel, TILES_PER_ROW) {
        this.TILES_PER_ROW = TILES_PER_ROW
        this.TileModel = TileModel;
        this.tiles = new Map()
    }

    /**
     * slotgetMapIndexFromPositionsIsFree(Int x, Int y)
     * returns a string made of the 2 axis components
     **/
    getMapIndexFromPositions(x, y) {
        return `${x}-${y}`
    }

    createTile(x, y, value) {
        console.log("[debug] this.TileModel", this.TileModel);
        this.tiles.set(this.getMapIndexFromPositions(x, y), new this.TileModel(x, y, value))
    }

    /**
     *  getTileAtPosition(Int x, Int y)
     *  returns a TileModel object or null
     **/
    getTileAtPosition(x, y) {
        return this.tiles.get(this.getMapIndexFromPositions(x, y))
    }

    /**
     * slotIsFree(Int x, Int y)
     * returns a boolean: true if the slot is not taken by a tile
     **/
    slotIsFree(x, y) {
        return !this.tiles.has(this.getMapIndexFromPositions(x, y))
    }

    /**
     *  slotsLeft()
     *  returns the amount of free slots
     **/
    slotsLeft() {
        return Math.pow(this.TILES_PER_ROW, 2) - this.tiles.size > 0;
    }

    /**
     *  addRandomTiles(Int count)
     *  creates a defined number of random tiles if there is free slots
     *  returns a boolean defining if all the tiles could have been added or not
     **/
    addRandomTiles(count) {
        for (let i = 0; i < count; i++) {

            if (!this.slotsLeft()) {
                return false
            }
            let x, y;
            do {
                x = _random(0, this.TILES_PER_ROW - 1);
                y = _random(0, this.TILES_PER_ROW - 1);
            } while (!this.slotIsFree(x, y))

            this.createTile(x, y, 2)
        }
        return true
    }

    moveTiles(axis, direction) {
        console.log("[debug] moveTiles", axis, direction);
    }


}

//This part is necessary to use our model class as a factory
export default ['TileModel', 'TILES_PER_ROW', (TileModel, TILES_PER_ROW) => {
    return () => new GridModel(TileModel, TILES_PER_ROW)
}]
