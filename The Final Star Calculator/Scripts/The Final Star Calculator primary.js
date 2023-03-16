// Function for ensuring all the calculator's inner workings stay within.
function addTheFinalStarCalculator() {
    if (document.getElementById('TheFinalStarCalculator') !== null && document.getElementById('TheFinalStarCalculatorContainer') === null) {
        console.log('[The Final Star Calculator] [LOG]: ID located. Running script.');

        // Create the calculator's user interface.
        document.getElementById('TheFinalStarCalculator').innerHTML = "<div id='TheFinalStarCalculatorContainer'><div class='templatedesktop' style='padding:0.5em;width:80%;margin:auto;text-align:center'><div style='text-align:initial;padding:1em;background:initial;overflow:auto;float:left' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='TheFinalStarCalculatorSuffixToggleButton'>Disabled</button></div><div style='font-size:24px;font-weight:bold;text-align:center'><img src='./The Final Star Calculator/Assets/Tier 58 - The Final Star.png' width='75'/> The Final Star Calculator <img src='./The Final Star Calculator/Assets/Tier 58 - The Final Star.png' width='75'/></div><p>Tier (<abbr id='TheFinalStarCalculatorTierNotes'>notes</abbr>):<input id='TheFinalStarCalculatorTierInput' style='width:10%'></input></p><button id='TheFinalStarCalculatorCalculateButton'>Calculate</button><p class='templatedesktop' style='font-weight:bold;font-size:20px;padding:0.25em;border-left:initial;border-right:initial;border-radius:initial'>Results</p><p><p id='TheFinalStarCalculatorComputingText' style='display:none'><i>Computing...</i></p><div id='TheFinalStarCalculatorResultsSection'><br>Current Tier (<span id='TheFinalStarCalculatorFinalCount'></span>): <p id='TheFinalStarCalculatorTierOutput'></p></div></div></div>";

        // Variable declarations.
        var suffixStatus; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var tier;

        function updateSuffixStatus() {
            if (window.localStorage.TheFinalStarCalculatorSuffixStatus === 'true') {
                suffixStatus = true;
                document.getElementById('TheFinalStarCalculatorSuffixToggleButton').setAttribute('style', 'background:#00FF00');
                document.getElementById('TheFinalStarCalculatorSuffixToggleButton').innerHTML = 'Enabled';
            } else {
                suffixStatus = false;
                document.getElementById('TheFinalStarCalculatorSuffixToggleButton').setAttribute('style', 'background:#FF0000');
                document.getElementById('TheFinalStarCalculatorSuffixToggleButton').innerHTML = 'Disabled';
            }
            document.getElementById('TheFinalStarCalculatorTierNotes').title = '(n1) Default and minimum value: 58. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of ' + notateInt(1e7) + '.';
        }
        updateSuffixStatus();

        // Ensure a user-inputted value is a scientific notation Decimal number.
        function toScientific(e) {
            if (e.match(/[a-z]+/gi) !== null && suffixes[suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase())] !== undefined) {
                var mantissa = e.match(/\d+[.]?\d*/g);
                extraZeroes = Math.floor(Math.log10(Number(mantissa)));
                mantissa = mantissa / (10 ** extraZeroes);
                var exponent = suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase()) * 3 + extraZeroes;
                result = mantissa + "e" + exponent;
            } else {
                result = e;
            }
            return new Decimal(result);
        }

        // Convert a Decimal number to a string and notate it using either locale string (comma-separated numbers), scientific notation with a fixed number of decimals or suffix notation.
        function notateInt(e) {
            function checkNoDecimal(x) {
                x = new Decimal(x);
                if (x.lessThan(1.797693134862315907729305190789e308)) {
                    if (Math.round(x.mantissa) == new Decimal(x.mantissa).toStringWithDecimalPlaces(5)) {
                        if (x.greaterThanOrEqualTo(1e3)) {
                            result = Math.round(new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals)) + "e" + x.exponent;
                        } else {
                            result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "")).toStringWithDecimalPlaces(decimals).replace(/[.]0+/, "");
                        }
                    } else {
                        if (x.greaterThanOrEqualTo(1e3)) {
                            result = new Decimal(x.mantissa).toStringWithDecimalPlaces(decimals) + "e" + x.exponent;
                        } else {
                            result = new Decimal(new Decimal(x.mantissa * 10 ** x.exponent).toStringWithDecimalPlaces(decimals));
                        }
                    }
                } else {
                    result = x.toStringWithDecimalPlaces(decimals);
                }
                return result;
            }
            e = new Decimal(e);
            if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
                result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e6, return the input with comma-separated numbers.
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(new Decimal("1e" + suffixes.length * 3)) && suffixStatus === true) {
                extraZeroes = e.exponent % 3;
                result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + "" + suffixes[Math.floor(e.exponent / 3)]; // If the input is at least 1e6 and is less than the length of the suffixes array's zero count times 3 and suffix notation is enabled, return the input converted to suffix notation.
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan('1e1e3')) {
                e = new Decimal(e.mantissa.toFixed(3) + "e" + e.exponent);
                if ((e.mantissa).toString() === "9.999999999999") {
                    result = "1e" + e.exponent;
                } else {
                    result = checkNoDecimal(e.mantissa) + "e" + e.exponent; // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
                }
            } else if (e.greaterThanOrEqualTo("1e1e3") && e.lessThan("1e1e16")) {
                switch (suffixStatus) {
                    case true:
                        if (e.greaterThan(new Decimal("1e" + (suffixes.length * 3)))) {
                            extraZeroes = 0;
                        } else {
                            extraZeroes = e.exponent % 3;
                        }
                        result = decimalMax(checkNoDecimal(e.mantissa * (10 ** extraZeroes)) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                        break;
                    default:
                        result = decimalMax(checkNoDecimal(e.mantissa) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                }
            } else {
                result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }

        // Return the lowest of two Decimal inputs.
        function decimalMin(x, y) {
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = y;
            } else {
                result = x;
            }
            return result;
        }

        // Return the largest of two Decimal inputs.
        function decimalMax(x, y) {
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = x;
            } else {
                result = y;
            }
            return result;
        }

        // Return singular or plural string based on the value of the input.
        function checkPlural(input, singular, plural) {
            input = new Decimal(input);
            if (input.equals(1)) {
                result = singular;
            } else {
                result = plural;
            }
            return result;
        }

        function updateResult() {
            if (document.getElementById('TheFinalStarCalculatorTierInput').value === '' || toScientific(document.getElementById('TheFinalStarCalculatorTierInput').value).lessThan(58)) {
                tier = new Decimal(58);
            } else {
                tier = toScientific(document.getElementById('TheFinalStarCalculatorTierInput').value).floor();
            }

            var outputString = '';
            for (var x = 0; tier.sub(57).greaterThan(x); x++) {
                outputString += 'Final ';
            }
            outputString = 'The ' + outputString + 'Star';

            document.getElementById('TheFinalStarCalculatorFinalCount').innerHTML = notateInt(tier.sub(57)) + ' ' + checkPlural(tier.sub(57), 'Final Star', 'Final Stars');
            document.getElementById('TheFinalStarCalculatorTierOutput').innerHTML = outputString;
        }

        // Add event listeners.
        document.getElementById('TheFinalStarCalculatorSuffixToggleButton').addEventListener('click', function() {
            if (suffixStatus === false) {
                suffixStatus = true;
            } else {
                suffixStatus = false;
            }
            window.localStorage.TheFinalStarCalculatorSuffixStatus = suffixStatus;
            updateSuffixStatus();
            document.getElementById('TheFinalStarCalculatorComputingText').setAttribute('style', '');
            document.getElementById('TheFinalStarCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResult();
                document.getElementById('TheFinalStarCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('TheFinalStarCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });
        document.getElementById('TheFinalStarCalculatorCalculateButton').addEventListener('click', function() {
            document.getElementById('TheFinalStarCalculatorComputingText').setAttribute('style', '');
            document.getElementById('TheFinalStarCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResult();
                document.getElementById('TheFinalStarCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('TheFinalStarCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });
        updateResult();
    } else {
        console.log('[The Final Star Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.');
    }
}
addTheFinalStarCalculator();