export default class TileModel {

    constructor(x = 0, y = 0, value = 2) {
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
