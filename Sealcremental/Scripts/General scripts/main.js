// Ideas:
// (a) Optimise the code to allow for much better maintainability.
// (b) More Prestige Upgrades.
// (c) New layers: Numberification/Sealification, Penance, Sacrifice, Interstellar, Universal, Supernova, Event Horizon, Quantum, Science, The Core, The Multiverse.
// (d) Updating the number more frequently to see it satisfyingly go up more often, despite not actually having a difference.
// (e) Balance pre-first Prestige to be less reliant on an autoclicker.
// (f) Permanent multipliers should be earnt rather than given for free. They should also affect all previous layers' currencies, likely with different multipliers for each one.

// Append nodes.
document.getElementById("MainBody").appendChild(statisticsContainer);
mainSection.appendChild(sealAmountHeader);
mainSection.appendChild(sealButtonContainer);
mainSection.appendChild(sealUpgradesContainer);
mainSection.appendChild(prestigeUpgradesContainer);
mainSection.appendChild(prestigeSection);

// Increase and update the number.
function increaseNum() {
	num = num.add(new Decimal(1).times(totalMulti.times(permMulti)));
}
document.getElementById("SealButton").addEventListener("click", function() {
increaseNum();
updateNum();
updateStatistics("MainButtonClicks");
updateStatistics("TotalSeals");
});
function lowToExponential(e) {
if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e21)) {
	result = Number(e).toExponential(3).replace(/[+]/g, "");
} else {
	result = e.toStringWithDecimalPlaces(3);
}
return result;
}
function updateNum() {
document.getElementById("SealAmount").innerHTML = lowToExponential(num);
num = new Decimal(num);
if (prestigesDone.greaterThan(0)) {
document.getElementById("PrestigePoints").innerHTML = lowToExponential(prestigepoints);
prestigepoints = new Decimal(prestigepoints);
}
}
updateNum();
// var increaseInterval = setInterval(increaseNum, 1000); // Auto click.
// var updateInterval = setInterval(updateNum, 1000);

