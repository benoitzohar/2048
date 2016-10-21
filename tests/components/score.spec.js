import ScoreService from '../../src/score/score-service'

describe('Service: Score', () => {

    //reset the localstorage
    if (window.localStorage) {
        window.localStorage.score = ''
    }

    //init the service
    let service = new ScoreService(window)

    it('should be initializable', () => {
        expect(service).not.toBeUndefined()
        expect(service).not.toBeNull()
    })

    it('should initialize default values', () => {
        expect(service.$window).not.toBeUndefined()
        expect(service.currentScore).toEqual(0)
        expect(service.bestScore).toEqual(0)
    })

    it('should add points properly', () => {
        service.add(10)
        expect(service.currentScore).toEqual(10)
        service.add(7)
        expect(service.currentScore).toEqual(17)
        expect(service.bestScore).toEqual(17)
    })

    it('should save the best score in localstorage', () => {
        expect(parseInt(service.$window.localStorage.score, 10)).toEqual(17)
    })

    it('should reset the current score & keep the best score', () => {
        service.reset()
        expect(service.currentScore).toBe(0)
        expect(service.bestScore).toBe(17)
    })

    it('should add points properly when have a bigger best score', () => {
        service.add(9)
        expect(service.currentScore).toBe(9)
        expect(service.bestScore).toBe(17)
    })

})
