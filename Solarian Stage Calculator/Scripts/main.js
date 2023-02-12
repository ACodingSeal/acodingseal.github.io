function addSolarianStageCalculator() {
    // [WIP] Calculator inaccuracies, particularly with the minimum requirement, are known and will be fixed at some point.
    if (document.getElementById("SolarianStageCalculator") !== null && document.getElementById("SolarianStageCalculatorContainer") === null) {
        console.log("[Solarian Stage Calculator] [LOG] ID located. Running script.");
        document.getElementById("SolarianStageCalculator").innerHTML = "<div id='SolarianStageCalculatorContainer' class='templatedesktop' style='color:#FFF;padding:1em;background:#2F0075;width:80%;margin:auto'><div class='templatedesktop' style='background:initial;width:20%;padding:1em;overflow:auto'>Toggle Suffixes<br><button id='SSCSuffixToggleButton' style='background:#FF0000'>Disabled</button></div><div style='text-align:center;font-size:24px'><img src='./Solarian Stage Calculator/Assets/Sword.png' width='100'/> Solarian Stage Calculator <img src='./Solarian Stage Calculator/Assets/Shield.png' width='100'/><br><div style='font-size:initial'><p>Stage: <input id='CurrentStageInput' style='width:5%'/></p><p>Solarian Challenge: <input id='ChallengeInput' class='slider' type='range' value='0' min='0' max='3'/></p><p style='font-size:14px'>Selected challenge: <span id='SelectedChallengeText'/></p></div></div><table style='margin:auto;color:#FFF'><tr><td><b>Your offence:</b> <input id='PlayerOffenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy offence:</b> <span id='EnemyOffenceOutput'/></td></tr><tr><td><b>Your defence:</b> <input id='PlayerDefenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy defence:</b> <span id='EnemyDefenceOutput'/></td></tr><tr><td><b>Your maximum health (100x defence):</b> <span id='PlayerMaximumHealthOutput'/></td><td style='text-align:right'><b>Enemy maximum health:</b> <span id='EnemyMaximumHealthOutput'/></td></tr><tr><td><b>Your current health (optional, default 100% of max health):</b> <input id='PlayerCurrentHealthInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy current health (optional, default 100% of max health):</b> <input id='EnemyCurrentHealthInput' style='width:10%'/></td></tr></table><div style='margin-top:1em;text-align:center'><p>Real Time/Offline Time converter:<br><input id='SSCTimeConverterYearsInput' style='width:10%' placeholder='Years'></input><input id='SSCTimeConverterDaysInput' style='width:10%' placeholder='Days'></input><input id='SSCTimeConverterHoursInput' style='width:10%' placeholder='Hours'></input><input id='SSCTimeConverterMinutesInput' style='width:10%' placeholder='Minutes'></input><input id='SSCTimeConverterSecondsInput' style='width:10%' placeholder='Seconds'></input></p><p>Mode: <span id='SSCTimeConverterModeOutput' class='templatedesktop' style='padding:0.25em'>Real time > Offline time</span><br><p>Result: <span id='SSCTimeConverterTimeOutput'>?</span> (<span id='SSCTimeConverterEffectOutput'>?x</span>)</p><button id='SSCCalculateButton'>Calculate</button></div><br><div class='templatedesktop' style='background:initial;border-left:0;border-right:0;border-bottom:0;padding:0.5em;border-radius:initial;text-align:center'><div style='font-size:20px;font-weight:bold'>Result</div><br>At Stage <span id='CurrentStageOutput'>?</span>, the requirements to complete the stage, when currently at <span id='CurrentHealthOutput'>?</span>/<span id='MaximumHealthOutput'>?</span> health<img src='./Solarian Stage Calculator/Assets/Health.png' width='50'/>, are:<br><br><img src='./Solarian Stage Calculator/Assets/Sword.png' width='50'/> Offence: <span id='PlayerOffenceCurrentOutput'>?</span> (current) > <span id='PlayerOffenceReqOutput'>?</span> (minimum necessary; currently unavailable) > <span id='PlayerOffenceMaxOutput'>?</span> (instant completion)<br><img src='./Solarian Stage Calculator/Assets/Shield.png' width='50'/> Defence: <span id='PlayerDefenceCurrentOutput'>?</span> (current) > <span id='PlayerDefenceReqOutput'>?</span> (minimum necessary; currently unavailable) > <span id='PlayerDefenceMaxOutput'>?</span> (instant completion)<br><p>Your Stage Bonuses will also become:<br><br>Sunrise FM: <span id='StageBonusSunriseFMCurrentOutput'>?</span>x > <span id='StageBonusSunriseFMNextOutput'>?</span>x<br>Solar Rays: <span id='StageBonusSolarRaysCurrentOutput'>?</span>x > <span id='StageBonusSolarRaysNextOutput'>?</span>x<br>Sunstone: <span id='StageBonusSunstoneCurrentOutput'>?</span>x > <span id='StageBonusSunstoneNextOutput'>?</span>x<br><span id='SolarShardsStageBonusContainer' style='display:none'>Solar Shards: <span id='StageBonusSolarShardsCurrentOutput'>?</span>x > <span id='StageBonusSolarShardsNextOutput'>?</span>x</span><br><span id='SoulsStageBonusContainer' style='display:none'>Souls (hidden bonus): <span id='StageBonusSoulsCurrentOutput'>?</span>x > <span id='StageBonusSoulsNextOutput'>?</span>x</span></p></div></div>";

        var playerOffence;
        var playerDefence;
        var playerMaxHealth;
        var playerCurrentHealth;
        var enemyOffence;
        var enemyDefence;
        var enemyMaxHealth;
        var enemyCurrentHealth;
        var currentStage;
        var challenge;
        var enemyStatScaling;
        var enemyHealthScaling;
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var modeTC = "ro"; // Determines the conversion method of the Offline Time Converter.

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
                if (new Decimal(x.toStringWithDecimalPlaces(decimals)).equals(x.floor())) {
                    result = x.floor().toString();
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
                result = checkNoDecimal(e.mantissa) + "e" + e.exponent; // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
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
            switch (document.getElementById("ChallengeInput").value) {
                case "0":
                    challenge = false;
                    enemyStatScaling = new Decimal(10);
                    enemyHealthScaling = new Decimal(10.3);
                    document.getElementById("SelectedChallengeText").innerHTML = "None (10x stats, 10.3x health, 300:1 offline time)";
                    break;
                case "1":
                    challenge = "cycle";
                    enemyStatScaling = new Decimal(10);
                    enemyHealthScaling = new Decimal(10.3);
                    document.getElementById("SelectedChallengeText").innerHTML = "Cycle (10x stats, 10.3x health, 3:1 offline time)";
                    break;
                case "2":
                    challenge = "wall";
                    enemyStatScaling = new Decimal(50);
                    enemyHealthScaling = new Decimal(51.5);
                    document.getElementById("SelectedChallengeText").innerHTML = "Wall (50x stats, 51.5x health, 300:1 offline time)";
                    break;
                case "3":
                    challenge = "evil";
                    enemyStatScaling = new Decimal(1e10);
                    enemyHealthScaling = new Decimal(1.03e10);
                    document.getElementById("SelectedChallengeText").innerHTML = "Evil (" + notateInt(1e10) + "x stats, " + notateInt(1.03e10) + "x health, 300:1 offline time)";
            }
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
            if (document.getElementById("CurrentStageInput").value === '' || new Decimal(document.getElementById("CurrentStageInput").value).lessThan(1)) {
                currentStage = new Decimal(1);
            } else {
                currentStage = toScientific(document.getElementById("CurrentStageInput").value);
            }
            enemyMaxHealth = new Decimal(3e3).times(enemyHealthScaling.pow(currentStage.sub(1)));
            if (document.getElementById("PlayerOffenceInput").value === '' || new Decimal(document.getElementById("PlayerOffenceInput").value).lessThan(0)) {
                playerOffence = new Decimal(1);
            } else {
                playerOffence = toScientific(document.getElementById("PlayerOffenceInput").value);
            }
            if (document.getElementById("PlayerDefenceInput").value === '' || new Decimal(document.getElementById("PlayerDefenceInput").value).lessThan(0)) {
                playerDefence = new Decimal(0);
                playerMaxHealth = new Decimal(0);
            } else {
                playerDefence = toScientific(document.getElementById("PlayerDefenceInput").value);
                if (playerDefence.lessThan(15)) {
                    playerMaxHealth = new Decimal(0);
                } else {
                    playerMaxHealth = playerDefence.times(100);
                }
            }
            if (document.getElementById("PlayerCurrentHealthInput").value === '' || new Decimal(document.getElementById("PlayerCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("PlayerCurrentHealthInput").value).greaterThan(playerMaxHealth)) {
                playerCurrentHealth = playerMaxHealth;
            } else {
                playerCurrentHealth = toScientific(document.getElementById("PlayerCurrentHealthInput").value);
            }
            if (document.getElementById("EnemyCurrentHealthInput").value === '' || new Decimal(document.getElementById("EnemyCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("EnemyCurrentHealthInput").value).greaterThan(enemyMaxHealth)) {
                enemyCurrentHealth = enemyMaxHealth;
            } else {
                enemyCurrentHealth = toScientific(document.getElementById("EnemyCurrentHealthInput").value);
            }
            var secondsTC;
            var minutesTC;
            var hoursTC;
            var daysTC;
            var yearsTC;
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
                    var docID = document.getElementById(side + stat + "CurrentOutput");
                } else {
                    var docID = document.getElementById(side + stat + "Output");
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

            document.getElementById("PlayerMaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
            document.getElementById("EnemyMaximumHealthOutput").innerHTML = notateInt(enemyMaxHealth);
            document.getElementById("PlayerOffenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyCurrentHealth.add(enemyDefence)) + "</span>";
            if (playerDefence.greaterThanOrEqualTo(enemyOffence)) {
                document.getElementById("PlayerDefenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyOffence) + "</span>";
            } else {
                document.getElementById("PlayerDefenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(playerDefence) + "</span>";
            }

            document.getElementById("StageBonusSunriseFMCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage.sub(1)));
            document.getElementById("StageBonusSunriseFMNextOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage));
            document.getElementById("StageBonusSolarRaysCurrentOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage.sub(1)));
            document.getElementById("StageBonusSolarRaysNextOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage));
            document.getElementById("StageBonusSunstoneCurrentOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage.sub(1)));
            document.getElementById("StageBonusSunstoneNextOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage));
            document.getElementById("StageBonusSolarShardsCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMax(0, currentStage.sub(9))));
            document.getElementById("StageBonusSolarShardsNextOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMax(0, currentStage.sub(8))));
            document.getElementById("StageBonusSoulsCurrentOutput").innerHTML = notateInt(soulBonusCalc(currentStage));
            document.getElementById("StageBonusSoulsNextOutput").innerHTML = notateInt(soulBonusCalc(currentStage.add(1)));
            document.getElementById("CurrentStageOutput").innerHTML = notateInt(currentStage);
            document.getElementById("CurrentHealthOutput").innerHTML = notateInt(playerCurrentHealth);
            document.getElementById("MaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
            if (currentStage.greaterThanOrEqualTo(9)) {
                document.getElementById("SolarShardsStageBonusContainer").setAttribute("style", "display:inline");
                document.getElementById("SoulsStageBonusContainer").setAttribute("style", "display:inline");
            } else {
                document.getElementById("SolarShardsStageBonusContainer").setAttribute("style", "display:none");
                document.getElementById("SoulsStageBonusContainer").setAttribute("style", "display:none");
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
        }

        // Add event listeners.
        document.getElementById("ChallengeInput").addEventListener("input", updateChallenge);
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
            if (modeTC === "ro") {
                document.getElementById("SSCTimeConverterModeOutput").innerHTML = "Offline time &gt; Real time";
                modeTC = "or";
            } else {
                document.getElementById("SSCTimeConverterModeOutput").innerHTML = "Real time &gt; Offline time";
                modeTC = "ro";
            }
            updateResults();
        });
        updateResults();
    } else {
        console.log("[Solarian Stage Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addSolarianStageCalculator();