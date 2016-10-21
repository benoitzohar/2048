import InteractionService from '../../src/interaction/interaction-service'
const KEYS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    ENTER: 'enter',
}


describe('Service: Interaction', () => {

    //init the service
    let service = new InteractionService({
        bind: () => {}
    }, KEYS)

    it('should be initializable', () => {
        expect(service).not.toBeUndefined()
        expect(service).not.toBeNull()
    })

    it('should initialize default values', () => {
        expect(service.$document).not.toBeUndefined()
        expect(service.KEYS).not.toBeUndefined()
        expect(service.KEYS).toBe(KEYS)
        expect(typeof service.callbacks).toBe('object')
        expect(service.callbacks.length).toBe(0)
    })

    let actualResult1, actualResult2
    let fakeCallback1 = (event, fromTouch) => {
        actualResult1 = event
    }
    let fakeCallback2 = (event, fromTouch) => {
        actualResult2 = event
    }


    it('should register a callback', () => {
        service.register(fakeCallback1)
        expect(service.callbacks.length).toBe(1)
    })
    it('should register another callback', () => {
        service.register(fakeCallback2)
        expect(service.callbacks.length).toBe(2)
    })

    it('should propagate LEFT key properly', () => {
        let res = service.receivedInteraction(37)
        expect(actualResult1).toBe(KEYS.LEFT)
        expect(actualResult2).toBe(KEYS.LEFT)
        expect(res).toBe(true)
    })

    it('should propagate UP key properly', () => {
        let res = service.receivedInteraction(38)
        expect(actualResult1).toBe(KEYS.UP)
        expect(actualResult2).toBe(KEYS.UP)
        expect(res).toBe(true)
    })

    it('should propagate RIGHT key properly', () => {
        let res = service.receivedInteraction(39)
        expect(actualResult1).toBe(KEYS.RIGHT)
        expect(actualResult2).toBe(KEYS.RIGHT)
        expect(res).toBe(true)
    })

    it('should propagate DOWN key properly', () => {
        let res = service.receivedInteraction(40)
        expect(actualResult1).toBe(KEYS.DOWN)
        expect(actualResult2).toBe(KEYS.DOWN)
        expect(res).toBe(true)
    })

    it('should not propagate unknown key', () => {
        actualResult1 = null
        actualResult2 = null
        let res = service.receivedInteraction(36)
        expect(actualResult1).toBeNull()
        expect(actualResult2).toBeNull()
        expect(res).toBe(false)
    })


})
