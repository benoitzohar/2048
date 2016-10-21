export default class ScoreController {
    constructor(ScoreService) {
        this.service = ScoreService
    }

}

ScoreController.$inject = ['ScoreService']
