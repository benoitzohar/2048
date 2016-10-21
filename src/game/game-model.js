const STATES = {
    INGAME: 0,
    LOST: 1,
    WON: 2
}

class GameModel {

    constructor(GridModel, ScoreService, KEYS) {
        this.GridModel = GridModel
        this.KEYS = KEYS

        this.score = ScoreService;
    }

    startGame() {
        //init all variables
        this.grid = this.GridModel()
        this.score.reset()
        this.state = STATES.INGAME

        //add 2 random tiles to the grid to start
        this.grid.addRandomTiles(2)
    }

    stopGame(won = false) {

        if (won) {
            //The player has won !

            //update the state of the game
            this.state = STATES.WON
        } else {
            //The player has lost.

            //update the state of the game
            this.state = STATES.LOST
        }
    }

    isLost() {
        return this.state == STATES.LOST
    }
    isWon() {
        return this.state == STATES.WON
    }

    onAction(action) {
        switch (action) {
            case this.KEYS.UP:
                this.move('y', -1)
                break
            case this.KEYS.DOWN:
                this.move('y', 1)
                break
            case this.KEYS.LEFT:
                this.move('x', -1)
                break
            case this.KEYS.RIGHT:
                this.move('x', 1)
                break
            case this.KEYS.ENTER:
                //restart the game at any moment
                this.startGame()
                break
        }
    }

    move(axis, direction) {

        //ensure the player is playing
        if (this.state == STATES.INGAME) {

            //move the tiles & merge, capture the points
            let points = this.grid.moveTiles(axis, direction)

            //add a random tile
            this.grid.addRandomTiles(1)

            //update the general score
            this.score.add(points)

            //check if we met the target (2048)
            if (this.grid.getBiggerTileValue() == 2048) {
                this.stopGame(true)
            }
            //ensure the grid is not full
            else if (!this.grid.slotsLeft()) {
                this.stopGame(false)
            }
        }

    }



}

//This part is necessary to use our model class as a factory
export default ['GridModel', 'ScoreService', 'KEYS', (GridModel, ScoreService, KEYS) => {
    return () => new GameModel(GridModel, ScoreService, KEYS)
}]
