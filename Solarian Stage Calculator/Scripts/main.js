function addSolarianStageCalculator() {
    // [WIP] Calculator inaccuracies, particularly with the minimum requirement, are known and will be fixed at some point.
    if (document.getElementById("SolarianStageCalculator") !== null && document.getElementById("SolarianStageCalculatorContainer") === null) {
        console.log("[Solarian Stage Calculator] [LOG] ID located. Running script.");
        document.getElementById("SolarianStageCalculator").innerHTML = "<div id='SolarianStageCalculatorContainer' class='templatedesktop' style='color:#FFF;padding:1em;background:#2F0075;width:80%;margin:auto'><div class='templatedesktop' style='border-radius:initial;background:initial;width:20%;padding:0.5em;margin-top:0.5em;overflow:auto'>Toggle Suffixes<br><button id='SSCSuffixToggleButton' style='background:#FF0000'>Disabled</button></div><div style='text-align:center;font-size:24px'><img src='./Solarian Stage Calculator/Assets/Sword.png' width='100'/> Solarian Stage Calculator <img src='./Solarian Stage Calculator/Assets/Shield.png' width='100'/><br><div style='font-size:initial'><p>Stage: <input id='CurrentStageInput' style='width:5%'/></p><p>Solarian Challenge: <input id='ChallengeInput' class='slider' type='range' value='0' min='0' max='2'/></p><p style='font-size:14px'>Selected challenge: <span id='SelectedChallengeText'/></p></div></div><table style='margin:auto;color:#FFF'><tr><td><b>Your offence:</b> <input id='PlayerOffenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy offence:</b> <span id='EnemyOffenceOutput'/></td></tr><tr><td><b>Your defence:</b> <input id='PlayerDefenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy defence:</b> <span id='EnemyDefenceOutput'/></td></tr><tr><td><b>Your maximum health (100x defence):</b> <span id='PlayerMaximumHealthOutput'/></td><td style='text-align:right'><b>Enemy maximum health:</b> <span id='EnemyMaximumHealthOutput'/></td></tr><tr><td><b>Your current health (optional, default 100% of max health):</b> <input id='PlayerCurrentHealthInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy current health (optional, default 100% of max health):</b> <input id='EnemyCurrentHealthInput' style='width:10%'/></td></tr></table><div style='margin-top:1em;text-align:center'><button id='SSCCalculateButton'>Calculate</button></div><br><div class='templatedesktop' style='background:initial;border-left:0;border-right:0;border-bottom:0;padding:0.5em;border-radius:initial;text-align:center'><div style='font-size:20px;font-weight:bold'>Result</div><br>At Stage <span id='CurrentStageOutput'>?</span>, the requirements to complete the stage, when currently at <span id='CurrentHealthOutput'>?</span>/<span id='MaximumHealthOutput'>?</span> health<img src='./Solarian Stage Calculator/Assets/Health.png' width='50'/>, are:<br><br><img src='./Solarian Stage Calculator/Assets/Sword.png' width='50'/> Offence: <span id='PlayerOffenceCurrentOutput'>?</span> (current) > <span id='PlayerOffenceReqOutput'>?</span> (minimum necessary) > <span id='PlayerOffenceMaxOutput'>?</span> (instant completion)<br><img src='./Solarian Stage Calculator/Assets/Shield.png' width='50'/> Defence: <span id='PlayerDefenceCurrentOutput'>?</span> (current) > <span id='PlayerDefenceReqOutput'>?</span> (minimum necessary) > <span id='PlayerDefenceMaxOutput'>?</span> (instant completion)<br><p>Your Stage Bonuses will also become:<br><br>Sunrise FM: <span id='StageBonusSunriseFMCurrentOutput'>?</span>x > <span id='StageBonusSunriseFMNextOutput'>?</span>x<br>Solar Rays: <span id='StageBonusSolarRaysCurrentOutput'>?</span>x > <span id='StageBonusSolarRaysNextOutput'>?</span>x<br>Sunstone: <span id='StageBonusSunstoneCurrentOutput'>?</span>x > <span id='StageBonusSunstoneNextOutput'>?</span>x<br><span id='SolarShardsStageBonusContainer' style='display:none'>Solar Shards: <span id='StageBonusSolarShardsCurrentOutput'>?</span>x > <span id='StageBonusSolarShardsNextOutput'>?</span>x</span><br><span id='SoulsStageBonusContainer' style='display:none'>Souls (hidden bonus): <span id='StageBonusSoulsCurrentOutput'>?</span>x > <span id='StageBonusSoulsNextOutput'>?</span>x</span></p></div></div>";

        var playerOffence
        var playerDefence
        var playerMaxHealth
        var playerCurrentHealth
        var enemyOffence
        var enemyDefence
        var enemyMaxHealth
        var enemyCurrentHealth
        var currentStage
        var challenge
        var enemyStatScaling
        var enemyHealthScaling
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
		var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
		var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.

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
            e = new Decimal(e);
            if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
                result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e6, return the input with comma-separated numbers.
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(new Decimal("1e" + suffixes.length * 3)) && suffixStatus === true) {
                extraZeroes = e.exponent % 3;
                result = (e.mantissa * (10 ** extraZeroes)).toFixed(decimals) + "" + suffixes[Math.floor(e.exponent / 3)]; // If the input is at least 1e6 and is less than the length of the suffixes array's zero count times 3 and suffix notation is enabled, return the input converted to suffix notation.
            } else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(1e21)) {
                result = Number(e).toExponential(decimals).replace(/[+]/g, ""); // If the input is at least 1e6, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
            } else if (e.greaterThanOrEqualTo("1e1e3") && e.lessThan("1e1e16")) {
                switch (suffixStatus) {
                    case true:
                        if (e.greaterThan(new Decimal("1e" + (suffixes.length * 3)))) {
                            extraZeroes = 0;
                        } else {
                            extraZeroes = e.exponent % 3;
                        }
                        result = (e.mantissa * (10 ** extraZeroes)).toFixed(decimals) + "e" + notateInt(e.exponent); // If suffix notation is enabled, return the input's mantissa converted to normal notation with its exponent converted to comma-separated numbers.
                        break;
                    default:
                        if (e.greaterThanOrEqualTo("1e1e6")) {
                            result = (e.mantissa).toFixed(decimals) + "e" + (e.exponent).toExponential(decimals).replace(/[+]/, ""); // Modification of the above: If suffix notation is not enabled, return the input's mantissa with a fixed decimal length and the input's exponent converted to scientific notation with a fixed decimal length.
                        } else {
                            result = (e.mantissa).toFixed(decimals) + "e" + notateInt(e.exponent); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                        }
                }
            } else {
                result = e.toStringWithDecimalPlaces(decimals); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }

        function updateChallenge() { // Update Solarian Challenge data.
            switch (document.getElementById("ChallengeInput").value) {
                case "0":
                    challenge = false;
                    enemyStatScaling = new Decimal(10);
                    enemyHealthScaling = new Decimal(10.3);
                    document.getElementById("SelectedChallengeText").innerHTML = "None (10x stats, 10.3x health)";
                    break;
                case "1":
                    challenge = "wall";
                    enemyStatScaling = new Decimal(50);
                    enemyHealthScaling = new Decimal(51.5);
                    document.getElementById("SelectedChallengeText").innerHTML = "Wall (50x stats, 51.5x health)";
                    break;
                case "2":
                    challenge = "evil";
                    enemyStatScaling = new Decimal(1e10);
                    enemyHealthScaling = new Decimal(1.03e10);
                    document.getElementById("SelectedChallengeText").innerHTML = "Evil (1e10x stats, 1.03e10x health)";
            }
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
                playerMaxHealth = playerDefence.times(100);
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
            var playerMaxHits;
            var enemyMaxHits;

            function calcMaxHits() {
                playerMaxHits = playerCurrentHealth.add(playerDefenceReq).dividedBy(enemyOffence);
                enemyMaxHits = enemyCurrentHealth.add(enemyDefence).dividedBy(playerOffenceReq);

                console.log("enemyMaxHits: " + enemyMaxHits);
                console.log("playerMaxHits: " + playerMaxHits);
                if (playerMaxHits.greaterThanOrEqualTo(enemyMaxHits)) {
                    console.log("first");
                    maxDivide = playerMaxHits.dividedBy(enemyMaxHits);
                } else {
                    console.log("second");
                    maxDivide = enemyMaxHits.dividedBy(playerMaxHits);
                }
                if (maxDivide.valueOf() === "NaN") {
                    console.log(true);
                } else {
                    console.log(false);
                }
                console.log("-----");
                if (playerDefenceReq.equals(0)) {
                    document.getElementById("PlayerOffenceReqOutput").innerHTML = "<span style='color:#00FF00'>?</span>";
                    document.getElementById("PlayerDefenceReqOutput").innerHTML = "<span style='color:#00FF00'>?</span>";
                } else if (playerDefenceReq.greaterThanOrEqualTo(enemyOffence)) {
                    document.getElementById("PlayerOffenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(enemyDefence) + "</span>";
                    document.getElementById("PlayerDefenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(playerDefenceReq) + "</span>";
                } else {
                    if (playerMaxHits.greaterThanOrEqualTo(enemyMaxHits)) {
                        document.getElementById("PlayerOffenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(playerOffenceReq) + "</span>";
                    } else {
                        document.getElementById("PlayerOffenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(playerOffenceReq.times((maxDivide.sub(1)).dividedBy(2).add(1))) + "</span>";
                    }
                    if (playerDefenceReq.times(maxDivide.dividedBy(2)).greaterThanOrEqualTo(enemyOffence)) {
                        maxDivide = enemyOffence.dividedBy(playerDefenceReq.times((maxDivide.sub(1)).dividedBy(2).add(1)));
                        document.getElementById("PlayerDefenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(playerDefenceReq.times(maxDivide)) + "</span>";
                    } else {
                        document.getElementById("PlayerDefenceReqOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(playerDefenceReq) + "</span>";
                    }
                }
            }




            // Testing below.
            var playerOffenceReq = playerOffence;
            var playerDefenceReq = playerDefence;

            function calcMaxHits2() {
                playerMaxHits = playerCurrentHealth.add(playerDefenceReq).dividedBy(enemyOffence);
                enemyMaxHits = enemyCurrentHealth.add(enemyDefence).dividedBy(playerOffenceReq);
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
                document.getElementById("PlayerMaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
                document.getElementById("EnemyMaximumHealthOutput").innerHTML = notateInt(enemyMaxHealth);
                if (playerMaxHits.greaterThanOrEqualTo(enemyMaxHits)) {
                    maxDivide = playerMaxHits.dividedBy(enemyMaxHits);
                } else {
                    maxDivide = enemyMaxHits.dividedBy(playerMaxHits);
                }
                playerOffenceReq = playerOffenceReq.times(maxDivide.sub(1).dividedBy(2).add(1));
                playerDefenceReq = playerDefenceReq.times(maxDivide.sub(1).dividedBy(2).add(1));
            }
            calcMaxHits2();

            document.getElementById("PlayerOffenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyCurrentHealth.add(enemyDefence)) + "</span>";
            document.getElementById("PlayerDefenceMaxOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(playerDefence) + "</span>";

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
        }
        document.getElementById("ChallengeInput").addEventListener("input", updateChallenge);
        document.getElementById("SSCCalculateButton").addEventListener("click", updateResults);

        document.getElementById("SSCSuffixToggleButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                document.getElementById("SSCSuffixToggleButton").setAttribute("style", "background:#00FF00");
                document.getElementById("SSCSuffixToggleButton").innerHTML = "Enabled";
                suffixStatus = true;
                updateResults();
            } else {
                document.getElementById("SSCSuffixToggleButton").setAttribute("style", "background:#FF0000");
                document.getElementById("SSCSuffixToggleButton").innerHTML = "Disabled";
                suffixStatus = false;
            }
            updateResults();
        });
        updateResults();
    } else {
        console.log("[Solarian Stage Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addSolarianStageCalculator();