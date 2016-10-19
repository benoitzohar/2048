class GameModel {

    constructor(GridModel) {
        this.grid = GridModel()

    }

    addRandomTiles(count) {
        this.grid.addRandomTiles(count)
    }
}

//This part is necessary to use our model class as a factory
export default ['GridModel', (GridModel) => {
    return () => new GameModel(GridModel)
}]
