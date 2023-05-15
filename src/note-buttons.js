import * as Settings from './settings.js';
import * as Utils from './utils.js';
import * as Display from './display.js';
import * as Panel from './panel.js'

// Music playing area elements
var noteButtons = [];

var noteValues = [];

let lowestNoteValue;
let lastNoteValue; // note value, starts at zero
let holdNoteValue; // don't change text for this note until it's released

let lastSelectedButton = null;

let timer = null;

function setLowestNoteValue(number) {
    lowestNoteValue = number;
}

// We need to know what the last note value was to be able to bold the note and show
// relative interval values
function setLastNoteValue(last) {
    lastNoteValue = last;
}

function getLastNoteValue() {
    return lastNoteValue;
}

function idToNumber(id) {
    return Number(id.replace(/\D/g, ''));
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function showAllNotes() {
    let notes = document.querySelectorAll(".noteButton");
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.display = "flex";
    }
}

function hideAllNotes() {
    let notes = document.querySelectorAll(".noteButton");
    for (let i = 0; i < notes.length; i++) {
        notes[i].style.display = "none";
    }
}

function possibilitiesForNote(note) {
    // For bass clef position 0 = E, for treble clef position 0=C
    // Note 0 = C in both cases
    var possibilities = [];
    const lowestNote = Settings.getSetting("lowestNote");
    const highestNote = Settings.getSetting("highestNote");
    const noteOffset = (Settings.getSetting("clef") === "treble") ? 0 : 2;
    for (let i = lowestNote; i <= highestNote; i++) {
        if ((i + noteOffset) % 7 === note) {
            possibilities.push(i);
        }
    }

    if (possibilities.length == 2) {
        if (Math.random() > 0.5) {
            possibilities = possibilities.concat(possibilities);
        } else {
            possibilities = shuffle(possibilities);
            possibilities.shift();
            possibilities.push(["C", "D", "E", "F", "G", "A", "B"][note]);
            possibilities = possibilities.concat(possibilities);
        }
    } else {
        possibilities.push(["C", "D", "E", "F", "G", "A", "B"][note]);
    }

    possibilities = shuffle(possibilities);

    return possibilities;
}

function initNoteValues() {

    let notePossibilities;
    noteValues = [];

    for (let i = 0; i < 7; i++) {
        notePossibilities = possibilitiesForNote(i);
        for (let j = 0; j < 4; j++) {
            if (notePossibilities.length == 0) {
                notePossibilities = possibilitiesForNote(i);
            }
            noteValues.push(notePossibilities.shift());
        }
    }

    shuffle(noteValues);
}

function playSelectedNoteButton(selectedButton) {
    let noteValue = buttonIndexToNoteValue(selectedButton);
    displayNotes();
}

function getNoteLetter(selectedButton) {
    let actualNote = noteValues[selectedButton];

    if (typeof(actualNote) === "number") {
        if (Settings.getSetting("clef") === "bass") {
            actualNote += 2;
        }
        return ["C", "D", "E", "F", "G", "A", "B"][actualNote % 7];
    } else {
        return actualNote;
    }
}

function clearNote(selectedButton) {
    noteValues[selectedButton] = null;
}

function isGameFinished() {
    for (let i = 0; i < 28; i++) {
        if (noteValues[i] !== null) {
            return false;
        }
    }
    return true;
}

function fixDuplicateTiles(noteLetter) {
    let foundTiles = [];
    let emptyTiles = [];
    for (let i = 0; i < 28; i++) {
        if (noteValues[i] === "?") {
            emptyTiles.push(i);
        } else if (getNoteLetter(i) === noteLetter) {
            foundTiles.push(i);
        }
    }
    if (foundTiles.length === 1) {
        let possibilities = possibilitiesForNote(["C", "D", "E", "F", "G", "A", "B"].indexOf(noteLetter));
        let tileToReplace = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        for (let i = 0; i < possibilities.length; i++) {
            if (possibilities[i] != "?" && possibilities[i] !== noteValues[foundTiles[0]]) {
                noteValues[tileToReplace] = possibilities[i];
                break;
            }
        }
        displayNotes();
    }
}

function clearLastSelectedButton() {
    if (lastSelectedButton != null) {
        lastSelectedButton.classList.remove("highlighted");
        lastSelectedButton = null;
    }
}

