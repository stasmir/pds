// Module provides a functions to color letters
(function () {
    // Caching elements
    var elements = getElements();

    if (!elements) {
        return;
    }

    elements.colorizeButton.addEventListener('click', colorize);

    /** Onclick event handler to color letters. */
    function colorize() {

        var inputColorsText = elements.inputColors.value;

        if (!inputColorsText || /^\s*$/.test(inputColorsText)) {
            elements.errorSpan.textContent = 'Empty colors';
            return;
        }

        var colors = parseColors(inputColorsText);

        if (!colors) {
            elements.errorSpan.textContent = 'Incorrect colors';
            return;
        } else {
            elements.errorSpan.textContent = '';
        }

        colorizeLetters(elements.textForColorize, colors);
    }

    /**
     * Finds all neccessary elements.
     * If any is missing than writes to console error output.
     * @returns {object} elements
     */
    function getElements() {
        var colorizeButtonId = 'colorizeButton';
        var colorizeButton = document.getElementById(colorizeButtonId);
        if (!colorizeButton) {
            console.error('Element with id="' + colorizeButtonId + '" is not found');
            return null;
        }

        var inputColorsId = 'inputColors';
        var inputColors = document.getElementById(inputColorsId);
        if (!inputColors) {
            console.error('Element with id="' + inputColorsId + '" is not found');
            return null;
        }

        var textForColorizeId = 'textForColorize';
        var textForColorize = document.getElementById(textForColorizeId);
        if (!textForColorize) {
            console.error('Element with id="' + textForColorizeId + '" is not found');
            return null;
        }

        var errorMessageId = 'errorMessage';
        var errorSpan = document.getElementById(errorMessageId);
        if (!errorSpan) {
            console.error('Element with id="' + errorMessageId + '" is not found');
            return null;
        }

        return {
            colorizeButton: colorizeButton,
            inputColors: inputColors,
            textForColorize: textForColorize,
            errorSpan: errorSpan,
        };
    }

    /**
     * Parses a text containg color names and returns array of valid color names. Empty names are omited.
     * @param {string} text Text containing color names splitted by comma, semicolon or newline.
     * @returns {array} valid color names or null if any name is invalid.
     */
    function parseColors(text) {
        var splitRegExp = /\s*[,;\n]\s*/;
        var words = removeEmptyElements(text.split(splitRegExp));
        var wordsLength = words.length;

        for (var i = 0; i < wordsLength; i++) {
            if (!validTextColor(words[i])) {
                return null;
            }
        }

        return words;
    }

    /**
     * Color letters in text in textParagram element in colors in random sequence with no same color for neighbor letters.
     * @param {element} textParagraph Element containing text to color.
     * @param {array} colors Array of string containing valid color names
     */
    function colorizeLetters(textParagraph, colors) {
        var text = textParagraph.textContent;
        var textLength = text.length;
        var colorsLength = colors.length;
        var formattedText = '';
        var prevRandomColorIndex = -1;
        var wordRegExp = /\w{1}/;

        for (var i = 0; i < textLength; i++) {
            var letter = text.charAt(i);

            // Color symbol only if it is alphanumeric.
            if (wordRegExp.test(letter)) {
                var randomColorIndex = randomInteger(colorsLength - 1);
                if (randomColorIndex === prevRandomColorIndex) {
                    // Prevent duplicate color for two consecutive letters
                    randomColorIndex = (randomColorIndex + 1) % colorsLength;
                }

                prevRandomColorIndex = randomColorIndex;
                formattedText += '<span style="color:'
                    + colors[randomColorIndex]
                    + '">'
                    + text.charAt(i) + '</span>';
            } else {
                // any non alphanumeric symbol added as is
                formattedText += letter;
            }
        }

        textParagraph.innerHTML = formattedText;
    }

    /**
     * Generates random integer between 0 and max exclusive. [0, max)
     * @param {integer} max Maximum integer
     * @returns {integer} [0, max)
     */
    function randomInteger(max) {
        var rand = Math.floor(Math.random() * (max + 1));
        return rand;
    }

    /**
     * Removes empty elements from array
     * @param {array} actual Array
     * @return {array} New array without empty elements
     */
    function removeEmptyElements(actual) {
        var newArray = new Array();
        var actualLength = actual.length;

        for (var i = 0; i < actualLength; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    /**
     * Check whether the string is a valid color name.
     * @param {string} stringToTest 
     * @returns {bool} Valid or not
     */
    function validTextColor(stringToTest) {
        if (stringToTest === ''
            || stringToTest === 'inherit'
            || stringToTest === 'transparent') {
            return false;
        }

        var image = document.createElement('img');

        image.style.color = 'rgb(0, 0, 0)';
        image.style.color = stringToTest;

        if (image.style.color !== 'rgb(0, 0, 0)') {
            return true;
        }

        image.style.color = 'rgb(255, 255, 255)';
        image.style.color = stringToTest;

        return image.style.color !== 'rgb(255, 255, 255)';
    }
})();