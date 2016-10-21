export default class GridController {
    constructor(TILES_PER_ROW, InteractionService) {
        this.interactionService = InteractionService
            // prepare an array to generate the background tiles
            // (visual purpose only)
        this.completeGrid = new Array(TILES_PER_ROW * TILES_PER_ROW)
    }

    onSwipe(code) {
        //propagate the action code to the interactionservice's handler
        this.interactionService.receivedInteraction(code, true)
    }
}

GridController.$inject = ['TILES_PER_ROW', 'InteractionService']