function noteButtonMouseDown(e) {
    if (Panel.isPanelShowing()) {
        Panel.hideAllPanels();
    } else {
        let selectedButton = idToNumber(this.id);
        if (noteValues[selectedButton] === "?") {
            clearLastSelectedButton();
            return;
        }

        if (lastSelectedButton !== null && lastSelectedButton !== this) {

            let lastSelectedButtonId = idToNumber(lastSelectedButton.id);

            if (getNoteLetter(lastSelectedButtonId) === getNoteLetter(selectedButton) &&
                !(noteValues[lastSelectedButtonId] === noteValues[selectedButton])) {
                this.style.display = "none";
                lastSelectedButton.style.display = "none";
                let matchingLetter = getNoteLetter(lastSelectedButtonId);
                clearNote(selectedButton);
                clearNote(lastSelectedButtonId);
                if (isGameFinished()) {
                    Settings.updateSettingsButtons();
                    Panel.showPanel("gameComplete");
                    document.getElementById("featureBar").style.display = "none";
                    Settings.setSetting("gameStart", null);
                } else {
                    fixDuplicateTiles(matchingLetter);
                }
            } else {
                lastSelectedButton.classList.remove("highlighted");
            }

            lastSelectedButton = null;
        } else if (lastSelectedButton !== this) {
            lastSelectedButton = this;
            lastSelectedButton.classList.add("highlighted");
        } else {
            lastSelectedButton.classList.remove("highlighted");
            lastSelectedButton = null;
        }
    }
};

function noteButtonMouseUp(e) {
    let selectedButton = idToNumber(this.id);
    let noteValue = buttonIndexToNoteValue(selectedButton);
}

function createNoteButtons(squaresWidth, squaresHeight, numberOfFeatureButtons) {
    // Wipe out any existing buttons
    let existingNoteButtons = document.querySelectorAll(".noteButton");
    for (let i = 0; i < existingNoteButtons.length; i++) {
        existingNoteButtons[i].remove();;
    }

    let buttonIndex = 0;
    for (let i = 0; i < squaresHeight; i++) {
        for (let j = 0; j < squaresWidth; j++) {
            if ((i * squaresWidth + j) < numberOfFeatureButtons) {
                continue;
            }

            let actualNote = noteValues[buttonIndex];

            let thisButton = document.createElement("div");
            thisButton.id = 'noteButton' + (i * squaresWidth + j - numberOfFeatureButtons);
            noteButtons[i * squaresWidth + j - numberOfFeatureButtons] = thisButton;
            thisButton.className = "button";
            thisButton.classList.add("noteButton");
            thisButton.addEventListener('mousedown', Utils.onClickWrapper(noteButtonMouseDown));
            thisButton.addEventListener('touchstart', Utils.touchWrapper(Utils.onClickWrapper(noteButtonMouseDown)), { "passive": false });
            thisButton.addEventListener('mouseup', Utils.onClickWrapper(noteButtonMouseUp));
            thisButton.addEventListener('mouseout', noteButtonMouseUp);
            thisButton.addEventListener('touchend', Utils.touchWrapper(Utils.onClickWrapper(noteButtonMouseUp)));
            thisButton.addEventListener('touchcancel', Utils.touchWrapper(Utils.onClickWrapper(noteButtonMouseUp)));
            document.body.appendChild(thisButton);

            if (actualNote === null || Settings.getSetting("gameStart") == null) {
                thisButton.style.display = "none";
            } else {
                thisButton.style.display = "flex";
            }

            buttonIndex++;
        }
    }
    const lowestNoteValue = 0 - (Math.floor((squaresWidth * squaresHeight - numberOfFeatureButtons) / 2));
    setLowestNoteValue(lowestNoteValue);
    Settings.setSetting("numberOfNotes", squaresHeight * squaresWidth - numberOfFeatureButtons);
}

function buttonIndexToNoteValue(i) {
    return lowestNoteValue + i;
}

function noteValueToNoteButtonNumber(noteValue) {
    return noteValue - lowestNoteValue;
}

// This actually resizes the feature buttons as well
function resize(selectedLayout, buttonWidth, margin, canvasLeft, canvasTop) {
    let buttons = document.querySelectorAll(".button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.width = buttonWidth + "px";
        buttons[i].style.height = buttonWidth + "px";
        var idx = parseInt(buttons[i].id.replace("noteButton", "")) + 4;
        buttons[i].style.left = canvasLeft + ((idx % selectedLayout.width)) * (buttonWidth + (margin * 2)) + "px";
        buttons[i].style.top = canvasTop + ((selectedLayout.height - 1) - Math.floor(idx / selectedLayout.width)) * (buttonWidth + (margin * 2)) + "px";
    }
}

