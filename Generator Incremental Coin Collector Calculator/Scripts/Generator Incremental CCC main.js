// "Generator Incremental Coin Collector Calculator" by TheSeal27
(function() {
    function calcCoinCollectors(currentTokens = 1, calcMode, outputMode) {
        var tokens = currentTokens;
        var currentGain = 0;
        var nextGain = 1;
        var efficiency = 1;
        const names = ['Penny', 'Dime', 'Dollar', 'Gold bar'];
        const collectorAmounts = [0, 0, 0, 0];
        const collectorAmountsTemp = [collectorAmounts[0], collectorAmounts[1], collectorAmounts[2], collectorAmounts[3]];
        const collectorCosts = [1, 3, 6, 15];

        function sumGain(array) {
            var fourth = array[3] + 1;
            var third = fourth * (array[2]) + 1;
            var second = third * (array[1]) + 1;
            return array[0] * second;
        }

        function calcNextGain(thearray, collector) {
            thearray[collector] += 1;
            var test = sumGain(collectorAmountsTemp);
            thearray[collector] -= 1;
            return test;
        }

        function nextMostCostEff() {
            const tokenDiv = [0, 0, 0, 0];
            const gainDiv = [0, 0, 0, 0];
            var limit = 4;
            var result;


            var currentGains = sumGain(collectorAmounts);
            var nextGains = [calcNextGain(collectorAmountsTemp, 0), calcNextGain(collectorAmountsTemp, 1), calcNextGain(collectorAmountsTemp, 2), calcNextGain(collectorAmountsTemp, 3)];

            for (var x = 0; x < 4; x++) {
                gainDiv[x] += nextGains[x] / currentGains;
            }
            for (var x = 0; x < 4; x++) {
                tokenDiv[x] += (nextGains[x] - currentGains) / collectorCosts[x];
            }

            var the1;
			switch (calcMode) {
				case 1:
				if (currentTokens >= 15) {
					const arr = [tokenDiv[0], tokenDiv[1], tokenDiv[2], tokenDiv[3]];
					var arr_result = Math.min.apply(null, arr.filter(Boolean));
					if (arr_result === Infinity) {
						arr_result = 0;
					}
					the1 = tokenDiv.indexOf(arr_result);
				} else if (currentTokens >= 6) {
					const arr = [tokenDiv[0], tokenDiv[1], tokenDiv[2]];
					var arr_result = Math.min.apply(null, arr.filter(Boolean));
					if (arr_result === Infinity) {
						arr_result = 0;
					}
					the1 = tokenDiv.indexOf(arr_result);
				} else if (currentTokens >= 3) {
					const arr = [tokenDiv[0], tokenDiv[1]];
					var arr_result = Math.min.apply(null, arr.filter(Boolean));
					if (arr_result === Infinity) {
						arr_result = 0;
					}
					the1 = tokenDiv.indexOf(arr_result);
				} else {
					the1 = 0;
				}
				break;
				default:
				if (currentTokens >= 15) {
					the1 = tokenDiv.indexOf(Math.max(tokenDiv[0], tokenDiv[1], tokenDiv[2], tokenDiv[3]));
				} else if (currentTokens >= 6) {
					the1 = tokenDiv.indexOf(Math.max(tokenDiv[0], tokenDiv[1], tokenDiv[2]));
				} else if (currentTokens >= 3) {
					the1 = tokenDiv.indexOf(Math.max(tokenDiv[0], tokenDiv[1]));
				} else {
					the1 = 0;
				}
			}
			
            return the1;
			
            currentTokens -= collectorCosts[tokenDiv.indexOf(the1)];
            collectorAmounts[tokenDiv.indexOf(the1)] += 1;
            collectorAmountsTemp[tokenDiv.indexOf(the1)] += 1;

            for (var x = 0; x < 4; x++) {
                collectorAmountsTemp[x] = collectorAmounts[x];
            }
        }

        while (currentTokens > 0) {
            var mostEffCollector = nextMostCostEff();
            console.log('from function: ' + mostEffCollector);
            collectorAmounts[mostEffCollector] += 1;
            collectorAmountsTemp[mostEffCollector] = collectorAmounts[mostEffCollector];
            currentTokens -= collectorCosts[mostEffCollector];
        }
		switch (calcMode) {
			case 1:
			switch (outputMode) {
				case 'ResultsOnly':
					return [[collectorAmounts[0], collectorAmounts[1], collectorAmounts[2], collectorAmounts[3]], sumGain(collectorAmounts)];
					break;
				case 'HTMLString':
					return "The least token:money efficient collector combination when spending <b>" + tokens.toLocaleString() + checkPlural(tokens, ' token', ' tokens') + "</b> is the following:<br>- " + collectorAmounts[0].toLocaleString() + "x Penny<br>- " + collectorAmounts[1].toLocaleString() + "x Dime<br>- " + collectorAmounts[2].toLocaleString() + "x Dollar<br>- " + collectorAmounts[3].toLocaleString() + "x Gold bar<br>This will produce $" + sumGain(collectorAmounts).toLocaleString() + "/s.";
					break;
				default:
					return "[Generator Incremental: Coin Collector Calculator] The least token:money efficient collector combination when spending " + tokens.toLocaleString() + checkPlural(tokens, ' token', ' tokens') + " is the following: " + collectorAmounts[0].toLocaleString() + "x Penny, " + collectorAmounts[1].toLocaleString() + "x Dime, " + collectorAmounts[2].toLocaleString() + "x Dollar and " + collectorAmounts[3].toLocaleString() + "x Gold bar. This will produce $" + sumGain(collectorAmounts).toLocaleString() + "/s.";
			}
				break;
			default:
			switch (outputMode) {
				case 'ResultsOnly':
					return [[collectorAmounts[0], collectorAmounts[1], collectorAmounts[2], collectorAmounts[3]], sumGain(collectorAmounts)];
					break;
				case 'HTMLString':
					return "The most token:money efficient collector combination when spending <b>" + tokens.toLocaleString() + checkPlural(tokens, ' token', ' tokens') + "</b> is the following:<br>- " + collectorAmounts[0].toLocaleString() + "x Penny<br>- " + collectorAmounts[1].toLocaleString() + "x Dime<br>- " + collectorAmounts[2].toLocaleString() + "x Dollar<br>- " + collectorAmounts[3].toLocaleString() + "x Gold bar<br>This will produce $" + sumGain(collectorAmounts).toLocaleString() + "/s.";
					break;
				default:
					return "[Generator Incremental: Coin Collector Calculator] The most token:money efficient collector combination when spending " + tokens.toLocaleString() + checkPlural(tokens, ' token', ' tokens') + " is the following: " + collectorAmounts[0].toLocaleString() + "x Penny, " + collectorAmounts[1].toLocaleString() + "x Dime, " + collectorAmounts[2].toLocaleString() + "x Dollar and " + collectorAmounts[3].toLocaleString() + "x Gold bar. This will produce $" + sumGain(collectorAmounts).toLocaleString() + "/s.";
			}
		}
        console.log(collectorAmountsTemp);
    }
	
	var tool_baseHTML = "<div style='background:rgba(212,118,51, var(--bg-alpha));text-align:center;width:80%;margin:auto;padding:1em'><div class='StandardText' style='font-size:100%'><span style='font-size:200%'>Generator Incremental Coin Collector Calculator</span><p>A tool for the Roblox game <a href='https://www.roblox.com/games/16111537752'>Generator Incremental!</a>'s Generator -13 feature<br>Tool created by TheSeal27</p></div><br>";
	tool_baseHTML += "<p>Tokens: <input type='number' style='width:5em' id='GeneratorIncrementalCoinCollectorCalculator_TokenInput'></input></p>";
	tool_baseHTML += "<p>Mode: <input type='range' min='0' max='1' value='0' class='slider' style='width:8em' id='GeneratorIncrementalCoinCollectorCalculator_ModeInput'></input><br><span style='font-size:80%'>Selected: <code><span id='GeneratorIncrementalCoinCollectorCalculator_ModeInput_Result'>Most Efficient</span></code></span></p>";
	tool_baseHTML += "<p><div><div style='width:5em;height:1.3em;margin:auto'><button id='GeneratorIncrementalCoinCollectorCalculator_CalculateButton'>Calculate</button></div><span style='font-size:75%'>(Important: Token numbers in the tens of thousands will take significantly longer to calculate, depending on available browser resources. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with a lower amount of tokens. Also, this tool displays the most or least efficient token usage only for the amount of tokens defined, which may possibly be less than a lower number of tokens.)</span></div></p>";
	tool_baseHTML += "<p><hr/><div id='GeneratorIncrementalCoinCollectorCalculator_OutputResults'>" + calcCoinCollectors(0, 0, 'HTMLString') + "</div></p>";
	tool_baseHTML += "</div>";
	document.getElementById('GeneratorIncrementalCoinCollectorCalculator').innerHTML = tool_baseHTML;
	const elem_tokenInput = document.getElementById('GeneratorIncrementalCoinCollectorCalculator_TokenInput');
	const elem_modeInput = document.getElementById('GeneratorIncrementalCoinCollectorCalculator_ModeInput');
	const elem_modeInputResult = document.getElementById('GeneratorIncrementalCoinCollectorCalculator_ModeInput_Result');
	const elem_calculateButton = document.getElementById('GeneratorIncrementalCoinCollectorCalculator_CalculateButton');
	const elem_outputResults = document.getElementById('GeneratorIncrementalCoinCollectorCalculator_OutputResults');
	elem_modeInput.addEventListener('input', function() {
		elem_modeInputResult.innerHTML = ['Most Efficient', 'Least Efficient'][Number(elem_modeInput.value)];
	});
	elem_calculateButton.addEventListener('click', function() {
		var tokensInputValue = Number(elem_tokenInput.value);
		if (tokensInputValue < 0 || isNaN(tokensInputValue) || tokensInputValue == Infinity || tokensInputValue == -Infinity) {
			tokensInputValue = 0;
		} else {
			tokensInputValue = Math.floor(tokensInputValue);
		}
		console.log(tokensInputValue);
		elem_outputResults.innerHTML = calcCoinCollectors(tokensInputValue, Number(elem_modeInput.value), 'HTMLString');
	});
}());