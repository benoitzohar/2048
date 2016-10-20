export default class InteractionService {

    constructor($document, KEYS) {
        this.$document = $document
        this.KEYS = KEYS
        this.callbacks = []

        this.bindKeyboard()
    }

    register(callback) {
        this.callbacks.push(callback)
    }

    bindKeyboard() {

        this.$document.bind('keydown', (evt) => {

            let eventToPass
            switch (evt.which) {
                case 37:
                    eventToPass = this.KEYS.LEFT
                    break
                case 38:
                    eventToPass = this.KEYS.UP
                    break
                case 39:
                    eventToPass = this.KEYS.RIGHT
                    break
                case 40:
                    eventToPass = this.KEYS.DOWN
                    break
                case 13:
                    eventToPass = this.KEYS.ENTER
                    break
            }

            //if the key stroke was interesting for us
            if (eventToPass) {
                //stop the propagation
                evt.preventDefault()
                    //call the callbacks
                this.callbacks.forEach((callback) => callback(eventToPass))
            }
        })
    }

}

InteractionService.$inject = ['$document', 'KEYS']
