function addSolarianStageCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    // [WIP] Calculator inaccuracies, particularly with the minimum requirement, are known and will be fixed at some point.
    if (document.getElementById('SolarianStageCalculator') !== null && document.getElementById('SolarianStageCalculatorContainer') === null) {
        console.log('[Solarian Stage Calculator] [LOG] ID located. Running script.');
        document.getElementById('SolarianStageCalculator').innerHTML = "<div id='SolarianStageCalculatorContainer' class='templatedesktop' style='color:#FFF;padding:1em;background:#2F0075;width:80%;margin:auto'><div class='templatedesktop' style='background:initial;width:20%;padding:1em;overflow:auto'>Toggle Suffixes<br><button id='SSCSuffixToggleButton' style='background:#FF0000'>Disabled</button></div><div style='text-align:center;font-size:24px'><img src='./Assets/Solarian Stage Calculator/Sword.png' width='100'/> Solarian Stage Calculator <img src='./Assets/Solarian Stage Calculator/Shield.png' width='100'/><br><div style='font-size:initial'><p>Stage: <input id='SSCCurrentStageInput' style='width:5%'/></p><p>Solarian Challenge: <input id='SSCChallengeInput' class='slider' type='range' value='0' min='0' max='3'/></p><p style='font-size:14px'>Selected challenge: <span id='SSCSelectedChallengeText'/></p></div></div><table style='margin:auto;color:#FFF'><tr><td><b>Your offence:</b> <input id='SSCPlayerOffenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy offence:</b> <span id='SSCEnemyOffenceOutput'/></td></tr><tr><td><b>Your defence:</b> <input id='SSCPlayerDefenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy defence:</b> <span id='SSCEnemyDefenceOutput'/></td></tr><tr><td><b>Your maximum health (100x defence):</b> <span id='SSCPlayerMaximumHealthOutput'/></td><td style='text-align:right'><b>Enemy maximum health:</b> <span id='SSCEnemyMaximumHealthOutput'/></td></tr><tr><td><b>Your current health (optional, default 100% of max health):</b> <input id='SSCPlayerCurrentHealthInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy current health (optional, default 100% of max health):</b> <input id='SSCEnemyCurrentHealthInput' style='width:10%'/></td></tr></table><div style='margin-top:1em;text-align:center'><p>Real Time/Offline Time converter:<br><input id='SSCTimeConverterYearsInput' style='width:10%' placeholder='Years'></input><input id='SSCTimeConverterDaysInput' style='width:10%' placeholder='Days'></input><input id='SSCTimeConverterHoursInput' style='width:10%' placeholder='Hours'></input><input id='SSCTimeConverterMinutesInput' style='width:10%' placeholder='Minutes'></input><input id='SSCTimeConverterSecondsInput' style='width:10%' placeholder='Seconds'></input></p><p>Mode: <span id='SSCTimeConverterModeOutput' class='templatedesktop' style='padding:0.25em'>Real time > Offline time</span><br><p>Result: <span id='SSCTimeConverterTimeOutput'>?</span> (<span id='SSCTimeConverterEffectOutput'>?x</span>)</p><br><p>Challenge Score <> Fighting Multiplier converter:<br><input id='SSCCSConverterInput' style='width:20%' placeholder='CS or FM'><p>Mode: <span id='SSCCSConverterModeOutput' class='templatedesktop' style='padding:0.25em'>Challenge Score > Fighting Multiplier</span></p><p>Result: <span id='SSCCSConverterOutput'>?</span></p><br><p>Solarian Challenge stage requirement calculator:<div id='SSCSCSRCSolarianChallengeSliderSection'><br>Solarian Challenge: <input id='SSCCSRCChallengeInput' class='slider' type='range' value='0' min='0' max='8'/><br><span style='font-size:14px'>Selected challenge: <span id='SSCCSRCSelectedChallengeOutput'>?</span></span></div></p><p><div id='SSCCSRCModeSCSSection'>Current completions: <input id='SSCCSRCChallengeCurrentCompletionsInput' style='width:10%'/></p><p>Desired completions: <input id='SSCCSRCChallengeNextCompletionsInput' style='width:10%'/></div><p>Mode: <span id='SSCCSRCModeOutput' class='templatedesktop' style='padding:0.25em'>Solarian Challenge > Stage Requirement</span></p><p>Result: <span id='SSCCSRCOutput'>?</span></p><button id='SSCCalculateButton'>Calculate</button></div><br><div class='templatedesktop' style='background:initial;border-left:0;border-right:0;border-bottom:0;padding:0.5em;border-radius:initial;text-align:center'><div style='font-size:20px;font-weight:bold'>Result</div><br>At Stage <span id='SSCCurrentStageOutput'>?</span>, the requirements to complete the stage, when currently at <span id='SSCCurrentHealthOutput'>?</span>/<span id='SSCMaximumHealthOutput'>?</span> health<img src='./Assets/Solarian Stage Calculator/Health.png' width='50'/>, are:<br><br><img src='./Assets/Solarian Stage Calculator/Sword.png' width='50'/> Offence: <span id='SSCPlayerOffenceCurrentOutput'>?</span> (current) > <span id='SSCPlayerOffenceReqOutput'>?</span> (minimum necessary; currently unavailable) > <span id='SSCPlayerOffenceMaxOutput'>?</span> (instant completion)<br><img src='./Assets/Solarian Stage Calculator/Shield.png' width='50'/> Defence: <span id='SSCPlayerDefenceCurrentOutput'>?</span> (current) > <span id='SSCPlayerDefenceReqOutput'>?</span> (minimum necessary; currently unavailable) > <span id='SSCPlayerDefenceMaxOutput'>?</span> (instant completion)<br><p>Your Stage Bonuses will also become:<br><br>Sunrise FM: <span id='SSCStageBonusSunriseFMCurrentOutput'>?</span>x > <span id='SSCStageBonusSunriseFMNextOutput'>?</span>x<br>Solar Rays: <span id='SSCStageBonusSolarRaysCurrentOutput'>?</span>x > <span id='SSCStageBonusSolarRaysNextOutput'>?</span>x<br>Sunstone: <span id='SSCStageBonusSunstoneCurrentOutput'>?</span>x > <span id='SSCStageBonusSunstoneNextOutput'>?</span>x<br><span id='SSCSolarShardsStageBonusContainer' style='display:none'>Solar Shards: <span id='SSCStageBonusSolarShardsCurrentOutput'>?</span>x > <span id='SSCStageBonusSolarShardsNextOutput'>?</span>x</span><br><span id='SSCSoulsStageBonusContainer' style='display:none'>Souls (hidden bonus): <span id='SSCStageBonusSoulsCurrentOutput'>?</span>x > <span id='SSCStageBonusSoulsNextOutput'>?</span>x</span></p></div></div>";

        var playerOffence, playerDefence, playerMaxHealth, playerCurrentHealth, enemyOffence, enemyDefence, enemyMaxHealth, enemyCurrentHealth, currentStage, challenge, challengeSCSRC, challengeStartingReqSCSRC, completionsScalingSCSRC, maxCompletionsSCSRC, completionsCurrentSCSRC, completionsNextSCSRC, enemyStatScaling, enemyHealthScaling;
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var modeTC = 'ro'; // Determines the conversion method of the Offline Time Converter.
        var modeCSC = 'csfm'; // Determines the conversion method of the Challenge Score Converter.
        var modeCSRC = 'scs'; // Determines the conversion method of the Solarian Challenge Stage Requirement Calculator.
        var statPref = 'all'; // Determines whether to prioritise offence, defence or balance both in the minimum requirements to complete the stage.

        function toScientific(e) { // Used to ensure a user-inputted value is a scientific notation number.
            if (e.match(/[a-z]+/gi) !== null && suffixes[suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase())] !== undefined) {
                var mantissa = e.match(/\d+[.]?\d*/g);
                extraZeroes = Math.floor(Math.log10(Number(mantissa)));
                mantissa = mantissa / (10 ** extraZeroes);
                var exponent = suffixesLC.indexOf(e.match(/[a-z]+/gi)[0].toLowerCase()) * 3 + extraZeroes;
                result = new Decimal(mantissa + "e" + exponent);
            } else {
                result = new Decimal(e);
            }
            return result;
        }

        function notateInt(e) { // Convert a Decimal number to a string and notate it using either locale string (comma-separated numbers), scientific notation with a fixed number of decimals or suffix notation.
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
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(1e21)) {
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
                        result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + "e" + notateInt(checkNoDecimal(e.exponent)); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                        break;
                    default:
                        result = checkNoDecimal(e.mantissa) + "e" + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                }
            } else {
                result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }

        function updateChallenge() { // Update Solarian Challenge data.
            switch (Number(document.getElementById("SSCChallengeInput").value)) {
                case 0:
                    challenge = false;
                    enemyStatScaling = new Decimal(10);
                    enemyHealthScaling = new Decimal(10.3);
                    document.getElementById("SSCSelectedChallengeText").innerHTML = "None (10x stats, 10.3x health, 300:1 offline time)";
                    break;
                case 1:
                    challenge = "cycle";
                    enemyStatScaling = new Decimal(10);
                    enemyHealthScaling = new Decimal(10.3);
                    document.getElementById("SSCSelectedChallengeText").innerHTML = "Cycle (10x stats, 10.3x health, 3:1 offline time)";
                    break;
                case 2:
                    challenge = "wall";
                    enemyStatScaling = new Decimal(50);
                    enemyHealthScaling = new Decimal(50.15);
                    document.getElementById("SSCSelectedChallengeText").innerHTML = "Wall (50x stats, 50.15x health, 300:1 offline time)";
                    break;
                case 3:
                    challenge = "evil";
                    enemyStatScaling = new Decimal(1e10);
                    enemyHealthScaling = new Decimal(1.03e10);
                    document.getElementById("SSCSelectedChallengeText").innerHTML = "Evil (" + notateInt(1e10) + "x stats, " + notateInt(1.03e10) + "x health, 300:1 offline time)";
            }
            switch (Number(document.getElementById('SSCCSRCChallengeInput').value)) {
                case 0:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Basic (<abbr title='Maximum completions.'>max.</abbr> 8)";
                    challengeSCSRC = 'Basic';
                    challengeStartingReqSCSRC = 14;
                    maxCompletionsSCSRC = 8;
                    completionsScalingSCSRC = 1;
                    break;
                case 1:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Cycle (<abbr title='Maximum completions.'>max.</abbr> 10)";
                    challengeSCSRC = 'Cycle';
                    challengeStartingReqSCSRC = 10;
                    maxCompletionsSCSRC = 10;
                    completionsScalingSCSRC = 2;
                    break;
                case 2:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Soul (<abbr title='Maximum completions.'>max.</abbr> 10)";
                    challengeSCSRC = 'Soul';
                    challengeStartingReqSCSRC = 14;
                    maxCompletionsSCSRC = 10;
                    completionsScalingSCSRC = 1;
                    break;
                case 3:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Wall (<abbr title='Maximum completions.'>max.</abbr> 10)";
                    challengeSCSRC = 'Wall';
                    challengeStartingReqSCSRC = 10;
                    maxCompletionsSCSRC = 10;
                    completionsScalingSCSRC = 1;
                    break;
                case 4:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Soulless (<abbr title='Maximum completions.'>max.</abbr> 5)";
                    challengeSCSRC = 'Soulless';
                    challengeStartingReqSCSRC = 10;
                    maxCompletionsSCSRC = 5;
                    completionsScalingSCSRC = 2;
                    break;
                case 5:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Limited (<abbr title='Maximum completions.'>max.</abbr> 5)";
                    challengeSCSRC = 'Limited';
                    challengeStartingReqSCSRC = 20;
                    maxCompletionsSCSRC = 5;
                    completionsScalingSCSRC = 2;
                    break;
                case 6:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Strong (<abbr title='Maximum completions.'>max.</abbr> 5)";
                    challengeSCSRC = 'Strong';
                    challengeStartingReqSCSRC = 20;
                    maxCompletionsSCSRC = 5;
                    completionsScalingSCSRC = 3;
                    break;
                case 7:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Evil (<abbr title='Maximum completions.'>max.</abbr> 5)";
                    challengeSCSRC = 'Evil';
                    challengeStartingReqSCSRC = 3;
                    maxCompletionsSCSRC = 5;
                    completionsScalingSCSRC = 1;
                    break;
                case 8:
                    document.getElementById('SSCCSRCSelectedChallengeOutput').innerHTML = "Touch Real Grass (<abbr title='Maximum completions.'>max.</abbr> 1)";
                    challengeSCSRC = 'Touch Real Grass';
                    challengeStartingReqSCSRC = 333;
                    maxCompletionsSCSRC = 1;
                    completionsScalingSCSRC = 0;
            }
            challengeStartingReqSCSRC = new Decimal(challengeStartingReqSCSRC);
            maxCompletionsSCSRC = new Decimal(maxCompletionsSCSRC);
            completionsScalingSCSRC = new Decimal(completionsScalingSCSRC);
        }

        function decimalMin(x, y) { // Return the lowest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = y;
            } else {
                result = x;
            }
            return result;
        }

        function decimalMax(x, y) { // Return the largest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = x;
            } else {
                result = y;
            }
            return result;
        }

        function checkPlural(input, singular, plural) { // Return singular or plural string based on the value of the input.
            input = new Decimal(input);
            if (input.equals(1)) {
                result = singular;
            } else {
                result = plural;
            }
            return result;
        }

        function modOp(x, y) { // Custom modulo operation function to support >1.797e308 numbers.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.lessThan(1.797693134862315e308) && y.lessThan(1.797693134862315e308)) {
                result = Math.floor(x % y);
            } else {
                result = x.sub(x.dividedBy(y).floor().times(y));
            }
            return new Decimal(result);
        }

        function updateResults() { // Update the internal data based on user inputted data, as well as the HTML outputs.
            updateChallenge();
            if (document.getElementById("SSCCurrentStageInput").value === '' || new Decimal(document.getElementById("SSCCurrentStageInput").value).lessThan(1)) {
                currentStage = new Decimal(1);
            } else {
                currentStage = toScientific(document.getElementById("SSCCurrentStageInput").value).floor();
            }
            enemyMaxHealth = new Decimal(3e3).times(enemyHealthScaling.pow(currentStage.sub(1)));
            if (document.getElementById("SSCPlayerOffenceInput").value === '' || new Decimal(document.getElementById("SSCPlayerOffenceInput").value).lessThan(0)) {
                playerOffence = new Decimal(1);
            } else {
                playerOffence = toScientific(document.getElementById("SSCPlayerOffenceInput").value);
            }
            if (document.getElementById("SSCPlayerDefenceInput").value === '' || new Decimal(document.getElementById("SSCPlayerDefenceInput").value).lessThan(0)) {
                playerDefence = new Decimal(0);
                playerMaxHealth = new Decimal(0);
            } else {
                playerDefence = toScientific(document.getElementById("SSCPlayerDefenceInput").value);
                if (playerDefence.lessThan(15)) {
                    playerMaxHealth = new Decimal(0);
                } else {
                    playerMaxHealth = playerDefence.times(100);
                }
            }
            if (document.getElementById("SSCPlayerCurrentHealthInput").value === '' || new Decimal(document.getElementById("SSCPlayerCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("SSCPlayerCurrentHealthInput").value).greaterThan(playerMaxHealth)) {
                playerCurrentHealth = playerMaxHealth;
            } else {
                playerCurrentHealth = toScientific(document.getElementById("SSCPlayerCurrentHealthInput").value);
            }
            if (document.getElementById("SSCEnemyCurrentHealthInput").value === '' || new Decimal(document.getElementById("SSCEnemyCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("SSCEnemyCurrentHealthInput").value).greaterThan(enemyMaxHealth)) {
                enemyCurrentHealth = enemyMaxHealth;
            } else {
                enemyCurrentHealth = toScientific(document.getElementById("SSCEnemyCurrentHealthInput").value);
            }
            var secondsTC;
            var minutesTC;
            var hoursTC;
            var daysTC;
            var yearsTC;
            var inputValueCSC;
            if (document.getElementById("SSCTimeConverterSecondsInput").value === '' || new Decimal(document.getElementById("SSCTimeConverterSecondsInput").value).lessThan(0)) {
                secondsTC = new Decimal(0);
            } else {
                secondsTC = toScientific(document.getElementById("SSCTimeConverterSecondsInput").value);
            }
            if (document.getElementById("SSCTimeConverterMinutesInput").value === '' || new Decimal(document.getElementById("SSCTimeConverterMinutesInput").value).lessThan(0)) {
                minutesTC = new Decimal(0);
            } else {
                minutesTC = toScientific(document.getElementById("SSCTimeConverterMinutesInput").value);
            }
            if (document.getElementById("SSCTimeConverterHoursInput").value === '' || new Decimal(document.getElementById("SSCTimeConverterHoursInput").value).lessThan(0)) {
                hoursTC = new Decimal(0);
            } else {
                hoursTC = toScientific(document.getElementById("SSCTimeConverterHoursInput").value);
            }
            if (document.getElementById("SSCTimeConverterDaysInput").value === '' || new Decimal(document.getElementById("SSCTimeConverterDaysInput").value).lessThan(0)) {
                daysTC = new Decimal(0);
            } else {
                daysTC = toScientific(document.getElementById("SSCTimeConverterDaysInput").value);
            }
            if (document.getElementById("SSCTimeConverterYearsInput").value === '' || new Decimal(document.getElementById("SSCTimeConverterYearsInput").value).lessThan(0)) {
                yearsTC = new Decimal(0);
            } else {
                yearsTC = toScientific(document.getElementById("SSCTimeConverterYearsInput").value);
            }
            if (document.getElementById("SSCCSConverterInput").value === '' || new Decimal(document.getElementById("SSCCSConverterInput").value).lessThan(0)) {
                inputValueCSC = new Decimal(0);
            } else {
                inputValueCSC = toScientific(document.getElementById("SSCCSConverterInput").value).floor();
            }
            if (document.getElementById("SSCCSRCChallengeCurrentCompletionsInput").value === '' || new Decimal(document.getElementById("SSCCSRCChallengeCurrentCompletionsInput").value).lessThan(0)) {
                completionsCurrentSCSRC = new Decimal(0);
            } else {
                completionsCurrentSCSRC = decimalMin(maxCompletionsSCSRC, toScientific(document.getElementById("SSCCSRCChallengeCurrentCompletionsInput").value).floor());
            }
            if (document.getElementById("SSCCSRCChallengeNextCompletionsInput").value === '' || new Decimal(document.getElementById("SSCCSRCChallengeNextCompletionsInput").value).lessThan(1)) {
                completionsNextSCSRC = new Decimal(1);
            } else {
                completionsNextSCSRC = decimalMin(maxCompletionsSCSRC, toScientific(document.getElementById("SSCCSRCChallengeNextCompletionsInput").value).floor());
            }
            enemyOffence = new Decimal(30).times(enemyStatScaling.pow(currentStage.sub(1)));
            enemyDefence = new Decimal(10).times(enemyStatScaling.pow(currentStage.sub(1)));

            function soulBonusCalc(e) { // Calculate the effect of the 'Souls' Stage Bonus.
                var baseEffect = new Decimal(1.5);
                if (e.greaterThanOrEqualTo(10)) {
                    if ((e.sub(10)).dividedBy(5).floor().greaterThanOrEqualTo(1)) {
                        result = baseEffect.pow((e.sub(10)).dividedBy(5).add(1).floor());
                    } else {
                        result = baseEffect;
                    }
                } else {
                    result = new Decimal(1);
                }
                return result;
            }

            function statOutput(side, stat, value) { // Efficiently update the HTML output.
                switch (side) {
                    case "p":
                        side = "Player";
                        break;
                    case "e":
                        side = "Enemy";
                        break;
                }
                switch (stat) {
                    case "o":
                        stat = "Offence";
                        break;
                    case "d":
                        stat = "Defence";
                        break;
                }
                switch (value) {
                    case "r":
                        value = "FF0000";
                        break;
                    case "y":
                        value = "FFFF00";
                        break;
                    case "g":
                        value = "00FF00";
                        break;
                    case "p":
                        value = "FF00FF";
                        break;
                }
                if (side === "Player") {
                    var docID = document.getElementById('SSC' + side + stat + "CurrentOutput");
                } else {
                    var docID = document.getElementById('SSC' + side + stat + "Output");
                }
                if (side === "Player" && stat === "Offence") {
                    docID = docID.innerHTML = "<span style='color:#" + value + "'>" + notateInt(playerOffence) + "</span>";
                } else if (side === "Player" && stat === "Defence") {
                    docID = docID.innerHTML = "<span style='color:#" + value + "'>" + notateInt(playerDefence) + "</span>";
                } else if (side === "Enemy" && stat === "Offence") {
                    docID = docID.innerHTML = "<span style='color:#" + value + "'>" + notateInt(enemyOffence) + "</span>";
                } else {
                    docID = docID.innerHTML = "<span style='color:#" + value + "'>" + notateInt(enemyDefence) + "</span>";
                }
            }




            // Variables are currently declared outside their function for testing.
            var maxDivide;
            var playerMaxHits = (playerCurrentHealth.add(playerDefence)).dividedBy(enemyOffence);
            var enemyMaxHits = (enemyCurrentHealth.add(enemyDefence)).dividedBy(playerOffence);
            var playerOffenceReq = playerOffence;
            var playerDefenceReq = playerDefence;




            // Updating the HTML output.
            if (playerMaxHits.greaterThan(enemyMaxHits) && playerOffence.lessThan(enemyCurrentHealth.add(enemyDefence))) {
                statOutput("e", "o", "y");
                statOutput("e", "d", "y");
                statOutput("p", "o", "g");
                statOutput("p", "d", "g");
            } else {
                statOutput("e", "o", "y");
                statOutput("e", "d", "y");
                statOutput("p", "o", "y");
                statOutput("p", "d", "y");
            }
            if (playerDefence.greaterThanOrEqualTo(enemyOffence) && enemyDefence.greaterThanOrEqualTo(playerOffence)) {
                statOutput("p", "d", "p");
                statOutput("p", "o", "r");
                statOutput("e", "d", "p");
                statOutput("e", "o", "r");
            } else if (playerDefence.greaterThanOrEqualTo(enemyOffence)) {
                statOutput("p", "d", "p");
                statOutput("e", "o", "r");
            } else if (enemyDefence.greaterThanOrEqualTo(playerOffence)) {
                statOutput("e", "d", "p");
                statOutput("p", "o", "r");
            } else {
                statOutput("p", "d", "y");
                statOutput("p", "o", "y");
                statOutput("e", "d", "y");
                statOutput("e", "o", "y");
            }
            if (playerOffence.greaterThanOrEqualTo(enemyCurrentHealth.add(enemyDefence))) {
                statOutput("e", "o", "r");
                statOutput("e", "d", "r");
                statOutput("p", "o", "p");
                statOutput("p", "d", "p");
            } else if (enemyOffence.greaterThanOrEqualTo(playerCurrentHealth.add(playerDefence))) {
                statOutput("e", "o", "p");
                statOutput("e", "d", "p");
                statOutput("p", "o", "r");
                statOutput("p", "d", "r");
            } else {
                statOutput("e", "o", "y");
                statOutput("e", "d", "y");
                statOutput("p", "o", "y");
                statOutput("p", "d", "y");
            }

            document.getElementById("SSCPlayerMaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
            document.getElementById("SSCEnemyMaximumHealthOutput").innerHTML = notateInt(enemyMaxHealth);
            document.getElementById("SSCPlayerOffenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyCurrentHealth.add(enemyDefence)) + "</span>";
            if (playerDefence.greaterThanOrEqualTo(enemyOffence)) {
                document.getElementById("SSCPlayerDefenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyOffence) + "</span>";
            } else {
                document.getElementById("SSCPlayerDefenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(playerDefence) + "</span>";
            }

            document.getElementById("SSCStageBonusSunriseFMCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage.sub(1)));
            document.getElementById("SSCStageBonusSunriseFMNextOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage));
            document.getElementById("SSCStageBonusSolarRaysCurrentOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage.sub(1)));
            document.getElementById("SSCStageBonusSolarRaysNextOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage));
            document.getElementById("SSCStageBonusSunstoneCurrentOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage.sub(1)));
            document.getElementById("SSCStageBonusSunstoneNextOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage));
            document.getElementById("SSCStageBonusSolarShardsCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMax(0, currentStage.sub(9))));
            document.getElementById("SSCStageBonusSolarShardsNextOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMax(0, currentStage.sub(8))));
            document.getElementById("SSCStageBonusSoulsCurrentOutput").innerHTML = notateInt(soulBonusCalc(currentStage));
            document.getElementById("SSCStageBonusSoulsNextOutput").innerHTML = notateInt(soulBonusCalc(currentStage.add(1)));
            document.getElementById("SSCCurrentStageOutput").innerHTML = notateInt(currentStage);
            document.getElementById("SSCCurrentHealthOutput").innerHTML = notateInt(playerCurrentHealth);
            document.getElementById("SSCMaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
            if (currentStage.greaterThanOrEqualTo(9)) {
                document.getElementById("SSCSolarShardsStageBonusContainer").setAttribute("style", "display:inline");
                document.getElementById("SSCSoulsStageBonusContainer").setAttribute("style", "display:inline");
            } else {
                document.getElementById("SSCSolarShardsStageBonusContainer").setAttribute("style", "display:none");
                document.getElementById("SSCSoulsStageBonusContainer").setAttribute("style", "display:none");
            }

            var challengeOTDivider;
            if (challenge === "cycle") {
                document.getElementById("SSCTimeConverterEffectOutput").innerHTML = "3x during Cycle";
                challengeOTDivider = 3;
            } else {
                document.getElementById("SSCTimeConverterEffectOutput").innerHTML = "300x";
                challengeOTDivider = 300;
            }
            if (secondsTC.add(minutesTC).add(hoursTC).add(daysTC).add(yearsTC).greaterThan(0)) {
                var totalTCTime = secondsTC.add(minutesTC.times(60)).add(hoursTC.times(3.6e3)).add(daysTC.times(8.64e4)).add(yearsTC.times(3.15576e7));
                if (modeTC === "ro") {
                    totalTCTime = totalTCTime.dividedBy(challengeOTDivider);
                } else {
                    totalTCTime = totalTCTime.times(challengeOTDivider);
                }

                function outputTime(e) { // Return the time output as a string, separated by commas.
                    const timeUnits = ["1", "60", "3.6e3", "8.64e4", "3.15576e7"];
                    const timeNames = ["Second", "Minute", "Hour", "Day", "Year"];
                    const timeNamesPlural = ["Seconds", "Minutes", "Hours", "Days", "Years"];
                    var maxTimeNames = timeUnits.length; // Determines the maximum number of time names to be outputted. Lower numbers may cause inaccuracies.

                    function secondsToTime(input) { // Convert seconds to time names.
                        var years = new Decimal(input.dividedBy(new Decimal(timeUnits[4]))).floor();

                        var dayDiv = new Decimal(modOp(input, timeUnits[4]));
                        var days = new Decimal(dayDiv.dividedBy(new Decimal(timeUnits[3]))).floor();

                        var hourDiv = new Decimal(modOp(input, timeUnits[3]));
                        var hours = new Decimal(hourDiv.dividedBy(new Decimal(timeUnits[2]))).floor();

                        var minuteDiv = new Decimal(modOp(input, timeUnits[2]));
                        var minutes = new Decimal(minuteDiv.dividedBy(new Decimal(timeUnits[1]))).floor();

                        var secondDiv = new Decimal(modOp(minuteDiv, timeUnits[1]));
                        var seconds = new Decimal(secondDiv.toStringWithDecimalPlaces(decimals));
                        var obj = {
                            "y": years,
                            "d": days,
                            "h": hours,
                            "m": minutes,
                            "s": seconds
                        };
                        return obj;
                    }
                    const $a = [];

                    function addNewTime(x) {
                        $a.push(x);
                    }
                    e = new Decimal(e);

                    if (secondsToTime(e).y > 0) {
                        addNewTime(notateInt(secondsToTime(e).y) + " " + checkPlural(secondsToTime(e).y, "Year", "Years"));
                    }
                    if (secondsToTime(e).d > 0) {
                        addNewTime(secondsToTime(e).d + " " + checkPlural(secondsToTime(e).d, "Day", "Days"));
                    }
                    if (secondsToTime(e).h > 0) {
                        addNewTime(secondsToTime(e).h + " " + checkPlural(secondsToTime(e).h, "Hour", "Hours"));
                    }
                    if (secondsToTime(e).m > 0) {
                        addNewTime(secondsToTime(e).m + " " + checkPlural(secondsToTime(e).m, "Minute", "Minutes"));
                    }
                    if (secondsToTime(e).s > 0) {
                        addNewTime(secondsToTime(e).s + " " + checkPlural(secondsToTime(e).s, "Second", "Seconds"));
                    }
                    $a.splice(maxTimeNames, $a.length - maxTimeNames);
                    return $a.join(', ');
                }

                if (totalTCTime.times(challengeOTDivider).lessThan(challengeOTDivider)) {
                    document.getElementById("SSCTimeConverterTimeOutput").innerHTML = "0 Seconds";
                } else {
                    document.getElementById("SSCTimeConverterTimeOutput").innerHTML = outputTime(totalTCTime);
                }
            } else {
                document.getElementById("SSCTimeConverterTimeOutput").innerHTML = "0 Seconds";
            }
            switch (modeCSC) {
                case 'fmcs':
                    document.getElementById('SSCCSConverterOutput').innerHTML = notateInt(decimalMax(1, inputValueCSC)) + 'x FM requires ' + notateInt(inputValueCSC.pow(2).round()) + ' CS';
                    break;
                default:
                    document.getElementById('SSCCSConverterOutput').innerHTML = notateInt(inputValueCSC) + ' CS equates to a FM of ' + notateInt(decimalMax(1, inputValueCSC.pow(0.5).round())) + 'x';
            }

            function calcChallengeToStageReq(x) {
                return challengeStartingReqSCSRC.add(completionsScalingSCSRC.times(x));
            }

            function calcChallengesList(lim) {
                const challengesWithStage = [];

                function genChalList() {
                    if (currentStage.greaterThanOrEqualTo(14)) {
                        if (currentStage.greaterThan(14)) {
                            challengesWithStage.push("Basic: Completions 1 - " + notateInt(decimalMin(8, decimalMin(22, currentStage).sub(14).add(1))));
                        } else {
                            challengesWithStage.push('Basic: Completion 1');
                        }
                    }
                    if (currentStage.greaterThanOrEqualTo(10)) {
                        if (currentStage.greaterThanOrEqualTo(12)) {
                            challengesWithStage.push("Cycle: Completions 1 - " + notateInt(decimalMin(10, decimalMin(30, currentStage).sub(10).dividedBy(2).add(1).floor())));
                        } else {
                            challengesWithStage.push('Cycle: Completion 1');
                        }
                        if (currentStage.greaterThanOrEqualTo(14)) {
                            if (currentStage.greaterThan(14)) {
                                challengesWithStage.push("Soul: Completions 1 - " + notateInt(decimalMin(10, decimalMin(24, currentStage).sub(14).add(1))));
                            } else {
                                challengesWithStage.push('Soul: Completion 1');
                            }
                        }
                        if (currentStage.greaterThan(10)) {
                            challengesWithStage.push("Wall: Completions 1 - " + notateInt(decimalMin(10, decimalMin(20, currentStage).sub(10).add(1))));
                            challengesWithStage.push("Soulless: Completions 1 - " + notateInt(decimalMin(5, decimalMin(20, currentStage).sub(10).dividedBy(2).add(1).floor())));
                        } else {
                            challengesWithStage.push('Wall: Completion 1');
                            challengesWithStage.push('Soulless: Completion 1');
                        }
                        if (currentStage.greaterThanOrEqualTo(20)) {
                            if (currentStage.greaterThan(20)) {
                                challengesWithStage.push("Limited: Completions 1 - " + notateInt(decimalMin(5, decimalMin(30, currentStage).sub(20).dividedBy(2).add(1).floor())));
                                challengesWithStage.push("Strong: Completions 1 - " + notateInt(decimalMin(5, decimalMin(35, currentStage).sub(20).dividedBy(3).add(1).floor())));
                            } else {
                                challengesWithStage.push('Limited: Completion 1');
                                challengesWithStage.push('Strong: Completion 1');
                            }
                        }
                    }
                    if (currentStage.greaterThanOrEqualTo(3)) {
                        if (currentStage.greaterThan(3)) {
                            challengesWithStage.push("Evil: Completions 1 - " + notateInt(decimalMin(5, decimalMin(8, currentStage).sub(3).add(1))));
                        } else {
                            challengesWithStage.push('Evil: Completion 1');
                        }
                    }
                    if (currentStage.greaterThanOrEqualTo(333)) {
                        challengesWithStage.push('Touch Real Grass: Completion 1');
                    }
                }
                genChalList();

                result = '';
                for (var i = 0; i < challengesWithStage.length; i++) {
                    result += challengesWithStage[i] + "<br>";
                }

                return result;
            }
            switch (modeCSRC) {
                case 'ssc':
                    document.getElementById('SSCCSRCOutput').innerHTML = 'At Stage ' + notateInt(currentStage) + ', the following Solarian Challenges can be completed:<br>' + calcChallengesList();
                    break;
                default:
                    document.getElementById('SSCCSRCOutput').innerHTML = "During the '" + challengeSCSRC + "' Solarian Challenge, having completed it " + notateInt(completionsCurrentSCSRC) + ' ' + checkPlural(completionsCurrentSCSRC, 'time', 'times') + ', the requirement with ' + notateInt(completionsNextSCSRC) + ' ' + checkPlural(completionsNextSCSRC, 'completion', 'completions') + ' is:<br>Stage ' + notateInt(calcChallengeToStageReq(completionsNextSCSRC)) + ' (from Stage ' + notateInt(calcChallengeToStageReq(completionsCurrentSCSRC)) + ')';
            }
        }

        // Add event listeners.
        document.getElementById("SSCChallengeInput").addEventListener("input", updateChallenge);
        document.getElementById("SSCCalculateButton").addEventListener("click", updateResults);
        document.getElementById("SSCSuffixToggleButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                document.getElementById("SSCSuffixToggleButton").setAttribute("style", "background:#00FF00");
                document.getElementById("SSCSuffixToggleButton").innerHTML = "Enabled";
                suffixStatus = true;
            } else {
                document.getElementById("SSCSuffixToggleButton").setAttribute("style", "background:#FF0000");
                document.getElementById("SSCSuffixToggleButton").innerHTML = "Disabled";
                suffixStatus = false;
            }
            updateResults();
        });
        document.getElementById("SSCTimeConverterModeOutput").addEventListener("click", function() {
            if (modeTC === 'ro') {
                document.getElementById("SSCTimeConverterModeOutput").innerHTML = "Offline time &gt; Real time";
                modeTC = 'or';
            } else {
                document.getElementById("SSCTimeConverterModeOutput").innerHTML = "Real time &gt; Offline time";
                modeTC = 'ro';
            }
            updateResults();
        });
        document.getElementById("SSCCSConverterModeOutput").addEventListener("click", function() {
            if (modeCSC === 'csfm') {
                document.getElementById("SSCCSConverterModeOutput").innerHTML = "Fighting Multiplier &gt; Challenge Score";
                modeCSC = 'fmcs';
            } else {
                document.getElementById("SSCCSConverterModeOutput").innerHTML = "Challenge Score &gt; Fighting Multiplier";
                modeCSC = 'csfm';
            }
            updateResults();
        });
        document.getElementById('SSCCSRCChallengeInput').addEventListener('input', function() {
            updateChallenge();
        });
        document.getElementById('SSCCSRCModeOutput').addEventListener('click', function() {
            if (modeCSRC === 'scs') {
                document.getElementById('SSCCSRCModeOutput').innerHTML = 'Stage &gt; Solarian Challenges';
                modeCSRC = 'ssc';
                document.getElementById('SSCCSRCModeSCSSection').setAttribute('style', 'display:none');
                document.getElementById('SSCSCSRCSolarianChallengeSliderSection').setAttribute('style', 'display:none');
                document.getElementById('SSCCSRCChallengeCurrentCompletionsInput').value = '';
                document.getElementById('SSCCSRCChallengeNextCompletionsInput').value = '';
            } else {
                document.getElementById('SSCCSRCModeOutput').innerHTML = 'Solarian Challenge &gt; Stage Requirement';
                modeCSRC = 'scs';
                document.getElementById('SSCCSRCModeSCSSection').setAttribute('style', 'display:block');
                document.getElementById('SSCSCSRCSolarianChallengeSliderSection').setAttribute('style', 'display:block');
            }
            updateResults();
        });
        updateResults();
    } else {
        console.log('[Solarian Stage Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.');
    }
}
addSolarianStageCalculator();