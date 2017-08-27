(function() {
    var colorizeButton = document.getElementById('colorizeButton');
    if (!colorizeButton) {
        console.error('Element with id="colorizeButton" is not found');
        return;
    }

    var inputColors = document.getElementById('inputColors');
    if (!inputColors) {
        console.error('Element with id="inputColors" is not found');
        return;
    }

    var textForColorize = document.getElementById('textForColorize');
    if (!inputColors) {
        console.error('Element with id="textForColorize" is not found');
        return;
    }

    colorizeButton.addEventListener("click", colorize);

    function colorize() {
        var colors = parseColors(inputColors.innerText);

        colorizeLetters(textForColorize.innerText, colors);
    };

    function parseColors(inputColors) {
        var colors = [];

        return colors;
    }

    function colorizeLetters(text, colors) {
        
    }
})();