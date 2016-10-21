import gameModelFactory from '../../src/game/game-model'
import gridModelFactory from '../../src/grid/grid-model'
import ScoreService from '../../src/score/score-service'

const KEYS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    ENTER: 'enter',
}

const STATES = {
    INGAME: 0,
    LOST: 1,
    WON: 2
}


let gridCreatorFactory = gridModelFactory[gridModelFactory.length - 1]
let gridCreator = (TileModel, TILES_PER_ROW) => gridCreatorFactory(TileModel, TILES_PER_ROW)()

let modelCreatorFactory = gameModelFactory[gameModelFactory.length - 1]
let modelCreator = (GridModel, ScoreService, KEYS) => modelCreatorFactory(GridModel, ScoreService, KEYS)()


describe('Model: Game', () => {


    //init the model
    let model = modelCreator(gridCreator, new ScoreService(window), KEYS)

    it('should be initializable', () => {
        expect(model).not.toBeUndefined()
        expect(model).not.toBeNull()
    })

    it('should initialize default values', () => {
        expect(model.KEYS).toBe(KEYS)
        expect(model.GridModel).not.toBeUndefined()
        expect(model.score).not.toBeUndefined()
        expect(typeof model.score).toBe('object')
    })

    it('should start the game', () => {
        model.startGame()

        expect(model.grid).not.toBeUndefined()
        expect(model.score.currentScore).toBe(0)
        expect(model.state).toBe(STATES.INGAME)

    })

    it('should stop the game after losing', () => {
        model.stopGame(false)

        expect(model.state).toBe(STATES.LOST)
    })

    it('should stop the game after winning', () => {
        model.stopGame(true)

        expect(model.state).toBe(STATES.WON)
    })

    it('should get the current state if lost', () => {
        model.stopGame(false)

        expect(model.isLost()).toBe(true)
        expect(model.isWon()).toBe(false)
    })

    it('should get the current state if won', () => {
        model.stopGame(true)

        expect(model.isLost()).toBe(false)
        expect(model.isWon()).toBe(true)
    })

    it('should start the game when pressing enter', () => {
        model.onAction(KEYS.ENTER)

        expect(model.state).toBe(STATES.INGAME)
    })



})
