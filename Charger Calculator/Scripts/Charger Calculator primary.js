function addChargerCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("ChargerCalculator") !== null && document.getElementById("ChargerCalculatorContainer") === null) {
        console.log("[Charger Calculator] [LOG]: ID located. Running script.");

        // Create the calculator's user interface.
        const calculatorHTMLInputsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Inputs</span></div><br><img src='./Charger Calculator/Assets/Charge.png' width='50'/>Current Charge (<abbr title='Default value: 0.'>notes</abbr>): <input id='CCCurrentChargeInput' style='width:10%'/><p><img src='./Charger Calculator/Assets/Charge.png' width='50'/>Desired Charge (<abbr title='Default value: 1.'>notes</abbr>): <input id='CCGoalChargeInput' style='width:10%'/></p><p><img src='./Charger Calculator/Assets/Grasshop2.png' width='50'/>Current Grasshop (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='CCCurrentGrasshopInput' style='width:10%'/></p><p><img src='./Charger Calculator/Assets/Grasshop2.png' width='50'/>Desired Grasshop (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='CCGoalGrasshopInput' style='width:10%'/></p>";
        const calculatorHTMLBonusesContainer = "<div id='CCChargerBonusesSection'><img src='./Charger Calculator/Assets/Steel2.png' width='50'/><b>Steel:</b> <span id='CCSteelCurrentOutput'>?</span>x > <span id='CCSteelNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/XP.png' width='50'/><b>XP:</b> <span id='CCXPCurrentOutput'>?</span>x > <span id='CCXPNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/TP.png' width='50'/><b>TP:</b> <span id='CCTPCurrentOutput'>?</span>x > <span id='CCTPNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/Grass.png' width='50'/><b>Grass:</b> <span id='CCGrassCurrentOutput'>?</span>x > <span id='CCGrassNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/Prestige.png' width='50'/><b>PP:</b> <span id='CCPPCurrentOutput'>?</span>x > <span id='CCPPNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/Crystal.png' width='50'/><b>Crystals:</b> <span id='CCCrystalsCurrentOutput'>?</span>x > <span id='CCCrystalsNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/Anonymity.png' width='50'/><b>AP:</b> <span id='CCAPCurrentOutput'>?</span>x > <span id='CCAPNextOutput'>?</span>x<br><img src='./Charger Calculator/Assets/Oil.png' width='50'/><b>Oil:</b> <span id='CCOilCurrentOutput'>?</span>x > <span id='CCOilNextOutput'>?</span>x</div>";
        const calculatorHTMLResultsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Result</span></div><div style='text-align:center'><br><button id='CCCalculateButton'>Calculate</button><br><br>With currently <span id='CCCurrentChargeOutput'>?</span> Charge and <span id='CCCurrentGrasshopOutput'>?</span> <span id='CCCurrentGrasshopPluralCheck'>Grasshops</span>, reaching <span id='CCGoalChargeOutput'>?</span> Charge and <span id='CCGoalGrasshopOutput'>?</span> <span id='CCGoalGrasshopPluralCheck'>Grasshops</span> will result in the following bonuses:<br>" + calculatorHTMLBonusesContainer + "</div>";
        document.getElementById("ChargerCalculator").innerHTML = "<div id='ChargerCalculatorContainer' class='templatedesktop' style='padding:1em;background:#B2B200;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='CCSuffixButton'>Disabled</button></div><div style='text-align:center;font-size:30px'><img src='./Charger Calculator/Assets/Charger.png' width='150'/> Charger Calculator <img src='./Charger Calculator/Assets/Charger.png' width='150'/></div><br>" + calculatorHTMLInputsContainer + calculatorHTMLResultsContainer + "</div></div>";

        // Variable and constant declarations.
        const errorText = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>"; // Text string used for HTML outputs in the event of an error.
        const milestones = [0, 1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e36] // Charge requirements to unlock each Charger milestone.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentCharge;
        var goalCharge;
        var currentGrasshop;
        var goalGrasshop;

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

        function updateResults() {
            if (document.getElementById("CCCurrentChargeInput").value === '' || toScientific(document.getElementById("CCCurrentChargeInput").value).lessThan(0)) {
                currentCharge = new Decimal(0);
            } else {
                currentCharge = toScientific(document.getElementById("CCCurrentChargeInput").value).floor();
            }
            if (document.getElementById("CCGoalChargeInput").value === '' || toScientific(document.getElementById("CCGoalChargeInput").value).lessThan(1)) {
                goalCharge = new Decimal(1);
            } else {
                goalCharge = toScientific(document.getElementById("CCGoalChargeInput").value).floor();
            }
            if (document.getElementById("CCCurrentGrasshopInput").value === '' || toScientific(document.getElementById("CCCurrentGrasshopInput").value).lessThan(0)) {
                currentGrasshop = new Decimal(0);
            } else {
                currentGrasshop = toScientific(document.getElementById("CCCurrentGrasshopInput").value).floor();
            }
            if (document.getElementById("CCGoalGrasshopInput").value === '' || toScientific(document.getElementById("CCGoalGrasshopInput").value).lessThan(0)) {
                goalGrasshop = new Decimal(0);
            } else {
                goalGrasshop = toScientific(document.getElementById("CCGoalGrasshopInput").value).floor();
            }
            const gh30CurrentEffect = 1.1 ** decimalMin(31, decimalMax(currentGrasshop.sub(29), 0));
            const gh30NextEffect = 1.1 ** decimalMin(31, decimalMax(goalGrasshop.sub(29), 0));
            const lessZeroesCurrent = decimalMin(1e308, decimalMin(1, decimalMax(currentGrasshop.sub(12), 0)).add(decimalMin(1, decimalMax(currentGrasshop.sub(13), 0))).add(decimalMin(1, decimalMax(currentGrasshop.sub(15), 0))).add(decimalMax(currentGrasshop.sub(17), 0)));
            const lessZeroesNext = decimalMin(1e308, decimalMin(1, decimalMax(goalGrasshop.sub(12), 0)).add(decimalMin(1, decimalMax(goalGrasshop.sub(13), 0))).add(decimalMin(1, decimalMax(goalGrasshop.sub(15), 0))).add(decimalMax(goalGrasshop.sub(17), 0)));

            // Update the HTML outputs.
            if (goalCharge.lessThan(currentCharge) || goalGrasshop.lessThan(currentGrasshop)) {
                document.getElementById("CCChargerBonusesSection").innerHTML = errorText;
            } else {
                document.getElementById("CCChargerBonusesSection").innerHTML = calculatorHTMLBonusesContainer;
                document.getElementById("CCCurrentChargeOutput").innerHTML = notateInt(currentCharge);
                document.getElementById("CCGoalChargeOutput").innerHTML = notateInt(goalCharge);
                document.getElementById("CCCurrentGrasshopOutput").innerHTML = notateInt(currentGrasshop);
                document.getElementById("CCGoalGrasshopOutput").innerHTML = notateInt(goalGrasshop);
                document.getElementById("CCCurrentGrasshopPluralCheck").innerHTML = checkPlural(currentGrasshop, "Grasshop", "Grasshops");
                document.getElementById("CCGoalGrasshopPluralCheck").innerHTML = checkPlural(goalGrasshop, "Grasshop", "Grasshops");

                // Steel.
                if (goalCharge.greaterThanOrEqualTo(milestones[0])) {
                    document.getElementById("CCSteelNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[0]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCSteelNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[0])) {
                    document.getElementById("CCSteelCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[0]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCSteelCurrentOutput").innerHTML = "1";
                }

                // XP.
                if (goalCharge.greaterThanOrEqualTo(milestones[1])) {
                    document.getElementById("CCXPNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[1]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCXPNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[1])) {
                    document.getElementById("CCXPCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[1]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCXPCurrentOutput").innerHTML = "1";
                }

                // TP.
                if (goalCharge.greaterThanOrEqualTo(milestones[2])) {
                    document.getElementById("CCTPNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[2]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCTPNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[2])) {
                    document.getElementById("CCTPCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[2]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCTPCurrentOutput").innerHTML = "1";
                }

                // Grass.
                if (goalCharge.greaterThanOrEqualTo(milestones[3])) {
                    document.getElementById("CCGrassNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[3]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCGrassNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[3])) {
                    document.getElementById("CCGrassCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[3]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCGrassCurrentOutput").innerHTML = "1";
                }

                // PP.
                if (goalCharge.greaterThanOrEqualTo(milestones[4])) {
                    document.getElementById("CCPPNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[4]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCPPNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[4])) {
                    document.getElementById("CCPPCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[4]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCPPCurrentOutput").innerHTML = "1";
                }

                // Crystals.
                if (goalCharge.greaterThanOrEqualTo(milestones[5])) {
                    document.getElementById("CCCrystalsNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[5]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCCrystalsNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[5])) {
                    document.getElementById("CCCrystalsCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[5]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCCrystalsCurrentOutput").innerHTML = "1";
                }

                // AP.
                if (goalCharge.greaterThanOrEqualTo(milestones[6])) {
                    document.getElementById("CCAPNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[6]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCAPNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[6])) {
                    document.getElementById("CCAPCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[6]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCAPCurrentOutput").innerHTML = "1";
                }

                // Oil.
                if (goalCharge.greaterThanOrEqualTo(milestones[7])) {
                    document.getElementById("CCOilNextOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (goalCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[7]).exponent - lessZeroesNext))).log10())).times(gh30NextEffect));
                } else {
                    document.getElementById("CCOilNextOutput").innerHTML = "1";
                }
                if (currentCharge.greaterThanOrEqualTo(milestones[7])) {
                    document.getElementById("CCOilCurrentOutput").innerHTML = notateInt(new Decimal(1.5).pow(decimalMax(1, (currentCharge.dividedBy("1e" + decimalMax(0, new Decimal(milestones[7]).exponent - lessZeroesCurrent))).log10())).times(gh30CurrentEffect));
                } else {
                    document.getElementById("CCOilCurrentOutput").innerHTML = "1";
                }
            }
        }

        // Add event listeners to the calculate and suffix toggle buttons.
        document.getElementById("CCCalculateButton").addEventListener("click", updateResults);
        document.getElementById("CCSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("CCSuffixButton").innerHTML = "Enabled";
                document.getElementById("CCSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("CCSuffixButton").innerHTML = "Disabled";
                document.getElementById("CCSuffixButton").setAttribute("style", "background:#FF0000");
            }
            updateResults();
        });
        updateResults();

    } else {
        console.log("[Charger Calculator] [LOG] Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addChargerCalculator();