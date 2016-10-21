export default class ScoreService {

    constructor($window) {
        this.$window = $window
        this.currentScore = 0
        this.bestScore = 0

        //try to read a previous best score from the localstorage
        if ($window.localStorage && $window.localStorage.score) {
            this.bestScore = $window.localStorage.score
        }
    }

    reset() {
        this.currentScore = 0
    }

    add(points) {
        this.currentScore += points

        //if the player had more than previously:
        //set the current score as the best one
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore

            //save the best score in localstorage if available
            if (this.$window.localStorage) {
                this.$window.localStorage.score = this.bestScore
            }
        }
    }


}

ScoreService.$inject = ['$window']
