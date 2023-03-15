// Function for ensuring all the calculator's inner workings stay within.
function addLevelCalculator() {
    if (document.getElementById('LevelCalculator') !== null && document.getElementById('LevelCalculatorContainer') === null) {
        console.log('[Level Calculator] [LOG]: ID located. Running script.');

        // Create the calculator's user interface.
        document.getElementById('LevelCalculator').innerHTML = "<div id='LevelCalculatorContainer'><div class='templatedesktop' style='padding:0.5em;width:80%;margin:auto;text-align:center'><div style='text-align:initial;padding:1em;background:initial;overflow:auto;float:left' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='LevelCalculatorSuffixToggleButton'>Disabled</button></div><div style='font-size:24px;font-weight:bold;text-align:center'><img src='./Squadron Wiki Level Calculator/Assets/doubleuparrow.png' width='75'/> Level Calculator <img src='./Squadron Wiki Level Calculator/Assets/doubleuparrow.png' width='75'/></div><p>Current Level (<abbr id='LevelCalculatorCurrentLevelNotes'>notes</abbr>):<input id='LevelCalculatorCurrentLevelInput' style='width:10%'></input></p><p>Desired Level (<abbr id='LevelCalculatorGoalLevelNotes'>notes</abbr>):<input id='LevelCalculatorGoalLevelInput' style='width:10%'></input></p><p>Progress until next Level (<abbr title='(n1) Optional. (n2) Input any value ranging from 0 to 100% of next level requirement. (n3) Default value: 0% of next level requirement.'>notes</abbr>):<input id='LevelCalculatorNextLevelProgressInput' style='width:10%'></input></p><button id='LevelCalculatorCalculateButton'>Calculate</button><p class='templatedesktop' style='font-weight:bold;font-size:20px;padding:0.25em;border-left:initial;border-right:initial;border-radius:initial'>Results</p><p><p id='LevelCalculatorComputingText' style='display:none'><i>Computing...</i></p><div id='LevelCalculatorResultsSection'><br>At Level <span id='LevelCalculatorCurrentLevelOutput'></span>, when currently at <span style='color:#FFFF00;font-weight:bold'><span id='LevelCalculatorNextLevelProgressOutput'></span> XP</span> to next level, reaching Level <span id='LevelCalculatorGoalLevelOutput'></span> (<b><span id='LevelCalculatorLevelChangeOutput'></span></b>) will <span id='LevelCalculatorRequireWordOutput'></span> <span style='color:#FFFF00;font-weight:bold'><span id='LevelCalculatorXPRequirementOutput'></span> XP</span>, and will result in the following bonuses:<br><p id='LevelCalculatorBonusesOutput'></p></div></div></div>";

        // Variable declarations.
        var suffixStatus; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentLevel;
        var goalLevel;
        var nextLevelProgress;

        // Function for updating suffix status and its respective toggle button based on localStorage data.
        function updateSuffixStatus() {
            if (window.localStorage.SquadronWikiLevelCalculatorSuffixStatus === 'true') {
                suffixStatus = true;
                document.getElementById('LevelCalculatorSuffixToggleButton').setAttribute('style', 'background:#00FF00');
                document.getElementById('LevelCalculatorSuffixToggleButton').innerHTML = 'Enabled';
            } else {
                suffixStatus = false;
                document.getElementById('LevelCalculatorSuffixToggleButton').setAttribute('style', 'background:#FF0000');
                document.getElementById('LevelCalculatorSuffixToggleButton').innerHTML = 'Disabled';
            }
            document.getElementById('LevelCalculatorCurrentLevelNotes').title = '(n1) Default value: 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of ' + notateInt(1e7) + '.';
            document.getElementById('LevelCalculatorGoalLevelNotes').title = '(n1) Default value: Current Level + 1. (n2) Values above 100,000 may cause performance issues. It is not recommended to exceed values of ' + notateInt(1e7) + '.';
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

        function calcHP(x, y) {
            y = new Decimal(y);
            if (x !== true) {
                x = 1;
            } else {
                x = 0.5;
            }
            return new Decimal(100).add(new Decimal(50).times((y.sub(1)).pow(1.25))).times(x).add(0.5).floor();
        }

        console.log('testing test: ' + calcHP(false, 6));
        console.log('-----');

        function calcXPReq(x) {
            x = new Decimal(x);
            if (x.equals(0)) {
                result = 0;
            } else {
                result = new Decimal(10).add(x.sub(1).times(3)).times(calcHP(true, x));
            }
            return new Decimal(result);
        }

        function loopXPReq(type) {
            result = new Decimal(0);
            for (var x = 0; type.greaterThan(x); x++) {
                result = result.add(calcXPReq(x));
            }
            return result;
        }

        // Function for retrieving data from inputs.
        function getInputData() {
            if (document.getElementById("LevelCalculatorCurrentLevelInput").value === '' || toScientific(document.getElementById("LevelCalculatorCurrentLevelInput").value).lessThan(1)) {
                currentLevel = new Decimal(1);
            } else {
                currentLevel = toScientific(document.getElementById("LevelCalculatorCurrentLevelInput").value).floor();
            }
            if (document.getElementById('LevelCalculatorGoalLevelInput').value === '') {
                goalLevel = currentLevel.add(1);
            } else if (toScientific(document.getElementById('LevelCalculatorGoalLevelInput').value).lessThan(1)) {
                goalLevel = new Decimal(1);
            } else {
                goalLevel = toScientific(document.getElementById('LevelCalculatorGoalLevelInput').value).floor();
            }
            if (document.getElementById("LevelCalculatorNextLevelProgressInput").value === '' || toScientific(document.getElementById("LevelCalculatorNextLevelProgressInput").value).lessThan(0)) {
                nextLevelProgress = new Decimal(0);
            } else if (toScientific(document.getElementById("LevelCalculatorNextLevelProgressInput").value).greaterThan(loopXPReq(decimalMax(goalLevel, currentLevel)).sub(loopXPReq(decimalMin(goalLevel, currentLevel))))) {
                nextLevelProgress = loopXPReq(decimalMax(goalLevel, currentLevel)).sub(loopXPReq(decimalMin(goalLevel, currentLevel)));
            } else {
                nextLevelProgress = decimalMin(loopXPReq(decimalMax(goalLevel, currentLevel)).sub(loopXPReq(decimalMin(goalLevel, currentLevel))), toScientific(document.getElementById("LevelCalculatorNextLevelProgressInput").value).floor());
            }
        }

        // Function for updating the HTML outputs.
        function updateResults() {
            var bonusesOutputString = '';
            getInputData();

            document.getElementById('LevelCalculatorCurrentLevelOutput').innerHTML = notateInt(currentLevel);
            document.getElementById('LevelCalculatorGoalLevelOutput').innerHTML = notateInt(goalLevel);
            document.getElementById('LevelCalculatorNextLevelProgressOutput').innerHTML = notateInt(nextLevelProgress);
            document.getElementById('LevelCalculatorRequireWordOutput').innerHTML = 'require';

            if (goalLevel.greaterThan(currentLevel)) {
                document.getElementById('LevelCalculatorLevelChangeOutput').innerHTML = "<span style='color:#00FF00'>+" + notateInt(goalLevel.sub(currentLevel)) + '</span>';
                bonusesOutputString += "<p>Base health: <span style='color:#00FF00'>" + notateInt(calcHP(false, currentLevel)) + "</span> > <span style='color:#00FF00'>" + notateInt(calcHP(false, goalLevel)) + '</span></p>';
            } else if (currentLevel.greaterThan(goalLevel)) {
                document.getElementById('LevelCalculatorLevelChangeOutput').innerHTML = "<span style='color:#FF0000'>-" + notateInt(currentLevel.sub(goalLevel)) + '</span>';
                document.getElementById('LevelCalculatorRequireWordOutput').innerHTML = 'result in a loss of';
                bonusesOutputString += "<p>Base health: <span style='color:#FF0000'>" + notateInt(calcHP(false, currentLevel)) + "</span> > <span style='color:#FF0000'>" + notateInt(calcHP(false, goalLevel)) + '</span></p>';
            } else {
                document.getElementById('LevelCalculatorLevelChangeOutput').innerHTML = "<span style='color:#FFFF00'>~0</span>";
                bonusesOutputString += "<p>Base health: <span style='color:#FFFF00'>" + notateInt(calcHP(false, currentLevel)) + "</span> > <span style='color:#FFFF00'>" + notateInt(calcHP(false, goalLevel)) + '</span></p>';
            }
            document.getElementById('LevelCalculatorXPRequirementOutput').innerHTML = notateInt(loopXPReq(goalLevel).sub(loopXPReq(currentLevel)).sub(nextLevelProgress));

            var totalPlayableMaps = 0;
            var totalDifficulties = 0;
            // Generate the maps that can be played on each difficulty, based on level.
            function generateMapList() {
                var mapsString = '';

                function Map(name, easy, medium, hard, insane) {
                    this.name = name;
                    this.e = easy;
                    this.m = medium;
                    this.h = hard;
                    this.i = insane;
                }
                const mapData = [new Map('Prototype', 1, 4, 7, 10), new Map('Splatter', 13, 16, 19, 22), new Map('Alley', 25, 28, 31, 34), new Map('Shipwrecked', 37, 40, 43, 46), new Map('Station', 49, 52, 55, 58), new Map('Wave Defense: Prototype', 5, 15, 25, 35), new Map('Wave Defense: Coliseum', 45, 55, 65, 75), new Map('Station - Elite', 50, 55, 60, 65), new Map('Heist', 70, 75, 80, 85), new Map('Mines', 90, 95, 100, 105), new Map('Cyber', 110, 115, 120, 125)];

                function checkReq(x) {
                    var tempString = '';
                    if (currentLevel.greaterThanOrEqualTo(mapData[x].e) || goalLevel.greaterThanOrEqualTo(mapData[x].e)) {
                        tempString += "<span style='color:#009600'>Easy (" + notateInt(mapData[x].e) + ')</span>';
                        totalPlayableMaps++;
                        totalDifficulties++;
                    }
                    if (currentLevel.greaterThanOrEqualTo(mapData[x].m) || goalLevel.greaterThanOrEqualTo(mapData[x].m)) {
                        tempString += "<span style='color:#AAAA00'> | Medium (" + notateInt(mapData[x].m) + ')</span>';
                        totalDifficulties++;
                    }
                    if (currentLevel.greaterThanOrEqualTo(mapData[x].h) || goalLevel.greaterThanOrEqualTo(mapData[x].h)) {
                        tempString += "<span style='color:#964B00'> | Hard (" + notateInt(mapData[x].h) + ')</span>';
                        totalDifficulties++;
                    }
                    if (currentLevel.greaterThanOrEqualTo(mapData[x].i) || goalLevel.greaterThanOrEqualTo(mapData[x].i)) {
                        tempString += "<span style='color:#960000'> | Insane (" + notateInt(mapData[x].i) + ')</span>';
                        totalDifficulties++;
                    }

                    if (currentLevel.greaterThanOrEqualTo(mapData[x].e) || goalLevel.greaterThanOrEqualTo(mapData[x].e)) {
                        tempString = "<br><span style='font-weight:bold'>[" + tempString + '] ' + mapData[x].name + '</span>';
                    }
                    return tempString;
                }
                for (var x = 0; x < mapData.length; x++) {
                    mapsString += checkReq(x);
                }
                return mapsString;
            }
            generateMapList();
            document.getElementById('LevelCalculatorBonusesOutput').innerHTML = bonusesOutputString + '<p>You will also be able to play the following maps (total: ' + notateInt(totalPlayableMaps) + ' ' + checkPlural(totalPlayableMaps, 'map', 'maps') + ', ' + notateInt(totalDifficulties) + ' ' + checkPlural(totalDifficulties, 'difficulty', 'difficulties') + '):<br>' + generateMapList() + '</p>';
        }

        // Add event listeners.
        document.getElementById('LevelCalculatorSuffixToggleButton').addEventListener('click', function() {
            if (suffixStatus === false) {
                suffixStatus = true;
            } else {
                suffixStatus = false;
            }
            window.localStorage.SquadronWikiLevelCalculatorSuffixStatus = suffixStatus;
            updateSuffixStatus();
            document.getElementById('LevelCalculatorComputingText').setAttribute('style', '');
            document.getElementById('LevelCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResults();
                document.getElementById('LevelCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('LevelCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });
        document.getElementById('LevelCalculatorCalculateButton').addEventListener('click', function() {
            document.getElementById('LevelCalculatorComputingText').setAttribute('style', '');
            document.getElementById('LevelCalculatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResults();
                document.getElementById('LevelCalculatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('LevelCalculatorResultsSection').setAttribute('style', '');
            }, 1);
        });
        updateResults();

    } else {
        console.log('[Level Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.');
    }
}
addLevelCalculator();