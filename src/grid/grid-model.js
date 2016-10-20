import _ from 'lodash'

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
        this.addTileToMap(new this.TileModel(x, y, value))
    }

    addTileToMap(tile) {
        this.tiles.set(this.getMapIndexFromPositions(tile.x, tile.y), tile)
    }

    removeTileFromMap(tile) {
        this.tiles.delete(this.getMapIndexFromPositions(tile.x, tile.y))
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
                x = _.random(0, this.TILES_PER_ROW - 1)
                y = _.random(0, this.TILES_PER_ROW - 1)
            } while (!this.slotIsFree(x, y))

            this.createTile(x, y, 2)
        }
        return true
    }

    /**
     *  moveTiles(String axis, Int direction)
     *  moves all the "moveable" tiles in the proper direction
     *      axis: 'x' or 'y'
     *      direction : -1 for "negative" move & 1 for "positive" move
     **/
    moveTiles(axis, direction) {
        console.log("[debug] moveTiles", axis, direction);

        let workingAxis = 'x'
        let firstCoord = 0
        let lastCoord = 5
        let processingFactor = 1

        for (let i = firstCoord; i != lastCoord; i = i + 1 * processingFactor) {

            let referenceTile
            for (let j = firstCoord; j != lastCoord; j = j + 1 * processingFactor) {
                //console.log("[debug] i,j=", i, j);

                let tile = this.getTileAtPosition(i, j)
                if (tile) {
                    this.moveTile(tile, i, j - 1)
                }
            }
        }


    }

    moveTile(tile, x, y) {
        console.log("[debug] moveTile", tile, x, y);
        //if the tile exists && the destination is free
        if (tile && _.inRange(x, 0, this.TILES_PER_ROW) && _.inRange(y, 0, this.TILES_PER_ROW) && this.slotIsFree(x, y)) {

            //update the local map
            this.removeTileFromMap(tile)

            //update tile infos
            tile.setCoords(x, y)

            //update the local map
            this.addTileToMap(tile)

            console.log("[debug] this.tiles", this.tiles.keys());

        }
    }

    mergeTiles(originTile, mergingTile) {
        if (originTile && mergingTile) {
            //multiply the value of the original tile
            originTile.power()

            //delete the mergin tile
            this.removeTileFromMap(mergingTile)
        }
    }

    getTilesSum() {
        return _.sumBy(Array.from(this.tiles.values()), 'value')
    }

    getBiggerTileValue() {
        return _.last(_.sortBy(Array.from(this.tiles.values()), 'value'))
    }


}

//This part is necessary to use our model class as a factory
export default ['TileModel', 'TILES_PER_ROW', (TileModel, TILES_PER_ROW) => {
    return () => new GridModel(TileModel, TILES_PER_ROW)
}]
