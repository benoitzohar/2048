import tileModelFactory from '../../src/tile/tile-model'

let modelCreator = tileModelFactory()

describe('Model: Tile', () => {
    let model
    beforeEach(() => {
        model = modelCreator()
    })


    it('should be initializable', () => {
        expect(model).not.toBeUndefined()
        expect(model).not.toBeNull()
    })

    it('should initialize default values', () => {
        model = modelCreator(1, 1, 2)
        expect(model.id).not.toBeUndefined()
        expect(model.x).toBe(1)
        expect(model.y).toBe(1)
        expect(model.value).toBe(2)

        model = modelCreator(0, 4242, 127)
        expect(model.id).not.toBeUndefined()
        expect(model.x).toBe(0)
        expect(model.y).toBe(4242)
        expect(model.value).toBe(127)
    })

    it('should update the coords', () => {
        model.setCoords(23, 42)
        expect(model.x).toBe(23)
        expect(model.y).toBe(42)
    })

    it('should have a unique ID', () => {
        let ids = {}
        for (let i = 0; i < 1000; i++) {
            model = modelCreator(1, 1, 2)
            ids[model.id] = true
        }
        expect(Object.keys(ids).length).toBe(1000)
    })

    it('should power the value', () => {
        model = modelCreator(1, 1, 2)
        model.power()
        expect(model.value).toBe(4)
        model.power()
        expect(model.value).toBe(8)
        model.power()
        expect(model.value).toBe(16)

        model = modelCreator(1, 1, 3)
        model.power()
        expect(model.value).toBe(6)
        model.power()
        expect(model.value).toBe(12)
        model.power()
        expect(model.value).toBe(24)
    })




})
