// [WIP] To-do: (1) Fix inaccuracies caused by a lower max time name amount. (2) Properly implement the inclusion of Astral Bonuses. (3) Fix issues resulting from numbers >=1e1e3 with the time output.
function addAstralCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("AstralCalculator") !== null && document.getElementById("AstralCalculatorContainer") === null) {
        console.log("[Astral Calculator] [LOG]: ID located. Running script.");

        // Create the calculator's user interface.
        const calculatorHTMLPrimaryStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Main Statistics</span></div><br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Current Astral (<abbr title='Default value: 1.'>notes</abbr>): <input id='ACCurrentAstralInput' style='width:10%'/><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Desired Astral (<abbr title='Default value: 2.'>notes</abbr>): <input id='ACGoalAstralInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/a/ac/Current_Astral_Prestige.png/revision/latest?cb=20221217090120' width='50'/>Current Astral Prestige (<abbr title='(n1) Optional. (n2) Default value: 0.'>notes</abbr>): <input id='ACCurrentAstralPrestigeInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7b/Space_Points.png/revision/latest?cb=20220606225831' width='50'/>SP gain per grass cut (<abbr title='This value is according to the Stats Menu.'>notes</abbr>): <input id='ACSPGainInput' style='width:10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='50'/>Percentage until next Astral (<abbr title='(n1) Optional. (n2) Input any value ranging from 0 to 100, without the percentage symbol. (n3) Default value: 0%.'>notes</abbr>): <input id='ACNextAstralCompletionInput' style='width:10%'/>%</p>";
        const calculatorHTMLManualCuttingStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Manual Cutting Statistics</span></div><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/9a/Manual_Grass_Cutting_Rate.png/revision/latest?cb=20221124065404' width='50'/>Manual grass cut per second (<abbr title='Leave blank if not manually cutting grass.'>notes</abbr>): <input id='ACManualCuttingRateInput' width='10%'/></p>";
        const calculatorHTMLAutocutStatisticsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Autocut Statistics</span></div><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/0/01/Autocut_Rate.png/revision/latest?cb=20221124065411' width='50'/>Autocut rate (<abbr title='(n1) Default value: 0. (n2) Input interval in seconds, such as 0.5 for 2 per second. (n3) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutRateInput' width='10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/2/20/Autocut_Amount.png/revision/latest?cb=20221124065408' width='50'/>Autocut amount (<abbr title='(n1) Default value: 1. (n2) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutAmountInput' width='10%'/></p><p><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/c/c7/Autocut_Value.png/revision/latest?cb=20221124065409' width='50'/>Autocut value (<abbr title='(n1) Default value: 1. (n2) Leave blank if autocut is disabled.'>notes</abbr>): <input id='ACAutocutValueInput' width='10%'/></p>";
        const calculatorHTMLResultsAstralBonusesContainer = "<br><br><br><div>Your Astral Bonuses will also become (<u><span id='ACAstralBonusesSectionToggle'>click to toggle</span></u> section visibility):<br><div id='ACAstralBonusesSection' style='display:none'><p>PP increase: +<span id='ACAstralBonusPPIncreaseOutput'>?</span> levels</p><p>Crystal increase: +<span id='ACAstralBonusCrystalIncreaseOutput'>?</span> tiers</p><p>Platinum worth: +<span id='ACAstralBonusPlatinumWorthOutput'>?</span></p><p>Steel multiplier: x<span id='ACAstralBonusSteelMultiplierOutput'>?</span></p><p>Grass bonus (AGH Milestone 28GH): x<span id='ACAstralBonusGrassBonusOutput'>?</span></p><p>XP bonus (AGH Milestone 25GH): x<span id='ACAstralBonusXPBonusOutput'>?</span></p><p>TP bonus (AGH Milestone 22GH): x<span id='ACAstralBonusTPBonusOutput'>?</span></p><p>Stars bonus (AGH Milestone 19GH): x<span id='ACAstralBonusStarsBonusOutput'>?</span></p><p>Moonstone bonus (AGH Milestone 16GH): +<span id='ACAstralBonusMoonstoneBonusOutput'>?</span></p><p>Charge bonus (AGH Milestone 13GH): x<span id='ACAstralBonusChargeBonusOutput'>?</span></p><p>SFRGT bonus (AGH Milestone 10GH): x<span id='ACAstralBonusSFRGTBonusOutput'>?</span></p><p id='ACAstralBonusDarkMatterBonusContainer' style='display:none'>Dark Matter bonus (Astral Prestige 1): x<span id='ACAstralBonusDarkMatterBonusOutput'>?</span></p><p id='ACAstralBonusNPBonusContainer' style='display:none'>NP bonus (Astral Prestige 2): x<span id='ACAstralBonusNPBonusOutput'>?</span></p><p id='ACAstralBonusRingsBonusContainer' style='display:none'>Rings bonus (Astral Prestige 3): x<span id='ACAstralBonusRingsBonusOutput'>?</span></p><p id='ACAstralBonusDarkFruitsAmountBonusContainer' style='display:none'>Dark Fruits Amount bonus (Astral Prestige 4): x<span id='ACAstralBonusDarkFruitsAmountBonusOutput'>?</span></p><p id='ACAstralBonusLunarPowerBonusContainer' style='display:none'>Lunar Power bonus (Astral Prestige 5): x<span id='ACAstralBonusLunarPowerBonusOutput'>?</span></p><p id='ACAstralBonusArcsBonusContainer' style='display:none'>Arcs bonus (Astral Prestige 6): x<span id='ACAstralBonusArcsBonusOutput'>?</span></p><p id='ACAstralBonusStardustBonusContainer' style='display:none'>Stardust bonus (Astral Prestige 7): x<span id='ACAstralBonusStardustBonusOutput'>?</span></p><p id='ACAstralBonusSolarFlareBonusContainer' style='display:none'>Solar Flare bonus (Astral Prestige 8): x<span id='ACAstralBonusSolarFlareBonusOutput'>?</span></p><p id='ACAstralBonusPrestigePointsBonusContainer' style='display:none'>Prestige Points bonus (Astral Prestige 9): +<span id='ACAstralBonusPrestigePointsBonusOutput'>?</span>%</p></div>";
        const calculatorHTMLResultsContainer = "<div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;text-align:center'><span style='font-size:20px'>Result</span></div><div style='text-align:center'><br><button id='ACCalculateButton'>Calculate</button><br><br>At Astral <span id='ACCurrentAstralOutput'>?</span> and Astral Prestige <span id='ACCurrentAstralPrestigeOutput'>?</span>, when currently <span id='ACNextAstralCompletionOutput'>?</span>% to next Astral, the requirements to reach Astral <span id='ACGoalAstralOutput'>?</span> are:<br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/7b/Space_Points.png/revision/latest?cb=20220606225831' width='50'/><b>Space Power:</b> <span id='ACSPReqOutput'>?</span><br><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/9/94/Speed.png/revision/latest?cb=20221012064310' width='50'/><b>Time:</b> <span id='ACTimeReqOutput'>?</span><br><br><b>Highest time name:</b> <u><span id='ACYearsOnlyButton'>Years</span></u> (click to toggle)" + calculatorHTMLResultsAstralBonusesContainer + "</div>";
        document.getElementById("AstralCalculator").innerHTML = "<div id='AstralCalculatorContainer' class='templatedesktop' style='padding:1em;background:#A629FF;width:80%;margin:auto'><div style='text-align:initial;width:20%;padding:1em;background:initial;overflow:auto' class='templatedesktop'>Toggle Suffixes<br><button style='background:#FF0000' id='ACSuffixButton'>Disabled</button></div><div style='text-align:center;font-size:30px'><img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='150'/> Astral Calculator <img src='https://static.wikia.nocookie.net/roblox-grass-cutting-incremental/images/7/79/Star_Currency.png/revision/latest?cb=20220606224716' width='150'/></div><br>" + calculatorHTMLPrimaryStatisticsContainer + calculatorHTMLManualCuttingStatisticsContainer + calculatorHTMLAutocutStatisticsContainer + calculatorHTMLResultsContainer + "</div></div>";

        // Variable and constant declarations.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var onlyYearsStatus = true; // Determines whether to display time names above years or only years.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var maxTimeNames = 3; // Determines the maximum number of time names to be outputted. Lower numbers may cause inaccuracies.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        var currentAstral;
        var goalAstral;
        var currentAstralPrestige;
        var spacePower;
        var nextAstralCompletion;
        var manualCuttingRate;
        var totalCuttingRate;
        var totalSPGain;
        var autocutRate;
        var autocutAmount;
        var autocutValue;
        var totalSPReq;
        var timeReq;

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

        function getInputData() { // Get user values from inputs and interpret them as a Decimal scientific notation number.
            if (document.getElementById("ACCurrentAstralInput").value === '' || toScientific(document.getElementById("ACCurrentAstralInput").value).lessThan(1)) {
                currentAstral = new Decimal(1);
            } else {
                currentAstral = toScientific(document.getElementById("ACCurrentAstralInput").value).floor();
            }
            if (document.getElementById("ACGoalAstralInput").value === '' || toScientific(document.getElementById("ACGoalAstralInput").value).lessThan(2)) {
                goalAstral = new Decimal(2);
            } else {
                goalAstral = toScientific(document.getElementById("ACGoalAstralInput").value).floor();
            }
            if (document.getElementById("ACCurrentAstralPrestigeInput").value === '' || toScientific(document.getElementById("ACCurrentAstralPrestigeInput").value).lessThan(0)) {
                currentAstralPrestige = new Decimal(0);
            } else {
                currentAstralPrestige = toScientific(document.getElementById("ACCurrentAstralPrestigeInput").value).floor();
            }
            if (document.getElementById("ACSPGainInput").value === '' || toScientific(document.getElementById("ACSPGainInput").value).lessThan(1)) {
                spacePower = new Decimal(1);
            } else {
                spacePower = toScientific(document.getElementById("ACSPGainInput").value).floor();
            }
            if (document.getElementById("ACNextAstralCompletionInput").value === '' || toScientific(document.getElementById("ACNextAstralCompletionInput").value).lessThan(0)) {
                nextAstralCompletion = new Decimal(0);
            } else if (toScientific(document.getElementById("ACNextAstralCompletionInput").value).greaterThanOrEqualTo(100)) {
                nextAstralCompletion = new Decimal(100);
            } else {
                nextAstralCompletion = toScientific(document.getElementById("ACNextAstralCompletionInput").value);
            }
            if (document.getElementById("ACManualCuttingRateInput").value === '' || toScientific(document.getElementById("ACManualCuttingRateInput").value).lessThan(0)) {
                manualCuttingRate = new Decimal(0);
            } else {
                manualCuttingRate = toScientific(document.getElementById("ACManualCuttingRateInput").value);
            }
            if (document.getElementById("ACAutocutRateInput").value === '' || toScientific(document.getElementById("ACAutocutRateInput").value).lessThan(0)) {
                autocutRate = new Decimal(0);
            } else {
                autocutRate = toScientific(document.getElementById("ACAutocutRateInput").value);
            }
            if (document.getElementById("ACAutocutAmountInput").value === '' || toScientific(document.getElementById("ACAutocutAmountInput").value).lessThan(1)) {
                autocutAmount = new Decimal(1);
            } else {
                autocutAmount = toScientific(document.getElementById("ACAutocutAmountInput").value).floor();
            }
            if (document.getElementById("ACAutocutValueInput").value === '' || toScientific(document.getElementById("ACAutocutValueInput").value).lessThan(1)) {
                autocutValue = new Decimal(1);
            } else {
                autocutValue = toScientific(document.getElementById("ACAutocutValueInput").value).floor();
            }
        }

        // Update the SP requirement and (WIP) time requirement.
        function updateRequirements() {
            getInputData();
            var baseReq = new Decimal(10).pow((new Decimal(10).times(currentAstralPrestige)).plus(2));
            var multi = new Decimal(2).plus(new Decimal(0.1).times(currentAstralPrestige));

            function setErrorTexts() { // Set the HTML texts for SP and time requirements to their respective final requirements. Set infinity texts if the value is Infinity, -Infinity or NaN.
                const errorText = "<span class='rainbow'>To infinity and beyond!</span><sup style='font-size:10px'><abbr title='This is an error message.'>(?)</abbr></sup>";
                if (totalSPReq.lessThan(0) || totalSPReq.greaterThanOrEqualTo("(e^1e308)308") || currentAstral.greaterThan(goalAstral)) {
                    document.getElementById("ACSPReqOutput").innerHTML = errorText;
                    document.getElementById("ACTimeReqOutput").innerHTML = errorText;
                } else {
                    document.getElementById("ACSPReqOutput").innerHTML = notateInt(totalSPReq);
                    document.getElementById("ACTimeReqOutput").innerHTML = outputTime(timeReq);
                }
                if (isNaN(timeReq)) {
                    document.getElementById("ACTimeReqOutput").innerHTML = errorText;
                }
            }

            // [WIP] Created by User:TheSeal27. To-do: (1) Add years-only switch and support for time names above years.
            const timeUnits = [
                "1",
                "60",
                "3.6e3",
                "8.64e4",
                "6.048e5",
                "2.6298e6",
                "3.15576e7",
                "3.15576e8",
                "3.15576e9",
                "3.15576e10",
                "4.350846312e17",
                "3.15576e21",
                "3.15576e33",
                "3.15576e50",
                "3.15576e107",
                "1e300",
                "1e1e3",
                "1e1e6"
            ];

            const timeNames = [
                "Second",
                "Minute",
                "Hour",
                "Day",
                "Week",
                "Month",
                "Year",
                "Decade",
                "Century",
                "Millennium",
                "Age of the Universe",
                "Stelliferous Era",
                "Degenerate Era",
                "Black Hole Era",
                "Dark Era",
                "Valve Time",
                "GCI Update Development Period",
                "Eternity"
            ];

            const timeNamesPlural = [
                "Seconds",
                "Minutes",
                "Hours",
                "Days",
                "Weeks",
                "Months",
                "Years",
                "Decades",
                "Centuries",
                "Millennia",
                "Ages of the Universe",
                "Stelliferous Eras",
                "Degenerate Eras",
                "Black Hole Eras",
                "Dark Eras",
                "Valve Times",
                "GCI Update Development Periods",
                "Eternities"
            ];

            function secondsToTime(input) {
                input = new Decimal(input);

                function modOp(x, y) { // Custom modulo operation function to support >1.797e308 numbers.
                    x = new Decimal(x);
                    y = new Decimal(y);
                    if (x.lessThan(1.797693134862315e308) && y.lessThan(1.797693134862315e308)) {
                        result = x % y;
                    } else {
                        result = x.sub(x.dividedBy(y).floor().times(y));
                    }
                    return new Decimal(result);
                }
                // The following require the OYT (Only Years Toggle) disabled.
                // Eternities.
                var eternities = new Decimal(input.dividedBy(new Decimal(timeUnits[17]))).floor();

                // GCI Update Development Periods.
                var gciudpsDiv = new Decimal(modOp(input, timeUnits[17]));
                var gciudps = new Decimal(gciudpsDiv.dividedBy(new Decimal(timeUnits[16]))).floor();

                // Valve Times.
                var valvetimesDiv = new Decimal(modOp(input, timeUnits[16]));
                var valvetimes = new Decimal(valvetimesDiv.dividedBy(new Decimal(timeUnits[15]))).floor();

                // Dark Eras.
                var darkerasDiv = new Decimal(modOp(input, timeUnits[15]));
                var darkeras = new Decimal(darkerasDiv.dividedBy(new Decimal(timeUnits[14]))).floor();

                // Black Hole Eras.
                var blackholeerasDiv = new Decimal(modOp(input, timeUnits[14]));
                var blackholeeras = new Decimal(blackholeerasDiv.dividedBy(new Decimal(timeUnits[13]))).floor();

                // Degenerate Eras.
                var degenerateerasDiv = new Decimal(modOp(input, timeUnits[13]));
                var degenerateeras = new Decimal(degenerateerasDiv.dividedBy(new Decimal(timeUnits[12]))).floor();

                // Stelliferous Eras.
                var stelliferouserasDiv = new Decimal(modOp(input, timeUnits[12]));
                var stelliferouseras = new Decimal(stelliferouserasDiv.dividedBy(new Decimal(timeUnits[11]))).floor();

                // Ages of the Universe.
                var aotu = new Decimal(modOp(input, timeUnits[11]));
                var aotu = new Decimal(aotu.dividedBy(new Decimal(timeUnits[10]))).floor();

                // Millennia.
                var millenniaDiv = new Decimal(modOp(input, timeUnits[10]));
                var millennia = new Decimal(millenniaDiv.dividedBy(new Decimal(timeUnits[9]))).floor();

                // Centuries.
                var centuriesDiv = new Decimal(modOp(input, timeUnits[9]));
                var centuries = new Decimal(centuriesDiv.dividedBy(new Decimal(timeUnits[8]))).floor();

                // Decades.
                var decadesDiv = new Decimal(modOp(input, timeUnits[8]));
                var decades = new Decimal(decadesDiv.dividedBy(new Decimal(timeUnits[7]))).floor();

                // Years.
                if (onlyYearsStatus === true) {
                    var years = new Decimal(input.dividedBy(new Decimal(timeUnits[6]))).floor();
                } else {
                    var yearsDiv = new Decimal(modOp(input, timeUnits[7]));
                    var years = new Decimal(yearsDiv.dividedBy(new Decimal(timeUnits[6]))).floor();
                }

                // Months.
                var monthDiv = new Decimal(modOp(input, timeUnits[6]));
                var months = new Decimal(monthDiv.dividedBy(new Decimal(timeUnits[5]))).floor();

                // Weeks.
                var weekDiv = new Decimal(modOp(input, timeUnits[5]));
                var weeks = new Decimal(weekDiv.dividedBy(new Decimal(timeUnits[4]))).floor();

                // Days.
                var dayDiv = new Decimal(modOp(input, timeUnits[4]));
                var days = new Decimal(dayDiv.dividedBy(new Decimal(timeUnits[3]))).floor();

                // Hours.
                var hourDiv = new Decimal(modOp(input, timeUnits[3]));
                var hours = new Decimal(hourDiv.dividedBy(new Decimal(timeUnits[2]))).floor();

                // Minutes.
                var minuteDiv = new Decimal(modOp(input, timeUnits[2]));
                var minutes = new Decimal(minuteDiv.dividedBy(new Decimal(timeUnits[1]))).floor();

                // Seconds.
                var secondDiv = new Decimal(modOp(minuteDiv, timeUnits[1]));
                var seconds = new Decimal(secondDiv.toStringWithDecimalPlaces(decimals));

                var obj = {
                    "e": eternities,
                    "gciupd": gciudps,
                    "vt": valvetimes,
                    "daera": darkeras,
                    "bhera": blackholeeras,
                    "dera": degenerateeras,
                    "sera": stelliferouseras,
                    "aotu": aotu,
                    "mi": millennia,
                    "c": centuries,
                    "de": decades,
                    "y": years,
                    "mo": months,
                    "w": weeks,
                    "d": days,
                    "h": hours,
                    "m": minutes,
                    "s": seconds
                };
                return obj;
            }

            function checkPlural(e, timeUnit) {
                if (e == "1") {
                    result = timeNames[timeUnit];
                } else {
                    result = timeNamesPlural[timeUnit];
                }
                return result;
            }

            var iteration = 0;

            function outputTime(e) {
                e = new Decimal(e);
                var $a = [];

                function addNewTime(x) {
                    $a.push(x);
                }
                // The following require the OYT (Only Years Toggle) disabled.
                if (onlyYearsStatus === false) {
                    // Check Eternities.
                    if (secondsToTime(e).e.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).e) + " " + checkPlural(secondsToTime(e).e, 17));
                    }

                    // Check GCI Update Development Periods.
                    if (secondsToTime(e).gciupd.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).gciupd) + " " + checkPlural(secondsToTime(e).gciupd, 16));
                    }

                    // Check Valve Times.
                    if (secondsToTime(e).vt.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).vt) + " " + checkPlural(secondsToTime(e).vt, 15));
                    }

                    // Check Dark Eras.
                    if (secondsToTime(e).daera.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).daera) + " " + checkPlural(secondsToTime(e).daera, 14));
                    }

                    // Check Black Hole Eras.
                    if (secondsToTime(e).bhera.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).bhera) + " " + checkPlural(secondsToTime(e).bhera, 13));
                    }

                    // Check Degenerate Eras.
                    if (secondsToTime(e).dera.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).dera) + " " + checkPlural(secondsToTime(e).dera, 12));
                    }

                    // Check Stelliferous Eras.
                    if (secondsToTime(e).sera.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).sera) + " " + checkPlural(secondsToTime(e).sera, 11));
                    }

                    // Check Ages of the Universe.
                    if (secondsToTime(e).aotu.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).aotu) + " " + checkPlural(secondsToTime(e).aotu, 10));
                    }

                    // Check Millennia.
                    if (secondsToTime(e).mi.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).mi) + " " + checkPlural(secondsToTime(e).mi, 9));
                    }

                    // Check Centuries.
                    if (secondsToTime(e).c.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).c) + " " + checkPlural(secondsToTime(e).c, 8));
                    }

                    // Check Decades.
                    if (secondsToTime(e).de.greaterThan(0)) {
                        addNewTime(notateInt(secondsToTime(e).de) + " " + checkPlural(secondsToTime(e).de, 7));
                    }
                }

                // Check Years.
                if (secondsToTime(e).y.greaterThan(0)) {
                    if (onlyYearsStatus === false) {
                        addNewTime(notateInt(secondsToTime(e).y) + " " + checkPlural(secondsToTime(e).y, 6));
                    } else {
                        addNewTime(notateInt(secondsToTime(e).y) + " " + checkPlural(secondsToTime(e).y, 6));
                    }
                }
                // Check Months.
                if (secondsToTime(e).mo.greaterThan(0)) {
                    addNewTime(secondsToTime(e).mo + " " + checkPlural(secondsToTime(e).mo, 5));
                }
                // Check Weeks.
                if (secondsToTime(e).w.greaterThan(0)) {
                    addNewTime(secondsToTime(e).w + " " + checkPlural(secondsToTime(e).w, 4));
                }
                // Check Days.
                if (secondsToTime(e).d.greaterThan(0)) {
                    addNewTime(secondsToTime(e).d + " " + checkPlural(secondsToTime(e).d, 3));
                }
                // Check Hours.
                if (secondsToTime(e).h.greaterThan(0)) {
                    addNewTime(secondsToTime(e).h + " " + checkPlural(secondsToTime(e).h, 2));
                }
                // Check Minutes.
                if (secondsToTime(e).m.greaterThan(0)) {
                    addNewTime(secondsToTime(e).m + " " + checkPlural(secondsToTime(e).m, 1));
                }
                // Check Seconds.
                if (secondsToTime(e).s.greaterThan(0)) {
                    addNewTime(secondsToTime(e).s + " " + checkPlural(secondsToTime(e).s, 0));
                }
                $a = $a.splice(0, maxTimeNames);
                switch (onlyYearsStatus) {
                    case false:
                        if (secondsToTime(e).e.greaterThanOrEqualTo("1e1e16")) {
                            result = "A long time from now in a calculator far, far away...";
                        } else {
                            result = $a.join(', ');
                        }
                        break;
                    default:
                        if (secondsToTime(e).y.greaterThanOrEqualTo("1e1e16")) {
                            result = "A long time from now in a calculator far, far away...";
                        } else {
                            result = $a.join(', ');
                        }
                }
                return result;
            }

            // Update HTML texts for inputted values.
            document.getElementById("ACCurrentAstralOutput").innerHTML = notateInt(currentAstral);
            document.getElementById("ACGoalAstralOutput").innerHTML = notateInt(goalAstral);
            document.getElementById("ACCurrentAstralPrestigeOutput").innerHTML = notateInt(currentAstralPrestige);
            document.getElementById("ACNextAstralCompletionOutput").innerHTML = notateInt(nextAstralCompletion);
            if (new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1))).greaterThanOrEqualTo("1e1e16")) {
                totalSPReq = new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1)));
            } else {
                totalSPReq = new Decimal((baseReq.times(multi.pow((goalAstral.sub(1))))).dividedBy(multi.sub(1)).sub((baseReq.times(multi.pow((currentAstral.sub(1))))).dividedBy(multi.sub(1)))).sub(baseReq.times(multi.pow(currentAstral.sub(1))).times(nextAstralCompletion.times(0.01)));
            }
            if (manualCuttingRate.equals(0) && autocutRate.greaterThan(0)) {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).dividedBy(autocutRate).times(autocutAmount).times(autocutValue)));
            } else if (manualCuttingRate.greaterThan(0) && autocutRate.equals(0)) {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).times(manualCuttingRate)));
            } else {
                totalSPGain = new Decimal(spacePower.times(new Decimal(1).times(manualCuttingRate).add(new Decimal(1).dividedBy(autocutRate).times(autocutAmount).times(autocutValue))));
            }
            if (isNaN(totalSPGain)) {
                totalSPGain = new Decimal(1);
            }
            timeReq = totalSPReq.dividedBy(totalSPGain);
            console.log(totalSPReq);
            console.log(timeReq);
            setErrorTexts();
            if (timeReq.lessThan(1e-3)) {
                document.getElementById("ACTimeReqOutput").innerHTML = "Less than 1 Millisecond";
            }
        }

        // Set calculating text for a particular HTML requirement or both, depending on the value of the parameter.
        function setCalculatingText(e) {
            const calculatingText = "<i>Calculating...</i>";
            if (e === "SP") {
                document.getElementById("ACSPReqOutput").innerHTML = calculatingText;
            } else if (e === "Time") {
                document.getElementById("ACTimeReqOutput").innerHTML = calculatingText;
            } else {
                document.getElementById("ACSPReqOutput").innerHTML = calculatingText;
                document.getElementById("ACTimeReqOutput").innerHTML = calculatingText;
            }
        }

        // Add click event listeners to the calculate, suffix toggle, years-only toggle and Astral Bonuses section toggle buttons.
        document.getElementById("ACCalculateButton").addEventListener("click", updateRequirements);
        document.getElementById("ACSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("ACSuffixButton").innerHTML = "Enabled";
                document.getElementById("ACSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("ACSuffixButton").innerHTML = "Disabled";
                document.getElementById("ACSuffixButton").setAttribute("style", "background:#FF0000");
            }
            updateRequirements();
        });
        document.getElementById("ACYearsOnlyButton").addEventListener("click", function() {
            if (onlyYearsStatus === true) {
                onlyYearsStatus = false;
                document.getElementById("ACYearsOnlyButton").innerHTML = "Eternities";
            } else {
                onlyYearsStatus = true;
                document.getElementById("ACYearsOnlyButton").innerHTML = "Years";
            }
            updateRequirements();
        });
        document.getElementById("ACAstralBonusesSectionToggle").addEventListener("click", function() {
            if (document.getElementById("ACAstralBonusesSection").getAttribute("style") === "display:none") {
                document.getElementById("ACAstralBonusesSection").setAttribute("style", 'display:initial');
            } else {
                document.getElementById("ACAstralBonusesSection").setAttribute("style", 'display:none');
            }
        });
        updateRequirements();
    } else {
        console.log("[Astral Calculator] [LOG]: Template is not transcluded. Cancelling script.");
    }
}
addAstralCalculator();