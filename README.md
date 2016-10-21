# 2048
The famous 2048 game written with Angular 1.5 & ES6.

Disclaimer
---------

This game is a clone of the awesome [2048 Game](https://gabrielecirulli.github.io/2048/) by [Gabriele Cirulli](http://gabrielecirulli.com) which is based on [1024](https://itunes.apple.com/us/app/1024!/id823499224) by Veewo Studio and conceptually similar to [Threes](http://asherv.com/threes/) by Asher Vollmer.  
This project is just a display of my personal skills and does not intend to steal
anybody's work.

Building this app
-----------------

The game is bundled using webpack and has a low footprint (~ 100Kb minified & gziped)
- I used Sass to write efficient & customizable styles
- I used babel to convert my code to compatible JS
- Every part of the app is an angular component
- Tests are launched with KarmaJS, Jasmine & PhantomJS (see `karma.cong.js`)
- I chose not to use a CSS framework, to show my CSS skills & to lower the footprint
- I wrote components CSS classes as [BEM](http://getbem.com/)
- The app is compatible with modern browsers
- The font used is [Quicksand](https://fonts.google.com/specimen/Quicksand) and is loaded from Google font's CDN

How to use
---------

Visit [benoitzohar.github.io/2048](https://benoitzohar.github.io/2048) to play the game.

To install it locally you can either clone this repository or download the zip from github.

Get started:

```
npm install
```

Launch in dev mode (requires `webpack-dev-server`) :
```
npm start
```

then open `http://localhost:8080/` in your browser or `http://localhost:8080/webpack-dev-server` to have auto-refresh.

Build minified version in `/dist` :
```
npm build
```

Launch the tests (requires `karma`) :
```
npm test
```
Launch the tests in TDD watching style :
```
npm test-watch
```
