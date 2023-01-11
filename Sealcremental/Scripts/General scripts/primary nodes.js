// Create sections under the main section.
var mainSection = document.getElementById("MainSection");
var statisticsContainer = document.createElement("div");
statisticsContainer.setAttribute("style", "text-align:center");
statisticsContainer.innerHTML = "<br><span style='font-weight:bold'>Statistics (click to toggle):</span><br>";
var stat1 = document.createElement("p");
var stat2 = document.createElement("p");
var stat3 = document.createElement("p");
var stat4 = document.createElement("p");
var stat5 = document.createElement("p");
var stat6 = document.createElement("p");
var stat7 = document.createElement("p");
stat1.setAttribute("id", "StatisticMainButtonClicks");
stat2.setAttribute("id", "StatisticTotalSeals");
stat3.setAttribute("id", "StatisticTotalSealUpgradesBought");
stat4.setAttribute("id", "StatisticTotalPrestiges");
stat5.setAttribute("id", "StatisticTotalPP");
stat6.setAttribute("id", "StatisticTotalPrestigeUpgradesBought");
stat7.setAttribute("id", "StatisticPermanentMultiplier");
var statisticsContainerItems = document.createElement("div");
statisticsContainer.appendChild(statisticsContainerItems);
statisticsContainerItems.setAttribute("id", "StatisticsSection");
statisticsContainerItems.appendChild(stat1);
statisticsContainerItems.appendChild(stat2);
statisticsContainerItems.appendChild(stat3);
statisticsContainerItems.appendChild(stat4);
statisticsContainerItems.appendChild(stat5);
statisticsContainerItems.appendChild(stat6);
statisticsContainerItems.appendChild(stat7);
var sealAmountHeader = document.createElement("p");
sealAmountHeader.innerHTML = "<br><span style='font-weight:bold'>Seals:</span><br><img src='./Sealcremental/Assets/Seal.png' width='25'/><span id='SealAmount'></span>";
var sealButtonContainer = document.createElement("p");
sealButtonContainer.innerHTML = "<button id='SealButton'></button>";

// Show/hide the statistics.
function toggleStatsVis() {
	if (document.getElementById("StatisticsSection").getAttribute("style") === "display:none") {
		document.getElementById("StatisticsSection").setAttribute("style", "display:block");
	} else {
		document.getElementById("StatisticsSection").setAttribute("style", "display:none");
	}
}
statisticsContainer.addEventListener("click", toggleStatsVis);