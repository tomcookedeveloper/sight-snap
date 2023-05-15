import * as Utils from './utils.js'
import * as NoteButtons from './note-buttons.js'
import * as Panel from './panel.js'
import * as FeatureBar from './feature-bar.js'

// Non-stored settings
let sessionSettings = {};

// Choosing Do or La
var chooseDoLa = "Do";

const storedSettings = ["lowestNote", "highestNote", "noteNames", "darkMode"];

function getSetting(key) {

    const defaults = {
        "appVersion": "0.7.0",
        "darkMode": false,
        "lowestNote": 9, // Lowest line of main stave
        "highestNote": 17, // Highest line of main stave
        "noteNames": "letters",
        "minWidth": 42,
        "clef": "treble"
    };

    let val;
    if (storedSettings.indexOf(key) !== -1) {
        val = window.localStorage.getItem(key);
    } else {
        val = sessionSettings[key];
    }
    if (val !== undefined && val !== "undefined" && val !== null) {
        return JSON.parse(val);
    } else {
        setSetting(key, defaults[key]);
        return defaults[key];
    }
}

function setSetting(key, value) {
    if (storedSettings.indexOf(key) !== -1) {
        window.localStorage.setItem(key, JSON.stringify(value));
    } else {
        sessionSettings[key] = JSON.stringify(value);
    }
}

// We have a 4x4 0-based grid, position from 0,0 to 3,3
const settingsButtons = [{
        "id": "settingsLowButton",
        "text": "Low: ",
        "position": [
            [0, 0],
            [1, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                Panel.showPanel("chooseLow");
            }
        }
    },
    {
        "id": "settingsHighButton",
        "text": "High: ",
        "position": [
            [2, 0],
            [3, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                Panel.showPanel("chooseHigh");
            }
        }
    },
    {
        "id": "namesOrSolfaButton",
        "text": "Labels: Names",
        "position": [
            [0, 1],
            [3, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                namesOrSolfaClick();
            }
        }
    },
    {
        "id": "settingsDarkButton",
        "text": "Dark: Off",
        "position": [
            [0, 2],
            [1, 2]
        ],
        "eventListeners": {
            "click": function(e) {
                darkClick();
            }
        }
    },
    {
        "id": "settingsAboutButton",
        "text": "About&hellip;",
        "position": [
            [2, 2],
            [3, 2]
        ],
        "eventListeners": {
            "click": function(e) { Panel.showPanel("about"); }
        }
    },
    {
        "id": "settingsBackButton",
        "text": "Back",
        "position": [
            [0, 3],
            [1, 3]
        ],
        "eventListeners": {
            "click": function(e) {
                Panel.showPanel("start");
            }
        }
    },
    {
        "id": "settingsHelpButton",
        "text": "Help",
        "position": [
            [2, 3],
            [3, 3]
        ],
        "eventListeners": {
            "click": function(e) {
                window.open('https://github.com/tomcookedeveloper/sight-snap#readme', '_blank');
            }
        }
    },
];

