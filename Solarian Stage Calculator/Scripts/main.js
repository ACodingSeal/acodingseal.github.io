function addSolarianStageCalculator() {
	if (document.getElementById("SolarianStageCalculator") !== null && document.getElementById("SolarianStageCalculatorContainer") === null) {
	console.log("[Solarian Stage Calculator] [LOG] ID located. Running script.");
	document.getElementById("SolarianStageCalculator").innerHTML = "<div id='SolarianStageCalculatorContainer' class='templatedesktop' style='color:#FFF;padding:1em;background:#2F0075;width:80%;margin:auto'><div class='templatedesktop' style='border-radius:initial;background:initial;width:10%;padding:0.5em;margin-top:0.5em'>Toggle Suffixes<button id='SSCSuffixToggleButton' style='background:#FF0000'>Disabled</button></div><div style='text-align:center;font-size:24px'><img src='https://acodingseal.github.io/Solarian Stage Calculator/Assets/Sword.png' width='100'/> Solarian Stage Calculator <img src='https://acodingseal.github.io/Solarian Stage Calculator/Assets/Shield.png' width='100'/><br><div style='font-size:initial'><p>Stage: <input id='CurrentStageInput' style='width:5%'/></p><p>Solarian Challenge: <input id='ChallengeInput' class='slider' type='range' value='0' min='0' max='2'/></p><p style='font-size:14px'>Selected challenge: <span id='SelectedChallengeText'/></p></div></div><table style='margin:auto;color:#FFF'><tr><td><b>Your offence:</b> <input id='PlayerOffenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy offence:</b> <span id='EnemyOffenceOutput'/></td></tr><tr><td><b>Your defence:</b> <input id='PlayerDefenceInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy defence:</b> <span id='EnemyDefenceOutput'/></td></tr><tr><td><b>Your maximum health (100x defence):</b> <span id='PlayerMaximumHealthOutput'/></td><td style='text-align:right'><b>Enemy maximum health (100x defence):</b> <span id='EnemyMaximumHealthOutput'/></td></tr><tr><td><b>Your current health (optional, default 100% of max health):</b> <input id='PlayerCurrentHealthInput' style='width:10%'/></td><td style='text-align:right'><b>Enemy current health (optional, default 100% of max health):</b> <input id='EnemyCurrentHealthInput' style='width:10%'/></td></tr></table><div style='margin-top:1em;text-align:center'><button id='SSCCalculateButton'>Calculate</button></div><br><div class='templatedesktop' style='background:initial;border-left:0;border-right:0;border-bottom:0;padding:0.5em;border-radius:initial;text-align:center'><div style='font-size:20px;font-weight:bold'>Result</div><br>At Stage <span id='CurrentStageOutput'>?</span>, the requirements to complete the stage, when currently <span id='CurrentHealthOutput'>?</span>% of maximum health, are:<br><br><img src='https://acodingseal.github.io/Solarian Stage Calculator/Assets/Sword.png' width='50'/> Offence: <span id='PlayerOffenceReqOutput'>?</span><br><img src='https://acodingseal.github.io/Solarian Stage Calculator/Assets/Shield.png' width='50'/> Defence: <span id='PlayerDefenceReqOutput'>?</span><br><p>Your Stage Bonuses will also become:<br><br>Sunrise FM: <span id='StageBonusSunriseFMCurrentOutput'>?</span>x > <span id='StageBonusSunriseFMNextOutput'>?</span>x<br>Solar Rays: <span id='StageBonusSolarRaysCurrentOutput'>?</span>x > <span id='StageBonusSolarRaysNextOutput'>?</span>x<br>Sunstone: <span id='StageBonusSunstoneCurrentOutput'>?</span>x > <span id='StageBonusSunstoneNextOutput'>?</span>x<br>Solar Shards: <span id='StageBonusSolarShardsCurrentOutput'>?</span>x > <span id='StageBonusSolarShardsNextOutput'>?</span>x<br>Souls (hidden bonus): <span id='StageBonusSoulsCurrentOutput'>?</span>x > <span id='StageBonusSoulsNextOutput'>?</span>x</p></div></div>";
	
	var playerOffence = new Decimal(1);
	var playerDefence = new Decimal(0);
	var playerMaxHealth = new Decimal(100);
	var playerCurrentHealth = new Decimal(100);
	var enemyOffence = new Decimal(10);
	var enemyDefence = new Decimal(10);
	var enemyMaxHealth = new Decimal(3e3);
	var enemyCurrentHealth = new Decimal(3e3);
	var currentStage = new Decimal(1);
	var challenge = false;
	var enemyStatScaling = new Decimal(10);
	var enemyHealthScaling = new Decimal(10.3);
	var result;
	var suffixStatus = false;
	const suffixes = ["", "", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "DDc", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "UVg", "DVg", "TVg", "QaVg", "QtVg", "SxVg", "SpVg", "OVg", "NVg", "Tg", "UTg", "DTg", "TTg", "QaTg", "QtTg", "SxTg", "SpTg", "OTg", "NTg", "Qd", "UQd", "DQd", "TQd", "QaQd", "QtQd", "SxQd", "SpQd", "OQd", "NQd", "Qi", "UQi", "DQi", "TQi", "QaQi", "QtQi", "SxQi", "SpQi", "OQi", "NQi", "He", "UHe", "DHe", "THe", "QaHe", "QtHe", "SxHe", "SpHe", "OHe", "NHe", "St", "USt", "DSt", "TSt", "QaSt", "QtSt", "SxSt", "SpSt", "OSt", "NSt", "Og", "UOg", "DOg", "TOg", "QaOg", "QtOg", "SxOg", "SpOg", "OOg", "NOg", "Nn", "UNn", "DNn", "TNn", "QaNn", "QtNn", "SxNn", "SpNn", "ONn", "NNn"];
	const suffixesLC = ["", "", "m", "b", "t", "qa", "qt", "sx", "sp", "oc", "no", "dc", "ud", "ddc", "td", "qad", "qid", "sxd", "spd", "ocd", "nod", "vg", "uvg", "dvg", "tvg", "qavg", "qtvg", "sxvg", "spvg", "ovg", "nvg", "tg", "utg", "dtg", "ttg", "qatg", "qttg", "sxtg", "sptg", "otg", "ntg", "qd", "uqd", "dqd", "tqd", "qaqd", "qtqd", "sxqd", "spqd", "oqd", "nqd", "qi", "uqi", "dqi", "tqi", "qaqi", "qtqi", "sxqi", "spqi", "oqi", "nqi", "he", "uhe", "dhe", "the", "qahe", "qthe", "sxhe", "sphe", "ohe", "nhe", "st", "ust", "dst", "tst", "qast", "qtst", "sxst", "spst", "ost", "nst", "og", "uog", "dog", "tog", "qaog", "qtog", "sxog", "spog", "oog", "nog", "nn", "unn", "dnn", "tnn", "qann", "qtnn", "sxnn", "spnn", "onn", "nnn"];
	function notateInt(e) {
		var extraZeroes;
		if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
			result = Number(e).toLocaleString();
			} else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(1e303) && suffixStatus === true) {
				switch(((e.exponent / 3) - Math.floor(e.exponent / 3)).toFixed(1)) {
					case "0.0":
					extraZeroes = 0;
					break;
					case "0.3":
					extraZeroes = 1;
					break;
					case "0.7":
					extraZeroes = 2;
					}
					result = (e.mantissa * (10 ** extraZeroes)).toFixed(3) + "" + suffixes[Math.floor(e.exponent / 3)];
			} else if (e.greaterThanOrEqualTo(1e6) && e.lessThan(1e21)) {
				result = Number(e).toExponential(3).replace(/[+]/g, "");
				} else {
					result = e.toStringWithDecimalPlaces(3);
					}
					return result;
	}
	function updateChallenge() {
		switch(document.getElementById("ChallengeInput").value) {
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
	function decimalMinMax(e, x) {
		var e = new Decimal(e);
		var x = new Decimal(x);
		if (e.greaterThanOrEqualTo(x)) {
			result = e;
		} else {
			result = x;
		}
		return result;
	}
	function updateResults() {
		updateChallenge();
		if (document.getElementById("CurrentStageInput").value === '' || new Decimal(document.getElementById("CurrentStageInput").value).lessThan(1)) {
			currentStage = new Decimal(1);
		} else {
			currentStage = new Decimal(document.getElementById("CurrentStageInput").value);
		}
		enemyMaxHealth = new Decimal(3e3).times(enemyHealthScaling.pow(currentStage.sub(1)));
		if (document.getElementById("PlayerOffenceInput").value === '' || new Decimal(document.getElementById("PlayerOffenceInput").value).lessThan(0)) {
			playerOffence = new Decimal(1);
		} else {
			playerOffence = new Decimal(document.getElementById("PlayerOffenceInput").value);
		}
		if (document.getElementById("PlayerDefenceInput").value === '' || new Decimal(document.getElementById("PlayerDefenceInput").value).lessThan(0)) {
			playerDefence = new Decimal(0);
			playerMaxHealth = new Decimal(0);
		} else {
			playerDefence = new Decimal(document.getElementById("PlayerDefenceInput").value);
			playerMaxHealth = playerDefence.times(100);
		}
		if (document.getElementById("PlayerCurrentHealthInput").value === '' || new Decimal(document.getElementById("PlayerCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("PlayerCurrentHealthInput").value).greaterThan(playerMaxHealth)) {
			playerCurrentHealth = playerMaxHealth;
		} else {
			playerCurrentHealth = new Decimal(document.getElementById("PlayerCurrentHealthInput").value);
		}
		if (document.getElementById("EnemyCurrentHealthInput").value === '' || new Decimal(document.getElementById("EnemyCurrentHealthInput").value).lessThan(0) || new Decimal(document.getElementById("EnemyCurrentHealthInput").value).greaterThan(enemyMaxHealth)) {
			enemyCurrentHealth = enemyMaxHealth;
		} else {
			enemyCurrentHealth = new Decimal(document.getElementById("EnemyCurrentHealthInput").value);
		}
		enemyOffence = new Decimal(10).times(enemyStatScaling.pow(currentStage.sub(1)));
		enemyDefence = new Decimal(10).times(enemyStatScaling.pow(currentStage.sub(1)));
		
		function soulBonusCalc(e) {
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
		
		function calcMaxHits() {
			var playerMaxHits = playerCurrentHealth.add(playerDefence).sub(enemyOffence);
			var enemyMaxHits = enemyCurrentHealth.add(enemyDefence).sub(playerOffence);
			if (playerMaxHits.greaterThan(enemyMaxHits)) {
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(enemyDefence) + "</span>";
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(enemyOffence) + "</span>";
			} else if (enemyMaxHits.greaterThan(playerMaxHits)) {
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(enemyDefence) + "</span>";
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#00FF00'>" + notateInt(enemyOffence) + "</span>";
			} else {
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyDefence) + "</span>";
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyOffence) + "</span>";
			}
			if (enemyOffence.greaterThanOrEqualTo(playerCurrentHealth.add(playerDefence))) {
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyOffence) + "</span>";
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyDefence) + "</span>";
			} else if (enemyOffence.lessThan(playerDefence)) {
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(enemyOffence) + "</span>";
			} else {
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyOffence) + "</span>";
			}
			if (enemyDefence.greaterThan(playerOffence)) {
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FF00FF'>" + notateInt(enemyDefence) + "</span>";
			} else if (playerOffence.greaterThanOrEqualTo(enemyCurrentHealth.add(enemyDefence))) {
				document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(enemyOffence) + "</span>";
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FF0000'>" + notateInt(enemyDefence) + "</span>";
			} else {
				document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyDefence) + "</span>";
			}
		}
		document.getElementById("PlayerMaximumHealthOutput").innerHTML = notateInt(playerMaxHealth);
		document.getElementById("EnemyMaximumHealthOutput").innerHTML = notateInt(enemyMaxHealth);
		document.getElementById("EnemyOffenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyOffence) + "</span>";
		document.getElementById("EnemyDefenceOutput").innerHTML = "<span style='color:#FFFF00'>" + notateInt(enemyDefence) + "</span>";
		calcMaxHits();
		
		document.getElementById("StageBonusSunriseFMCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage.sub(1)));
		document.getElementById("StageBonusSunriseFMNextOutput").innerHTML = notateInt(new Decimal(3).pow(currentStage));
		document.getElementById("StageBonusSolarRaysCurrentOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage.sub(1)));
		document.getElementById("StageBonusSolarRaysNextOutput").innerHTML = notateInt(new Decimal(4).pow(currentStage));
		document.getElementById("StageBonusSunstoneCurrentOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage.sub(1)));
		document.getElementById("StageBonusSunstoneNextOutput").innerHTML = notateInt(new Decimal(2).pow(currentStage));
		document.getElementById("StageBonusSolarShardsCurrentOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMinMax(0, currentStage.sub(9))));
		document.getElementById("StageBonusSolarShardsNextOutput").innerHTML = notateInt(new Decimal(3).pow(decimalMinMax(0, currentStage.sub(8))));
		document.getElementById("StageBonusSoulsCurrentOutput").innerHTML = notateInt(soulBonusCalc(currentStage));
		document.getElementById("StageBonusSoulsNextOutput").innerHTML = notateInt(soulBonusCalc(currentStage.add(1)));
		document.getElementById("CurrentStageOutput").innerHTML = notateInt(currentStage);
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