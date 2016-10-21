import _random from 'lodash/random'
import _sample from 'lodash/sample'
import _inRange from 'lodash/inRange'
import _sumBy from 'lodash/sumBy'
import _sortBy from 'lodash/sortBy'
import _last from 'lodash/last'

class GridModel {

    constructor(TileModel, TILES_PER_ROW) {
        this.TILES_PER_ROW = TILES_PER_ROW
        this.TileModel = TileModel

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

    /**
     *  removeTileFromMap(TileModel tile)
     *  removes a tile from the map
     **/
    removeTileFromMap(tile) {

        //remove the  tile from the map
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
        return Math.pow(this.TILES_PER_ROW, 2) - this.tiles.size > 0
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
            let x, y
            do {
                x = _random(0, this.TILES_PER_ROW - 1)
                y = _random(0, this.TILES_PER_ROW - 1)
            } while (!this.slotIsFree(x, y))

            //get a random value between 2 and 4 but that has 4 times
            // more chances to be a 2 than 4
            const value = _sample([2, 2, 2, 2, 4])

            this.createTile(x, y, value)
        }
        return true
    }

    /**
     *  moveTiles(String axis, Int direction)
     *  moves all the "moveable" tiles in the proper direction
     *      axis: 'x' or 'y'
     *      direction : -1 for "negative" move & 1 for "positive" move
     *  returns new points made by the player move
     **/
    moveTiles(axis, direction) {

        let points = 0

        let firstCoord = direction > 0 ? this.TILES_PER_ROW - 1 : 0
        let lastCoord = firstCoord == 0 ? this.TILES_PER_ROW : -1

        for (let i = 0; i < this.TILES_PER_ROW; i++) {

            let referenceTile
            for (let j = firstCoord; j != lastCoord; j = j + 1 * -direction) {

                //get actual coordonnates
                let [curX, curY] = axis == 'x' ? [j, i] : [i, j]

                let tile = this.getTileAtPosition(curX, curY)

                //if we found a tile at the current position
                if (tile) {

                    //if we already met a tile in this line
                    if (referenceTile) {
                        //if the value of the 2 tiles are the same:
                        if (referenceTile.value === tile.value) {
                            //merge them
                            this.mergeTiles(referenceTile, tile)

                            //add points
                            points += tile.value

                            //save the tile as the reference tile for this line
                            referenceTile = tile
                        }
                        //otherwise move the tile to the closer position
                        else {
                            //calculate the new position
                            let [newX, newY] = [referenceTile.x, referenceTile.y]

                            if (axis == 'x') {
                                newX -= direction
                            } else {
                                newY -= direction
                            }

                            //actually move the tile
                            this.moveTile(tile, newX, newY)

                            //save the tile as the reference tile for this line
                            referenceTile = tile
                        }
                    }
                    //if there is no referenceTile, move it to 0
                    // -> the moveTile method will take care of making sure
                    //    there's an actual move to make
                    else {
                        let baseValue = direction > 0 ? this.TILES_PER_ROW - 1 : 0
                        let [newX, newY] = axis == 'x' ? [baseValue, i] : [i, baseValue]

                        //actually move the tile
                        this.moveTile(tile, newX, newY)

                        //save the tile as the reference tile for this line
                        referenceTile = tile
                    }


                }
            }


        }
        return points
    }

    moveTile(tile, x, y) {

        //ensure that we never go off grid
        const isInRange = _inRange(x, 0, this.TILES_PER_ROW) && _inRange(y, 0, this.TILES_PER_ROW)

        //if the tile exists, is moving and the destination is free and in range
        if (tile && (tile.x !== x || tile.y !== y) && isInRange && this.slotIsFree(x, y)) {

            //update the local map
            this.removeTileFromMap(tile)

            //update tile infos
            tile.setCoords(x, y)

            //update the local map
            this.addTileToMap(tile)

        }
    }

    mergeTiles(originTile, mergingTile) {
        if (originTile && mergingTile) {
            //delete the original tile
            this.removeTileFromMap(originTile)

            //move the mergingTile to at the original tile's position
            this.moveTile(mergingTile, originTile.x, originTile.y)

            //multiply the value of the mergin tile
            mergingTile.power()

        }
    }

    getBiggerTileValue() {
        return _last(_sortBy(Array.from(this.tiles.values()), 'value')).value
    }


}

//This part is necessary to use our model class as a factory
export default ['TileModel', 'TILES_PER_ROW', (TileModel, TILES_PER_ROW) => {
    return () => new GridModel(TileModel, TILES_PER_ROW)
}]
