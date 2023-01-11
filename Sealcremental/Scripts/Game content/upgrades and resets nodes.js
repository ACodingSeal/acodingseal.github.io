// Upgrades.
// Seal Upgrades.
var sealUpgradesContainer = document.createElement("p");
sealUpgradesContainer.innerHTML = "<span style='font-weight:bold'>Seal Upgrades</span><br><button id='upgrade1'></button><button id='upgrade2' style='display:none'></button><button id='upgrade3' style='display:none'></button><button id='upgrade4' style='display:none'></button>";

// Prestige Upgrades.
var prestigeUpgradesContainer = document.createElement("p");
prestigeUpgradesContainer.setAttribute("id", "PrestigeUpgradesSection");
prestigeUpgradesContainer.setAttribute("style", "display:none");
prestigeUpgradesContainer.innerHTML = "<span style='color:#6273AC;font-weight:bold'>Prestige Upgrades</span><br>These upgrades are kept on Prestige. Current PP: <span id='PrestigePoints'></span><br><button id='prestigeupgrade1'></button>";

// Resets.
// Prestige.
var prestigeSection = document.createElement("div");
prestigeSection.setAttribute("id", "PrestigeSection");
prestigeSection.setAttribute("style", "display:none");
prestigeSection.innerHTML = "<p><span style='color:#6273AC;font-weight:bold'>Prestige</span><br><span id='PrestigeText'></span></p><button id='PrestigeButton' style='display:none'>Prestige!</button>";