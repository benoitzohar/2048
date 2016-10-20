export default class GameController {
    constructor(GameModel, InteractionService, $scope) {

        //create the game
        this.game = new GameModel()

        //register interactions
        InteractionService.register((action) => {
            //apply to the scope because keyboard inputs do not
            //trigger a digest cycle
            $scope.$apply(() => this.game.onAction(action))
        })

        //start the game for the first time
        this.newGame()
    }

    newGame() {
        //start the game
        this.game.startGame()
    }
}

GameController.$inject = ['GameModel', 'InteractionService', '$scope']
