import gridModelFactory from '../../src/grid/grid-model'
import tileModelFactory from '../../src/tile/tile-model'

//mock map
window.Map = () => {
    let obj = {}
    return {
        set: function(a, b) {
            obj[a] = b
            this.size++
        },
        get: (a) => obj[a],
        delete: function(a) {
            delete obj[a]
            this.size--
        },
        has: (a) => !!obj[a],
        values: () => {
            let v = []
            for (var k in obj) {
                v.push(obj[k])
            }
            return v
        },
        size: 0
    }
}

//mock array from
window.Array.from = (a) => a

let modelCreatorFactory = gridModelFactory[gridModelFactory.length - 1]
let modelCreator = (TileModel, TILES_PER_ROW) => modelCreatorFactory(TileModel, TILES_PER_ROW)()

let tileCreator = tileModelFactory()

describe('Model: Grid', () => {
    let model
    beforeEach(() => {
        model = modelCreator(tileCreator, 4)
    })


    it('should be initializable', () => {
        expect(model).not.toBeUndefined()
        expect(model).not.toBeNull()
    })

    it('should initialize default values', () => {
        expect(model.TILES_PER_ROW).toBe(4)
        expect(model.TileModel).not.toBeUndefined()
        expect(model.tiles).not.toBeUndefined()
        expect(typeof model.tiles).toBe('object')
    })

    it('should return a string from the coords', () => {
        expect(model.getMapIndexFromPositions(1, 2)).toBe('1-2')
        expect(model.getMapIndexFromPositions(4, 2)).toBe('4-2')
    })

    it('should add a tile to the map from properties', () => {
        model.createTile(1, 1, 4)
        expect(model.tiles.size).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).x).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).y).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).value).toBe(4)
    })

    it('should add a tile to the map from object', () => {
        model.addTileToMap(tileCreator(1, 1, 4))
        expect(model.tiles.size).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).x).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).y).toBe(1)
        expect(model.tiles.get(model.getMapIndexFromPositions(1, 1)).value).toBe(4)
    })

    it('should remove a tile from the map', () => {
        let tile = tileCreator(1, 1, 4)
        model.addTileToMap(tile)

        model.removeTileFromMap(tile)
        expect(model.tiles.size).toBe(0)
    })

    it('should return a tile at position', () => {
        let tile = tileCreator(1, 1, 4)
        model.addTileToMap(tile)

        expect(model.getTileAtPosition(1, 1)).toBe(tile)
    })

    it('should check if a slot is free', () => {
        let tile = tileCreator(1, 1, 4)
        model.addTileToMap(tile)

        expect(model.slotIsFree(1, 1)).toBe(false)
        expect(model.slotIsFree(2, 1)).toBe(true)
    })

    it('should return if there are free slots', () => {

        model.addTileToMap(tileCreator(1, 1, 4))
        expect(model.slotsLeft()).toBe(true)

        model = modelCreator(tileCreator, 2)
        model.addTileToMap(tileCreator(0, 0, 4))
        model.addTileToMap(tileCreator(0, 1, 4))
        model.addTileToMap(tileCreator(1, 0, 4))
        model.addTileToMap(tileCreator(1, 1, 4))
        expect(model.slotsLeft()).toBe(false)
    })

    it('should add random tiles', () => {
        model.addRandomTiles(2)
        expect(model.tiles.size).toBe(2)

        //fill the grid
        model.addRandomTiles(14)
        expect(model.tiles.size).toBe(16)
        expect(model.slotsLeft()).toBe(false)
    })

    it('should move in the right direction', () => {
        let tile = tileCreator(0, 1, 4)
        model.addTileToMap(tile)

        //move down
        model.moveTiles('y', 1)
        expect(model.getTileAtPosition(0, 3)).toBe(tile)

        //move right
        model.moveTiles('x', 1)
        expect(model.getTileAtPosition(3, 3)).toBe(tile)

        //move up
        model.moveTiles('y', -1)
        expect(model.getTileAtPosition(3, 0)).toBe(tile)

        //move left
        model.moveTiles('x', -1)
        expect(model.getTileAtPosition(0, 0)).toBe(tile)

    })

    it('should merge tiles of same values', () => {
        model.addTileToMap(tileCreator(0, 1, 2))
        model.addTileToMap(tileCreator(0, 2, 2))

        model.moveTiles('y', 1)
        expect(model.getTileAtPosition(0, 3).value).toBe(4)
    })

    it('should not merge tiles of different values', () => {
        model.addTileToMap(tileCreator(0, 1, 2))
        model.addTileToMap(tileCreator(0, 2, 4))

        model.moveTiles('y', 1)
        expect(model.getTileAtPosition(0, 2).value).toBe(2)
        expect(model.getTileAtPosition(0, 3).value).toBe(4)
    })

    it('should return the biggest value', () => {
        model.addTileToMap(tileCreator(0, 1, 2))
        model.addTileToMap(tileCreator(2, 2, 6))
        model.addTileToMap(tileCreator(0, 2, 4))

        expect(model.getBiggerTileValue()).toBe(6)
    })

})
