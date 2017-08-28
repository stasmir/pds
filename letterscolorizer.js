(function () {
    var elements = getElements();

    if (!elements) {
        return;
    }

    elements.colorizeButton.addEventListener('click', colorize);

    function colorize() {
        var inputColorsText = elements.inputColors.value;

        if (!inputColorsText) {
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

    function getElements() {
        var colorizeButton = document.getElementById('colorizeButton');
        if (!colorizeButton) {
            console.error('Element with id="colorizeButton" is not found');
            return null;
        }

        var inputColors = document.getElementById('inputColors');
        if (!inputColors) {
            console.error('Element with id="inputColors" is not found');
            return null;
        }

        var textForColorize = document.getElementById('textForColorize');
        if (!textForColorize) {
            console.error('Element with id="textForColorize" is not found');
            return null;
        }

        var errorSpan = document.getElementById('errorMessage');
        if (!errorSpan) {
            console.error('Element with id="errorMessage" is not found');
            return null;
        }

        return {
            colorizeButton: colorizeButton,
            inputColors: inputColors,
            textForColorize: textForColorize,
            errorSpan: errorSpan,
        };
    }

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

    function colorizeLetters(textParagraph, colors) {
        var text = textParagraph.textContent;
        var textLength = text.length;
        var colorsLength = colors.length;
        var formattedText = '';
        var prevRandom = -1;
        var wordRegExp = /\w{1}/;

        for (var i = 0; i < textLength; i++) {
            var letter = text.charAt(i);

            if (wordRegExp.test(letter)) {
                var rand = randomInteger(colorsLength - 1);
                if (rand === prevRandom) {
                    rand = (rand + 1) % colorsLength;
                }

                prevRandom = rand;
                formattedText += '<span style="color:'
                    + colors[rand]
                    + '">'
                    + text.charAt(i) + '</span>';
            } else {
                formattedText += letter;
            }
        }

        textParagraph.innerHTML = formattedText;
    }

    function randomInteger(max) {
        var rand = Math.floor(Math.random() * (max + 1));
        return rand;
    }

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