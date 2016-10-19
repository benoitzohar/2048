export default class TileController {
    constructor() {
        if (this.model) {
            this.classes = {
                'tile': true,
                [`tile__${this.model.x}-${this.model.y}`]: true
            }

            this.value = this.model.value
        }
    }

}
