## Try it out

You can find Sight Snap at [https://tomcooke.me/sight-snap](https://tomcooke.me/sight-snap). Note that you can add the app to your phone home screen which will give you a bigger display area.

## The Game

Sight Snap is a simple game designed to be a fun way to improve your speed at recognizing note names read from a score using either the standard treble or bass clef. I created it for my own use but hopefully it'll be useful to someone else as well.

To play the game, match pairs of different tiles that represent the same note name. Some tiles contain representations of a note in the form of a note head drawn on a partial staff, other tiles contain a textual representation of the note. You can match a staff tile with a different staff tile (i.e. showing a different position of the same note name) or with a note name tile. The game is always finishable from any state!

Notes are drawn with an isolated note head. I've done this because a stem wouldn't really add anything and there's already quite a lot on the screen. I also only draw part of the main staff if there are ledger lines, as this is makes it possible to fit the diagram on a small tile. 

I would recommend starting with the default range (the smallest allowed range) and then gradually extending it only when you think you are recognizing notes instantly or almost instantly. If you're capable of getting times under 30 seconds that would be a good sign that you're ready to increase the range.

## Settings

This app has limited settings which I think are self explanatory. You can select the lower and higher ends of the range, fixed-do solfa symbols can be selected as an alternative to letters for note names, and there's a dark mode. These settings are saved in local storage on your browser and not sent to my server, which only serves static files.

## Development

Sight Snap is just a collection of static files but because ES6 modules are being used you will need to start a webserver to serve the app. After the initial `npm install` step, you can do this with `npm start`.  When it's running you can access Sight Snap at `http://localhost:3000/src/index.html`. You can run the Webpack/Babel workflow that minifies the JavaScript and CSS with `npm run build`, which will generate the distribution files in the `dist` directory.

I haven't spent a lot of time making the code nice and there are unexplained magic numbers etc in the display code (it's a fairly quick conversion of Solfetta which I spent more time on) but it's here if anyone wants it!
