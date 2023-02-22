// To-do list: (1) Add support for Solar Rays gained per interval, then factor that into the currently nonfunctional 'Time' result. This will include both manual and passive accumulation of SRs. (2) Add limited support for numbers above e9e15. (May already be done?)
function addEclipseCalculator() { // Function for ensuring all the calculator's variables and functions stay within.
    if (document.getElementById("EclipseCalculator") !== null && document.getElementById("EclipseCalculatorContainer") === null) {
        console.log("[Eclipse Calculator] [LOG]: ID located. Running script.");

        // Create the calculator's user interface.
        const calculatorHTMLPrimaryStatisticsContainer = "<tr><td><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Primary Statistics</div><p>Current Eclipse (<abbr title='Default value: 1.'>notes</abbr>): <input id='CurrentEclipseInput' style='width:5%'/></p><p>Desired Eclipse (<abbr title='Default value: 2.'>notes</abbr>): <input id='GoalEclipseInput' style='width:5%'/></p><p>Percentage until next Eclipse (<abbr title='Default value: 0%. Input value as a number between 0 and 100. Supports decimals.'>notes</abbr>): <input id='NextEclipseCompletionInput' style='width:5%'/>%</p></td></tr>";
        const calculatorHTMLManualSRAccStatContainer = "<tr><td><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Manual SR Accumulation Statistics</div><p>Average Solar Rays gained per Supernova (<abbr title='Default value: 0. Leave blank if not manually performing Supernovae.'>notes</abbr>): <input id='SRsPerSupernovaInput' style='width:5%'/></p><p>Average time per Supernova (<abbr title='Default value: 0 seconds. Input numbers before their time equivalent, such as 2 hours, 47.5 minutes. Leave blank if not manually performing Supernovae.'>notes</abbr>): <input id='TimePerSupernovaInput' style='width:5%'/></p></td></tr>";
        const calculatorHTMLAutoSRAccStatContainer = "<tr><td><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Automatic SR Accumulation Statistics</div><p>Solar Ray Generation generation amount: (<abbr title='Default value: 0. Leave blank if not passively generating Solar Rays.'>notes</abbr>): <input id='SRGenerationAmountInput' style='width:5%'/></p></td></tr>";
        const calculatorHTMLResultsContainer = "<tr><td><div class='templatedesktop' style='background:initial;border-radius:initial;border-left:0;border-right:0;padding:0.25em;font-size:20px;text-align:center'>Result</div><center><br><button id='ECCalculateButton'>Calculate</button><br><br>At Eclipse <span id='CurrentEclipse'>?</span>, the requirements to reach Eclipse <span id='GoalEclipse'>?</span>, when currently <span id='NextEclipseCompletionOutput'>?</span>% to next Eclipse, are:<br><img src='./Eclipse Calculator/Assets/XP3.png' width='50'/>Solar Rays: <span id='EclipseCalculatorSRReq'>?</span><br><img src='./Eclipse Calculator/Assets/Speed.png' width='50'/>Time: <span id='EclipseCalculatorTimeReq'>?</span></center></td></tr>";
        document.getElementById("EclipseCalculator").innerHTML = "<div id='EclipseCalculatorContainer' class='templatedesktop' style='padding:1em;background:#FFA500;text-align:center;width:80%;margin:auto'><div style='text-align:initial;width:10%;padding:1em;background:initial' class='templatedesktop'>Toggle Suffixes<button style='background:#FF0000' id='ECSuffixButton'>Disabled</button></div><div style='text-align:center;font-weight:bold;font-size:20px'><img src='./Eclipse Calculator/Assets/Eclipse.png' width='75'/> Eclipse Calculator <img src='./Eclipse Calculator/Assets/Eclipse.png' width='75'/></div><table class='templatedesktop' style='margin:auto;width:100%;border:0;border-radius:initial;background:#CC8400;padding:0.5em'>" + calculatorHTMLPrimaryStatisticsContainer + calculatorHTMLManualSRAccStatContainer + calculatorHTMLAutoSRAccStatContainer + calculatorHTMLResultsContainer + "</table></div>";

        // Variable and constant declarations.
        var suffixStatus = false; // Determines whether suffix notation output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.
        const suffixes = ["", "", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "DDc", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OQd", "NQd", "Qi", "UQi", "DQi", "TQi", "QaQi", "QtQi", "SxQi", "SpQi", "OQi", "NQi", "He", "UHe", "DHe", "THe", "QaHe", "QtHe", "SxHe", "SpHe", "OHe", "NHe", "St", "USt", "DSt", "TSt", "QaSt", "QtSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QtOg", "SxOg", "SpOg", "OOg", "NOg", "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn", "NNn"]; // Suffixes between e0 and e300, according to the game's suffixes.
        const suffixesLC = ["", "", "m", "b", "t", "qa", "qt", "sx", "sp", "oc", "no", "dc", "ud", "ddc", "td", "qad", "qid", "sxd", "spd", "ocd", "nod", "vg", "uvg", "dvg", "tvg", "qavg", "qtvg", "sxvg", "spvg", "ovg", "nvg", "tg", "utg", "dtg", "ttg", "qatg", "qttg", "sxtg", "sptg", "otg", "ntg", "qd", "uqd", "dqd", "tqd", "qaqd", "qtqd", "sxqd", "spqd", "oqd", "nqd", "qi", "uqi", "dqi", "tqi", "qaqi", "qtqi", "sxqi", "spqi", "oqi", "nqi", "he", "uhe", "dhe", "the", "qahe", "qthe", "sxhe", "sphe", "ohe", "nhe", "st", "ust", "dst", "tst", "qast", "qtst", "sxst", "spst", "ost", "nst", "og", "uog", "dog", "tog", "qaog", "qtog", "sxog", "spog", "oog", "nog", "nn", "unn", "dnn", "tnn", "qann", "qtnn", "sxnn", "spnn", "onn", "nnn"]; // An all-lowercase version of the above suffixes array, used for the 'toScientific' function.
        const errorText = "<span class='rainbow' style='font-weight:bold;font-size:20px'>Error!</span>"; // Text string used for HTML outputs in the event of an error.

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

        function updateResults() { // Update the internal data based on user inputted data, as well as the HTML outputs.
            var currentEclipse;
            var goalEclipse;
            var nextEclipseCompletion;
            var srGainPerSN;
            var timePerSN;
            var srGenAmount;
            document.getElementById("EclipseCalculatorSRReq").innerHTML = "Calculating...";
            if (document.getElementById("CurrentEclipseInput").value === '' || new Decimal(document.getElementById("CurrentEclipseInput").value).lessThan(1)) {
                currentEclipse = new Decimal(1);
            } else {
                currentEclipse = toScientific(document.getElementById("CurrentEclipseInput").value);
            }
            if (document.getElementById("GoalEclipseInput").value === '' || new Decimal(document.getElementById("GoalEclipseInput").value).lessThan(1)) {
                goalEclipse = new Decimal(2);
            } else {
                goalEclipse = toScientific(document.getElementById("GoalEclipseInput").value);
            }
            if (document.getElementById("NextEclipseCompletionInput").value === '' || new Decimal(document.getElementById("NextEclipseCompletionInput").value).lessThan(0) || new Decimal(document.getElementById("NextEclipseCompletionInput").value).greaterThan(100)) {
                nextEclipseCompletion = new Decimal(0);
            } else {
                nextEclipseCompletion = toScientific(document.getElementById("NextEclipseCompletionInput").value).times(0.01);
            }
            if (document.getElementById("SRsPerSupernovaInput").value === '' || new Decimal(document.getElementById("SRsPerSupernovaInput").value).lessThan(0)) {
                srGainPerSN = new Decimal(0);
            } else {
                srGainPerSN = toScientific(document.getElementById("SRsPerSupernovaInput").value);
            }
            if (document.getElementById("TimePerSupernovaInput").value === '' || new Decimal(document.getElementById("TimePerSupernovaInput").value).lessThan(0)) {
                timePerSN = new Decimal(0);
            } else {
                timePerSN = toScientific(document.getElementById("TimePerSupernovaInput").value);
            }
            if (document.getElementById("SRGenerationAmountInput").value === '' || new Decimal(document.getElementById("SRGenerationAmountInput").value).lessThan(0)) {
                srGenAmount = new Decimal(0);
            } else {
                srGenAmount = toScientific(document.getElementById("SRGenerationAmountInput").value);
            }

            document.getElementById("CurrentEclipse").innerHTML = notateInt(currentEclipse);
            document.getElementById("GoalEclipse").innerHTML = notateInt(goalEclipse);
            document.getElementById("NextEclipseCompletionOutput").innerHTML = notateInt(nextEclipseCompletion.times(100));
            console.log(nextEclipseCompletion);
            result = new Decimal((new Decimal(100).times(new Decimal(1.05).pow((goalEclipse.sub(1))))).dividedBy(1.05 - 1).sub((new Decimal(100).times(new Decimal(1.05).pow((currentEclipse.sub(1))))).dividedBy(1.05 - 1))).sub(new Decimal(100).times(new Decimal(1.05).pow(currentEclipse.sub(1))).times(nextEclipseCompletion)); // Determines the total Solar Ray requirement from current Eclipse to goal Eclipse, as well as next Eclipse completion.
            if (currentEclipse.greaterThan(goalEclipse)) {
                console.log("error");
                document.getElementById("EclipseCalculatorSRReq").innerHTML = errorText;
                document.getElementById("EclipseCalculatorTimeReq").innerHTML = errorText;
            } else {
                console.log("normal");
                document.getElementById("EclipseCalculatorSRReq").innerHTML = notateInt(result);
            }
        }

        // Add click event listeners to the calculate and suffix toggle buttons.
        document.getElementById("ECCalculateButton").addEventListener("click", updateResults);
        document.getElementById("ECSuffixButton").addEventListener("click", function() {
            if (suffixStatus === false) {
                suffixStatus = true;
                document.getElementById("ECSuffixButton").innerHTML = "Enabled";
                document.getElementById("ECSuffixButton").setAttribute("style", "background:#00FF00");
            } else {
                suffixStatus = false;
                document.getElementById("ECSuffixButton").innerHTML = "Disabled";
                document.getElementById("ECSuffixButton").setAttribute("style", "background:#FF0000");
            }
			updateResults();
        });
		updateResults();
    } else {
        console.log("[Eclipse Calculator] [LOG]: Failed to locate ID or calculator already exists. Cancelling script.");
    }
}
addEclipseCalculator();