// Upgrade buttons.
function updateUpgradeData() {
	prestigeUpgrade1Effect = prestigesDone.pow(0.5).times(prestigeUpgrade1Level);
	if (upgrade1Level.greaterThanOrEqualTo(9)) {
		upgrade1Cost = new Decimal(10).times(new Decimal(1.2).pow(9)).times(new Decimal(5).pow(upgrade1Level.sub(9)));
	} else {
		upgrade1Cost = new Decimal(10).times(new Decimal(1.2).pow(upgrade1Level));
	}
	
	if (upgrade2Level.greaterThanOrEqualTo(9)) {
		upgrade2Cost = new Decimal(250).times(new Decimal(1.4).pow(9)).times(new Decimal(5).pow(upgrade2Level.sub(9)));
	} else {
		upgrade2Cost = new Decimal(250).times(new Decimal(1.4).pow(upgrade2Level));
	}
	
	if (upgrade3Level.greaterThanOrEqualTo(4)) {
		upgrade3Cost = new Decimal(1e5).times(new Decimal(1.8).pow(4)).times(new Decimal(7).pow(upgrade3Level.sub(4)));
	} else {
		upgrade3Cost = new Decimal(1e5).times(new Decimal(1.8).pow(upgrade3Level));
	}
	
	upgrade4Cost = new Decimal(1e18).times(new Decimal(1e6).pow(upgrade4Level));
	prestigeUpgrade1Cost = new Decimal(1).times(new Decimal(1).add(new Decimal(0.4).times(prestigeUpgrade1Level))).times(new Decimal(8).pow(prestigeUpgrade1Level));
	upgrade1LevelsFree = prestigeUpgrade1Effect;
	upgrade2LevelsFree = prestigeUpgrade1Effect;
	upgrade3LevelsFree = prestigeUpgrade1Effect;
	upgrade1Multi = upgrade1Effect.pow(upgrade1Level.add(upgrade1LevelsFree));
	upgrade2Multi = upgrade2Effect.pow(upgrade2Level.add(upgrade2LevelsFree));
	upgrade3Multi = upgrade3Effect.pow(upgrade3Level.add(upgrade3LevelsFree));
	totalMulti = upgrade1Multi.times(upgrade2Multi).times(upgrade3Multi);
	totalPPMulti = upgrade4Effect.pow(upgrade4Level);
	document.getElementById("SealButton").innerHTML = "+" + lowToExponential(totalMulti.times(permMulti));
if (prestigeUpgrade1Level.greaterThan(0)) {
	document.getElementById("upgrade1").innerHTML = "Seal gain x" + upgrade1Effect + "<br><br>Cost: " + lowToExponential(upgrade1Cost) + "<br><br>Level: " + lowToExponential(upgrade1Level) + " (+" + upgrade1LevelsFree.toStringWithDecimalPlaces(3) + " free)";
	document.getElementById("upgrade2").innerHTML = "Seal gain x" + upgrade2Effect + "<br><br>Cost: " + lowToExponential(upgrade2Cost) + "<br><br>Level: " + lowToExponential(upgrade2Level) + " (+" + upgrade2LevelsFree.toStringWithDecimalPlaces(3) + " free)";
	document.getElementById("upgrade3").innerHTML = "Seal gain x" + upgrade3Effect + "<br><br>Cost: " + lowToExponential(upgrade3Cost) + "<br><br>Level: " + lowToExponential(upgrade3Level) + " (+" + upgrade3LevelsFree.toStringWithDecimalPlaces(3) + " free)";
	document.getElementById("upgrade4").innerHTML = "PP gain x" + upgrade4Effect + "<br><br>Cost: " + lowToExponential(upgrade4Cost) + "<br><br>Level: " + lowToExponential(upgrade4Level);
} else {
	document.getElementById("upgrade1").innerHTML = "Seal gain x" + upgrade1Effect + "<br><br>Cost: " + lowToExponential(upgrade1Cost) + "<br><br>Level: " + lowToExponential(upgrade1Level);
	document.getElementById("upgrade2").innerHTML = "Seal gain x" + upgrade2Effect + "<br><br>Cost: " + lowToExponential(upgrade2Cost) + "<br><br>Level: " + lowToExponential(upgrade2Level);
	document.getElementById("upgrade3").innerHTML = "Seal gain x" + upgrade3Effect + "<br><br>Cost: " + lowToExponential(upgrade3Cost) + "<br><br>Level: " + lowToExponential(upgrade3Level);
	document.getElementById("upgrade4").innerHTML = "PP gain x" + upgrade4Effect + "<br><br>Cost: " + lowToExponential(upgrade4Cost) + "<br><br>Level: " + lowToExponential(upgrade4Level);
}
	document.getElementById("prestigeupgrade1").innerHTML = "Free levels to Seal Upgrades (excluding the fourth): " + prestigeUpgrade1Effect.toStringWithDecimalPlaces(3) + " (based on Prestiges and this upgrade's level)" + "<br><br>Cost: " + lowToExponential(prestigeUpgrade1Cost) + " PP<br><br>Level: " + lowToExponential(prestigeUpgrade1Level) + "/" + lowToExponential(prestigeUpgrade1Cap);
}
updateUpgradeData();

// Number Upgrades.
document.getElementById("upgrade1").addEventListener("click", function() {
if (num.greaterThanOrEqualTo(upgrade1Cost)) {
	num = num.sub(upgrade1Cost);
	updateNum();
	upgrade1Level = upgrade1Level.add(1);
	updateUpgradeData();
	updateStatistics("TotalSealUpgradesBought");
} else {
null;
}
});
document.getElementById("upgrade2").addEventListener("click", function() {
if (num.greaterThanOrEqualTo(upgrade2Cost)) {
	num = num.sub(upgrade2Cost);
	updateNum();
	upgrade2Level = upgrade2Level.add(1);
	updateUpgradeData();
	updateStatistics("TotalSealUpgradesBought");
} else {
null;
}
});
document.getElementById("upgrade3").addEventListener("click", function() {
if (num.greaterThanOrEqualTo(upgrade3Cost)) {
	num = num.sub(upgrade3Cost);
	updateNum();
	upgrade3Level = upgrade3Level.add(1);
	updateUpgradeData();
	updateStatistics("TotalSealUpgradesBought");
} else {
null;
}
});
document.getElementById("upgrade4").addEventListener("click", function() {
	if (num.greaterThanOrEqualTo(upgrade4Cost)) {
		num = num.sub(upgrade4Cost);
		updateNum();
		upgrade4Level = upgrade4Level.add(1);
		updateUpgradeData();
		updateStatistics("TotalSealUpgradesBought");
		} else {
			null;
		}
});