const chooseLowButtons = [{
        "id": "chooseLow7",
        "text": "",
        "position": [
            [0, 0],
            [0, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow8",
        "text": "",
        "position": [
            [1, 0],
            [1, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow9",
        "text": "",
        "position": [
            [2, 0],
            [2, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow10",
        "text": "",
        "position": [
            [3, 0],
            [3, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow3",
        "text": "",
        "position": [
            [0, 1],
            [0, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow4",
        "text": "",
        "position": [
            [1, 1],
            [1, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow5",
        "text": "",
        "position": [
            [2, 1],
            [2, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow6",
        "text": "",
        "position": [
            [3, 1],
            [3, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow1",
        "text": "",
        "position": [
            [0, 2],
            [0, 2]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLow2",
        "text": "",
        "position": [
            [1, 2],
            [1, 2]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseLowClicked(this);
            }
        }
    },
    {
        "id": "chooseLowBack",
        "text": "Back",
        "position": [
            [0, 3],
            [3, 3]
        ],
        "eventListeners": {
            "click": function(e) {
                Panel.showPanel("settings");
            }
        }
    },
];

const chooseHighButtons = [{
        "id": "chooseHigh7",
        "text": "",
        "position": [
            [0, 0],
            [0, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh8",
        "text": "",
        "position": [
            [1, 0],
            [1, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh9",
        "text": "",
        "position": [
            [2, 0],
            [2, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh10",
        "text": "",
        "position": [
            [3, 0],
            [3, 0]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh3",
        "text": "",
        "position": [
            [0, 1],
            [0, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh4",
        "text": "",
        "position": [
            [1, 1],
            [1, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh5",
        "text": "",
        "position": [
            [2, 1],
            [2, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh6",
        "text": "",
        "position": [
            [3, 1],
            [3, 1]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh1",
        "text": "",
        "position": [
            [0, 2],
            [0, 2]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHigh2",
        "text": "",
        "position": [
            [1, 2],
            [1, 2]
        ],
        "eventListeners": {
            "click": function(e) {
                chooseHighClicked(this);
            }
        }
    },
    {
        "id": "chooseHighBack",
        "text": "Back",
        "position": [
            [0, 3],
            [3, 3]
        ],
        "eventListeners": {
            "click": function(e) {
                Panel.showPanel("settings");
            }
        }
    },
];

const defaultsButtons = [{
        "id": "confirmText",
        "text": "Reset all settings to defaults and reload?",
        "position": [
            [0, 0],
            [3, 2]
        ]
    },
    {
        "id": "defaultsOK",
        "text": "OK",
        "position": [
            [0, 3],
            [1, 3]
        ],
        "eventListeners": {
            "click": defaultsOKClick
        }
    },
    {
        "id": "defaultsCloseButton",
        "text": "Cancel",
        "position": [
            [2, 3],
            [3, 3]
        ],
        "eventListeners": {
            "click": settingsMouseDown
        }
    }
];

const chooseDoEventListeners = {
    'mousedown': chooseDoNoteMouseDown,
    'mouseup': chooseDoNoteMouseUp,
    'mouseout': chooseDoNoteMouseUp,
    'touchstart': Utils.touchWrapper(chooseDoNoteMouseDown),
    'touchend': Utils.touchWrapper(chooseDoNoteMouseUp),
    'touchcancel': Utils.touchWrapper(chooseDoNoteMouseUp)
};

const chooseDoButtons = [{
        "id": "chooseDoGSharp",
        "text": "G#/Ab",
        "position": [
            [0, 0],
            [0, 0]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoA",
        "text": "A",
        "position": [
            [1, 0],
            [1, 0]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoASharp",
        "text": "A#/Bb",
        "position": [
            [2, 0],
            [2, 0]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoB",
        "text": "B",
        "position": [
            [3, 0],
            [3, 0]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoE",
        "text": "E",
        "position": [
            [0, 1],
            [0, 1]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoF",
        "text": "F",
        "position": [
            [1, 1],
            [1, 1]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoFSharp",
        "text": "F#/Gb",
        "position": [
            [2, 1],
            [2, 1]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoG",
        "text": "G",
        "position": [
            [3, 1],
            [3, 1]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoC",
        "text": "C",
        "position": [
            [0, 2],
            [0, 2]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoCSharp",
        "text": "C#/Db",
        "position": [
            [1, 2],
            [1, 2]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoD",
        "text": "D",
        "position": [
            [2, 2],
            [2, 2]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoDSharp",
        "text": "D#/Eb",
        "position": [
            [3, 2],
            [3, 2]
        ],
        "eventListeners": chooseDoEventListeners,
        "classes": ["chooseDoNote"]
    },
    {
        "id": "chooseDoClose",
        "text": 'Back',
        "position": [
            [0, 3],
            [1, 3]
        ],
        "eventListeners": { "click": settingsMouseDown }
    },
    {
        "id": "random",
        "text": 'Random',
        "position": [
            [2, 3],
            [3, 3]
        ],
        "eventListeners": { "click": randomDoClick }
    }
];

const messageButtons = [{
    "id": "messageText",
    "text": "Melody completed!",
    "position": [
        [0, 0],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() { Panel.hideAllPanels(); }
    }
}];

const aboutButtons = [{
    "id": "aboutText",
    "text": "<p>Sight Snap Version " + getSetting("appVersion") + "</p><p>&copy; 2023 Tom Cooke</p><p>License: MIT</p>" +
        "<p><a href=\"https://github.com/tomcookedeveloper/sight-snap\" target=\"_blank\">Sight Snap on GitHub</a>" +
        "<p><a href=\"mailto:TomCookeDeveloper@gmail.com\">Email Me</a>",
    "position": [
        [0, 0],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() { Panel.showPanel("settings"); }
    }
}];

const splashButtons = [{
    "id": "splashText",
    "text": "<p>Welcome to Solfetta!</p><p>Use the note buttons to play what you like - or try the melody button for ideas</p>",
    "position": [
        [0, 0],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() { Panel.hideAllPanels(); }
    }
}];

const startButtons = [{
    "id": "startText",
    "text": "",
    "position": [
        [0, 0],
        [3, 1]
    ],
    "eventListeners": {

    }
}, {
    "id": "rangeText",
    "text": "",
    "position": [
        [0, 2],
        [3, 2]
    ],
    "eventListeners": {
        'click': function() {
            Panel.showPanel("settings");
        }
    }
}, {
    "id": "startTreble",
    "text": "Play<br/>Treble Clef",
    "position": [
        [0, 3],
        [1, 3]
    ],
    "eventListeners": {
        'click': function() {
            setSetting("clef", "treble");
            startGame();
        }
    }
}, {
    "id": "startBass",
    "text": "Play<br/>Bass Clef",
    "position": [
        [2, 3],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() {
            setSetting("clef", "bass");
            startGame();
        }
    }
}];

const pauseButtons = [{
    "id": "pauseText",
    "text": "<p>Game paused</p>",
    "position": [
        [0, 0],
        [3, 2]
    ],
    "eventListeners": {

    }
}, {
    "id": "resumeGame",
    "text": "Resume",
    "position": [
        [0, 3],
        [1, 3]
    ],
    "eventListeners": {
        'click': function() {
            setSetting("gameStart", (new Date()).getTime() - getSetting("timeBeforePause"));
            Panel.hideAllPanels();
            document.getElementById("featureBar").style.display = "flex";
        }
    }
}, {
    "id": "endGame",
    "text": "End",
    "position": [
        [2, 3],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() {
            setSetting("gameStart", null);
            Panel.showPanel("start");
            NoteButtons.hideAllNotes();
            document.getElementById("featureBar").style.display = "none";
        }
    }
}];

const gameCompleteButtons = [{
    "id": "gameCompleteText",
    "text": "",
    "position": [
        [0, 0],
        [3, 2]
    ],
    "eventListeners": {

    }
}, {
    "id": "gameCompleteReplay",
    "text": "Play Again",
    "position": [
        [0, 3],
        [1, 3]
    ],
    "eventListeners": {
        'click': function() {
            startGame();
        }
    }
}, {
    "id": "gameCompleteDone",
    "text": "End",
    "position": [
        [2, 3],
        [3, 3]
    ],
    "eventListeners": {
        'click': function() {
            NoteButtons.clearLastSelectedButton();
            setSetting("gameStart", null);
            Panel.showPanel("start");
            NoteButtons.hideAllNotes();
            document.getElementById("featureBar").style.display = "none";
        }
    }
}];

const panelDefinitions = {
    "settings": { "buttons": settingsButtons },
    "chooseDo": { "buttons": chooseDoButtons },
    "defaults": { "buttons": defaultsButtons },
    "message": { "buttons": messageButtons },
    "about": { "buttons": aboutButtons },
    "splash": { "buttons": splashButtons },
    "start": { "buttons": startButtons },
    "pause": { "buttons": pauseButtons },
    "chooseLow": { "buttons": chooseLowButtons },
    "chooseHigh": { "buttons": chooseHighButtons },
    "gameComplete": { "buttons": gameCompleteButtons }
};

const buttonToDo = {
    "chooseDoGSharp": 8,
    "chooseDoA": 9,
    "chooseDoASharp": 10,
    "chooseDoB": 11,
    "chooseDoE": 4,
    "chooseDoF": 5,
    "chooseDoFSharp": 6,
    "chooseDoG": 7,
    "chooseDoC": 0,
    "chooseDoCSharp": 1,
    "chooseDoD": 2,
    "chooseDoDSharp": 3
};

function startGame() {
    NoteButtons.clearLastSelectedButton();
    setSetting("gameStart", (new Date()).getTime());
    NoteButtons.initNoteValues();
    NoteButtons.setLastNoteValue(0);
    NoteButtons.showAllNotes();
    NoteButtons.displayNotes();
    Panel.hideAllPanels();
    FeatureBar.updateFeatureButtons();
    document.getElementById("featureBar").style.display = "flex";
}

function chooseLowClicked(element) {
    let number = parseInt(element.id.match(/(\d+)$/)[0], 10);
    setSetting("lowestNote", number - 1);
    updateSettingsButtons();
    resizeSettings();
    Panel.showPanel("chooseLow");
}

function chooseHighClicked(element) {
    let number = parseInt(element.id.match(/(\d+)$/)[0], 10);
    setSetting("highestNote", number + 16);
    updateSettingsButtons();
    resizeSettings();
    Panel.showPanel("chooseHigh");
}

function chooseDoNoteMouseDown(e) {
    let selectedDo = buttonToDo[this.id];
    // If we're actually choosing La we need to make an adjustment
    setSetting("configuredDo", (chooseDoLa === "Do") ? selectedDo : ((selectedDo + 3) % 12));
    NoteButtons.displayNotes();
    updateSettingsButtons();
    MelodyPlay.clearPlayerSequence(); // Doesn't make sense to keep this once we've changed key
    MelodyPlay.highlightNextNote();
}

function chooseDoNoteMouseUp(e) {
    let selectedDo = buttonToDo[this.id];
    Audio.stopPlaying(selectedDo - 12);
}

function randomDoClick() {
    const lastDo = getSetting("configuredDo");
    while (lastDo == getSetting("configuredDo")) {
        setSetting("configuredDo", Math.floor(Math.random() * 12));
    }
    NoteButtons.displayNotes();
    updateSettingsButtons();
}

function majorMinorClick() {
    const options = ["Major", "Minor"];
    setSetting("tonality", options[(options.indexOf(getSetting("tonality")) + 1) % options.length]);
    if (getSetting("minor") === "la-based") {
        if (getSetting("tonality") === "Minor") {
            setSetting("configuredDo", (getSetting("configuredDo") + 3) % 12);
        } else {
            setSetting("configuredDo", (getSetting("configuredDo") + 9) % 12);
        }
    }
    updateSettingsButtons();
    NoteButtons.displayNotes();
}

function darkClick() {
    setSetting("darkMode", !getSetting("darkMode"));
    updateSettingsButtons();
    NoteButtons.displayNotes();
}

function namesOrSolfaClick() {
    const options = ["letters", "solfa"];
    setSetting("noteNames", options[(options.indexOf(getSetting("noteNames")) + 1) % options.length]);
    updateSettingsButtons();
    NoteButtons.displayNotes();
}

function createRangeContents() {

    var range = document.getElementById("rangeText");
    range.innerHTML = "Settings...";

    let thisButton = document.createElement("div");
    thisButton.className = "button";
    //thisButton.classList.add("settingsButton");
    thisButton.id = "lowerRangeContents";
    var thisHeight = Number.parseInt(range.style.height);
    var thisWidth = Number.parseInt(range.style.width);
    thisButton.style.left = (thisHeight) * (2 / 7) + "px";
    thisButton.style.height = range.style.height;
    thisButton.style.width = thisHeight + "px";
    NoteButtons.drawLogo(thisButton, getSetting("lowestNote"));
    range.appendChild(thisButton);

    thisButton = document.createElement("div");
    thisButton.className = "button";
    //thisButton.classList.add("settingsButton");
    thisButton.id = "upperRangeContents";
    thisButton.style.height = range.style.height;
    thisButton.style.left = 7 * ((thisWidth - thisHeight * 3) / 8) + thisHeight * 2 + "px";
    thisButton.style.width = thisHeight + "px";
    NoteButtons.drawLogo(thisButton, getSetting("highestNote"));
    range.appendChild(thisButton);


    return thisButton;
}

function updateChooseLowButtons() {
    var chooseLowButton = document.getElementById("settingsLowButton");
    chooseLowButton.innerHTML = "";
    var thisHeight = Number.parseInt(chooseLowButton.style.height);
    var lowButtonText = document.createElement("div");
    lowButtonText.id = "lowButtonText";
    lowButtonText.innerHTML = "Low:";
    lowButtonText.style.left = (thisHeight / 5) + "px";
    chooseLowButton.appendChild(lowButtonText);
    let thisButton = document.createElement("div");
    thisButton.className = "button";
    //thisButton.classList.add("settingsButton");
    thisButton.id = "chooseLowContents";
    // thisButton.style.left = (thisWidth - thisHeight * 3) / 2 + "px";
    thisButton.style.height = chooseLowButton.style.height;
    thisButton.style.width = thisHeight + "px";
    thisButton.style.left = thisHeight * 1.2 + "px";
    NoteButtons.drawLogo(thisButton, getSetting("lowestNote"));
    chooseLowButton.appendChild(thisButton);

    var chooseHighButton = document.getElementById("settingsHighButton");
    chooseHighButton.innerHTML = "";
    var highButtonText = document.createElement("div");
    highButtonText.id = "highButtonText";
    highButtonText.innerHTML = "High:";
    highButtonText.style.left = (thisHeight / 5) + "px";
    chooseHighButton.appendChild(highButtonText);
    thisButton = document.createElement("div");
    thisButton.className = "button";
    //thisButton.classList.add("settingsButton");
    thisButton.id = "chooseHighContents";
    thisButton.style.height = chooseLowButton.style.height;
    //thisButton.style.left = ((thisWidth - thisHeight * 3) / 2) + thisHeight * 2 + "px";
    thisButton.style.width = thisHeight + "px";
    thisButton.style.left = thisHeight * 1.2 + "px";
    NoteButtons.drawLogo(thisButton, getSetting("highestNote"));
    chooseHighButton.appendChild(thisButton);

    for (let i = 1; i <= 10; i++) {
        var thisLowButton = document.getElementById("chooseLow" + i);
        thisLowButton.innerHTML = "";
        thisButton = document.createElement("div");
        thisButton.className = "button";
        //thisButton.classList.add("settingsButton");
        thisButton.id = "lowerRangeContents" + i;
        thisButton.style.height = chooseLowButton.style.height;
        //thisButton.style.left = ((thisWidth - thisHeight * 3) / 2) + thisHeight * 2 + "px";
        thisButton.style.width = thisHeight + "px";
        NoteButtons.drawLogo(thisButton, i - 1);
        thisLowButton.appendChild(thisButton);

        var thisHighButton = document.getElementById("chooseHigh" + i);
        thisHighButton.innerHTML = "";
        thisButton = document.createElement("div");
        thisButton.className = "button";
        //thisButton.classList.add("settingsButton");
        thisButton.id = "upperRangeContents" + i;
        thisButton.style.height = chooseLowButton.style.height;
        //thisButton.style.left = ((thisWidth - thisHeight * 3) / 2) + thisHeight * 2 + "px";
        thisButton.style.width = thisHeight + "px";
        NoteButtons.drawLogo(thisButton, i + 16);
        thisHighButton.appendChild(thisButton);
    }
}

function resizeSettings() {
    createRangeContents();

    updateChooseLowButtons();
}

function updateSettingsButtons() {

    // range.appendChild(createRangeContents());
    document.getElementById("startText").innerHTML = "<p><i><b>Sight Snap</b></i></><br style='line-height:2em;'/>Select pairs of <i>different</i> tiles that represent the same note name to clear the board.</p>";

    if (getSetting("gameStart") !== null) {
        let seconds = Math.floor(((new Date()).getTime() - getSetting("gameStart")) / 1000);
        document.getElementById("gameCompleteText").innerHTML = "<p>Completed in " + seconds + " seconds</p>";
    }

    document.getElementById("settingsDarkButton").innerHTML = "Dark: " + (getSetting("darkMode") ? "On" : "Off");
    document.getElementById("namesOrSolfaButton").innerHTML = "Names: " + (getSetting("noteNames") === 'letters' ? "Letters" : "Solfa");

    let buttons = document.querySelectorAll(".settingsButton");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("highlighted");
    }

    let chooseHighButtonNumber = getSetting("highestNote") - 16;
    document.getElementById("chooseHigh" + chooseHighButtonNumber).classList.add("highlighted");

    let chooseLowButtonNumber = getSetting("lowestNote") + 1;
    document.getElementById("chooseLow" + chooseLowButtonNumber).classList.add("highlighted");

    resizeSettings();
}

function defaultsOKClick(e) {
    window.localStorage.clear();
    window.location.reload();
}

function settingsMouseDown(e) {
    updateSettingsButtons();
    if (document.getElementById("settings").classList.contains("hiddenPanel")) {
        Panel.showPanel("settings");
    } else {
        Panel.hideAllPanels();
    }
}

function stopTimer() {}

function init() {
    Panel.createPanels(panelDefinitions);
}

export {
    setSetting,
    getSetting,
    settingsMouseDown,
    updateSettingsButtons,
    init,
    resizeSettings
};