// Update text and styles for note buttons
function displayNotes() {
    let notes = document.querySelectorAll(".noteButton");

    for (let i = 0; i < notes.length; i++) {
        let thisButtonIndex = idToNumber(notes[i].id);
        if (notes[thisButtonIndex] == null) {
            continue;
        }

        // Figure out which note this is from the element ID
        let matches = notes[thisButtonIndex].id.match(/noteButton([0-9]+)/);
        if (!matches) {
            continue;
        }

        // Highlight if note is playing
        if (notes[thisButtonIndex] === lastSelectedButton) {
            notes[thisButtonIndex].classList.add("highlighted");
        } else {
            notes[thisButtonIndex].classList.remove("highlighted");
        }

        // Apply styles
        if (Settings.getSetting("clef") !== "bass") {
            notes[thisButtonIndex].classList.add("diatonic");
            notes[thisButtonIndex].classList.remove("chromatic");
        } else {
            notes[thisButtonIndex].classList.add("chromatic");
            notes[thisButtonIndex].classList.remove("diatonic");
        }

        drawStaff(notes[thisButtonIndex], noteValues[thisButtonIndex]);
    }

    // Make sure correct colours (light/dark) are being applied
    Display.applyColours();
}

// Draw a staff fragment
function drawStaff(parent, actualNote) {
    if (actualNote == null || actualNote == "?") {
        return;
    }

    if (parent.innerHTML != null) {
        parent.innerHTML = "";
    }

    if (typeof(actualNote) === "number") {

        let marginFraction = 0.1; // fraction of width each side
        // Height and width are actually same
        let parentHeight = Number.parseInt(parent.style.height);
        let margin = parentHeight * marginFraction;
        let adjustedHeight = parentHeight - margin * 2;
        let spaceHeight = adjustedHeight / 6;
        let noteWidth = spaceHeight * 1.2;
        let upperLedgerLines = 0;
        let lowerLedgerLines = 0;
        // note
        let notePosition = actualNote;
        if (notePosition < 8) {
            lowerLedgerLines = Math.floor((9 - notePosition) / 2);
            notePosition += lowerLedgerLines * 2;
        } else if (notePosition > 18) {
            upperLedgerLines = Math.floor((notePosition - 17) / 2);
            notePosition -= upperLedgerLines * 2;
        }

        notePosition -= 8;

        for (let i = 0; i < 5; i++) {
            let thisElement = document.createElement("div");
            thisElement.className = "staveLine";
            thisElement.style.top = (margin + spaceHeight * (5 - i)) + "px";
            thisElement.style.height = 1 + "px";
            if (i < (lowerLedgerLines) || (5 - i) <= upperLedgerLines) {
                thisElement.style.width = adjustedHeight / 3 + "px";
                thisElement.style.left = margin + (adjustedHeight / 3) + "px";
            } else {
                thisElement.style.width = adjustedHeight + "px";
                thisElement.style.left = margin + "px";
            }
            parent.appendChild(thisElement);
        };
        let thisElement = document.createElement("div");
        thisElement.className = "note";
        thisElement.style.top = adjustedHeight - margin + spaceHeight * 0.5 - spaceHeight * ((notePosition / 2)) + "px";
        thisElement.style.height = spaceHeight + "px";
        thisElement.style.width = noteWidth + "px";
        thisElement.style.left = margin + (adjustedHeight / 2) - noteWidth / 2 + "px";
        parent.appendChild(thisElement);
    } else {
        if (Settings.getSetting("noteNames") === 'letters') {
            parent.innerHTML = actualNote;
        } else {
            const solfaMap = { "C": "Do", "D": "Re", "E": "Mi", "F": "Fa", "G": "Sol", "A": "La", "B": "Si", "C": "Do" };
            parent.innerHTML = solfaMap[actualNote];
        }
    }
}

export {
    createNoteButtons,
    resize,
    displayNotes,
    setLastNoteValue,
    getLastNoteValue,
    noteValueToNoteButtonNumber,
    buttonIndexToNoteValue,
    initNoteValues,
    showAllNotes,
    drawStaff as drawLogo,
    hideAllNotes,
    clearLastSelectedButton
}