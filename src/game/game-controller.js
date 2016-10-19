import GameModel from './game-model'

export default class GameController {
    constructor(InteractionService) {
        //create the game
        this.game = new GameModel()

        //add random tiles to the grid
        this.game.addRandomTiles(4) //TODO: randomize the defaut amount of tiles
    }

    addRandomTile() {
        this.game.addRandomTiles(1);
    }
}

GameController.$inject = ["InteractionService"];
