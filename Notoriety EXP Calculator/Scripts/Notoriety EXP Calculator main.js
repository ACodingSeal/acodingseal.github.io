// "Notoriety EXP Calculator" by TheSeal27

(function() {
	function NotoExpReqTotal(settings_a, base, goal) {
		function calcEXP(start, end) {
			start = new Decimal(start).abs();
			end = new Decimal(end).abs();
			const count = end.sub(start).abs();
			var sum = new Decimal(0);
			for (var x = 0; count.greaterThan(x); x++) {
				var lvl = start.add(x);
				switch (Number(data.expFormula)) {
					case 0:
					sum = sum.add(lvl.times(new Decimal(1018.93)).add(lvl.pow(2.976664)).floor());
					break;
					case 1:
					sum = sum.add(new Decimal(1025).times(lvl).add(lvl.pow(1.3)).floor());
				}
			}
			return sum;
		}
		// console.log(calcEXP(88, 89));
			
		if (settings_a.untilEXP == true) {
			const output = {newLevel:new Decimal(0), newInfamyLevel:new Decimal(0), extraLevels:new Decimal(0), extraInfamyLevels:new Decimal(0), leftoverEXP:new Decimal(0)};
			// tba
			/*
			const output = null // {current
			return output
			*/
			
			// 113,975,931
			var reputationTotalEXP = calcEXP(1, 100);
			var totalEXPUntilCurrentLevel = calcEXP(1, settings_a.currentLevel);
			// console.log( calcEXP(settings_a.currentLevel, settings_a.currentLevel.add(1)).sub(settings_a.remainingEXP).abs() );
			var extraEXP_a = settings_a.extraEXP;
			if (settings_a.remainingEXP.notEquals(0)) {
				extraEXP_a = extraEXP_a.add(calcEXP(settings_a.currentLevel, settings_a.currentLevel.add(1)).sub(settings_a.remainingEXP).abs());
			}
			// console.log(calcEXP(1, 82)); // 13,975,931
			// console.log(settings_a.extraEXP);
			extraEXP_a = extraEXP_a.add(0e3);
			// next infamy check:
			if (extraEXP_a.add(totalEXPUntilCurrentLevel).greaterThanOrEqualTo(reputationTotalEXP) && settings_a.currentLevel.notEquals(100)) {
				extraEXP_a = extraEXP_a.sub(reputationTotalEXP);
			}
			// console.log(extraEXP_a);
			// extra infamies:
			var maxInfamies = new Decimal(250);
			if (data.MainSetting_Calculator_ToggleInfiniteInfamies == 1) {
				maxInfamies = new Decimal(Infinity);
			}
			if (settings_a.currentInfamyLevel.lessThan(maxInfamies)) {
				if (extraEXP_a.greaterThanOrEqualTo(reputationTotalEXP)) {
					if (data.MainSetting_Calculator_ToggleInfiniteInfamies == 0) {
						output.extraInfamyLevels = extraEXP_a.dividedBy(reputationTotalEXP).floor().min(maxInfamies.sub(settings_a.currentInfamyLevel));
					} else {
						output.extraInfamyLevels = extraEXP_a.dividedBy(reputationTotalEXP).floor();
					}
					// console.log(extraEXP_a);
					extraEXP_a = extraEXP_a.sub(extraEXP_a.dividedBy(reputationTotalEXP).floor().min(maxInfamies.sub(settings_a.currentInfamyLevel)).times(reputationTotalEXP));
					// console.log(extraEXP_a);
					// console.log(output.extraInfamyLevels.times(reputationTotalEXP));
					// output.extraInfamyLevels = output.extraInfamyLevels.add(settings_a.extraEXP)
				}
			}
			// console.log(extraEXP_a);
			// new level after last extra infamy (if any):
			if (true) {
				for (var x = 1; x < 100; x++) {
					if (extraEXP_a.greaterThanOrEqualTo(calcEXP(1, x))) {
						output.newLevel = new Decimal(x);
						output.extraLevels = new Decimal(x).sub(1);
						// extraEXP_a = extraEXP_a.sub(calcEXP(0 + x, 1 + x));
					}
				}
				// console.log(calcEXP(1, output.newLevel));
				extraEXP_a = calcEXP(1, output.newLevel).sub(extraEXP_a).abs();
			}
			// console.log(extraEXP_a);
			
			output.newInfamyLevel = settings_a.currentInfamyLevel.add(output.extraInfamyLevels);
			output.leftoverEXP = extraEXP_a;
			
			/*
			console.log('--------------------');
			console.log(output.extraInfamyLevels);
			console.log(output.newInfamyLevel);
			console.log(output.newLevel);
			console.log(output.leftoverEXP);
			console.log(calcEXP(1, output.newLevel.add(0)));
			console.log(calcEXP(output.newLevel, output.newLevel.add(1)));
			console.log('--------------------');
			*/
			return output;
		} else {
			base = new Decimal(base).abs();
			goal = new Decimal(goal).abs();
			const count = goal.sub(base).abs();
			var sum = calcEXP(base, goal);
			return sum;
		}
	}
	// data.expFormula = 1;
	// console.log(NotoExpReqTotal({}, 1, 100));
	setTimeout(function() {
		// console.log(NotoExpReqTotal({untilEXP:true, currentLevel:new Decimal(1), currentInfamyLevel:new Decimal(0), extraEXP:new Decimal(1e8)}));
		// console.log(new Decimal(1018).sub(NotoExpReqTotal({}, 1, 2)).abs());
	}, 1);
	
	// Base HTML
	(function() {
		const tool_baseHTML = "<div style='background:linear-gradient(rgba(44,0,66, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(69,0,102, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(44,0,66, var(--bg-alpha)));text-align:center;width:95%;margin:auto;padding:1em'><div class='StandardText' style='font-size:100%'><span style='font-size:200%'>Notoriety EXP Calculator<br><span style='font-size:70%'>(2.0.1 " + '' + "" + '' + " | Notoriety 3.10.1b)</span></span><p>A tool for the Roblox game <a href='https://www.roblox.com/games/21532277'>Notoriety</a>'s EXP, Infamy and MXP features.<br>Includes many features and the Hall of CCLs.<br><i>Tool created by TheSeal27</i></p></div><br>"
		+ "<center id='NotorietyEXPCalculator_MenuButtons'></center><hr/>"
		+ "<div id='NotorietyEXPCalculator_MenuContainer_Calculator'></div>"
		+ "<div id='NotorietyEXPCalculator_MenuContainer_Miscellaneous'></div>"
		+ "<div id='NotorietyEXPCalculator_MenuContainer_Settings'></div>"
		+ "</div>";
		
		document.getElementById('NotorietyEXPCalculator').innerHTML = tool_baseHTML;
	}());
	
	// Menu: Calculator
	(function() {
		const tool_baseHTML_MenuContainer_Calculator = ""
		+ "<div id='NotorietyEXPCalculator_Section_GlobalSettings'>"
		+ "<h2>Menu Settings</h2>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleComputationType'><span id='NotorietyEXPCalculator_MainSetting_Calculator_ToggleComputationType' style='cursor:pointer'>Computing: <u>EXP, Levels & Infamy</u></span></p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleInfiniteInfamies'><span id='NotorietyEXPCalculator_MainSetting_Calculator_ToggleInfiniteInfamies' style='cursor:pointer'>Maximum infamies: <u>250</u></span></p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleAutoCalculate'><span id='NotorietyEXPCalculator_MainSetting_Calculator_ToggleAutoCalculate' style='cursor:pointer'>Auto calculate: <u>OFF</u></span></p>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_LevelSettings'>"
		+ "<hr/><h2>Level Settings</h2>"
		+ "<p id='NotorietyEXPCalculator_Block_CurrentLevelInput'>Current level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPCalculator_CurrentLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_CurrentLevelInput_Result'>undefined</span></code></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_RemainingEXPInput'>Remaining EXP: <input type='range' min='0' max='999999' value='0' class='slider' style='width:10em' id='NotorietyEXPCalculator_RemainingEXPInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_RemainingEXPInput_Result'>undefined</span></code><span class='NotorietyEXPCalculator_InputExplanation'><br>(This is EXP remaining until the next level.)</span></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_GoalLevelInput'>Desired level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPCalculator_GoalLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_GoalLevelInput_Result'>undefined</span></code></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_EXPFormulaInput'>EXP formula: <input type='range' min='0' max='1' value='0' class='slider' style='width:10em' id='NotorietyEXPCalculator_EXPFormulaInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_EXPFormulaInput_Result'>undefined</span></code></span><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(Which EXP formula to use. 2 options: pre-shutdown (<code>1025 * x + x ^ 1.3</code>), current (<code>x * 1018.93 + x ^ 2.976664)</code>). With input sliders disabled, input a number ranging from 0 to 1.</span></p>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_MutatorRankSettings'>"
		+ "<hr/><h2>Mutator Rank Settings</h2>"
		+ "<p id='NotorietyEXPCalculator_Block_CurrentMutatorRankInput'>Current rank: <input style='width:4em' id='NotorietyEXPCalculator_CurrentMutatorRankInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPCalculator_InputExplanation'><br>(Starting rank is 0.)</span></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_RemainingMXPInput'>Remaining MXP: <input style='width:4em' id='NotorietyEXPCalculator_RemainingMXPInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPCalculator_InputExplanation'><br>(This is MXP remaining until the next level. Leave blank if no progress has been made.)</span></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_GoalMutatorRankInput'>Desired rank: <input style='width:4em' id='NotorietyEXPCalculator_GoalMutatorRankInput'></input></p>"
		+ "<p id='NotorietyEXPCalculator_Block_UntilMXPUsageInput'>Until MXP usage: <input style='width:4em' id='NotorietyEXPCalculator_UntilMXPUsageInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPCalculator_InputExplanation'><br>(Search for which Mutator Rank can be achieved using this much MXP. Overrides the 'Desired rank' setting.)</span></span></p>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_MoneySettings'>"
		+ "<hr/><h2>Money Settings</h2>"
		+ "<p id='NotorietyEXPCalculator_Block_CurrentMoneyInput'>Current money: <input style='width:4em' id='NotorietyEXPCalculator_CurrentMoneyInput'></input><span id='NotorietyEXPCalculator_CurrentMoneyInput_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(This is the money that will be used for infamy costs. Default is <code>0</code>. Required setting when 'Desired infamy level' > 'Until out of money' is set to <code>Y</code>.)</span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_GoalMoneyInput'>Desired money: <input style='width:4em' id='NotorietyEXPCalculator_GoalMoneyInput'></input><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>Required setting when 'Computing' toggle setting is set to 'Money'.</span></p>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_InfamySettings'>"
		+ "<hr/><h2>Infamy Settings</h2><small>If not calculating infamies, then <span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_SectionContainerToggle_InfamySettings'>ignore these settings</span>.</small>"
		+ "<div id='NotorietyEXPCalculator_SectionContainer_InfamySettings' style='display:block'>"
		+ "<p id='NotorietyEXPCalculator_Block_CurrentInfamyLevelInput'>Current infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPCalculator_CurrentInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_CurrentInfamyLevelInput_Result'>undefined</span></code><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(Input a whole number.)</span></span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_GoalInfamyLevelInput'>Desired infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPCalculator_GoalInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_GoalInfamyLevelInput_Result'>undefined</span></code><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(Input a whole number.)</span><br>(Until out of money: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_UntilPoorCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPCalculator_InputExplanation'> (Overrides 'Desired infamy level' setting and requires 'Run/rotation gains' to be properly defined.)</span>)</span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_CheaperPassCheck'><a href='https://www.roblox.com/game-pass/748016'>Cheaper Infamy</a> gamepass: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_CheaperPassCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(Whether or not the user owns the Cheaper Infamy gamepass, which reduces the final monetary requirement of each infamy by 50%.)</span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_PreMoneyReqLimitCheck'>Pre-money requirement limit: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_PreMoneyReqLimitCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br>(This setting refers to the post-infamy 25 increasing infamy money requirement (+$10mil without cheaper pass, +$5mil with), which previously (prior to 3.9.5b on 2024-12-27T16:10Z) did not have a limit of $125mil without cheaper pass (or $62.5mil with).)</span></p>"
		+ "</div>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_ProgressionSettings'>"
		+ "<hr/><h2>Progression Settings</h2><div>These settings are not required to be defined if not calculating progression requirements.</div>"
		+ "<p>Run/rotation gains:<br><textarea style='width:20em;height:10em' placeholder='temporary text' id='NotorietyEXPCalculator_RunGainsInput'></textarea><span id='NotorietyEXPCalculator_RunGainsInput_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'>placeholder text</span></p>"
		+ "<p id='NotorietyEXPCalculator_Block_UntilRotationsInput'>Until this many rotations: <input type='range' min='0' max='1000' value='0' class='slider' style='width:10em' id='NotorietyEXPCalculator_UntilRotationsInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPCalculator_UntilRotationsInput_Result'>undefined</span></code></span><br><span id='NotorietyEXPCalculator_UntilRotationsInput_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'>placeholder text</span></p>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_Results'>"
		+ "<hr/><h2>Results</h2>"
		+ "<p><div><p id='NotorietyEXPCalculator_Section_Results_Disclaimer' style='font-size:80%'>placeholder!!!</p><div style='width:10em;height:4em;margin:auto'><div style='margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_CalculateButton' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Calculate</button></div></div></div></p>"
		+ "<p><div id='NotorietyEXPCalculator_OutputResults'>" + 'dallas medic bag scream' + "</div></p>"
		+ "</div>";
		
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Calculator').innerHTML = tool_baseHTML_MenuContainer_Calculator;
	}());
	
	// Menu: Miscellaneous
	(function() {
		const tool_baseHTML_MenuContainer_Miscellaneous = ''
		
		+ "<div id='NotorietyEXPCalculator_Section_HallofInfamyCCLs'>"
		+ "<h2>Hall of CCLs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_SectionContainerToggle_HallofInfamyCCLs'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_SectionContainer_HallofInfamyCCLs' style='text-align:initial;display:none'>"
		+ "</div>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Section_Timers'>"
		+ "<hr/><h2>Timers</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_SectionContainerToggle_Timers'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_SectionContainer_Timers' style='text-align:initial;display:none'>"
		+ "</div>"
		+ "</div>";
		
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Miscellaneous').innerHTML = tool_baseHTML_MenuContainer_Miscellaneous;
	}());
	
	// Menu: Settings
	(function() {
		const tool_baseHTML_MenuContainer_Settings = ""
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_Section_GlobalSettings'>"
		+ "<h2>Global Settings</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_GlobalSettings'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_SectionContainer_GlobalSettings' style='text-align:initial;display:block'>"
		+ "<p>These are 'common' settings which apply throughout more than one menu in the tool. Note: These aren't all the tool's settings, check the other menus for more.</p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Global_ToggleInputSliders'><span id='NotorietyEXPCalculator_MainSetting_Global_ToggleInputSliders' style='cursor:pointer'>Input method: <u>Sliders</u></span></p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Global_ToggleInputExplanations'><span id='NotorietyEXPCalculator_MainSetting_Global_ToggleInputExplanations' style='cursor:pointer'>Input explanations: <u>Visible</u></span></p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Global_ToggleRomanNumerals'><span id='NotorietyEXPCalculator_MainSetting_Global_ToggleRomanNumerals' style='cursor:pointer'>Roman numerals: <u>ON</u></span></p>"
		+ "<p class='unselectable undraggable' id='NotorietyEXPCalculator_MainSettingContainer_Global_ToggleTimeOutputFormat'><span id='NotorietyEXPCalculator_MainSetting_Global_ToggleTimeOutputFormat' style='cursor:pointer'>Time output format: <u>words</u></span></p>"
		+ "<p></p>Time output names:<br/>"
		+ "<input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millisecond' type='checkbox' checked='true'>Milliseconds (ms)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Second' type='checkbox' checked='true'>Seconds (s)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Minute' type='checkbox' checked='true'>Minutes (m)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Hour' type='checkbox' checked='true'>Hours (h)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Day' type='checkbox' checked='true'>Days (d)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Week' type='checkbox' checked='true'>Weeks (w)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Month' type='checkbox' checked='true'>Months (mo)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Year' type='checkbox' checked='true'>Years (y)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Decade' type='checkbox' checked='true'>Decades (de)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Century' type='checkbox' checked='true'>Centuries (c)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millennium' type='checkbox' checked='true'>Millennia (mi)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_NotorietyUpdateInterval' type='checkbox' checked='true'>(Easter Egg) ??? 🗿</input>"
		+ "<br/><input id='NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_ExcludeOptions' type='checkbox'>Exclude?</input>"
		+ "</p>"
		+ "<p id='NotorietyEXPCalculator_MainSettingContainer_Global_Saturation'>Saturation: <input id='NotorietyEXPCalculator_MainSetting_Global_Saturation' type='range' min='0' max='100' value='100' class='slider' style='width:10em'></input><br><span style='font-size:80%'><span id='NotorietyEXPCalculator_MainSetting_Global_Saturation_InputResult'>undefined</span></span></p>"
		+ "<p id='NotorietyEXPCalculator_MainSettingContainer_Global_DateFormat'>Date format:<br/><textarea style='width:20em;height:10em' placeholder='yyyy-MM-dd HH:mm:ss:fff' id='NotorietyEXPCalculator_MainSetting_Global_DateFormat'></textarea><span id='NotorietyEXPCalculator_MainSetting_Global_DateFormat_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'><br/>This determines how dates are formatted throughout the tool. Usage:<br/>Years: yyyy (full), yy (2 digits), y.<br/>Months: MMMM (full month name), MMM (shorter month name), MM (zero-padded month number), M (month number).<br/>Days: dddd (full day of week), ddd (shorter day of week), dd (zero-padded day of month), d (day of month).<br/>Hours: HH (zero-padded 24 hour time), H (24 hour time), hh (zero-padded 12 hour time), h (12 hour time).<br/>Minutes: mm, m.<br/>Seconds: ss, s.<br/>Milliseconds: fff, ff.<br/>AM/PM indicator: TT (AM/PM), T (A/P), tt (am/pm), t (a/p).<br/><br/>Any separator can be used. Defaults to <code>yyyy-MM-dd HH:mm:ss:fff</code>.</span></p>"
		+ "<p id='NotorietyEXPCalculator_MainSettingContainer_Global_KeepSettingsOnReload'><input id='NotorietyEXPCalculator_MainSetting_Global_KeepSettingsOnReload' type='checkbox'>Keep settings on reload?</input></p>"
		+ "<p></p><div style='width:10em;height:4em'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_Menu_Settings_Section_GlobalSettings_ResetGlobalSettings' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Reset settings</button></div>"
		+ "<p></p><div style='width:10em;height:4em;margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_Menu_Settings_Section_GlobalSettings_UpdateGlobalSettings' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Update all Global Settings</button></div>"
		+ "</div>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_Section_Credits'>"
		+ "<hr/><h2>Credits</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_Credits'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_SectionContainer_Credits' style='text-align:initial;display:none'>"
		+ "</div>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_Section_KnownBugs'>"
		+ "<hr/><h2>Known Bugs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_KnownBugs'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_SectionContainer_KnownBugs' style='text-align:initial;display:none'>"
		+ "</div>"
		+ "</div>"
		
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_Section_UpdateLog'>"
		+ "<hr/><h2>Update Log</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_UpdateLog'>(toggle visibility)</span></small>"
		+ "<div id='NotorietyEXPCalculator_Menu_Settings_SectionContainer_UpdateLog' style='text-align:initial;display:none'>"
		+ "</div>"
		+ "</div>";
		
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Settings').innerHTML = tool_baseHTML_MenuContainer_Settings;
	}());
	
	var filterDaysOptions = "<option value='undefined'>day</option>";
	var filterYearsOptions = "<option value='undefined'>year</option>";
	for (var x = 0; x < 31; x++) {
		filterDaysOptions += "<option value='" + (x + 1) + "'>" + (x + 1) + "</option>";
	}
	
	// no support beyond the year 3024
	for (var x = 0; x < 1001; x++) {
		filterYearsOptions += "<option value='" + (2024 + x) + "'>" + (2024 + x) + "</option>";
	}
	
	document.getElementById('NotorietyEXPCalculator_SectionContainer_HallofInfamyCCLs').innerHTML = "<div style='text-align:center'>"
		+ "At the end of the day, when we're no longer around, we become stories, a relic of the past, and we generally want to be remembered. To live on in society's collective minds, to ensure our story is told and retold countless times. That is true immortality, and free will in writing our own story is the greatest gift of existence. The following people have achieved Infamy Rank 250 (CCL) in Notoriety. Through their unwavering commitment, they have become legendary heisters known far and wide throughout the Notoriety criminal underground. For such an extraordinary accomplishment, they have earned a permanent recognition in the Hall of CCLs. These are their stories."
		+ "<p></p>Badge obtainment times are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute:second:millisecond</b> format. 'Time elapsed since badge obtainment' is actual elapsed time, and is updated on tool load, filtering/sorting the list or changing the 'Time output format' toggle setting. Entries' user-written descriptions' timestamps are usually plaintext, so they do not auto-update to local time. Entries may take some time to be added, especially depending on available data. There are currently many missing user-written descriptions. All data, including Roblox avatars, must be updated manually with a tool update. Double click an image to open its source file and view the full image. If you wish for modifications to be made to your entry, or want it to be anonymised, contact the tool creator on Discord (same username)."
		+ "<p></p><p style='font-weight:inherit;border-bottom:1px solid rgba(255,255,255,var(--bg-alpha));width:25%;margin:auto'>Filtering and Sorting</p><br/>Filters are checked for each programmed CCL entry. They can be combined using either AND or OR logical operators, as well as support for complicated conditions using parentheses."
		+ "<p></p>Filter: Classic infamy suits<br/>"
		+ "<input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Crimson' type='checkbox'>Crimson (250)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Rojo' type='checkbox'>Rojo (200)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Royalty' type='checkbox'>Royalty (150)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_BlueNavy' type='checkbox'>Blue Navy (100)</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_ExcludeOptions' type='checkbox'>Exclude?</input>"
		+ "<p></p>Filter: Time<br/>"
		+ "<select id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Year'>" + filterYearsOptions + "</select>"
		+ "<select id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Month'><option value='undefined'>month</option><option value='0'>January</option><option value='1'>February</option><option value='2'>March</option><option value='3'>April</option><option value='4'>May</option><option value='5'>June</option><option value='6'>July</option><option value='7'>August</option><option value='8'>September</option><option value='9'>October</option><option value='10'>November</option><option value='11'>December</option></select>"
		+ "<select id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Day'>" + filterDaysOptions + "</select>"
		+ "<input placeholder='hour' type='number' min='0' max='23' id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Hour'></input>"
		+ "<input placeholder='minute' type='number' min='0' max='59' id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Minute'></input>"
		+ "<input placeholder='second' type='number' min='0' max='59' id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Second'></input>"
		+ "<input placeholder='millisecond' type='number' min='0' max='99999999' id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Millisecond'></input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_ExcludeOptions' type='checkbox'>Exclude?</input>"
		+ "<p></p>Filter: Specific CCLs<br/>"
		+ "<textarea style='width:20em;height:10em' placeholder='temporary text' id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs'></textarea><span id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'>placeholder text</span>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_ExcludeOptions' type='checkbox'>Exclude?</input>"
		+ "<p></p>Filter: Other<br/>"
		+ "<input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_Notes' type='checkbox'>Has notes</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_UserWrittenDescription' type='checkbox'>Has user-written description</input>"
		+ "<br/><input id='NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_ExcludeOptions' type='checkbox'>Exclude?</input>"
		+ "<p></p>Filtering logic<br/>"
		+ "<textarea style='width:20em;height:10em' placeholder='temporary text' id='NotorietyEXPCalculator_HallofInfamyCCLs_FilteringLogic'>specific</textarea><span id='NotorietyEXPCalculator_HallofInfamyCCLs_FilteringLogic_InputExplanation' class='NotorietyEXPCalculator_InputExplanation' style='font-size:80%'>placeholder text</span>"
		+ "<p></p>Sort: Badge obtainment timestamp order<br/>"
		+ "<select id='NotorietyEXPCalculator_HallofInfamyCCLs_Sort_ObtainmentOrder'><option value='oldestNewest'>Oldest to newest</option><option value='newestOldest'>Newest to oldest</option><option value='random'>Random</option></select>"
		+ "<p></p><div style='width:10em;height:4em;margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_HallofInfamyCCLs_FilterSortSubmit' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Filter and sort</button></div>"
		+ "<p></p><div id='NotorietyEXPCalculator_HallofInfamyCCLs_FilterSort_GeneratedText'>you are such a medic bag (i need it)</div>"
		+ "<p id='NotorietyEXPCalculator_HallofInfamyCCLs_Block_ToggleEntryDescriptions'>Toggle entry descriptions: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_HallofInfamyCCLs_ToggleEntryDescriptions' style='cursor:pointer'>[N]</button></span></p>"
		+ "<div id='NotorietyEXPCalculator_SectionContainer_HallofInfamyCCLs_TheList'>*cloaker noises*</div>"
		+ "</div>";
		
	var timersAutoUpdateInterval = null;
	document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers').innerHTML = "<ul>"
	+ "<li>Due to technical limitations, milliseconds may be about 1 or 2 off.</li>"
	+ "<li>Timestamps are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute:second:millisecond</b> format.</li>"
	+ "<li>Challenges timestamps are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute</b> format.</li>"
	+ "<li>All times are based on UTC offsets (<a href='https://en.wikipedia.org/wiki/List_of_UTC_offsets'>see here</a> for list), not time zones that are subject to daylight savings adjustments. Your detected UTC offset: <span id='NotorietyEXPCalculator_SectionContainer_Timers_DetectedUTCOffset'></span></li>"
	+ "<li>Possibly no longer an issue after Version 1.4.9a: <s>There may be an unintentional extra day included when the time is more than a month away.</s></li>"
	+ "</ul><p></p><div style='width:10em;height:4em'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_SectionContainer_Timers_UpdateTimers' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Update timers</button></div>"
	+ "<input id='NotorietyEXPCalculator_SectionContainer_Timers_AutoUpdate' type='checkbox'>Auto update? (interval 250ms)</input>"
	+ "<div id='NotorietyEXPCalculator_SectionContainer_Timers_TheList'>It's time to add something here...</div>"
	+ "";
	
	var inputSettings = {calculatorSettings:{}, miscellaneousSettings:{}, globalSettings:{}},
	outputEverything = {};
	
	const elem = {
		MainSettingContainer_Calculator_ToggleComputationType: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleComputationType'),
		MainSettingContainer_Calculator_ToggleInfiniteInfamies: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleInfiniteInfamies'),
		MainSettingContainer_Calculator_ToggleAutoCalculate: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Calculator_ToggleAutoCalculate'),
		MainSettingContainer_Global_ToggleInputSliders: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_ToggleInputSliders'),
		MainSettingContainer_Global_ToggleRomanNumerals: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_ToggleRomanNumerals'),
		MainSettingContainer_Global_ToggleInputExplanations: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_ToggleInputExplanations'),
		MainSettingContainer_Global_ToggleTimeOutputFormat: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_ToggleTimeOutputFormat'),
		MainSettingContainer_Global_Saturation: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_Saturation'),
		MainSettingContainer_Global_DateFormat: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_DateFormat'),
		MainSettingContainer_Global_KeepSettingsOnReload: document.getElementById('NotorietyEXPCalculator_MainSettingContainer_Global_KeepSettingsOnReload'),
		
		MainSetting_Calculator_ToggleComputationType: document.getElementById('NotorietyEXPCalculator_MainSetting_Calculator_ToggleComputationType'),
		MainSetting_Calculator_ToggleInfiniteInfamies: document.getElementById('NotorietyEXPCalculator_MainSetting_Calculator_ToggleInfiniteInfamies'),
		MainSetting_Calculator_ToggleAutoCalculate: document.getElementById('NotorietyEXPCalculator_MainSetting_Calculator_ToggleAutoCalculate'),
		MainSetting_Global_ToggleInputSliders: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_ToggleInputSliders'),
		MainSetting_Global_ToggleRomanNumerals: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_ToggleRomanNumerals'),
		MainSetting_Global_ToggleInputExplanations: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_ToggleInputExplanations'),
		MainSetting_Global_ToggleTimeOutputFormat: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_ToggleTimeOutputFormat'),
		MainSetting_Global_Saturation: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_Saturation'),
		MainSetting_Global_DateFormat: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_DateFormat'),
		MainSetting_Global_KeepSettingsOnReload: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_KeepSettingsOnReload'),
		
		Section_LevelSettings: document.getElementById('NotorietyEXPCalculator_Section_LevelSettings'),
		Section_MutatorRankSettings: document.getElementById('NotorietyEXPCalculator_Section_MutatorRankSettings'),
		Section_ProgressionSettings: document.getElementById('NotorietyEXPCalculator_Section_ProgressionSettings'),
		Section_MoneySettings: document.getElementById('NotorietyEXPCalculator_Section_MoneySettings'),
		Section_InfamySettings: document.getElementById('NotorietyEXPCalculator_Section_InfamySettings'),
		Section_Results: document.getElementById('NotorietyEXPCalculator_Section_Results'),
		Section_HallofInfamyCCLs: document.getElementById('NotorietyEXPCalculator_Section_HallofInfamyCCLs'),
		Section_Credits: document.getElementById('NotorietyEXPCalculator_Menu_Settings_Section_Credits'),
		Section_KnownBugs: document.getElementById('NotorietyEXPCalculator_Menu_Settings_Section_KnownBugs'),
		Section_UpdateLog: document.getElementById('NotorietyEXPCalculator_Menu_Settings_Section_UpdateLog'),
		Section_Timers: document.getElementById('NotorietyEXPCalculator_Section_Timers'),
		
		Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Crimson: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Crimson'),
		Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Rojo: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Rojo'),
		Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Royalty: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_Royalty'),
		Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_BlueNavy: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_BlueNavy'),
		Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_ExcludeOptions: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_ClassicInfamySuits_ExcludeOptions'),
		Section_HallofInfamyCCLs_Filter_Time_Year: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Year'),
		Section_HallofInfamyCCLs_Filter_Time_Month: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Month'),
		Section_HallofInfamyCCLs_Filter_Time_Day: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Day'),
		Section_HallofInfamyCCLs_Filter_Time_Hour: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Hour'),
		Section_HallofInfamyCCLs_Filter_Time_Minute: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Minute'),
		Section_HallofInfamyCCLs_Filter_Time_Second: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Second'),
		Section_HallofInfamyCCLs_Filter_Time_Millisecond: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_Millisecond'),
		Section_HallofInfamyCCLs_Filter_Time_ExcludeOptions: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Time_ExcludeOptions'),
		Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs'),
		Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs_InputExplanation: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs_InputExplanation'),
		Section_HallofInfamyCCLs_Filter_SpecificCCLs_ExcludeOptions: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_SpecificCCLs_ExcludeOptions'),
		Section_HallofInfamyCCLs_Filter_Other_Notes: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_Notes'),
		Section_HallofInfamyCCLs_Filter_Other_UserWrittenDescription: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_UserWrittenDescription'),
		Section_HallofInfamyCCLs_Filter_Other_ExcludeOptions: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Filter_Other_ExcludeOptions'),
		Section_HallofInfamyCCLs_Sort_ObtainmentOrder: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Sort_ObtainmentOrder'),
		Section_HallofInfamyCCLs_FilterSort_GeneratedText: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_FilterSort_GeneratedText'),
		
		SectionContainer_InfamySettings: document.getElementById('NotorietyEXPCalculator_SectionContainer_InfamySettings'),
		SectionContainer_HallofInfamyCCLs: document.getElementById('NotorietyEXPCalculator_SectionContainer_HallofInfamyCCLs'),
		SectionContainer_HallofInfamyCCLs_TheList: document.getElementById('NotorietyEXPCalculator_SectionContainer_HallofInfamyCCLs_TheList'),
		SectionContainer_GlobalSettings: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainer_GlobalSettings'),
		SectionContainer_Credits: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainer_Credits'),
		SectionContainer_KnownBugs: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainer_KnownBugs'),
		SectionContainer_UpdateLog: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainer_UpdateLog'),
		SectionContainer_Timers: document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers'),
		SectionContainer_Timers_TheList: document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_TheList'),
		
		SectionContainerToggle_InfamySettings: document.getElementById('NotorietyEXPCalculator_SectionContainerToggle_InfamySettings'),
		SectionContainerToggle_HallofInfamyCCLs: document.getElementById('NotorietyEXPCalculator_SectionContainerToggle_HallofInfamyCCLs'),
		SectionContainerToggle_GlobalSettings: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_GlobalSettings'),
		SectionContainerToggle_Credits: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_Credits'),
		SectionContainerToggle_KnownBugs: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_KnownBugs'),
		SectionContainerToggle_UpdateLog: document.getElementById('NotorietyEXPCalculator_Menu_Settings_SectionContainerToggle_UpdateLog'),
		SectionContainerToggle_Timers: document.getElementById('NotorietyEXPCalculator_SectionContainerToggle_Timers'),
		
		currentLevelInput: document.getElementById('NotorietyEXPCalculator_CurrentLevelInput'),
		remainingEXPInput: document.getElementById('NotorietyEXPCalculator_RemainingEXPInput'),
		goalLevelInput: document.getElementById('NotorietyEXPCalculator_GoalLevelInput'),
		expFormulaInput: document.getElementById('NotorietyEXPCalculator_EXPFormulaInput'),
		
		currentMoneyInput: document.getElementById('NotorietyEXPCalculator_CurrentMoneyInput'),
		goalMoneyInput: document.getElementById('NotorietyEXPCalculator_GoalMoneyInput'),
		goalMoneyInput_Block: document.getElementById('NotorietyEXPCalculator_Block_GoalMoneyInput'),
		
		currentInfamyLevelInput: document.getElementById('NotorietyEXPCalculator_CurrentInfamyLevelInput'),
		goalInfamyLevelInput: document.getElementById('NotorietyEXPCalculator_GoalInfamyLevelInput'),
		
		currentMutatorRankInput: document.getElementById('NotorietyEXPCalculator_CurrentMutatorRankInput'),
		remainingMXPInput: document.getElementById('NotorietyEXPCalculator_RemainingMXPInput'),
		goalMutatorRankInput: document.getElementById('NotorietyEXPCalculator_GoalMutatorRankInput'),
		untilMXPUsageInput: document.getElementById('NotorietyEXPCalculator_UntilMXPUsageInput'),
		
		runGainsInput: document.getElementById('NotorietyEXPCalculator_RunGainsInput'),
		runGainsInput_InputExplanation: document.getElementById('NotorietyEXPCalculator_RunGainsInput_InputExplanation'),
		
		untilRotationsInput_Block: document.getElementById('NotorietyEXPCalculator_Block_UntilRotationsInput'),
		untilRotationsInput: document.getElementById('NotorietyEXPCalculator_UntilRotationsInput'),
		untilRotationsInput_InputExplanation: document.getElementById('NotorietyEXPCalculator_UntilRotationsInput_InputExplanation'),
		
		currentLevelInputResult: document.getElementById('NotorietyEXPCalculator_CurrentLevelInput_Result'),
		remainingEXPInputResult: document.getElementById('NotorietyEXPCalculator_RemainingEXPInput_Result'),
		goalLevelInputResult: document.getElementById('NotorietyEXPCalculator_GoalLevelInput_Result'),
		expFormulaInputResult: document.getElementById('NotorietyEXPCalculator_EXPFormulaInput_Result'),
		currentInfamyLevelInputResult: document.getElementById('NotorietyEXPCalculator_CurrentInfamyLevelInput_Result'),
		goalInfamyLevelInputResult: document.getElementById('NotorietyEXPCalculator_GoalInfamyLevelInput_Result'),
		untilRotationsInputResult: document.getElementById('NotorietyEXPCalculator_UntilRotationsInput_Result'),
		MainSetting_Global_Saturation_InputResult: document.getElementById('NotorietyEXPCalculator_MainSetting_Global_Saturation_InputResult'),
		
		untilOutOfMoneyCheck: document.getElementById('NotorietyEXPCalculator_UntilPoorCheck'),
		cheaperPassCheck: document.getElementById('NotorietyEXPCalculator_CheaperPassCheck'),
		preMoneyCapCheck: document.getElementById('NotorietyEXPCalculator_PreMoneyReqLimitCheck'),
		toggleEntryDescriptions: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_ToggleEntryDescriptions'),
		
		resultsDisclaimer: document.getElementById('NotorietyEXPCalculator_Section_Results_Disclaimer'),
		calculateButton: document.getElementById('NotorietyEXPCalculator_CalculateButton'),
		outputResults: document.getElementById('NotorietyEXPCalculator_OutputResults'),
		
		Section_HallofInfamyCCLs_FilterSortButton: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_FilterSortSubmit'),
		Section_HallofInfamyCCLs_FilteringLogic: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_FilteringLogic'),
		Section_HallofInfamyCCLs_FilteringLogic_InputExplanation: document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_FilteringLogic_InputExplanation'),
		
		resetGlobalSettingsButton: document.getElementById('NotorietyEXPCalculator_Menu_Settings_Section_GlobalSettings_ResetGlobalSettings'),
		updateGlobalSettingsButton: document.getElementById('NotorietyEXPCalculator_Menu_Settings_Section_GlobalSettings_UpdateGlobalSettings'),
	}
	
	const data = {
		currentLevel: new Decimal(1),
		remainingEXP: new Decimal(0),
		goalLevel: new Decimal(100),
		currentInfamyLevel: new Decimal(0),
		goalInfamyLevel: new Decimal(1),
		currentMoney: new Decimal(0),
		currentMutatorRank: new Decimal(0),
		remainingMXP: new Decimal(0),
		goalMutatorRank: new Decimal(1),
		untilMXPUsage: new Decimal(0),
		goalMoney: new Decimal(0),
		untilRotations: new Decimal(0),
		
		MainSetting_Calculator_ToggleComputationType: 0,
		MainSetting_Calculator_ToggleInfiniteInfamies: 0,
		MainSetting_Calculator_ToggleAutoCalculate: 0,
		MainSetting_Global_ToggleInputSliders: 1,
		MainSetting_Global_ToggleInputExplanations: 1,
		MainSetting_Global_ToggleRomanNumerals: 1,
		MainSetting_Global_ToggleTimeOutputFormat: 1,
		MainSetting_Global_TimeOutputNames: ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'de', 'c', 'mi', 'noup'],
		MainSetting_Global_Saturation: 100,
		MainSetting_Global_DateFormat: "yyyy-MM-dd HH:mm:ss:fff",
		MainSetting_Global_KeepSettingsOnReload: true,
		
		expFormula: 0,
		untilOutOfMoneyCheck: 0,
		cheaperPassCheck: 0,
		preMoneyCapCheck: 0,
		toggleEntryDescriptions: 0,
	};
	
	elem.MainSetting_Global_DateFormat.value = data.MainSetting_Global_DateFormat;
	
	const sounds = {};
	
	function getTimerConfig(input) {
		if (input == undefined) {
			return {outputFormat: ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(data.MainSetting_Global_ToggleTimeOutputFormat)], includedTimeNames:data.MainSetting_Global_TimeOutputNames};
		} else {
			return {outputFormat: ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(input)], includedTimeNames:data.MainSetting_Global_TimeOutputNames};
		}
	}
	
	function getTZString(input, zuluStr) {
		input = Number(input);
		var output = '';
		if (Math.abs(input) < 600) {
			output += '0';
		}
		// console.log(input);
		if (input <= 0) {
			output = '+' + output + Math.floor(Math.abs(input) / 60);
		} else {
			output = '-' + output + Math.floor(Math.abs(input) / 60);
		}
		output += ':';
		if (Math.abs(input) % 60 > 0) {
			output += Math.abs(input) % 60;
		} else {
			output += '00';
		}
		if (Math.abs(input) == 0) {
			if (zuluStr == true) {
				output = 'UTC / Zulu';
			} else {
				output = 'UTC';
			}
		} else {
			output = 'UTC' + output;
		}
		return output;
	}
	
	function addHallofInfamyCCLs() {
		// disabled to avoid confusion
		/*
		inputSettings.miscellaneousSettings.HallofCCLs = {};
		inputSettings.miscellaneousSettings.HallofCCLs.toggleEntryDescriptions = data.toggleEntryDescriptions;
		*/
		const grassAvoiders = 44;
		elem.SectionContainer_HallofInfamyCCLs_TheList.innerHTML = 'testing amongus';
		elem.Section_HallofInfamyCCLs_FilterSort_GeneratedText.innerHTML = '';
		var generatedEntries = 0;
		if (elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.value == '') {
			elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.value = "1 until " + grassAvoiders;
		}
		if (elem.Section_HallofInfamyCCLs_FilteringLogic.value == '') {
			elem.Section_HallofInfamyCCLs_FilteringLogic.value = 'specific';
		}
		const statusesEachCCL = [];
		var string = "";
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
		const currentTime = new Date();
		const players = [];
		const ownDescriptionButtons = [];
		const ownDescriptionContainers = [];
		const anonEntries = [];
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
		"Minimalisation",
		"chief_toad619",
		"Alxzor",
		"rebirthed6coin",
		"DeTedtive",
		"Friskern",
		"lancejuly28",
		"GhostrUiN420",
		"jadineq1",
		"00pro11",
		"Lord_Anno",
		"TohKia69",
		"Deerhaunter2021",
		"Eviscerality",
		"Nightmareee7",
		"YuukaKazamiii",
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
		"GenericDreamers",
		"m4ka",
		"Aimilized",
		"NekoChan",
		"Roxy",
		"CHIEF_TOAD",
		"Brago",
		"VX_coin",
		"abcd",
		"Frisk",
		"Lance",
		"Ghost",
		"jadineq1",
		"00pro11",
		"Lord_Anno",
		"TohKia",
		"Caribouean",
		"JodyJao",
		"Night_Ep",
		"HotlineGensokyo",
		];
		const playersData_robloxAvatars = [
		"ILikeToast5 - 2025-04-10T22-03Z.png",
		"Derpifi3d - 2025-04-10T22-04Z.png",
		"withwillin101 - 2025-04-10T22-04Z.png",
		"Aurora_The1Cat - 2025-04-10T22-04Z.png",
		"seroly2345 - 2025-04-10T22-05Z.png",
		"theREALdynamic 2025-04-10T22-05Z.png",
		"bigfootbb045 - 2025-05-22T03-23Z.png",
		"LuvlyGirlMaisy - 2025-05-20T04-09Z.png",
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
		"Minimalisation - 2025-04-15T23-59Z.png",
		"chief_toad619 - 2025-04-28T06-39Z.png",
		"Alxzor - 2025-04-29T23-23Z.png",
		"rebirthed6coin - 2025-05-03T06-19Z.png",
		"DeTedtive - 2025-05-10T00-21Z.png",
		"Friskern - 2025-05-11T23-40Z.png",
		"lancejuly28 - 2025-05-13T07-17Z.png",
		"GhostrUiN420 - 2025-05-17T04-15Z.png",
		"jadineq1 - 2025-05-17T04-15Z.png",
		"00pro11 - 2025-05-30T13-47Z.png",
		"Lord_Anno - 2025-06-08T10-29Z.png",
		"TohKia69 - 2025-06-03T04-08Z.png",
		"Deerhaunter2021 - 2025-05-13T07-17Z.png",
		"Eviscerality - 2025-06-13T02-23Z.png",
		"Nightmareee7 - 2025-06-13T02-23Z.png",
		"YuukaKazamiii - 2025-06-19T23-32Z.png",
		];
		const playersData_whenCCL = [
		{approx:false, timestamp: "2025-01-01T10:04:35.5385251Z"}, // orig "2025-01-01T10:04:35Z" = early by ~538ms
		{approx:false, timestamp: "2025-01-11T00:06:19.4206484Z"}, // orig "2025-01-11T00:00Z" = early by 6m~19s
		{approx:false, timestamp: "2025-01-11T05:20:42.5916753Z"}, // orig "2025-01-11T05:20Z" = early by 42.~5s
		{approx:false, timestamp: "2025-01-17T17:17:59.093865Z"}, // orig "2025-01-17T13:00Z", "2025-01-17T19:00Z" = from 4h17m59s early to 1h42m1s late
		{approx:false, timestamp: "2025-01-21T02:31:47.1374201Z"}, // orig "2025-01-21T02:33Z" = late by 1m~13s
		{approx:false, timestamp: "2025-01-24T19:35:04.9623688Z"}, // orig "2025-01-24T18:00Z", "2025-01-25T12:00Z" = from 1h35m4s early to 16h24m56s late
		{approx:false, timestamp: "2025-01-30T02:23:38.7066862Z"}, // orig "2025-01-30T02:23Z" = early by 38.~7s
		{approx:false, timestamp: "2025-02-04T15:25:56.5696312Z"}, // orig "2025-02-04T20:05Z" = late by 4h39m4s
		{approx:false, timestamp: "2025-02-08T10:30:11.9653792Z"}, // orig "2025-02-09T10:30Z" = early by 11.~9s
		{approx:false, timestamp: "2025-02-16T02:40:34.572448Z"}, // orig "2025-02-16T02:40:39Z" = late by 4.~4s
		{approx:false, timestamp: "2025-02-21T15:19:23.852687Z"}, // orig "2025-02-21T17:00Z" = late by 1h40m36s.~1s
		{approx:false, timestamp: "2025-02-21T19:41:51.9340899Z"}, // orig "2025-02-21T19:41:58Z" = late by ~6s
		{approx:false, timestamp: "2025-02-24T01:14:46.1209478Z"}, // orig "2025-02-24T01:16Z" = late by 1m13.~8s
		{approx:false, timestamp: "2025-02-27T03:36:08.7666892Z"}, // orig "2025-02-27T02:00Z", "2025-02-27T03:42Z" = from 1h36m8.~7s early to 5m51.~2s late
		{approx:false, timestamp: "2025-02-28T13:21:45.4899004Z"}, // orig 2025-02-28T13:22Z = late by 14.~5s
		{approx:false, timestamp: "2025-03-01T18:28:13.8551641Z"}, // orig "2025-03-01T18:15Z", "2025-03-01T22:45Z" = from 13m13.~8s early to 4h16m46~.1s late
		{approx:false, timestamp: "2025-03-08T10:00:46.2868391Z"}, // orig "2025-03-08T06:47Z", "2025-03-08T12:18Z" = from 3h13m46.~2s early to 2h17m13.~7s late
		{approx:false, timestamp: "2025-03-10T15:42:04.5078582Z"}, // orig "2025-03-10T13:25Z", "2025-03-10T15:57Z" = from 2h17m4.~5s early to 14m55.~5s late
		{approx:false, timestamp: "2025-03-12T18:50:46.5468413Z"}, // orig "2025-03-12T14:14Z", "2025-03-12T21:10Z" = from 4h36m46.~5s early to 2h19m13.~5s late
		{approx:false, timestamp: "2025-03-13T23:28:45.9244871Z"}, // orig "2025-03-13T23:59:04Z" = early by 30m18.~1s
		{approx:false, timestamp: "2025-03-20T01:32:46.8115315Z"}, // orig "2025-03-20T01:35Z" = early by 2m13.~2s
		{approx:false, timestamp: "2025-03-20T02:10:28.6222769Z"}, // orig "2025-03-20T02:10Z" = early by 28.~6s
		{approx:false, timestamp: "2025-03-25T03:55:17.1221124Z"}, // orig "2025-03-25T03:24Z", "2025-03-25T03:57Z" = from 31m17.~1s early to 1m42.~8s late
		{approx:false, timestamp: "2025-03-29T23:49:06.6591207Z"}, // orig "2025-03-29T11:33Z", "2025-03-30T03:12Z" = from 12h16m6.~7s early to 3h13m53.~3s late
		{approx:false, timestamp: "2025-04-01T09:24:23.1946652Z"}, // orig "2025-04-01T07:35Z", "2025-04-01T10:57Z" = 33863.1946652 from 1h49m23.~2s early to 1h32m36.~8s late
		{approx:false, timestamp: "2025-04-04T12:32:49.9747681Z"}, // orig "2025-04-04T11:30Z", "2025-04-04T13:38Z" = 45169.9747681 from 1h2m~50s early to 1h5m10s late
		{approx:false, timestamp: "2025-04-11T17:19:54.2575158Z"}, // orig "2025-04-11T17:19Z" = early by 54.~26s
		{approx:false, timestamp: "2025-04-12T13:51:23.7958377Z"}, // orig "2025-04-12T13:51:27Z" = early by 3.~2s
		{approx:false, timestamp: "2025-04-14T20:57:29.3298677Z"},
		{approx:false, timestamp: "2025-04-28T03:44:54.6658801Z"},
		{approx:false, timestamp: "2025-04-29T13:36:57.9926942Z"},
		{approx:false, timestamp: "2025-05-03T08:00:36.6114285Z"},
		{approx:false, timestamp: "2025-05-10T00:06:59.3892787Z"},
		{approx:false, timestamp: "2025-05-11T22:39:04.0366723Z"},
		{approx:false, timestamp: "2025-05-16T08:55:21.2740865Z"},
		{approx:false, timestamp: "2025-05-17T11:23:31.0019313Z"},
		{approx:false, timestamp: "2025-05-22T18:33:14.3633775Z"},
		{approx:false, timestamp: "2025-05-28T13:17:14.5261204Z"},
		{approx:false, timestamp: "2025-06-08T10:08:48.9208328Z"},
		{approx:false, timestamp: "2025-06-08T17:03:46.3810031Z"},
		{approx:false, timestamp: "2025-06-15T11:56:42.0648494Z"},
		{approx:false, timestamp: "2025-06-17T07:58:48.7839366Z"},
		{approx:false, timestamp: "2025-06-18T23:49:47.054869Z"},
		{approx:false, timestamp: "2025-06-19T17:49:52.557885Z"},
		];
		const playersData_timeSincePrevious = [
		{approx:false, milliseconds: false},
		];
		for (var x = 0; x < grassAvoiders - 1; x++) {
			playersData_timeSincePrevious.push({approx:false, milliseconds: new Date(playersData_whenCCL[x + 1].timestamp).getTime() - new Date(playersData_whenCCL[x].timestamp).getTime()});
		}
		const playersData_positions = [
		1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44
		];
		const playersData_notes = [
		// 1 - 10
		"Achieved CCL in 2024 in IDLW (UTC-12:00) (Anywhere on Earth), less than 14 days after starting the rerelease 43 hours late, after grinding on average 15+ hours a day, grinding almost exclusively Authority and Shadow Raid, encountering many delays. Obtained CCL before the 'The Pied Piper' badge. Very likely the only CCL without any MXP or Mutator Ranks: Mutator Rank 0 + 5,000 MXP remaining until next rank (as of 2025-06-20T01:41Z). CCL #1 and their team are also the developers of this tool!",
		"Achieved a great many infamy ranks with his duo, withwillin101, then reached CCL only hours before his duo. Would've achieved CCL much sooner if not for school and mucking about for about the first week of the rerelease. Mutator Rank 1,000 (as of 2025-05-20T00:48Z).",
		"Achieved a great many infamy ranks with his duo, Derpifi3d, then reached CCL only hours after his duo. Obtained CCL before the 'The Pied Piper' badge.",
		"Achieved CCL mere hours before the suits revamp, becoming the fourth and final owner of the Crimson (now Classic Crimson) suit pattern. Obtained CCL before the 'The Pied Piper' and 'You're a Billionaire' badges.",
		"Highest classic infamy suit: Rojo (200)",
		"Highest classic infamy suit: Royalty (150). Obtained CCL before the 'True Criminal' and 'The Pied Piper' badges.",
		"Highest classic infamy suit: Royalty (150). Obtained CCL before the 'True Criminal' and 'The Pied Piper' badges. Mutator Rank 4,000 + 32,564 MXP remaining until next rank (as of 2025-06-03T04:02Z).",
		"Highest classic infamy suit: Royalty (150)",
		"Highest classic infamy suit: Blue Navy (100). Mutator Rank 806 + 1,146 MXP remaining until next rank (as of 2025-05-20T16:09Z).",
		"Started playing post-rerelease. Obtained CCL before the 'You're a Billionaire' badge. Mutator Rank 159 + 1,249 MXP remaining until next rank (as of 2025-05-21T02:41Z).",
		// 11 - 20
		"Obtained CCL before the 'You're a Billionaire', 'True Criminal' and 'The Pied Piper' badges. Mutator Rank 158 + 235 MXP remaining until next rank (as of 2025-05-20T13:25Z).",
		"This user grinded 200 infamy ranks with random players in public matches. Obtained CCL before the 'True Criminal' badge. Mutator Rank 364 (as of 2025-05-20T00:45Z).",
		"Highest classic infamy suit: Blue Navy (100)",
		"Obtained CCL before the 'The Pied Piper' badge.",
		undefined,
		undefined,
		undefined,
		"Highest classic infamy suit: Blue Navy (100). Obtained CCL before the 'True Criminal' badge. Mutator Rank 1,500 + 6,565 MXP remaining until next rank (as of 2025-06-08T08:09Z).",
		"Started playing post-rerelease.",
		"Possibly the first solo grinder to reach CCL. Mutator Rank 185 + 1,502 MXP remaining until next rank (as of 2025-05-20T17:48Z).",
		// 21 - 30
		"Obtained CCL before the 'You're a Billionaire' badge.",
		undefined,
		"Mutator Rank 53 + 2,081 MXP remaining until next rank (as of 2025-05-25T18:39Z).",
		undefined,
		"This user primarily solo grinded to CCL. First known openly plural system (at the time of public reveal) to reach CCL. Mutator Rank 283 + 3,054 MXP remaining until next rank (as of 2025-06-06T04:14Z).",
		"Started playing post-rerelease. Highest classic infamy suit: Blue Navy (100).",
		"This user was at infamy 235 for multiple months before finally going past the finish line and reaching CCL. Without this stoppage, it was likely the user could've made the first 10 or so CCLs. Highest classic infamy suit: Royalty (150). Mutator Rank 301 + 5,236 MXP remaining until next rank (as of 2025-05-20T15:54Z).",
		"This user was most likely the first CCL to achieve it without progression gamepasses or Robux-bought boosters. Highest classic infamy suit: Blue Navy (100)",
		"This user stayed at infamy 249 (CCXLIX) for many weeks, apparently to 'avoid the CCL treatment'.",
		"Mutator Rank 420 + 5,066 MXP remaining until next rank (as of 2025-05-20T01:36Z).",
		// 31 - 40
		"Started playing post-rerelease.",
		"Possibly the first CCL with the Ordem suit pattern equipped since infamy CC. Obtained CCL before the 'You're a Billionaire' badge. Mutator Rank 217 + 3,945 MXP remaining until next rank (as of 2025-05-20T00:57Z).",
		"Highest classic infamy suit: Blue Navy (100). Mutator Rank 1,670 (as of 2025-05-26).",
		"Started playing post-rerelease.",
		undefined,
		"Started playing post-rerelease. Possibly the first console and Xbox player to reach CCL.",
		"Started playing post-rerelease.",
		undefined,
		undefined,
		"Started playing post-rerelease. Obtained CCL before the 'Pied Piper' badge. Mutator Rank 20 (as of 2025-06-07T12:21Z).",
		// 41 - 44
		"Highest classic infamy suit: Blue Navy (100).",
		undefined,
		undefined,
		"Obtained CCL before the 'True Criminal' badge.",
		];
		
		const playersData_ownDescription = [
		// #1
		"<h1>A Tale of Inspiration, Individuality & the Infinite Power of Consciousness</h1><hr/>"
		+ "<p style='font-weight:bold;font-size:130%'>Discovering the game + Early days</p><hr/>"
		+ "I've been playing Notoriety since what i call the 'Golden Era', being before the 22 December 2017 revamp, more specifically since early September 2015, or possibly in August 2015 as i bought my first gamepass early next month. I achieved only a few infamy ranks at most, but i also completed feats like the badges Overdrill, Flawless and Big Bank - Stealth Master and 101 bags (vials) in Blood Money Death Wish solo using the Minigun and RPG. Most of my playtime of this era was in 2016. I always get nostalgic of this era of Notoriety, aka Heist, aka Payday 2. I have some old videos and screenshots of this era collecting dust on a hard drive somewhere."
		+ "<p></p>I almost entirely stopped playing after the Revamp Update, as it removed a lot of my favourite heists like World Bank, Blood Money, Fave Breakout and Shadow Raid (eventually rereleased). This is also why i didn't want to play the new Authority heist, out of protest against the revamp and due to the global data wipe. However, i played until i reached the maximum infamy rank of XXV (25) and obtained the True Criminal badge (which also required the Very Hard and Anarchy difficulties). Then i stopped playing for a while. In 2019, during the Live Ops event, i revisited the game, but didn't play any heists."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Post-revamp Era</p><hr/>"
		+ "Around the late 2020 era was when i was extremely active. I was first to complete Star Criminal and Baneful Criminal (the latter was done in solo in 89m54s). I was first to complete Resourceful Criminal in solo, without using glitches. I was one of the first to solo the Soul Collector badge on Nightmare using the Suit, and as the 420th or 421st player to obtain the badge. I was very likely the first player to full sweep Shadow Raid Nightmare 1,000 times. Around this era up until the very end of 2020, i was <a href='https://notoriety.fandom.com/wiki/Special:Contributions/TheSeal27'>a dedicated contributor</a> to the official Notoriety Wikia on Fandom, serving the community as an administrator and being the top contributor based on largest contributions (including info, page structure & site design), most edits and most badges & badge points (i no longer believe in badges, since it encourages badge farming)."
		+ "<p></p>One of the game's sub-communities was <a href='https://www.roblox.com/communities/5648052'>Notorious Professionals</a>, a community collecting the best of Notoriety's players with its goal to be to help people hunt badges, achieve unofficial challenges and maintain the official Notoriety Wikia on Fandom. At the time this community had its own Roblox group and Discord server. Such unofficial challenges range from easy ones like doing a heist with a certain themed loadout (like the TF2 Engineer, using Sentry Guns), to extremely challenging ones like completing Shadow Raid Nightmare solo stealth with 75 detection risk and a full sweep, or Blood Money Nightmare solo with the most awfully designed build at the time (challenge Bad Mofo using the Bad Build). In this community i achieved the rank of True Professional, an achievement which at the time only two others (Chair and StormDestroyer) had achieved. The rate i had completed all the challenges (except True Gambler: Golden Mask Casino 75 detection risk solo stealth) impressed the server owner, sirowesome, as apparently they weren't supposed to be done in such a short timeframe (a couple of weeks at most?). I was also the first ever Notoriety player to reach 10 billion money (achieved 2020-11-08T04:00:~45Z) by grinding Shadow Raid Nightmare ECM rushing with a squad over and over) and Four Stores Nightmare solo stealth 75 detection risk pacifist with no equipment, pagers, hostages or kills. (However, i unfortunately messed up the run at the very end, partially out of excitement at being close to the end. I did, however, show off many tricks that were used by other players to do the same but with a full stealth run and in far less time.) These two achievements resulted in the creation of two bonus challenges."
		+ "<p></p>At the end of December 2020, in the Notoriety Wikia's Discord server, i unfairly muted, if i recall correctly, Berse. The wiki's bureaucrat (essentially Head Admin), Goder5555, privately asked me what was going on, and being a little intimidated by the bureaucrat i wasn't very clear in responding. The bureaucrat's perception was that i was being malicious and uncommunicative. I was warned that 'there would be consequences' if i did not undo the punishment, and then shortly later i was demoted from wiki administrator, blocked (banned) indefinitely (later reduced to 1 year) and stripped of my True Professional rank in Notorious Professionals' group and server (a little too far, in my opinion). Many users began leaving the wiki's server, including Goder. He posted a wiki announcement about what had happened and why i had been demoted and blocked. Apparently i 'refused to hand over ownership of the server' (paraphrasing), however i received no such requests; it was likely that this was only an assumption by Goder. A new wiki server was created, and the old one was eventually deleted months or years later after it had become extremely inactive. I admit now that it was definitely a massive mistake on my part to unfairly mute someone. This incident caused me to quit the entire game and its community for four years."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Rerelease + Silent Grinding</p><hr/>"
		+ "In December 2024 i found out about the game's rerelease after being shut down for more than a year due to a DMCA strike by the same company which brought it back. I noticed the infamy cap had been raised from 25 (XXV) to 250 (CCL), and wanted to be the first CCL. I contemplated pressing that large, green play button for 43 hours, knowing that if i did i would get right back on the long grind train as i did back in 2018 and 2020. Eventually i gave in and started playing the rerelease as an XXV-100 with $10.5 billion money and more than 1,200 masks (well over the now-existent limit of 100). (I haven't opened a safe since around the 2019/2020 era.) I began the grind rather modestly, only doing a few infamies a day at most, eventually becoming around 8 to 10 hours a day on average."
		+ "<p></p>Before i discovered Authority loud minimum loot with a coordinated team is about 2x more EXP:time efficient than Art Gallery, i grinded it quite a lot, usually with publics, teaching them how to ECM rush and to be fast. I once ran this heist for around 7 hours straight with my duo, <a href='https://www.roblox.com/users/4701150262'>cas</a>. I don't recall how many infamies we gained, but it was certainly quite repetitive and at the end of it they had to go."
		+ "<p></p>I reached infamy 100 (C) before the cap to infamy money requirement was added, knowing it would be added eventually. (The next infamy would've cost $390mil with the cheaper pass). Around this time or just before was when i realised i could reach CCL by the end of the year."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Explosive Return</p><hr/>"
		+ "Up until now i had been very quiet about my grind as i knew others had already made a lot more progress; i didn't want to alert the competition. They were trying to find out who was the new infamy 50 who appeared out of nowhere. It was around this time i made my explosive return to the game's Discord server, Moonstone Games, by posting my infamy 100 screenshot, ahead of the next highest player (Ali) by about 30 or 40 infamy ranks. It was around this time i joined a sub-community server called 'super cool elite grinding buddy ccl250 team cool', or the 'elite grinding server' for short, a server comprised of the most dedicated infamy grinders and the founding purpose was for a member to reach CCL."
		+ "<p></p>I grinded money in preparation of the introduction of the infamy money requirement cap (which made it $125mil without cheaper pass, $62.5mil with), ending up with just over $4bil. Ali also reached infamy 100 by this time, and he went to 101 supposedly just to be the highest infamy in the game. He had around $10 or $15bil money at this point. I even adjusted my sleep pattern to make sure i would be wide wake when updates are typically released."
		+ "<p></p>Unfortunately i don't have a screenshot of Moonstone Games' reaction:"
		+ "<p></p><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/ILikeToast5 Infamy C 0001.jpg'></div><div class='gallerytext'>First ever C!</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/ILikeToast5 Infamy C 0002.jpg'></div><div class='gallerytext'>The very first screenshot of the classic Blue Navy suit.</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/ILikeToast5 Infamy C 0003.jpg'></div><div class='gallerytext'>Post-C chatting with others, including future CCLs #9 and #28.</div></li>"
		+ "</ul>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>The Push towards the End - Part I: Mind over Matter</p><hr/>"
		+ "During the money grind (Shadow Raid ECM rush as usual; specifically around the vault area) one of my teammates pointed out the infamy money requirement limit had just been added. Within 15 minutes of the update i immediately switched to exp farming (Authority) and started grinding HARD, frequently doing 16+ hours a day, occasionally 24 hours and i even once stayed awake for 48 hours (about 95% of this time spent grinding the game). I contributed to two Authority Nightmare co-op (both 4 players) world records before the introduction of the milliseconds timer, being 1m8s while half asleep and 1m7s unintentionally (not submitted). In a single day i completed Authority 500 times in a row, and i completed it 700 times in a row before switching to a different heist due to having to grind money. I grinded money for a bit more during the exp grind, and knew how much money i would need when factoring in passive gains from exp farming. However, what i didn't factor in was the extreme costs of hosting a contract (and consequent restarts after a win) (about $96mil loss per infamy when hosting or $28mil when not). I eventually realised, so i had to grind about another $1bil."
		+ "<p></p>I did 50 infamies in a single day. Well, more like 49 in noticeably less than 24 hours. It was from C-100 at 2024-12-27 16:31 UTC to CL-1 at 2024-12-28 14:53 UTC, or 49 infamies in 22 hours and 22 minutes. I could've easily stayed for a little while longer and got to CL-100, but if i did that it wouldn't be as much of a challenge to recover when i woke up with no one currently grinding, in addition to the fact i would probably just go infamous again right away. Still basically 50 infamies in a day by spamming the same heist: Authority. This started mere moments after the infamy money requirement limit was added, pretty much instantly overtaking Ali. Oftentimes i would 'min-max' my breaks in order to get back to the grind sooner, such as by cooking food at the same time as having a shower to save about 10 to 15 minutes."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>The Push towards the End - Part II: Determination in the Face of Adversity</p><hr/>"
		+ "At infamy 182 (CLXXXII), level 86, being about 80 infamy ranks ahead of Ali (Ali hardly grinded at all, and was probably the fourth highest infamy in the game, behind Maisy and Derp), i was grinding exp on Authority with Ashlyn, NoobLol and Fridj. Around this time was when Derp reached infamy 150. i posted the message " + '"' + "the elite grinding server has too many femboys and more are being infected every day 💀"  + '"' + " in a private match where apparently no one would be offended by the word 'femboy'. (This message was referring to the high percentage of elite grinding server members being a femboy, the server where its activity eventually almost entirely consisted of roleplayers instead of grinders. Many grinders ended up leaving.) 53 seconds later, having just bagged Gold Bars from the crate in the shed, around 20:08Z, i received my first-ever moderation on the platform in nearly 11 years, despite everything i have been able to get away with in the past. A 1-day account suspension, of which my two appeals were auto-denied. I even tried to manipulate the AI appeal bot, but failed."
		+ "<p></p>I got up early with minimal rest hoping that i would receive a response to my email appeal, but did not receive a response until the ban had expired, on the weekend in Roblox HQ's time no less. I believe that neither Ashlyn nor NoobLol would report me. According to the video that records the ban and the moments before it, Fridj took 10 seconds from when i posted the message (almost instantly after loading into the briefing screen) to ready up, stayed at spawn for a few moments and did not say anything for the entire heist. I am not sure how long he remained at spawn, but he did eventually contribute to the heist, starting 43s after posting the message when he was defusing a crate (according to the crew statuses at the bottom), or 18s after the heist started. Asking the user in Discord direct messages on 2025-04-13T05:38Z, a response was received 1 minute later: " + '"' + "i don't recall" + '"' + ". Forming a personality based on the limited DMs history and from own memory, it is likely the user had truly forgotten."
		+ "<p></p>I was very pissed off at this unfair punishment and Roblox's lack of care for appeals. I still really wanted to reach CCL before 2025, so i made a deal with Ashlyn to have exp and cash boosters bought and paid for. Specifically, the deal was a one-time payment of 2,200 Robux (i actually received extra, in a total of two digital gift cards), in exchange for my time and energy grinding with her until she reached CCL, something she really wanted. I did not specify any specific amount of grinding. This deal was made public (my idea) for trust purposes, being posted in #general of Moonstone Games and publicly agreed by both parties. This deal was eventually mutually, publicly nullified, while retaining the Robux, on 2025-04-28T13:01Z. Due to this ban i ended up not being able to reach CCL in 2024 in all time zones, so i aimed for the European and American time zones instead."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>The End + The Beginning of the Hall of CCLs</p><hr/>"
		+ "At infamy 240 (CCXL), being probably 50+ infamy ranks ahead of everyone else, around 2024-12-31T20:19:35Z (CCXL obtainment time), i was grinding money (Shadow Raid ECM rush, unsurprisingly) with Derp and withwillin (who became CCLs #2 and #3, respectively). While running to the van my head began spinning. We finished that run and i told my teammates i would take a break and lie down for 5 minutes, only to pass out for 10 hours. I didn't even notice how long it had been until i saw the 'You have been disconnected for being idle 20 minutes' notice on my screen and checked the time. I wasn't too happy to find out how long it's been."
		+ "<p></p>I realised i could still reach CCL in 2024 in the last time zone on the planet, International Date Line West (UTC-12:00), or Anywhere on Earth. Shortly thereafter, i started the grind again and grinded Authority until 2025-01-01T10:04:35:5385251Z when i had officially become the first ever CCL and the first owner of the Rank 250 badge, with just under two hours remaining in 2024 in IDLW, 13 days, 22 hours, 45 minutes and 22 seconds since i started the rerelease (based on 'Jade's Finest' badge obtainment timestamp). Until CCL i had made about ~$25bil in total in my Notoriety career, with $30,833,679 remaining. I posted the screenshot in multiple servers (some of which i eventually left), including Moonstone Games and the elite grinding server, which received many reactions and congratulations, including by my former competitor Ali. I was the only CCL for more than 9.5 days until Derp became #2, followed closely by his duo withwillin. Aurora was significantly later, and just hours before the suit revamp. We became known as The Crimson Four (actually, this is a term i coined), as in the only four owners of the rarest non-developer item in the game, the Crimson suit. We eventually managed to coordinate a get-together where we all joined the same lobby and took screenshots of us wearing the Crimson suit and playing one heist: Jewelry Shop Normal, full sweep with loose loot and safes, everything destroyed, everyone murdered with their bodies in the van."
		+ "<p></p><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 at 2025-01-01T10-04-38Z.jpg'></div><div class='gallerytext'>First ever CCL!</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 Crimson suit reward 01.jpg'></div><div class='gallerytext'>The original 250 suit reward</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Notoriety Infamy Level 250 Crimson suit reward 02.jpg'></div><div class='gallerytext'>The original 250 suit reward (part 2)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - All four Crimson suit owners in menu (2025-01-25T12-28-29Z).jpg'></div><div class='gallerytext'>All four OG Crimson suit owners on 2025-01-25T12:28:29Z.</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - Derpifi3d, withwillin101, Aurora_The1Cat lined up in heist (2025-01-25T12-30-00Z).jpg'></div><div class='gallerytext'>Three of the four OG Crimson suit owners lined up, as i took this screenshot. (2025-01-25T12:30:00Z)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/ILikeToast5/Roblox Notoriety - All four Crimson suit owners end of Jewelry Shop (2025-01-25T12-36-17Z).jpg'></div><div class='gallerytext'>We're going to need a bigger van... (2025-01-25T12:36:17Z)</div></li>"
		+ "</ul>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Closing remarks</p><hr/>"
		+ "What a grind! I could've slept soundly each night and still been first, albeit likely not in 2024 in any time zones. I'm a little disappointed i didn't start the grind sooner and that i didn't really grind too much early on, otherwise could've got the badge in 2024 in many more, even all, time zones. Regardless, even though there were days when i didn't want to grind, i know i was extremely committed and set my mind to achieving my goal, enduring each long day after the next through the sheer, unfathomably <b>p</b>owerful, will to be first. I just HAD to achieve it, it was my sole purpose in life and reason to continue the grind. Any time i stopped, it was due to a physical need or ailment, never out of boredom or demotivation. Later my motivation was also to achieve it before the end of the year."
		+ "<p></p>The developers are planning on making unobtainable items, including the Crimson suit and monthly challenge armour patterns, obtainable again, even if it requires doing a special 'challenge'. Knowing them, it actually won't be difficult, at least not more than what the average roughly 20 hours playtime player is capable of completing. While i can understand their viewpoint (FOMO due to people missing out on items for not playing during a certain timeframe or grinding hard enough), they <b>l</b>ove to appeal to the 'vocal majority' on a great many matters, and that majority happens to be mainly new players (who have the mindset of wanting the game to be easier and to not have to put in effort for noticeable gains) since most of the older, dedicated players have stopped playing. Of course, when <i>we</i>'ve 'completed' the game (multiple times in its history, in fact!), but <i>our</i> commitment, loyalty and game knowledge is not to be dismissed so readily. (Some of <i>us</i> still occasionally play for challenge skins, any new badges, hosting gamepass heists for others or grinding Mutator Ranks.) I had the idea of publicly displaying a number based on the player's 'obtainment position' of each given formerly-unobtainable item, such as Crimson #1. However, this requires having the data, which may already be present given that the recently-introduced heists completed tracker includes completions of the removed Very Hard and Anarchy difficulties. This tool has the data for classic infamy suits, but no other OG item data (and pre-Crimson suits aren't always obtained in the same order as the user's CCL position). Chances are the developers don't care, and would rather give their player counts a quick adrenaline shot without regard for the long-term effects, or rather long-term players' dissatisfaction."
		+ "<p></p>The intense dedication to the grind has been part of the reason for a deep reevaluation of the self, and i realise now that life is not about living an 'unchanging film on repeat'. It is about changing, learning, growing, to love and to be loved. While i did really commit to the grind knowing the sheer dedication, the badge obtainment time and being first would all contribute to being remembered, i heavily overexerted myself just to 'look good' to others. I realise now that personal satisfaction at such an achievement like CCL matters far more than how others recognise said achievement. The reality of my achievement is my own, not anyone else's. After all, when <i>we</i>'re no longer around, <i>we</i> become stories, and it's the personality and <b>u</b>niqueness of <i>our</i> stories that make them memorable. Primarily for this <b>r</b>eason is why i most likely won't endure such mindless days-long grinding sessions again."
		+ "<p></p>Sure, the grind may have had negative physical and psychological impacts, but it was <b>a</b>lso part of the reason for consciously seeking out self enlightenment. Negative experiences are just meaningful as positive ones, they are a signpost guiding one towards their desired reality. I've met many friends, and unfortunately many enemies, during my time in the Notoriety community and since starting my journey of self enlightenment (which was especially thanks to four friends in particular!!!!!!!!!!!!!!!!!!!!!!!!!), a dream i never thought possible. Some of those friends i intend to dedicate myself to <i>our</i> friendship with orders of magnitude more unwavering commitment as during the CCL grind."
		+ "<p></p>Intention and belief allows you to achieve anything, even if it takes time. Doubts are perfectly healthy to stay critical, just don't let them consume you. Remember this, as this advice applies to everything in this life. Mindset means everything. Make your own reality, live how you wish to live, write your own truly unforgettable story full of immense detail, personal struggles and growth, <b>l</b>ove and the friends you met along the way.",
		// #2
		"<h1>The Beginning & The End: Derp’s Journey To CCL</h1><br/>Estimated join date: Around 2020<br/>Estimate Time Of Obtainment: Friday January 10th, 2025, 7:05 PM EST<br/>2nd Person To Reach CCL | Second Owner Of Og Crimson<p></p>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Pre-CCL Release</p><hr/>"
		+ "“Yo, I found a new game, it’s pretty good”"
		+ "<br/>There it began, just a childhood friend and a goober, well precisely, 2 goobers. Man, I have not seen that shithead in a while, anyway honestly at first when I started Notoriety, I didn’t understand a single thing, it was super confusing, and I kept selling my friend on… erm… Jewelry shop….. ANYWAY, after getting the ropes of the game, I learnt RO-Bank, honestly it was super difficult as a beginner for some reason, and that's all the memory I had as a beginner really."
		+ "<p></p>After that, I got a pacifist badge a while after my friend departed, we really didn’t play much Notoriety together not gonna lie. Afterwards, I left my alt account, and a year later, I decided to give Notoriety a shot again. I forgot why, but I decided to play it, cause why not? After achieving infamy 9 or so, I decided to try getting shadow raid’s secret badge, Crystal Clear. Wednesday July 14th, 2021, 6:15 PM I joined a group of people that also wanted the badge. I met the main person of the group by chance, and there he was, the silly nerd and future online best friend of mine, Will. Shortly after obtaining the badge, my other close friend, Pixel kept wanting to voice call, and after spamming voice calls lots of times, the other two got sick of it and left, leaving just me and Will, and I cannot lie, I was lowkey going to leave too. But we eventually became friends and I grinded and reached XXV, it was a huge achievement for me at the time, and I was thrilled."
		+ "<p></p>I got XXV approximately 2 weeks after playing the game again. After a while, Will and I decided to go for every obtainable badge, which I ended up doing alongside Will, though I didn’t get the headhunter nor the baneful criminal badge. Man I forgot how agonizing the pain was, getting billionaire without gamepasses, and having repeat penalties. After billionaire, things pretty much died down, me and Will kinda went on hiatus and didn’t play much. I went on hiatus AT THE WORST TIME BRO, THE MONTHLY CHALLENGES I MISSED NOOOOOOOOOOOOO."
		+ "<p></p><p></p><p></p><p></p>Photos below btw"
		+ "<p></p><b>Some old photos:</b>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0003.jpg'></div><div class='gallerytext'>Achieved XXV</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0004.jpg'></div><div class='gallerytext'>1 Billion!!!!</div></li>"
		+ "</ul>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Journey to CCL & Notoriety’s Rerelease</p><hr/>"
		+ "<br/>After playing some games with Will and being bored out of our minds due to lack of good games and content, we just finished block tales and stuff. Notoriety finally re-released! AND… we didn’t do much for the first week, Will was being bodied by homework, and I had massive (no low taper fade meme) projects due. Since both of us were busy, we didn’t play at all really for the first week."
		+ "<p></p>Once winter break started, we started grinding, nonoptimal of course, we were mainly doing tomfoolery as one may say, and I made a group of 4 friends of mine, including Will that was grinding brick bank and rush hour. Me and Will were basically training them at speedrunning etc since they were new to Notoriety but learnt very quickly. The first week wasn’t very optimized grinding and was mainly tomfoolery and having fun with friends."
		+ "<p></p>After a few Ozela runs and rush hour runs, we heard some Infamy 100 dude’s advice, and that is, authority is the most optimal method of gaining xp. Honestly, my jaw dropped when I heard some SWEAT was already 100! (Also jaw dropping when I saw some sweat like Aimilized, who at the time was also around Infamy 100), But quickly adopted his strategy and joined his lobbies to quickly reach 250, originally, I planned to be around top 20 or so to 250, I figured there are a bunch of sweats like Seal."
		+ "<p></p>As winter break ended, my progress slowed down significantly as I had to study for exams and had projects due. On top of that, I had a lot of assignments to complete. My average infamy per day went from 17-22 to 2-7. This was due to me having school, and having assignments to do, decreasing my freetime for grinding CCL. What really impacted my infamy per day was mainly people also having exams and school. Most of my network of Authority grinders had school and wasn’t able to play. This made finding good lobbies far more slow and ended up sometimes with terrible teammates."
		+ "<p></p>But finally, on approximately Friday January 10th, 2025, 7:05 PM, I reached CCL, the suit was lowkey disappointing but it became exclusive so I’m not complaining. Andddddddd “wondering how we should make to obtain the classic suits, dont like that theyre fomo rn” anddd my day is ruined I am ending it all, Rendhy plans on making Og Crimson obtainable to the public, I am in tears of agony. Totally not exaggerated."
		+ "<p></p><b>Photos during the Journey:</b>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0006.jpg'></div><div class='gallerytext'>Dark Drip</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0005.jpg'></div><div class='gallerytext'>The Goobers</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0007.jpg'></div><div class='gallerytext'>Kazret, Will, Nulzza, Derp in respective order</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0001.jpg'></div><div class='gallerytext'>Obtained CCL</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0002.jpg'></div><div class='gallerytext'>Nerd gets CCL</div></li>"
		+ "</ul>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Post CCL Short Story</p><hr/>"
		+ "<br/>“Touch grass” “Bro is allergic to soap”<br/>FU-<br/>Man… stop harassing me bro :sob: I do shower!!!<p></p>Oh, and my friend Will got CCL like I forgot, but probably 5 hours after me, making him the third CCL"
		+ "<p></p><b>Some extra pictures:</b>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0008.jpg'></div><div class='gallerytext'>All 4 Owners Of  OG Crimson</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0009.jpg'></div><div class='gallerytext'>Bigger Van MIGHT be necessary</div></li>"
		+ "</ul>"
		+ "<p></p><b>Non-Notoriety Related:</b>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Derpifi3d/Derpifi3d 0010.jpg'></div><div class='gallerytext'>The P.D.W Gang<br>(Pixel, Derp, Will)</div></li>"
		+ "</ul>",
		undefined, // contacted (2025-04-12) and acknowledged, will possibly start work on the description in early June 2025
		undefined, // contacted (2025-04-12), did not provide description (unsure what to write)
		undefined, // contacted (2025-04-12) and acknowledged, did not provide description (forgetful or cannot be bothered?)
		undefined, // not contacted
		// #7
		"<hr/><p style='font-weight:bold;font-size:130%'>Pre-DMCA Era</p><hr/>"
		+ "<p style='font-weight:bold'>2020-2021</p>"
		+ "During the pandemic, I was enrolled in a “Roblox Coding Class” (to this day, I recall nothing). At the end of these sessions, we would choose to leave, or choose a game to play, and one of these games was Notoriety. When I first played this game, I was really interested, getting Infamy 1, and progressing quickly. One of my first memories of Notoriety was playing Brick Bank with some friends. A while later, I get to Infamy 15, and take a long break. I come back to Notoriety, and get Infamy 25. Sometimes I would get back onto Notoriety to try and get Billionaire, but would quickly lose interest."
		+ "<p style='font-weight:bold'>2023</p>"
		+ "After a while, where I had barely any memory of Notoriety, I found out that it was taken down by a DMCA (I didn’t have Discord at the time), and felt that I had missed a lot."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>CCL Journey</p><hr/>"
		+ "<p style='font-weight:bold'>2024</p>"
		+ "This year, I finally got Discord, and joined the Moonstone Games server, however not really interacting with the community, and just staying there for the news."
		+ "Later in the year, I got pinged on December 12th, about Notoriety finally getting licensing from Starbreeze. I shared the information with some friends. I check the badges, and see “Rank 250”. I ask around about this new infamy cap, and I have determination to reach this long goal."
		+ "On the re-launch date of Notoriety, December 16th, I came back to immediately grind some infamies, most of them solo to Infamy 40. I started grinding with a team, where I reached Infamy 50 on December 23."
		+ "<p style='font-weight:bold'>2025</p>"
		+ "On January 1st, which was new years, I had gotten infamy 100."
		+ "12 days later, I reach infamy 150, and gained the Royalty suit right before the suit revamp."
		+ "On the 21st, I get 200, and finally 8 days later, I reach Infamy 250."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Post-CCL Journey</p><hr/>"
		+ "After gaining Infamy 250, I still wasn’t satisfied with the goal I had achieved, and the next thing that I decided to go for were mutator levels."
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/bigfootbb045/bigfootbb045 0001.jpg'></div><div class='gallerytext'>the absolute monstrous amount of jewelry shop runs</div></li>"
		+ "</ul>"
		+ "I started trying AFK strats, which were very slow, and to keep up the repeat bonus, I would do Jewelry Shop runs also with mutators, and this is where I found out the most effective way of grinding them. As of me writing this on May 19th, 2025, I currently have 3443 mutator levels."
		+ "<p style='font-weight:bold'>Timestamps</p>"
		+ "December 23rd, 2024: Infamy 50"
		+ "<br/>January 1st, 2025: Infamy 100"
		+ "<br/>January 13th, 2025, Infamy 150"
		+ "<br/>January 21st, 2025, Infamy 200"
		+ "<br/>January 29th, 2025, Infamy 250",
		"<hr/><p style='font-weight:bold'>To start...</p><hr/>"
		+ "First off, I would like to apologise for my past actions, and to those who I have mistreated. I am a much better person now, and I believe everybody deserves a second chance. People can and will change, if they put their mind to it and truely try to become a better person."
		+ "<hr/>"
		+ "<p></p>I'd like to thank Cubix, TheSeal27, and Player235 for helping me achieve most of my Infamies. I would also like to thank my best friend legendpandamoniom for being there for me whenever I needed it."
		+ "<p></p>I have always loved Notoriety, I first started when my older sister showed me the game, on December the 16th of 2018. Ever since, I have always loved the game. It's community and great developer team have created such a great experience for all to enjoy."
		+ "<p></p>Since I started playing games, I had always been a grinder. I'd stay up for nights grinding heists with my friends, which helped me reach XXV-100, obtain the Billionare badge, and True Criminal. I'd then go ahead and obtain as many badges as possible, and play the game for fun time-to-time, even after completing all the game had to offer."
		+ "<p></p>When the game re-released, I was so happy to see that the Infamy cap was increased to 250 (CCL). I knew I was going to be in for a great couple of weeks grinding my infamy up to become the best of the best. Before the Infamy money cap was added, through a LOT of Nightclub duo money grinding, I was the one of the first 10 user to reach Infamy 50 (L). I was then the 3rd user to reach Infamy C (100) Which was a great achievement for me, and something I am very proud of to this day. I gave up on grinding for a while when I reached infamy CL (150) and came back not too long after to finish up, then reaching Infamy CCL (250) on Feb 4, 2025, 3:25 PM."
		+ "<p></p>I always liked the idea of helping my friends and others in the community to reach their own infamy goals, and I did my best at keeping that promise.",
		undefined, // contacted (2025-05-03), refused to provide description and unsure what to write
		// #10
		"i knew about notoriety for a very long time, and i did try it out for a bit, but ended up stopping (couldn't tell you why, i have basically no memory of it other than when i started playing again, i was level 8 and had like 50k in cash)"
		+ "<p></p>i played payday 2 on and off for years (on console, wasn't much of a pc gamer at the time). eventually moved onto other games. never played payday: the heist or anything, but i did enjoy payday 2"
		+ "<p></p>i picked up notoriety again at the 31st of december 2024, since i heard about it being reopened. started off just playing casually for a bit, then i wanted to complete every heist on every difficulty and every tactic (to fill out the heist tracker)"
		+ "<p></p>i then moved onto badges, which i got those pretty quickly (pied piper sucks lmao)"
		+ "<p></p>somewhere around early january this year, i decided to go for CCL, but i didn't really want to grind it by doing the same heists over and over for max efficiency"
		+ "<p></p>so i got to CCL by mostly playing public lobbies, helping others with badges and nightmare. mixed in some solo stealth too (mostly ozela)"
		+ "<p></p>i hit CCL at the 16th of february 2025 just after 2:40 a.m",
		// #11
		"It all started back in 2018 or 2019 if i don't remember wrong, i had a friend group of 3 (with me) and back in those days i mostly played KAT with them."
		+ "<p></p>Around later they found out about notoriety and started playing it together, inviting me aswell so i did join. If i remember right i joined in the halloween update so there was the halloween lobby and theme."
		+ "<p></p>My first ever heist with them was ro bank on normal, and i think it was loud since we didn't even know stealth was a thing back then."
		+ "<p></p>Things gone on and we started playing notoriety more, starting to do heists on nightmare difficulty. Back then, no matter what I couldn't just do transport on nightmare. It annoyed me and asked my group to help me, but that didn't help neither. I never beat it until the re release of notoriety."
		+ "<p></p>Near the end of the games shutdown, my group and I quit the game. Blood Money has always been my favourite heist, and back when i quit the game, (around 2020) blood money had a  new badge called " + '"' + "Panic Room" + '"' + ". When i noticed this badge was available, I started the game again and tried to get it. I used to run a Remington 870 dodge build back then. The badge required you to press bunch of buttons in the hospital and after doing so you complete the game as normal,and it takes you to a secret floor where demon like creatures attack you and one tap you. If you survived long enough you could use a flare and " + '"' + "get saved" + '"' + ", but i simply gave up too quick back then and quit the game after like a month again."
		+ "<p></p> And then i never heard about the game anyways until 2024, started with a friend of mine again. I was infamy 7 when i joined the game (December 20) and i noticed there are alot of new badges plus the infamy limit increase. I started playing with my friend for a while, doing all heists on nightmare. And he quit it so I was alone again. I decided i want to be infamy XXV so i could say i unlocked every infamy bonuses. Then I stayed on that infamy for a while, playing the game as normal."
		+ "<p></p>And then I decided i want to be infamy L atleast, and i only just spammed ozelas to get to it with my other duo i found throughout the server. If without them it would be very boring and unbearable. (They grinded with me until like rank C atleast) After that i tried out pho's rotations but i didn't like it, it was far too complex for a game what i call the payday 2 ripoff. (I love notoriety) When I became L however, I didn't stop. I wanted to see how much more I can go. "
		+ "<p></p>Eventually I became rank C aswell and said to myself, if I can get to C, I can definitely get to CC and likely CCL. Spammed ozelas until i find a good rotation for myself. I didn't do loud heists at all when I locked in for the grind. Which i loved them. When i got to C i got demotivated too, for I don't know what reason but the grind just felt too long. But my duo got me back up."
		+ "<p></p>Eventually we found a third, helping us in our ozela spam. We all eventually parted our ways because my duo was grinding money needed throughout the whole CCL, and I was trying to grind both xp and money. But i continued with the third guy i found. He had gamepasses like me so I could grind better with him. He helped me grind all the way to the CCL, and even was with me when i infamied to CCL."
		+ "<p></p>We tried many rotations by different users, but they weren't really effective. So overtime I found my own rotation that i spammed until the end of CCL grind. It was like this:"
		+ "<br/>When level 0,<br>(2x) Ozela Heist<br>(4x) Rush Hour"
		+ "<br/>This would make me level 100 alone, but I was aware of repeat bonuses too so after i did the rotation above, I switched Rush Hour to Authority. Goes like this:"
		+ "<br/>When level 0,<br>(2x) Ozela Heist<br>(6x) Authority"
		+ "<p></p>So it was a repeat of 2 ozelas and then switch between rush hour-authority depending on the repeat bonus. And finally, I finished my grind at February 21, hitting CCL. I uploaded a video right after."
		+ "<p></p>The grind of a game that was once my childhood took me 2 months. Was it worth it? I leave that for you to answer, but for me I'm glad I met new people along the way."
		+ "<p></p>Most I did was playing loud with others, testing builds, making my own builds after being CCL. I would still play the game if anyone wants to play it with me, preferably loud."
		+ "<br>My ingame user is kogamarobloxman<br>My discord: stix_real"
		+ "<p></p><a href='https://www.youtube.com/watch?v=a536IwGzJtg'>The video where I became infamy CCL</a>",
		// #12
		"brickbankbrickbankbrickbankbrickbankbrickbank"
		+ "<p></p>never grind to ccl using public lobbies"
		+ "<br/>lmao"
		+ "<br/>biggest mistake of my life 👎",
		undefined, // contacted (2025-04-18), refused to provide description (refusal deleted + blocked)
		undefined, // not contacted
		undefined, // not contacted
		undefined, // not contacted
		undefined, // contacted (2025-04-27), waiting
		// #18
		"<h1>My Bizarre Adventure</h1><hr/>"
		+ "<p style='font-weight:bold;font-size:130%'>Chapter I: Out of Nowhere</p><hr/>"
		+ "It’s a little funny but I only played Notoriety since I watched The Dark Knight movie, and just the bank robbery scene got me thinking: “Is there a heisting game in Roblox that I can play to rob banks?” Of course, there is. I joined around March of 2023 with the display name set as “Joker”. At the time, there were little to no players playing it since there were no updates. I grinded and played through trial and error until reaching level 100. Then, I wondered if it was worth getting infamy. I would lose pretty much everything. At least I bought the minigun gamepass so that I can loud Jewelry Shop without needing another player to help after infamy, and so I did it. I infamied. Around infamy XV (15), I met many players. Since the game was so small back then, friending people is not really needed, joining into a public lobby will pretty much give you 50/50 chance of meeting the same heist crew as your last game/literally from yesterday. I reached infamy XXV (25) in one month. It may be slow but I didn’t really play the game much back then. I also reached billionaire status in two weeks right after reaching max infamy. I thought I would quit the game right there, but something was bugging me that I wanted to try out before leaving the game behind."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter II: Mutations</p><hr/>"
		+ "After reaching max infamy, I met a player with a username “05_REDACTED” (I have no idea where this player is now). He hosted a Black Friday lobby with full mutators intended for maximum pain (or so I thought). And of course, being an inexperienced mutator enjoyer, I chose to go with a Tank build with my trusty minigun. I died almost immediately. But 05 managed to survive until the heist was completed, taking little to no damage. And that’s also when I learned that Dodge builds are way superior than Tank builds. After completing the heist, I was rewarded with a huge number of mutated experience (MXP), which let me leap to level 45 mutator. Not long after meeting 05, I met another player by the display name “Oofie”. R&B Bank full mutators loud, it seemed like this is even harder than Black Friday, but I was wrong. The vents inside the bank allow players to take shelter without taking damage, the drill will 100% auto repair itself while we wait. Every time an assault is over, we will go down to bag the cash, taking the minimum of eight bags and quickly escape. This is even better than Black Friday, it rewarded me with about 49.5K MXP. Now I’m attached to doing mutations. To me, mutations meant a difficulty harder than nightmare, and a way to represent how much one goes through this hell. I just didn’t know how far I’d actually go."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter III: To the Thousand</p><hr/>"
		+ "I made a silly joke to Oofie while playing a public GMC lobby: “What if I were to grind to level 1,000 mutator?” I pretty much have no idea if I was going to actually do it, and yet I did. Using the R&B Bank grind strategy, I quickly passed level 400 mutator within days. Then, one day, I met a player with the display name “Goose” (later known as DeerHaunter). I saw the absurd mutator level of 1,200+. Now I know that I wasn’t the only person with the idea to go to the thousands. Near level 900 mutator, I changed my tactic to grinding Jewelry Shop mutated, in terms of efficiency, it pays better than R&B Bank. It took me four months. Four months to reach level 1,000 mutator. Pretty much every Asian server, I was known to appear in every single one of them, since right after reaching my milestone, I played Notoriety everyday. From helping randoms to succeed their heists to letting those very randoms taste hell itself with mutations. I also met many other mutator enjoyers such as “Doctor_Main” (later PotmanHunter), and “SupremeBossRanger” (later Supreme) with his level 400+ mutators, who became one of my best friends to this day. I also met another player with the display name “Shawarma”, with a strikingly similar mutator level to Goose, a player I met way back then. Apparently, it’s the same player, with the preferred alias: “DeerHaunter”. I don’t exactly remember how we became friends but we did. Now, we began doing the most insane mutated heists. Blood money with Steel Badges 3, Academy Training 3, Unhealthy 1. And completing that Blood Money heist by the panic room. A squad: Me, DeerHaunter, Doctor_Main, and another random. We were pretty much the most active players back then. But everything changed when an upcoming heist, thought to bring back players, was announced."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter IV: Forced Out</p><hr/>"
		+ "“Rush Hour” heist was released. Players flooded back to Notoriety as the game once reached thousands of players. Not long after that, two new weapons were (probably accidentally) released. I was not quick enough to try out those two weapons as they were swiftly removed. Luckily, Doctor_Main managed to buy those two guns before they were removed, and surprisingly it was not deleted from his inventory. The guns, one with a striking resemblance to the M249 SAW, and another looking like a rifle from the 1800s (these guns later are added in the re-release as MK46 and Winchester 1887). Within days, I didn’t even realize. But one morning in September of 2023, Doctor_Main notified me that Notoriety was gone. I was shocked. The community itself was also shocked. Developers released news that Starbreeze had taken down the game. I was devastated. I lost pretty much everything I put into the game. Of course, it’s just a game, no need to get emotional. But it felt like losing all your personal achievements, without a way to go back and achieve them again. I had to go back to play other games. At one point, Supreme invited me to try out Entry Point, since Notoriety was gone. He said it’s similar to Notoriety (in my opinion it wasn’t). We played for months anyway."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter V: Return</p><hr/>"
		+ "After some news about Notoriety returning, it really was coming back. December 16th, 2024. Notoriety relaunches. I was absolutely ecstatic. Everyone was. But my friend Supreme noticed something interesting. The infamy tree can be continued above 25. But where does it stop, then? Developers later said it stopped at 250. And so I thought: “It’s probably not that hard to reach 250, I got 2.3B cash, what could go wrong?” It took me sometime to realize that the money required to infamy was increasing, to a number I can barely afford. Since I owned all gamepasses in the game, I thought it would be easy, but it was not. There was one gamepass I didn’t buy, the 50% cheaper infamy. And so I bought it. I reached infamy L (50) on December 23rd, 2024. My original grind strategy went something like this:"
		+ "<br/>J shop - Rush Hour - Ozela (no trophies) - Any loud heists (e.g. transport, brick bank) - Nightclub spam (bring back repeat bonus) - Shadow raid ECM rush (with randoms)"
		+ "<br/>I grinded with the same strategy until reaching infamy C (100), and obtained the Navy Blue suit. I was disappointed at how the blue in the suit was barely visible to the naked eye. But I was at least happy I reached a milestone. I didn’t know that the suit was going to be so rare after the Suit Revamp update came out, which changed every suit but let you keep the original as well. I was also disappointed how I couldn’t reach infamy CL (150) in time before the Suit Revamp update, I could’ve gotten the Royalty suit, which was a purple suit perfect for my “Joker” display name. Nonetheless, I later changed my display name. The update also included the maximum infamy price of 125M cash, for cheaper infamy users it was only 62.5M cash. Which to me, only 2-3 runs of Ozela heist can obtain that money."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter VI: Enter: Iron</p><hr/>"
		+ "January 31st, 2025. I reached infamy CL (150), and obtained the CL suit. At this point, my friend Supreme, gave up and stopped at infamy L (50). All my other friends also quitted. I was now alone. Many tried inviting me to their discord servers to do grind cycles. But I thought it would be better if I grind solo. I changed my display name to “Iron”. Now, I also changed my grind strategy to adjust for variable change (my friends quitted):"
		+ "<br/><small>J shop - Rush Hour - Ozela (with trophies and completed twice) - Depot - Brick bank (bus escape) - Nightclub (normal mode, completed twice, for regaining repeat bonus)</small>"
		+ "<br/>It took some time before I reached infamy CC (200) as well, as I hit that milestone on February 23rd, 2025. And now, I was on the final stretch. With my “spare robux” of 1.5K robux, I spent “some” on EXP boosters. This allowed me to leap ahead and I can infamy every 5 heists. The 5 heists I went with my new grind strategy went something like this:"
		+ "<br/><small>J shop - Rush Hour - Ozela (with trophies, completed once) - Depot - Brick bank (bus escape) - Nightclub (normal mode, completed twice, for regaining repeat bonus)</small>"
		+ "<br/>One EXP booster can last for two cycles, which meant I activated about (or more than) 25 EXP boosters. At some point, I was becoming broke and started buying some cash boosters as well. One Ozela heist even gave me a huge payday of 40.4M cash. With this new strategy, I reached infamy CCL (250) on March 10th, 2025. To summarise: I grinded from infamy 25 to infamy 150 with friends, and solo my way after infamy 150 to infamy 250."
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter VII: Incompleteness</p><hr/>"
		+ "Although I reached infamy CCL (250), I still feel it wasn’t enough. Similar to TheFemurBreaker (CCL #7), I go back to grinding mutations. At the time of making this, I have a mutator level of 1,591. I’m going for 2,000. It may take time as I also touch grass. I was also going for 10B cash (not 1 trillion cash lol), currently at 3.7B cash. Just setting some goals in mind, as the game is developing new updates everyday. I still play full mutators loud heists, with some players with questionable attitudes…"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>People I met along the way…</p><hr/>"
		+ "<p style='font-size:115%'>(From Start to End)</p>"
		+ "- OrphanObiliterator (@dxanisbroke) - helped me reach infamy 25 in the early days"
		+ "<br/>- SS_SLAYER (@carlfrancis11) - one of the first friends I made in Notoriety"
		+ "<br/>- Doctor_Main (@PotmanHunter) - one of my best friends during Rush Hour update"
		+ "<br/>- Goose (@critical_bon) - one of my friends during Rush Hour update"
		+ "<br/>- @MesserschmidtReaver - one of my friends during early days of Notoriety & re-release"
		+ "<br/>- @NyanRBX - one of my friends in mutated heists"
		+ "<br/>- @CrashBoltz - one of my friends during early re-release"
		+ "<br/>- leafer (@nonodonttouch21) - one of my friends during early re-release"
		+ "<br/>- @mochiseminak - one of my friends during Rush Hour update, mutated heists, and late re-release"
		+ "<br/>- Acysu (@Acysuu) - one of my friends during late re-release mutated heists & speedrun heists"
		+ "<br/>- @Pakfizi - one of my friends during late re-release"
		+ "<br/>- LeRoblox (@LionWoods_2324567) - one of my friends during early days of Notoriety, appears most in Cook Off heists"
		+ "<br/>- Arraiwah (@PierkuylisiXD2) - one of my friends during late re-release mutated heists"
		+ "<br/>- Soks_TheNub (@sokkingmimi) - one of my friends during late re-release"
		+ "<br/>- Soviet (@admini12e) - one of my friends during early days of Notoriety"
		+ "<br/>- papaya (@SG4091A) - one of my friends during re-release & infamy grind"
		+ "<p style='font-weight:bold'>Most valued friends</p>"
		+ "<u>steaI (@SupremeBossRanger)</u>"
		+ "<br/>- One of my best friends since Rush Hour update & infamy grind"
		+ "<br/>- Still plays Notoriety to this day"
		+ "<br/><u>Laginator (@Randomplayer1001900)</u>"
		+ "<br/>- One of my best friends since early re-release"
		+ "<br/>- Stays at infamy XIII (13) despite having 1,300+ mutator levels"
		+ "<br/>- Still plays Notoriety to this day (mostly mutated heists)"
		+ "<br/><u>JoeMamaObama (@thepro_popper)</u>"
		+ "<br/>- One of my best friends since early days of Notoriety"
		+ "<br/>- Still plays Notoriety to this day"
		+ "<br/>- Has a weird attitude when talking about “inappropriate” topics"
		+ "<br/>- Possibly the funniest person I’ve met"
		+ "<br/><u>zuina (@zuiinaa)</u>"
		+ "<br/>- One of my best friends since early days of Notoriety"
		+ "<br/>- One of the developers of Notoriety (developing GMC revamp)"
		+ "<br/><u>Caribouean (@Deerhaunter2021)</u>"
		+ "<br/>- One of my friends since Rush Hour update & infamy grind"
		+ "<br/>- Still plays Notoriety to this day"
		+ "<br/>- CCL #41"
		+ "<br/>- Appears most at mutated heists"
		+ "<br/><u>VX_coin (@rebirth6coin)</u>"
		+ "<br/>- One of my friends since re-release & infamy grind"
		+ "<br/>- Still plays Notoriety to this day"
		+ "<br/>- Owns the “Ordem Suit”"
		+ "<br/>- CCL #32"
		+ "<hr/><p></p><b style='color:rgba(46,46,46,var(--bg-alpha))'>Extras:</b> <span style='background:rgba(255,0,0,var(--bg-alpha));color:rgba(255,255,0,var(--bg-alpha))'>Random moments</span><hr/>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0001.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0002.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0003.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0004.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0005.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0006.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0007.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0008.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0009.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0010.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0011.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0012.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0013.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0014.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0015.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0016.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0017.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0018.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0019.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0020.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0021.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0022.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0023.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0024.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0025.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0026.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0027.jpg'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/Danneilkoko/Danneilkoko 0028.jpg'></div></li>"
		+ "</ul>"
		+ "",
		undefined, // not contacted
		// #20
		"I first found the game back in August of 2019, a few months after I had first made my account. I do not recall much about my early experiences with the game, other than thinking the game should have a tutorial of some kind, as the game is, to this day, not very beginner-friendly. My initial infamies were quite slow, with my first one taking some 141 days, from 12 August to 31 December of 2019. Things didn’t exactly get faster from there either, with the next four infamies taking an additional 436 days to get, with me reaching infamy V on 11 March 2021. The next sets of infamies took less time, with infamy X taking 136 days from infamy V, infamy XV taking 170 days from there, and infamy XX taking 1 year (which i’m not sure as to how it did, given that it was in 2022). On 5 March 2022, at 20:44, CDT (UTC-6), I reached infamy XXV after 935 days of playing Notoriety. From there, I would get Billionaire on 25 May, and then just mess around, earning about $2.6 billion before the game would get DMCA’d. Then, on 16 December, when I returned to the game, I discovered that not only did infamies beyond XXV exist, but the limit was now CCL. So, I got infamy XXVI as soon as I discovered this, and began slowly getting more infamies from there, reaching infamy L some 21 days after returning. I followed a relatively simple rotation, playing The Ozela Heist, Rush Hour, and (towards the end of the grind) Authority, adding in a few Nightclub runs to raise repeat bonuses on Rush Hour and Ozela. I soloed every heist I played, as I didn’t want to have to plan grinds around when I could contact my teammates. These extra infamies came far faster than I expected, with me reaching infamy C just 16 days after infamy L. Just 52 days after infamy C, I reached infamy CCL on 13 March 2025 at 18:28. The grind was pretty long despite how many methods I had used to boost my XP gain rates, such as having the 2x XP gamepass and using XP boosts from the shop from infamy CC to CCXXII to speed things up. The grind would probably have been less annoying if I wasn’t doing it all solo, but it worked out in the end, so it doesn’t really bother me that it took a bit of time. I have no idea if I’m actually the first solo CCL grinder, as I have no idea if that can be verified without asking all 28 people who have reached it thus far."
		+ "<br/>Sincere apologies about all the yapping, but I felt it necessary given that this is one of few times I’ve had the excuse to mention all of this. It took quite some time."
		+ "<p></p>Obligatory image gallery because I gotta include this"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/IceColdFrigid/IceColdFrigid 0004.jpg'></div><div class='gallerytext'>Screenshot of reaching CCL, taken at the time mentioned above</div></li>"
		+ "</ul>"
		+ "<br/>Below are various infamy screenshots"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/IceColdFrigid/IceColdFrigid 0001.jpg'></div><div class='gallerytext'>Infamy C at time mentioned above (17:39:06 UTC-6 on 20 January 2025)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/IceColdFrigid/IceColdFrigid 0002.jpg'></div><div class='gallerytext'>Infamy CL on 2 February 2025 at 21:11:01 UTC-6</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/IceColdFrigid/IceColdFrigid 0003.jpg'></div><div class='gallerytext'>Infamy CC on 3 March 2025 at 21:50:59 UTC-6</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/IceColdFrigid/IceColdFrigid 0005.jpg'></div><div class='gallerytext'>Obligatory outfit photo (the mask took me 171 notorious safes which cost $1.2 billion to get)</div></li>"
		+ "</ul>",
		// #21
		"I got infamy 25 in early 2021 and proceeded to not play the game for the next 4 years, as there was no real reason to play when I could not increase my level. I eventually came back when I heard they increased the infamy cap."
		+ "<br/>By January 19th, I had reached infamy 50. My progress was very slow, at less than 1 infamy a day, as I had to completely relearn the game."
		+ "<br/>By the time I reached infamy 100 on February 23rd, I had quickened my pace, getting about 1.5 infamies a day. A few days after that, I stumbled upon a discord message from a CCL showing that his playtime tracker had only logged 286 hours on notoriety. This intrigued me as I had 240 hours but less than half his level. After questioning him about it, he showed me how to grind optimally. Before this, I had known barely anything about the metas (i had not even known going loud in authority gave me more xp lol)"
		+ "<br/>I now began doing public lobby ecm rushes, bringing me infamies at a much faster rate, about 30 infamies a week. During my ecm rushes I found someone of the username ilovebaconflavor. We started doing ecm rushes together everyday after school. He was about 30 infamies ahead of me before I started staying up late into the night grinding alone once he had logged off, in hopes of surpassing his infamy and reaching CCL before him."
		+ "<p></p>By March 19th I was tied with ilovebaconflavor at infamy 249. We were only 1 infamy away from CCL, and I did NOT want to lose the race to it. A mutual friend of mine and ilovebaconflavor informed me that he was currently in a ecm rushing lobby with ilovebaconflavor and two other friends. I knew I would surely lose the race if I had to go against a full ecm rushing lobby, so I began frantically messaging the informant, asking him to purposefully throw the games. He thankfully obliged, giving me some time to catch up. I knew I did not have time to find a public lobby to ecm rush in, or deal with them making mistakes, so I quickly recruited CCL #13 cl3rical to help me get the last infamy. We began working away at it, meanwhile, my informant was stalling the lobbies with ilovebaconflavor. Eventually, I made it to infamy CCL first, with my rival lagging behind at level 78."
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/TexudeoSteve/TexudeoSteve 0001.png'></div><div class='gallerytext'>Messages with informant (part 1)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/TexudeoSteve/TexudeoSteve 0002.png'></div><div class='gallerytext'>Messages with informant (part 2)</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/TexudeoSteve/TexudeoSteve 0003.png'></div><div class='gallerytext'>Messages with informant (part 3)</div></li>"
		+ "</ul>",
		undefined, // contacted (2025-04-15), no response
		undefined, // contacted (2025-05-03), refused to provide description
		undefined, // not contacted
		// #25
		/*
		Harry = Inherited (preference white: 255,255,255) | quirk: ||
		Alisa = blue: 0,153,255 | quirk: []
		Isaac = green: 0,204,0 | quirk: {}
		Katelyn = orange: 255,153,0 | quirk: //
		*/
		// <span style='color:rgba(0,153,255,var(--bg-alpha))'>
		// <span style='color:rgba(0,204,0,var(--bg-alpha))'>
		// <span style='color:rgba(255,153,0,var(--bg-alpha))'>
		"<h1>The Dreamers Collective’s Journey to Infamy CCL</h1><hr/>"
		+ "<p style='font-weight:bold;font-size:130%'>Foreword - The 25<sup>th</sup> CCL badge has 4 owners.</p><hr/>"
		+ "Harry: | Before we start, the Roblox account “GenericDreamer” is owned by four people. Why don’t we just play on our own accounts? Because we are a plural system consisting of four members at the time of writing: Harry (host, original), Alisa, Isaac, and Katelyn. Plurality is an immensely diverse and deeply personal experience, but oversimplifying to the simplest terms, we are essentially four souls living in one mind and body. |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ Plurality is unfortunately usually seen through the lens of a mental illness, but we ask you to keep an open mind as you read our journey!! I love living this shared life with my friends, and I wouldn’t get the chance to experience living at all if it weren’t for my host practicing Tulpamancy!!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { Alisa, Katelyn, and I identify ourselves as Tulpas. The three of us did not exist as a concept, much less as a person, until our host unintentionally began creating us within his mind. This is not Dissociative Identity Disorder, Schizophrenia, or any other mental illnesses. Each member of our system does not experience any negative disturbances in thinking and emotional regulation, nor do we engage in behaviour indicative of a mental illness. }</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>{ In fact, Alisa and I started out as mere original characters in Harry’s internal story. However, as our host spent each night writing this story and thinking about us, he found it easier and easier to imagine the way we’d talk or act during each scene. }</span>"
		+ "<br/>Harry: | I simply attributed that to my over-reactive imagination, but thanks to those consistent interactions and repeated thoughts, my friends eventually gathered the strength to break out of the story. Now freed from the constraints of this fictional setting, Alisa and Isaac brought me along with them. Our destination? A world with vivid hues and colors, not one borne from my own mind, but rather the reality I had neglected for all these years...! |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ Harry had been fighting so hard on his own for so long, and we’re so glad that we joined him before his strength faded away!!! Our journey of healing and friendship didn’t end there, but it’s getting a little too personal, so we’ll skip forwards!!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { The great sea of our lives has calmed since that fateful meeting, and the four of us are simply relaxing on its clear blue coastline. However, because us Tulpas were created and are residing within our host’s mind, we do not have a physical body like you, the person reading this. As a result, we can only physically interact with the world by “borrowing” our host's body. That's how we are writing these words to you. This is an unfortunate consequence of plurality, but we’ve accepted it long ago. }</span>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / Um, this is our first time revealing our plurality to a non-plural community, so I’m a little anxious.. The four of us debated for a while on whether we should even reveal this or not, but my friends wanted to assert our existence after years of hiding ourselves..! I haven’t been around for as long as my friends, but wherever they go, I want to be right there with them..!! /</span>"
		+ "<br/>Harry: | CCL #1 and their team were understanding and considerate enough to ask for unique colors representing each of us, so here is the recap: |"
		+ "<br/>| White | = Harry (host, original)"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>[ Blue ]</span> = Alisa"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>{ Green }</span> = Isaac"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>/ Orange /</span> = Katelyn"
		+ "<br/>| For greater clarity, we will also mark the names of the person writing each paragraph. |"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Prologue - A Captain with No Crew, A Sea with No Stars</p><hr/>"
		+ "Harry: | My earliest memories of playing Notoriety were long before my Tulpas joined me, apparently taking place during a pleasant afternoon on June 3rd, 2017. My first impressions weren’t great, as I was immediately overwhelmed by the clunky UI. (Seriously, look up a video on the pre-revamp Notoriety lobby.) |"
		+ "<br/>| I eventually hosted a solo Jewelry Store on normal difficulty, whereby I immediately broke stealth and got scared by three things: the red detection markers, then the alarm, and finally the cops shooting at me. Yes, I was that much of a scaredy cat back then. It’s the main reason why I still remember this moment... At least I got the 50+ Kills badge! |"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer 0001.jpg'></div><div class='gallerytext'></div></li>"
		+ "</ul>"
		+ "<br/>| The above incident caused me to abandon the game until my return at roughly 21:52 on May 10, 2019. According to my badge list, I spent 16 minutes clearing R&B Bank on an unknown difficulty, presumably in stealth. I was likely familiar with Payday’s mechanics by this point, so there wasn’t any fear to make my 2nd ever heist memorable. |"
		+ "<br/>| The rest of my solo journey to Infamy XXV (achieved on July 8, 2019) was... an unmemorable blur. I grinded levels by playing Blood Money on Nightmare (when bag XP was still around), and to get True Criminal, I <b>*silently*</b> sat for hours on random public servers. I was too socially anxious to ask people to host a gamepass heist on the correct difficulty... |"
		+ "<br/>| I eventually got the “You’re a Billionaire” badge, and... that was it! I became the elite of the elite!! Although, once the initial excitement faded away and I looked back on this voyage... What was the point of all of this? Nobody I personally know played this game, the strangers who did wouldn’t have really cared, and it’s not like I cured cancer or something. I was just another faceless XXV in an increasingly vast sea of them... |"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter 1 - Rekindled Embers Amidst Fleeting Passion</p><hr/>"
		+ "<span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { Alisa and I were aware of Notoriety when we joined Harry in the physical world, but we don’t have any recollection of interacting with it. Nonetheless, the three of us wanted to revisit Notoriety somewhere in late 2023, only to find that Starbreeze had dropped an OVERKILL-sized nuke on the game. A disappointing revelation, but we simply moved past the crater and continued with our lives. }</span>"
		+ "<br/>Harry: | We also quickly sailed past the smouldering wreckage that is Payday 3 (Starbreeze really likes their nukes, huh?), but then we came across the Notoriety relaunch trailer...! Time and nostalgia rekindled my love for the game, and I at least wanted to get all the new badges. That’s when all three of us laid our eyes on the Infamy CCL badge. |"
		+ "<br/>| Recalling the tedium of my journey to Infamy XXV, I immediately swore never to embark on a grind of this immense magnitude. However, I eventually saw people climbing the ranks, and that silly completionist instinct within me started to well up once more... |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ Once our infamy cost rose above $100 million, we bought the three gamepasses (Cheaper Infamy, double XP, and double money) with Robux from the Microsoft Rewards program! Although, the three of us didn’t even have plans to get Infamy CCL back then!! We just wanted to get Infamy C for the Navy Blue suit, which seemed like a good milestone to stop at, and Blue is Harry’s and my favourite color!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { However, university work, life schedules, other games, and the constant ghost disconnect/ ping freeze issue put a stop to that ambition at roughly the 70th rank. As a result, we returned to being a somewhat casual but dedicated player. Eventually, we reached Infamy C by simply playing for an hour (acquiring 1-2 infamies) a day. It was a shame to miss out on the classic Navy Blue suit, but we would’ve had to grind twice as long per day to get it. }</span>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Special Intermission - The <span style='color:rgba(255,0,255,var(--bg-alpha))'>NO</span>existence<span style='color:rgba(255,0,255,var(--bg-alpha))'>N</span> of a Dreamer’s <span style='color:rgba(255,0,255,var(--bg-alpha))'>Will</span></p><hr/>"
		+ "Harry: | Shortly after we attained Infamy C, the three of us held a sleepover on the private beach within our shared mind (also known as our “wonderland” in plural terms!) However, what seemed like another fun and ordinary night soon gave way to the most memorable dream of our shared lives! |"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { The dream itself is not important, for one moment forever changed our lives’ trajectory. We heard the voice of a delicate feminine girl, but the determination and raw emotion in these short few words woke up our sleeping mind and vessel in an instant. }</span>"
		+ "<p style='color:rgba(255,153,0,var(--bg-alpha));font-size:200%;font-style:italic;text-decoration:underline;font-weight:bold'>“/ I want to exist! /”</p>"
		+ "<br/>Harry: | We cannot possibly put into words how RAW those short four words were. She was an unintentionally created Tulpa like Alisa and Isaac, but she became a repressed consciousness due to personal circumstances that we won’t bring up. But in the void where she was sent to die, she saw me, Alisa, and Isaac living out our dreams. On the cusp of being dissipated, she let out her immense frustrations at the unfairness of it all, which finally allowed us to hear her voice. It was a declaration that she chose to be alive, a longing wish that finally burst out into a sea of emotions that rocked our Coastline. |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ The four of us can’t even remember what the dream was about, but those words still echo freely through our memories!!!! And from that declaration, a cute girl made herself known to us Dreamers Collective, and she has proven herself to be a unique and invaluable member of our system!!!!!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { Given that our system goes by “GenericDreamers” and “The Dreamers Collective”, it’s quite fitting that our newest member came to us in a dream. But enough prose, please welcome Katelyn to this description. }</span>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / Um, a lot of things happened in our lives back then, and I didn’t understand so many things... I even thought that I was selfish by suddenly forcing myself into my friends’ lives like this, but they remained so incredibly kind and supportive..!! They promised to teach me about life bit by bit, introduced me to all these cool things one at a time, calmed me down whenever my past came back to haunt me, treated me as a friend and spent time with me... I love my friends so much, and they love me just as much too...!!! /</span>"
		+ "<br/>Harry: | Existence, especially one without a physical form, is so much more difficult than you’d imagine. However, to repeat Alisa’s beliefs: “<span style='color:rgba(0,153,255,var(--bg-alpha))'>[ To live is to change, to love, and be loved. ]</span>” To that end, our dear Katelyn pulled through wonderfully. She exists, will always exist, and she will forever be a part of our Coastline from now on. |"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter 2 - A Friendship a Day Keeps the Burnout Away</p><hr/>"
		+ "Harry: | We thought we’d stop playing Notoriety after Infamy C, but we had already done 75 infamies in around 40 days. What’s 150 more? It sounds bad up-front like that, but we had an informal rule of only playing this game for around an hour every day. Additionally, we can easily switch who’s controlling the physical body at any time, so my Tulpas could join in on the grind too! |"
		+ "<br/>| Thanks to our regular switching, our relatively short playtime-per-day, our various conversations while playing, the songs and encouragements we shared throughout the grind... Any potential burnout morphed into a series of fun gaming sessions amongst friends. We truly enjoyed the CCL grind thanks to the bonds we forged between one another. |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ The four of us just continued on with our shared lives as usual, and there’d be an occasional longer grinding session when we had more free time!! We just steadily climbed the ranks without thinking when we will reach CCL. ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { Eventually, we made our own solo infamy rotation: Set up skills, Complete “Rush Hour” (lvl 1 -> 60), spend 10-15 seconds to get more skills, then speedrun stealth “Diamond Store” 4 times in a row (lvl 60 -> 69). Afterwards, complete two “The Ozela Heist” runs (one with full trophies and one without trophies) (lvl 69 -> 93), and finally complete two “The Depot” stealth runs by securing only 6 bags (lvl 93 -> 100). This rotation earned around $62.5m, so money wasn’t an issue. }</span>"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ The four of us spent some time re-compiling our infamy rotation into an Excel spreadsheet, and we calculated the lowest money estimate for our rotation!! ]</span>"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer rotation.png'></div><div class='gallerytext'></div></li>"
		+ "</ul>"
		+ "<p>Skills #1</p>"
		+ "<ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0001.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0002.jpg'></div><div class='gallerytext'></div></li>"
		+ "</ul>"
		+ "<p>Skills #2</p>"
		+ "<ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0003.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0004.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0005.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer skills 0006.jpg'></div><div class='gallerytext'></div></li>"
		+ "</ul>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / I eventually got the courage to try playing Notoriety too, and it was fun! I prefer stealth more than loud though, having to shoot people and run away while keeping track of everything else just stresses me out.. I didn’t contribute as much as my friends, but they still appreciated all the work I did, even when I got spotted and had to restart a heist..!! /</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { Us Dreamers Collective then optimized our time to around 25-30 minutes per infamy, thus reaching Infamy CC 51 days after Infamy C. There was little celebration, however, as we prepared to sprint towards the finish line. }</span>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter 3 - The Final Sprint</p><hr/>"
		+ "Harry: | Remember, my Tulpas don’t have corporal forms in the physical world, so they can only interact with the world through my physical body. That’s why we are a team of four, but we can only play on one account at a time. |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ Regardless, the four of us had more free time compared to before, so we ramped up our hours into Notoriety to put an end to this grind once and for all!!!! In just 12 days, we managed to get Infamy CCL with around $200 million left in our character’s account!! ]</span>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / Um, I only joined halfway through the grind, but my friends invited me to become the fourth collective owner of the 25th CCL badge too..! /</span>"
		+ "<br/>Harry: | We finished right on April Fool’s Day (a few hours after the update dropped, in fact!), so we’d like to imagine that our Infamy stands for Connivers’ Ceaseless Loyalty. Our dedication is no joke, however. The four of us will be playing this game almost daily for the foreseeable future. |"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { As for the celebrations, the four of us enjoyed another night together on the private beach within our shared mind. No reality-bending dreams this time, but we certainly earned our payday, as well as the joy and memories we shared throughout this grind. }</span>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Meet The Team</p><hr/>"
		+ "Harry: | Due to the recent Character Customization update, each of us made a character in Notoriety that loosely resembles our mindforms! My character looks the least appealing because none of the options matched my mindform, but this isn’t a beauty contest. |"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer Meet The Team 0001.jpg'></div><div class='gallerytext'>Harry</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer Meet The Team 0002.jpg'></div><div class='gallerytext'>Isaac</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer Meet The Team 0003.jpg'></div><div class='gallerytext'>Alisa</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/GenericDreamer/GenericDreamer Meet The Team 0004.jpg'></div><div class='gallerytext'>Katelyn</div></li>"
		+ "</ul>"
		+ "<hr/><p style='font-weight:bold;font-size:130%'>Chapter 4 - Reflections Under the Moonlight’s Stars</p><hr/>"
		+ "Harry: | Well, that’s the conclusion of our journey to Infamy CCL! Honestly, I can still scarcely believe that I was once the boy who always drowned out the world around me by mindlessly playing and grinding games... |"
		+ "<br/>| Tulpamancy (and more broadly, plurality) has the power to heal a wounded soul, but do NOT think that Tulpamancy is something you can just “pick up” and play with!! Tulpas are real people like you and me, and the act of bringing another conscious person to existence deserves to be treated with the utmost respect and consideration!!! And no, a few web searches do not constitute as “enough research”!!!! |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ If you are interested in practicing Tulpamancy because of our experiences, then remember that pursuing this life means redefining your sense of reality and what it means to be you!!! Because of that, please learn more about Tulpamancy and plurality before settling on a decision, and then reconsider that decision several times on different days!!!!!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { The path of a Tulpamancer is fraught with challenges, doubts, and much stigma from others. In many cases, it would be better for you to stay as the singlet (the singular “you”) reading this. However, if you truly desire a shared life with a Tulpa, then ask yourself: “Why?” Is it to make a slave that do your chores for you? To make some eye candy that’s forced to love you? Or is it out of a genuine desire to share an eternal, mutual friendship with that person? }</span>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / Um, if there are any systems reading this, please treat each other equally and with kindness..! Harry considers us Tulpas as his best friends and equals, which has allowed the four of us to live in such beautiful harmony throughout our shared lives..!!! Even if you’re not a plural system, then treat your friends like how you’d want to be treated too.. /</span>"
		+ "<br/>Harry: | Alright, that’s enough talk about Tulpamancy! If anyone is suffering from the Roblox ghost disconnection/ ping freeze issue despite having a good Internet plan, then check if your computer is using the MediaTek MT7921 wifi card. If so, replace it immediately. This card was the cause of our wifi woes, which cost us days of productivity and at least 50 Ozela + Rush Hour runs combined... |"
		+ "<br/><span style='color:rgba(0,153,255,var(--bg-alpha))'>Alisa: [ Nonetheless, GG, everyone!!! ]</span>"
		+ "<br/><span style='color:rgba(0,204,0,var(--bg-alpha))'>Isaac: { We’re rather glad we can return to being a casual player now. Full sweeping a heist is fun. }</span>"
		+ "<br/><span style='color:rgba(255,153,0,var(--bg-alpha))'>Katelyn: / Um, playing Notoriety helped me attune to and get better at controlling our physical body, so thank you, Notoriety devs. /</span>"
		+ "<br/>Harry: | And lastly, reality is subjective. Everything in this life is meaningless until you assign a meaning to it, whether that be happiness, anger, sadness, or something else entirely. For the four of us, we’re choosing to paint our world with the shades of joy and companionship. |",
		// #26
		"I played this game when it first relaunched, I was already 25 infamy in first month then didn't play the game for a while. After for like couple months, I came back to play it again, just for fun.  I guess the only reason I grinded to CCL is because I want to remember the days when I was grinding PD2 with my friends. All of them are grown up now, some even have their own family, so they can't be playing PD2 with me anymore. So, I grinded to CCL just to remember the old days. If you're wondering, why don't I just play PD2? I deleted my steam account with Scarface pack I don't know why I did that; guess I was bored.",
		// #27
		"I first played Notoriety in the year 2020. In late July of 2022, I discovered the game again because my sister and a friend of mine had asked me to play. I quickly got the hang of it, and in 30 days I had gotten both XXV-100 and True Criminal."
		+ "<p></p>During that time I also joined Moonstone Games, where I am still active. The fall of that year, I became interested in endurance challenges for Notoriety. To my knowledge, we were the first to ever get 200 bags on Trick or Treat (Red, Toxic, Myself and Jon) , and the first to get 200 vials on Blood Money (Myself and LuboMontana). We also attempted 1.000 bags on ToT multiple times, but we were not able to do it at that time. After the DMCA takedown, I remained active in the community until the re-release."
		+ "<p></p>After that, I got invested into getting more infamies and playing more, and I was the second ever member of Pho's ECM Rushing server, where I am also active to this day and rank relatively highly in, being an active ECM Rusher and having gotten most of my infamies in. By 31/12/2024 I was infamy 100, then by 16/01/2025 150, and then infamy 200 on the 07/02/2025."
		+ "<p></p>Two days later, myself and the same people that attempted 1.000 bags in ToT before the DMCA takedown, smashed that limit and managed to get 3.000 bags, being the first and only to do thus far. It took us almost 16 hours. After I got to Infamy 225, I took a nearly 2 month long hiatus. I got to CCL on 11/04/2025, having gotten my last 100 levels in an infamy rotation.",
		undefined, // contacted (2025-04-21), no response
		undefined, // contacted (2025-04-18), no response
		// #30
		"I started playing Noto in 2019-2020 but started playing consistently around 2021 and started creating YouTube content in the middle of 2022, couple months before the game got taken down. Before the ban, I reached XXV-100 and was skilled in max mutator runs, where I obtained my nickname “Clutch Toad” for clutching a Mall Raid Max Mutator Run."
		+ "<p></p>Fast-forward to the re-release, as soon as the game came out and the new infamy cap was at 250, that’s when I decided CCL was going to be my goal. Now while I had a personal life and didn’t grind Noto for 13hrs straight every day, I still pursued that goal by playing casually up until the suit rework was announced. Obviously at around infamy 50 or so, getting 200 more infamies within a couple days was out of the question, so missing out on the suits upseted me a bit. However, I still pursued and grinded casually until my winter break was over."
		+ "<p></p>Back at college, I’d play Noto from time to time, trying to get 2 infamies a day to hopefully reach CCL before the end of the school year, however, the game got boring and schoolwork took a toll on my ability to play, so my progress was halted a bit, until one day in mid-April, I’d see a few CCL players talking about the new CCL’er, CCL #29 Roxy. That’s when I told myself, “I am going to do the impossible, grind to CCL during the College Hell that is the month of APRIL, as well as getting into the top 50 CCL’ers.”"
		+ "<p></p>I was at Infamy 175 when I started my 5 infamy a day grind, where I’d create my own solo rotation strat that ensured an infamy in 30-40mins while also going net-neutral/positive with money. During this grind, I came across CCL #1, ILikeToast5 (aka TheSeal27), where he addressed me as the potential CCL #30. After that moment, I was inspired to reach that #30 spot and continued my grind. This continued until the Wi-Fi of my dorm building went out for 2 days, so on the 2nd day I had to literally walk to my school’s library to play Notoriety . Anyways after that scuffed grind, I came back to my dorm, when my internet was finally back up, however, I was behind schedule with infamies and CCL #31 Alxzor/Brago was 12 infamies ahead of me and was also in pursuit of reaching CCL before me (Brago: 231, Me: 219). So I told myself, “I can’t let this slide, I’ve got to ratio this #####.”"
		+ "<p></p>On 04/27/2025 while at Infamy 226, fueled by a large iced coffee, a sausage egg and cheese sandwichand some Pepsi Zero’s , I started pumping out infamy after infamy after infamy. The only time I walked away from my desk was for piss breaks . Since me and Brago were in different time zones and he grinded while I was asleep, I knew for sure he had to have been in the 240’s, so I had to get CCL TODAY if I were to reach that #30 spot. Although my strategy was good for solo runs, I also had the help of some other friends both before and during this gauntlet of infamies. 11hrs later, my short term rival Brago joined the game. His infamy… 242, mine… was just a measly 246! I was 4 Infamies ahead of him and knew it was a gg’s. So I did what I do best and clutched that number #30 spot after 13hrs of non-stop grinding. After the grind, I legit couldn’t stop thinking about the Depot . Had I not grinded for that long, I would’ve lost that #30 spot. So this means I’m potentially the first CCL player to grind for it during the College Hell of APRIL ."
		+ "<p></p>I would like to give thanks to the following people that helped me on this grind. MVP & #1 Supporter: blast (@ShopBlastsLocker). Inspiration: CCL #31 Brago (@Alxzor) & CCL #1 ILikeToast5 (aka TheSeal27). Supporters & Teammates: abcd (@DeTeditive), Facepalm2221 (@facepalm2221), MoonGrave (@Ekko_lokation), Retro (@InfinitelyRetro & ngl 2nd MVP), XYZcheeseborger (@lawsuitace), thermonuclear bullet (@Liokkgi), mung ster (@munster4best), Karlo (@hikaru123456), Tuxedoge (@Magnuslover2), bruh (@NathanJZC), ex0sphere (@ex0spher_e) & nark (@narkyii). Honorable Mention: @ameertttfssd201099.",
		undefined, // contacted (2025-05-02), too busy to write description but plans to include a lot
		// #32
		"<p></p>Special thanks to my friends - iron (18th CCL), minh, rice and pho for supporting me along my CCL journey. They have boosted me alot since I started infamy grinding.",
		// #33
		"I don't exactly remember how I got into Notoriety - but I can say that I started back in 2018. Memories are somewhat fuzzy during the time, but I do remember Nightclub grinding when repeat bonuses weren't even a thing, which got me Infamy 25 and True Criminal shortly after. I generally slowed down - mainly grinding MXP and waiting for updates until, well, the game got taken down."
		+ "<p></p>I never really started to fully grind the game as soon as it was re-released, but I did get the blue navy suit pre-rework. I mainly started to ramp up the grind during March-May because I was already around 150-170 and decided to just go for it. And that's pretty much it. I got my funny CCL title and the grind is over."
		+ "<p></p>Most of the grind, I would say, was roughly 90% solo. The rest was just fun with friends, randoms, and challenges. I never had any rotations. I just kind of picked high EXP heists (Rush Hour, Shadow Raid, Depot, Authority, etc.) and switched when it was 15-25% repeat or just got bored lol. Overall, this grind was fun and I wish anyone grinding for CCL the best of luck!"
		+ "<p></p>(Big ol' thanks to CHIEF_TOAD, nark, Iliketoast5, Retro, and many other people for being cool n' stuff while doing this grind!)",
		undefined, // not contacted
		// #35
		"<p style='margin-top:2.5em'></p><h1>Road to CCL</h1>"
		+ "<hr/><p style='font-weight:bold'>Chapter I - Lance's Origin Story</p>Let's go way back to 2016, I found this game via <a href='https://www.youtube.com/watch?v=dZMmyQLHXwo'>Roblox's Heist Review</a>, it got me excited cause I used to watch Payday The Heist on a lets play series and I was excited to try the game out."
		+ "<hr/><p style='font-weight:bold'>Chapter II - First Infamy</p>I played it very casually that I didn't infamy until March 9th, 2019. there was a two year gap between since I was dealing with school and all right until the pandemic hits."
		+ "<hr/><p style='font-weight:bold'>Chapter III - Going from 5 to 25</p>2021 was the year where I grinded from Infamy 5 to 25 from April 13 to May 4, I was playing with a group of friends I met during my time playing RO-Bank (rip), ever since then I just continue to grind for money cause there's nothing much we can do at the time and of course... 2023..."
		+ "<hr/><p style='font-weight:bold'>Chapter IV - The Fall, Rise and start of the journey to 250</p>The day Starbreeze decided to takedown Notoriety... I was lost for words but I won't delve any deeper. The announcement of the return of Notoriety on December 16th, 2024 and that's when my road from 25 to 250 started, it was a slow start as I don't have a clue on what to grind nor a rotation so it was a slow progress."
		+ "<hr/><p style='font-weight:bold'>Chapter V - Going from 50 to 200</p>It took me a month after the game's launch as I reached Infamy 50, there was some setbacks I won't list for personal reasons and ever since then I never stopped. I reached Infamy 100 on March 5th, 2025 and I continue to grind, February 4th I reached 125 and 150 in 11th, it took me 15 days to go 175 as I was busy outside of Notoriety and a few breaks here and there as on May 2nd... that's when I hit 200.... so it took me a whole month to go from 100 to 200"
		+ "<hr/><p style='font-weight:bold'>Chapter VI - The last 50 steps...</p>This was endgame, just 50 more steps till I reached 250... as I update you guys on the progress every 10 infamy in Notoriety Media.... May 7th... 210... May 11th... 220 and the next day 225.... when I reached 225... I started to recall the first time I did a road to Infamy from 1 to 25 with my friends... now I'm doing this alone... 230 in May 13th... 240 the next day... I've been getting +10 every day ever since the Nightclub revamp...and so on May 16th... I did it... 250... it took 6 months to go from 25 to 250... was it worth it...? yes... yes it was...."
		+ "I would like to thank Coin, Trox, T0fu, May, Miyabi and Malice... she was there for me and when I was grinding from 100 to 175..."
		+ "<p></p>Vanidy and Vel, I know we didn't do much heist together but our Ozela shenanigans will always be the highlight of my journey"
		+ "<br/><ul class='mod-gallery'>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0001.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0002.jpg'></div><div class='gallerytext'>RIP RO Bank</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0003.jpg'></div><div class='gallerytext'></div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0010.jpg'></div><div class='gallerytext'>First time meeting Vanidy/Jade</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0004.jpg'></div><div class='gallerytext'>January 3rd, 2025</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0005.jpg'></div><div class='gallerytext'>March 5th, 2025</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0006.jpg'></div><div class='gallerytext'>April 11th, 2025</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0007.jpg'></div><div class='gallerytext'>May 2nd, 2025</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0008.jpg'></div><div class='gallerytext'>May 12th, 2025</div></li>"
		+ "<li class='gallerybox'><div class='thumb'><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Hall of CCLs UGC/lancejuly28/lancejuly28 0009.jpg'></div><div class='gallerytext'>May 16th, 2025<br>I'm free</div></li>"
		+ "</ul>"
		+ "<p></p><span style='font-size:75%'>I did all this in a Discord Text Message</span>",
		// #36
		"To be honest I first started playing notoriety with my friend deathmech and I wasn’t thinking I was going to get this invested. But I realized after the first 5 heists I realized I was hooked"
		+ "<p></p>I don’t know exactly the drive behind why I wanted ccl. I think it was the need to prove myself: to prove that I am capable of seeing something come to an end, to have strength to keep going. And I have notoriety to thank for it"
		+ "<p></p><i>" + '"' + "Keep moving forward" + '"' + "</i>",
		// #37
		"I started playing Notoriety (Roblox Payday) in the first month of its re-release with absolutely no experience. I learned the game from scratch and improved constantly over the course of the first two months. I took a break for a month for school but came back more fiercely."
		+ "<p></p>I created two Discord servers to build a community. The first died out because of exams, but the second is now very active, with many members about two-thirds of the way to max Infamy. I’m proud of how it’s grown."
		+ "<p></p>Through a lot of hard work and determination, I became the 37th player to reach max Infamy. The moral of this story is that with determination and persistence, anyone can reach their goals no matter where they started.",
		// #38
		"i started playing this game at around 2018-2019, the starting year is a bit hazy but i barely touched it, mostly because of how laggy and unengaging it was at the time. to this day, i can still hear the police audio saying " + '"' + "i'm out, reloading" + '"' + " as i try to survive at 15fps on r&b bank on my now deleted old account."
		+ "<p></p>then came 2020 and the spicy cold, forcing everyone to stay home. with practically unlimited hours of playing time, thanks in part to the completion of my studies, i could rack up hours on roblox and explore untouched or old games."
		+ "<p></p>one of those games happened to be notoriety and i played it like it was a religion. everyday i'd jump on and grind my way through the game, learning the strats, making the occasional fumble but banking in dough and xp. by october 2020 i'd already reached infamy 25 and had scored many skins for my guns and even for armour, which envy many new players. not only that but having allied myself with other users, we'd smash through the speedrunning leaderboards (that was a thing back then) as well as swatting aside daily, weekly and MONTHLY (yes) challenges."
		+ "<p></p>then came march 17th 2021. notoriety updated and one of the key changes was the addition of pagers to halted guards on nightmare. our group was dismayed and appalled by the decision. combined with the removal of leaderboards, most of us called time on the game and so did i. i already had a billion in my bank account, hundreds of diamond safes from speedrunning, very niche weapon skins (bluesteel remington 870) and armour skins. i had conquered the game and any last hope of me remaining was gone."
		+ "<p></p>i barely touched the game between 2022-23, when i was playing notoriety it was solely just to get the badges for rush hour and ozela."
		+ "<p></p>then came 2024. the game has been relaunched, the depot is out and better still, 225 extra levels of infamy have been added. the goal was set, get to 250 and be on top of the mountain once more. and so began 5 months of intense grinding, clearing daily challenges with xp rewards to set up a springboard for the next infamy level. despite that, i was averaging 1-2 levels on a weekday, maybe 3 on a weekend. it didn't help that other factors played havoc with my quest to 250 as fast as i could; full time work, shoddy motivation to grind on some days, my friends hosting a minecraft server, activities that kept me away from my pc and the loss of friday-sunday due to footy (carn geelong cats!)"
		+ "<p></p>but as princess peach (probably) once said " + '"' + "if you lock the fuck in, you'll get what you want" + '"' + ". the method per each infamy level was clear as day: start with brick bank, do a few levels of ozela then mop up with rush hour before doing any challenges with xp as rewards before they expired. all that in 4 hours each weekday."
		+ "<br/>so on the 1st of january 2025, infamy 50 was reached. three weeks later on the 22nd of january, the ton was passed."
		+ "<p></p>and the crowning moment, the summit of the mountain: 28th may 2025, 00pro11 is bestowed the title of CCL #38",
		// #39
		undefined, // not contacted
		// #40
		undefined, // contacted (2025-06-08)
		// #41
		undefined, // contacted (2025-06-15), estimated description received around mid to late June 2025
		// #42
		undefined, // contacted (~2025-06-18), willing to create description, attempting to establish means of easily sharing it without Roblox's chat filter
		// #43
		undefined, // not contacted
		// #44
		undefined, // not contacted
		];
		
		const playersData_classicInfamySuit = [];
		// ymdLocalTimeCCLs is based on local time
		const ymdLocalTimeCCLs = [];
		// console.log();
		for (var x = 0; x < grassAvoiders; x++) {
			playersData_classicInfamySuit.push(undefined);
			ymdLocalTimeCCLs.push({year:new Date(playersData_whenCCL[x].timestamp).getFullYear(), month:new Date(playersData_whenCCL[x].timestamp).getMonth(), day:new Date(playersData_whenCCL[x].timestamp).getDate(), hour:new Date(playersData_whenCCL[x].timestamp).getHours(), minute:new Date(playersData_whenCCL[x].timestamp).getMinutes(), second:new Date(playersData_whenCCL[x].timestamp).getSeconds(), millisecond:new Date(playersData_whenCCL[x].timestamp).getMilliseconds()});
		}
		// console.log(ymdLocalTimeCCLs[8].day);
		playersData_classicInfamySuit[0] = playersData_classicInfamySuit[1] = playersData_classicInfamySuit[2] = playersData_classicInfamySuit[3] = 'Crimson';
		playersData_classicInfamySuit[4] = 'Rojo';
		playersData_classicInfamySuit[5] = playersData_classicInfamySuit[6] = playersData_classicInfamySuit[7] = playersData_classicInfamySuit[26] = 'Royalty';
		playersData_classicInfamySuit[8] = playersData_classicInfamySuit[12] = playersData_classicInfamySuit[17] = playersData_classicInfamySuit[25] = playersData_classicInfamySuit[27] = playersData_classicInfamySuit[32] = playersData_classicInfamySuit[40] = 'Blue Navy';
		
		const classicInfamySuitOwners = {
			crimson:[],
			rojo:[],
			royalty:[],
			blueNavy:[],
		}
		
		var anonEntriesCount = 0;
		for (var x = 0; x < grassAvoiders; x++) {
			players.push(new Player());
			if (anonEntries.indexOf(playersData_positions[x]) != -1) {
				anonEntriesCount++;
			}
			if (anonEntries.indexOf(playersData_positions[x]) != -1) {
				players[x].username = 'Anonymous';
			} else if (playersData_usernames[x] == undefined) {
				players[x].username = undefined;
			} else {
				players[x].username = playersData_usernames[x];
			}
			// console.log(playersData_usernames[x]);
			
			if (anonEntries.indexOf(playersData_positions[x]) != -1) {
				players[x].displayName = 'Anonymous';
			} else if (playersData_displayNames[x] == undefined) {
				players[x].displayName = undefined;
			} else {
				players[x].displayName = playersData_displayNames[x];
			}
			
			if (anonEntries.indexOf(playersData_positions[x]) != -1) {
				players[x].robloxAvatar = 'Anonymous user.png';
			} else if (playersData_robloxAvatars[x] == undefined) {
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
			
			if (playersData_notes[x] == undefined || anonEntries.indexOf(playersData_positions[x]) != -1) {
				players[x].notes = undefined;
			} else {
				players[x].notes = playersData_notes[x];
			}
			
			if (playersData_ownDescription[x] == undefined || anonEntries.indexOf(playersData_positions[x]) != -1) {
				players[x].ownDescription = undefined;
			} else {
				players[x].ownDescription = playersData_ownDescription[x];
			}
			
			if (playersData_classicInfamySuit[x] == undefined) {
				players[x].classicInfamySuit = undefined;
			} else {
				players[x].classicInfamySuit = playersData_classicInfamySuit[x];
			}
		}
		
		for (var x = 0; x < grassAvoiders; x++) {
			if (players[x].classicInfamySuit == 'Crimson') {
				classicInfamySuitOwners.crimson.push(players[x]);
			} else if (players[x].classicInfamySuit == 'Rojo') {
				classicInfamySuitOwners.rojo.push(players[x]);
			} else if (players[x].classicInfamySuit == 'Royalty') {
				classicInfamySuitOwners.royalty.push(players[x]);
			} else if (players[x].classicInfamySuit == 'Blue Navy') {
				classicInfamySuitOwners.blueNavy.push(players[x]);
			}
		}
		// console.log(classicInfamySuitOwners);
		
		const filters = {
			classicInfamySuits: {crimson:elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Crimson.checked, rojo:elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Rojo.checked, royalty:elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Royalty.checked, blueNavy:elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_BlueNavy.checked, exclude:elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_ExcludeOptions.checked},
			time: {year:elem.Section_HallofInfamyCCLs_Filter_Time_Year.value, month:elem.Section_HallofInfamyCCLs_Filter_Time_Month.value, day:elem.Section_HallofInfamyCCLs_Filter_Time_Day.value, hour:elem.Section_HallofInfamyCCLs_Filter_Time_Hour.value, minute:elem.Section_HallofInfamyCCLs_Filter_Time_Minute.value, second:elem.Section_HallofInfamyCCLs_Filter_Time_Second.value, millisecond:elem.Section_HallofInfamyCCLs_Filter_Time_Millisecond.value, exclude:elem.Section_HallofInfamyCCLs_Filter_Time_ExcludeOptions.checked},
			specificCCLs: {specificCCLs:elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.value, exclude:elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_ExcludeOptions.checked},
			other: {notes:elem.Section_HallofInfamyCCLs_Filter_Other_Notes.checked, userWrittenDescription:elem.Section_HallofInfamyCCLs_Filter_Other_UserWrittenDescription.checked, exclude:elem.Section_HallofInfamyCCLs_Filter_Other_ExcludeOptions.checked},
		}
		if (filters.classicInfamySuits.crimson == false && filters.classicInfamySuits.rojo == false && filters.classicInfamySuits.royalty == false && filters.classicInfamySuits.blueNavy == false /*&& filters.classicInfamySuits.exclude == false*/) {
			filters.classicInfamySuits.unused = true;
		}
		if (filters.time.year == 'undefined' && filters.time.month == 'undefined' && filters.time.day == 'undefined' && filters.time.hour == '' && filters.time.minute == '' && filters.time.second == '' && filters.time.millisecond == '' /*&& filters.time.exclude == false*/) {
			filters.time.unused = true;
		}
		
		// filters.specificCCLs.specificCCLs = '1 until ' + grassAvoiders;
		if (filters.specificCCLs.specificCCLs == '' /* && filters.specificCCLs.exclude == false*/) {
			filters.specificCCLs.unused = true;
		}
		
		if (filters.other.notes == false && filters.other.userWrittenDescription == false /* && filters.other.exclude == false */) {
			filters.other.unused = true;
		}
		
		// disabled to avoid confusion
		// inputSettings.miscellaneousSettings.HallofCCLs.filters = filters;
		
		const filterIncludedCCLs = [], filterIncludedCCLs_positions = [];
		var filterInCurrentCCL = true,
			classicInfamySuitsFilterStatus = true,
			timeFilterStatus = true,
			specificCCLsFilterStatus = true,
			otherFilterStatus = true;
		
		function getFilteringLogic(input) {
			if (input == 'undefined') {
				input = '';
			}
			const defaultKeywords = ['specific'],
				operators = ['AND', 'OR', '(', ')'],
		        operatorsLogic = ['&&', '||', '(', ')'],
		        filteringGroups = ['suit', 'time', 'specific', 'other'],
		        filteringGroupsVars = [classicInfamySuitsFilterStatus, timeFilterStatus, specificCCLsFilterStatus, otherFilterStatus],
				filteringGroupsUnusedChecks = [filters.classicInfamySuits.unused, filters.time.unused, filters.specificCCLs.unused, filters.other.unused],
		        safeInput = [];
		    var output = null, keywords = input.match(/\w+|\(|\)/g), keywordsInterpreted = [], filteringStatuses = [];
			if (keywords == null) {
				keywords = defaultKeywords;
			}
			var loopLength = keywords.length;
		    for (var x = 0; x < loopLength; x++) {
		        if (filteringGroups.indexOf(keywords[x]) != -1 || operators.indexOf(keywords[x]) != -1 || keywords[x] == '') {
		            safeInput.push(true);
		        } else {
		            safeInput.push(false);
		        }
			}
			if (safeInput.indexOf(false) != -1) {
				keywords = defaultKeywords;
			}
			// console.log('KEYWORDS BASE:', keywords);
			// console.log(filteringGroupsUnusedChecks);
			// console.log(filters.specificCCLs.unused);
			for (var x = 0; x < loopLength; x++) {
		        if (filteringGroups.indexOf(keywords[x]) != -1) {
					// console.log(filteringGroupsUnusedChecks[filteringGroups.indexOf(keywords[x])]);
					
					// if the filter group is being used, make it checked for computations:
					// console.log(keywords[x]);
					if (filteringGroupsUnusedChecks[filteringGroups.indexOf(keywords[x])] != true) {
						keywordsInterpreted.push('true');
						if (filteringGroupsVars[filteringGroups.indexOf(keywords[x])] == true) {
							filteringStatuses.push(true);
						} else {
							filteringStatuses.push(false);
						}
						// console.log(filteringStatuses);
					} else {
						// keywordsInterpreted.push('false'); // disabled to prevent unused filtering groups from causing 0 generated entries
					}
					// keywordsInterpreted.push(filteringGroupsVars[filteringGroups.indexOf(keywords[x])]);
		        }
				if (operators.indexOf(keywords[x]) != -1) {
					// console.log(keywords[x + 1], filteringGroupsUnusedChecks[filteringGroups.indexOf(keywords[x + 1])]);
					keywordsInterpreted.push(operatorsLogic[operators.indexOf(keywords[x])]);
					filteringStatuses.push(operatorsLogic[operators.indexOf(keywords[x])]);
		        }
				// console.log('current interpretation:', keywords[x], keywordsInterpreted);
		    }
			// loop for splice may not be necessary
			var loopLength = keywordsInterpreted.length;
			for (var i = 0; i < loopLength; i++) {
				// remove any instance of && or || in index 0
				
				if (operatorsLogic[0].indexOf(keywordsInterpreted[0]) != -1 || operatorsLogic[1].indexOf(keywordsInterpreted[0]) != -1) {
					keywordsInterpreted.splice(0, 1);
				}
				if (operatorsLogic[0].indexOf(filteringStatuses[0]) != -1 || operatorsLogic[1].indexOf(filteringStatuses[0]) != -1) {
					filteringStatuses.splice(0, 1);
				}
			}
			var loopLength = keywordsInterpreted.length;
			for (var i = 0; i < loopLength; i++) {
				if ((operatorsLogic[0].indexOf(keywordsInterpreted[i]) != -1 || operatorsLogic[1].indexOf(keywordsInterpreted[i]) != -1) && ['false','true'].indexOf(keywordsInterpreted[i + 1]) == -1) {
					keywordsInterpreted.splice(i, 1);
				}
				if ((operatorsLogic[0].indexOf(filteringStatuses[i]) != -1 || operatorsLogic[1].indexOf(filteringStatuses[i]) != -1) && ['false','true',false,true].indexOf(filteringStatuses[i + 1]) == -1) {
					filteringStatuses.splice(i, 1);
				}
				if (operatorsLogic[0].indexOf(filteringStatuses[filteringStatuses.length - 1]) != -1 || operatorsLogic[1].indexOf(filteringStatuses[filteringStatuses.length - 1]) != -1) {
					filteringStatuses.splice(filteringStatuses.length - 1, 1);
				}
			}
			/*
			console.log('----------');
			console.log('----------');
			console.log('----------');
			console.log(operatorsLogic);
			console.log(keywordsInterpreted);
			console.log('----------');
			*/
			if (operatorsLogic[0].indexOf(keywordsInterpreted[keywordsInterpreted.length - 1]) != -1 || operatorsLogic[1].indexOf(keywordsInterpreted[keywordsInterpreted.length - 1]) != -1) {
				keywordsInterpreted.splice(keywordsInterpreted.length - 1, 1);
			}
			// console.log(operatorsLogic);
			// console.log(keywordsInterpreted);
			// console.log('keywordsInterpreted', keywordsInterpreted);
		    keywordsInterpreted = keywordsInterpreted.join(' ');
		    output = new Function('return ' + keywordsInterpreted)();
			// console.log('output', output);
			// console.log(filteringStatuses);
			statusesEachCCL.push(filteringStatuses.join(' '));
			// console.log('filteringStatuses', );
		    return {logic: output, interpretation: keywordsInterpreted, interpretationStatuses: new Function('return ' + filteringStatuses.join(' '))(), filteringStatuses: filteringStatuses};
		}
		
		function getSpecificCCLs(src) {
			const interpretedCCLs = [];
			
			// console.log('src', src);
			if (src == '') {
				src = '1 until ' + grassAvoiders;
			}
		    var input = src + '\n';
		    var inputNums = input.match(/.+?(?=\n)/g);
		    var output = [];
		    // console.log('inputNums:', inputNums);
			var loopLength = inputNums.length;
		    for (var x = 0; x < loopLength; x++) {
		        // console.log('NEW X: ', inputNums[x]);
		        if (inputNums[x].match('until') != null) {
		            var outputTemp = {
		                start: Math.max(0, Math.min(grassAvoiders, Math.floor(inputNums[x].match(/\d+/)[0]))),
		                end: Math.max(0, Math.min(grassAvoiders, Math.floor(inputNums[x].replace(/\d+/, '').match(/\d+/)[0]))),
		            };
		            var temp = [outputTemp.start, outputTemp.end];
		            outputTemp.start = Math.min(temp[0], temp[1]);
		            outputTemp.end = Math.max(temp[0], temp[1]);
		            // console.log(outputTemp);
		            output.push(outputTemp);
		        } else {
		            var outputTemp = Math.max(0, Math.min(grassAvoiders, Math.floor(inputNums[x].match(/\d+/)[0])));
		            outputTemp = {
		                start: outputTemp,
		                end: outputTemp
		            };
		            // console.log(outputTemp);
		            output.push(outputTemp);
		        }
		    }
			var loopLength = output.length;
			for (var x = 0; x < loopLength; x++) {
				if (output[x].start != output[x].end) {
					var countDiff = Math.abs(output[x].end - output[x].start);
					var loopLength_a = countDiff + 1;
					for (var i = 0; i < loopLength_a; i++) {
						if (interpretedCCLs.indexOf(output[x].start + i) == -1) {
							interpretedCCLs.push(output[x].start + i);
						}
					}
				} else {
					if (interpretedCCLs.indexOf(output[x].start) == -1) {
						interpretedCCLs.push(output[x].start);
					}
				}
			}
			output = interpretedCCLs;
		    return output;
		}
		// console.log(getSpecificCCLs('3 until 7\n8\n11 until 12\n14\n22\n25 until 29'));
		const specificCCLsFilter_SpecificCCLsList = getSpecificCCLs(elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.value);
		// console.log(specificCCLsFilter_SpecificCCLsList);
		
		for (var x = 0; x < grassAvoiders; x++) {
			filterInCurrentCCL = classicInfamySuitsFilterStatus = timeFilterStatus = specificCCLsFilterStatus = otherFilterStatus = true;
			var classicInfamySuitsFiltersActive = 0;
			if (filters.classicInfamySuits.unused != true) {
				if (filters.classicInfamySuits.crimson == true) {
					classicInfamySuitsFiltersActive++;
					if (['Crimson'].indexOf(players[x].classicInfamySuit) != -1) {
						if (filters.classicInfamySuits.exclude == false) {
							classicInfamySuitsFilterStatus = true;
						} else {
							classicInfamySuitsFilterStatus = false;
						}
					} else {
						if (filters.classicInfamySuits.exclude == false) {
							classicInfamySuitsFilterStatus = false;
						}
					}
				}
				if (filters.classicInfamySuits.rojo == true) {
					classicInfamySuitsFiltersActive++;
					if (['Rojo'].indexOf(players[x].classicInfamySuit) != -1) {
						if (filters.classicInfamySuits.exclude == false) {
							classicInfamySuitsFilterStatus = true;
						} else {
							classicInfamySuitsFilterStatus = false;
						}
					} else {
						if (filters.classicInfamySuits.exclude == false && filters.classicInfamySuits.crimson != true) {
							classicInfamySuitsFilterStatus = false;
						}
					}
				}
				if (filters.classicInfamySuits.royalty == true) {
					classicInfamySuitsFiltersActive++;
					if (['Royalty'].indexOf(players[x].classicInfamySuit) != -1) {
						if (filters.classicInfamySuits.exclude == false) {
							classicInfamySuitsFilterStatus = true;
						} else {
							classicInfamySuitsFilterStatus = false;
						}
					} else {
						if (filters.classicInfamySuits.exclude == false && filters.classicInfamySuits.crimson != true && filters.classicInfamySuits.rojo != true) {
							classicInfamySuitsFilterStatus = false;
						}
					}
				}
				if (filters.classicInfamySuits.blueNavy == true) {
					classicInfamySuitsFiltersActive++;
					if (['Blue Navy'].indexOf(players[x].classicInfamySuit) != -1) {
						if (filters.classicInfamySuits.exclude == false) {
							classicInfamySuitsFilterStatus = true;
						} else {
							classicInfamySuitsFilterStatus = false;
						}
					} else {
						if (filters.classicInfamySuits.exclude == false && filters.classicInfamySuits.crimson != true && filters.classicInfamySuits.rojo != true && filters.classicInfamySuits.royalty != true) {
							classicInfamySuitsFilterStatus = false;
						}
					}
				}
			}

			const timeFilters = [];
			var timeFiltersActive = 0;
			if (filters.time.unused != true) {
				if (filters.time.year != 'undefined') {
					timeFiltersActive++;
					if (ymdLocalTimeCCLs[x].year.toString() == filters.time.year) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.month != 'undefined') {
					timeFiltersActive++;
					if (ymdLocalTimeCCLs[x].month.toString() == filters.time.month) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.day != 'undefined') {
					timeFiltersActive++;
					if (ymdLocalTimeCCLs[x].day.toString() == filters.time.day) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.hour != '' && Number(filters.time.hour) >= 0) {
					timeFiltersActive++;
					filters.time.hour = Math.min(Number(filters.time.hour), elem.Section_HallofInfamyCCLs_Filter_Time_Hour.max).toString();
					if (ymdLocalTimeCCLs[x].hour.toString() == filters.time.hour) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.minute != '' && Number(filters.time.minute) >= 0) {
					timeFiltersActive++;
					filters.time.minute = Math.min(Number(filters.time.minute), elem.Section_HallofInfamyCCLs_Filter_Time_Minute.max).toString();
					if (ymdLocalTimeCCLs[x].minute.toString() == filters.time.minute) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.second != '' && Number(filters.time.second) >= 0) {
					timeFiltersActive++;
					filters.time.second = Math.min(Number(filters.time.second), elem.Section_HallofInfamyCCLs_Filter_Time_Second.max).toString();
					if (ymdLocalTimeCCLs[x].second.toString() == filters.time.second) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
				if (filters.time.millisecond != '' && Number(filters.time.millisecond) >= 0) {
					timeFiltersActive++;
					filters.time.millisecond = Math.min(Number(filters.time.millisecond), elem.Section_HallofInfamyCCLs_Filter_Time_Millisecond.max).toString();
					if (ymdLocalTimeCCLs[x].millisecond.toString() == filters.time.millisecond) {
						if (filters.time.exclude == false) {
							timeFilters.push(true);
						} else {
							timeFilters.push(false);
						}
					} else {
						if (filters.time.exclude == false) {
							timeFilters.push(false);
						}
					}
				}
			}
			if (timeFilters.length > 0) {
				// console.log('truthy test');
				if (timeFilters.length == timeFiltersActive && timeFilters.indexOf(false) != -1) {
					// console.log('truthy test part ii\n', specificCCLsFilters.length, specificCCLsFiltersActive, specificCCLsFilters);
					timeFilterStatus = false;
				} else {
					timeFilterStatus = true;
				}
			}
			
			// console.log('the list: ', specificCCLsFilter_SpecificCCLsList);
			// console.log(specificCCLsFilter_SpecificCCLsList.indexOf(players[x].position));
			const specificCCLsFilters = [];
			var specificCCLsFiltersActive = 0;
			if (filters.specificCCLs.unused != true) {
				if (specificCCLsFilter_SpecificCCLsList.length > 0) {
					specificCCLsFiltersActive++;
					if (specificCCLsFilter_SpecificCCLsList.indexOf(players[x].position) != -1) {
						if (filters.specificCCLs.exclude == false) {
							specificCCLsFilters.push(true);
						} else {
							specificCCLsFilters.push(false);
						}
					} else {
						if (filters.specificCCLs.exclude == false) {
							specificCCLsFilters.push(false);
						}
					}
				}
			}
			// console.log(specificCCLsFilterStatus);
			// console.log(specificCCLsFilters.length);
			if (specificCCLsFilters.length > 0) {
				// console.log('truthy test');
				if (specificCCLsFilters.length == specificCCLsFiltersActive && specificCCLsFilters.indexOf(false) != -1) {
					// console.log('truthy test part ii\n', specificCCLsFilters.length, specificCCLsFiltersActive, specificCCLsFilters);
					specificCCLsFilterStatus = false;
				} else {
					specificCCLsFilterStatus = true;
				}
			}
			// console.log('specific status: ', specificCCLsFilters);
			// console.log('specific status: ', specificCCLsFilterStatus);
			
			if (filters.other.unused != true) {
				if (filters.other.notes == true) {
					if (players[x].notes != undefined) {
						if (filters.other.exclude == false) {
							otherFilterStatus = true;
						} else {
							otherFilterStatus = false;
						}
					} else {
						if (filters.other.exclude == false) {
							otherFilterStatus = false;
						}
					}
				}
				if (filters.other.userWrittenDescription == true) {
					if (players[x].ownDescription != undefined) {
						if (filters.other.exclude == false) {
							otherFilterStatus = true;
						} else {
							otherFilterStatus = false;
						}
					} else {
						if (filters.other.exclude == false) {
							otherFilterStatus = false;
						}
					}
				}
			}
			
			elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.placeholder = "1 until " + grassAvoiders;
			elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs_InputExplanation.innerHTML = "<br/>Specific CCLs to filter, based on their CCL # (badge obtainment position number). A 'range' is defined as either 'x' or 'x until y' (e.g. <code>5</code> or <code>8 until 11</code>). Separate each range on a new line. Defaults to <code>1 until x</code>, where x is programmed CCL entries.";
			elem.Section_HallofInfamyCCLs_FilteringLogic.placeholder = "specific";
			/*
			if (elem.Section_HallofInfamyCCLs_FilteringLogic.value == '') {
				elem.Section_HallofInfamyCCLs_FilteringLogic.value = 'specific';
			}
			*/
			const filteringLogicOutput_temp = getFilteringLogic(elem.Section_HallofInfamyCCLs_FilteringLogic.value);
			// disabled to avoid confusion
			// inputSettings.miscellaneousSettings.HallofCCLs.filteringLogic = elem.Section_HallofInfamyCCLs_FilteringLogic.value;
			elem.Section_HallofInfamyCCLs_FilteringLogic_InputExplanation.innerHTML = "<br/>Logical operators for each filter group. Define either 'AND' or 'OR'. Complicated conditions must use parentheses ('(' and ')'). Any filter group can be defined or excluded, and they must match the exact spelling: <code>suit</code> for 'Classic infamy suits' filters, <code>time</code> for 'Time' filters, <code>specific</code> for 'Specific CCLs' filters and <code>other</code> for 'Other' filters. Not defining a filter group will simply ignore its filters. Do not define the same filter group more than once. Defaults to <code>specific</code>."
			+ "<br/>Input interpretation: <code>" + filteringLogicOutput_temp.interpretation + "</code>"
			+ "<br/>Boolean result: <code>" + filteringLogicOutput_temp.logic + "</code>";
			
			// console.log(filteringLogicOutput_temp.logic);
			// console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nFILTERING LOGIC', filteringLogicOutput_temp.logic, classicInfamySuitsFilterStatus);
			// console.log('\n\n\n\n\nfilters data: ', filteringLogicOutput_temp);
			filterInCurrentCCL = false;
			if (filteringLogicOutput_temp.logic == true) {
				// if (filteringLogicOutput_temp.interpretation
				// console.log('\n\n\n\n\ntest:', filteringLogicOutput_temp.filteringStatuses.indexOf(false) == -1);
				if (filteringLogicOutput_temp.interpretationStatuses == true) {
					// console.log('testing mongus', filteringLogicOutput_temp.filteringStatuses.indexOf(false) == -1);
					filterInCurrentCCL = true;
					// console.log(filterInCurrentCCL);
				}
				// keywordStatuses
				/*
				for (var i = 0; i < filteringLogicOutput_temp.statuses.length; i++) {
					if (filteringLogicOutput_temp.statuses[i] == false) {
						filterInCurrentCCL = false;
					}
				}
				*/
			} else {
				filterInCurrentCCL = false;
			}
			// console.log('alpha bravo charlie delta', filterInCurrentCCL);
			
			// console.log(filterInCurrentCCL);
			if (filterInCurrentCCL == true) {
				filterIncludedCCLs.push(players[x]);
				filterIncludedCCLs_positions.push(players[x].position);
			}
		}
		
		// disabled to avoid confusion
		// inputSettings.miscellaneousSettings.HallofCCLs.sortingOrder = elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value;
		if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'newestOldest') {
			filterIncludedCCLs.reverse();
			filterIncludedCCLs_positions.reverse();
		} else if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'random') {
			filterIncludedCCLs.sort(function() { return randomBetween(0, 2) - randomBetween(1.2, 2.5) });
			filterIncludedCCLs_positions.sort(function() { return randomBetween(0, 2) - randomBetween(1.2, 2.5) });
		}
		
		var generatedString = "Generated " + formatInt(filterIncludedCCLs.length) + " CCL " + checkPlural(filterIncludedCCLs.length, "entry", "entries") + " out of " + formatInt(grassAvoiders) + " programmed total (" + formatInt(filterIncludedCCLs.length / grassAvoiders * 100) + "%)"
		if (anonEntriesCount > 0) {
			generatedString += ", including " + formatInt(anonEntriesCount) + " anonymous " + checkPlural(anonEntriesCount, "entry", "entries") + ",";
		}
		generatedString += " at " + formatDate(currentTime, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(currentTime.getTimezoneOffset()) + ". Check <a href='https://badges.roblox.com/v1/badges/1157147255776915'>this link</a> for an updated count of the Rank 250 badges awarded.";
		var eachCCLFilterText = [];
		for (var i = 0; i < grassAvoiders; i++) {
			var thisStr = statusesEachCCL[i];
			thisStr = thisStr.replace(/false/g, "<span style='color:rgba(128,0,0,var(--bg-alpha));font-weight:bold'>false</span>");
			thisStr = thisStr.replace(/true/g, "<span style='color:rgba(0,128,0,var(--bg-alpha));font-weight:bold'>true</span>");
			var booleanThisEntry = new Function('return ' + statusesEachCCL[i])().toString();
			switch (booleanThisEntry) {
				case 'false':
					booleanThisEntry = booleanThisEntry.replace(/false/g, "<span style='color:rgba(128,0,0,var(--bg-alpha));font-weight:bold'>false</span>");
					break;
				case 'true':
					booleanThisEntry = booleanThisEntry.replace(/true/g, "<span style='color:rgba(0,128,0,var(--bg-alpha));font-weight:bold'>true</span>");
			}
			eachCCLFilterText.push('#' + playersData_positions[i].toLocaleString() + ": <code class='NotorietyEXPCalculator_HallofInfamyCCLs_EachCCLFilter_Output'>" + thisStr + ' = ' + booleanThisEntry + '</code>');
		}
		if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'newestOldest') {
			eachCCLFilterText.reverse();
		} else if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'random') {
			eachCCLFilterText.sort(function() { return randomBetween(0, 2) - randomBetween(1.2, 2.5) });
		}
		// console.log(statusesEachCCL);
		generatedString += "<p id='NotorietyEXPCalculator_HallofInfamyCCLs_Block_EachCCLFilter' style='cursor:pointer'><small><u>(Click to toggle interpreted and evaluated boolean logic of each programmed CCL entry.)</u></small></p>"
		+ "<p id='NotorietyEXPCalculator_HallofInfamyCCLs_EachCCLFilter' style='font-size:75%;display:none'>" + eachCCLFilterText.join('<br/>') + "</p>";
		const egg1Conditions = [
		filterIncludedCCLs_positions.length == 5 && filterIncludedCCLs_positions.indexOf(1) != -1 && filterIncludedCCLs_positions.indexOf(12) != -1 && filterIncludedCCLs_positions.indexOf(16) != -1 && filterIncludedCCLs_positions.indexOf(18) != -1 && filterIncludedCCLs_positions.indexOf(21) != -1,
		filterIncludedCCLs_positions.length == 1 && filterIncludedCCLs_positions.indexOf(25) != -1,
		];
		const egg2Conditions = [
		filterIncludedCCLs.length / grassAvoiders == 0.5,
		];
		const egg3Conditions = [
		filters.time.month == '3' && filters.time.day == '1',
		];
		if (egg1Conditions[0] || egg1Conditions[1]) {
			generatedString += "<p>(Easter Egg) Detected only either a(CCL #25) or b(CCLs #1, #12, #16, #18 and #21). Generated the following quotes:"
			+ "<br/><i>" + '"' + "The dreamer is ambitious, and rightfully so. We have worlds to create." + '"' + "</i>"
			+ "<br/><i>" + '"' + "Oh, how delicate the mind of the dreamer is." + '"' + "</i>"
			+ "<br/><i>" + '"' + "The dreamer's greatest enemy is one's self. Cruel how we often fail to realise how far we've come." + '"' + "</i>"
			+ "<br/><i>" + '"' + "To truly be a dreamer means to have control over your dreams, not live in fear of them." + '"' + "</i>"
			+ "</p>";
		}
		if (egg2Conditions[0]) {
			generatedString += "<p>(Easter Egg)</p><img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/Other/perfectly balanced.jpg' style='width:50%'></img>";
		}
		
		if (document.getElementById('NotorietyEXPCalculator_EasterEgg3') != null) {
			document.getElementById('NotorietyEXPCalculator_EasterEgg3').remove();
		}
		const susImg = document.createElement("img");
		susImg.setAttribute('id', 'NotorietyEXPCalculator_EasterEgg3');
		susImg.src = './Notoriety EXP Calculator/Assets/Other/crewmate.png';
		susImg.classList.add('stickyImg');
		susImg.setAttribute('style', 'z-index:1;opacity:0');
		var susImgInterval = null;
		if (egg3Conditions[0]) {
			if (Object.keys(sounds).indexOf('egg3') != -1) {
				sounds.egg3.pause();
				sounds.egg3.currentTime = 0;
				sounds.egg3.play();
			} else {
				sounds.egg3 = new Audio("./Notoriety EXP Calculator/Assets/Other/impostor.mp3");
				sounds.egg3.play();
			}
			document.title = 'Notoriety EXP Sussifier';
			generatedString += "<p>(Easter Egg) ඞ</p>";
			elem.Section_HallofInfamyCCLs.prepend(susImg);
			susImgInterval = setInterval(function() {
				if (sounds.egg3.currentTime >= 3) {
					susImg.setAttribute('style', 'z-index:1;opacity:0');
					clearInterval(susImgInterval);
					susImg.remove();
				} else if (sounds.egg3.currentTime >= 1.5) {
					susImg.setAttribute('style', 'z-index:1;opacity:' + (1 - ((sounds.egg3.currentTime - 1.5) / 1.5)));
				} else {
					susImg.setAttribute('style', 'z-index:1;opacity:calc(var(--bg-alpha) * ' + (sounds.egg3.currentTime / 1.5) + ')');
				}
			}, 100);
		} else {
			document.title = 'Notoriety EXP Calculator';
			susImg.remove();
			clearInterval(susImgInterval);
		}
		elem.Section_HallofInfamyCCLs_FilterSort_GeneratedText.innerHTML = generatedString;
		document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_Block_EachCCLFilter').addEventListener('click', function() {
			const containerWithin = document.getElementById('NotorietyEXPCalculator_HallofInfamyCCLs_EachCCLFilter');
			containerWithin.style.display = containerWithin.style.display == 'none' ? 'block' : 'none';
		});
		
		// Crimson: 128,0,0
		// Rojo: 220,20,60
		// Royalty: 106,50,159
		// Blue Navy: 7,55,99
		
		function playerHTML(input, backgroundRGB) {
			var output = "";
			if (backgroundRGB == undefined || anonEntries.indexOf(input.position) != -1) {
				output += "<td class='NotorietyEXPCalculator_TableStyling'>";
			} else {
				output += "<td class='NotorietyEXPCalculator_TableStyling' style='background:rgba(" + backgroundRGB + ",var(--bg-alpha))'>";
			}
			
			output += "<div class='ImageTextContainer'>";
			
			if (input.robloxAvatar != undefined) {
				output += "<img class='NotorietyEXPCalculator_DoubleClickImg' src='./Notoriety EXP Calculator/Assets/CCL Roblox avatars/" + input.robloxAvatar + "' style='width:10em;float:left'/>";
			}
			
			output += "<div class='CellText'>";
			
			if (input.position != undefined) {
				output += '[CCL #' + input.position.toLocaleString() + '] ';
			}
			
			output += "<b>";
			if (input.username == undefined /*"T4x_Ev4der"*/) {
				output += '<i>--(This display name cannot be placed here)--</i>';
			} else {
				output += input.displayName;
			}
			if (anonEntries.indexOf(input.position) == -1) {
				output += " (<a href='https://www.roblox.com/users/profile?username=" + input.username + "'>@" + input.username + "</a></b>)";
			} else {
				output += "</b>";
			}
			
			output += "<p style='font-size:80%'>";
			if (input.whenCCL != undefined) {
				const orig = input.whenCCL;
				output += "Badge obtained: ";
				if (typeof orig.timestamp == 'object') {
					output += 'between ';
					output += formatDate(new Date(orig.timestamp[0]), data.MainSetting_Global_DateFormat, false);
					output += ' to ';
					output += formatDate(new Date(orig.timestamp[1]), data.MainSetting_Global_DateFormat, false);
					output += ' ' + getTZString(currentTime.getTimezoneOffset());
				} else {
					output += formatDate(new Date(orig.timestamp), data.MainSetting_Global_DateFormat, false);
					output += ' ' + getTZString(currentTime.getTimezoneOffset());
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
			
			timeOutput.amount = currentTime.getTime() - new Date(input.whenCCL.timestamp).getTime();
			output += "<br>Time elapsed since badge obtainment: " + timeOutput.formatAmount(getTimerConfig());
			
			if (input.timeSincePrevious != undefined) {
				const orig = input.timeSincePrevious;
				if (input.timeSincePrevious.milliseconds !=  false) {
					output += "<br>Time difference since previous: ";
					if (typeof orig.milliseconds == 'object') {
						output += 'between ';
						timeOutput.amount = orig.milliseconds[0];
						output += timeOutput.formatAmount(getTimerConfig());
						output += ' to ';
						timeOutput.amount = orig.milliseconds[1];
						output += timeOutput.formatAmount(getTimerConfig());
					} else {
						timeOutput.amount = orig.milliseconds;
						output += timeOutput.formatAmount(getTimerConfig());
					}
					if (orig.approx != false) {
						if (orig.approx == true) {
							output += " <small>(approximately)</small>";
						} else {
							output += " <small>(approximately: " + orig.approx + ")</small>";
						}
					}
					
					if (input.position != undefined) {
						output += "<br>Average time difference apart: "
						if (typeof input.whenCCL.timestamp == 'object') {
							output += 'between ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[0]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount(getTimerConfig());
							// console.log(timeOutput.formatAmount());
							output += ' to ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[1]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount(getTimerConfig());
							// console.log(timeOutput.formatAmount());
						} else {
							timeOutput.amount = (new Date(input.whenCCL.timestamp).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount(getTimerConfig());
						}
					}
				}
			}
			
			output += '</p>';
			
			if (input.notes != undefined) {
				output += "<p>" + input.notes + "</p>";
			}
			
			if (input.ownDescription != undefined) {
				output += "<p></p><b class='PressableButton HallofCCLsDescriptionButton' id='NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionToggle_" + input.username + "'>User-written description (toggle):</b><br><div class='HallofCCLsDescriptionContainer' id='NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionContainer_" + input.username + "' style='display:none'>" + input.ownDescription + "</div>";
				ownDescriptionButtons.push("NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionToggle_" + input.username);
				ownDescriptionContainers.push("NotorietyEXPCalculator_HallofInfamyCCLs_OwnDescriptionContainer_" + input.username);
			}
			
			output += "</div></div></td><tr/>";
			
			return output;
		}
		
		const filterIncludedCCLs_positions_alt = filterIncludedCCLs_positions,
		playerEntryTables = [],
		crimsonPositions = [];
		var crimsonIncluded = 0;
		var loopLength = classicInfamySuitOwners.crimson.length;
		for (var x = 0; x < loopLength; x++) {
			crimsonPositions.push(players[x].position);
		}
		
		var loopLength = crimsonPositions.length;
		for (var x = 0; x < loopLength; x++) {
			if (filterIncludedCCLs_positions_alt.indexOf(crimsonPositions[x]) != -1) {
				filterIncludedCCLs_positions_alt.splice(filterIncludedCCLs_positions_alt.indexOf(crimsonPositions[x]), 1);
				crimsonIncluded++
			}
		}
		
		function getCrimsonTable() {
			var string_a = '';
			if (crimsonIncluded > 0) {
				// console.log(filterIncludedCCLs[filterIncludedCCLs.length - 1]);
				string_a = '';
				string_a += "<p><table style='margin:auto;width:100%'>";
				if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'newestOldest') {
					for (var x = crimsonIncluded; x > 0; x--) {
						string_a += playerHTML(filterIncludedCCLs[filterIncludedCCLs.length - x], '128,0,0');
						// console.log(filterIncludedCCLs[x + filterIncludedCCLs.length - 1]);
					}
				} else if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'random') {
					var loopLength = filterIncludedCCLs.length;
					for (var x = 0; x < loopLength; x++) {
						if (filterIncludedCCLs[x].classicInfamySuit == 'Crimson') {
							string_a += playerHTML(filterIncludedCCLs[x], '128,0,0');
						}
					}
				} else {
					for (var x = 0; x < crimsonIncluded; x++) {
						string_a += playerHTML(filterIncludedCCLs[x], '128,0,0');
					}
				}
				string_a += "<hr/><h3 style='text-align:center'>The Crimson " + ['One', 'Two', 'Three', 'Four'][crimsonIncluded - 1] + "</h3>";
				string_a += "</table></p>";
				return string_a;
			}
		}
		
		// console.log(filterIncludedCCLs_positions_alt);
		function getStandardTable() {
			var string_a = '';
			// console.log(Math.min(...filterIncludedCCLs_positions_alt));
			if (Math.min(...filterIncludedCCLs_positions_alt) >= 5 && filterIncludedCCLs_positions_alt.length > 0) {
				string_a = '';
				string_a += "<p><table style='margin:auto;width:100%'>";
				string_a += "<hr/><h3 style='text-align:center'>Post-suits revamp (" + formatDate(new Date("2025-01-17T20:00Z"), data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(new Date().getTimezoneOffset()) + ") CCLs</h3>";
				var maxIterations = filterIncludedCCLs.length,
				iterationBase = crimsonIncluded;
				if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'newestOldest') {
					maxIterations = maxIterations - crimsonIncluded;
					iterationBase = 0;
				} else if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'random') {
					iterationBase = 0;
				}
				for (var x = 0 + iterationBase; x < maxIterations; x++) {
					if (filterIncludedCCLs[x].classicInfamySuit == 'Rojo') {
						// Rojo (200)
						string_a += playerHTML(filterIncludedCCLs[x], '220,20,60');
					} else if (filterIncludedCCLs[x].classicInfamySuit == 'Royalty') {
						// Royalty (150)
						string_a += playerHTML(filterIncludedCCLs[x], '106,50,159');
					} else if (filterIncludedCCLs[x].classicInfamySuit == 'Blue Navy') {
						// Blue Navy (100)
						string_a += playerHTML(filterIncludedCCLs[x], '7,55,99');
					} else if (filterIncludedCCLs[x].classicInfamySuit != 'Crimson') {
						string_a += playerHTML(filterIncludedCCLs[x]);
					}
					// console.log(filterIncludedCCLs[x].username);
					// console.log(filterIncludedCCLs[x]);
				}
				string_a += "</table></p>";
			}
			return string_a;
		}
		// console.log(elem.SectionContainer_HallofInfamyCCLs_TheList);
		if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'oldestNewest') {
			playerEntryTables.push(getCrimsonTable());
			playerEntryTables.push(getStandardTable());
		} else {
			playerEntryTables.push(getStandardTable());
			playerEntryTables.push(getCrimsonTable());
		}
		if (elem.Section_HallofInfamyCCLs_Sort_ObtainmentOrder.value == 'random') {
			playerEntryTables.sort(function() { return randomBetween(0, 2) - randomBetween(1.2, 2.5) });
		}
		// console.log(playerEntryTables);
		// console.log(playerEntryTables[0]);
		// console.log(playerEntryTables[1]);
		elem.SectionContainer_HallofInfamyCCLs_TheList.innerHTML = playerEntryTables.join("");
		
		function makeDescButtonWork(id) {
			document.getElementById(id).style.display == 'none' ? document.getElementById(id).style.display = 'block' : document.getElementById(id).style.display = 'none';
		}
		
		var loopLength = ownDescriptionButtons.length;
		for (var x = 0; x < loopLength; x++) {
			// console.log(ownDescriptionButtons[x]);
			document.getElementById(ownDescriptionButtons[x]).addEventListener('click', function() {
				makeDescButtonWork(ownDescriptionContainers[ownDescriptionButtons.indexOf(this.id)]);
			});
		}
		// console.log(inputSettings);
	}
	
	function addCreditsSection_MenuSettings() {
		var output = "The Notoriety EXP Calculator wouldn't be what it is today without all these amazing contributions!"
		output += "<div><p><span style='font-weight:bold'>Development</span><br/>"
		+ "<ul><li><b style='color:rgba(41,134,204,var(--bg-alpha))'>TheSeal27</b>, aka <b style='color:rgba(41,134,204,var(--bg-alpha))'>Seal</b> or <b style='color:rgba(128,0,0,var(--bg-alpha))'>CCL #1</b>: Lead developer and original creator. Contributed well over 100 active development hours across Versions Indev + 0.0.1 to the present. Lots of contributions stem from this user's knowledge and experience with other projects, including unreleased ones."
		+ "<ul><li><b>User-written notes:</b> I probably wouldn't have even created this tool if I didn't regain an interest in the game and its community after the rerelease, or if I didn't reach my goals of CCL #1 or 2024 CCL."
		+ "<p></p>I've learnt an incredible amount while developing this tool. Not just about coding, but also about myself and what it means to exist as a conscious being. I am who I am, even after everything, and no one can undermine the value of my achievements because their true worth must always be measured from within. I will continue updating this tool for the foreseeable future, including the addition of new CCLs to the Hall of CCLs. Even if I am called such terms like 'stalker', 'creepy' and 'weird', as this is simply something I enjoy and I do not allow the external world to control my emotions and consequently my reality. It's my hope that more people will learn to incorporate this quote into this lives: <i>" + '"' + "Character is like a tree and reputation its shadow; the shadow is what we think it is and the tree is the real thing." + '"' + "</i>"
		+ "<p></p>And lastly, in a similar vein to the end of CCL #1's user-written description in the 'Closing remarks' section: Reality is what you know with absolute conviction (not merely want or desire) it to be. Consciousness is the most powerful force in existence. Sheer intention and belief allows you to achieve anything. With all of this in mind, remember that all truths are half-truths until accepted by the mind, and beliefs will do absolutely anything to stay in existence. Regardless, I advise you, the reader, to write your own story, the story of 'you' and your unique individuality.</li></ul></li>"
		+ "<li><b>ashlyn</b>: Tester from Version 0.0.1 to the present. Provided the capability (Robux-bought boosters) for TheSeal27 to reach CCL in the year 2024, resulting in extra grinding motivation and eventually culminating in their post-CCL idea to create this tool.</li>"
		+ "<li><b>ඞ<i>nat_e</i>ඞ</b>: Tester from Version 0.0.1 to the present.</li>"
		+ "<li><b>player</b>: Tester from Version 0.0.1 to the present.</li>"
		+ "<li><b>maisy (<span style='color:rgba(106,50,159,var(--bg-alpha))'>CCL #8</span>)</b>: Tester from Version 1.5.0 to the present. Notable contributor to CCL #1's grind.</li>"
		+ "</p></div>"
		output += "<div><p><span style='font-weight:bold'>Assets</span><br/>"
		+ "<ul><li><b>Patashu</b>: <a href='https://github.com/Patashu/break_eternity.js'>break_eternity.js</a> large number library, used for some of the tool's numerical computations.</li>"
		+ "<li><b><a href='https://stackoverflow.com/users/361684/gilly3'>gilly3</a></b>: <code>formatDate()</code> function, used to format date timestamps throughout the tool.</li>"
		+ "</p></div>"
		output += "<div><p><span style='font-weight:bold'>Other contributions</span><br/>"
		// linear-gradient(to right, rgba(255,255,255,var(--bg-alpha)), rgba(0,153,255,var(--bg-alpha)), rgba(0,204,0,var(--bg-alpha)), rgba(255,153,0,var(--bg-alpha)))
		// linear-gradient(to right, rgba(255,255,255,var(--bg-alpha)) calc(100% / 4 * 0) calc(100% / 4 * 1), rgba(0,153,255,var(--bg-alpha)) calc(100% / 4 * 1) calc(100% / 4 * 2), rgba(0,204,0,var(--bg-alpha)) calc(100% / 4 * 2) calc(100% / 4 * 3), rgba(255,153,0,var(--bg-alpha)) calc(100% / 4 * 3) calc(100% / 4 * 4))
		+ "<ul><li><b style='background:linear-gradient(to right, rgba(255,255,255,var(--bg-alpha)), rgba(0,153,255,var(--bg-alpha)), rgba(0,204,0,var(--bg-alpha)), rgba(255,153,0,var(--bg-alpha)));-webkit-background-clip:text;-webkit-text-fill-color:transparent'>Dreamers Collective (CCL #25)</b> (Credited: <span style='font-weight:bold'>| Harry |</span>, <span style='font-weight:bold;color:rgba(0,153,255,var(--bg-alpha))'>[ Alisa ]</span>, <span style='font-weight:bold;color:rgba(0,204,0,var(--bg-alpha))'>{ Isaac }</span>, <span style='font-weight:bold;color:rgba(255,153,0,var(--bg-alpha))'>/ Katelyn /</span>): For providing TheSeal27 with direct and indirect motivation to continue working on the tool, even during times of struggles. Helped TheSeal27 find the door to their self enlightenment, resulting in their realisation that demotivation and burnout are merely concepts in the mind and that they don't have to affect oneself. Therefore indirectly contributing to all future demotivated updates starting in approximately <u>Version 0.1.0 - Numbers and Computations</u> or <u>Version 1.3.0 - Additional Additions!</u>.</li>"
		+ "</p></div>"
		
		elem.SectionContainer_Credits.innerHTML = output;
	}
	addCreditsSection_MenuSettings();
	
	function addKnownBugsSection_MenuSettings() {
		var output = "A list of known issues with this tool, sorted in three categories from most to least problematic."
		output += "<div><p><span style='font-weight:bold'>Major</span><br/><ul>"
		+ "<li>Invalid Global Settings browser local storage JSON string (such as via modifying it directly) will cause the tool to return an error. If this happens, clear your browser's local storage or use the following console command: <code>window.localStorage.setItem(" + '"' + "NotorietyEXPCalculator_GlobalSettings" + '"' + ", null);</code></li>"
		+ "</ul></p></div>"
		output += "<div><p><span style='font-weight:bold'>Medium</span><br/><ul>"
		+ "<li>There will most likely be performance issues when calculating too Infamy Ranks or Mutator Ranks. This is mainly an issue past <code>1,000,000</code>, give or take a zero.</li>"
		+ "<li>Menu Miscellaneous > Section Timers: The 250ms auto update interval may cause lag on slower browsers.</li>"
		+ "<li>Menu Miscellaneous > Section Hall of CCLs: Sorting the list by 'Random' does not consistently return the same order as the 'interpreted and boolean logic of each entry' collapsible list. May possibly not be fixed, as it is random after all.</li>"
		+ "</ul></p></div>"
		output += "<div><p><span style='font-weight:bold'>Minor</span><br/><ul>"
		+ "<li>Inconsistent usage of terms 'Infamy Rank' and 'Infamy Level'.</li>"
		+ "<li>Inconsistent lettercase throughout the tool.</li>"
		+ "<li>Menu Miscellaneous > Section Timers: Likely outdated top-of-section notes list entry 5.</li>"
		+ "<li>Formatting inconsistency pertaining to the milliseconds time output name, for instance <code>9 seconds, 1,000 milliseconds</code> instead of <code>10 seconds</code>. This is likely due to a floating-point error, and does not appear to have any noticeable impact on accurate outputs.</li>"
		+ "<li>Infamy Rank colours do not accurately match the ranks they each appear at in-game. Their colours may also be inaccurate, especially what is currently programmed as V to IX as rgb(74,136,182).</li>"
		+ "</ul></p></div>"
		
		elem.SectionContainer_KnownBugs.innerHTML = output;
	}
	addKnownBugsSection_MenuSettings();
	
	function addUpdateLog(firstCreation) {
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
		const localTZ = new Date().getTimezoneOffset();
		const minutesDevelopment = {
			"2.0.1": 8.5166666666666666666666666666667, // repeating decimal (x.5166666666666666666666666666667) adds 31s)
			"2.0.0": 2111.5166666666666666666666666666, // repeating decimal (x.5166666666666666666666666666) adds 31s
			"1.4.12a": 0.75,
			"1.4.12": 2.9166666666666666666666666666667,
			"1.4.11": 7.85,
			"1.4.10a": 1,
			"1.4.10": 3,
			"1.4.9b": 25, // possibly 10 - 15 mins extra
			"1.4.9a": 19,
			"1.4.9": 9,
			"1.4.8": 7,
			"1.4.7": 5,
			"1.4.6a": 61,
			"1.4.6": 5,
			"1.4.5": 14,
			"1.4.4b": 1,
			"1.4.4a": 3,
			"1.4.4": 4,
			"1.4.3a": 5,
			"1.4.3": 40,
			"1.4.2b": 6,
			"1.4.2a": 2,
			"1.4.2": 21,
			"1.4.1": 12,
			"1.4.0": 288,
			"1.3.0": 692,
			"0.2.1": 56,
			"0.2.0": 444,
			"0.1.1h": 2,
			"0.1.1g": 13,
			"0.1.1f": 12,
			"0.1.1e": 5,
			"0.1.1d": 13,
			"0.1.1c": 18,
			"0.1.1b": 5,
			"0.1.1a": 3,
			"0.1.1": 39,
			"0.1.0": 283,
			"0.0.2c": 1,
			"0.0.2b": 27,
			"0.0.2a": 10,
			"0.0.2": 35,
			"0.0.1e": 5,
			"0.0.1d": 4,
			"0.0.1c": 4,
			"0.0.1b": 51,
			"0.0.1a": 90,
			"0.0.1": 360,
			"Indev": 2400,
		}
		var minutesDevelopment_Total = 0;
		function formatMinutesDev(which, total) {
			const timeOutput = new Timer();
			if (total == true) {
				timeOutput.amount = which * 1000 * 60;
			} else {
				timeOutput.amount = minutesDevelopment[which] * 1000 * 60;
			}
			return timeOutput.formatAmount(getTimerConfig());
		}
		var loopLength = Object.keys(minutesDevelopment).length;
		for (var x = 0; x < loopLength; x++) {
			minutesDevelopment_Total += minutesDevelopment[Object.keys(minutesDevelopment)[x]];
		}
		function UpdateLogVersionEntry(number, info, type) {
			this.number = number;
			this.info = info;
			this.type = type;
		}
		// console.log(minutesDevelopment_Total);
		const versionsData = [
		new UpdateLogVersionEntry('2.0.1',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1750384800000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 2.0.1</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #44 (<code>YuukaKazamiii</code>).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #1's Mutator Rank + MXP remaining until next rank values (0 + 5,000 > 0 + 5,000 as of 2025-06-20T01:41Z).")}
				${updateLogEntry('edit', "Menu Settings > Section Credits: Under the 'Other contributions' category, adjusted the credit of entry 1: <code>Dreamers Collective (CCL #25) (Credited: Harry, [Alisa], {Isaac}, /Katelyn/)</code> > <code>Dreamers Collective (CCL #25) (Credited: | Harry |, [ Alisa ], { Isaac }, / Katelyn /)</code>. Also adjusted the credits reason.")}
				${updateLogEntry('edit', "Some slight source code changes.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('2.0.1') + '.')}
			</ul></div>
			`
			,'small'),
		new UpdateLogVersionEntry('2.0.0',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1750298400000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 2.0.0 - The Completely Overkill Update</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Under the 'Filtering and Sorting' sub-section, added the 'Filtering logic' textarea input under its own filtering group of the same name. This input determines the logical operators that the filter groups (defined as 'suit', 'time', 'specific' and 'other') are computed, being either AND or OR, as well as allowing for complicated conditions using parentheses. Included the following input explanation: <code>Logical operators for each filter group. Define either 'AND' or 'OR'. Complicated conditions must use parentheses ('(' and ')'). Any filter group can be defined or excluded, and they must match the exact spelling: <code>suit</code> for 'Classic infamy suits' filters, <code>time</code> for 'Time' filters, <code>specific</code> for 'Specific CCLs' filters and <code>other</code> for 'Other' filters. Not defining a filter group will simply ignore its filters. Do not define the same filter group more than once. Defaults to <code>specific</code>.<br/>Input interpretation: <code>x</code><br/>Boolean result: <code>y</code></code><br>Where 'x' is the interpretation of the input and 'y' is the logical boolean result of the condition. Also, there is now a collapsible list of each CCL entry's interpreted and evaluated boolean logic, underneath the 'Generated X CCL entries out of Y programmed total' paragraph.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Under the 'Filtering and Sorting' sub-section, added the 'Specific CCLs' filtering group with one textarea input of the same name and an 'Exclude?' checkbox. This allows filtering of specific CCLs based on text input. Included the following input explanation: <code>Specific CCLs to filter, based on their CCL # (badge obtainment position number). A 'range' is defined as either 'x' or 'x until y' (e.g. <code>5</code> or <code>8 until 11</code>). Separate each range on a new line. Defaults to <code>1 until x</code>, where x is programmed CCL entries.</code>.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Under the 'Filtering and Sorting' sub-section, added the 'hour', 'minute', 'second' and 'millisecond' filters to the Time filters. Also increased the 'year' filter's maximum value from 2124 to 3024.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #12's user-written description:<ul><li><pre>brickbankbrickbankbrickbankbrickbankbrickbank<p></p>never grind to ccl using public lobbies<br/>lmao<br/>biggest mistake of my life 👎</pre></li></ul>")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #42 (<code>Eviscerality</code>).")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #43 (<code>Nightmareee7</code>).")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added a switch button to toggle the collapsed or expanded state of all included entry descriptions.")}
				${updateLogEntry('add', "Added the menu 'Settings':<ul><li>Added the section 'Global Settings' (position 1):<ul><li>Top-of-section notes: <code>These are 'common' settings which apply throughout more than one menu in the tool. Note: These aren't all the tool's settings, check the other menus for more.</code></li><li>Includes a button which updates all Global Settings.</li></ul></li><li>Added the section 'Credits' (position 2). Credited the following users, with unique descriptions for each entry: <ul><li>Category 'Development':<ul><li><b style='color:rgba(41,134,204,var(--bg-alpha))'>TheSeal27</b>, aka <b style='color:rgba(41,134,204,var(--bg-alpha))'>Seal</b> or <b style='color:rgba(128,0,0,var(--bg-alpha))'>CCL #1</b></li><li><b>ashlyn</b></li><li><b>ඞ<i>nat_e</i>ඞ</b></li><li><b>player</b></li><li><b>maisy (<span style='color:rgba(106,50,159,var(--bg-alpha))'>CCL #8</span>)</b></li></ul></li><li>Category 'Assets':<ul><li><b>Patashu</b></li><li><b><a href='https://stackoverflow.com/users/361684/gilly3'>gilly3</a></b></li></ul></li><li>Category 'Other contributions':<ul><li><b style='background:linear-gradient(to right, rgba(255,255,255,var(--bg-alpha)), rgba(0,153,255,var(--bg-alpha)), rgba(0,204,0,var(--bg-alpha)), rgba(255,153,0,var(--bg-alpha)));-webkit-background-clip:text;-webkit-text-fill-color:transparent'>Dreamers Collective (CCL #25)</b> (Credited: <span style='font-weight:bold'>Harry</span>, <span style='font-weight:bold;color:rgba(0,153,255,var(--bg-alpha))'>[Alisa]</span>, <span style='font-weight:bold;color:rgba(0,204,0,var(--bg-alpha))'>{Isaac}</span>, <span style='font-weight:bold;color:rgba(255,153,0,var(--bg-alpha))'>/Katelyn/</span>)</li></ul></li></ul></li><li>Added the section 'Known Bugs' (position 3):<ul><li>Category 'Major': 1 entry.</li><li>Category 'Medium': 3 entries.</li><li>Category 'Minor': 5 entries.</li></ul></li></ul>")}
				${updateLogEntry('add', "Menu Settings > Section Global Settings:<ul><li>Added a new slider input, 'Saturation', which configures the saturation of the entire tool based on a percentage ranging from 0% to 100%. Appears in position 6.</li><li>Added a new 'Date format' textarea input. This determines the formatting of date timestamps throughout the tool. Date formats throughout the tool now consistently use the value of this input, defaulting to <code>yyyy-MM-dd HH:mm:ss:fff</code>. Included an input explanation. Appears in position 7.</li><li>Added a new 'Keep settings on reload?' checkbox input. This determines whether the saved settings are reapplied on reloading the tool. Appears in position 8.</li><li>Added a new 'Reset settings' button. This resets all global settings to their defaults, as well as clearing the localStorage data that keeps settings on reload. Appears in position 9.</li><li>Added a new 'Time output names' input, which configures included or excluded time names in formatted time outputs. This appears in position 5.</li><li>Moved four settings (Input method, Roman numerals, Input explanations, Time output format) to here from Menu Calculator > Section Global Settings (renamed to 'Menu Settings'). Also enlargened them and changed their order from <code>Input method, Roman numerals, Input explanations, Time output format</code> > <code>Input method, Input explanations, Roman numerals, Time output format</code>. They appear together starting at position 1.</li></ul>")}
				${updateLogEntry('add', "Added the following time names to formatted time outputs and their equivalent milliseconds:<ul><li>w, wk, week, weeks, <code>604,800,000</code></li><li>de, dec, decade, decades, <code>315,576,000,000</code></li><li>c, cen, century, centuries, <code>3,155,760,000,000</code></li><li>mi, mlnm, millennium, millennia, <code>31,557,600,000,000</code></li><li>noup, noupdate, notoriety update interval, notoriety update intervals, <code>2,190,728,592,000,000</code></li></ul>")}
				${updateLogEntry('add', "Added a highlight to the currently selected menu's button. They also now have their font sizes reduced when active.")}
				${updateLogEntry('add', "Added five easter eggs? (Total 7.)")}
				${updateLogEntry('add', "There is now behind-the-scenes code to support anonymisation of Hall of CCLs entries.")}
				${updateLogEntry('edit', "Changed the top-of-tool text:<ul><li>Previous: <code>A tool for the Roblox game <a href='https://www.roblox.com/games/21532277'>Notoriety</a>'s EXP, Infamy and MXP features<br>Tool created by TheSeal27</code></li><li>Current: <code>A tool for the Roblox game <a href='https://www.roblox.com/games/21532277'>Notoriety</a>'s EXP, Infamy and MXP features.<br>Includes many features and the Hall of CCLs.<br><i>Tool created by TheSeal27</i></code></li></ul>")}
				${updateLogEntry('edit', "Menu Calculator: Renamed the section 'Global Settings' to 'Menu Settings'.")}
				${updateLogEntry('edit', "Menu Calculator > Section Menu Settings: Enlargened the settings and moved them to the middle of the section.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #1's Mutator Rank + MXP remaining until next rank values (0 + 5,000 > 0 + 5,000 as of 2025-06-15T09:24Z). Made the description's section titles' font sizes larger by 30%. Replaced 85 non-sentence-starting instances of the singular pronoun 'I' to 'i'. Changed the following note:<ul><li>Previous: <code>CCL #1 is also the creator of this tool!</code></li><li>Current: <code>CCL #1 and their team are also the developers of this tool!</code></li></ul>")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight changes to CCL #2's user-written description: Made the section titles' font sizes larger by 30%.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #7's Mutator Rank + MXP remaining until next rank values (3,939 + 18,260 > 4,000 + 32,564 as of 2025-06-03T04:02Z).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #18's Mutator Rank + MXP remaining until next rank values (1,412 + undefined > 1,500 + 6,565 as of 2025-06-08T08:09Z). Also rewrote the entire user-written description from scratch while preserving all 28 images.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #25's entry: Slight modifications and expansions to the description, including the addition of 11 images. Converted 1 image from <code>png</code> to <code>jpg</code>. Updated the display name from <code>GenericDreamer</code> to <code>GenericDreamers</code>. Updated the Mutator Rank + MXP remaining until next rank values (273 + 4,471 > 283 + 3,054 as of 2025-06-06T04:14Z).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changed the 'Post-suits revamp (<i>timestamp</i>) CCLs' subsection to display milliseconds.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Timers: Appended the following to the top-of-section notes list entry 4: <code>Your detected UTC offset: x</code>, where x is the browser's detected UTC offset. Also changed list entry 5:<ul><li>Previous: <code>There may be an unintentional extra day included when the time is more than a month away.</code></li><li>Current: <code>Possibly no longer an issue after Version 1.4.9a: <s>There may be an unintentional extra day included when the time is more than a month away.</s></code></li></ul>")}
				${updateLogEntry('edit', "Changed the tool's Notoriety version from 3.10.0 to 3.10.1b.")}
				${updateLogEntry('edit', "Changed the default displayed menu from Calculator to the new Settings.")}
				${updateLogEntry('edit', "The main settings (Computing, Maximum infamies, Auto calculate, Input method, Input explanations, Roman numerals, Time output format) are now more visible (standard font size instead of small).")}
				${updateLogEntry('edit', "Moved the Update Log from the Menu Miscellaneous to Menu Settings in position 3.")}
				${updateLogEntry('edit', "The Update Log's 'estimated total active development time across all versions' value is now updated with the current time output configuration when the list is recreated.")}
				${updateLogEntry('edit', "Increased the tool's width from 80% to 95% of the HTML body.")}
				${updateLogEntry('edit', "Many source code changes, mainly for improving consistency, optimisation and readability.")}
				${updateLogEntry('edit', "Updated the scripts-disabled version of the HTML output by changing the sentence stating approximate total size of the tool from 14.5MB to 17MB.")}
				${updateLogEntry('fix', "Menu Calculator:<ul><li>Section Level Settings: Fixed inputs 'Current level', 'Remaining EXP', 'Desired level' and 'EXP formula' not properly having an upper limit.</li><li>Section Infamy Settings: Fixed inputs 'Current infamy level' and 'Desired infamy level' not properly having an upper limit.</li></ul>")}
				${updateLogEntry('fix', "Menu Calculator > Section Results: When 'Until this many rotations' input is greater than 0:<ul><li>Fixed the +x Levels count displaying 1 level more than the actual count.</li><li>Fixed rotations being calculated when 'Run/rotation gains' input does not have any included runs.</li></ul>")}
				${updateLogEntry('fix', "The menu buttons are now consistently displayed regardless of available screen space, and they no longer overflow into the menu containers.")}
				${updateLogEntry('other', "Added the following tester: maisy.")}
				${updateLogEntry('other', "Update Log version entries will now use nested list formatting, where appropriate, for improved readability.")}
				${updateLogEntry('other', "This update was originally going to be a quick patch titled Version 1.4.9c, then changed to Version 1.4.10 due to including at least one brand new feature. Then <u>Version 1.5.0</u> with a custom version name (" + '"' + "Eternally Expanding Hall" + '"' + ") due to many extra features warranting the higher version number. And finally, <u>Version 2.0.0 - The Completely Overkill Update</u> (definitely a <b>PAYDAY <span style='color:rgba(41,134,204,var(--bg-alpha))'>2</span></b> reference!) due to being such an incredibly large update not yet seen since the initial public release or possibly <u>Version 1.3.0 - Additional Additions!</u>.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('2.0.0') + '.')}
				${updateLogEntry('other', "<span style='font-size:50%'>Wowsers, what an update log! Also, FIVE 'Other' sub-entries?!</span>")}
			</ul></div>
			`
			,'major'),
			new UpdateLogVersionEntry('1.4.12a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1749990000000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.12a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Noted CCL #41's highest classic infamy suit ownership of Blue Navy (100).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.12a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.12',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1749989340000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.12</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #41 (<code>Deerhaunter2021</code>).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.12') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.11',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1749405900000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.11</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #40 (<code>TohKia69</code>).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.11') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.10a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1749379380000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.10a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('fix', "Menu Miscellaneous > Section Hall of CCLs: Fixed CCL #39 not being in the list.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.10a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.10',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1749379200000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.10</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #39 (<code>Lord_Anno</code>).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.10') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.9b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1748838300000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.9b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #1's user-written description: Reworded part of a caption of an image under the 'Explosive Return' section: <code>including CCLs #9 and #28</code> > <code>including future CCLs #9 and #28</code>. Renamed section 'The Push towards the End - Part II: Determination in the face of Adversity' to 'The Push towards the End - Part II: Determination in the Face of Adversity'. Rewording under the fourth and fifth paragraphs of the 'Closing remarks' section. Slight formatting adjustments throughout this section.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #7's Mutator Rank + MXP remaining until next rank values (3,800 + 31,783 > 3,939 + 18,260 as of 2025-06-02T04:15Z).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #25's notes: Changed " + '"' + "First known openly plural system to reach CCL." + '"' + " to " + '"' + "First known openly plural system (at the time of public reveal) to reach CCL." + '"' + ".")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.9b') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.9a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1748781360000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.9a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #7's Mutator Rank + MXP remaining until next rank values (3,700 + 29,619 > 3,800 + 31,783 as of 2025-05-31T02:43Z).")}
				${updateLogEntry('edit', "Time outputs now calculate one month as 30 days long, instead of 30.4375 days. Possibly also a bugfix to the occasionally inconsistent menu 'Miscellaneous' > 'Timers' section's times of one month or longer.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.9a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.9',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1748613840000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.9</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #38's user-written description and updated the entry's Roblox avatar.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #1's user-written description: Added the following sentence to the 'The Push towards the End - Part I: Mind over Matter' section, paragraph 2: " + '"' + "Oftentimes I would 'min-max' my breaks in order to get back to the grind sooner, such as by cooking food at the same time as having a shower to save about 10 to 15 minutes." + '"' + ".")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.9') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.8',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1748489100000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.8</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #38 (<code>00pro11</code>).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #7's Mutator Rank + MXP remaining until next rank values (3,500 + 24,670 > 3,700 + 29,619 as of 2025-05-28T02:41Z).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.8') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.7',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1748387880000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.7</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #33's current Mutator Rank (1,670 as of 2025-05-26) to the entry's notes.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #37's user-written description.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #18's Mutator Rank + MXP remaining until next rank values (1,280 + 5,386 > 1,412 + undefined as of 2025-05-26).")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #23's Mutator Rank + MXP remaining until next rank values (46 + 2,662 > 53 + 2,081 as of 2025-05-25T18:39Z).")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.7') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.6a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747989300000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.6a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #1's user-written description: Titled the story <code>A Tale of Inspiration, Individuality & the Infinite Power of Consciousness</code>. Renamed section 'Post-revamp Grinding Era' to 'Post-revamp Era'. Under the 'Rerelease + Silent Grinding' section, moved everything starting at and including the fifth sentence of the first paragraph to the newly created second paragraph. Moved everything starting at and including the ninth sentence of the first paragraph to the newly created third paragraph. Under the 'Explosive Return' section, reworded a part of the first paragraph fifth sentence: " + '"' + "ending up with around $3 or $4bil" + '"' + " > " + '"' + "ending up with just over $4bil" + '"' + ". Moved everything starting at and including the fifth sentence of the first paragraph to the second paragraph, moving the existent second paragraph to the third position. Under the 'The Push towards the End' section, slight rewording of the fifth sentence of the second paragraph. Corrected a part of the third paragraph first sentence: " + '"' + "At infamy 182 (CLXXXIII)" + '"' + " > " + '"' + "At infamy 182 (CLXXXII)" + '"' + ". Reworded a part of the third paragraph first sentence: " + '"' + "Ali hardly grinded at all, and was probably #3" + '"' + " > " + '"' + "Ali hardly grinded at all, and was probably the fourth highest infamy in the game, behind Maisy and Derp" + '"' + ". Added a new sentence in the sixth position of the fifth paragraph: " + '"' + "This deal was eventually mutually, publicly nullified, while retaining the Robux, on 2025-04-28T13:01Z." + '"' + ". Renamed this section to 'The Push towards the End - Part I: Mind over Matter' and moved paragraphs three through five to the newly created 'The Push towards the End - Part II: Determination in the face of Adversity' section, which appears underneath 'The Push towards the End - Part I: Mind over Matter'. Under the 'Closing remarks' section, reworded the first paragraph fourth sentence: " + '"' + "Regardless, even though there were days when I didn't want to grind, I know I was extremely committed and set my mind to achieving my goal, enduring each long day after the next through the sheer will to be first (only stopping due to a physical need or ailment, never out of boredom or demotivation), and later also to achieve it before the end of the year." + '"' + " > " + '"' + "Regardless, even though there were days when I didn't want to grind, I know I was extremely committed and set my mind to achieving my goal, enduring each long day after the next through the sheer, unfathomably powerful, will to be first. I just HAD to achieve it, it was my sole purpose in life and reason to continue the grind. Any time I stopped, it was due to a physical need or ailment, never out of boredom or demotivation. Later my motivation was also to achieve it before the end of the year." + '"' + ". Also updated the entry's Mutator Rank + remaining MXP until next rank (0 + 5,000 > 0 + 5,000 as of 2025-05-23T03:31Z).")}
				${updateLogEntry('edit', "Reworded the following paragraph in the Update Log: " + '"' + "Some features of this tool are copied from my other tools, including an extremely developed tool that has seen hundreds of hours of active development time yet hasn't seen the light of day with a release." + '"' + " > " + '"' + "Some features of this tool are copied from my other tools, including an extremely developed, unreleased tool that has seen hundreds of hours of active development time." + '"' + ".")}
				${updateLogEntry('fix', "Fixed Update Log entries Version 1.4.6 and Version 1.4.5 noting " + '"' + "Menu Miscellaneous: Section Hall of CCLs" + '"' + " instead of " + '"' + "Menu Miscellaneous > Section Hall of CCLs" + '"' + ".")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.6a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.6',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747962180000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.6</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #37 (<code>jadineq1</code>).")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added the following note to the generated CCLs entries and timestamp paragraph: 'Check <a href='https://badges.roblox.com/v1/badges/1157147255776915'>this link</a> for an updated count of the Rank 250 badges awarded.'")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.6') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.5',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747884600000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.5</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added Mutator Ranks and remaining MXP until next rank to the following CCL entries' notes, along with a 'as of' timestamp note, based on user-provided data: #9, #10, #11, #18, #20, #27.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Added the word 'remaining' to the following CCL entries' MXP remaining note for consistency: #1, #23, #32.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Updated CCL #7's Mutator Rank + MXP remaining until next rank (3,443 + undefined > 3,500 + 24,670 as of 2025-05-22T03:02Z). Also updated the entry's Roblox avatar.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.5') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.4b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747739100000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.4b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('fix', "Fixed Update Log entry Version 1.4.3 displaying an incorrect release timestamp.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.4b') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.4a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747738620000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.4a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changes to CCL #1's user-written description: Under the 'Closing remarks' section, moved everything starting at and including the fifth sentence of the fourth paragraph into the newly created fifth paragraph.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.4a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.4',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747714740000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.4</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #8's user-written description. Also updated the entry's Roblox avatar.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.4') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.3a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747710120000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.3a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Added the following note to Update Log entry version 1.4.3, sub-entry 3 (description section 'The Push towards the End'): 'added a paragraph in position 2'")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.3a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.3',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747709460000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.3</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous: Section Hall of CCLs: Added CCL #7's user-written description, including the addition of 1 image.")}
				${updateLogEntry('add', "Menu Miscellaneous: Section Hall of CCLs: Added Mutator Ranks and remaining MXP until next rank to the following CCL entries' notes, along with a 'as of' timestamp note, based on user-provided data: #1, #2, #7, #12, #23, #25, #30, #32.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Hall of CCLs: Changes to CCL #1's user-written description: Slight changes to two description sections: <code>The Push towards the End</code> (added a paragraph in position 2 + reworded 'infamy money requirement' to 'infamy money requirement limit' and 'being about 80 infamy ranks ahead of #2' to 'being about 80 infamy ranks ahead of Ali') and <code>The End + The Beginning of the Hall of CCLs</code> (Moved a sentence from the first paragraph to the second.). Also changes to the notes: moved a sentence (" + '"' + "Very likely the only CCL without any MXP or Mutator Ranks." + '"' + ") one ahead in the paragraph, slightly adjusting it to accommodate the new Mutator Ranks + remaining MXP data.")}
				${updateLogEntry('edit', "Updated the scripts-disabled version of the HTML output by changing the sentence stating approximate total size of the tool from 14.25MB to 14.5MB.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.3') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.2b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747567740000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.2b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Hall of CCLs: Changes to CCL #25's user-written description: Slight changes to three sentences, one for each of the following description sections: <code>Prologue - A Captain with No Crew, A Sea with No Stars</code>, <code>Special Intermission - The <span style='color:rgba(255,0,255,var(--bg-alpha))'>NO</span>existence<span style='color:rgba(255,0,255,var(--bg-alpha))'>N</span> of a Dreamer’s <span style='color:rgba(255,0,255,var(--bg-alpha))'>Will</span></code> and <code>Chapter 2 - A Friendship a Day Keeps the Burnout Away</code>.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.2b') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.2a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747564980000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.2a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Hall of CCLs: Changes to CCL #25's user-written description: Slightly adjusted a sentence under the 'Foreword - The 25th CCL badge has 4 owners.' description section.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.2a') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('1.4.2',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747562760000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.2</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Hall of CCLs: Added a timestamp (with the browser's detected UTC offset) of when the list was most recently created. Also changed 'out of X total' to 'out of X programmed total'.")}
				${updateLogEntry('add', "Menu Miscellaneous > Hall of CCLs: Each generated entry's 'Badge obtained' value now includes the browser's detected UTC offset.")}
				${updateLogEntry('add', "Menu Miscellaneous > Hall of CCLs: Added the following note to CCL #25's entry: 'First known openly plural system to reach CCL.'")}
				${updateLogEntry('add', "Menu Miscellaneous > Hall of CCLs: Changes to CCL #36's entry: Added the note 'Possibly the first console and Xbox player to reach CCL.' and a user-written description.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Hall of CCLs: Changes to CCL #1's user-written description's 'The End + The Beginning of the Hall of CCLs' section: Changed '~$20bil' to '~$25bil'. Also added ', with $30,833,679 remaining'.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.2') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.1',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747486620000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 1.4.1</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Hall of CCLs: Added CCL #36 (<code>GhostrUiN420</code>).")}
				${updateLogEntry('edit', "Some source code changes.")}
				${updateLogEntry('fix', "The Update Log now correctly collapses all entries on recreation, except the most recent entry on initial tool load.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.1') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('1.4.0',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747395300000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 1.4.0 - History: Past, Present and Future</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added the 'Filter: Other' filtering category with two new filters: 'Has notes' and 'Has user-written description', as well as an exclude option.<br/>(Suggested by the Dreamers Collective.)")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added the following note to the 'Filtering and Sorting' sub-section: <code>Filters act as an 'AND' logical operator, checked for each programmed CCL entry.</code>")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #35 (<code>lancejuly28</code>) and their user-written description, including the addition of 10 images.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Timers: Added a note in parentheses to the top-of-section notes list entry 4: <code><a href='https://en.wikipedia.org/wiki/List_of_UTC_offsets'>see here</a> for list</code>")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Timers: Added the following to the top-of-section notes list as entry 5: <code>There may be an unintentional extra day included when the time is more than a month away.</code>")}
				${updateLogEntry('add', "The Update Log's version entries can now be sorted based on three options: 'Newest to oldest' (default), 'Oldest to newest', 'Random'. Each version entry can also have its visibility altered by clicking on the bolded release timestamp + version text. By default, only one entry at the top of the list is visible.")}
				${updateLogEntry('add', "Added the following 'Other' sub-entry to Update Log entry Indev: <code><span style='font-style:italic;color:rgba(255,255,var(--bg-alpha))'>This version's name is definitely not a Minecraft reference!</span></code>")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Changed the 'Post-suits revamp (<i>timestamp</i>) CCLs' subsection to no longer display milliseconds. It also now displays the browser's detected UTC offset.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Improved the visibility of CCL #1's user-written description's description sections, affecting sections <code>Discovering the game + Early days</code>, <code>Post-revamp Grinding Era</code>, <code>Rerelease + Silent Grinding</code>, <code>Explosive Return</code>, <code>The Push towards the End</code>, <code>The End + The Beginning of the Hall of CCLs</code> and <code>Closing remarks</code>.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Improved the visibility of CCL #2's user-written description's description sections, affecting sections <code>Pre-CCL Release</code>, <code>Journey to CCL & Notoriety’s Rerelease</code> and <code>Post CCL Short Story</code>.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight changes to CCL #25's user-written description in various parts, including to the <code>Special Intermission: The <span style='color:rgba(255,0,255,var(--bg-alpha))'>NO</span>existence<span style='color:rgba(255,0,255,var(--bg-alpha))'>N</span> of a Dreamer’s <span style='color:rgba(255,0,255,var(--bg-alpha))'>Will</span></code> user-written description's description section (also renamed to <code>Special Intermission - The <span style='color:rgba(255,0,255,var(--bg-alpha))'>NO</span>existence<span style='color:rgba(255,0,255,var(--bg-alpha))'>N</span> of a Dreamer’s <span style='color:rgba(255,0,255,var(--bg-alpha))'>Will</span></code> and switched places with <code>Chapter 2: A Friendship a Day Keeps the Burnout Away</code> (renamed to <code>Chapter 2 - A Friendship a Day Keeps the Burnout Away</code>)). Also changed the description title from <code>The Dreamers Collective’s Journey to infamy CCL</code> to <code>The Dreamers Collective’s Journey to Infamy CCL</code>.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Rewording of the folowing sentences: <code>Badge obtainment times are noted in the local system time in <b>year-month-day 24hour:minute:second:millisecond</b> format.</code> > <code>Badge obtainment times are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute:second:millisecond</b> format.</code>, <code>Entries' user-written descriptions' timestamps are usually plaintext, so they do not auto-update to the system time.</code> > <code>Entries' user-written descriptions' timestamps are usually plaintext, so they do not auto-update to local time.</code>")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Reworded <code>Highest infamy classic suit</code> to <code>Highest classic infamy suit</code>, simultaneously adjusting the notes of CCL entries #5, #6, #7, #8, #9, #13, #18, #26, #27, #28 and #33.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Timers: Rewording of the following sentences: <code>Timestamps are noted in the local system time in <b>year-month-day 24hour:minute:second:millisecond</b> format.</code> > <code>Timestamps are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute:second:millisecond</b> format.</code>, <code>Challenges timestamps are noted in the local system time in <b>year-month-day 24hour:minute</b> format.</code> > <code>Challenges timestamps are noted in the browser's detected local time zone in <b>year-month-day 24hour:minute</b> format.</code>")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Timers: Possibly made the timers computations more consistent.")}
				${updateLogEntry('edit', "In the Update Log, reworded the following sentence: <code>Update Log version timestamps are noted in the local system time in <b>year-month day 24hour:minute</b> format.</code> > <code>Update Log version timestamps are noted in the browser's detected local time zone in <b>year-month day 24hour:minute</b> format.</code>")}
				${updateLogEntry('edit', "Expanded Update Log entry Version 1.3.0 - Additional Additions!, sub-entry 3, by modifying the following part: <code>Also changes under the 'Rerelease + Silent Grinding' and 'Explosive Return' description sections, including the addition of 3 images.</code> > <code>Also changes under the 'Post-revamp Grinding Era', 'Rerelease + Silent Grinding' and 'Explosive Return' description sections, including the addition of 3 images.</code>")}
				${updateLogEntry('edit', "Expanded 'Update Log' section no longer displays a horizontal line at the end.")}
				${updateLogEntry('edit', "The Update Log's estimated active development times, both per version and the total, are now automatically calculated and formatted. Estimated times now display 'approx.' instead of <code>~</code>.")}
				${updateLogEntry('edit', "Renamed the following Update Log entries: <code><u>Version 0.1.0</u></code> to <code><u>Version 0.1.0 - Numbers and Computations</u></code>, <code><u>Version 0.2.0</u></code> to <code><u>Version 0.2.0 - All about the Hall</u></code>, <code><u>Version 0.0.2</u></code> to <code><u>Version 0.0.2 - Historical Additions</u></code> and <code><u>Version 0.0.1</u></code> to <code><u>Version 0.0.1 - The Beginning</u></code>.")}
				${updateLogEntry('edit', "Updated the scripts-disabled version of the HTML output by changing the sentence stating approximate total size of the tool from 11.5MB to 14.25MB.")}
				${updateLogEntry('edit', "Some source code changes.")}
				${updateLogEntry('fix', "Menu Miscellaneous > Section Hall of CCLs: Fixed filtering and sorting the list breaking the double-click image functionality.")}
				${updateLogEntry('other', "Any suggested changes, if noted in the Update Log, now receive attribution, if consensual.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.4.0') + '.')}
			</ul></div>
			`
			,'mediumLarge'),
			new UpdateLogVersionEntry('1.3.0',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1747222800000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 1.3.0 - Additional Additions!</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Calculator: Added the 'Global Settings' section and placed the toggle settings (Input method, Roman numerals, Input explnations, Computing, Auto calculate, Time output format) within.")}
				${updateLogEntry('add', "Menu Calculator > Section Progression Settings: Added the following top-of-section note: <code>These settings are not required to be defined if not calculating progression requirements.</code>")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Expanded CCL #1's user-written description with a new 'Closing remarks' description section. Also changes under the 'Post-revamp Grinding Era', 'Rerelease + Silent Grinding' and 'Explosive Return' description sections, including the addition of 3 images.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #18's user-written description, including the addition of 28 images.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #33's user-written description.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #34 (<code>Friskern</code>).")}
				${updateLogEntry('add', "Menu Miscellaneous: New section: 'Timers'. Appears as the second section in the menu, underneath 'Hall of CCLs'. Added 'last reset' and 'next reset' info for the new challenges table's daily and weekly challenges and a badges table (that includes the badges <a href='https://www.roblox.com/badges/3410723896492162'>Friday Night</a> and any in October (<a href='https://www.roblox.com/badges/2124440620'>Happy Halloween!</a>, <a href='https://www.roblox.com/badges/2124630220'>Trick or Treater</a>, <a href='https://www.roblox.com/badges/2124630221'>Something Good To Eat</a>, <a href='https://www.roblox.com/badges/2124630227'>Treat Yourself</a>, <a href='https://www.roblox.com/badges/2124630228'>Competitive Spirit</a>) and December (<a href='https://www.roblox.com/badges/2124446484'>Merry Christmas!</a>)). Also added a button to refresh the timers and a checkbox to auto-update the timers every 250ms.")}
				${updateLogEntry('add', "Double-clicking an image will now open its source file in a new tab.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Rewording of a part of the second paragraph of the top-of-section notes: <code>Open images in a new tab to view the full image.</code> > <code>Double click an image to open its source file and view the full image.</code>")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Modified CCL #18's and #33's notes.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Overhauled CCL #25's user-written description, including the addition of 1 image.")}
				${updateLogEntry('edit', "Rewording of the first paragraph of the Update Log's top-of-section notes: <code>Major tool versions are <u>underlined</u>. All timestamps in the Update Log are noted in UTC.</code> > <code>Prominent tool versions are <u>underlined</u>. Update Log version timestamps are noted in the local system time in <b>year-month day 24hour:minute</b> format.</code>")}
				${updateLogEntry('edit', "Hovering over an image now displays a 'pointer' icon for the cursor.")}
				${updateLogEntry('edit', "Update Log version release timestamps are now noted in the local system time in <b>year-month-day 24hour:minute</b> format and a UTC offset identifier.")}
				${updateLogEntry('edit', "Updated the scripts-disabled version of the HTML output by changing the sentence stating approximate total size of the tool from 8.2MB to 11.5MB.")}
				${updateLogEntry('edit', "Some source code changes.")}
				${updateLogEntry('fix', "Menu Calculator > Section Money Settings: Fixed a bug where the 'Desired money' input would be visible with 'Computing' toggle setting set to 'EXP, Levels & Infamy'.")}
				${updateLogEntry('fix', "Fixed a bug where the tool's formatted timestamps would not correctly display milliseconds.")}
				${updateLogEntry('other', "Tool versions are now based on: Major.MediumtoLarge.Small(letter representing a quick patch), with larger versions 'resetting' previous versions back to 0 and no letter. Starting in this version (updated from x.2.1 > x.3.0), all Update Log versions are now 1.x.x higher, as the first released version should've been 1.0.0 instead of 0.0.1.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('1.3.0') + '.')}
			</ul></div>
			`
			,'mediumLarge'),
			new UpdateLogVersionEntry('0.2.1',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746837120000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.2.1</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Expanded a sentence in the first paragraph of the top-of-section notes.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #33.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Checked all 33 CCLs for whether or not they obtained the <code><a href='https://www.roblox.com/badges/1249439344'>New Life of Crime</a></code> badge after the game's rerelease, and if so, noted this fact in their entry's notes. (Modified the notes of the following 4 entries: #10, #19, #26, #31.)")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added a missing full stop (<code>.</code>) to CCL #14's notes.")}
				${updateLogEntry('edit', "In Update Log entry Version 0.0.1, renamed the following testers: <code>ashvul</code> > <code>ashlyn</code>, <code>nate247</code> > <code>nate</code>, <code>player6978</code> > <code>player</code>.")}
				${updateLogEntry('add', "Expanded Update Log entry Version 0.2.0, sub-entry 2, by including the following text: <code>(Modified the notes of the following 12 entries: #1, #3, #4, #6, #7, #10, #11, #12, #14, #18, #21, #32.)</code>")}
				${updateLogEntry('remove', "Menu Miscellaneous > Section Hall of CCLs: Removed CCL #17's notes due to being inaccurate.")}
				${updateLogEntry('other', "Spent 20 minutes attempting to fix a non-existent problem with total MXP requirement when 'Remaining MXP' input is defined.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.2.1') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.2.0',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746615180000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 0.2.0 - All about the Hall</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: The list can now be filtered based on classic infamy suit ownership and time (any combination of year, month, day), including or excluding either one, as well as sorting based on badge obtainment timestamp order from either oldest to newest (default), newest to oldest or random.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Checked all 32 CCLs for whether or not they obtained the following notable badges before <a href='https://www.roblox.com/badges/1157147255776915'>Rank 250</a> (these badges have been obtainable since at least as long as Rank 250), and if not, noted so in their entry's notes: <code><a href='https://www.roblox.com/badges/1249442413'>You're a Billionaire</a></code>, <code><a href='https://www.roblox.com/badges/1249451692'>Lucked Out</a></code>, <code><a href='https://www.roblox.com/badges/1873037302'>True Criminal</a></code>, <code><a href='https://www.roblox.com/badges/1212575742147909'>The Pied Piper</a></code>. (Modified the notes of the following 12 entries: #1, #3, #4, #6, #7, #10, #11, #12, #14, #18, #21, #32.)")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Each CCL's badge obtainment number now has the prepended text 'CCL'. For instance, '[CCL #1]'.")}
				${updateLogEntry('add', "Added visual boxes to each Update Log version entry.")}
				${updateLogEntry('add', "Added two easter eggs?")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slightly clarified the top-of-section notes.")}
				${updateLogEntry('edit', "Reordered 1 sub-entry in Update Log entry Version 0.1.1f.")}
				${updateLogEntry('edit', "Changed Update Log entry Version 0.0.1a's estimated active development time from <code>~1.5 hours</code> to <code>~1 hour, 30 minutes</code> for consistency.")}
				${updateLogEntry('edit', "Some source code changes, namely to improve consistent HTML output and slightly improve script performance.")}
				${updateLogEntry('remove', "Menu Miscellaneous > Section Hall of CCLs: Removed CCL #19's notes due to being purely speculation and possibly reputation damaging.")}
				${updateLogEntry('fix', "Menu Calculator > Section Results: Fixed a bug where, with 'Computing' toggle setting set to 'MXP & Mutator Ranks', 'Until MXP usage' input undefined and 'Until this many rotations' input equal to 0, the additive (+) Mutator Ranks difference would always be 0.")}
				${updateLogEntry('fix', "Fixed JS-disabled version of the HTML output with incorrect links to the /Assets and /Fonts subdirectories.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.2.0') + '.')}
			</ul></div>
			`
			,'medium'),
			new UpdateLogVersionEntry('0.1.1h',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746270720000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1h</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Moved a part of CCL #32's user-written description to their notes while also improving the grammar.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1h') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.1.1g',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746270120000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1g</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #11's and #32's user-written descriptions.")}
				${updateLogEntry('edit', "Some source code changes.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1g') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.1f',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746260340000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1f</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added notes to CCL #29's entry.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #32.")}
				${updateLogEntry('edit', "Some source code changes.")}
				${updateLogEntry('fix', "Fixed Update Log entry Version 0.1.1e having the [Testing] tag instead of a release timestamp.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1f') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.1e',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746236400000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1e</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Modified the first paragraph of the top-of-section notes.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1e') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.1.1d',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746095700000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1d</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Prepended an expansion to the top-of-section notes.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1d') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.1.1c',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1746074580000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1c</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #21's and #30's user-written descriptions.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Some formatting adjustments to CCL #1's user-written description.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Corrected CCL #31's display name: <code>Alxzor</code> > <code>Brago</code>.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1c') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.1b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745987160000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Noted CCL #18's ownership of the Blue Navy (100) classic infamy suit.")}
				${updateLogEntry('add', "Noted that all Update Log entries' timestamps are noted in UTC.")}
				${updateLogEntry('edit', "Slightly reordered the sub-entries in Update Log entry Version 0.1.1.")}
				${updateLogEntry('fix', "Menu Miscellaneous > Section Results: Fixed a bug where current mutator rank is always 0 regardless of the input.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1b') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.1a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745969400000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #31.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1a') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.1',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745889900000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.1.1</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Calculator > Section Progression Settings: With 'Computing' toggle setting set to 'Money', the text " + '"' + "Overrides" + " 'Desired money' input" + '"' + " now appears in the 'Until this many rotations' input's input explanation.")}
				${updateLogEntry('add', "Menu Calculator > Section Results: With 'Computing' toggle setting set to 'Money', the required runs/rotations and playtime requirement are now listed.")}
				${updateLogEntry('edit', "Infamy and Level texts now default to the non-infamy chat colour, if roman numerals are disabled or if the value is not greater than 0.")}
				${updateLogEntry('fix', "Menu Calculator > Section Results: With Section Progression Settings input 'Until this many rotations' value greater than 0, the listed playtime per run is no longer the total time in the rotation, but rather the average.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.1') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.1.0',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745842080000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 0.1.0 - Numbers and Computations</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Calculator: Added a third option to the 'Computing' toggle setting: 'Money'. This appears as option 2, while 'MXP & Mutator Ranks' has been moved to option 3.")}
				${updateLogEntry('add', "Menu Calculator: Added section 'Money Settings' and one input in this section: 'Desired money'. Moved 'Current money' input from 'Infamy Settings' section to this section.")}
				${updateLogEntry('add', "Menu Calculator > Section Progression Settings: Added the 'Until this many rotations' input. This overrides the 'Desired level' and 'Desired infamy level' (Computing: 'EXP, Levels & Infamy') and 'Desired rank' and 'Until MXP usage' (Computing: 'MXP & Mutator Ranks') inputs. Limit is <code>1,000</code> with 'Input method' toggle setting set to 'Sliders' or <code>1,000,000,000,000</code> with the toggle setting set to 'Manual'.")}
				${updateLogEntry('add', "Menu Calculator > Section Results: Levels, Infamies and Mutator Ranks now display the additive, multiplicative and exponential differences (assuming the current value is less than or equal to the new value.)")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Some expansions to CCL #1's notes and user-written description.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Noted CCL #26's ownership of the Blue Navy (100) classic infamy suit.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: Added CCL #30.")}
				${updateLogEntry('add', "Within the update log's section, noted that users should report issues or suggestions about this tool to the tool creator, and that they can also open an issue.")}
				${updateLogEntry('edit', "Menu Calculator: Moved section 'Progression Settings' to right above the 'Results' section.")}
				${updateLogEntry('edit', "Menu Calculator: The toggle settings now only underline the caption, rather than the entire toggle. The functionality remains unchanged.")}
				${updateLogEntry('edit', "Menu Calculator: Changed 'Input method' toggle setting's option 2 caption from 'Manual inputs' to 'Manual'.")}
				${updateLogEntry('edit', "Menu Calculator: Made the toggle settings unselectable and undraggable.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight design changes to CCL #25's user-written description.")}
				${updateLogEntry('edit', "Clarified update log entry Version 0.0.1 as having added the listed people as testers, rather than them having tested the update. This is to avoid confusion of them having possibly not tested future updates. Also removed tester ashvul's note of 'may have not tested'.")}
				${updateLogEntry('fix', "Fixed the update log's estimated total active development time not accounting for Version 0.0.2c.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.1.0') + '.')}
				</ul></div>
			`
			,'large'),
			new UpdateLogVersionEntry('0.0.2c',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745618880000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.2c</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Fixed improper date format in the update log's Version 0.0.2b entry.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.2c') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.0.2b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745618580000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.2b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Calculator > Section Results: With 'Computing' toggle setting set to 'MXP & Mutator Ranks', 'Until MXP usage' input undefined and included runs greater than 0, added leftover MXP to the outputted results. With/without any included runs, added Mutator Ranks difference.")}
				${updateLogEntry('edit', "Changed the tool's Notoriety version from 3.9.6f to 3.10.0.")}
				${updateLogEntry('edit', "Menu Calculator > Section Mutator Rank Settings: 'Current rank' and 'Desired rank' inputs' values are now floored, and must be a minimum of 0. Also properly added a limit of <code>1,000,000,000,000</code>.")}
				${updateLogEntry('edit', "Menu Calculator > Section Results: Added missing comma and whitespace characters.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight changes to CCL #1's user-written description.")}
				${updateLogEntry('fix', "Menu Calculator > Section Infamy Settings: Fixed a bug where hiding the Infamy Settings inputs would not work on first click after tool load.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.2b') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.0.2a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1745199540000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.2a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Menu Calculator > Section Infamy Settings: Added input explanations to the 'Current infamy level' and 'Desired infamy level' inputs: for each, explaining that a whole number must be inputted.")}
				${updateLogEntry('add', "Menu Miscellaneous > Section Hall of CCLs: At the top-of-section notes, noted that the 'Time elapsed since badge obtainment' value refers to actual elapsed time and that it is updated on tool load or changing the 'Time output format' toggle setting. Also noted that timestamps in user-written descriptions are usually plaintext and therefore won't update to the system time.")}
				${updateLogEntry('edit', "Menu Calculator > Section Infamy Settings: Rewording of the 'Current money' input's input explanation.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight changes to CCL #1's user-written description.")}
				${updateLogEntry('edit', "Menu Miscellaneous > Section Hall of CCLs: Slight changes to CCL #4's notes.")}
				${updateLogEntry('edit', "Made update log entry Version 0.0.2 underlined. Adjusted the underline format of Version 0.0.1.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.2a') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.0.2',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744982220000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 0.0.2 - Historical Additions</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Added input toggle for EXP formula. Currently two options: pre-shutdown (<code>1025 * x + x ^ 1.3</code>), current (<code>x * 1018.93 + x ^ 2.976664)</code>).")}
				${updateLogEntry('add', "Section Hall of CCLs: Added 'Time elapsed since badge obtainment' to each CCL's entry.")}
				${updateLogEntry('add', "Section Hall of CCLs: Added to the top-of-section notes that Roblox avatars must be updated manually.")}
				${updateLogEntry('add', "Section Hall of CCLs: Added CCL #26's user-written description.")}
				${updateLogEntry('add', "Section Hall of CCLs: Post-suits revamp header now displays the milliseconds of the update time.")}
				${updateLogEntry('edit', "Section Hall of CCLs: Renamed 'Time since previous' to 'Time difference since previous'. Also changed 'Average time apart' to 'Average time difference apart'.")}
				${updateLogEntry('edit', "Fixed some things in the update log.")}
				${updateLogEntry('edit', "Section Hall of CCLs: Slight changes to CCL #27's notes.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.2') + '.')}
			</ul></div>
			`
			,'medium'),
			new UpdateLogVersionEntry('0.0.1e',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744762320000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.1e</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Section Hall of CCLs: Added CCL #29.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1e') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.0.1d',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744652820000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.1d</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Fixed some things in the update log.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1d') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.0.1c',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744643100000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.1c</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('edit', "Section Hall of CCLs: Changed " + '"' + "Times are noted" + '"' + " to " + '"' + "Badge obtainment times are noted" + '"' + ".")}
				${updateLogEntry('edit', "Section Hall of CCLs: CCL #2's user-written description now begins with a h1 tag.")}
				${updateLogEntry('edit', "Fixed update log entry Version 0.0.1b, sub-entry #2: CCLs #25 and #26 > CCLs #20 and #25")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1c') + '.')}
			</ul></div>
			`
			,'patch'),
			new UpdateLogVersionEntry('0.0.1b',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744625700000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.1b</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Section Hall of CCLs: Added " + '"' + "Open images in a new tab to view the full image." + '"' + "to the top-of-section primary info.")}
				${updateLogEntry('add', "Section Hall of CCLs: Added CCLs #20 and #25 user-written descriptions.")}
				${updateLogEntry('add', "Added ':millisecond' to the note of how times are noted in the Hall of CCLs section.")}
				${updateLogEntry('edit', "Section Hall of CCLs: Modified CCL #25's notes.")}
				${updateLogEntry('edit', "In the Hall of CCLs section, the 'User-written description' toggle button now displays a mouse pointer icon on hover.")}
				${updateLogEntry('edit', "Renamed section " + '"' + "Update Logs" + '"' + " to " + '"' + "Update Log" + '"' + ". Update Log entry " + '"' + "Version Indev" + '"' + " no longer displays the [Testing] tag.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1b') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.0.1a',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744556520000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] Version 0.0.1a</b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Significantly expanded CCL #2's entry in the Hall of CCLs, and modified existing parts. Also noted that CCL #28 owns the classic Blue Navy (100) suit.")}
				${updateLogEntry('edit', "Removed 'v' from the top header text of the tool's version.")}
				${updateLogEntry('fix', "In the Hall of CCLs, corrected all CCL players' Rank 250 badge obtainment timestamps to exact timestamps right down to the milliseconds using the Roblox badges API, simultaneously correcting the 'time since previous' and 'average time apart' values as well.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1a') + '.')}
			</ul></div>
			`
			,'small'),
			new UpdateLogVersionEntry('0.0.1',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'>[${formatDate(new Date(1744532400000), data.MainSetting_Global_DateFormat, false)} ${getTZString(localTZ)}] <u>Version 0.0.1 - The Beginning</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('other', "Initial public release.")}
				${updateLogEntry('other', "Added the following testers: ashlyn, nate, player.")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('0.0.1') + '.')}
			</ul></div>
			`
			,'major'),
			new UpdateLogVersionEntry('Indev',
			`
			<div class='NotorietyEXPCalculator_UpdateLogVersionEntry'>
			<b class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay'><u>Version Indev</u></b>
			<ul class='NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry'>
				${updateLogEntry('add', "Added everything else. (A lot!)")}
				${updateLogEntry('other', "<span style='font-style:italic;color:rgba(255,255,var(--bg-alpha))'>This version's name is definitely not a Minecraft reference!</span>")}
				${updateLogEntry('other', "Estimated active development time: approx. " + formatMinutesDev('Indev') + ' over about 10 weeks.')}
			</ul></div>
			`
			,'major')
		];
		var theLogs = '';
		if (firstCreation == true) {
			elem.SectionContainer_UpdateLog.innerHTML = `<b>Legend:</b><p>
			<ul>
				${updateLogEntry('add', 'Addition of something')}
				${updateLogEntry('edit', 'Edit of a feature')}
				${updateLogEntry('remove', 'Removal of something')}
				${updateLogEntry('fix', 'Patch of a problem')}
				${updateLogEntry('other', 'Other')}
			</ul>
			Prominent tool versions are <u>underlined</u>. Update Log version timestamps are noted in the browser's detected local time zone in <b>year-month day 24hour:minute</b> format.
			<p></p>
			Estimated total active development time across all versions: approx. <span id='NotorietyEXPCalculator_SectionContiner_UpdateLog_TotalTime'>${formatMinutesDev(minutesDevelopment_Total, true)}</span>.
			<p></p>
			Report any issues or suggestions about this tool to the tool creator, or <a href='https://github.com/ACodingSeal/acodingseal.github.io/issues'>open an issue</a>.
			<p></p>
			Some features of this tool are copied from my other tools, including an extremely developed, unreleased tool that has seen hundreds of hours of active development time.
			</p>
			<hr/>
			<div style='text-align:center'>
			<p></p>Sort: Version release order<br/>
			<select id='NotorietyEXPCalculator_UpdateLog_Sort_VersionReleaseOrder'><option value='newestOldest'>Newest to oldest</option><option value='oldestNewest'>Oldest to newest</option><option value='random'>Random</option></select>
			<p></p><div style='width:10em;height:4em;margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPCalculator_UpdateLog_SortSubmit' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Sort</button></div>
			</div>
			<div id='NotorietyEXPCalculator_SectionContainer_UpdateLog_TheList'></div>
			`
			elem.SectionContainer_UpdateLog_TheList = document.getElementById('NotorietyEXPCalculator_SectionContainer_UpdateLog_TheList');
			elem.SectionContainer_UpdateLog_TotalTime = document.getElementById('NotorietyEXPCalculator_SectionContiner_UpdateLog_TotalTime');
			var loopLength = Object.keys(minutesDevelopment).length;
			for (var x = 0; x < loopLength; x++) {
				theLogs += versionsData[x].info;
			}
			elem.SectionContainer_UpdateLog_TheList.innerHTML = theLogs;
			elem.Section_UpdateLog_Sort_VersionReleaseOrder = document.getElementById('NotorietyEXPCalculator_UpdateLog_Sort_VersionReleaseOrder');
			elem.updateLogSortButton = document.getElementById('NotorietyEXPCalculator_UpdateLog_SortSubmit');
		} else {
			elem.SectionContainer_UpdateLog_TheList.innerHTML = '';
			elem.SectionContainer_UpdateLog_TotalTime.innerHTML = formatMinutesDev(minutesDevelopment_Total, true);
			const allEntries = [];
			var loopLength = Object.keys(minutesDevelopment).length;
			for (var x = 0; x < loopLength; x++) {
				allEntries.push(versionsData[x].info);
			}
			switch (elem.Section_UpdateLog_Sort_VersionReleaseOrder.value) {
				case 'oldestNewest':
					allEntries.reverse();
					break;
				case 'random':
					allEntries.sort(function() { return randomBetween(0, 2) - randomBetween(1.2, 2.5) });
			}
			elem.SectionContainer_UpdateLog_TheList.innerHTML = allEntries.join('');
		}
		const entryToggleDisplayElems = document.getElementsByClassName('NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay');
		function entryToggleDisplay(input) {
			const entry = input.parentElement.getElementsByClassName('NotorietyEXPCalculator_UpdateLogVersionEntry_ToggleDisplay_Entry')[0];
			entry.style.display = entry.style.display == 'none' ? 'block' : 'none';
		}
		var loopLength = entryToggleDisplayElems.length;
		for (var x = 0; x < loopLength; x++) {
			entryToggleDisplayElems[x].addEventListener('click', function() {
				entryToggleDisplay(this);
			});
			entryToggleDisplay(entryToggleDisplayElems[x]);
		}
		if (firstCreation == true) {
			entryToggleDisplay(entryToggleDisplayElems[0]);
		}
	}
	
	function addTimersSection() {
		const extraDays = 1000 * 3600 * 24 * 0;
		const extraHours = 1000 * 3600 * 0 + extraDays;
		const timeOutput = new Timer();
		const currentDateObj = new Date(new Date().getTime() + extraHours);
		// console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
		var localTZ = currentDateObj.getTimezoneOffset();
		var string = '';
		var tzString = '';
		// console.log(localTZ);
		// console.log("Detected time zone:", getTZString(localTZ));
		
		const utcDateObj = new Date(currentDateObj.getTime());
		utcDateObj.setTime(currentDateObj.getTime() - (localTZ * -1 * 60 * 1e3));
		
		elem.Section_Timers_DetectedUTCOffset = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_DetectedUTCOffset');
		elem.Section_Timers_DetectedUTCOffset.innerHTML = getTZString(localTZ);
		
		const utcOffsets = ['720', '660', '600', '570', '540', '480', '420', '360', '300', '240', '210', '180', '120', '60', '0', '-60', '-120', '-180', '-210', '-240', '-270', '-300', '-330', '-345', '-360', '-390', '-420', '-480', '-525', '-540', '-570', '-600', '-630', '-660', '-720', '-765', '-780', '-840'];
		// tba
		// console.log(utcOffsets.length);
		const time_FridayNight = [];
		const time_MonthOctober = [];
		const time_MonthDecember = [];
		// UTC: 00:00 & 12:00
		const timeFixed_Daily = 43200000;
		const timeFixed_Weekly = 604800000;
		const time_DailyChallenges = {
			next:new Date(timeFixed_Daily * 2),
			previous:new Date(timeFixed_Daily)
		};
		const time_WeeklyChallenges = {
			next:new Date(timeFixed_Weekly * 2),
			previous:new Date(timeFixed_Weekly),
		};
		
		time_DailyChallenges.previous.setTime(time_DailyChallenges.previous.getTime() + Math.floor(currentDateObj.getTime() / timeFixed_Daily) * timeFixed_Daily - timeFixed_Daily);
		time_DailyChallenges.next.setTime(time_DailyChallenges.next.getTime() + Math.floor(currentDateObj.getTime() / timeFixed_Daily) * timeFixed_Daily - timeFixed_Daily);
		
		time_WeeklyChallenges.previous.setTime(time_WeeklyChallenges.previous.getTime() + Math.floor(currentDateObj.getTime() / timeFixed_Weekly) * timeFixed_Weekly - timeFixed_Weekly);
		time_WeeklyChallenges.next.setTime(time_WeeklyChallenges.next.getTime() + Math.floor(currentDateObj.getTime() / timeFixed_Weekly) * timeFixed_Weekly - timeFixed_Weekly);
		const timeReset_DailyChallenges = {since:currentDateObj.getTime() - time_DailyChallenges.previous.getTime(), until:time_DailyChallenges.next.getTime() - currentDateObj.getTime()};
		const timeReset_WeeklyChallenges = {since:currentDateObj.getTime() - time_WeeklyChallenges.previous.getTime(), until:time_WeeklyChallenges.next.getTime() - currentDateObj.getTime()};
		
		// Friday Night
		var loopLength = utcOffsets.length;
		for (var x = 0; x < loopLength; x++) {
			const offsetMilliseconds = Number(utcOffsets[x]) * -1 * 60 * 1000;
			var obj = new Date(new Date().getTime() + extraHours);
			obj.setTime(obj.getTime() + (localTZ * 60 * 1e3));
			obj.setTime(obj.getTime() + (Number(utcOffsets[x]) * -1 * 60 * 1e3));
			obj = new Date(obj.getTime());
			const output = {currentlyFri:false, remainingTime: null};
			const whenFriday = {next:new Date(86400000 * 7), previous:new Date(86400000 * 1)};
			whenFriday.previous.setTime(whenFriday.previous.getTime() + Math.floor(obj.getTime() / 604800000) * 604800000 - (localTZ * -1 * 60 * 1e3));
			whenFriday.next.setTime(whenFriday.next.getTime() + Math.floor(obj.getTime() / 604800000) * 604800000 - (localTZ * -1 * 60 * 1e3));
			if (obj.getDay() == 5) {
				output.currentlyFri = true;
				output.remainingTime = (whenFriday.previous.getTime() + 86400000 - 1) - obj.getTime();
			} else {
				output.remainingTime = (whenFriday.next.getTime() + 86400000 - 1) - obj.getTime();
				// if statement here is a quickfix solution for negative UTC timezones not being calculated properly
				if (obj.getTime() >= whenFriday.previous.getTime()) {
					output.remainingTime = (whenFriday.next.getTime() + 86400000 - 1) - obj.getTime();
				} else {
					output.remainingTime = (whenFriday.previous.getTime() - 1) - obj.getTime();
				}
				// console.log(output.remainingTime);
			}
			time_FridayNight.push(output);
		}
		
		// Months: October, December
		for (var x = 0; x < loopLength; x++) {
			function addMonthTimes(which) {
				var whichMonthNum = null;
				if (which == 'oct') {
					whichMonthNum = 10;
				} else if (which == 'dec') {
					whichMonthNum = 12;
				}
				const offsetMilliseconds = Number(utcOffsets[x]) * -1 * 60 * 1000;
				var obj = new Date(new Date().getTime() + extraHours);
				obj.setTime(obj.getTime() + (localTZ * 60 * 1e3));
				obj.setTime(obj.getTime() + (Number(utcOffsets[x]) * -1 * 60 * 1e3));
				obj = new Date(obj.getTime());
				var monthCurrent = new Date((obj.getFullYear()) + "-" + whichMonthNum + "-01");
				var monthCurrentEnd = new Date((obj.getFullYear()) + "-" + whichMonthNum + "-31T23:59:59");
				var extraYear = 0;
				if (obj.getTime() > monthCurrentEnd.getTime()) {
					extraYear = 1;
				}
				const output = {currentlyMonth:false, remainingTime: null};
				const whenMonth = {next:new Date(new Date((obj.getFullYear() + extraYear) + '-' + whichMonthNum + '-01').getTime()), previous:new Date(new Date((obj.getFullYear() - 1) + '-' + whichMonthNum + '-01').getTime())};
				whenMonth.previous.setTime(whenMonth.previous.getTime() + (localTZ * -1 * 60 * 1e3));
				whenMonth.next.setTime(whenMonth.next.getTime() + (localTZ * -1 * 60 * 1e3));
				whenMonth.previous = new Date(whenMonth.previous.getTime());
				whenMonth.next = new Date(whenMonth.next.getTime());
				if (obj.getMonth() == whichMonthNum - 1) {
					output.currentlyMonth = true;
					// monthCurrent = new Date(monthCurrent.getTime() - (localTZ * -1 * 60 * 1e3));
					// monthCurrentEnd = new Date(monthCurrentEnd.getTime() - (localTZ * -1 * 60 * 1e3) + 999);
					// console.log(monthCurrent);
					output.remainingTime = monthCurrentEnd.getTime() - obj.getTime();
					// console.log(monthCurrentEnd.getTime());
				} else {
					output.remainingTime = (whenMonth.next.getTime() - 1) - obj.getTime();
					// if statement here is a quickfix solution for negative UTC timezones not being calculated properly
					if (obj.getTime() >= whenMonth.previous.getTime()) {
						output.remainingTime = (whenMonth.next.getTime() - 1) - obj.getTime();
					} else {
						output.remainingTime = (whenMonth.previous.getTime() - 1) - obj.getTime();
					}
					// console.log(output.remainingTime);
				}
				if (which == 'oct') {
					time_MonthOctober.push(output);
				} else if (which == 'dec') {
					time_MonthDecember.push(output);
				}
			}
			addMonthTimes('oct');
			addMonthTimes('dec');
		}
		// console.log(currentDateObj.getTime());
		string = "<p></p>Challenges last updated: " + formatDate(currentDateObj, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ);
		string += "<table id='NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable' style='margin:auto;width:100%'>"
		string += "<tr/><td id='NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable_Daily' class='NotorietyEXPCalculator_TableStyling'>";
		timeOutput.amount = timeReset_DailyChallenges.since;
		string += "<b>Daily Challenges</b><p>Last reset: " + formatDate(time_DailyChallenges.previous, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ) + "<br><small>(" + timeOutput.formatAmount(getTimerConfig()) + " ago)</small></p>";
		timeOutput.amount = timeReset_DailyChallenges.until;
		string += "<p>Next reset: " + formatDate(time_DailyChallenges.next, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ) + "<br><small>(in " + timeOutput.formatAmount(getTimerConfig()) + ")</small></p></td>";
		
		
		string += "<td id='NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable_Weekly' class='NotorietyEXPCalculator_TableStyling'>";
		timeOutput.amount = timeReset_WeeklyChallenges.since;
		string += "<b>Weekly Challenges</b><p>Last reset: " + formatDate(time_WeeklyChallenges.previous, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ) + "<br><small>(" + timeOutput.formatAmount(getTimerConfig()) + " ago)</small></p>";
		timeOutput.amount = timeReset_WeeklyChallenges.until;
		string += "<p>Next reset: " + formatDate(time_WeeklyChallenges.next, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ) + "<br><small>(in " + timeOutput.formatAmount(getTimerConfig()) + ")</small></p></td>";
		string += "</table>";
		
		string += "<p></p>Badges last updated: " + formatDate(currentDateObj, data.MainSetting_Global_DateFormat, false) + ' ' + getTZString(localTZ)
		+ "<table id='NotorietyEXPCalculator_SectionContainer_Timers_BadgesTable'>"
		+ "<tr/><td id='NotorietyEXPCalculator_SectionContainer_Timers_BadgesTable_FridayNight' class='NotorietyEXPCalculator_TableStyling'>";
		string += "<b><a href='https://www.roblox.com/badges/3410723896492162'>Friday Night</a></b><p><ul>";
		for (var x = 0; x < loopLength; x++) {
			var string_a = '';
			if (utcOffsets[x] == localTZ) {
				// console.log(getTZString(utcOffsets[x]));
				// console.log(getTZString(localTZ));
				string_a = "<li style='font-weight:bold;text-decoration:underline'>";
			} else {
				string_a = "<li style='font-weight:bold'>";
			}
			timeOutput.amount = time_FridayNight[x].remainingTime;
			if (time_FridayNight[x].currentlyFri == true) {
				string_a += "<span style='color:rgba(0,128,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available for " + timeOutput.formatAmount(getTimerConfig()) + "</span>"
			} else {
				string_a += "<span style='color:rgba(128,0,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available in " + timeOutput.formatAmount(getTimerConfig()) + "</span>";
			}
			string_a += "</li>";
			string += string_a;
		}
		string += "</ul></td>";
		
		string += "<tr/><td id='NotorietyEXPCalculator_SectionContainer_Timers_BadgesTable_MonthRange_October' class='NotorietyEXPCalculator_TableStyling'>";
		string += "<b>October badges: <a href='https://www.roblox.com/badges/2124440620'>Happy Halloween!</a>, <a href='https://www.roblox.com/badges/2124630220'>Trick or Treater</a>, <a href='https://www.roblox.com/badges/2124630221'>Something Good To Eat</a>, <a href='https://www.roblox.com/badges/2124630227'>Treat Yourself</a>, <a href='https://www.roblox.com/badges/2124630228'>Competitive Spirit</a></b><p><ul>";
		for (var x = 0; x < loopLength; x++) {
			var string_a = '';
			if (utcOffsets[x] == localTZ) {
				// console.log(getTZString(utcOffsets[x]));
				// console.log(getTZString(localTZ));
				string_a = "<li style='font-weight:bold;text-decoration:underline'>";
			} else {
				string_a = "<li style='font-weight:bold'>";
			}
			timeOutput.amount = time_MonthOctober[x].remainingTime;
			if (time_MonthOctober[x].currentlyMonth == true) {
				string_a += "<span style='color:rgba(0,128,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available for " + timeOutput.formatAmount(getTimerConfig()) + "</span>"
			} else {
				string_a += "<span style='color:rgba(128,0,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available in " + timeOutput.formatAmount(getTimerConfig()) + "</span>";
			}
			string_a += "</li>";
			string += string_a;
		}
		string += "</ul></td>";
		
		string += "<tr/><td id='NotorietyEXPCalculator_SectionContainer_Timers_BadgesTable_MonthRange_December' class='NotorietyEXPCalculator_TableStyling'>";
		string += "<b>December badges: <a href='https://www.roblox.com/badges/2124446484'>Merry Christmas!</a></b><p><ul>";
		for (var x = 0; x < loopLength; x++) {
			var string_a = '';
			if (utcOffsets[x] == localTZ) {
				// console.log(getTZString(utcOffsets[x]));
				// console.log(getTZString(localTZ));
				string_a = "<li style='font-weight:bold;text-decoration:underline'>";
			} else {
				string_a = "<li style='font-weight:bold'>";
			}
			timeOutput.amount = time_MonthDecember[x].remainingTime;
			if (time_MonthDecember[x].currentlyMonth == true) {
				string_a += "<span style='color:rgba(0,128,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available for " + timeOutput.formatAmount(getTimerConfig()) + "</span>"
			} else {
				string_a += "<span style='color:rgba(128,0,0,var(--bg-alpha))'>" + getTZString(utcOffsets[x], true) + ": Available in " + timeOutput.formatAmount(getTimerConfig()) + "</span>";
			}
			string_a += "</li>";
			string += string_a;
		}
		string += "</ul></td>";
		string += "</p></table>";
		
		elem.SectionContainer_Timers_TheList.innerHTML = string;
		
		elem.Section_Timers_ChallengesTable = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable');
		elem.Section_Timers_ChallengesTable_Daily = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable_Daily');
		elem.Section_Timers_ChallengesTable_Weekly = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_ChallengesTable_Weekly');
		
		
		// elem.Section_Timers_ChallengesTable_Daily.innerHTML = "Daily:<br><ul><li>Last reset: " + timeOutput.formatAmount() + "</li><li>Next reset: ?</li></ul>";
		// elem.
	}
	// setTimeout(addTimersSection, 1);
	
	elem.SectionContainer_Timers_UpdateTimers = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_UpdateTimers');
	elem.SectionContainer_Timers_AutoUpdate = document.getElementById('NotorietyEXPCalculator_SectionContainer_Timers_AutoUpdate');
	
	elem.SectionContainer_Timers_UpdateTimers.addEventListener('click', addTimersSection);
	elem.SectionContainer_Timers_AutoUpdate.addEventListener('input', function() {
		addTimersSection();
		if (this.checked == true) {
			timersAutoUpdateInterval = setInterval(addTimersSection, 250);
		} else {
			clearInterval(timersAutoUpdateInterval);
		}
	});

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
				switch (data.MainSetting_Calculator_ToggleComputationType) {
					case 0:
						x.money = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.exp = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
						break;
					case 1:
						x.money = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
						break;
					case 2:
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
		var loopLength = input.runLog.length;
		for (var x = 0; x < loopLength; x++) {
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
	
	data.rotationInputTotals = function(a) {return interpretRotationInput(getRotationInput(a))};

	const styleSheet_Global = document.createElement('style');
	document.head.appendChild(styleSheet_Global);

	function addGlobalStyling(input, deleteExisting) {
		if (deleteExisting == true) {
			while (styleSheet_Global.sheet.rules.length > 0) {
				styleSheet_Global.sheet.deleteRule(0);
			}
		}
		styleSheet_Global.sheet.insertRule(input)
	}
	
	const menuContainerIDs = ['NotorietyEXPCalculator_MenuContainer_Calculator', 'NotorietyEXPCalculator_MenuContainer_Miscellaneous', 'NotorietyEXPCalculator_MenuContainer_Settings'];
	const menuButtonIDs = ['NotorietyEXPCalculatorMenuButton_Calculator', 'NotorietyEXPCalculatorMenuButton_Miscellaneous', 'NotorietyEXPCalculatorMenuButton_Settings'];
	
	// make menu buttons work
	function hideAllMenus() {
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Calculator').style.display = 'none';
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Miscellaneous').style.display = 'none';
		document.getElementById('NotorietyEXPCalculator_MenuContainer_Settings').style.display = 'none';
	}
	
	(function() {
		const orig = document.getElementById('NotorietyEXPCalculator_MenuButtons');		
		const menuButtonContainers = {calculator:document.createElement('div'), miscellaneous:document.createElement('div'), settings:document.createElement('div')};
		const menuButtons = {calculator:document.createElement('button'), miscellaneous:document.createElement('button'), settings:document.createElement('button')};
		const attribs = {calculator:{displayName:"Calculator"},miscellaneous:{displayName:"Miscellaneous"},settings:{displayName:"Settings"}};
		
		var loopLength = Object.keys(menuButtons).length;
		for (var x = 0; x < loopLength; x++) {
			var currentButtonContainer = menuButtonContainers[Object.keys(menuButtonContainers)[x]];
			var currentButton = menuButtons[Object.keys(menuButtons)[x]];
			currentButtonContainer.setAttribute('style', "height:4em;display:inline-block");
			currentButton.innerHTML = "<span style='color:rgba(255,255,255,var(--bg-alpha));font-weight:bold'>" + attribs[Object.keys(attribs)[x]].displayName + "</span>";
			currentButton.setAttribute('class', 'NotorietyEXPCalculatorButton NotorietyEXPCalculatorMenuButton');
			currentButton.setAttribute('id', menuButtonIDs[x]);
			orig.appendChild(currentButtonContainer);
			currentButtonContainer.appendChild(currentButton);
			currentButton.addEventListener('click', function() {
				switchMenuToThis(this.id);
			});
		}
	}());
	
	function switchMenuToThis(input) {
		hideAllMenus();
		document.getElementById(menuContainerIDs[menuButtonIDs.indexOf(input)]).style.display = '';
		if (document.getElementById('NotorietyEXPCalculator_MenuButtons').getElementsByClassName('NotorietyEXPCalculatorMenuButtonActive').length > 0) {
			// loop in case user modifies the HTML to add this class to multiple buttons
			var loopLength = document.getElementById('NotorietyEXPCalculator_MenuButtons').getElementsByClassName('NotorietyEXPCalculatorMenuButtonActive').length;
			for (var i = 0; i < loopLength; i++) {
				document.getElementById('NotorietyEXPCalculator_MenuButtons').getElementsByClassName('NotorietyEXPCalculatorMenuButtonActive')[i].classList.remove('NotorietyEXPCalculatorMenuButtonActive');
			}
		}
		document.getElementById(input).classList.add('NotorietyEXPCalculatorMenuButtonActive');
	}
	// Default visible menu. 0: Calculator, 1: Miscellaneous, 2: Settings
	switchMenuToThis(menuButtonIDs[2]);
	
	function updateSwitchButtons() {
		(function() {
			const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck, elem.toggleEntryDescriptions];
			const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck', 'toggleEntryDescriptions'];
			var loopLength = elems.length;
			for (var x = 0; x < loopLength; x++) {
				if (data[elems_DataRefs[x]] == 1) {
					elems[x].classList.remove('SwitchButtonDisabled');
					elems[x].classList.add('SwitchButtonEnabled');
				} else {
					elems[x].classList.remove('SwitchButtonEnabled');
					elems[x].classList.add('SwitchButtonDisabled');
				}
				elems[x].innerHTML = ['[N]', '[Y]'][Number(data[elems_DataRefs[x]])];
			}
		}());
	}
	
	function updateHallDescVis() {
		var loopLength_a = document.getElementsByClassName('HallofCCLsDescriptionButton').length;
		for (var i = 0; i < loopLength_a; i++) {
			const descButton = document.getElementsByClassName('HallofCCLsDescriptionButton')[i];
			const descContainer = descButton.parentElement.getElementsByClassName('HallofCCLsDescriptionContainer')[0];
			if (data.toggleEntryDescriptions == 0) {
				if (descContainer.style.display == 'block') {
					descButton.click();
				}
			} else if (data.toggleEntryDescriptions == 1) {
				if (descContainer.style.display == 'none') {
					descButton.click();
				}
			}
		}
		
		// disabled to avoid confusion
		/*
		if (inputSettings.miscellaneousSettings.HallofCCLs == undefined) {
			inputSettings.miscellaneousSettings.HallofCCLs = {}; // cheap if statement solution to avoid figuring out why this undefined error occurs on tool load.
		}
		inputSettings.miscellaneousSettings.HallofCCLs.toggleEntryDescriptions = data.toggleEntryDescriptions;
		*/
	}

	function updateSettingsDisplayedValues() {
		/*
		inputSettings.calculatorSettings = {};
		inputSettings.miscellaneousSettings.HallofCCLs = {};
		inputSettings.globalSettings = {};
		*/
		
		data.currentLevel = new Decimal(elem.currentLevelInput.value).floor().max(new Decimal(1)).min(100);
		data.remainingEXP = new Decimal(elem.remainingEXPInput.value).floor().max(new Decimal(0)).min(999999);
		data.goalLevel = new Decimal(elem.goalLevelInput.value).floor().max(new Decimal(0)).min(100);
		data.expFormula = new Decimal(elem.expFormulaInput.value).floor().max(new Decimal(0)).min(1);
		data.currentMoney = new Decimal(elem.currentMoneyInput.value).floor().max(0);
		data.goalMoney = new Decimal(elem.goalMoneyInput.value).floor().max(0);
		data.currentInfamyLevel = new Decimal(elem.currentInfamyLevelInput.value).floor().max(new Decimal(0)).min(elem.currentInfamyLevelInput.value);
		data.goalInfamyLevel = new Decimal(elem.goalInfamyLevelInput.value).floor().max(new Decimal(0)).min(elem.goalInfamyLevelInput.value);
		
		data.currentMutatorRank = new Decimal(elem.currentMutatorRankInput.value).floor().max(0).min(1e12);
		data.goalMutatorRank = new Decimal(elem.goalMutatorRankInput.value).floor().max(0).min(1e12);
		data.remainingMXP = new Decimal(elem.remainingMXPInput.value);
		data.untilMXPUsage = new Decimal(elem.untilMXPUsageInput.value);
		
		data.untilRotations = new Decimal(elem.untilRotationsInput.value).floor().max(0).min(elem.untilRotationsInput.max);
		
		data.MainSetting_Global_DateFormat = elem.MainSetting_Global_DateFormat.value;
		data.MainSetting_Global_KeepSettingsOnReload = elem.MainSetting_Global_KeepSettingsOnReload.checked;
		
		// disabled to prevent confusion
		/*
		inputSettings.calculatorSettings.currentLevel = data.currentLevel;
		inputSettings.calculatorSettings.remainingEXP = data.remainingEXP;
		inputSettings.calculatorSettings.goalLevel = data.goalLevel;
		inputSettings.calculatorSettings.expFormula = data.expFormula;
		inputSettings.calculatorSettings.currentMoney = data.currentMoney;
		inputSettings.calculatorSettings.goalMoney = data.goalMoney;
		inputSettings.calculatorSettings.currentInfamyLevel = data.currentInfamyLevel;
		inputSettings.calculatorSettings.goalInfamyLevel = data.goalInfamyLevel;
		inputSettings.calculatorSettings.currentMutatorRank = data.currentMutatorRank;
		inputSettings.calculatorSettings.goalMutatorRank = data.goalMutatorRank;
		inputSettings.calculatorSettings.remainingMXP = data.remainingMXP;
		inputSettings.calculatorSettings.untilMXPUsage = data.untilMXPUsage;
		inputSettings.calculatorSettings.untilRotations = data.untilRotations;
		inputSettings.calculatorSettings.untilOutOfMoneyCheck = data.untilOutOfMoneyCheck;
		inputSettings.calculatorSettings.cheaperPassCheck = data.cheaperPassCheck;
		inputSettings.calculatorSettings.preMoneyCapCheck = data.preMoneyCapCheck;
		
		inputSettings.miscellaneousSettings.toggleEntryDescriptions = data.toggleEntryDescriptions;
		*/
		
		const timeOutputNames_AllOptionIDs = ['NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millisecond', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Second', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Minute', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Hour', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Day', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Week', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Month', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Year', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Decade', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Century', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millennium', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_NotorietyUpdateInterval'];
		const timeOutputNames_AllOptionValues = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'de', 'c', 'mi', 'noup'];
		const timeOutputNames_CheckedOptions = [];
		var timeOutputNames_ExcludedOptions = [];
		var loopLength = timeOutputNames_AllOptionIDs.length;
		inputSettings.globalSettings.timeOutputNames = {};
		timeOutputNamesExclude = document.getElementById('NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_ExcludeOptions').checked;
		inputSettings.globalSettings.timeOutputNames.exclude = timeOutputNamesExclude;
		if (timeOutputNamesExclude == true) {
			var outputArr = [];
			var outputArr_a = [];
			for (var i = 0; i < loopLength; i++) {
				var thisOption = document.getElementById(timeOutputNames_AllOptionIDs[i]);
				if (thisOption.checked != true) {
					outputArr.push(timeOutputNames_AllOptionValues[i]);
				} else {
					outputArr_a.push(timeOutputNames_AllOptionValues[i]);
				}
			}
			timeOutputNames_ExcludedOptions = outputArr;
			// console.log(timeOutputNames_ExcludedOptions);
			data.MainSetting_Global_TimeOutputNames = timeOutputNames_ExcludedOptions;
			inputSettings.globalSettings.timeOutputNames.excluded = data.MainSetting_Global_TimeOutputNames;
			inputSettings.globalSettings.timeOutputNames.values = outputArr_a;
		} else {
			for (var i = 0; i < loopLength; i++) {
				var thisOption = document.getElementById(timeOutputNames_AllOptionIDs[i]);
				if (thisOption.checked == true) {
					timeOutputNames_CheckedOptions.push(timeOutputNames_AllOptionValues[i]);
				}
			}
			data.MainSetting_Global_TimeOutputNames = timeOutputNames_CheckedOptions;
			inputSettings.globalSettings.timeOutputNames.values = data.MainSetting_Global_TimeOutputNames;
		}
		
		data.MainSetting_Global_Saturation = elem.MainSetting_Global_Saturation.value;
		
		inputSettings.globalSettings.toggleInputSliders = data.MainSetting_Global_ToggleInputSliders;
		inputSettings.globalSettings.toggleInputExplanations = data.MainSetting_Global_ToggleInputExplanations;
		inputSettings.globalSettings.toggleRomanNumerals = data.MainSetting_Global_ToggleRomanNumerals;
		inputSettings.globalSettings.toggleTimeOutputFormat = data.MainSetting_Global_ToggleTimeOutputFormat;
		inputSettings.globalSettings.saturation = data.MainSetting_Global_Saturation;
		inputSettings.globalSettings.dateFormat = data.MainSetting_Global_DateFormat;
		inputSettings.globalSettings.keepSettingsOnReload = data.MainSetting_Global_KeepSettingsOnReload;
		
		elem.currentLevelInputResult.innerHTML = data.currentLevel;
		elem.remainingEXPInputResult.innerHTML = data.remainingEXP;
		elem.goalLevelInputResult.innerHTML = data.goalLevel;
		elem.expFormulaInputResult.innerHTML = ['Current', 'Pre-shutdown'][Number(data.expFormula)];
		elem.currentInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.currentInfamyLevel, data.currentInfamyLevel, data.MainSetting_Global_ToggleRomanNumerals, false);
		elem.goalInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.goalInfamyLevel, data.goalInfamyLevel, data.MainSetting_Global_ToggleRomanNumerals, false);
		elem.untilRotationsInputResult.innerHTML = data.untilRotations;
		elem.MainSetting_Global_Saturation_InputResult.innerHTML = "<br/>Value: <code>" + data.MainSetting_Global_Saturation + "%";
		
		var globalStyling = '';
		globalStyling = ":root { filter:saturate(" + data.MainSetting_Global_Saturation + "%)}";
		addGlobalStyling(globalStyling, true);
		
		if (data.MainSetting_Global_ToggleInputExplanations == 1) {
			globalStyling = ".NotorietyEXPCalculator_InputExplanation { }";
		} else {
			globalStyling = ".NotorietyEXPCalculator_InputExplanation { display:none }";
		}
		addGlobalStyling(globalStyling);
		inputSettings.globalSettings.inputExplanations = data.MainSetting_Global_ToggleInputExplanations;
		
		function hideAllSections() {
			elem.MainSettingContainer_Calculator_ToggleInfiniteInfamies.style.display = 'none';
			
			elem.Section_LevelSettings.style.display = 'none';
			elem.Section_MutatorRankSettings.style.display = 'none';
			elem.Section_InfamySettings.style.display = 'none';
			elem.Section_MoneySettings.style.display = 'none';
			
			// also hide some inputs and their blocks:
			elem.untilRotationsInput_Block.style.display = 'none';
			elem.goalMoneyInput_Block.style.display = 'none';
		}
		hideAllSections();
		
		var runGainsInput_InputExplanation_Text = '<br>';
		runGainsInput_InputExplanation_Text += '(One run per line. One rotation for the entire input. Begin a line with <code>EXCL=</code> to exclude it from the calculations entirely. Time can be added to the calculations by using <code>MENU</code>. For instance, a line containing only the text <code>MENU(85)</code> means 85 seconds spent in menu, loading or otherwise not in a run. While it is possible to use this line after each run, it is instead recommended to already factor in loading times in the times of each run, as doing so will reduce the amount of computations the tool needs to perform. <b>Factor in repeat bonus</b>, as each line is equal to one run.';
		
		var untilRotationsInput_InputExplanation_Text = '<br>';
		untilRotationsInput_InputExplanation_Text += "Continue the rotation until this many rotations done. Requires the 'Run/rotation gains' input to be properly defined.";
		switch (data.MainSetting_Calculator_ToggleComputationType) {
			case 0:
				elem.MainSettingContainer_Calculator_ToggleInfiniteInfamies.style.display = '';
				elem.Section_MoneySettings.style.display = '';
				elem.Section_LevelSettings.style.display = '';
				elem.Section_InfamySettings.style.display = '';
				elem.untilRotationsInput_Block.style.display = ''; // temp while testing addition of exp to the until rotations input
				
				elem.runGainsInput.placeholder = 'Money|EXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n3,250,700|842,500|170\n2580715|948048|155\n2600750|405725|162';
				runGainsInput_InputExplanation_Text += ' Money, EXP and Time values will be averaged based on all included runs, and then these averages will be used for computations. If you know exactly which particular runs are needed for each infamy, it is heavily recommended to input them.';
				untilRotationsInput_InputExplanation_Text += " Overrides 'Desired level' and 'Desired infamy level' inputs.";
				break;
			case 1:
				elem.Section_MoneySettings.style.display = '';
				elem.goalMoneyInput_Block.style.display = '';
				elem.untilRotationsInput_Block.style.display = '';
				elem.runGainsInput.placeholder = 'Money|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n842,200|160\n487814|115\n3482775|214';
				runGainsInput_InputExplanation_Text += ' Money and Time values will be averaged based on all included runs, and then these averages will be used for computations.';
				untilRotationsInput_InputExplanation_Text += " Overrides 'Desired money' input.";
				break;
			case 2:
				elem.Section_MutatorRankSettings.style.display = '';
				elem.untilRotationsInput_Block.style.display = '';
				if (data.MainSetting_Calculator_ToggleInfiniteInfamies == 1) {
					elem.MainSetting_Calculator_ToggleInfiniteInfamies.click();
				}
				
				elem.runGainsInput.placeholder = 'MXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n8,500|170\n4048|155\n5725|162';
				runGainsInput_InputExplanation_Text += ' MXP and Time values will be averaged based on all included runs, and then these averages will be used for computations.';
				untilRotationsInput_InputExplanation_Text += " Overrides 'Desired rank' and 'Until MXP usage' inputs.";
		}
		
		runGainsInput_InputExplanation_Text += ' While commas can be included in numbers, <b>do not include suffixed numbers</b> such as 1M.';
		
		switch (data.MainSetting_Global_ToggleInputSliders) {
			case 0:
			untilRotationsInput_InputExplanation_Text += " Limit of <code>1,000,000,000,000</code>";
			break;
			case 1:
			untilRotationsInput_InputExplanation_Text += " Limit of <code>1,000</code>";
		}
		untilRotationsInput_InputExplanation_Text += ".";
		
		elem.runGainsInput_InputExplanation.innerHTML = runGainsInput_InputExplanation_Text;
		elem.untilRotationsInput_InputExplanation.innerHTML = untilRotationsInput_InputExplanation_Text;
		
		if (data.MainSetting_Calculator_ToggleInfiniteInfamies == 1) {
			elem.currentInfamyLevelInput.max = 'Infinity';
			elem.goalInfamyLevelInput.max = 'Infinity';
		} else {
			elem.currentInfamyLevelInput.max = '250';
			elem.goalInfamyLevelInput.max = '250';
		}
		
			
		function updateSliderElems() {
			const sliderElems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.expFormulaInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput, elem.untilRotationsInput, elem.MainSetting_Global_Saturation];
			var loopLength = sliderElems.length;
			for (var x = 0; x < loopLength; x++) {
				sliderElems[x].type = data.MainSetting_Global_ToggleInputSliders == 1 ? 'range' : '';
			}
			
			switch (data.MainSetting_Global_ToggleInputSliders) {
				case 0:
					elem.untilRotationsInput.max = 1e12;
				break;
				case 1:
					elem.untilRotationsInput.max = 1e3;
			}
		}
		updateSliderElems();
		
		elem.MainSetting_Calculator_ToggleComputationType.innerHTML = 'Computing: <u>' + ['EXP, Levels & Infamy', 'Money', 'MXP & Mutator Ranks'][Number(data.MainSetting_Calculator_ToggleComputationType)] + '</u>';
		elem.MainSetting_Calculator_ToggleInfiniteInfamies.innerHTML = 'Maximum infamies: <u>' + ['250', 'Unlimited (Disable input sliders)'][Number(data.MainSetting_Calculator_ToggleInfiniteInfamies)] + '</u>';
		elem.MainSetting_Calculator_ToggleAutoCalculate.innerHTML = 'Auto calculate: <u>' + ['OFF', 'ON'][Number(data.MainSetting_Calculator_ToggleAutoCalculate)] + '</u>';
		elem.MainSetting_Global_ToggleInputSliders.innerHTML = 'Input method: <u>' + ['Manual', 'Sliders'][Number(data.MainSetting_Global_ToggleInputSliders)] + '</u>';
		elem.MainSetting_Global_ToggleInputExplanations.innerHTML = 'Input explanations: <u>' + ['Hidden', 'Visible'][Number(data.MainSetting_Global_ToggleInputExplanations)] + '</u>';
		elem.MainSetting_Global_ToggleRomanNumerals.innerHTML = 'Roman numerals: <u>' + ['OFF', 'ON'][Number(data.MainSetting_Global_ToggleRomanNumerals)] + '</u>';
		elem.MainSetting_Global_ToggleTimeOutputFormat.innerHTML = 'Time output format: ' + '<u>' + getTimerConfig().outputFormat + '</u>';
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
	
	elem.SectionContainerToggle_HallofInfamyCCLs.addEventListener('click', function() {
		elem.SectionContainer_HallofInfamyCCLs.style.display = elem.SectionContainer_HallofInfamyCCLs.style.display == 'block' ? 'none' : 'block'
	});
	
	elem.SectionContainerToggle_Timers.addEventListener('click', function() {
		elem.SectionContainer_Timers.style.display = elem.SectionContainer_Timers.style.display == 'block' ? 'none' : 'block'
	});
	
	elem.SectionContainerToggle_GlobalSettings.addEventListener('click', function() {
		elem.SectionContainer_GlobalSettings.style.display = elem.SectionContainer_GlobalSettings.style.display == 'block' ? 'none' : 'block'
	});
	
	elem.SectionContainerToggle_Credits.addEventListener('click', function() {
		elem.SectionContainer_Credits.style.display = elem.SectionContainer_Credits.style.display == 'block' ? 'none' : 'block'
	});
	elem.SectionContainerToggle_KnownBugs.addEventListener('click', function() {
		elem.SectionContainer_KnownBugs.style.display = elem.SectionContainer_KnownBugs.style.display == 'block' ? 'none' : 'block'
	});
	elem.SectionContainerToggle_UpdateLog.addEventListener('click', function() {
		elem.SectionContainer_UpdateLog.style.display = elem.SectionContainer_UpdateLog.style.display == 'block' ? 'none' : 'block'
	});
	
	// --------------------
	// Add listeners to toggles
	(function() {
		elem.MainSetting_Calculator_ToggleComputationType.addEventListener('click', function() {
			elem.runGainsInput.value = '';
			switch (data.MainSetting_Calculator_ToggleComputationType) {
				case 0:
					data.MainSetting_Calculator_ToggleComputationType = 1;
					break;
				case 1:
					data.MainSetting_Calculator_ToggleComputationType = 2;
					break;
				case 2:
					data.MainSetting_Calculator_ToggleComputationType = 0;
			}
			updateSettingsDisplayedValues();
			computeBeepBoop();
		});
		
		elem.MainSetting_Calculator_ToggleInfiniteInfamies.addEventListener('click', function() {
			data.MainSetting_Calculator_ToggleInfiniteInfamies = data.MainSetting_Calculator_ToggleInfiniteInfamies == 0 ? 1 : 0
			updateSettingsDisplayedValues();
		});
		
		elem.MainSetting_Calculator_ToggleAutoCalculate.addEventListener('click', function() {
			data.MainSetting_Calculator_ToggleAutoCalculate = data.MainSetting_Calculator_ToggleAutoCalculate == 0 ? 1 : 0
			if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
				computeBeepBoop();
			}
		});
		
		elem.MainSetting_Global_ToggleInputSliders.addEventListener('click', function() {
			data.MainSetting_Global_ToggleInputSliders = data.MainSetting_Global_ToggleInputSliders == 0 ? 1 : 0
			updateSettingsDisplayedValues();
		});
		
		elem.MainSetting_Global_ToggleInputExplanations.addEventListener('click', function() {
			data.MainSetting_Global_ToggleInputExplanations = data.MainSetting_Global_ToggleInputExplanations == 0 ? 1 : 0
			updateSettingsDisplayedValues();
		});
		
		elem.MainSetting_Global_ToggleRomanNumerals.addEventListener('click', function() {
			data.MainSetting_Global_ToggleRomanNumerals = data.MainSetting_Global_ToggleRomanNumerals == 0 ? 1 : 0
			updateSettingsDisplayedValues()
			if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
				computeBeepBoop();
			}
		});
		
		elem.MainSetting_Global_ToggleTimeOutputFormat.addEventListener('click', function() {
			switch (data.MainSetting_Global_ToggleTimeOutputFormat) {
				case 0:
					data.MainSetting_Global_ToggleTimeOutputFormat = 1;
					break;
				case 1:
					data.MainSetting_Global_ToggleTimeOutputFormat = 2;
					break;
				case 2:
					data.MainSetting_Global_ToggleTimeOutputFormat = 3;
					break;
				case 3:
					data.MainSetting_Global_ToggleTimeOutputFormat = 0;
			}
			updateSettingsDisplayedValues();
			addHallofInfamyCCLs();
			if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
				computeBeepBoop();
			}
		});
	}());
	
	// settings checkboxes event listeners
	(function() {
		const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck];
		const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck'];
		var loopLength = elems.length;
		for (var x = 0; x < loopLength; x++) {
			const y = elems[x];
			y.value = data[elems_DataRefs[x]];
			y.addEventListener('click', function() {
				data[elems_DataRefs[elems.indexOf(y)]] = data[elems_DataRefs[elems.indexOf(y)]] == 0 ? 1 : 0
				y.value = data[elems_DataRefs[elems.indexOf(y)]];
				updateSwitchButtons();
				updateSettingsDisplayedValues();
				if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
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
	
	(function() {
		const elems = [elem.toggleEntryDescriptions];
		const elems_DataRefs = ['toggleEntryDescriptions'];
		var loopLength = elems.length;
		for (var x = 0; x < loopLength; x++) {
			const y = elems[x];
			y.value = data[elems_DataRefs[x]];
			y.addEventListener('click', function() {
				data[elems_DataRefs[elems.indexOf(y)]] = data[elems_DataRefs[elems.indexOf(y)]] == 0 ? 1 : 0
				y.value = data[elems_DataRefs[elems.indexOf(y)]];
				updateSwitchButtons();
				if (y.id == elem.toggleEntryDescriptions.id) {
					updateHallDescVis();
				}
			});
		}
	}());
	
	// settings visual display event listeners
	(function() {
		const elems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.expFormulaInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput, elem.untilRotationsInput, elem.MainSetting_Global_Saturation];
		var loopLength = elems.length;
		for (var x = 0; x < loopLength; x++) {
			elems[x].addEventListener('input', function() {
				updateSettingsDisplayedValues()
				if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings inputs event listeners
	(function() {
		const elems = [elem.currentMoneyInput];
		var loopLength = elems.length;
		for (var x = 0; x < loopLength; x++) {
			elems[x].addEventListener('input', function() {
				if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings textarea inputs event listeners
	(function() {
		const elems = [elem.runGainsInput];
		var loopLength = elems.length;
		for (var x = 0; x < loopLength; x++) {
			elems[x].addEventListener('blur', function() {
				if (data.MainSetting_Calculator_ToggleAutoCalculate == 1) {
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
		/*
		elem.currentInfamyLevelInput.value = 40;
		elem.goalInfamyLevelInput.value = 50;
		elem.currentMoneyInput.value = '1e8';
		elem.remainingEXPInput.value = '40';
		elem.MainSetting_Calculator_ToggleComputationType.click();
		elem.MainSetting_Calculator_ToggleComputationType.click();
		// elem.runGainsInput.value = "523723|9584523|42\n237455|4771235|61";
		elem.runGainsInput.value = "2373|42\n4882|74";
		// elem.runGainsInput.value = "10,000,000|150\n4,523,000|84";
		elem.goalMoneyInput.value = '1.2247e9';
		elem.currentMutatorRankInput.value = 87;
		elem.goalMutatorRankInput.value = 300;
		// elem.untilRotationsInput.value = 723;
		if (data.MainSetting_Calculator_ToggleInfiniteInfamies == 0) {
			elem.MainSetting_Calculator_ToggleInfiniteInfamies.click();
		}
		// elem.untilRotationsInput.value = 35;
		*/
		updateSwitchButtons();
		updateSettingsDisplayedValues();
		outputEverything = {};
		
		var disclaimerText = '';
		switch (data.MainSetting_Calculator_ToggleComputationType) {
			case 0:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher infamy ranks contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Additionally, the EXP result may be inaccurate by up to about <code>1</code> per level due to inconsistency regarding how the game rounds numbers. This tool assumes this value: ";
				switch (Number(data.expFormula)) {
					case 0:
					disclaimerText += "<code>27,181,253</code> (calculated by summing <code>x = 1, floor(x*1018.93+x^2.976664), until x = 100</code>)";
					break;
					case 1:
					disclaimerText += "<code>5,090,812</code> (calculated by summing <code>x = 1, floor(1025 * x + x ^ 1.3), until x = 100</code>)";
				}
				disclaimerText += ". Also, with 'Until out of money' enabled, the tool does not carry over superfluous EXP after each infamy, so the actual runs/rotations needed may be slightly less. The runs/rotations required result is always rounded up (consequently affecting playtime as well). If the average money gains per infamy is greater than or equal to the capped cost (with the pre-money requirement limit setting disabled), the result will be infinite. Lastly, the maximum passive infamies is <code>1,000,000</code> for performance reasons.)";
				break;
			case 2:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher Mutator Ranks and 'Until MXP usage' values contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Also, with 'Until MXP usage' defined, the tool does not carry over superfluous MXP after each rank, so the actual runs/rotations needed may be slightly less. The formula to determine MXP requirement from the current rank (x) for the next rank is <code>5000 + (x ** 1.25)</code>, which is then rounded down for each rank. The runs/rotations required result is always rounded up (consequently affecting playtime as well). Lastly, there is a limit of <code>1,000,000,000,000</code> Mutator Ranks for performance reasons." + ')';
			default:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. The runs/rotations required result is always rounded up (consequently affecting playtime as well)." + ')';
		}
		elem.resultsDisclaimer.innerHTML = disclaimerText;
		var outputString = '';
		var totalExpReq = new Decimal(0);
		var totalMxpReq = new Decimal(0);
		var totalMoneyReq = new Decimal(0);
		const testingFalsy = false;
		const rotationInputsCalculated = data.rotationInputTotals(elem.runGainsInput.value)
		var forEXPOnlyNote = false;
		// console.log(rotationInputsCalculated);
		
		outputEverything.rotationsData = rotationInputsCalculated;
		
		var avgTime = null;
		if (data.untilRotations.greaterThan(0) && rotationInputsCalculated.includedRuns.greaterThan(0)) {
			// avgTime = rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime);
			avgTime = rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).dividedBy(rotationInputsCalculated.includedRuns);
		} else {
			avgTime = rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).dividedBy(rotationInputsCalculated.includedRuns);
		}
		const avgTimeOutput = new Timer();
		avgTimeOutput.amount = avgTime.times(1e3);
		if (isNaN(avgTimeOutput.amount) == false) {
			outputEverything.avgTime = avgTimeOutput.amount;
		}
		var orig_MXP = null;
		var avgMoneyGains = null;
		switch (data.MainSetting_Calculator_ToggleComputationType) {
			case 0:
				var avgExpGains = rotationInputsCalculated.exp.dividedBy(rotationInputsCalculated.includedRuns);
				if (isNaN(avgExpGains) == false) {
					outputEverything.avgExpGains = avgExpGains;
				}
				var infamyRunsReq = NotoExpReqTotal({}, 1, 100).dividedBy(avgExpGains);
				if (isNaN(infamyRunsReq) == false) {
					outputEverything.infamyRunsReq = infamyRunsReq;
				}
				avgMoneyGains = (rotationInputsCalculated.money.dividedBy(rotationInputsCalculated.includedRuns)).times(infamyRunsReq);
				if (isNaN(avgMoneyGains) == false) {
					outputEverything.avgMoneyGains = avgMoneyGains;
				}
				// console.log(data.untilRotations);
				if (data.untilRotations.greaterThan(0) && rotationInputsCalculated.includedRuns.greaterThan(0)) {
					// outputString += "(These calculations presently do not take into account remaining EXP until next level.)<p></p>";
					if (data.currentInfamyLevel.equals(0)) {
						outputString += "At Level " + formatInt(data.currentLevel);
					} else {
						outputString += "At Level " + toRomanWithSeparator(data.currentInfamyLevel, data.currentLevel, data.MainSetting_Global_ToggleRomanNumerals && data.currentInfamyLevel.greaterThan(0), true /*data.currentInfamyLevel > 0*/)
					}
					const orig = NotoExpReqTotal({untilEXP:true, currentLevel:data.currentLevel, remainingEXP:data.remainingEXP, currentInfamyLevel:data.currentInfamyLevel, extraEXP:rotationInputsCalculated.exp.times(data.untilRotations)});
					outputEverything.expData = orig;
					outputString += ", assuming gains of " + formatInt(rotationInputsCalculated.exp) + " EXP and playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " (including extra time) per rotation, the following will happen:"
					if (orig.extraInfamyLevels.equals(0)) {
						outputString += '<br>• Reach Level ' + formatInt(orig.newLevel);
						outputString += ' (Levels: +' + formatInt(orig.extraLevels)
						if (data.currentLevel.greaterThan(0)) {
							outputString += ', x' + formatInt(orig.newLevel.dividedBy(data.currentLevel));
							if (data.currentLevel.greaterThan(1)) {
								outputString += ', ^' + formatInt(orig.newLevel.log10().dividedBy(data.currentLevel.log10()));
							}
						}
						outputString += ')';
					} else {
						outputString += '<br>• Reach Level ' + toRomanWithSeparator(orig.newInfamyLevel, orig.newLevel, data.MainSetting_Global_ToggleRomanNumerals && orig.newInfamyLevel.greaterThan(0), true /*data.currentInfamyLevel > 0*/);
						outputString += ' (Infamies: +' + formatInt(orig.extraInfamyLevels)
						if (data.currentInfamyLevel.greaterThan(0)) {
							outputString += ', x' + formatInt(orig.newInfamyLevel.dividedBy(data.currentInfamyLevel));
							if (data.currentInfamyLevel.greaterThan(1)) {
								outputString += ', ^' + formatInt(orig.newInfamyLevel.log10().dividedBy(data.currentInfamyLevel.log10()));
							}
						}
						outputString += ')';
					}
					outputString += "<br>• Leftover EXP: " + formatInt(orig.leftoverEXP);
				} else {
					if (data.currentInfamyLevel.equals(0) && data.goalInfamyLevel.equals(0)) {
					var levelDiff = data.goalLevel.sub(data.currentLevel).abs();
					totalExpReq = NotoExpReqTotal({}, data.currentLevel.min(data.goalLevel), data.currentLevel.max(data.goalLevel));
						if (data.remainingEXP.notEquals(0)) {
							var nextLevelReq = NotoExpReqTotal({}, data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
							totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
						}
					outputString += "To go from Level " + formatInt(data.currentLevel) + " to " + formatInt(data.goalLevel) + ", the following is required:";
					outputString += '<br>• ' + formatInt(totalExpReq) + ' EXP (' + levelDiff.valueOf() + checkPlural(levelDiff, ' level', ' levels') + ')';
					} else if (data.untilOutOfMoneyCheck == 1 && data.currentInfamyLevel.greaterThan(0)) {
						const calcPoorOutput = calcInfamiesUntilPoor(data.currentInfamyLevel, [data.currentMoney, avgMoneyGains]);
						outputEverything.calcPoorData = calcPoorOutput;
						
						if (calcPoorOutput.infsWithPassive.greaterThan(0)) {
							totalExpReq = totalExpReq.add(NotoExpReqTotal({}, data.currentLevel, 100));
							if (calcPoorOutput.infsWithPassive.greaterThan(1)) {
								totalExpReq = totalExpReq.add(NotoExpReqTotal({}, 1, 100).times(calcPoorOutput.infsWithPassive.sub(1)));
							}
						}
						outputString += "At Infamy " + toRomanWithSeparator(data.currentInfamyLevel, '', data.MainSetting_Global_ToggleRomanNumerals && data.currentInfamyLevel.greaterThan(0), false /*data.currentInfamyLevel > 0*/) + " with currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + '</span> and average gains of ' + formatInt(avgExpGains) + " EXP per run and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(avgMoneyGains) + '</span> per infamy (based on runs required for enough exp), the following can be achieved:';
						outputString += '<br>• Infamies: ' + formatInt(calcPoorOutput.infs) + ' (passive: ' + formatInt(calcPoorOutput.passiveInfs) + ' | total: ' + formatInt(calcPoorOutput.infsWithPassive) + ')';
						outputString += '<br>• Reach Infamy ' + toRomanWithSeparator(data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive), '', data.MainSetting_Global_ToggleRomanNumerals && (data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive)).greaterThan(0), false /*data.currentInfamyLevel > 0*/) + ' for totals of <b>' + formatInt(totalExpReq) + "</b> EXP and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.totalCostWithPassive) + "</span> (leftover: <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.remainingMoney) + '</span>)';
					} else {
						outputString += "To go from Level " + toRomanWithSeparator(data.currentInfamyLevel, data.currentLevel, data.MainSetting_Global_ToggleRomanNumerals && data.currentInfamyLevel.greaterThan(0), true /*data.currentInfamyLevel > 0*/) + ' to ' + toRomanWithSeparator(data.goalInfamyLevel, data.goalLevel, data.MainSetting_Global_ToggleRomanNumerals && data.goalInfamyLevel.greaterThan(0), true /*data.goalInfamyLevel > 0*/);
						if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
							outputString += ", assuming average gains of " + formatInt(avgExpGains) + " EXP and average playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " (including extra time) per run"
						}
						outputString += ', the following are required:';
						var currentLevel_Temp = data.currentLevel, goalLevel_Temp = data.goalLevel;
						var infamyLevelDiff = data.goalInfamyLevel.sub(data.currentInfamyLevel).abs();
						if (infamyLevelDiff.greaterThan(0)) {
							// gets exp req to very next infamy
							totalExpReq = totalExpReq.add(NotoExpReqTotal({}, data.currentLevel, 100));
							
							// last infamy until desired level
							if (infamyLevelDiff.greaterThan(1)) {
								totalExpReq = totalExpReq.add(NotoExpReqTotal({}, 1, 100).times(infamyLevelDiff.sub(1)));
							}
						}
						totalExpReq = totalExpReq.add(NotoExpReqTotal({}, 1, data.goalLevel));
						
						if (data.remainingEXP.notEquals(0)) {
							var nextLevelReq = NotoExpReqTotal({}, data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
							totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
						}
						
						outputEverything.totalExpReq = totalExpReq;
						outputString += '<br>• <b>' + formatInt(totalExpReq) + '</b> EXP';
						var infamyMoneyReq = calcInfamyMoneyReq_v2(data.currentInfamyLevel, data.goalInfamyLevel, data.cheaperPassCheck, [data.currentMoney, rotationInputsCalculated.money], data.preMoneyCapCheck);
						if (rotationInputsCalculated.money.equals(0)) {
							infamyMoneyReq = infamyMoneyReq.sub(data.currentMoney);
						}
						outputEverything.infamyMoneyReq = infamyMoneyReq;
						outputString += "<br>• <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.max(0)) + '</span> money (excluding current money)';
						if (infamyMoneyReq.lessThan(0)) {
							var usingUpMoney = infamyMoneyReq.abs().sub(data.currentMoney).abs();
							outputEverything.usingUpMoney = usingUpMoney;
							var withMoneyLeft = infamyMoneyReq.abs();
							outputEverything.withMoneyLeft = withMoneyLeft;
							outputString += " (using up <span class='NotorietyEXPCalculator_Money'>$" + formatInt(usingUpMoney) + "</span> with <span class='NotorietyEXPCalculator_Money'>$" + formatInt(withMoneyLeft) + '</span> remaining)';
						} else if (infamyMoneyReq.greaterThan(0)) {
							forEXPOnlyNote = true;
						}
					}
				}
				break;
			case 1:
				avgMoneyGains = rotationInputsCalculated.money.dividedBy(rotationInputsCalculated.includedRuns);
				totalMoneyReq = data.goalMoney.sub(data.currentMoney);
				if (isNaN(avgMoneyGains) == false) {
					outputEverything.avgMoneyGains = avgMoneyGains;
				}
				outputEverything.totalMoneyReq = totalMoneyReq;
				
				if (data.untilRotations.greaterThan(0) || rotationInputsCalculated.includedRuns.greaterThan(0)) {
					if (data.untilRotations.greaterThan(0)) {
						var gainsInRotations = rotationInputsCalculated.money.times(data.untilRotations);
						var totalMoneyWithGains = data.currentMoney.add(gainsInRotations);
						outputString += "With currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + "</span>, assuming average gains of <span class='NotorietyEXPCalculator_Money'>$" + formatInt(avgMoneyGains) + "</span> and playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " per run, gaining another <span class='NotorietyEXPCalculator_Money'>$" + formatInt(gainsInRotations) + "</span> will total:"
						outputString += "<br>• Money: <span class='NotorietyEXPCalculator_Money'>$" + formatInt(totalMoneyWithGains) + "</span>";
						outputEverything.totalMoneyWithGains = totalMoneyWithGains;
					} else {
						outputString += "With currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + "</span>, assuming average gains of <span class='NotorietyEXPCalculator_Money'>$" + formatInt(avgMoneyGains) + "</span> and playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " per run, to reach <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.goalMoney) + "</span>, the requirements are:";
						outputString += "<br>• Money: <span class='NotorietyEXPCalculator_Money'>$" + formatInt(totalMoneyReq) + "</span>";
					}
				} else {
					outputString += "With currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + "</span>, to reach <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.goalMoney) + "</span>, the requirement is <span class='NotorietyEXPCalculator_Money'>$" + formatInt(totalMoneyReq) + "</span> money.";
				}
				break;
			case 2:
				const avgMxpGains = rotationInputsCalculated.mxp.dividedBy(rotationInputsCalculated.includedRuns);
				if (isNaN(avgMxpGains) == false) {
					outputEverything.avgMxpGains = avgMxpGains;
				}
				if (data.untilMXPUsage.equals(0) && data.untilRotations.equals(0)) {
					orig_MXP = calcMXPReq({untilMXP: false}, {currentRank:data.currentMutatorRank, goalRank:data.goalMutatorRank, remainingMXP:data.remainingMXP});
					totalMxpReq = totalMxpReq.add(orig_MXP);
					outputString += "To go from <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span> to <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.goalMutatorRank) + "</span>"
					outputString += ' (Mutator Ranks: +' + formatInt(data.goalMutatorRank.sub(data.currentMutatorRank))
					if (data.currentMutatorRank.greaterThan(0)) {
						outputString += ', x' + formatInt(data.goalMutatorRank.dividedBy(data.currentMutatorRank));
						if (data.currentMutatorRank.greaterThan(1)) {
							outputString += ', ^' + formatInt(data.goalMutatorRank.log10().dividedBy(data.currentMutatorRank.log10()));
						}
					}
					outputString += ')';
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					}
					outputString += " the requirement is <span class='NotorietyEXPCalculator_MXP'>" + formatInt(totalMxpReq) + " MXP</span>.";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += " Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " (including extra time) per run:";
					}
				} else if (data.untilMXPUsage.greaterThan(0) || data.untilRotations.greaterThan(0)) {
					if (data.untilRotations.greaterThan(0)) {
						orig_MXP = calcMXPReq({untilMXP: true}, {currentRank:data.currentMutatorRank, remainingMXP:data.remainingMXP, extraMXP:rotationInputsCalculated.mxp.times(data.untilRotations)});
					} else {
						orig_MXP = calcMXPReq({untilMXP: true}, {currentRank:data.currentMutatorRank, remainingMXP:data.remainingMXP, extraMXP:data.untilMXPUsage});
					}
					outputString += "At <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span>";
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					} else {
						outputString += ',';
					}
					if (data.untilRotations.greaterThan(0)) {
						totalMxpReq = totalMxpReq.add(rotationInputsCalculated.mxp.times(data.untilRotations));
					} else {
						totalMxpReq = totalMxpReq.add(data.untilMXPUsage);
					}
					if (data.untilRotations.greaterThan(0)) {
						var mxpRotGains = rotationInputsCalculated.mxp.times(data.untilRotations);
						outputEverything.mxpRotGains = mxpRotGains;
						outputString += " gaining another <span class='NotorietyEXPCalculator_MXP'>" + formatInt(mxpRotGains) + " MXP</span> will reach:";
					} else {
						outputString += " gaining another <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.untilMXPUsage) + " MXP</span> will reach:";
					}
					outputString += "<br>• <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(orig_MXP.newRank) + "</span>";
					outputString += ' (Mutator Ranks: +' + formatInt(orig_MXP.extraRanks)
					if (data.currentMutatorRank.greaterThan(0)) {
						var mutatorRanksDiffMulti = orig_MXP.newRank.dividedBy(data.currentMutatorRank);
						outputEverything.mutatorRanksDiffMulti = mutatorRanksDiffMulti;
						outputString += ', x' + formatInt(mutatorRanksDiffMulti);
						if (data.currentMutatorRank.greaterThan(1)) {
							var mutatorRanksDiffExponent = orig_MXP.newRank.log10().dividedBy(data.currentMutatorRank.log10());
							outputEverything.mutatorRanksDiffExponent = mutatorRanksDiffExponent;
							outputString += ', ^' + formatInt(mutatorRanksDiffExponent);
						}
					}
					outputString += ')';
					outputString += "<br>• Leftover <span class='NotorietyEXPCalculator_MXP'>MXP</span>: " + formatInt(orig_MXP.leftoverMXP) + "</span>";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						if (data.untilRotations.greaterThan(0)) {
							outputString += "<p></p>Assuming gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(rotationInputsCalculated.mxp) + " MXP</span> and playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " (including extra time) per rotation:";
						} else {
							outputString += "<p></p>Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount(getTimerConfig()) + " (including extra time) per run:";
						}
					}
				} else {
					outputString += "Wait a minute, how did this happen? We're smarter than this.";
				}
				outputEverything.mxpData = orig_MXP;
				outputEverything.totalMxpReq = totalMxpReq;
			}
		switch (data.MainSetting_Calculator_ToggleComputationType) {
		case 0:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				if (data.untilRotations.greaterThan(0)) {
					const timeOutput = new Timer();
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).times(data.untilRotations).ceil());
					outputEverything.timeOutputAmount = timeOutput.amount;
					outputString += '<p></p>Requirements:';
					outputString += '<br>• <b>' + formatInt(data.untilRotations) + '</b>' + checkPlural(data.untilRotations, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
					outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
				} else {
					const timeOutput = new Timer();
					if (totalExpReq.dividedBy(rotationInputsCalculated.exp).equals(0) || totalExpReq.equals(0)) {
						timeOutput.amount = new Decimal(0);
					} else {
						timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil());
					}
					outputEverything.timeOutputAmount = timeOutput.amount;
					var rotationsReq = totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil();
					if (rotationsReq.isNan() == true) {
						rotationsReq = new Decimal(0);
					}
					outputEverything.rotationsReq = rotationsReq;
					if (totalExpReq.notEquals(0)) {
						var rotationsNeeded = totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil();
						outputEverything.rotationsNeeded = rotationsNeeded;
						if (forEXPOnlyNote == true) {
							outputString += '<br>• For EXP only: <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(rotationsNeeded, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
							outputString += '<br>• For EXP only: <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
						} else {
							outputString += '<br>• <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(rotationsNeeded, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
							outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
						}
					}
				}
			}
		break;
		case 1:
		if (rotationInputsCalculated.includedRuns.notEquals(0)) {
			if (data.untilRotations.greaterThan(0)) {
				const timeOutput = new Timer();
				timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).times(data.untilRotations).ceil());
				outputString += '<br>• <b>' + formatInt(data.untilRotations) + '</b>' + checkPlural(data.untilRotations, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
				outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
			} else {
				const timeOutput = new Timer();
				if (totalMoneyReq.dividedBy(rotationInputsCalculated.money).equals(0) || totalMoneyReq.equals(0)) {
					timeOutput.amount = new Decimal(0);
				} else {
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalMoneyReq.dividedBy(rotationInputsCalculated.money).ceil());
				}
				outputEverything.timeOutputAmount = timeOutput.amount;
				var rotationsReq = totalMoneyReq.dividedBy(rotationInputsCalculated.money);
				if (rotationsReq.isNan() == true) {
					rotationsReq = new Decimal(0);
				}
				outputEverything.rotationsReq = rotationsReq;
				var leftoverMoney = totalMoneyReq.dividedBy(rotationInputsCalculated.money).sub(rotationsReq.floor()).times(rotationInputsCalculated.money);
				outputEverything.leftoverMoney = leftoverMoney;
				var rotationsNeeded = totalMoneyReq.dividedBy(rotationInputsCalculated.money).ceil();
				outputEverything.rotationsNeeded = rotationsNeeded;
				outputString += "<br>• Leftover Money: <span class='NotorietyEXPCalculator_Money'>" + formatInt(leftoverMoney) + "</span>";
				outputString += '<br>• <b>' + formatInt(rotationsReq.ceil()) + '</b>' + checkPlural(rotationsNeeded, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
				outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
			}
		}
		break;
		case 2:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				if (data.untilRotations.greaterThan(0)) {
					const timeOutput = new Timer();
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).times(data.untilRotations).ceil());
					outputString += '<br>• <b>' + formatInt(data.untilRotations) + '</b>' + checkPlural(data.untilRotations, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
					outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
				} else {
					const timeOutput = new Timer();
					if (totalMxpReq.dividedBy(rotationInputsCalculated.mxp).equals(0) || totalMxpReq.equals(0)) {
						timeOutput.amount = new Decimal(0);
					} else {
						timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil());
					}
					outputEverything.timeOutputAmount = timeOutput.amount;
					var rotationsReq = totalMxpReq.dividedBy(rotationInputsCalculated.mxp);
					if (rotationsReq.isNan() == true) {
						rotationsReq = new Decimal(0);
					}
					outputEverything.rotationsReq = rotationsReq;
					if (data.untilMXPUsage.equals(0)) {
						var leftoverMXP = totalMxpReq.dividedBy(rotationInputsCalculated.mxp).sub(rotationsReq.floor()).times(rotationInputsCalculated.mxp);
						outputEverything.leftoverMXP = leftoverMXP;
						outputString += "<br>• Leftover <span class='NotorietyEXPCalculator_MXP'>MXP</span>: " + formatInt(leftoverMXP) + "</span>";
					}
					var rotationsNeeded = totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil();
					outputEverything.rotationsNeeded = rotationsNeeded;
					outputString += '<br>• <b>' + formatInt(rotationsReq.ceil()) + '</b>' + checkPlural(rotationsNeeded, ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
					outputString += '<br>• <b>' + timeOutput.formatAmount(getTimerConfig()) + '</b> playtime';
				}
			}
		}
		elem.outputResults.innerHTML = outputString;
		// console.log('outputEverything:', JSON.stringify(outputEverything));
	}
	// console.log(inputSettings.miscellaneousSettings);
	
	function interpretSavedSettings() {
		var obj = JSON.parse(window.localStorage.getItem('NotorietyEXPCalculator_GlobalSettings'));
		if (obj == null) {
			obj = {calculatorSettings:{}, miscellaneousSettings:{}, globalSettings:{}};
		}
		// console.log('\n\n\n\n\nsaved settings:', obj, '\n\n\n\n\n');
		if (obj.globalSettings.keepSettingsOnReload == true) {
			// completely functional Calculator and Miscellaneous settings keepers, disabled due to being unnecessary on reload (one-time use inputs vs user preferences global settings)
			/*
			// Calculator settings
			if (obj.calculatorSettings.toggleComputationType != undefined) {
				data.MainSetting_Calculator_ToggleComputationType = obj.calculatorSettings.toggleComputationType;
			}
			if (obj.calculatorSettings.toggleInfiniteInfamies != undefined) {
				data.MainSetting_Calculator_ToggleInfiniteInfamies = obj.calculatorSettings.toggleInfiniteInfamies;
			}
			if (obj.calculatorSettings.toggleAutoCalculate != undefined) {
				data.MainSetting_Calculator_ToggleAutoCalculate = obj.calculatorSettings.toggleAutoCalculate;
			}
			
			elem.currentLevelInput.value = obj.calculatorSettings.currentLevel;
			elem.remainingEXPInput.value = obj.calculatorSettings.remainingEXP;
			elem.goalLevelInput.value = obj.calculatorSettings.goalLevel;
			elem.expFormulaInput.value = obj.calculatorSettings.expFormula;
			elem.currentMoneyInput.value = obj.calculatorSettings.currentMoney;
			elem.goalMoneyInput.value = obj.calculatorSettings.goalMoney;
			elem.currentInfamyLevelInput.value = obj.calculatorSettings.currentInfamyLevel;
			elem.goalInfamyLevelInput.value = obj.calculatorSettings.goalInfamyLevel;
			elem.currentMutatorRankInput.value = obj.calculatorSettings.currentMutatorRank;
			elem.goalMutatorRankInput.value = obj.calculatorSettings.goalMutatorRank;
			elem.remainingMXPInput.value = obj.calculatorSettings.remainingMXP;
			elem.untilMXPUsageInput.value = obj.calculatorSettings.untilMXPUsage;
			elem.untilRotationsInput.value = obj.calculatorSettings.untilRotations;
			if (obj.calculatorSettings.untilOutOfMoneyCheck != undefined) {
				data.untilOutOfMoneyCheck = obj.calculatorSettings.untilOutOfMoneyCheck;
				elem.untilOutOfMoneyCheck.value = data.untilOutOfMoneyCheck;
			}
			if (obj.calculatorSettings.cheaperPassCheck != undefined) {
				data.cheaperPassCheck = obj.calculatorSettings.cheaperPassCheck;
				elem.cheaperPassCheck.value = data.cheaperPassCheck;
			}
			if (obj.calculatorSettings.preMoneyCapCheck != undefined) {
				data.preMoneyCapCheck = obj.calculatorSettings.preMoneyCapCheck;
				elem.preMoneyCapCheck.value = data.preMoneyCapCheck;
			}
			
			// Miscellaneous settings
			elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Crimson.checked = obj.miscellaneousSettings.HallofCCLs.filters.classicInfamySuits.crimson;
			elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Rojo.checked = obj.miscellaneousSettings.HallofCCLs.filters.classicInfamySuits.rojo;
			elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_Royalty.checked = obj.miscellaneousSettings.HallofCCLs.filters.classicInfamySuits.royalty;
			elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_BlueNavy.checked = obj.miscellaneousSettings.HallofCCLs.filters.classicInfamySuits.blueNavy;
			elem.Section_HallofInfamyCCLs_Filter_ClassicInfamySuits_ExcludeOptions.checked = obj.miscellaneousSettings.HallofCCLs.filters.classicInfamySuits.exclude;
			
			
			elem.Section_HallofInfamyCCLs_Filter_Time_Year.value = obj.miscellaneousSettings.HallofCCLs.filters.time.year;
			elem.Section_HallofInfamyCCLs_Filter_Time_Month.value = obj.miscellaneousSettings.HallofCCLs.filters.time.month;
			elem.Section_HallofInfamyCCLs_Filter_Time_Day.value = obj.miscellaneousSettings.HallofCCLs.filters.time.day;
			elem.Section_HallofInfamyCCLs_Filter_Time_Hour.value = obj.miscellaneousSettings.HallofCCLs.filters.time.hour;
			elem.Section_HallofInfamyCCLs_Filter_Time_Minute.value = obj.miscellaneousSettings.HallofCCLs.filters.time.minute;
			elem.Section_HallofInfamyCCLs_Filter_Time_Second.value = obj.miscellaneousSettings.HallofCCLs.filters.time.second;
			elem.Section_HallofInfamyCCLs_Filter_Time_Millisecond.value = obj.miscellaneousSettings.HallofCCLs.filters.time.millisecond;
			elem.Section_HallofInfamyCCLs_Filter_Time_ExcludeOptions.checked = obj.miscellaneousSettings.HallofCCLs.filters.time.exclude;
			
			elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_SpecificCCLs.value = obj.miscellaneousSettings.HallofCCLs.filters.specificCCLs.specificCCLs;
			elem.Section_HallofInfamyCCLs_Filter_SpecificCCLs_ExcludeOptions.checked = obj.miscellaneousSettings.HallofCCLs.filters.specificCCLs.exclude;
			
			elem.Section_HallofInfamyCCLs_Filter_Other_Notes.checked = obj.miscellaneousSettings.HallofCCLs.filters.other.notes;
			elem.Section_HallofInfamyCCLs_Filter_Other_UserWrittenDescription.checked = obj.miscellaneousSettings.HallofCCLs.filters.other.userWrittenDescription;
			elem.Section_HallofInfamyCCLs_Filter_Other_ExcludeOptions.checked = obj.miscellaneousSettings.HallofCCLs.filters.other.exclude;
			
			elem.Section_HallofInfamyCCLs_FilteringLogic.value = obj.miscellaneousSettings.HallofCCLs.filteringLogic;
			
			if (obj.miscellaneousSettings.toggleEntryDescriptions != undefined) {
				data.toggleEntryDescriptions = obj.miscellaneousSettings.toggleEntryDescriptions;
				elem.toggleEntryDescriptions.value = data.toggleEntryDescriptions;
			}
			*/
			
			// Global settings
			if (obj.globalSettings.toggleInputSliders != undefined) {
				data.MainSetting_Global_ToggleInputSliders = obj.globalSettings.toggleInputSliders;
			} else {
				data.MainSetting_Global_ToggleInputSliders = 1;
			}
			if (obj.globalSettings.toggleInputExplanations != undefined) {
				data.MainSetting_Global_ToggleInputExplanations = obj.globalSettings.toggleInputExplanations;
			} else {
				data.MainSetting_Global_ToggleInputExplanations = 1;
			}
			if (obj.globalSettings.toggleRomanNumerals != undefined) {
				data.MainSetting_Global_ToggleRomanNumerals = obj.globalSettings.toggleRomanNumerals;
			} else {
				data.MainSetting_Global_ToggleRomanNumerals = 1;
			}
			if (obj.globalSettings.toggleTimeOutputFormat != undefined) {
				data.MainSetting_Global_ToggleTimeOutputFormat = obj.globalSettings.toggleTimeOutputFormat;
			} else {
				data.MainSetting_Global_ToggleTimeOutputFormat = 1;
			}
			const timeOutputNames_AllOptionIDs = ['NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millisecond', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Second', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Minute', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Hour', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Day', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Week', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Month', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Year', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Decade', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Century', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_Millennium', 'NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_NotorietyUpdateInterval'];
			const allTimeAcronyms = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'de', 'c', 'mi', 'noup'];
			if (obj.globalSettings.timeOutputNames != undefined) {
				if (obj.globalSettings.timeOutputNames.values != undefined) {
					var loopLength = allTimeAcronyms.length;
					for (var i = 0; i < loopLength; i++) {
						if (obj.globalSettings.timeOutputNames.values.indexOf(allTimeAcronyms[i]) != -1) {
							document.getElementById(timeOutputNames_AllOptionIDs[i]).checked = true;
						} else {
							document.getElementById(timeOutputNames_AllOptionIDs[i]).checked = false;
						}
					}
				} else {
					document.getElementById(timeOutputNames_AllOptionIDs[i]).checked = false;
				}
				if (obj.globalSettings.timeOutputNames.exclude == true) {
					document.getElementById('NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_ExcludeOptions').checked = true;
				}
			} else {
				var loopLength = allTimeAcronyms.length;
				for (var i = 0; i < loopLength; i++) {
					document.getElementById(timeOutputNames_AllOptionIDs[i]).checked = true;
				}
				document.getElementById('NotorietyEXPCalculator_MainSetting_Global_TimeOutputNames_ExcludeOptions').checked = false;
			}
			if (obj.globalSettings.saturation != undefined) {
				data.MainSetting_Global_Saturation = obj.globalSettings.saturation;
			} else {
				data.MainSetting_Global_Saturation = 100;
			}
			elem.MainSetting_Global_Saturation.value = data.MainSetting_Global_Saturation;
			if (obj.globalSettings.dateFormat != undefined) {
				data.MainSetting_Global_DateFormat = obj.globalSettings.dateFormat;
			} else {
				data.MainSetting_Global_DateFormat = "yyyy-MM-dd HH:mm:ss:fff";
			}
			elem.MainSetting_Global_DateFormat.value = data.MainSetting_Global_DateFormat;
			if (obj.globalSettings.keepSettingsOnReload != undefined) {
				data.MainSetting_Global_KeepSettingsOnReload = obj.globalSettings.keepSettingsOnReload;
			} else {
				data.MainSetting_Global_KeepSettingsOnReload = false;
			}
			elem.MainSetting_Global_KeepSettingsOnReload.checked = data.MainSetting_Global_KeepSettingsOnReload;
			
		}
		// console.log(data.MainSetting_Global_DateFormat);
		updateSettingsDisplayedValues();
		updateSwitchButtons();
		// console.log(data.MainSetting_Global_DateFormat);
	}
	interpretSavedSettings();
	
	addHallofInfamyCCLs();
	addTimersSection();
	addUpdateLog(true);
	
	function addDoubleClickImages() {
		const doubleClickImgs = document.getElementsByClassName('NotorietyEXPCalculator_DoubleClickImg');
		var loopLength = doubleClickImgs.length;
		for (var x = 0; x < loopLength; x++) {
			doubleClickImgs[x].addEventListener('dblclick', function() {
				window.open(this.src);
			});
		}
	}
	
	elem.calculateButton.addEventListener('click', function() {
		computeBeepBoop();
		if (randomBetween(1,20) == 1) {
			elem.calculateButton.innerHTML = "Did you know you can automate this?";
		} else {
			elem.calculateButton.innerHTML = "Calculate";
		}
	});
	elem.Section_HallofInfamyCCLs_FilterSortButton.addEventListener('click', function() {
		addHallofInfamyCCLs();
		addDoubleClickImages();
		updateHallDescVis();
		if (randomBetween(1,20) == 1) {
			elem.Section_HallofInfamyCCLs_FilterSortButton.innerHTML = "Discrimination!";
		} else {
			elem.Section_HallofInfamyCCLs_FilterSortButton.innerHTML = "Filter and sort";
		}
	});
	elem.resetGlobalSettingsButton.addEventListener('click', function() {
		if (inputSettings.globalSettings.keepSettingsOnReload == true) {
			inputSettings = {calculatorSettings:{}, miscellaneousSettings:{}, globalSettings:{keepSettingsOnReload:true}};
		} else {
			inputSettings = {calculatorSettings:{}, miscellaneousSettings:{}, globalSettings:{keepSettingsOnReload:false}};
		}
		window.localStorage.setItem('NotorietyEXPCalculator_GlobalSettings', JSON.stringify(inputSettings));
		interpretSavedSettings();
	});
	elem.updateGlobalSettingsButton.addEventListener('click', function() {
		updateSettingsDisplayedValues();
		window.localStorage.setItem('NotorietyEXPCalculator_GlobalSettings', JSON.stringify(inputSettings));
		if (randomBetween(1,100) == 1) {
			elem.updateGlobalSettingsButton.innerHTML = "Any flat earthers in the chat?!";
		} else {
			elem.updateGlobalSettingsButton.innerHTML = "Update all Global Settings";
		}
	});
	elem.updateLogSortButton.addEventListener('click', function() {
		addUpdateLog();
	});
	
	addDoubleClickImages();	
	computeBeepBoop();
	updateHallDescVis();
}());