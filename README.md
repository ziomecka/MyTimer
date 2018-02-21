# MyTimer

JavaScript timer that does not rely on browsers, DOM, or any JavaScript framework.

## Documentation
_to be described_

<!-- Documentation is here: [http://jasmine.github.io](http://jasmine.github.io/) -->

## Versions

Versions available:
<!-- * ES6, -->
* ES6 with private members (please see the assumptions),


## Installation
_to be described_

<!-- For the MyTimer NPM module [https://github.com/jasmine/jasmine-npm](https://github.com/jasmine/jasmine-npm):
```bash
npm install mytimer
``` -->
## MyTimer's settings
### steps
object with keys:
#### session
object with keys: value and units
#### interval
object with keys: value and units
### countUnits
array that contains any combination of "hours", "minutes", "seconds", "milliseconds"
### direction
string: "down" or "up"

## MyTimer's methods
_to be described_

## MyTimer's events
_to be described_

## Examples
### Settings
```JavaScript
{
  steps: {
    session: {
      value: 5,
      units: "minutes"
    },
    interval: {
      value: 1,
      units: "milliseconds"
  }
  },
  countUnits: ["hours", "milliseconds"],
  direction: "up"
  }
}
```
<!-- ```JavaScript
// mytimer.conf.js
``` -->

## Support

* For questions and support please send an email to: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

## Maintainer

* [Katarzyna Ziomek-Zdanowicz](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

## Why did I create MyTimer?

I'm a novice JavaScript developer. I coded MyTimer to present my skills and knowledge of:
* JavaScript (ES5 and ES6),
* tools and frameworks: jshint, babel, karma, jasmine, webpack, github, npm.
Moreover, I'm familar with: HTML, CSS, WordPress.
If you want to learn more about me please visit:  [https://letsbitebytes.com](https://letsbitebytes.com)
or just write to me: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

I'm looking for __employement opportunities__. If you are interested in employing me please send an email to: [katarzyna.ziomek.zdanowicz@gmail.com](mailto:katarzyna.ziomek.zdanowicz@gmail.com)

### Assumptions

I coded:
* object oriented application
* private members that can be trusted (achieved not only by the underscore prefix)
* ES6 code
* timet that changes dynamically cdepending on the settings

## Acknowledgments

To achieve the private memebers I used Philip Walton's technique:  [https://philipwalton.com/articles/implementing-private-and-protected-members-in-JavaScript/](https://philipwalton.com/articles/implementing-private-and-protected-members-in-JavaScript/)

## License

Copyright (c) 2018 Katarzyna Ziomek-Zdanowicz. This software is licensed under the MIT License.
