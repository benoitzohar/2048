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

            if (this.receivedInteraction(evt.which)) {
                //stop the propagation only if the interaction was handleds
                evt.preventDefault()
            }

        })
    }

    /**
     *  Handle the interaction and propagate
     *  returns true if the interaction was handled, false otherwise
     **/
    receivedInteraction(code, fromTouch = false) {

        let eventToPass
        switch (code) {
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

            //call the callbacks
            this.callbacks.forEach((callback) => callback(eventToPass, fromTouch))
            return true
        }
        return false
    }

}

InteractionService.$inject = ['$document', 'KEYS']
