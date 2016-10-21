import _uniqueId from 'lodash/uniqueId'
import _toInteger from 'lodash/toInteger'

class TileModel {

    constructor(x, y, value) {

        //creates a unique identifier
        this.id = _toInteger(_uniqueId())

        //save positions for the tile
        this.setCoords(x, y)

        //default value is 2
        this.value = value
    }

    setCoords(x, y) {
        this.x = x
        this.y = y
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
