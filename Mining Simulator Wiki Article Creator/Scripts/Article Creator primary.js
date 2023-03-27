// Function for ensuring all the tool's inner workings stay within.
function addMSWikiArticleCreator() {
    if (document.getElementById('MSWikiArticleCreator') !== null && document.getElementById('MSWikiArticleCreatorContainer') === null) {
        console.log('[Article Creator] [LOG]: ID located. Running script.');

        // Create the tool's user interface.
        document.getElementById('MSWikiArticleCreator').innerHTML = "<div id='MSWikiArticleCreatorContainer'><div class='templatedesktop' style='padding:0.5em;width:80%;margin:auto;text-align:center'><div style='font-size:24px;font-weight:bold;text-align:center;padding:1em'>[WIP] Article Creator</div><div class='templatedesktop' style='margin:0.5em;padding:0.5em;border-radius:initial;border-left:initial;border-right:initial;font-weight:bold;font-size:20px'>Inputs</div><div id='MSWikiArticleCreatorInputsSection'></div><div class='templatedesktop' style='margin:0.5em;padding:0.5em;border-radius:initial;border-left:initial;border-right:initial;font-weight:bold;font-size:20px'>Output</div><div><button id='MSWikiArticleCreatorCalculateButton'>Calculate</button> (<abbr title='This automatically updates the output upon adjusting any of the inputs.'>auto</abbr>: <input id='MSWikiArticleCreatorAutoCalculateCheckbox' type='checkbox'/>)</div><p><p id='MSWikiArticleCreatorComputingText' style='display:none'><i>Computing...</i></p><div id='MSWikiArticleCreatorResultsSection'>Insert output here.</div></div></div>";

        // Variable declarations.
        var autoCalculateStatus; // Determines whether automatic calculation of the HTML output is enabled or disabled.
        var decimals = 3; // Determines the maximum and fixed number of decimal digits for number output strings.
        var result; // Used for functions to avoid multiple return statements.
        var extraZeroes; // Used to determine the powers of 10 for scientific to suffix notation conversion, particularly for the functions 'toScientific' and 'notateInt'.

        function updateAutoCalculateStatus() {
            if (window.localStorage.MSWikiArticleCreatorAutoCalculateStatus === 'true') {
                autoCalculateStatus = true;
            } else {
                autoCalculateStatus = false;
            }
            document.getElementById('MSWikiArticleCreatorAutoCalculateCheckbox').checked = autoCalculateStatus;
        }
        updateAutoCalculateStatus();

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

        // Update the inputs.
        function addInputs() {
            // Primary inputs.
            var output = "<p style='font-weight:bold;font-size:20px'>-- Primary --</p>";
            output += "<p>Game: <input id='MSWikiArticleCreatorGameInput' class='slider' type='range' value='0' min='0' max='1'/><br><small>Selected: <span id='MSWikiArticleCreatorGameOutput'>?</span></small></p><p>Type of article: <input id='MSWikiArticleCreatorArticleTypeInput' class='slider' type='range' value='0' min='0' max='5'/><br><small>Selected: <span id='MSWikiArticleCreatorArticleTypeOutput'>?</span></small></p><p>Tense: <input id='MSWikiArticleCreatorTenseInput' class='slider' type='range' value='1' min='0' max='2'/><br><small>Selected: <span id='MSWikiArticleCreatorTenseOutput'>?</span></small></p><table class='templatedesktop' style='margin:auto;border:initial;'><th>Article title</th><th>Display title (default: <span><</span>none<span>></span>)</th><tr/><td><textarea id='MSWikiArticleCreatorArticleTitleInput'></textarea></td><td><center><textarea id='MSWikiArticleCreatorArticleDisplayTitleInput'></textarea></center></td></table>";

            // [Article Specific Inputs] Pet Articles.
            output += "<div id='MSWikiArticleCreatorArticleTypePetInputSection'><p style='font-weight:bold;font-size:20px'>-- Article Type Specific: Pet --</p>";
            output += "<table class='templatedesktop' style='margin:auto;border:initial;'><th>Rarity</th><th>Obtainment Source</th><tr/><td valign='top' style='width:50%'><center><input id='MSWikiArticleCreatorPetRarityInput' class='slider' type='range' value='0' min='0' max='0'/><br><small>Selected: <span id='MSWikiArticleCreatorPetRarityOutput'>?</span></small></center></td><td><center><input id='MSWikiArticleCreatorPetObtainmentSourceInput' class='slider' type='range' value='0' min='0' max='1'/><br><small>Selected: <span id='MSWikiArticleCreatorPetObtainmentSourceOutput'>?</span></small><p id='MSWikiArticleCreatorPetEggSourceSection'></p><p id='MSWikiArticleCreatorPetQuestSourceSection'></p></center></td></table></div>";

            // [Article Specific Inputs] World Articles.


            // [Article Specific Inputs] Egg Articles.


            // [Article Specific Inputs] Backpack Articles.


            // [Article Specific Inputs] Tool Articles.


            // [Article Specific Inputs] Ore Articles.


            // Miscellaneous inputs.
            output += "<p style='font-weight:bold;font-size:20px'>-- Miscellaneous --</p>";
            output += "<table class='templatedesktop' style='margin:auto;border:initial;'><th>Mark for Improvement? <input id='MSWikiArticleCreatorImprovementCheck' type='checkbox'/></th><th id='MSWikiArticleCreatorImprovementReasonTableColumn' style='display:none'>Improvement reason (optional)</th><tr/><td><center></center></td><td id='MSWikiArticleCreatorImprovementReasonTableCell' style='display:none'><center><textarea id='MSWikiArticleCreatorImprovementReasonInput'></textarea></center></td></table>";

            // Apply the output.
            document.getElementById('MSWikiArticleCreatorInputsSection').innerHTML = output;
            document.getElementById('MSWikiArticleCreatorPetEggSourceSection').innerHTML = "<span id='MSWikiArticleCreatorPetEggSourceSubsectionToggle' style='display:none'><span><</span>Click to toggle list visibility<span>></span></span><div id='MSWikiArticleCreatorPetEggSourceSubsection' style='display:none'></div>";
            document.getElementById('MSWikiArticleCreatorPetEggSourceSubsectionToggle').addEventListener('click', function() {
                if (document.getElementById('MSWikiArticleCreatorPetEggSourceSubsection').getAttribute('style') === 'display:none') {
                    document.getElementById('MSWikiArticleCreatorPetEggSourceSubsection').setAttribute('style', '');
                } else {
                    document.getElementById('MSWikiArticleCreatorPetEggSourceSubsection').setAttribute('style', 'display:none');
                }
            });
        }
        addInputs();

        // Constructor for holding inputted data.
        function InputDataHolder(game, articleType, articleTitle, displayTitle, petRarity, obtainmentSource, eggSource, selectedEggs, tense, plural, markImprove, improveReason) {
            // Primary.
            this.game = game;
            this.type = articleType;
            this.tense = tense;
            this.plural = plural; // Currently unused.
            this.title = articleTitle;
            this.dTitle = displayTitle;

            // Pet Articles.
            this.rarity = petRarity;
            this.source = obtainmentSource;
            this.egg = eggSource;
            this.selectedEggs = selectedEggs;

            // Miscellaneous.
            this.improve = markImprove;
            this.improveR = improveReason;
        }

        const inputData = new InputDataHolder();

        function updateComputingText() {
            document.getElementById('MSWikiArticleCreatorComputingText').setAttribute('style', '');
            document.getElementById('MSWikiArticleCreatorResultsSection').setAttribute('style', 'display:none');
            setTimeout(function() {
                updateResult();
                document.getElementById('MSWikiArticleCreatorComputingText').setAttribute('style', 'display:none');
                document.getElementById('MSWikiArticleCreatorResultsSection').setAttribute('style', '');
            }, 1);
        }

        function autoCalculateCheck() {
            if (autoCalculateStatus === true) {
                if (document.getElementById('MSWikiArticleCreatorArticleTitleInput').value.length + document.getElementById('MSWikiArticleCreatorArticleDisplayTitleInput').value.length + document.getElementById('MSWikiArticleCreatorImprovementReasonInput').value.length >= 1e4) {
                    updateComputingText();
                } else {
                    updateResult();
                }
            }
        }

        function updateArticleType() {
            document.getElementById('MSWikiArticleCreatorArticleTypePetInputSection').setAttribute('style', 'display:none');
            switch (Number(document.getElementById('MSWikiArticleCreatorArticleTypeInput').value)) {
                case 0:
                    inputData.type = 'Pet Article';
                    document.getElementById('MSWikiArticleCreatorArticleTypePetInputSection').setAttribute('style', '');
                    break;
                case 1:
                    inputData.type = 'World Article';
                    break;
                case 2:
                    inputData.type = 'Egg Article';
                    break;
                case 3:
                    inputData.type = 'Backpack Article';
                    break;
                case 4:
                    inputData.type = 'Tool Article';
                    break;
                case 5:
                    inputData.type = 'Ore Article';
            }
            document.getElementById('MSWikiArticleCreatorArticleTypeOutput').innerHTML = inputData.type;
        }

        function updateTense() {
            switch (Number(document.getElementById('MSWikiArticleCreatorTenseInput').value)) {
                case 0:
                    inputData.tense = 'Past';
                    break;
                case 1:
                    inputData.tense = 'Present';
                    break;
                case 2:
                    inputData.tense = 'Future';
            }
            document.getElementById('MSWikiArticleCreatorTenseOutput').innerHTML = inputData.tense;
        }

        function updateGame() {
            switch (Number(document.getElementById('MSWikiArticleCreatorGameInput').value)) {
                case 0:
                    inputData.game = 'MS1';
                    document.getElementById('MSWikiArticleCreatorPetRarityInput').max = 4;
                    document.getElementById('MSWikiArticleCreatorPetRarityInput').value = Math.min(document.getElementById('MSWikiArticleCreatorPetRarityInput').value, document.getElementById('MSWikiArticleCreatorPetRarityInput').max);
                    break;
                case 1:
                    inputData.game = 'MS2';
                    document.getElementById('MSWikiArticleCreatorPetRarityInput').max = 7;
                    if (document.getElementById('MSWikiArticleCreatorPetRarityInput').value == 4) {
                        document.getElementById('MSWikiArticleCreatorPetRarityInput').value = 7;
                    }
            }
            updateRarity();
            document.getElementById('MSWikiArticleCreatorGameOutput').innerHTML = inputData.game;
        }

        function updateRarity() {
            switch (Number(document.getElementById('MSWikiArticleCreatorPetRarityInput').value)) {
                case 0:
                    switch (inputData.game) {
                        case 'MS1':
                            inputData.rarity = 'Common';
                            break;
                        case 'MS2':
                            inputData.rarity = 'Mystery';
                    }
                    break;
                case 1:
                    switch (inputData.game) {
                        case 'MS1':
                            inputData.rarity = 'Rare';
                            break;
                        case 'MS2':
                            inputData.rarity = 'Common';
                    }
                    break;
                case 2:
                    switch (inputData.game) {
                        case 'MS1':
                            inputData.rarity = 'Epic';
                            break;
                        case 'MS2':
                            inputData.rarity = 'Unique';
                    }
                    break;
                case 3:
                    switch (inputData.game) {
                        case 'MS1':
                            inputData.rarity = 'Legendary';
                            break;
                        case 'MS2':
                            inputData.rarity = 'Rare';
                    }
                    break;
                case 4:
                    switch (inputData.game) {
                        case 'MS1':
                            inputData.rarity = 'Mythical';
                            break;
                        case 'MS2':
                            inputData.rarity = 'Epic';
                    }
                    break;
                case 5:
                    inputData.rarity = 'Legendary';
                    break;
                case 6:
                    inputData.rarity = 'Secret';
                    break;
                case 7:
                    inputData.rarity = 'ANCIENT';
            }
            document.getElementById('MSWikiArticleCreatorPetRarityOutput').innerHTML = getRarityStyling(inputData.rarity);
        }

        function updateObtainmentSource() {
            var output = '';
            document.getElementById('MSWikiArticleCreatorPetEggSourceSubsectionToggle').setAttribute('style', 'display:none');
            switch (Number(document.getElementById('MSWikiArticleCreatorPetObtainmentSourceInput').value)) {
                case 0:
                    inputData.source = 'Egg';
                    document.getElementById('MSWikiArticleCreatorPetEggSourceSubsectionToggle').setAttribute('style', '');
                    switch (inputData.game) {
                        case 'MS1':
                            const eggsList = ['Common Egg', 'Unique Egg', 'Rare Egg', 'Epic Egg', 'Omega Egg', 'Legendary Egg', 'Mythical Egg', 'Spooky Egg', 'Haunted Egg', 'Shiny Common Egg', 'Jolly Egg', 'Crystal Egg', 'Christmas Egg'];
                            for (var x = 0; x < 13; x++) {
                                output += "<p><input id='MSWikiArticleCreatorPetEggSourceSubsectionCheckbox" + x + "' type='checkbox'/>" + " <span id='MSWikiArticleCreatorPetEggSourceSubsectionCheckbox" + x + "Text'>" + eggsList[x] + '</span></p>';
                            }
                            document.getElementById('MSWikiArticleCreatorPetEggSourceSubsection').innerHTML = output;
                            for (var x = 0; x < 13; x++) {
                                document.getElementById('MSWikiArticleCreatorPetEggSourceSubsectionCheckbox' + x).addEventListener('click', function() {
                                    updateEggSource();
                                    autoCalculateCheck();
                                });
                            }
                            break;
                        case 'MS2':

                    }
                    break;
                case 1:
                    inputData.source = 'Quest';
            }
            document.getElementById('MSWikiArticleCreatorPetObtainmentSourceOutput').innerHTML = inputData.source;
        }

        function updateEggSource() {
            var y;
            var z = 0;
            switch (inputData.game) {
                case 'MS1':
                    y = 13;
                    break;
                case 'MS2':
                    y = 0; // Placeholder.
            }
            inputData.selectedEggs = [];
            for (var x = 0; x < y; x++) {
                if (document.getElementById('MSWikiArticleCreatorPetEggSourceSubsection').getElementsByTagName('p')[x].getElementsByTagName('input')[0].checked === true) {
                    z++;
                    inputData.selectedEggs.push('[[' + document.getElementById('MSWikiArticleCreatorPetEggSourceSubsectionCheckbox' + x + 'Text').innerHTML + ']]');
                }
            }
            if (inputData.selectedEggs.length == 2) {
                inputData.selectedEggs = inputData.selectedEggs[0] + ' and ' + inputData.selectedEggs[1];
            } else if (inputData.selectedEggs.length > 2) {
                inputData.selectedEggs = inputData.selectedEggs.join(', ');
                inputData.selectedEggs = inputData.selectedEggs.replace(/, (?!.*, )/, ' and ');
            } else if (inputData.selectedEggs.length == 1) {
                inputData.selectedEggs = inputData.selectedEggs[0];
            } else {
                inputData.selectedEggs = '';
            }
            console.log(inputData.selectedEggs);
        }

        function getRarityStyling(x) {
            var output = '';
            switch (x) {
                case 'Mystery':
                    output = "<span style='font-weight:bold'>" + x + '</span>';
                    break;
                case 'Common':
                    output = "<span class='common'>" + x + '</span>';
                    break;
                case 'Unique':
                    output = "<span class='unique'>" + x + '</span>';
                    break;
                case 'Rare':
                    output = "<span class='rare'>" + x + '</span>';
                    break;
                case 'Epic':
                    output = "<span class='epic'>" + x + '</span>';
                    break;
                case 'Legendary':
                    output = "<span class='legendary'>" + x + '</span>';
                    break;
                case 'Mythical':
                    output = "<span class='mythical'>" + x + '</span>';
                    break;
                case 'Secret':
                    output = "<span class='legendary'>" + x + '</span>';
                    break;
                case 'ANCIENT':
                    output = "<span class='legendary-ms2'>" + x + '</span>';
            }
            return output;
        }

        // Update the HTML output.
        function updateResult() {
            console.log(inputData.rarity);

            var output = '';
            console.log('updateResult invoked!');
            inputData.title = document.getElementById('MSWikiArticleCreatorArticleTitleInput').value;
            inputData.dTitle = document.getElementById('MSWikiArticleCreatorArticleDisplayTitleInput').value;
            inputData.improve = document.getElementById('MSWikiArticleCreatorImprovementCheck').checked;
            inputData.improveR = document.getElementById('MSWikiArticleCreatorImprovementReasonInput').value;

            function getTense(time, word) {
                output = '';
                const wordsPast = ['was', 'could have been', 'obtained'];
                const wordsPresent = ['is', 'can be', 'obtained'];
                const wordsFuture = ['will be', 'will be', 'obtainable'];
                switch (time) {
                    case 'Past':
                        output = wordsPast[word];
                        break;
                    case 'Present':
                        output = wordsPresent[word];
                        break;
                    case 'Future':
                        output = wordsFuture[word];
                }
                return output;
            }

            function vowelDetect(x) {
                if (x.match(/[a-z]/i)[0].match(/[aeiou]/i) !== null && x !== 'Unique') {
                    output = 'an';
                } else {
                    output = 'a';
                }
                return output;
            }

            function getTitle(x) {
                var res2 = inputData.title;
                var out2 = '';
                if (inputData.dTitle !== '') {
                    out2 = '{{DISPLAYTITLE:' + inputData.dTitle + '}}\n';
                } else {
                    out2 = '';
                }
                if (inputData.title === '' && inputData.dTitle !== '') {
                    out2 = '';
                    res2 = inputData.dTitle;
                }
                switch (x) {
                    case 'title':
                        return res2;
                        break;
                    case 'display':
                        return out2;
                }
            }

            switch (inputData.type) {
                case 'Pet Article':
                    result = 'The ' + "'''" + getTitle('title') + "'''" + ' ' + getTense(inputData.tense, 0) + ' ' + vowelDetect(inputData.rarity) + ' ' + getRarityStyling(inputData.rarity) + ' Pet.';
                    switch (inputData.game) {
                        case 'MS1':
                            result = getTitle('display') + '{{Infobox-Pets}}\n' + result;
                            break;
                        case 'MS2':
                            result = getTitle('display') + '{{Infobox-Pets-(MS2)}}\n' + result;
                    }
                    switch (inputData.source) {
                        case 'Egg':
                            if (inputData.selectedEggs !== '') {
                                result += ' It ' + getTense(inputData.tense, 1) + ' ' + getTense(inputData.tense, 2) + ' from the ' + inputData.selectedEggs + '.';
                            }
                    }
                    break;
                default:
                    result = '';
            }
            output = '';
            if (inputData.improve === true) {
                output = '{{Improve}}\n';
                if (inputData.improveR !== '') {
                    output = '{{Improve|' + inputData.improveR + '}}\n';
                }
            }
            result = output + result;
            if (result.length > 2 ** 21) {
                document.getElementById('MSWikiArticleCreatorResultsSection').innerHTML = "<span class='rainbow' style='font-weight:bold'>Error: String exceeds Fandom's page byte limit.";
            } else {
                document.getElementById('MSWikiArticleCreatorResultsSection').innerHTML = "<textarea style='width:85%;height:15%;background:#2D2D2D;color:#FFF'>" + result + '</textarea>';
            }
        }
        updateGame();
        updateArticleType();
        updateTense();
        updateRarity();
        updateObtainmentSource();
        updateEggSource();
        updateResult();

        // Add event listeners.
        document.getElementById('MSWikiArticleCreatorGameInput').addEventListener('input', function() {
            updateGame();
            autoCalculateCheck();
        });
        document.getElementById('MSWikiArticleCreatorArticleTypeInput').addEventListener('input', function() {
            updateArticleType();
            autoCalculateCheck();
        });
        document.getElementById('MSWikiArticleCreatorTenseInput').addEventListener('input', function() {
            updateTense();
            autoCalculateCheck();
        });
        document.getElementById('MSWikiArticleCreatorArticleTitleInput').addEventListener('input', autoCalculateCheck);
        document.getElementById('MSWikiArticleCreatorArticleDisplayTitleInput').addEventListener('input', autoCalculateCheck);
        document.getElementById('MSWikiArticleCreatorPetRarityInput').addEventListener('input', function() {
            updateRarity();
            autoCalculateCheck();
        });

        document.getElementById('MSWikiArticleCreatorPetObtainmentSourceInput').addEventListener('input', function() {
            updateObtainmentSource();
            autoCalculateCheck();
        });

        document.getElementById('MSWikiArticleCreatorImprovementCheck').addEventListener('click', function() {
            if (document.getElementById('MSWikiArticleCreatorImprovementCheck').checked === false) {
                document.getElementById('MSWikiArticleCreatorImprovementReasonTableColumn').setAttribute('style', 'display:none');
                document.getElementById('MSWikiArticleCreatorImprovementReasonTableCell').setAttribute('style', 'display:none');
            } else {
                document.getElementById('MSWikiArticleCreatorImprovementReasonTableColumn').setAttribute('style', '');
                document.getElementById('MSWikiArticleCreatorImprovementReasonTableCell').setAttribute('style', '');
            }
            document.getElementById('MSWikiArticleCreatorImprovementReasonInput').value = '';
            autoCalculateCheck();
        });
        document.getElementById('MSWikiArticleCreatorImprovementReasonInput').addEventListener('input', autoCalculateCheck);

        document.getElementById('MSWikiArticleCreatorCalculateButton').addEventListener('click', updateComputingText);

        document.getElementById('MSWikiArticleCreatorAutoCalculateCheckbox').addEventListener('click', function() {
            if (autoCalculateStatus === false) {
                autoCalculateStatus = true;
                updateResult();
            } else {
                autoCalculateStatus = false;
            }
            window.localStorage.MSWikiArticleCreatorAutoCalculateStatus = autoCalculateStatus;
            updateAutoCalculateStatus();
        });

    } else {
        console.log('[Article Creator] [LOG] Failed to locate ID or tool already exists. Cancelling script.');
    }
}
addMSWikiArticleCreator();