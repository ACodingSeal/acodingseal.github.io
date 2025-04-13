// "Notoriety EXP Calculator" by TheSeal27

(function() {
	function NotoExpReqTotal(base, goal) {
		base = new Decimal(base).abs();
		goal = new Decimal(goal).abs();
		const count = goal.sub(base).abs();
		var sum = new Decimal(0);
		for (var x = 0; count.greaterThan(x); x++) {
			var currentLvl = base.add(x);
			sum = sum.add(currentLvl.times(new Decimal(1018.93)).add(currentLvl.pow(2.976664)).floor());
			// sum += ( Math.floor(currentLvl*1018.93+currentLvl**2.976664) );
		}
		return sum;
	}
	// console.log(NotoExpReqTotal(1, 100));
	
	var tool_baseHTML = "<div style='background:linear-gradient(rgba(44,0,66, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(69,0,102, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(44,0,66, var(--bg-alpha)));text-align:center;width:80%;margin:auto;padding:1em'><div class='StandardText' style='font-size:100%'><span style='font-size:200%'>Notoriety EXP Calculator<br><span style='font-size:70%'>(v0.0.1)</span></span><p>A tool for the Roblox game <a href='https://www.roblox.com/games/21532277'>Notoriety</a>'s EXP, Infamy and MXP features<br>Tool created by TheSeal27</p></div><br>";
	(function() {
		tool_baseHTML += "<center style='height:4em' id='NotorietyEXPandInfamyCalculator_MenuButtons'></center><hr/>"
		tool_baseHTML += "<div id='NotorietyEXPandInfamyCalculator_MenuContainer_Calculator'></div>"
		tool_baseHTML += "<div id='NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous'></div>"
		tool_baseHTML += "</div>"
	}());
	
	document.getElementById('NotorietyEXPandInfamyCalculator').innerHTML = tool_baseHTML;
	
	(function() {
		var tool_baseHTML_MenuContainer_Calculator = '';
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputSliders_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInputSliders_Global' style='cursor:pointer;float:left;text-decoration:underline'>Input method: Sliders</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleRomanNumerals_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleRomanNumerals_Global' style='cursor:pointer;float:left;text-decoration:underline'>Roman numerals: ON</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputExplanations_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInputExplanations_Global' style='cursor:pointer;float:left;text-decoration:underline'>Input explanations: Visible</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleComputationType_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleComputationType_Global' style='cursor:pointer;float:left;text-decoration:underline'>Computing: EXP, Levels & Infamy</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInfiniteInfamies_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInfiniteInfamies_Global' style='cursor:pointer;float:left;text-decoration:underline'>Maximum infamies: 250</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleAutoCalculate_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleAutoCalculate_Global' style='cursor:pointer;float:left;text-decoration:underline'>Auto calculate: OFF</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleTimeOutputFormat_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleTimeOutputFormat_Global' style='cursor:pointer;float:left;text-decoration:underline'>Time output format: words</div><br></small>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_LevelSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Level Settings</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentLevelInput'>Current level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_CurrentLevelInput_Result'>1</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_RemainingEXPInput'>Remaining EXP: <input type='range' min='0' max='999999' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_RemainingEXPInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_RemainingEXPInput_Result'>0</span></code><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(This is EXP remaining until the next level.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalLevelInput'>Desired level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_GoalLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_GoalLevelInput_Result'>1</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_MutatorRankSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Mutator Rank Settings</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentMutatorRankInput'>Current rank: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_CurrentMutatorRankInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(Starting rank is 0.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_RemainingMXPInput'>Remaining MXP: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_RemainingMXPInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(This is MXP remaining until the next level. Leave blank if no progress has been made.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalMutatorRankInput'>Desired rank: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_GoalMutatorRankInput'></input></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_UntilMXPUsageInput'>Until MXP usage: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_UntilMXPUsageInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(Search for which Mutator Rank can be achieved using this much MXP. Overrides the 'Desired rank' setting.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_ProgressionSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Progression Settings</h2>";		
		tool_baseHTML_MenuContainer_Calculator += "<p>Run/rotation gains:<br><textarea style='width:20em;height:10em' placeholder='temporary text' id='NotorietyEXPandInfamyCalculator_RunGainsInput'></textarea><span id='NotorietyEXPandInfamyCalculator_RunGainsInput_InputExplanation' class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'>placeholder text</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_InfamySettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Infamy Settings</h2><small>If not calculating infamies, then <span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_InfamySettings'>ignore these settings</span>.</small>";
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_InfamySettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentInfamyLevelInput'>Current infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput_Result'>0</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalInfamyLevelInput'>Desired infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput_Result'>0</span></code><br>(Until out of money: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_UntilPoorCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation'> (Overrides 'Desired infamy level' setting and requires 'Run/rotation gains' to be properly defined.)</span>)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentMoneyInput'>Current money: <input style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentMoneyInput'></input><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(This is the money that has been reserved for infamy. Default is <code>0</code>. Required setting when 'Desired infamy level' > 'Until out of money' is set to <code>Y</code>.)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CheaperPassCheck'><a href='https://www.roblox.com/game-pass/748016'>Cheaper Infamy</a> gamepass: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_CheaperPassCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(Whether or not the user owns the Cheaper Infamy gamepass, which reduces the final monetary requirement of each infamy by 50%.)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_PreMoneyReqLimitCheck'>Pre-money requirement limit: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_PreMoneyReqLimitCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(This setting refers to the post-infamy 25 increasing infamy money requirement (+$10mil without cheaper pass, +$5mil with), which previously (prior to 3.9.5b on 2024-12-27T16:10Z) did not have a limit of $125mil without cheaper pass (or $62.5mil with).)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_Results'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Results</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p><div><p id='NotorietyEXPandInfamyCalculator_Section_Results_Disclaimer' style='font-size:80%'>placeholder!!!</p><div style='width:10em;height:4em;margin:auto'><div style='margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_CalculateButton' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Calculate</button></div></div></div></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p><div id='NotorietyEXPandInfamyCalculator_OutputResults'>" + 'dallas medic bag scream' + "</div></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Calculator').innerHTML = tool_baseHTML_MenuContainer_Calculator;
	}());
	
	(function() {
		var tool_baseHTML_MenuContainer_Miscellaneous = '';
		
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_Section_UpdateLogs'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<h2>Hall of CCLs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_HallofInfamyCCLs'>(toggle visibility)</span></small>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_HallofInfamyCCLs' style='text-align:initial;display:none'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		
		tool_baseHTML_MenuContainer_Miscellaneous += "<hr/><h2>Update Logs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_UpdateLogs'>(toggle visibility)</span></small>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_UpdateLogs' style='text-align:initial;display:none'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous').innerHTML = tool_baseHTML_MenuContainer_Miscellaneous;
	}());
	
	const elem = {
		toggleInputSliders_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputSliders_Global'),
		toggleRomanNumerals_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleRomanNumerals_Global'),
		toggleInputExplanations_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputExplanations_Global'),
		toggleComputationType_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleComputationType_Global'),
		toggleInfiniteInfamies_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInfiniteInfamies_Global'),
		toggleAutoCalculate_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleAutoCalculate_Global'),
		toggleTimeOutputFormat_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleTimeOutputFormat_Global'),
		
		toggleInputSliders_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInputSliders_Global'),
		toggleRomanNumerals_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleRomanNumerals_Global'),
		toggleInputExplanations_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInputExplanations_Global'),
		toggleComputationType_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleComputationType_Global'),
		toggleInfiniteInfamies_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInfiniteInfamies_Global'),
		toggleAutoCalculate_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleAutoCalculate_Global'),
		toggleTimeOutputFormat_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleTimeOutputFormat_Global'),
		
		Section_LevelSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_LevelSettings'),
		Section_MutatorRankSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_MutatorRankSettings'),
		Section_ProgressionSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_ProgressionSettings'),
		Section_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_InfamySettings'),
		Section_Results: document.getElementById('NotorietyEXPandInfamyCalculator_Section_Results'),
		Section_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_InfamySettings'),
		Section_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_Section_UpdateLogs'),
		
		SectionContainer_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_InfamySettings'),
		SectionContainer_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_UpdateLogs'),
		SectionContainer_HallofInfamyCCLs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_HallofInfamyCCLs'),
		
		SectionContainerToggle_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_InfamySettings'),
		SectionContainerToggle_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_UpdateLogs'),
		SectionContainerToggle_HallofInfamyCCLs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_HallofInfamyCCLs'),
		
		currentLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentLevelInput'),
		remainingEXPInput: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingEXPInput'),
		goalLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalLevelInput'),
		currentInfamyLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput'),
		goalInfamyLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput'),
		
		currentMutatorRankInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentMutatorRankInput'),
		remainingMXPInput: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingMXPInput'),
		goalMutatorRankInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalMutatorRankInput'),
		untilMXPUsageInput: document.getElementById('NotorietyEXPandInfamyCalculator_UntilMXPUsageInput'),
		
		runGainsInput: document.getElementById('NotorietyEXPandInfamyCalculator_RunGainsInput'),
		runGainsInput_InputExplanation: document.getElementById('NotorietyEXPandInfamyCalculator_RunGainsInput_InputExplanation'),
		
		currentMoneyInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentMoneyInput'),
		
		currentLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentLevelInput_Result'),
		remainingEXPInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingEXPInput_Result'),
		goalLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_GoalLevelInput_Result'),
		currentInfamyLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput_Result'),
		goalInfamyLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput_Result'),
		
		untilOutOfMoneyCheck: document.getElementById('NotorietyEXPandInfamyCalculator_UntilPoorCheck'),
		cheaperPassCheck: document.getElementById('NotorietyEXPandInfamyCalculator_CheaperPassCheck'),
		preMoneyCapCheck: document.getElementById('NotorietyEXPandInfamyCalculator_PreMoneyReqLimitCheck'),
		
		resultsDisclaimer: document.getElementById('NotorietyEXPandInfamyCalculator_Section_Results_Disclaimer'),
		calculateButton: document.getElementById('NotorietyEXPandInfamyCalculator_CalculateButton'),
		outputResults: document.getElementById('NotorietyEXPandInfamyCalculator_OutputResults'),
	}
	
	function addHallofInfamyCCLs() {
		elem.SectionContainer_HallofInfamyCCLs.innerHTML = '';
		const countCCLs = 28;
		var string = "<p style='text-align:center'>Times are noted in the local system time in <b>year-month-day 24hour:minute:second</b> format. Entries may take some time to be added, especially depending on available data. There are currently many missing user-written descriptions. If you wish for modifications to be made to your entry, or want it to be anonymised, contact the tool creator on Discord (same username).</p>";
		function Player(username, displayName, robloxAvatar, whenCCL, timeSincePrevious, position, notes, ownDescription) {
			this.username = username;
			this.displayName = displayName;
			this.robloxAvatar = robloxAvatar;
			this.whenCCL = whenCCL;
			this.timeSincePrevious = timeSincePrevious;
			this.position = position;
			this.notes = notes;
			this.ownDescription = ownDescription;
		}
		const players = [];
		const ownDescriptionButtons = [];
		const ownDescriptionContainers = [];
		const playersData_usernames = [
		"ILikeToast5",
		"Derpifi3d",
		"withwillin101",
		"Aurora_The1Cat",
		"seroly2345",
		"theREALdynamic",
		"bigfootbb045",
		"LuvlyGirlMaisy",
		"ARandomNoobGamer",
		"Ryankaye01",
		"kogamarobloxman",
		"ALiteraIPotato",
		"cl3rical",
		"T4x_Ev4der",
		"notrealdude755",
		"Kurvinox_PL",
		"SwiftYards",
		"Danneilkoko",
		"Cut1eBetty",
		"IceColdFrigid",
		"TexudeoSteve",
		"ilovebaconflavor",
		"LeRealShadowflame",
		"Benja_boy64",
		"GenericDreamer",
		"M4kA13",
		"Aimilized",
		"LosCracks9000",
		];
		const playersData_displayNames = [
		"ILikeToast5",
		"Derp",
		"withwillin",
		"Little_Fluffy1Cat",
		"Siro",
		"Dynamic",
		"thefemurbreaker",
		"maisy",
		"NoobLol",
		"Ryeon",
		"stix",
		"ALiteralPotato",
		"cleric",
		"私の睡眠マヒの悪魔は私を攻撃し続ける",
		"notrealdude755",
		"Pola",
		"Swift",
		"Iron",
		"CutieBetty",
		"Ice",
		"Steve",
		"qwe",
		"Shadowflame",
		"iforgor",
		"GenericDreamer",
		"m4ka",
		"Aimilized",
		"NekoChan",
		];
		const playersData_robloxAvatars = [
		"ILikeToast5 - 2025-04-10T22-03Z.png",
		"Derpifi3d - 2025-04-10T22-04Z.png",
		"withwillin101 - 2025-04-10T22-04Z.png",
		"Aurora_The1Cat - 2025-04-10T22-04Z.png",
		"seroly2345 - 2025-04-10T22-05Z.png",
		"theREALdynamic 2025-04-10T22-05Z.png",
		"bigfootbb045 - 2025-04-10T22-05Z.png",
		"LuvlyGirlMaisy - 2025-04-10T22-05Z.png",
		"ARandomNoobGamer - 2025-04-10T22-06Z.png",
		"Ryankaye01 - 2025-04-10T22-06Z.png",
		"kogamarobloxman - 2025-04-10T22-06Z.png",
		"ALiteraIPotato - 2025-04-10T22-06Z.png",
		"cl3rical - 2025-04-10T22-07Z.png",
		"T4x_Ev4der - 2025-04-10T22-07Z.png",
		"notrealdude755 - 2025-04-10T22-07Z.png",
		"Kurvinox_PL - 2025-04-10T22-07Z.png",
		"SwiftYards - 2025-04-10T22-08Z.png",
		"Danneilkoko - 2025-04-10T22-08Z.png",
		"Cut1eBetty - 2025-04-10T22-08Z.png",
		"IceColdFrigid - 2025-04-10T22-08Z.png",
		"TexudeoSteve - 2025-04-10T22-09Z.png",
		"ilovebaconflavor - 2025-04-10T22-09Z.png",
		"LeRealShadowflame - 2025-04-10T22-09Z.png",
		"Benja_boy64 - 2025-04-10T22-09Z.png",
		"GenericDreamer - 2025-04-10T22-10Z.png",
		"M4kA13 - 2025-04-10T22-10Z.png",
		"Aimilized - 2025-04-11T19-35Z.png",
		"LosCracks9000 - 2025-04-13T00-14Z.png",
		];
		const playersData_whenCCL = [
		{approx:false, timestamp: "2025-01-01T10:04:35Z"},
		{approx:'within hours', timestamp: "2025-01-11T00:00Z"},
		{approx:'within minutes', timestamp: "2025-01-11T05:20Z"},
		{approx:'within many hours', timestamp: ["2025-01-17T13:00Z", "2025-01-17T19:00Z"]},
		{approx:'within hours', timestamp: "2025-01-21T02:33Z"},
		{approx:'within many hours', timestamp: ["2025-01-24T18:00Z", "2025-01-25T12:00Z"]},
		{approx:'within minutes', timestamp: "2025-01-30T02:23Z"},
		{approx:'within hours', timestamp: "2025-02-04T20:05Z"},
		{approx:'within minutes', timestamp: "2025-02-09T10:30Z"},
		{approx:'within seconds', timestamp: "2025-02-16T02:40:39Z"},
		{approx:'within hours', timestamp: "2025-02-21T17:00Z"},
		{approx:'within seconds', timestamp: "2025-02-21T19:41:58Z"},
		{approx:'within minutes', timestamp: "2025-02-24T01:16Z"},
		{approx:'within hours', timestamp: ["2025-02-27T02:00Z", "2025-02-27T03:42Z"]},
		{approx:'within minutes', timestamp: "2025-02-28T13:22Z"},
		{approx:'within hours', timestamp: ["2025-03-01T18:15Z", "2025-03-01T22:45Z"]},
		{approx:'within many hours', timestamp: ["2025-03-08T06:47Z", "2025-03-08T12:18Z"]},
		{approx:'within hours', timestamp: ["2025-03-10T13:25Z", "2025-03-10T15:57Z"]},
		{approx:'within many hours', timestamp: ["2025-03-12T14:14Z", "2025-03-12T21:10Z"]},
		{approx:'within seconds', timestamp: "2025-03-13T23:59:04Z"},
		{approx:'within seconds', timestamp: "2025-03-20T01:35Z"},
		{approx:'within minutes', timestamp: "2025-03-20T02:10Z"},
		{approx:'within minutes', timestamp: ["2025-03-25T03:24Z", "2025-03-25T03:57Z"]},
		{approx:'within many hours', timestamp: ["2025-03-29T11:33Z", "2025-03-30T03:12Z"]},
		{approx:'within hours', timestamp: ["2025-04-01T07:35Z", "2025-04-01T10:57Z"]},
		{approx:'within hours', timestamp: ["2025-04-04T11:30Z", "2025-04-04T13:38Z"]},
		{approx:'within under 1 minute', timestamp: "2025-04-11T17:19Z"},
		{approx:'within seconds', timestamp: "2025-04-12T13:51:27Z"},
		];
		const playersData_timeSincePrevious = [
		{approx:false, seconds: false},
		{approx:'within hours', seconds: 827725},
		{approx:'within hours', seconds: 19200},
		{approx:'within hours', seconds: [546000, 567600]},
		{approx:'within hours', seconds: [286380, 307980]},
		{approx:'within hours', seconds: [314820, 379620]},
		{approx:'within hours', seconds: [397380, 462180]},
		{approx:'within hours', seconds: 495720},
		{approx:'within hours', seconds: 397500},
		{approx:'within hours', seconds: 576639},
		{approx:'within hours', seconds: 483561},
		{approx:'within hours', seconds: 9718},
		{approx:'within hours', seconds: 192842},
		{approx:'within hours', seconds: [261840, 267960]},
		{approx:'within hours', seconds: [121200, 127320]},
		{approx:'within hours', seconds: [103980, 120180]},
		{approx:'within hours', seconds: [563520, 583380]},
		{approx:'within hours', seconds: [196680, 205800]},
		{approx:'within hours', seconds: [175740, 200700]},
		{approx:'within hours', seconds: [56944, 81904]},
		{approx:'within hours', seconds: 563756},
		{approx:'within hours', seconds: 2100},
		{approx:'within hours', seconds: [436440, 438420]},
		{approx:'within hours', seconds: [374940, 431280]},
		{approx:'within hours', seconds: [244920, 257040]},
		{approx:'within hours', seconds: [273300, 280980]},
		{approx:'within hours', seconds: [618060, 625740]},
		{approx:'within seconds', seconds: 73947},
		];
		const playersData_positions = [
		1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
		];
		const playersData_notes = [
		// 1 - 10
		"Achieved CCL in 2024 in IDLW (UTC-12:00) (Anywhere on Earth), less than 14 days after starting the rerelease 43 hours late, after grinding on average 15+ hours a day, grinding almost exclusively Authority and Shadow Raid, encountering many delays. CCL #1 is also the creator of this tool!",
		"Achieved a great many infamy ranks with his duo, withwillin101, then reached CCL only hours before his duo. Would've achieved CCL much sooner if not for school and mucking about for about the first week of the rerelease.",
		"Achieved a great many infamy ranks with his duo, Derpifi3d, then reached CCL only hours after his duo.",
		"Achieved CCL mere hours before the suit revamp, becoming the fourth and final owner of the now-unobtainable Crimson (now Classic Crimson) suit pattern.",
		"Highest infamy classic suit: Rojo (200)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Blue Navy (100)",
		undefined,
		// 11 - 20
		undefined,
		"This user grinded 200 infamy ranks with random players in public matches.",
		"Highest infamy classic suit: Blue Navy (100)",
		undefined,
		undefined,
		undefined,
		"Possibly the first post-rerelease player to reach CCL, based on their badges.",
		undefined,
		"Possibly the first alternate account to reach CCL, being possibly an alt of CCL #17; this is based on having a very empty profile and the default avatar, in addition to only being friends with CCL #17 (at the time of addition to the CCLs list, friends with another player) and their badges being almost exclusively Notoriety ones since joining the game until Rank 250.",
		"Possibly the first solo grinder to reach CCL.",
		// 21 - 28
		undefined,
		undefined,
		undefined,
		undefined,
		"This user primarily solo grinded to CCL. May also be the first CCL to reach it without owning the 'True Criminal' badge (1873037302).",
		undefined,
		"This user was at infamy 235 for multiple months before finally going past the finish line and reaching CCL. Without this stoppage, it was likely the user could've made the first 15 or so CCLs. Highest infamy classic suit: Royalty (150)",
		"This user was most likely the first CCL to achieve it without progression gamepasses or Robux-bought boosters.",
		];
		
		const playersData_ownDescription = [
		"I've been playing Notoriety since what I call the 'Golden Era', being before the 22 December 2017 revamp, more specifically since early September 2015, or possibly in August 2015 as I bought my first gamepass early next month. I achieved only a few infamy ranks at most, but I also completed feats like the badges Overdrill, Flawless and Big Bank - Stealth Master and 101 bags (vials) in Blood Money Death Wish solo using the Minigun and RPG. Most of my playtime of this era was in 2016. I always get nostalgic of this era of Notoriety, aka Heist, aka Payday 2. I have some old videos and screenshots of this era collecting dust on a hard drive somewhere."
		+ "<p></p>I almost entirely stopped playing after the Revamp Update, as it removed a lot of my favourite heists like World Bank, Blood Money, Fave Breakout and Shadow Raid (eventually rereleased). This is also why I didn't want to play the new Authority heist, out of protest against the revamp and due to the global data wipe. However, I played until I reached the maximum infamy rank of XXV (25) and obtained the True Criminal badge (which also required the Very Hard and Anarchy difficulties). Then I stopped playing for a while. In 2019, during the Live Ops event, I revisited the game, but didn't play any heists."
		+ "<p></p>Around the late 2020 era was when I was extremely active. I was first to complete Star Criminal and Baneful Criminal (the latter was done in solo in 89m54s). I was first to complete Resourceful Criminal in solo, without using glitches. I was one of the first to solo the Soul Collector badge on Nightmare using the Suit, and as the 420th or 421st player to obtain the badge. I was very likely the first player to full sweep Shadow Raid Nightmare 1,000 times. Around this era up until the very end of 2020, I was a dedicated contributor to the official Notoriety Wikia on Fandom, serving the community as an administrator and being the top contributor based on largest contributions (including info, page structure & site design), most edits and most badges & badge points (I no longer believe in badges, since it encourages badge farming)."
		+ "<p></p>One of the game's sub-communities was Notorious Professionals, a community collecting the best of Notoriety's players with its goal to be to help people hunt badges, achieve unofficial challenges and maintain the official Notoriety Wikia on Fandom. At the time this community had its own Roblox group and Discord server. Such unofficial challenges range from easy ones like doing a heist with a certain themed loadout (like the TF2 Engineer, using Sentry Guns), to extremely challenging ones like completing Shadow Raid Nightmare solo stealth with 75 detection risk and a full sweep, or Blood Money Nightmare solo with the most awfully designed build at the time (challenge Bad Mofo using the Bad Build). In this community I achieved the rank of True Professional, an achievement which at the time only two others (Chair and StormDestroyer) had achieved. The rate I had completed all the challenges (except True Gambler: Golden Mask Casino 75 detection risk solo stealth) impressed the server owner, sirowesome, as apparently they weren't supposed to be done in such a short timeframe (a couple of weeks at most?). I was also the first ever Notoriety player to reach 10 billion money (achieved 2020-11-08T04:00:~45Z) by grinding Shadow Raid Nightmare ECM rushing with a squad over and over) and Four Stores Nightmare solo stealth 75 detection risk pacifist with no equipment, pagers, hostages or kills. (However, I unfortunately messed up the run at the very end, partially out of excitement at being close to the end. I did, however, show off many tricks that were used by other players to do the same but with a full stealth run and in far less time.) These two achievements resulted in the creation of two bonus challenges."
		+ "<p></p>At the end of December 2020, in the Notoriety Wikia's Discord server, I unfairly muted, if I recall correctly, Berse. The wiki's bureaucrat (essentially Head Admin), Goder5555, privately asked me what was going on, and being a little intimidated by the bureaucrat I wasn't very clear in responding. The bureaucrat's perception was that I was being malicious and uncommunicative. I was warned that 'there would be consequences' if I did not undo the punishment, and then shortly later I was demoted from wiki administrator, blocked (banned) indefinitely (later reduced to 1 year) and stripped of my True Professional rank in Notorious Professionals' group and server (a little too far, in my opinion). Many users began leaving the wiki's server, including Goder. He posted a wiki announcement about what had happened and why I had been demoted and blocked. Apparently I 'refused to hand over ownership of the server' (paraphrasing), however I received no such requests; it was likely that this was only an assumption by Goder. A new wiki server was created, and the old one was eventually deleted months or years later after it had become extremely inactive. I admit now that it was definitely a massive mistake on my part to unfairly mute someone. This incident caused me to quit the entire game and its community for four years."
		+ "<p></p>In December 2024 I found out about the game's rerelease after being shut down for more than a year due to a DMCA strike by the same company which brought it back. I noticed the infamy cap had been raised from 25 (XXV) to 250 (CCL), and wanted to be the first CCL. I contemplated pressing that large, green play button for 43 hours, knowing that if I did I would get right back on the long grind train as I did back in 2018 and 2020. Eventually I gave in and started playing the rerelease as an XXV-100 with $10.5 billion money and more than 1,200 masks (well over the now-existent limit of 100). (I haven't opened a safe since around the 2019/2020 era.) I began the grind rather modestly, only doing a few infamies a day at most, eventually becoming around 8 to 10 hours a day on average. I reached infamy 100 (C) before the cap to infamy money requirement was added, knowing it would be added eventually. (The next infamy would've cost $390mil with the cheaper pass). Around this time or just before was when I realised I could reach CCL by the end of the year."
		+ "<p></p>Up until now I had been very quiet about my grind as I knew others had already made a lot more progress; I didn't want to alert the competition. They were trying to find out who was the new infamy 50 who appeared out of nowhere. It was around this time I made my explosive return to the game's Discord server, Moonstone Games, by posting my infamy 100 screenshot, ahead of the next highest player (Ali) by about 30 or 40 infamy ranks. It was around this time I joined a sub-community server called 'super cool elite grinding buddy ccl250 team cool', or the 'elite grinding server' for short, a server comprised of the most dedicated infamy grinders and the founding purpose was for a member to reach CCL. I grinded money in preparation of the introduction of the infamy money requirement cap (which made it $125mil without cheaper pass, $62.5mil with), ending up with around $3 or $4bil. Ali also reached infamy 100 by this time, and he went to 101 supposedly just to be the highest infamy in the game. He had around $10 or $15bil money at this point. I even adjusted my sleep pattern to make sure I would be wide wake when updates are typically released."
		+ "<p></p>During the money grind (Shadow Raid ECM rush as usual; specifically around the vault area) one of my teammates pointed out the infamy money requirement had just been added. Within 15 minutes of the update I immediately switched to exp farming (Authority) and started grinding HARD, frequently doing 16+ hours a day, occasionally 24 hours and I even once stayed awake for 48 hours (about 95% of this time spent grinding the game). I contributed to two Authority Nightmare co-op (both 4 players) world records before the introduction of the milliseconds timer, being 1m8s while half asleep and 1m7s unintentionally (not submitted). In a single day I completed Authority 500 times in a row, and I completed it 700 times in a row before switching to a different heist due to having to grind money. I grinded money for a bit more during the exp grind, and knew how much money I would need when factoring in passive gains from exp farming. However, what I didn't factor in was the extreme costs of hosting a contract (and consequent restarts after a win) (about $96mil loss per infamy when hosting or $28mil when not). I eventually realised, so I had to grind about another $1bil."
		+ "<p></p>At infamy 182 (CLXXXIII), level 86, being about 80 infamy ranks ahead of #2 (Ali hardly grinded at all), I was grinding exp on Authority with Ashlyn, NoobLol and Fridj. Around this time was when Derp reached infamy 150. I posted the message " + '"' + "the elite grinding server has too many femboys and more are being infected every day 💀"  + '"' + " in a private match where apparently no one would be offended by the word 'femboy'. (This message was referring to the high percentage of elite grinding server members being a femboy, the server where its activity eventually almost entirely consisted of roleplayers instead of grinders. Many grinders ended up leaving.) 53 seconds later, having just bagged Gold Bars from the crate in the shed, I received my first-ever moderation on the platform in nearly 11 years, despite everything I have been able to get away with in the past. A 1-day account suspension, of which my two appeals were auto-denied. I even tried to manipulate the AI, but failed."
		+ "<p></p>I got up early with minimal rest hoping that I would receive a response to my email appeal, but did not receive a response until the ban had expired, on the weekend in Roblox HQ's time no less. I believe that neither Ashlyn nor NoobLol would report me. According to the video that records the ban and the moments before it, Fridj took 10 seconds from when I posted the message (almost instantly after loading into the briefing screen) to ready up, stayed at spawn for a few moments and did not say anything for the entire heist. I am not sure how long he remained at spawn, but he did eventually contribute to the heist, starting 43s after posting the message when he was defusing a crate (according to the crew statuses at the bottom), or 18s after the heist started. Asking the user in Discord direct messages on 2025-04-13T05:38Z, a response was received 1 minute later: " + '"' + "i don't recall" + '"' + ". Forming a personality based on the limited DMs history and from own memory, it is likely the user had truly forgotten."
		+ "<p></p>I was very pissed off at this unfair punishment and Roblox's lack of care for appeals. I still really wanted to reach CCL before 2025, so I made a deal with Ashlyn to have exp and cash boosters bought and paid for. Specifically, the deal was a one-time payment of 2,200 Robux (I actually received extra, in a total of two digital gift cards), in exchange for my time and energy grinding with her until she reached CCL, something she really wanted. I did not specify any specific amount of grinding. This deal was made public (my idea) for trust purposes, being posted in #general of Moonstone Games and publicly agreed by both parties. Due to this ban I ended up not being able to reach CCL in 2024 in all time zones, so I aimed for the European and American time zones instead."
		+ "<p></p>At infamy 240 (CCXL), being probably 100+ infamy ranks ahead of everyone else, around 2024-12-31T20:19:35Z (CCXL obtainment time), I was grinding money (Shadow Raid ECM rush, unsurprisingly) with Derp and withwillin (who became CCLs #2 and #3, respectively). While running to the van my head began spinning. We finished that run and I told my teammates I would take a break and lie down for 5 minutes, only to pass out for 10 hours. I didn't even notice how long it had been until I saw the 'You have been disconnected for being idle 20 minutes' notice on my screen and checked the time. I wasn't too happy to find out how long it's been. I realised I could still reach CCL in 2024 in the last time zone on the planet, International Date Line West (UTC-12:00), or Anywhere on Earth."
		+ "<p></p>Shortly thereafter, I started the grind again and grinded Authority until 2025-01-01T10:04:35Z when I had officially become the first ever CCL and the first owner of the Rank 250 badge, with just under two hours remaining in 2024 in IDLW, 13 days, 22 hours, 45 minutes and 22 seconds since I started the rerelease (based on 'Jade's Finest' badge obtainment timestamp). Until CCL I had made about ~$20bil in total in my Notoriety career. I posted the screenshot in multiple servers (some of which I eventually left), including Moonstone Games and the elite grinding server, which received many reactions and congratulations, including by my former competitor Ali. I was the only CCL for more than 9.5 days until Derp became #2, followed closely by his duo withwillin. Aurora was significantly later, and just hours before the suit revamp. We became known as The Crimson Four (actually, this is a term I coined), as in the only four owners of the rarest non-developer item in the game, the Crimson suit. We eventually managed to coordinate a get-together where we all joined the same lobby and took screenshots of us wearing the Crimson suit and playing one heist: Jewelry Shop Normal, full sweep with loose loot and safes, everything destroyed, everyone murdered with their bodies in the van."
		+ "<p></p><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 at 2025-01-01T10-04-38Z.jpg'></div><div class='gallerytext'>CCL obtained!</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 Crimson suit reward 01.jpg'></div><div class='gallerytext'>The original 250 suit reward</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 Crimson suit reward 02.jpg'></div><div class='gallerytext'>The original 250 suit reward (part 2)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - All four Crimson suit owners in menu (2025-01-25T12-28-29Z).jpg'></div><div class='gallerytext'>All four OG Crimson suit owners on 2025-01-25T12:28:29Z.</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - Derpifi3d, withwillin101, Aurora_The1Cat lined up in heist (2025-01-25T12-30-00Z).jpg'></div><div class='gallerytext'>Three of the four OG Crimson suit owners lined up, as I took this screenshot. (2025-01-25T12:30:00Z)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - All four Crimson suit owners end of Jewelry Shop (2025-01-25T12-36-17Z).jpg'></div><div class='gallerytext'>We're going to need a bigger van... (2025-01-25T12:36:17Z)</div></li>"
		+ "</ul>",
		"The Beginning & The End: Derp’s Journey To CCL<br/>Estimated join date: Around 2020<br/>Estimate Time Of Obtainment: Friday January 10th, 2025, 7:05 PM EST<br/>2nd Person To Reach CCL | Second Owner Of Og Crimson"
		+ "<p></p><b>Pre-CCL Release</b><br/>“Yo, I found a new game, it’s pretty good”<br/>There it began, just a childhood friend and a goober, well precisely, 2 goobers. Man, I have not seen that shithead in a while, anyway honestly at first when I started Notoriety, I didn’t understand a single thing, it was super confusing, and I kept selling my friend on… erm… Jewelry shop….. ANYWAY, after getting the ropes of the game, I learnt RO-Bank, honestly it was super difficult as a beginner for some reason, and that's all the memory I had as a beginner really. After that, I got a pacifist badge a while after my friend departed, we really didn’t play much Notoriety together not gonna lie. Afterwards, I left my alt account, and a year later, I decided to give Notoriety a shot again. I forgot why, but I decided to play it, cause why not? After achieving infamy 9 or so, I decided to try getting shadow raid’s secret badge, Crystal Clear. Wednesday July 14th, 2021, 6:15 PM I joined a group of people that also wanted the badge. I met the main person of the group by chance, and there he was, the silly nerd and future online best friend of mine, Will. Shortly after obtaining the badge, my other close friend, Pixel kept wanting to voice call, and after spamming voice calls lots of times, the other two got sick of it and left, leaving just me and Will, and I cannot lie, I was lowkey going to leave too. But we eventually became friends and I grinded and reached XXV, it was a huge achievement for me at the time, and I was thrilled. I got XXV approximately 2 weeks after playing the game again. After a while, Will and I decided to go for every obtainable badge, which I ended up doing alongside Will, though I didn’t get the headhunter nor the baneful criminal badge. Man I forgot how agonizing the pain was, getting billionaire without gamepasses, and having repeat penalties. After billionaire, things pretty much died down, me and Will kinda went on hiatus and didn’t play much. I went on hiatus AT THE WORST TIME BRO, THE MONTHLY CHALLENGES I MISSED NOOOOOOOOOOOOO."
		+ "<p></p><b>Journey to CCL & Notoriety’s Rerelease</b><br>After playing some games with Will and being bored out of our minds due to lack of good games and content, we just finished block tales and stuff. Notoriety finally re-released! AND… we didn’t do much for the first week, Will was being bodied by homework, and I had massive (no low taper fade meme) projects due. Since both of us were busy, we didn’t play at all really for the first week. Once winter break started, we started grinding, nonoptimal of course, we were mainly doing tomfoolery as one may say, and I made a group of 4 friends of mine, including Will that was grinding brick bank and rush hour. Me and Will were basically training them at speedrunning etc since they were new to Notoriety but learnt very quickly. After a few Ozela runs and rush hour runs, we heard some Infamy 100 dude’s advice, and that is, authority is the most optimal method of gaining xp. Honestly, my jaw dropped when I heard some SWEAT was already 100! (Also jaw dropping when I saw some sweat like Aimilized, who at the time was also around Infamy 100), But quickly adopted his strategy and joined his lobbies to quickly reach 250, originally, I planned to be around top 20 or so to 250, I figured there are a bunch of sweats like Seal, and I was shocked after the grueling amounts of Shadow Raid cash grind and Authority XP grind. But finally, on approximately Friday January 10th, 2025, 7:05 PM, I reached CCL, the suit was lowkey disappointing but it became exclusive so I’m not complaining. Andddddddd “wondering how we should make to obtain the classic suits, dont like that theyre fomo rn” anddd my day is ruined I am ending it all, Rendhy plans on making Og Crimson obtainable to the public, I am in tears of agony. Totally not exaggerated."
		+ "<p></p><b>Post CCL Short Story</b><br/>“Touch grass” “Bro is allergic to soap”<br/>FU-<br/>Man… stop harassing me bro :sob: I do shower!!!<p></p>Oh, and my friend Will got CCL like I forgot, but probably 5 hours after me, making him the third CCL",
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		"i knew about notoriety for a very long time, and i did try it out for a bit, but ended up stopping (couldn't tell you why, i have basically no memory of it other than when i started playing again, i was level 8 and had like 50k in cash)"
		+ "<p></p>i played payday 2 on and off for years (on console, wasn't much of a pc gamer at the time). eventually moved onto other games. never played payday: the heist or anything, but i did enjoy payday 2"
		+ "<p></p>i picked up notoriety again at the 31st of december 2024, since i heard about it being reopened. started off just playing casually for a bit, then i wanted to complete every heist on every difficulty and every tactic (to fill out the heist tracker)"
		+ "<p></p>i then moved onto badges, which i got those pretty quickly (pied piper sucks lmao)"
		+ "<p></p>somewhere around early january this year, i decided to go for CCL, but i didn't really want to grind it by doing the same heists over and over for max efficiency"
		+ "<p></p>so i got to CCL by mostly playing public lobbies, helping others with badges and nightmare. mixed in some solo stealth too (mostly ozela)"
		+ "<p></p>i hit CCL at the 16th of february 2025 just after 2:40 a.m",
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		"I first played Notoriety in the year 2020. In late July of 2022, I discovered the game again because my sister and a friend of mine had asked me to play. I quickly got the hang of it, and in 30 days I had gotten both XXV-100 and True Criminal."
		+ "<p></p>During that time I also joined Moonstone Games, where I am still active. The fall of that year, I became interested in endurance challenges for Notoriety. To my knowledge, we were the first to ever get 200 bags on Trick or Treat (Red, Toxic, Myself and Jon) , and the first to get 200 vials on Blood Money (Myself and LuboMontana). We also attempted 1.000 bags on ToT multiple times, but we were not able to do it at that time. After the DMCA takedown, I remained active in the community until the re-release."
		+ "<p></p>After that, I got invested into getting more infamies and playing more, and I was the second ever member of Pho's ECM Rushing server, where I am also active to this day and rank relatively highly in, being an active ECM Rusher and having gotten most of my infamies in. By 31/12/2024 I was infamy 100, then by 16/01/2025 150, and then infamy 200 on the 07/02/2025."
		+ "<p></p>Two days later, myself and the same people that attempted 1.000 bags in ToT before the DMCA takedown, smashed that limit and managed to get 3.000 bags, being the first and only to do thus far. It took us almost 16 hours. After I got to Infamy 225, I took a nearly 2 month long hiatus. I got to CCL on 11/04/2025, having gotten my last 100 levels in an infamy rotation.",
		undefined,
		];
		
		for (var x = 0; x < countCCLs; x++) {
			players.push(new Player());
			if (playersData_usernames[x] == undefined) {
				players[x].username = undefined;
			} else {
				players[x].username = playersData_usernames[x];
			}
			console.log(playersData_usernames[x]);
			
			if (playersData_displayNames[x] == undefined) {
				players[x].displayName = undefined;
			} else {
				players[x].displayName = playersData_displayNames[x];
			}
			
			if (playersData_robloxAvatars[x] == undefined) {
				players[x].robloxAvatar = undefined;
			} else {
				players[x].robloxAvatar = playersData_robloxAvatars[x];
			}
			
			if (playersData_whenCCL[x] == undefined) {
				players[x].whenCCL = undefined;
			} else {
				players[x].whenCCL = playersData_whenCCL[x];
			}
			
			if (playersData_timeSincePrevious[x] == undefined) {
				players[x].timeSincePrevious = undefined;
			} else {
				players[x].timeSincePrevious = playersData_timeSincePrevious[x];
			}
			
			if (playersData_positions[x] == undefined) {
				players[x].position = undefined;
			} else {
				players[x].position = playersData_positions[x];
			}
			
			if (playersData_notes[x] == undefined) {
				players[x].notes = undefined;
			} else {
				players[x].notes = playersData_notes[x];
			}
			
			if (playersData_ownDescription[x] == undefined) {
				players[x].ownDescription = undefined;
			} else {
				players[x].ownDescription = playersData_ownDescription[x];
			}
		}
		
		// Crimson: 128,0,0
		// Rojo: 220,20,60
		// Royalty: 106,50,159
		// Blue Navy: 7,55,99
		
		function playerHTML(input, backgroundRGB) {
			var output = "";
			if (backgroundRGB == undefined) {
				output += "<td class='NotorietyEXPCalculator_HallofInfamyCCLsPlayer'>";
			} else {
				output += "<td class='NotorietyEXPCalculator_HallofInfamyCCLsPlayer' style='background:rgba(" + backgroundRGB + ",var(--bg-alpha))'>";
			}
			
			output += "<div class='ImageTextContainer'>";
			
			if (input.robloxAvatar != undefined) {
				output += "<img src='./Notoriety EXP Calculator/Assets/CCL Roblox avatars/" + input.robloxAvatar + "' style='width:10em;float:left'/>";
			}
			
			output += "<div class='CellText'>";
			
			if (input.position != undefined) {
				output += '[#' + input.position.toLocaleString() + '] ';
			}
			
			output += "<b>";
			if (input.username == undefined /*"T4x_Ev4der"*/) {
				output += '<i>--(This display name cannot be placed here)--</i>';
			} else {
				output += input.displayName;
			}
			output += " (<a href='https://www.roblox.com/users/profile?username=" + input.username + "'>@" + input.username + "</a></b>)";
			
			output += "<p style='font-size:80%'>";
			if (input.whenCCL != undefined) {
				const orig = input.whenCCL;
				output += "Badge obtained: ";
				if (typeof orig.timestamp == 'object') {
					output += 'between ';
					output += formatDate(new Date(orig.timestamp[0]), "yyyy-MM-dd HH:mm:ss", false);
					output += ' to ';
					output += formatDate(new Date(orig.timestamp[1]), "yyyy-MM-dd HH:mm:ss", false);
				} else {
					output += formatDate(new Date(orig.timestamp), "yyyy-MM-dd HH:mm:ss", false);
				}
				if (orig.approx != false) {
					if (orig.approx == true) {
						output += " <small>(approximately)</small>";
					} else {
						output += " <small>(approximately: " + orig.approx + ")</small>";
					}
				}
			}
			
			const timeOutput = new Timer();
			if (data.toggleTimeOutputFormat_Global == undefined) {
				data.toggleTimeOutputFormat_Global = 1;
			}
			timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(data.toggleTimeOutputFormat_Global)];
			
			if (input.timeSincePrevious != undefined) {
				const orig = input.timeSincePrevious;
				if (input.timeSincePrevious.seconds !=  false) {
					output += "<br>Time since previous: ";
					if (typeof orig.seconds == 'object') {
						output += 'between ';
						timeOutput.amount = orig.seconds[0] * 1e3;
						output += timeOutput.formatAmount();
						output += ' to ';
						timeOutput.amount = orig.seconds[1] * 1e3;
						output += timeOutput.formatAmount();
					} else {
						timeOutput.amount = orig.seconds * 1e3;
						output += timeOutput.formatAmount();
					}
					if (orig.approx != false) {
						if (orig.approx == true) {
							output += " <small>(approximately)</small>";
						} else {
							output += " <small>(approximately: " + orig.approx + ")</small>";
						}
					}
					
					if (input.position != undefined) {
						output += "<br>Average time apart: "
						if (typeof input.whenCCL.timestamp == 'object') {
							output += 'between ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[0]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
							console.log(timeOutput.formatAmount());
							output += ' to ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[1]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
							console.log(timeOutput.formatAmount());
						} else {
							timeOutput.amount = (new Date(input.whenCCL.timestamp).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
						}
					}
				}
			}
			
			output += '</p>';
			
			if (input.notes != undefined) {
				output += "<p>" + input.notes + "</p>";
			}
			
			if (input.ownDescription != undefined) {
				output += "<p></p><b id='NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionToggle_" + input.username + "'>User-written description (toggle):</b><br><div id='NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionContainer_" + input.username + "' style='display:none'>" + input.ownDescription + "</div>";
				ownDescriptionButtons.push("NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionToggle_" + input.username);
				ownDescriptionContainers.push("NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionContainer_" + input.username);
			}
			
			output += "</div></div></td><tr/>";
			
			return output;
		}
		string += "<p><table style='margin:auto;width:100%'>";
		string += "<hr/><h3 style='text-align:center'>The Crimson Four</h3>";
		for (var x = 0; x < 4; x++) {
			string += playerHTML(players[x], '128,0,0');
		}
		string += "</table></p>";
		
		string += "<p><table style='margin:auto;width:100%'>";
		string += "<h3 style='text-align:center'>Post-suits revamp (" + formatDate(new Date("2025-01-17T20:00Z"), "yyyy-MM-dd HH:mm:ss", false) + ") CCLs</h3>";
		for (var x = 0; x < (countCCLs - 4); x++) {
			if (["seroly2345"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '220,20,60');
			} else if (["theREALdynamic", "bigfootbb045", "LuvlyGirlMaisy", "Aimilized"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '106,50,159');
			} else if (["ARandomNoobGamer", "cl3rical"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '7,55,99');
			} else {
				string += playerHTML(players[x + 4]);
			}
		}
		string += "</table></p>";
		elem.SectionContainer_HallofInfamyCCLs.innerHTML = string;
		
		function makeDescButtonWork(id) {
			document.getElementById(id).style.display == 'none' ? document.getElementById(id).style.display = 'block' : document.getElementById(id).style.display = 'none';
		}
		
		for (var x = 0; x < ownDescriptionButtons.length; x++) {
			document.getElementById(ownDescriptionButtons[x]).addEventListener('click', function() {
				makeDescButtonWork(ownDescriptionContainers[ownDescriptionButtons.indexOf(this.id)]);
			});
		}
	}
	addHallofInfamyCCLs();
	
	function addUpdateLogs() {
	    function updateLogEntry(type, string, isVersion) {
	        if (isVersion === undefined) {
	            isVersion = false;
	        }
	        var output = '';
	        if (isVersion === false) {
	            output += '<li>';
	            switch (type) {
	                case 'add':
	                    output += "<span class='ULAdd'>+</span> ";
	                    break;
	                case 'edit':
	                    output += "<span class='ULChange'>*</span> ";
	                    break;
	                case 'remove':
	                    output += "<span class='ULRemove'>-</span> ";
	                    break;
	                case 'fix':
	                    output += "<span class='ULFix'>^</span> ";
	                    break;
	                case 'other':
	                    output += "<span class='ULOther'>?</span> ";
	            }
	            output += string + '</li>';
	        }
	        if (string === undefined) {
	            output = '';
	        }
	        return output;
	    }
	    var theLogs = `<b>Legend:</b><p>
		<ul>
			${updateLogEntry('add', 'Addition of something')}
			${updateLogEntry('edit', 'Edit of a feature')}
			${updateLogEntry('remove', 'Removal of something')}
			${updateLogEntry('fix', 'Patch of a problem')}
			${updateLogEntry('other', 'Other')}
		Major tool versions are <u>underlined</u>.
		<p/>
		Estimated total active development time across all versions: ~46 hours.
		<p/>
		Some features of this tool are copied from my other tools, including an extremely developed tool that has seen hundreds of hours of active development time yet hasn't seen the light of day with a release.
		</ul>
		</p>
		<hr/>
		<p>
		<b><u>[2025-04-13 08:20] Version 0.0.1</u></b>
		<ul>
			${updateLogEntry('other', "Testers: ashvul (did not test), nate247, player6978.")}
			${updateLogEntry('other', "Estimated active development time: ~6 hours.")}
		</ul></p>
		<b>[Testing] <u>Version Indev</u></b>
		<ul>
			${updateLogEntry('add', "Added everything else. (A lot!)")}
			${updateLogEntry('other', "Estimated active development time: ~40 hours over about 10 weeks.")}
		</ul></p>
		<hr/>
		</ul>`
		
		elem.SectionContainer_UpdateLogs.innerHTML = theLogs;
	}
	addUpdateLogs();

	function getRotationInput(input) {
		const runLog = [];
		var test_a = input;
	    var extraTime = new Decimal(0), returnsToMenu = new Decimal(0), includedRuns = new Decimal(0), excludedRuns = new Decimal(0);

	    function getNextLine(index) {
	        function Run(money, exp, mxp, time) {
	            this.money = money;
	            this.exp = exp;
				this.mxp = mxp;
	            this.time = time;
	        }
	        if (test_a.match(/EXCL?(?=[=])/) != null || test_a.match(/MENU?(?=[(])/) != null) {
	            if (test_a.match(/EXCL?(?=[=])/) != null) {
	                test_a = test_a.replace(/EXCL[=]/, '');
					excludedRuns = excludedRuns.add(1);
	            } else if (test_a.match(/MENU?(?=[(])/) != null) {
	                test_a = test_a.replace(/MENU[(]/, '');
	                extraTime = extraTime.add(Number(test_a.match(/.+?(?=[)])/)[0].replace(/[)]/, '')));
	                test_a = test_a.replace(/.+?(?=[)])[)]/, '');
					returnsToMenu = returnsToMenu.add(1);
	            }
	        } else {
	            const x = new Run();
				switch (data.toggleComputationType_Global) {
					case 0:
						x.money = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.exp = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
						break;
					case 1:
						x.mxp = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
				}
	            runLog.push(x);
				includedRuns = includedRuns.add(1);
	        }

	    }
	    var i = 0;
	    while (test_a != '') {
			if (test_a.match(/[|]/) != null) {
				getNextLine(i);
				i++;
			} else {
				test_a = '';
			}
	    }
		return {runLog:runLog, extraTime:extraTime, returnsToMenu:returnsToMenu, includedRuns:includedRuns, excludedRuns:excludedRuns};
	}
	function interpretRotationInput(input) {
		function Totals(money, exp, mxp, time, extraTime) {
			this.money = new Decimal(0);
			this.exp = new Decimal(0);
			this.mxp = new Decimal(0);
			this.time = new Decimal(0);
			this.extraTime = new Decimal(0);
			this.returnsToMenu = new Decimal(0);
			this.includedRuns = new Decimal(0);
			this.excludedRuns = new Decimal(0);
		}
		const result = new Totals();
		for (var x = 0; x < input.runLog.length; x++) {
			result.money = result.money.add(input.runLog[x].money);
			result.exp = result.exp.add(input.runLog[x].exp);
			result.mxp = result.mxp.add(input.runLog[x].mxp);
			result.time = result.time.add(input.runLog[x].time);
		}
		result.extraTime = result.extraTime.add(input.extraTime);
		result.returnsToMenu = result.returnsToMenu.add(input.returnsToMenu);
		result.includedRuns = result.includedRuns.add(input.includedRuns);
		result.excludedRuns = result.excludedRuns.add(input.excludedRuns);
		return result;
	}
	
	data = {
		currentLevel: new Decimal(1),
		remainingEXP: new Decimal(0),
		goalLevel: new Decimal(100),
		currentInfamyLevel: new Decimal(0),
		goalInfamyLevel: new Decimal(1),
		moneyLoss: new Decimal(0),
		currentMoney: new Decimal(0),
		currentMutatorRank: new Decimal(0),
		remainingMXP: new Decimal(0),
		goalMutatorRank: new Decimal(1),
		untilMXPUsage: new Decimal(0),
		
		toggleInputSliders_Global: 1,
		toggleRomanNumerals_Global: 1,
		toggleInputExplanations_Global: 1,
		toggleComputationType_Global: 0,
		toggleInfiniteInfamies_Global: 0,
		toggleAutoCalculate_Global: 0,
		toggleTimeOutputFormat_Global: 1,
		
		untilOutOfMoneyCheck: 0,
		cheaperPassCheck: 0,
		preMoneyCapCheck: 0,
		rotationInputTotals: function(a) {return interpretRotationInput(getRotationInput(a))},
	};

	const styleSheet_Global = document.createElement('style');
	document.head.appendChild(styleSheet_Global);

	function addGlobalStyling(input, deleteExisting) {
		if (deleteExisting != false) {
			while (styleSheet_Global.sheet.rules.length > 0) {
				styleSheet_Global.sheet.deleteRule(0);
			}
		}
		styleSheet_Global.sheet.insertRule(input)
	}
	
	const menuIDs = ['NotorietyEXPandInfamyCalculator_MenuContainer_Calculator', 'NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous'];
	const menuButtonIDs = ['NotorietyEXPCalculatorMenuButton_Calculator', 'NotorietyEXPCalculatorMenuButton_Miscellaneous'];
	
	// make menu buttons work
	function hideAllMenus() {
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Calculator').style.display = 'none';
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous').style.display = 'none';
	}
	
	function switchMenuToThis(input) {
		hideAllMenus();
		document.getElementById(menuIDs[menuButtonIDs.indexOf(input)]).style.display = '';
	}
	switchMenuToThis(menuButtonIDs[0]);
	
	(function() {
		const orig = document.getElementById('NotorietyEXPandInfamyCalculator_MenuButtons');
		
		const menuButton_Calculator = document.createElement('button');
		const menuButton_Miscellaneous = document.createElement('button');
		const buttons = [menuButton_Calculator, menuButton_Miscellaneous];
		buttons[0].innerHTML = "<span style='color:rgba(255,255,255,var(--bg-alpha));font-weight:bold'>Calculator</span>";
		buttons[1].innerHTML = "<span style='color:rgba(255,255,255,var(--bg-alpha));font-weight:bold'>Miscellaneous</span>";
		for (var x = 0; x < buttons.length; x++) {
			buttons[x].setAttribute('class', 'NotorietyEXPCalculatorButton NotorietyEXPCalculatorMenuButton');
			buttons[x].setAttribute('id', menuButtonIDs[x]);
			orig.appendChild(buttons[x]);
			buttons[x].addEventListener('click', function() {
				switchMenuToThis(this.id);
			});
		}
	}());

	function updateSettingsDisplayedValues() {
		data.currentLevel = new Decimal(elem.currentLevelInput.value).floor().max(new Decimal(1).min(100));
		data.remainingEXP = new Decimal(elem.remainingEXPInput.value).floor().max(new Decimal(0).min(999999));
		data.goalLevel = new Decimal(elem.goalLevelInput.value).floor().max(new Decimal(0).min(100));
		data.currentInfamyLevel = new Decimal(elem.currentInfamyLevelInput.value).floor().max(new Decimal(0).min(elem.currentInfamyLevelInput.value));
		data.goalInfamyLevel = new Decimal(elem.goalInfamyLevelInput.value).floor().max(new Decimal(0).min(elem.goalInfamyLevelInput.value));
		data.currentMoney = new Decimal(elem.currentMoneyInput.value).floor().max(0);
		
		data.currentMutatorRank = new Decimal(elem.currentMutatorRankInput.value);
		data.goalMutatorRank = new Decimal(elem.goalMutatorRankInput.value);
		data.remainingMXP = new Decimal(elem.remainingMXPInput.value);
		data.untilMXPUsage = new Decimal(elem.untilMXPUsageInput.value);
		
		elem.currentLevelInputResult.innerHTML = data.currentLevel;
		elem.remainingEXPInputResult.innerHTML = data.remainingEXP;
		elem.goalLevelInputResult.innerHTML = data.goalLevel;
		elem.currentInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.currentInfamyLevel, data.currentInfamyLevel, data.toggleRomanNumerals_Global, false);
		elem.goalInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.goalInfamyLevel, data.goalInfamyLevel, data.toggleRomanNumerals_Global, false);
		
		(function() {
			
			const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck];
			const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck'];
			for (var x = 0; x < elems.length; x++) {
				if (data[elems_DataRefs[x]] == 1) {
					elems[x].classList.remove('SwitchButtonDisabled');
					elems[x].classList.add('SwitchButtonEnabled');
				} else {
					elems[x].classList.remove('SwitchButtonEnabled');
					elems[x].classList.add('SwitchButtonDisabled');
				}
			}
		}());
		
		if (data.toggleInputExplanations_Global == 1) {
			addGlobalStyling(".NotorietyEXPandInfamyCalculator_InputExplanation { }", true);
		} else {
			addGlobalStyling(".NotorietyEXPandInfamyCalculator_InputExplanation { display:none }", true);
		}
		
		function hideAllSections() {
			elem.toggleInfiniteInfamies_Global_Container.style.display = 'none';
			
			elem.Section_LevelSettings.style.display = 'none';
			elem.Section_MutatorRankSettings.style.display = 'none';
			elem.Section_InfamySettings.style.display = 'none';
		}
		hideAllSections();
		
		var runGainsInput_InputExplanation_Text = '<br>';
		runGainsInput_InputExplanation_Text += '(One run per line. One rotation for the entire input. Begin a line with <code>EXCL=</code> to exclude it from the calculations entirely. Time can be added to the calculations by using <code>MENU</code>. For instance, a line containing only the text <code>MENU(85)</code> means 85 seconds spent in menu, loading or otherwise not in a run. While it is possible to use this line after each run, it is instead recommended to already factor in loading times in the times of each run, as doing so will reduce the amount of computations the tool needs to perform. <b>Factor in repeat bonus</b>, as each line is equal to one run.';
		switch (data.toggleComputationType_Global) {
			case 0:
				elem.toggleInfiniteInfamies_Global_Container.style.display = '';
				elem.Section_LevelSettings.style.display = '';
				elem.Section_InfamySettings.style.display = '';
				
				elem.runGainsInput.placeholder = 'Money|EXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n3,250,700|842,500|170\n2580715|948048|155\n2600750|405725|162';
				runGainsInput_InputExplanation_Text += ' Money, EXP and Time values will be averaged based on all included runs, and then these averages will be used for computations. If you know exactly which particular runs are needed for each infamy, it is heavily recommended to input them.';
				break;
			case 1:
				elem.Section_MutatorRankSettings.style.display = '';
				if (data.toggleInfiniteInfamies_Global == 1) {
					elem.toggleInfiniteInfamies_Global.click();
				}
				
				elem.runGainsInput.placeholder = 'MXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n8,500|170\n4048|155\n5725|162';
				runGainsInput_InputExplanation_Text += ' MXP and Time values will be averaged based on all included runs, and then these averages will be used for computations.';
		}
		
		runGainsInput_InputExplanation_Text += ' While commas can be included in numbers, <b>do not include suffixed numbers</b> such as 1M.';
		
		elem.runGainsInput_InputExplanation.innerHTML = runGainsInput_InputExplanation_Text;
		
		if (data.toggleInfiniteInfamies_Global == 1) {
			elem.currentInfamyLevelInput.max = 'Infinity';
			elem.goalInfamyLevelInput.max = 'Infinity';
		} else {
			elem.currentInfamyLevelInput.max = '250';
			elem.goalInfamyLevelInput.max = '250';
		}
	}
	updateSettingsDisplayedValues();
	
	elem.SectionContainerToggle_InfamySettings.addEventListener('click', function() {
		elem.SectionContainer_InfamySettings.style.display = elem.SectionContainer_InfamySettings.style.display == 'block' ? 'none' : 'block'
		if (elem.SectionContainer_InfamySettings.style.display == 'none') {
			elem.currentInfamyLevelInput.value = 0;
			elem.goalInfamyLevelInput.value = 0;
			elem.currentMoneyInput.value = 0;
		}
		computeBeepBoop();
	});
	
	elem.SectionContainerToggle_UpdateLogs.addEventListener('click', function() {
		elem.SectionContainer_UpdateLogs.style.display = elem.SectionContainer_UpdateLogs.style.display == 'block' ? 'none' : 'block'
	});
	
	elem.SectionContainerToggle_HallofInfamyCCLs.addEventListener('click', function() {
		elem.SectionContainer_HallofInfamyCCLs.style.display = elem.SectionContainer_HallofInfamyCCLs.style.display == 'block' ? 'none' : 'block'
	});
	
	// --------------------
	// Add listeners to toggles
	(function() {
		elem.toggleInputSliders_Global.addEventListener('click', function() {
			data.toggleInputSliders_Global = data.toggleInputSliders_Global == 0 ? 1 : 0
			this.innerHTML = ['Input method: Manual inputs', 'Input method: Sliders'][Number(data.toggleInputSliders_Global)];
			const sliderElems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput];
			for (var x = 0; x < sliderElems.length; x++) {
				sliderElems[x].type = data.toggleInputSliders_Global == 1 ? 'range' : '';
			}
		});
		
		elem.toggleRomanNumerals_Global.addEventListener('click', function() {
			data.toggleRomanNumerals_Global = data.toggleRomanNumerals_Global == 0 ? 1 : 0
			this.innerHTML = ['Roman numerals: OFF', 'Roman numerals: ON'][Number(data.toggleRomanNumerals_Global)];
			updateSettingsDisplayedValues()
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
		
		elem.toggleAutoCalculate_Global.addEventListener('click', function() {
			data.toggleAutoCalculate_Global = data.toggleAutoCalculate_Global == 0 ? 1 : 0
			this.innerHTML = ['Auto calculate: OFF', 'Auto calculate: ON'][Number(data.toggleAutoCalculate_Global)];
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
		
		elem.toggleInputExplanations_Global.addEventListener('click', function() {
			data.toggleInputExplanations_Global = data.toggleInputExplanations_Global == 0 ? 1 : 0
			this.innerHTML = ['Input explanations: Hidden', 'Input explanations: Visible'][Number(data.toggleInputExplanations_Global)];
			updateSettingsDisplayedValues();
		});
		
		elem.toggleComputationType_Global.addEventListener('click', function() {
			elem.runGainsInput.value = '';
			switch (data.toggleComputationType_Global) {
				case 0:
					data.toggleComputationType_Global = 1;
					break;
				case 1:
					data.toggleComputationType_Global = 0;
			}
			this.innerHTML = 'Computing: ' + ['EXP, Levels & Infamy', 'MXP & Mutator Ranks'][Number(data.toggleComputationType_Global)];
			updateSettingsDisplayedValues();
			computeBeepBoop();
		});
		
		elem.toggleInfiniteInfamies_Global.addEventListener('click', function() {
			data.toggleInfiniteInfamies_Global = data.toggleInfiniteInfamies_Global == 0 ? 1 : 0
			this.innerHTML = ['Maximum infamies: 250', 'Maximum infamies: Unlimited (Disable input sliders)'][Number(data.toggleInfiniteInfamies_Global)];
			updateSettingsDisplayedValues();
		});
		
		elem.toggleTimeOutputFormat_Global.addEventListener('click', function() {
			switch (data.toggleTimeOutputFormat_Global) {
				case 0:
					data.toggleTimeOutputFormat_Global = 1;
					break;
				case 1:
					data.toggleTimeOutputFormat_Global = 2;
					break;
				case 2:
					data.toggleTimeOutputFormat_Global = 3;
					break;
				case 3:
					data.toggleTimeOutputFormat_Global = 0;
			}
			this.innerHTML = 'Time output format: ' + ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(data.toggleTimeOutputFormat_Global)];
			updateSettingsDisplayedValues();
			addHallofInfamyCCLs();
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
	}());
	
	// settings checkboxes event listeners
	(function() {
		const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck];
		const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck'];
		for (var x = 0; x < elems.length; x++) {
			const y = elems[x];
			y.value = data[elems_DataRefs[x]];
			y.addEventListener('click', function() {
				data[elems_DataRefs[elems.indexOf(y)]] = data[elems_DataRefs[elems.indexOf(y)]] == 0 ? 1 : 0
				this.innerHTML = ['[N]', '[Y]'][Number(data[elems_DataRefs[elems.indexOf(y)]])];	
				updateSettingsDisplayedValues();
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
				
				if (y.id == elem.untilOutOfMoneyCheck.id) {
					if (data.untilOutOfMoneyCheck == 1) {
						elem.goalInfamyLevelInput.style.display = 'none';
						elem.goalInfamyLevelInputResult.style.display = 'none';
					} else {
						elem.goalInfamyLevelInput.style.display = '';
						elem.goalInfamyLevelInputResult.style.display = '';
					}
				}
			});
		}
	}());
	
	// settings visual display event listeners
	(function() {
		const elems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('input', function() {
				updateSettingsDisplayedValues()
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings inputs event listeners
	(function() {
		const elems = [elem.currentMoneyInput];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('input', function() {
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings textarea inputs event listeners
	(function() {
		const elems = [elem.runGainsInput];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('blur', function() {
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// This function used to use its own formatting logic, however now it simply invokes notateInt, after ensuring the tool uses the Break Eternity decimal library.
	function formatInt(input) {
		return notateInt(input);
	}
	
	function computeBeepBoop() {
		updateSettingsDisplayedValues();
		
		var disclaimerText = '';
		switch (data.toggleComputationType_Global) {
			case 0:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher infamy ranks contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Additionally, the EXP result may be inaccurate by up to about <code>1</code> per level due to inconsistency regarding how the game rounds numbers. This tool assumes this value: <code>27,181,253</code> (calculated by summing <code>x = 1, floor(x*1018.93+x^2.976664), until x = 100</code>). Also, with 'Until out of money' enabled, the tool does not carry over superfluous EXP after each infamy, so the actual runs/rotations needed may be slightly less. The runs/rotations required result is always rounded up (consequently affecting playtime as well). If the average money gains per infamy is greater than or equal to the capped cost (with the pre-money requirement limit setting disabled), the result will be infinite. Lastly, the maximum passive infamies is <code>1,000,000</code> for performance reasons.)";
				break;
			case 1:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher Mutator Ranks and 'Until MXP usage' values contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Also, with 'Until MXP usage' defined, the tool does not carry over superfluous MXP after each rank, so the actual runs/rotations needed may be slightly less. The formula to determine MXP requirement from the current rank (x) for the next rank is <code>5000 + (x ** 1.25)</code>, which is then rounded down for each rank. The runs/rotations required result is always rounded up (consequently affecting playtime as well). Lastly, there is a limit of <code>1,000,000,000,000</code> Mutator Ranks for performance reasons." + ')';
		}
		elem.resultsDisclaimer.innerHTML = disclaimerText;
		var outputString = '';
		var totalExpReq = new Decimal(0);
		var totalMxpReq = new Decimal(0);
		const testingFalsy = false;
		const rotationInputsCalculated = data.rotationInputTotals(elem.runGainsInput.value)
		var forEXPOnlyNote = false;
		
		
		const avgTime = rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).dividedBy(rotationInputsCalculated.includedRuns);
		const avgTimeOutput = new Timer();
		avgTimeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
		avgTimeOutput.amount = avgTime.times(1e3);
		switch (data.toggleComputationType_Global) {
			case 0:
				var avgExpGains = rotationInputsCalculated.exp.dividedBy(rotationInputsCalculated.includedRuns);
				var infamyRunsReq = NotoExpReqTotal(1, 100).dividedBy(avgExpGains);
				var avgMoneyGains = (rotationInputsCalculated.money.dividedBy(rotationInputsCalculated.includedRuns)).times(infamyRunsReq);
				if (data.currentInfamyLevel.equals(0) && data.goalInfamyLevel.equals(0)) {
				var levelDiff = data.goalLevel.sub(data.currentLevel).abs();
				totalExpReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.max(data.goalLevel));
				if (data.remainingEXP.notEquals(0)) {
					var nextLevelReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
					totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
				}
				outputString += "To go from Level " + formatInt(data.currentLevel) + " to " + formatInt(data.goalLevel) + ", the following is required:";
				outputString += '<br>• ' + formatInt(totalExpReq) + ' EXP (' + levelDiff.valueOf() + checkPlural(levelDiff, ' level', ' levels') + ')';
				} else if (data.untilOutOfMoneyCheck == 1 && data.currentInfamyLevel.greaterThan(0)) {
					const calcPoorOutput = calcInfamiesUntilPoor(data.currentInfamyLevel, [data.currentMoney, avgMoneyGains]);
					
					if (calcPoorOutput.infsWithPassive.greaterThan(0)) {
						totalExpReq = totalExpReq.add(NotoExpReqTotal(data.currentLevel, 100));
						if (calcPoorOutput.infsWithPassive.greaterThan(1)) {
							totalExpReq = totalExpReq.add(NotoExpReqTotal(1, 100).times(calcPoorOutput.infsWithPassive.sub(1)));
						}
					}
					outputString += "At Infamy " + toRomanWithSeparator(data.currentInfamyLevel, '', data.toggleRomanNumerals_Global && data.currentInfamyLevel.greaterThan(0), false /*data.currentInfamyLevel > 0*/) + " with currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + '</span> and average gains of ' + formatInt(avgExpGains) + " EXP per run and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(avgMoneyGains) + '</span> per infamy (based on runs required for enough exp), the following can be achieved:';
					outputString += '<br>• Infamies: ' + formatInt(calcPoorOutput.infs) + ' (passive: ' + formatInt(calcPoorOutput.passiveInfs) + ' | total: ' + formatInt(calcPoorOutput.infsWithPassive) + ')';
					outputString += '<br>• Reach Infamy ' + toRomanWithSeparator(data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive), '', data.toggleRomanNumerals_Global && (data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive)).greaterThan(0), false /*data.currentInfamyLevel > 0*/) + ' for totals of <b>' + formatInt(totalExpReq) + "</b> EXP and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.totalCostWithPassive) + "</span> (leftover: <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.remainingMoney) + '</span>)';
				} else {
					outputString += "To go from Level " + toRomanWithSeparator(data.currentInfamyLevel, data.currentLevel, data.toggleRomanNumerals_Global && data.currentInfamyLevel.greaterThan(0), true /*data.currentInfamyLevel > 0*/) + ' to ' + toRomanWithSeparator(data.goalInfamyLevel, data.goalLevel, data.toggleRomanNumerals_Global && data.goalInfamyLevel.greaterThan(0), true /*data.goalInfamyLevel > 0*/);
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += "assuming average gains of " + formatInt(avgExpGains) + " EXP and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run"
					}
					outputString += ', the following are required:';
					var currentLevel_Temp = data.currentLevel, goalLevel_Temp = data.goalLevel;
					var infamyLevelDiff = data.goalInfamyLevel.sub(data.currentInfamyLevel).abs();
					if (infamyLevelDiff.greaterThan(0)) {
						// gets exp req to very next infamy
						totalExpReq = totalExpReq.add(NotoExpReqTotal(data.currentLevel, 100));
						
						// last infamy until desired level
						if (infamyLevelDiff.greaterThan(1)) {
							totalExpReq = totalExpReq.add(NotoExpReqTotal(1, 100).times(infamyLevelDiff.sub(1)));
						}
					}
					totalExpReq = totalExpReq.add(NotoExpReqTotal(1, data.goalLevel));
					
					if (data.remainingEXP.notEquals(0)) {
						var nextLevelReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
						totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
					}
					
					outputString += '<br>• <b>' + formatInt(totalExpReq) + '</b> EXP';
					var infamyMoneyReq = calcInfamyMoneyReq_v2(data.currentInfamyLevel, data.goalInfamyLevel, data.cheaperPassCheck, [data.currentMoney, rotationInputsCalculated.money], data.preMoneyCapCheck);
					if (rotationInputsCalculated.money.equals(0)) {
						infamyMoneyReq = infamyMoneyReq.sub(data.currentMoney);
					}
					outputString += "<br>• <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.max(0)) + '</span> money (excluding current money)';
					if (infamyMoneyReq.lessThan(0)) {
						outputString += " (using up <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.abs().sub(data.currentMoney).abs()) + "</span> with <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.abs()) + '</span> remaining)';
					} else if (infamyMoneyReq.greaterThan(0)) {
						forEXPOnlyNote = true;
					}
				}
				break;
			case 1:
				const avgMxpGains = rotationInputsCalculated.mxp.dividedBy(rotationInputsCalculated.includedRuns);
				if (data.untilMXPUsage.equals(0)) {
					const orig = calcMXPReq({untilMXP: false}, {currentRank:data.currentMutatorRank, goalRank:data.goalMutatorRank, remainingMXP:data.remainingMXP});
					totalMxpReq = totalMxpReq.add(orig);
					outputString += "To go from <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span> to <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.goalMutatorRank) + "</span> "
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					}
					outputString += " the requirement is <span class='NotorietyEXPCalculator_MXP'>" + formatInt(totalMxpReq) + " MXP</span>.";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += " Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run:";
					}
				} else if (data.untilMXPUsage.greaterThan(0)) {
					const orig = calcMXPReq({untilMXP: true}, {currentRank:data.currentMutatorRank, remainingMXP:data.remainingMXP, extraMXP:data.untilMXPUsage});
					outputString += "At <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span>";
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					} else {
						outputString += ',';
					}
					totalMxpReq = totalMxpReq.add(data.untilMXPUsage);
					outputString += " gaining another <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.untilMXPUsage) + " MXP</span> will reach:";
					outputString += "<br>• <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(orig.newRank) + "</span> (+" + formatInt(orig.extraRanks) + ")";
					outputString += "<br>• Leftover <span class='NotorietyEXPCalculator_MXP'>MXP</span>: " + formatInt(orig.leftoverMXP) + "</span>";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += "<p/>Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run:";
					}
				} else {
					outputString += "Wait a minute, how did this happen? We're smarter than this.";
				}
			}
		switch (data.toggleComputationType_Global) {
		case 0:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				const timeOutput = new Timer();
				timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
				if (totalExpReq.dividedBy(rotationInputsCalculated.exp).equals(0) || totalExpReq.equals(0)) {
					timeOutput.amount = new Decimal(0);
				} else {
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil());
				}
				var rotationsReq = totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil();
				if (rotationsReq.isNan() == true) {
					rotationsReq = new Decimal(0);
				}
				if (totalExpReq.notEquals(0)) {
					if (forEXPOnlyNote == true) {
						outputString += '<br>• For EXP only: <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
						outputString += '<br>• For EXP only: <b>' + timeOutput.formatAmount() + '</b> playtime';
					} else {
						outputString += '<br>• <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
						outputString += '<br>• <b>' + timeOutput.formatAmount() + '</b> playtime';
					}
				}
			}
		break;
		case 1:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				const timeOutput = new Timer();
				timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
				if (totalMxpReq.dividedBy(rotationInputsCalculated.mxp).equals(0) || totalMxpReq.equals(0)) {
					timeOutput.amount = new Decimal(0);
				} else {
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil());
				}
				var rotationsReq = totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil();
				if (rotationsReq.isNan() == true) {
					rotationsReq = new Decimal(0);
				}
				outputString += '<br>• <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
				outputString += '<br>• <b>' + timeOutput.formatAmount() + '</b> playtime';
			}
		}
		elem.outputResults.innerHTML = outputString;
	}
	computeBeepBoop();
	
	elem.calculateButton.addEventListener('click', function() {
		computeBeepBoop();
	});
}());