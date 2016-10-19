/**
 *  Helpers: a collection of general functions that are used in the app
 **/

export function randomInt(from = 0, to = 99) {
    return Math.floor((Math.random() * to) + 1) + from //TODO: write Test & check why there is never 0
}
