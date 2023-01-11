// Export saveString.
function exportSave(automatic) {
	// Date getter and formatter.
	const d = new Date();
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getUTCDate();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();
	function zeroPadding(e) {
		if (e < 10) {
			return "0" + e;
		} else {
			return e;
		}
	}
	saveString = "SealcrementalSave---" + year + "-" + zeroPadding(month) + "-" + zeroPadding(day) + "T" + zeroPadding(hour) + "-" + zeroPadding(minute) + "-" + zeroPadding(second) + "---MainButtonClicks-" + lowToExponential(statisticMainButtonClicks) + "---TotalSeals-" + lowToExponential(statisticTotalSeals) + "---CurrentSeals-" + lowToExponential(num) + "---upgrade1Level-" + lowToExponential(upgrade1Level) + "---upgrade2Level-" + lowToExponential(upgrade2Level) + "---upgrade3Level-" + lowToExponential(upgrade3Level) + "---upgrade4Level-" + lowToExponential(upgrade4Level) + "---TotalSealUpgradesBought-" + lowToExponential(statisticTotalSealUpgradesBought) + "---TotalPrestiges-" + lowToExponential(statisticTotalPrestiges) + "---TotalPP-" + lowToExponential(statisticTotalPP) + "---prestigepoints-" + lowToExponential(prestigepoints) + "---statisticTotalPrestigeUpgradesBought-" + lowToExponential(statisticTotalPrestigeUpgradesBought) + "---prestigeUpgrade1Level-" + lowToExponential(prestigeUpgrade1Level) + "---EndOfSaveFile";
	if (automatic !== true) {
		saveInput.value = saveString;
	}
}

// Import saveString and attempt to interpret its contents.
function importSave(pageload) {
	if (pageload !== true) {
		if (saveInput.value === '') {
			exportSave(true);
		} else {
			saveString = saveInput.value;
		}
	}
	
	// Clear existing data.
	statisticMainButtonClicks = new Decimal(0);
	statisticTotalSeals = new Decimal(0);
	num = new Decimal(0);
	statisticTotalSealUpgradesBought = new Decimal(0);
	upgrade1Level = new Decimal(0);
	upgrade2Level = new Decimal(0);
	upgrade3Level = new Decimal(0);
	upgrade4Level = new Decimal(0);
	statisticTotalPrestiges = new Decimal(0);
	prestigesDone = new Decimal(0);
	statisticTotalPP = new Decimal(0);
	prestigepoints = new Decimal(0);
	statisticTotalPrestigeUpgradesBought = new Decimal(0);
	prestigeUpgrade1Level = new Decimal(0);
	permMulti = new Decimal(1);
	
	// Import new data.
	statisticMainButtonClicks = new Decimal(saveString.match(/MainButtonClicks[-](.+?)[-]{3}/)[0].replace(/MainButtonClicks[-]/, "").replace(/[-]{3}/, ""));
	statisticTotalSeals = new Decimal(saveString.match(/TotalSeals[-](.+?)[-]{3}/)[0].replace(/TotalSeals[-]/, "").replace(/[-]{3}/, ""));
	num = new Decimal(saveString.match(/CurrentSeals[-](.+?)[-]{3}/)[0].replace(/CurrentSeals[-]/, "").replace(/[-]{3}/, ""));
	statisticTotalSealUpgradesBought = new Decimal(saveString.match(/TotalSealUpgradesBought[-](.+?)[-]{3}/)[0].replace(/TotalSealUpgradesBought[-]/, "").replace(/[-]{3}/, ""));
	upgrade1Level = new Decimal(saveString.match(/upgrade1Level[-](.+?)[-]{3}/)[0].replace(/upgrade1Level[-]/, "").replace(/[-]{3}/, ""));
	upgrade2Level = new Decimal(saveString.match(/upgrade2Level[-](.+?)[-]{3}/)[0].replace(/upgrade2Level[-]/, "").replace(/[-]{3}/, ""));
	upgrade3Level = new Decimal(saveString.match(/upgrade3Level[-](.+?)[-]{3}/)[0].replace(/upgrade3Level[-]/, "").replace(/[-]{3}/, ""));
	upgrade4Level = new Decimal(saveString.match(/upgrade4Level[-](.+?)[-]{3}/)[0].replace(/upgrade4Level[-]/, "").replace(/[-]{3}/, ""));
	statisticTotalPrestiges = new Decimal(saveString.match(/TotalPrestiges[-](.+?)[-]{3}/)[0].replace(/TotalPrestiges[-]/, "").replace(/[-]{3}/, ""));
	prestigesDone = statisticTotalPrestiges;
	statisticTotalPP = new Decimal(saveString.match(/TotalPP[-](.+?)[-]{3}/)[0].replace(/TotalPP[-]/, "").replace(/[-]{3}/, ""));
	prestigepoints = new Decimal(saveString.match(/prestigepoints[-](.+?)[-]{3}/)[0].replace(/prestigepoints[-]/, "").replace(/[-]{3}/, ""));
	statisticTotalPrestigeUpgradesBought = new Decimal(saveString.match(/statisticTotalPrestigeUpgradesBought[-](.+?)[-]{3}/)[0].replace(/statisticTotalPrestigeUpgradesBought[-]/, "").replace(/[-]{3}/, ""));
	prestigeUpgrade1Level = new Decimal(saveString.match(/prestigeUpgrade1Level[-](.+?)[-]{3}/)[0].replace(/prestigeUpgrade1Level[-]/, "").replace(/[-]{3}/, ""));
	permMultiCheck();
	updateNum();
	updateUpgradeData();
	updateStatistics();
}

// Create import/export box.
document.getElementById("SaveBar").innerHTML = "<p>Save:</p>";
var saveInput = document.createElement("textarea");
var exportButton = document.createElement("button");
exportButton.innerHTML = "Export";
var importButton = document.createElement("button");
importButton.innerHTML = "Import";
document.getElementById("SaveBar").appendChild(saveInput);
document.getElementById("SaveBar").appendChild(document.createElement("p"));
document.getElementById("SaveBar").appendChild(exportButton);
document.getElementById("SaveBar").appendChild(importButton);
exportButton.addEventListener("click", exportSave);
importButton.addEventListener("click", importSave);

// Auto save.
function autosave(pageload) {
	exportSave(true);
	document.cookie = "SealcrementalAutosave=" + saveString;
	if (pageload === true) {
		console.log("Successfully loaded save from cookie.";
	} else {
		console.log("Autosave successful.");
	}
}
if (document.cookie.match(/SealcrementalAutosave=/) === null) {
	document.getElementById("MainBody").onload = function(){
		autosave(true);
		saveString = document.cookie.match(/SealcrementalAutosave=.+/)[0].replace(/SealcrementalAutosave=/, "").replace(/EndOfSaveFile.+/, "EndOfSaveFile");
		importSave(true);
		}
}
const autosaveInterval = setInterval(autosave, 10000);