// Prestige Upgrades.
document.getElementById("prestigeupgrade1").addEventListener("click", function() {
	if (prestigeUpgrade1Level.equals(prestigeUpgrade1Cap)) {
		prestigeUpgrade1Cost = new Decimal(0);
	} else if (prestigepoints.greaterThanOrEqualTo(prestigeUpgrade1Cost)) {
		prestigepoints = prestigepoints.sub(prestigeUpgrade1Cost);
		updateNum();
		prestigeUpgrade1Level = prestigeUpgrade1Level.add(1);
		updateUpgradeData();
		updateStatistics("TotalPrestigeUpgradesBought");
		} else {
			null;
		}
});

// Prestige stuff.
document.getElementById("PrestigeButton").addEventListener("click", function() {
	if (prestigesDone.greaterThan(0)) {
	reset("prestige");
	} else {
	reset("prestigeFirst");
	}
prestigeSectionShow(false);
document.getElementById("PrestigeUpgradesSection").setAttribute("style", "display:block");
});
function prestigeSectionShow(e) {
	switch(e) {
		case true:
		if (prestigesDone.greaterThan(0)) {
			null;
		} else {
		document.getElementById("PrestigeText").innerHTML = "Reach " + lowToExponential(prestigeReq) + " Seals to unlock Prestige.";
		document.getElementById("PrestigeSection").setAttribute("style", "display:block");
		}
		break;
		case "normal":
		if (prestigesDone.greaterThan(0)) {
			document.getElementById("PrestigeText").innerHTML = "On Prestige, you will earn <b>" + lowToExponential(prestigePointGain) + " PP</b>. Earn more based on Seals.";
		} else {
			document.getElementById("PrestigeText").innerHTML = "Resets your Seals and Seal Upgrades. The first Prestige unlocks a new Seal Upgrade and the Prestige Upgrades section, awards 1 Prestige Point (PP) and permanently boosts Seal gain by 3x. You cannot earn more than 1 PP on your first Prestige.";
		}
		document.getElementById("PrestigeButton").setAttribute("style", "display:initial");
		document.getElementById("PrestigeSection").setAttribute("style", "display:block");
		break;
		case false:
		document.getElementById("PrestigeSection").setAttribute("style", "display:none");
		break;
		default:
		document.getElementById("PrestigeSection").setAttribute("style", "display:none");
	}
}

// Determine permanent multiplier.
function permMultiCheck() {
	permMulti = new Decimal(1);
	if (prestigesDone.greaterThan(0)) {
		permMulti = permMulti.times(3);
	}
	if (sealifyAmount.greaterThan(0)) {
		permMulti = permMulti.times(2);
	}
}
permMultiCheck();

