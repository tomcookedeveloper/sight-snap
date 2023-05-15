import * as Settings from './settings.js';
import * as Utils from './utils.js';
import * as Panel from './panel.js'

function createFeatureButton(id, text, mouseDownHandler, extraClasses) {
    let thisButton = document.createElement("div");
    thisButton.className = "button";
    thisButton.classList.add("featureButton");
    if (extraClasses) {
        for (let i = 0; i < extraClasses.length; i++) {
            thisButton.classList.add(extraClasses[i]);
        }
    }
    thisButton.addEventListener('click', mouseDownHandler);
    thisButton.addEventListener('touchend', Utils.touchWrapper(mouseDownHandler));
    thisButton.id = id;

    if (id === "settingsButton") {
        drawLogo(thisButton);
    } else {
        thisButton.innerHTML = text;
    }
    document.getElementById("featureBar").appendChild(thisButton);

    return thisButton;
}

function pauseButtonClick() {
    let timeBeforePause = (new Date()).getTime() - Settings.getSetting("gameStart");
    Settings.setSetting("timeBeforePause", timeBeforePause);
    Panel.showPanel("pause");
}

function createFeatureBar() {
    let thisButton = document.createElement("div");
    thisButton.className = "button";
    thisButton.classList.add("featureBar");

    thisButton.id = "featureBar";

    document.body.appendChild(thisButton);

    // Add the feature buttons
    createFeatureButton("pauseButton", "", Utils.onClickWrapper(pauseButtonClick), []);

    updateFeatureButtons();

    thisButton.style.display = "none";
}

function resize(selectedLayout, buttonWidth, margin, canvasLeft, canvasTop) {
    // Reposition the feature bar
    var featureBar = document.getElementById("featureBar");
    featureBar.style.width = 3 * (buttonWidth + (margin * 2)) + buttonWidth + "px";
    featureBar.style.top = (canvasTop + (selectedLayout.height - 1) * (buttonWidth + (margin * 2))) + "px";
    featureBar.style.left = (canvasLeft) + "px";

    let fontSize = buttonWidth / 3;
    let featureButtonElements = document.querySelectorAll(".featureButton");
    for (let i = 0; i < featureButtonElements.length; i++) {
        featureButtonElements[i].style.fontSize = fontSize + "px";
    }
    document.body.style.fontSize = fontSize + "px";
    document.getElementById("pauseButton").style.fontSize = fontSize * 0.75 + "px";
    document.getElementById("startText").style.fontSize = fontSize * 0.85 + "px";

    // Reposition the feature buttons
    const featureButtons = ["pauseButton"];
    const featureButtonWidths = [4];
    const featureBarWidth = 3 * (buttonWidth + (margin * 2)) + buttonWidth;
    const featureButtonWidth = featureBarWidth / 4;
    let nextButtonLeft = 0;
    for (let i = 0; i < featureButtons.length; i++) {
        document.getElementById(featureButtons[i]).style.top = "0px";
        document.getElementById(featureButtons[i]).style.left = nextButtonLeft + "px";
        document.getElementById(featureButtons[i]).style.width = featureButtonWidth * featureButtonWidths[i] + "px";
        nextButtonLeft += featureButtonWidth * featureButtonWidths[i];
    }
}

function updateFeatureButtons() {
    document.getElementById("pauseButton").innerHTML = (Settings.getSetting("clef") === "treble" ? "Treble" : "Bass") + " Clef - Click To Pause"

    // Highlight selected mode button
    let buttons = document.querySelectorAll(".featureButton");
    const selectedModeButtonName = Settings.getSetting("displayMode") + "Button";
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (button.id === selectedModeButtonName) {
            button.classList.add("highlightedFeature");
        } else {
            button.classList.remove("highlightedFeature");
        }
    }
}

export {
    createFeatureBar,
    resize,
    updateFeatureButtons
}