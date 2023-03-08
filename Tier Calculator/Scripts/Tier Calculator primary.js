// Function for ensuring all the calculator's inner workings stay within.
function addTierCalculator() {
    if (document.getElementById('TierCalculator') !== null && document.getElementById('TierCalculatorContainer') === null) {
        console.log('[Tier Calculator] [LOG]: ID located. Running script.');

        // Create the calculator's user interface.
        document.getElementById('TierCalculator').innerHTML = "<div id='TierCalculatorContainer'><div class='templatedesktop' style='padding:0.5em;width:80%;margin:auto;text-align:center'><div style='text-align:initial;padding:1em;background:initial;overflow:auto;float:left' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='TierCalculatorSuffixToggleButton'>Disabled</button></div><div style='font-size:24px;font-weight:bold;text-align:center'><img src='./Tier Calculator/Assets/TP.png' width='150'/> Tier Calculator <img src='./Tier Calculator/Assets/TP.png' width='150'/></div><p>Current Tier (<abbr title='Default value: 1.'>notes</abbr>):<input id='TierCalculatorCurrentTierInput' style='width:10%'></input></p><p>Desired Tier (<abbr title='Default value: Current Tier + 1.'>notes</abbr>):<input id='TierCalculatorGoalTierInput' style='width:10%'></input></p><p>Percentage until next Tier (<abbr title='(n1) Optional. (n2) Input any value ranging from 0 to 100, without the percentage symbol. (n3) Default value: 0%.'>notes</abbr>):<input id='TierCalculatorNextTierCompletionInput' style='width:10%'></input>%</p><button id='TierCalculatorCalculateButton'>Calculate</button><p class='templatedesktop' style='font-weight:bold;font-size:20px;padding:0.25em;border-left:initial;border-right:initial;border-radius:initial'>Results</p><p><p id='TierCalculatorComputingText' style='display:none'><i>Computing...</i></p><div id='TierCalculatorResultsSection'><br>At Tier <span id='TierCalculatorCurrentTierOutput'></span>, when currently <span id='TierCalculatorNextTierCompletionOutput'></span>% to next Tier, reaching Tier <span id='TierCalculatorGoalTierOutput'></span> will require <span id='TierCalculatorTPRequirementOutput'></span> TP, and will result in the following bonuses:<br><p><img src='./Tier Calculator/Assets/Grass.png' width='50'/><img src='./Tier Calculator/Assets/XP.png' width='50'/><b>Grass</b> and <b>XP</b>: <span id='TierCalculatorGrassXPBonusCurrentOutput'></span> > <span id='TierCalculatorGrassXPBonusNextOutput'></span></p><p id='TierCalculatorSPBonusSection'><img src='./Tier Calculator/Assets/SP.png' width='50'/><b>SP:</b> <span id='TierCalculatorSPBonusCurrentOutput'></span> > <span id='TierCalculatorSPBonusNextOutput'></span></p></p></div></div></div>";

        // Variable declarations.
        var suffixStatus; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentTier;
        var goalTier;
        var nextTierCompletion;
        const standardBonuses = [1, 5, 7.5, 11.25, 16.88, 25.31, 37.97, 56.95, 85.43, 128, 192, 288, 432, 649, 973, 1459, 2189, 3284, 9852, 29557, 88673, 266020, 798016, 2.394e6, 7.182e6, 2.155e7, 6.464e7, 1.939e8, 3.879e8, 7.757e8, 1.551e9, 3.102e9, 6.205e9, 1.241e10, 2.482e10, 4.965e10, 9.929e10, 1.986e11, 3.972e11, 7.943e11, 1.589e12];
        const tpReqs = [0, 300, 900, 2700, 10800, 54000, 216000, 864000, 2.592e6, 7.776e6, 3.11e7, 1.555e8, 7.776e8, 3.11e9, 3.11e10, 4.666e11, 9.331e12, 9.331e14, 2.799e16, 8.398e17, 2.519e19, 7.558e20, 2.267e22, 6.802e23, 2.041e25, 6.122e26, 6.122e29, 6.122e32, 6.122e35, 6.122e37, 6.122e39, 6.122e41, 6.122e43, 6.122e45, 6.122e47, 6.122e49];

        // Function for updating suffix status and its respective toggle button based on localStorage data.
        function updateSuffixStatus() {
            if (window.localStorage.TierCalculatorSuffixStatus === 'true') {
                suffixStatus = true;
                document.getElementById('TierCalculatorSuffixToggleButton').setAttribute('style', 'background:#00FF00');
                document.getElementById('TierCalculatorSuffixToggleButton').innerHTML = 'Enabled';
            } else {
                suffixStatus = false;
                document.getElementById('TierCalculatorSuffixToggleButton').setAttribute('style', 'background:#FF0000');
                document.getElementById('TierCalculatorSuffixToggleButton').innerHTML = 'Disabled';
            }
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

        // Return the smallest of two Decimal inputs.
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

        // Get data from inputs.
        function getInputData() {
            if (document.getElementById("TierCalculatorCurrentTierInput").value === '' || toScientific(document.getElementById("TierCalculatorCurrentTierInput").value).lessThan(1)) {
                currentTier = new Decimal(1);
            } else {
                currentTier = toScientific(document.getElementById("TierCalculatorCurrentTierInput").value).floor();
            }
            if (document.getElementById("TierCalculatorGoalTierInput").value === '') {
                goalTier = currentTier.add(1);
            } else if (toScientific(document.getElementById("TierCalculatorGoalTierInput").value).lessThan(1)) {
                goalTier = new Decimal(1);
            } else {
                goalTier = toScientific(document.getElementById("TierCalculatorGoalTierInput").value).floor();
            }
            if (document.getElementById('TierCalculatorNextTierCompletionInput').value === '' || toScientific(document.getElementById('TierCalculatorNextTierCompletionInput').value).lessThan(0)) {
                nextTierCompletion = new Decimal(0);
            } else if (toScientific(document.getElementById('TierCalculatorNextTierCompletionInput').value).greaterThanOrEqualTo(100)) {
                nextTierCompletion = new Decimal(100);
            } else {
                nextTierCompletion = toScientific(document.getElementById('TierCalculatorNextTierCompletionInput').value);
            }
        }

        // Update the HTML output.
        function updateResults() {
            getInputData();

            // Function for assigning specific colours to each bonus based on whether the difference is a gain, a loss or is equal.
            function getChangeColour() {
                var colours = ['00FF00', 'FF0000', 'FFFF00'];
                if (currentTier.greaterThan(goalTier)) {
                    result = colours[1];
                } else if (goalTier.greaterThan(currentTier)) {
                    result = colours[0];
                } else {
                    result = colours[2];
                }
                return result;
            }

            var currentTP = new Decimal(0);
            var goalTP = new Decimal(0);
            for (var x = 0; x < decimalMin(58, currentTier); x++) {
                if (x > 35 && x < 49) {
                    currentTP = currentTP.add(new Decimal(6.122e49).times(new Decimal(1e3).pow(currentTier - 35)));
                } else if (x > 49) {
                    currentTP = currentTP.add(new Decimal(6.122e92).times(new Decimal(1e4).pow(currentTier - 49)));
                } else {
                    currentTP = currentTP.add(tpReqs[x]);
                }
            }
            for (var x = 0; x < decimalMin(58, goalTier); x++) {
                if (x > 35 && x < 49) {
                    goalTP = goalTP.add(new Decimal(6.122e49).times(new Decimal(1e3).pow(goalTier - 35)));
                } else if (x > 49) {
                    goalTP = goalTP.add(new Decimal(6.122e92).times(new Decimal(1e4).pow(goalTier - 49)));
                } else {
                    goalTP = goalTP.add(tpReqs[x]);
                }
            }
            if (currentTier > 35 && currentTier < 49) {
                var currentTierNextReq = new Decimal(6.122e49).times(new Decimal(1e3).pow(currentTier.sub(35)));
            } else if (currentTier.greaterThan(49)) {
                var currentTierNextReq = new Decimal(6.122e92).times(new Decimal(1e4).pow(currentTier.sub(49)));
            } else {
                var currentTierNextReq = new Decimal(tpReqs[currentTier]);
            }

            if (nextTierCompletion.equals(100) && (goalTier.sub(1).equals(currentTier) || currentTier.sub(1).equals(goalTier))) {
                var totalTPReq = new Decimal(0);
            } else {
                var totalTPReq = goalTP.sub(currentTP).sub(currentTierNextReq.times(nextTierCompletion.dividedBy(100)));
            }

            // Update current and desired Tier and next Tier completion outputs.
            document.getElementById('TierCalculatorCurrentTierOutput').innerHTML = notateInt(currentTier);
            document.getElementById('TierCalculatorGoalTierOutput').innerHTML = notateInt(goalTier);
            document.getElementById('TierCalculatorTPRequirementOutput').innerHTML = notateInt(totalTPReq);
            document.getElementById('TierCalculatorNextTierCompletionOutput').innerHTML = notateInt(nextTierCompletion);

            // Update bonuses.
            if (currentTier.lessThan(41)) {
                document.getElementById('TierCalculatorGrassXPBonusCurrentOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(standardBonuses[Number(currentTier.sub(1))]) + 'x</span>';
            } else {
                document.getElementById('TierCalculatorGrassXPBonusCurrentOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(new Decimal(standardBonuses[40]).times(new Decimal(10).pow(currentTier.sub(41)))) + 'x</span>';
            }

            if (goalTier.lessThan(41)) {
                document.getElementById('TierCalculatorGrassXPBonusNextOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(standardBonuses[Number(goalTier.sub(1))]) + 'x</span>';
            } else {
                document.getElementById('TierCalculatorGrassXPBonusNextOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(new Decimal(standardBonuses[40]).times(new Decimal(10).pow(goalTier.sub(41)))) + 'x</span>';
            }

            if (currentTier.greaterThan(40) || goalTier.greaterThan(40)) {
                document.getElementById('TierCalculatorSPBonusSection').setAttribute('style', '');
                document.getElementById('TierCalculatorSPBonusCurrentOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(new Decimal(10).pow(decimalMax(0, currentTier.sub(40)))) + 'x</span>';
                document.getElementById('TierCalculatorSPBonusNextOutput').innerHTML = "<span style='font-weight:bold;color:#" + getChangeColour() + "'>" + notateInt(new Decimal(10).pow(decimalMax(0, goalTier.sub(40)))) + 'x</span>';
            } else {
                document.getElementById('TierCalculatorSPBonusSection').setAttribute('style', 'display:none');
            }
        }
        updateResults();

        // Add event listeners.
        document.getElementById('TierCalculatorSuffixToggleButton').addEventListener('click', function() {
            if (suffixStatus === false) {
                suffixStatus = true;
            } else {
                suffixStatus = false;
            }
            window.localStorage.TierCalculatorSuffixStatus = suffixStatus;
            updateSuffixStatus();
            document.getElementById('TierCalculatorComputingText').setAttribute('style', '');
            document.getElementById('TierCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResults();
                document.getElementById('TierCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('TierCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });
        document.getElementById('TierCalculatorCalculateButton').addEventListener('click', function() {
            document.getElementById('TierCalculatorComputingText').setAttribute('style', '');
            document.getElementById('TierCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResults();
                document.getElementById('TierCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('TierCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });

    } else {
        console.log('[Tier Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.');
    }
}
addTierCalculator();