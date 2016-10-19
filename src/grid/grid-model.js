import {
    randomInt
} from '../helpers'
import TileModel from '../tile/tile-model'

export default class GridModel {

    constructor() {
        this.tiles = []
    }

    createTile(x, y, value) {
        this.tiles.push(
            new TileModel(x, y, value)
        )
        console.log("[debug] this.tiles", this.tiles);
    }

    addRandomTiles(count) {
        for (let i = 0; i < count; i++) {
            this.createTile(randomInt(0, 4), randomInt(0, 4), 2) //TODO: add TILES_PER_ROW constant here.
        }
    }

    move(axis, direction) {
        console.log("[debug] move", axis, direction);
    }
}