// Checker for checking various things constantly.
function checker() {
	if (upgrade3Level.greaterThanOrEqualTo(1) && num.lessThan(prestigeReq)) {
		prestigeSectionShow(true);
	}
	if (prestigesDone.equals(0) || num.log10().pow(0.9).isNan() || num.lessThan(prestigeReq)) {
		prestigePointGain = new Decimal(1);
		} else {
			prestigePointGain = num.log10().pow(0.9).times(totalPPMulti);
		}
	if (num.greaterThanOrEqualTo(prestigeReq)) {
		prestigeSectionShow("normal");
	}
	if (num.lessThan(50) && prestigesDone.lessThan(1) && upgrade2Level.lessThan(1)) {
		document.getElementById("upgrade2").setAttribute("style", "display:none");
	} else {
		document.getElementById("upgrade2").setAttribute("style", "display:inline");
	}
	if (num.lessThan(1e3) && prestigesDone.lessThan(1) && upgrade3Level.lessThan(1)) {
		document.getElementById("upgrade3").setAttribute("style", "display:none");
	} else {
		document.getElementById("upgrade3").setAttribute("style", "display:inline");
	}
	if (prestigesDone.lessThan(1)) {
		document.getElementById("upgrade4").setAttribute("style", "display:none");
	} else if (prestigesDone.greaterThanOrEqualTo(10)) {
		document.getElementById("upgrade4").setAttribute("style", "display:inline");
	} else if (num.lessThan(1e16) && upgrade4Level.lessThan(1)) {
		document.getElementById("upgrade4").setAttribute("style", "display:none");
	} else {
		document.getElementById("upgrade4").setAttribute("style", "display:inline");
	}
permMultiCheck();
}
var checkNumInterval = setInterval(checker, 200);

// Update statistics.
function checkPluralWord(integer, word, wordPlural) {
	if (integer.equals(1)) {
		result = word;
	} else {
		result = wordPlural;
	}
	return result;
}
function updateStatistics(e) {
	switch(e) {
		case "MainButtonClicks":
		statisticMainButtonClicks = statisticMainButtonClicks.add(1);
		break;
		case "TotalSeals":
		statisticTotalSeals = statisticTotalSeals.add(totalMulti.times(permMulti));
		break;
		case "TotalSealUpgradesBought":
		statisticTotalSealUpgradesBought = statisticTotalSealUpgradesBought.add(1);
		break;
		case "TotalPrestiges":
		statisticTotalPrestiges = statisticTotalPrestiges.add(1);
		break;
		case "TotalPP":
		statisticTotalPP = statisticTotalPP.add(prestigePointGain);
		break;
		case "TotalPrestigeUpgradesBought":
		statisticTotalPrestigeUpgradesBought = statisticTotalPrestigeUpgradesBought.add(1);
	}
	document.getElementById("StatisticMainButtonClicks").innerHTML = "You have clicked the main button " + lowToExponential(statisticMainButtonClicks) + checkPluralWord(statisticMainButtonClicks, " time", " times")
	document.getElementById("StatisticTotalSeals").innerHTML = "You have gained a total of " + lowToExponential(statisticTotalSeals) + checkPluralWord(statisticTotalSeals, " Seal", " Seals")
	if (statisticTotalSealUpgradesBought.greaterThan(0)) {
	document.getElementById("StatisticTotalSealUpgradesBought").innerHTML = "You have bought a total of " + lowToExponential(statisticTotalSealUpgradesBought) + checkPluralWord(statisticTotalSealUpgradesBought, " Seal Upgrade", " Seal Upgrades");
	}
	if (prestigesDone.greaterThan(0)) {
	document.getElementById("PrestigeUpgradesSection").setAttribute("style", "display:block");
	document.getElementById("StatisticTotalPrestiges").innerHTML = "You have Prestiged a total of " + lowToExponential(statisticTotalPrestiges) + checkPluralWord(statisticTotalPrestiges, " time", " times")
	document.getElementById("StatisticTotalPP").innerHTML = "You have gained a total of " + lowToExponential(statisticTotalPP) + checkPluralWord(statisticTotalPP, " Prestige Point", " Prestige Points")
	if (statisticTotalPrestigeUpgradesBought.greaterThan(0)) {
	document.getElementById("StatisticTotalPrestigeUpgradesBought").innerHTML = "You have bought a total of " + lowToExponential(statisticTotalPrestigeUpgradesBought) + checkPluralWord(statisticTotalPrestigeUpgradesBought, " Prestige Upgrade", " Prestige Upgrades");
	}
	permMultiCheck();
	document.getElementById("StatisticPermanentMultiplier").innerHTML = "You have a permanent Seal multiplier of " + lowToExponential(permMulti) + "x";
	}
}
updateStatistics();