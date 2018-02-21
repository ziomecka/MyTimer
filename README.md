# MyTimer

JavaScript timer that does not rely on browsers, DOM, or any JavaScript framework.

## Versions

Versions available:
* ES6 with private members (see the [assumptions](#Assumptions)).

## Installation
_to be described_

<!-- For the MyTimer NPM module [https://github.com/jasmine/jasmine-npm](https://github.com/jasmine/jasmine-npm):
```bash
npm install mytimer
``` -->
## MyTimer's settings
User can either:
* pass no settings, then MyTimer will use the defaults,
* pass an object with required settings.

### Default settings
```JavaScript
  steps: {
    session: {
      value: 60000,
      units: "milliseconds"
    },
    interval: {
      value: 1,
      units: "milliseconds"
    }
  },
  countUnits: ["hours", "minutes", "seconds", "milliseconds"],
  direction: "down"
}
```
### Miscellaneous
* MyTimer accepts in "countUnits" any combination of units, e.g.
```JavaScript
countUnits: ["hours", "milliseconds"]
```
* MyTimer counts either "up" or "down".

## MyTimer's methods
_to be described_

## MyTimer's events
_to be described_

## Examples
### Initialise and start timer
```JavaScript
const timer = new MyTimer();
timer.start();
```
### Decrease "session" step
```JavaScript
timer.changeStep({
  step: "session",
  value: 1,
  units: "minutes",
  increment: 1,
  sign: -1
});
```
### Subscribe to "sessionStopped" event
```JavaScript
let listner;
let sessionStopped =  timer.event.subscribe(listener, "sessionStopped", "stopped");
```
### Unsubscribe from "sessionStopped" event
```JavaScript
sessionStopped.remove();
```

## Questions and support

* For questions and support please send an email to: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

## Maintainer

* [Katarzyna Ziomek-Zdanowicz](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

## Why did I create MyTimer?

I'm a novice JavaScript developer. I coded MyTimer to present my skills and knowledge of:
* JavaScript (ES5 and ES6),
* tools and frameworks: jshint, babel, karma, jasmine, webpack, github, npm.
Moreover, I'm familar with: HTML, CSS, WordPress, AngularJS.
If you want to learn more about me please visit:  [https://letsbitebytes.com](https://letsbitebytes.com)
or just write to me: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

I'm looking for __employement opportunities__. If you are interested in employing me please send an email to: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

### Assumptions

I coded:
* object oriented application
* private members that can be trusted (achieved not only by the underscore prefix)
* ES6 code
* timer that changes dynamically depending on the received settings

## Acknowledgments

To achieve the private memebers I used Philip Walton's technique:  [https://philipwalton.com/articles/implementing-private-and-protected-members-in-JavaScript/](https://philipwalton.com/articles/implementing-private-and-protected-members-in-JavaScript/)

## License

Copyright (c) 2018 Katarzyna Ziomek-Zdanowicz. This software is licensed under the MIT License.
