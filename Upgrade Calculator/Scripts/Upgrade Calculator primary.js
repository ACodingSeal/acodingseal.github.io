function addUpgradeCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("UpgradeCalculator") !== null && document.getElementById("UpgradeCalculatorContainer") === null) {
        console.log("[Upgrade Calculator] [LOG]: ID located. Running script.");

        // Create the calculator's user interface.
        const calculatorHTMLUpgradeSelectionContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Upgrade Selection</span></div><div style='padding:0.25em'><center><img id='UCUpgradeSelectionGrassUpgrades' src='./Upgrade Calculator/Assets/Miscellaneous/Grass.png' width='50'/><img id='UCUpgradeSelectionPrestigeUpgrades' src='./Upgrade Calculator/Assets/Miscellaneous/Prestige.png' width='50'/><img id='UCUpgradeSelectionCrystalUpgrades' src='./Upgrade Calculator/Assets/Miscellaneous/Crystal.png' width='50'/><br><span id='UCSelectedUpgradesHeader' style='color:#FFF;font-weight:bold;font-size:20px'>(None selected)</span><br><div id='UCSelectedUpgradesContainer' style='display:none'></div></center></div>";
        const calculatorHTMLResultsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Result</span></div><div style='text-align:center'><br><button id='UCCalculateButton'>Calculate</button><br><br><span id='UCResultOutput'>At Level <span id='UCCurrentLevelOutput'>?</span>, reaching Level <span id='UCGoalLevelOutput'>?</span> will <span id='UCCostWord'>cost</span> <span id='UCCostOutput'>?</span>. This will result in <span id='UCAnIncreaseWord'>an increase</span> of <span id='UCIncreaseOutput'>?</span>, or <span id='UCAnEffectiveMultiplierWord'>an effective multiplier</span> of <span id='UCEffectiveMultiplierOutput'>?</span>, to the upgrade's total effect (<span id='UCUpgradeEffectOutput'>?</span>).</span></div>";
        document.getElementById("UpgradeCalculator").innerHTML = "<div id='UpgradeCalculatorContainer' class='templatedesktop' style='padding:1em;background:#717171;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='UCSuffixButton'>Disabled</button></div><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Differences Notation<br><button style='background:#CCCCCC' id='UCDifferenceButton'>Multiplier (x)</button></div><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Comparison Mode (WIP)<br><button style='background:#FF0000' id='UCCompareButton'>Disabled</button></div><div style='text-align:center;font-size:30px'><img src='./Upgrade Calculator/Assets/Miscellaneous/Movement.png' width='150'/> Upgrade Calculator <img src='./Upgrade Calculator/Assets/Miscellaneous/Movement.png' width='150'/></div><br>" + calculatorHTMLUpgradeSelectionContainer + calculatorHTMLResultsContainer + "</div></div>";

        // Variable and constant declarations.
        const errorText = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>"; // Text string used for HTML outputs in the event of an error.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var diffStatus = "multiplier"; // Determines how differences should be outputted (i.e. 1.5x and +50%).
        var compareStatus = false; // Determines whether to configure the calculator for comparison of multiple upgrades or for a single upgrade.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var selectedUpgrade;

        function toScientific(e) { // Ensure a user-inputted value is a scientific notation Decimal number.
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

        var currentLevel;
        var goalLevel;
        var levelCap;
        var increase;
        var effectiveIncrease;
        var totalEffectC = new Decimal(0);
        var totalEffectG = new Decimal(0);
        var totalCost;
        var currencyUsed;
        var noDiffSymbol = false;
        var upgradeDescription = "?";

        function getLevelCap() { // Get level cap according to selected upgrade.
            switch (selectedUpgrade) {
                case "GrassUpgrades-GrassValue":
                    levelCap = 700;
                    break;
                case "GrassUpgrades-MoreGrass":
                    levelCap = 500;
                    break;
                case "GrassUpgrades-GrowSpeed":
                    levelCap = 250;
                    break;
                case "GrassUpgrades-XP":
                    levelCap = 600;
                    break;
                case "GrassUpgrades-MoveSpeed":
                    levelCap = 8;
                    break;
                case "GrassUpgrades-Range":
                    levelCap = 8;
                    break;
                case "GrassUpgrades-PP":
                    levelCap = 250;
                    break;
                case "PrestigeUpgrades-GrassValueII":
                    levelCap = 500;
                    break;
                case "PrestigeUpgrades-XPII":
                    levelCap = 500;
                    break;
                case "PrestigeUpgrades-TP":
                    levelCap = 500;
                    break;
                case "PrestigeUpgrades-Crystals":
                    levelCap = 150;
                    break;
                case "CrystalUpgrades-GrassValueIII":
                    levelCap = 500;
                    break;
                case "CrystalUpgrades-XPIII":
                    levelCap = 500;
                    break;
                case "CrystalUpgrades-TPII":
                    levelCap = 500;
                    break;
                case "CrystalUpgrades-PPII":
                    levelCap = 500;
                    break;
                case "CrystalUpgrades-GrowAmount":
                    levelCap = 1;
                    break;
                default:
                    levelCap = 1e300;
            }
            levelCap = new Decimal(levelCap);
        }

        function getInputData() { // Get data from inputs.
            getLevelCap();
            if (document.getElementById("UCSelectedUpgradeInputCL").value === '' || toScientific(document.getElementById("UCSelectedUpgradeInputCL").value).lessThan(0)) {
                currentLevel = new Decimal(0);
            } else {
                currentLevel = decimalMin(levelCap, toScientific(document.getElementById("UCSelectedUpgradeInputCL").value).floor());
            }
            if (document.getElementById("UCSelectedUpgradeInputDL").value === '' || toScientific(document.getElementById("UCSelectedUpgradeInputDL").value).lessThan(0)) {
                goalLevel = new Decimal(0);
            } else {
                goalLevel = decimalMin(levelCap, toScientific(document.getElementById("UCSelectedUpgradeInputDL").value).floor());
            }
        }

        function calcResults() { // Calculate the results.
            var baseCost = 1;
            var lScaling = 0.2;
            var eScaling = 10;

            function costLoop(e) {
                baseCost = new Decimal(baseCost);
                lScaling = new Decimal(lScaling);
                eScaling = new Decimal(eScaling);
                e = new Decimal(e).add(1);
                var iteration = 0;
                var maxIterations = e;
                var b;
                const h = [];
                const cumsum = [];
                var num = baseCost;

                while (iteration < maxIterations) {
                    function addCostCurrent() {
                        h.push(num);
                    }
                    addCostCurrent();
                    num = baseCost.times(lScaling.times(iteration).add(1)).times(eScaling.pow(iteration));
                    iteration++;
                    const output = [];
                    var sum = new Decimal(0);
                    for (var i in h) {
                        sum = sum.add(h[i]);
                        output.push(sum);
                    }
                    result = output[output.length - 1];
                }
                return result;
            }
            noDiffSymbol = false;
            lScaling = 0.2;
            switch (selectedUpgrade) {
                case "GrassUpgrades-GrassValue":
                    baseCost = 10;
                    lScaling = 1;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(1).times(currentLevel).times(new Decimal(2).pow(currentLevel.dividedBy(25).floor()));
                    totalEffectG = new Decimal(1).times(goalLevel).times(new Decimal(2).pow(goalLevel.dividedBy(25).floor()));
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectG;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "GrassUpgrades-MoreGrass":
                    noDiffSymbol = true;
                    baseCost = 25;
                    lScaling = 1;
                    eScaling = 1.16;
                    totalEffectC = new Decimal(1).times(currentLevel);
                    totalEffectG = new Decimal(1).times(goalLevel);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectG;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;

                case "GrassUpgrades-GrowSpeed":
                    baseCost = 100;
                    lScaling = 1;
                    eScaling = 1.35;
                    totalEffectC = new Decimal(0.1).times(currentLevel).add(1);
                    totalEffectG = new Decimal(0.1).times(goalLevel).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectG;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "GrassUpgrades-XP":
                    baseCost = 1e3;
                    lScaling = 1;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(1).times(currentLevel).times(new Decimal(2).pow(currentLevel.dividedBy(25).floor()));
                    totalEffectG = new Decimal(1).times(goalLevel).times(new Decimal(2).pow(goalLevel.dividedBy(25).floor()));
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectG;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "GrassUpgrades-MoveSpeed":
                    noDiffSymbol = true;
                    baseCost = 2e3;
                    lScaling = 1;
                    eScaling = 7;
                    totalEffectC = new Decimal(2).times(currentLevel);
                    totalEffectG = new Decimal(2).times(goalLevel);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectG;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "GrassUpgrades-Range":
                    noDiffSymbol = true;
                    baseCost = 1e4;
                    lScaling = 1;
                    eScaling = 2.5;
                    totalEffectC = new Decimal(1).times(currentLevel);
                    totalEffectG = new Decimal(1).times(goalLevel);
                    increase = totalEffectG.sub(totalEffectC)
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "GrassUpgrades-PP":
                    baseCost = 1e10;
                    lScaling = 1;
                    eScaling = 1.4;
                    totalEffectC = new Decimal(0.1).times(currentLevel).times(new Decimal(1.25).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.1).times(goalLevel).times(new Decimal(1.25).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "PrestigeUpgrades-GrassValueII":
                    baseCost = 1;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(0.5).times(currentLevel).times(new Decimal(1.5).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.5).times(goalLevel).times(new Decimal(1.5).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "PrestigeUpgrades-XPII":
                    baseCost = 3;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(0.5).times(currentLevel).times(new Decimal(1.5).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.5).times(goalLevel).times(new Decimal(1.5).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "PrestigeUpgrades-TP":
                    baseCost = 50;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(1).times(currentLevel).times(new Decimal(2).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(1).times(goalLevel).times(new Decimal(2).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "PrestigeUpgrades-Crystals":
                    baseCost = 150;
                    eScaling = 1.15;
                    totalEffectC = new Decimal(0.2).times(currentLevel).times(new Decimal(1.25).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.2).times(goalLevel).times(new Decimal(1.25).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "CrystalUpgrades-GrassValueIII":
                    baseCost = 4;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(0.5).times(currentLevel).times(new Decimal(1.5).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.5).times(goalLevel).times(new Decimal(1.5).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "CrystalUpgrades-XPIII":
                    baseCost = 5;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(0.5).times(currentLevel).times(new Decimal(1.5).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.5).times(goalLevel).times(new Decimal(1.5).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "CrystalUpgrades-TPII":
                    baseCost = 6;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(1).times(currentLevel).times(new Decimal(2).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(1).times(goalLevel).times(new Decimal(2).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "CrystalUpgrades-PPII":
                    baseCost = 11;
                    eScaling = 1.12;
                    totalEffectC = new Decimal(0.25).times(currentLevel).times(new Decimal(1.25).pow(currentLevel.dividedBy(25).floor())).add(1);
                    totalEffectG = new Decimal(0.25).times(goalLevel).times(new Decimal(1.25).pow(goalLevel.dividedBy(25).floor())).add(1);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                case "CrystalUpgrades-GrowAmount":
                    noDiffSymbol = true;
                    baseCost = 20;
                    lScaling = 1;
                    eScaling = 1;
                    totalEffectC = new Decimal(1).times(currentLevel);
                    totalEffectG = new Decimal(1).times(goalLevel);
                    increase = totalEffectG.sub(totalEffectC);
                    if (currentLevel.equals(0)) {
                        effectiveIncrease = totalEffectC;
                    } else {
                        effectiveIncrease = totalEffectG.dividedBy(totalEffectC);
                    }
                    break;
                default:
                    increase = new Decimal(0);
                    effectiveIncrease = new Decimal(1);
                    totalCost = new Decimal(0);
            }
            totalCost = costLoop(goalLevel).sub(costLoop(currentLevel));
        }

        function updateResults() { // Update the results output.
            function diffNotation(x) {
                if (x.equals(0)) {
                    x = new Decimal(1);
                }
                switch (diffStatus) {
                    case "percentage":
                        if (x.times(100).sub(100).lessThan(0)) {
                            result = notateInt(new Decimal(new Decimal(x).times(100).sub(100).toString().replace(/[-]/, ""))) + "%";
                        } else {
                            result = notateInt(x.times(100).sub(100)) + "%";
                        }
                        break;
                    default:
                        if (x.lessThan(0)) {
                            result = notateInt(new Decimal(x.toString().replace(/[-]/, ""))) + "x";
                        } else {
                            result = notateInt(x) + "x";
                        }
                }
                return result;
            }
            getInputData();
            calcResults();

            // Update the HTML outputs with the calculated results.
            document.getElementById("UCCurrentLevelOutput").innerHTML = notateInt(currentLevel);
            if (currentLevel.lessThan(goalLevel)) {
                document.getElementById("UCGoalLevelOutput").innerHTML = notateInt(goalLevel) + " (<span style='color:#00FF00'>+" + notateInt(goalLevel.sub(currentLevel)) + "</span>)";
                switch (noDiffSymbol) {
                    case true:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(totalEffectC) + " > " + notateInt(totalEffectG) + "</span>";
                        break;
                    default:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#00FF00'>" + diffNotation(totalEffectC) + " > " + diffNotation(totalEffectG) + "</span>";
                }
                document.getElementById("UCCostWord").innerHTML = "cost";
                document.getElementById("UCAnIncreaseWord").innerHTML = "an increase";
                switch (diffStatus) {
                    case "percentage":
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective increase";
                        break;
                    default:
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective multiplier";
                }
            } else if (goalLevel.lessThan(currentLevel)) {
                document.getElementById("UCGoalLevelOutput").innerHTML = notateInt(goalLevel) + " (<span style='color:#FF0000'>-" + notateInt(currentLevel.sub(goalLevel)) + "</span>)";
                switch (noDiffSymbol) {
                    case true:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(totalEffectC) + " > " + notateInt(totalEffectG) + "</span>";
                        break;
                    default:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#FF0000'>" + diffNotation(totalEffectC) + " > " + diffNotation(totalEffectG) + "</span>";
                }
                document.getElementById("UCCostWord").innerHTML = "take away";
                document.getElementById("UCAnIncreaseWord").innerHTML = "a decrease";
                switch (diffStatus) {
                    case "percentage":
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective decrease";
                        break;
                    default:
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective multiplier";
                }
            } else {
                switch (diffStatus) {
                    case "percentage":
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective increase";
                        break;
                    default:
                        document.getElementById("UCAnEffectiveMultiplierWord").innerHTML = "an effective multiplier";
                }
                document.getElementById("UCAnIncreaseWord").innerHTML = "an increase";
                switch (noDiffSymbol) {
                    case true:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(totalEffectC) + " > " + notateInt(totalEffectG) + "</span>";
                        break;
                    default:
                        document.getElementById("UCUpgradeEffectOutput").innerHTML = "<span style='color:#FFFF00'>" + diffNotation(totalEffectC) + " > " + diffNotation(totalEffectG) + "</span>";
                }
                document.getElementById("UCGoalLevelOutput").innerHTML = notateInt(goalLevel) + " (<span style='color:#FFFF00'>+0</span>)";
            }
            switch (noDiffSymbol) {
                case true:
                    document.getElementById("UCIncreaseOutput").innerHTML = notateInt(increase);
                    break;
                default:
                    document.getElementById("UCIncreaseOutput").innerHTML = diffNotation(increase);
            }
            document.getElementById("UCEffectiveMultiplierOutput").innerHTML = diffNotation(effectiveIncrease);

            function getCurrencyUsed() {
                switch (currencyUsed) {
                    case "Grass":
                        result = " <span style='color:#1F9E0E;font-weight:bold'>Grass</span>";
                        break;
                    case "PrestigePoint":
                        result = " <span style='color:#00FFFF;font-weight:bold'>" + checkPlural(totalCost, "Prestige Point", "Prestige Points") + "</span>";
                        break;
                    case "Crystal":
                        result = " <span style='color:#FF00FF;font-weight:bold'>" + checkPlural(totalCost, "Crystal", "Crystals") + "</span>";
                        break;
                    default:
                        result = " <i>unknown currency</i>";
                }
                return result;
            }
            if (totalCost.lessThan(0)) {
                totalCost = new Decimal(totalCost.toString().replace(/[-]/, ""));
            }
            document.getElementById("UCCostOutput").innerHTML = notateInt(totalCost) + getCurrencyUsed();
            document.getElementById("UCUpgradeDescription").innerHTML = upgradeDescription;
        }

        function setUpgradesContainer(type) { // Add the HTML of the container for the respective set of upgrades.
            const miscHTML = "<br>Selected upgrade: <span id='UCSelectedUpgradeName' style='color:#00FFFF'>None</span> (<span id='UCUpgradeLevelCap' style='color:#FFFF00'>?</span>)<br>Description:<br><code><span id='UCUpgradeDescription'>" + upgradeDescription + "</span></code><br><div id='UCSelectedUpgradeInputs' style='display:block'><p>Current level: <input id='UCSelectedUpgradeInputCL' style='width:10%'/></p><p>Desired level: <input id='UCSelectedUpgradeInputDL' style='width:10%'/></p></div>";
            switch (type) {
                case "GrassUpgrades":
                    currencyUsed = "Grass";
                    result = "<img id='UCGrassUpgradesGrassValue' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - Grass Value.png' width='50'/><img id='UCGrassUpgradesMoreGrass' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - More Grass.png' width='50'/><img id='UCGrassUpgradesGrowSpeed' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - Grow Speed.png' width='50'/><img id='UCGrassUpgradesXP' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - XP.png' width='50'/><img id='UCGrassUpgradesMoveSpeed' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - Move Speed.png' width='50'/><img id='UCGrassUpgradesRange' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - Range.png' width='50'/><img id='UCGrassUpgradesPP' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Grass Upgrades/Grass Upgrade - PP.png' width='50'/>" + miscHTML;
                    document.getElementById("UCSelectedUpgradesContainer").innerHTML = result;
                    document.getElementById("UCSelectedUpgradesContainer").setAttribute("style", "display:block");
                    document.getElementById("UCGrassUpgradesGrassValue").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-GrassValue";
                        upgradeDescription = "Increases grass value by <span style='color:#00FF00'>+100%</span> per level<br><br>Grass value is <span style='color:#00FF00'>Doubled</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Grass Value";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCGrassUpgradesMoreGrass").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-MoreGrass";
                        upgradeDescription = "Increases grass cap by <span style='color:#00FF00'>1</span> per level";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "More Grass";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });

                    document.getElementById("UCGrassUpgradesGrowSpeed").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-GrowSpeed";
                        upgradeDescription = "Increases grass grow speed by <span style='color:#00FF00'>10%</span> per level";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Grow Speed";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCGrassUpgradesXP").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-XP";
                        upgradeDescription = "Increases experience (XP) gained by <span style='color:#00FF00'>+100%</span> per level<br><br>Experience gain is <span style='color:#00FF00'>Doubled</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "XP";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCGrassUpgradesMoveSpeed").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-MoveSpeed";
                        upgradeDescription = "Increases player movement speed by <span style='color:#00FF00'>2</span> per level<br><br>Base speed is 24";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Move Speed";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCGrassUpgradesRange").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-Range";
                        upgradeDescription = "Increases grass cut range by <span style='color:#00FF00'>1</span> per level<br><br>Base is 4";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Range";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCGrassUpgradesPP").addEventListener("click", function() {
                        selectedUpgrade = "GrassUpgrades-PP";
                        upgradeDescription = "Increases prestige points earned by <span style='color:#00FF00'>+10%</span><br><br>Increases prestige points earned by <span style='color:#00FF00'>25%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "PP";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    updateResults();
                    break;
                case "PrestigeUpgrades":
                    currencyUsed = "PrestigePoint";
                    result = "<img id='UCPrestigeUpgradesGrassValueII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Prestige Upgrades/Prestige Upgrades - Grass.png' width='50'/><img id='UCPrestigeUpgradesXPII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Prestige Upgrades/Prestige Upgrades - XP.png' width='50'/><img id='UCPrestigeUpgradesTP' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Prestige Upgrades/Prestige Upgrades - TP.png' width='50'/><img id='UCPrestigeUpgradesCrystals' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Prestige Upgrades/Prestige Upgrades - Crystals.png' width='50'/>" + miscHTML;
                    document.getElementById("UCSelectedUpgradesContainer").innerHTML = result;
                    document.getElementById("UCSelectedUpgradesContainer").setAttribute("style", "display:block");
                    document.getElementById("UCPrestigeUpgradesGrassValueII").addEventListener("click", function() {
                        selectedUpgrade = "PrestigeUpgrades-GrassValueII";
                        upgradeDescription = "Increases grass value by <span style='color:#00FF00'>+50%</span> per level<br><br>Grass value is Increased by <span style='color:#00FF00'>50%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Grass Value II";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCPrestigeUpgradesXPII").addEventListener("click", function() {
                        selectedUpgrade = "PrestigeUpgrades-XPII";
                        upgradeDescription = "Increases experience (XP) gained by <span style='color:#00FF00'>+50%</span> per level<br><br>Experience gained is increased by <span style='color:#00FF00'>50%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "XP II";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCPrestigeUpgradesTP").addEventListener("click", function() {
                        selectedUpgrade = "PrestigeUpgrades-TP";
                        upgradeDescription = "Increases tier progress (TP) gained by <span style='color:#00FF00'>+100%</span> per level<br><br>Tier progress gain is <span style='color:#00FF00'>Doubled</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "TP";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCPrestigeUpgradesCrystals").addEventListener("click", function() {
                        selectedUpgrade = "PrestigeUpgrades-Crystals";
                        upgradeDescription = "Increases crystals earned by <span style='color:#00FF00'>+20%</span><br><br>Increases crystals earned by <span style='color:#00FF00'>25%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Crystals";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    updateResults();
                    break;
                case "CrystalUpgrades":
                    currencyUsed = "Crystal";
                    result = "<img id='UCCrystalUpgradesGrassValueIII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Crystal Upgrades/Crystal Upgrades - Grass.png' width='50'/><img id='UCCrystalUpgradesXPIII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Crystal Upgrades/Crystal Upgrades - XP.png' width='50'/><img id='UCCrystalUpgradesTPII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Crystal Upgrades/Crystal Upgrades - TP.png' width='50'/><img id='UCCrystalUpgradesPPII' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Crystal Upgrades/Crystal Upgrades - PP.png' width='50'/><img id='UCCrystalUpgradesGrowAmount' src='./Upgrade Calculator/Assets/Upgrades/Earth/Normal Realm/Crystal Upgrades/Crystal Upgrades - Grow Speed.png' width='50'/>" + miscHTML;
                    document.getElementById("UCSelectedUpgradesContainer").innerHTML = result;
                    document.getElementById("UCSelectedUpgradesContainer").setAttribute("style", "display:block");
                    document.getElementById("UCCrystalUpgradesGrassValueIII").addEventListener("click", function() {
                        selectedUpgrade = "CrystalUpgrades-GrassValueIII";
                        upgradeDescription = "Increases grass value by <span style='color:#00FF00'>+50%</span><br><br>Increased by <span style='color:#00FF00'>50%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Grass Value III";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCCrystalUpgradesXPIII").addEventListener("click", function() {
                        selectedUpgrade = "CrystalUpgrades-XPIII";
                        upgradeDescription = "Increases experience (XP) gained by <span style='color:#00FF00'>+50%</span> per level<br><br>Experience gain is increased by <span style='color:#00FF00'>50%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "XP III";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCCrystalUpgradesTPII").addEventListener("click", function() {
                        selectedUpgrade = "CrystalUpgrades-TPII";
                        upgradeDescription = "Increases tier progress (TP) gained by <span style='color:#00FF00'>+100%</span> per level<br><br>Tier progress gain is <span style='color:#00FF00'>Doubled</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "TP II";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCCrystalUpgradesPPII").addEventListener("click", function() {
                        selectedUpgrade = "CrystalUpgrades-PPII";
                        upgradeDescription = "Increases prestige points earned by <span style='color:#00FF00'>+25%</span><br><br>Increases prestige points earned by <span style='color:#00FF00'>25%</span> every <span style='color:#FFFF00'>25</span> levels";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "PP II";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    document.getElementById("UCCrystalUpgradesGrowAmount").addEventListener("click", function() {
                        selectedUpgrade = "CrystalUpgrades-GrowAmount";
                        upgradeDescription = "Increases grass grow amount by <span style='color:#00FF00'>1</span>";
                        getLevelCap();
                        updateResults();
                        document.getElementById("UCSelectedUpgradeName").innerHTML = "Grow Amount";
                        document.getElementById("UCUpgradeLevelCap").innerHTML = notateInt(levelCap);
                    });
                    updateResults();
                    break;
                default:
                    result = "";
                    document.getElementById("UCSelectedUpgradesContainer").setAttribute("style", "display:none");
                    document.getElementById("UCSelectedUpgradesContainer").innerHTML = result + miscHTML;
                    updateResults();
            }
        }
        setUpgradesContainer();

        // Add event listeners to the upgrade selection icons.
        document.getElementById("UCUpgradeSelectionGrassUpgrades").addEventListener("click", function() {
            document.getElementById("UCSelectedUpgradesHeader").innerHTML = "Grass Upgrades";
            document.getElementById("UCSelectedUpgradesHeader").setAttribute("style", "color:#1F9E0E;font-weight:bold;font-size:20px");
            setUpgradesContainer("GrassUpgrades");
            upgradeDescription = "?";
            updateResults();
        });
        document.getElementById("UCUpgradeSelectionPrestigeUpgrades").addEventListener("click", function() {
            document.getElementById("UCSelectedUpgradesHeader").innerHTML = "Prestige Upgrades";
            document.getElementById("UCSelectedUpgradesHeader").setAttribute("style", "color:#00FFFF;font-weight:bold;font-size:20px");
            setUpgradesContainer("PrestigeUpgrades");
            upgradeDescription = "?";
            updateResults();
        });
        document.getElementById("UCUpgradeSelectionCrystalUpgrades").addEventListener("click", function() {
            document.getElementById("UCSelectedUpgradesHeader").innerHTML = "Crystal Upgrades";
            document.getElementById("UCSelectedUpgradesHeader").setAttribute("style", "color:#FF00FF;font-weight:bold;font-size:20px");
            setUpgradesContainer("CrystalUpgrades");
            upgradeDescription = "?";
            updateResults();
        });

        // Add event listeners to the calculate, suffix toggle and differences notation toggle buttons.
        document.getElementById("UCCalculateButton").addEventListener("click", updateResults);
        document.getElementById("UCSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("UCSuffixButton").innerHTML = "Enabled";
                document.getElementById("UCSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("UCSuffixButton").innerHTML = "Disabled";
                document.getElementById("UCSuffixButton").setAttribute("style", "background:#FF0000");
            }
            updateResults();
        });
        document.getElementById("UCDifferenceButton").addEventListener("click", function() {
            if (diffStatus === "multiplier") {
                diffStatus = "percentage";
                document.getElementById("UCDifferenceButton").innerHTML = "Percentage (%)";
            } else {
                diffStatus = "multiplier";
                document.getElementById("UCDifferenceButton").innerHTML = "Multiplier (x)";
            }
            updateResults();
        });
        document.getElementById("UCCompareButton").addEventListener("click", function() {
            if (compareStatus === false) {
                compareStatus = true;
                document.getElementById("UCCompareButton").innerHTML = "Enabled";
                document.getElementById("UCCompareButton").setAttribute("style", "background:#00FF00");
            } else {
                compareStatus = false;
                document.getElementById("UCCompareButton").innerHTML = "Disabled";
                document.getElementById("UCCompareButton").setAttribute("style", "background:#FF0000");
            }
            updateResults();
        });
        updateResults();

    } else {
        console.log("[Upgrade Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addUpgradeCalculator();