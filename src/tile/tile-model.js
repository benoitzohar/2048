class TileModel {

    constructor(x, y, value) {
        //save positions for the tile
        this.x = x
        this.y = y

        //default value is 2
        this.value = value
    }

    /**
     * power()
     * Multiply the value by 2
     **/
    power() {
        this.value *= 2
    }

}

//This part is necessary to use our model class as a factory
export default () => {
    return (x = 0, y = 0, value = 2) => new TileModel(x, y, value)
}
