function isIOS() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    return iOS;
}

// Always returns positive, more useful than standard JavaScript mod for our purposes
function mod(x, y) {
    return ((x % y) + y) % y;
}

function onClickWrapper(f) {

    if (!f) {
        throw new Error("Undefined function");
    }

    function wrapped(e) {
        if (e.button === undefined || e.button === 0) {
            let playingVisible = document.querySelectorAll(":not(.hiddenPanel)#playing").length !== 0;
            if (!playingVisible) {
                f.bind(this)(e);
            }
        }
    }
    return wrapped;
}

function touchWrapper(f) {
    function wrapped(e) {
        f.bind(this)(e);
        e.preventDefault();
    }
    return wrapped;
}

export {
    isIOS,
    mod,
    onClickWrapper,
    touchWrapper
};