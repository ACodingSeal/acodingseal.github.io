const settings = {decimals:3, notationType:'scientific'};

function log(b, n) {
    return Math.log(n) / Math.log(b);
}

// formatDate created by: https://stackoverflow.com/users/361684/gilly3
// formatDate(new Date("2024-08-15"), 'dd/MM/yyyy')
function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};

function convertUTCDateToLocal(date) {
	date = new Date(date);
	var plusOrMinus = date.getTimezoneOffset() > 0 ? 'plus' : 'minus';
	if (plusOrMinus == 'plus') {
		return new Date(date.getTime() - (Math.abs(date.getTimezoneOffset()) * 60 * 1e3))
	} else {
		return new Date(date.getTime() + (Math.abs(date.getTimezoneOffset()) * 60 * 1e3))
	}
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function colourPercentage(col, amount) {
	const divider = col.length;
	for (var x = 0; x < col.length; x++) {
		if (amount.greaterThanOrEqualTo(100)) {
			return col[col.length - 1];
		} else if (amount.greaterThanOrEqualTo(0 + (100 / divider * x)) && amount.lessThan(0 + (100 / divider * (x + 1)))) {
			return col[x];
		}
	}
}

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
	var suffixStatus = settings.notationType,
	decimals = settings.decimals;
	if (suffixStatus != 'suffixed') {
		suffixStatus = false;
	} else {
		suffixStatus = true;
	}
            function checkNoDecimal(x) {
                x = new Decimal(x);
				if (x.lessThan(1.797693134862315907729305190789e308)) {
                    if (Math.round(x.mantissa) == new Decimal(x.mantissa).toStringWithDecimalPlaces(5) && x.greaterThanOrEqualTo(1)) {
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
					if (Number(result).toString().length != result.length) {
						result = Number(result); // removes any extra unnecessary zeroes
					}
                } else {
                    result = x.toStringWithDecimalPlaces(decimals);
                }
                return result;
            }
            e = new Decimal(e);
			if (e.equals(Infinity)) {
				result = 'Infinity';
			} else if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e12)) {
                result = Number(e).toLocaleString(); // If the input is equal to at least 1e3 and less than 1e12, return the input with comma-separated numbers.
            } else if (e.greaterThanOrEqualTo(1e12) && e.lessThan(new Decimal("1e" + suffixes.length * 3)) && suffixStatus === true) {
                extraZeroes = e.exponent % 3;
                result = checkNoDecimal(e.mantissa * (10 ** extraZeroes)) + "" + suffixes[Math.floor(e.exponent / 3)]; // If the input is at least 1e6 and is less than the length of the suffixes array's zero count times 3 and suffix notation is enabled, return the input converted to suffix notation.
            } else if (e.greaterThanOrEqualTo(1e12) && e.lessThan('1e1e3')) {
                e = new Decimal(e.mantissa.toFixed(3) + "e" + e.exponent);
                if ((e.mantissa).toString() === "9.999999999999") {
                    result = "1e" + e.exponent;
                } else {
                    result = checkNoDecimal(e.mantissa) + "e" + e.exponent; // If the input is at least 1e12, less than 1e21 and suffix notation is not enabled, return the input converted to scientific notation.
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
                        console.log('testing: ' + result);
                        break;
                    default:
                        result = decimalMax(checkNoDecimal(e.mantissa) % 10, 1) + 'e' + notateInt(checkNoDecimal(e.exponent)); // Modification of the above: If the exponent is less than 1e6, return the mantissa with a fixed decimal length plus the exponent with comma-separated numbers.
                }
            } else {
                result = checkNoDecimal(e); // If none of the above apply, return the input with a fixed decimal length.
            }
            return result;
        }
        // suffixStatus = false;
        // var testing = new Decimal('1e9.5e6').times(1e30).dividedBy(3).times(2).times(1.5);
        // console.log(notateInt(testing));
        // console.log(testing.mantissa);

        function decimalMin(x, y) { // Return the lowest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = y;
            } else {
                result = x;
            }
            return result;
        }

        function decimalMax(x, y) { // Return the largest of two Decimal inputs.
            x = new Decimal(x);
            y = new Decimal(y);
            if (x.greaterThanOrEqualTo(y)) {
                result = x;
            } else {
                result = y;
            }
            return result;
        }

        function checkPlural(input, singular, plural) { // Return singular or plural string based on the value of the input.
            input = new Decimal(input);
            if (input.equals(1)) {
                result = singular;
            } else {
                result = plural;
            }
            return result;
        }


/* To-do (current timer version):
(1) Code optimisations.
(2) Add support for additional amount increment, rather than one second per second.
(3) Add maximum time names to be outputted (useful when, for instance, milliseconds become irrelevant).
(4) Add a loop feature, including min and max amount and max iterations.
*/

// NEW TIMER (based on Date object) (Mostly complete)
function Timer(amount, interval, direction, max, editHTML) {
	const orig = this;
	this.amount = 0;
	this.interval = interval;
	this.direction = 'up';
	this.max = max;
	this.editHTML = editHTML;
	var increaseTime = null;
	
	var time_Earlier = Date.now();
	this.delta = function() {
		var now = Math.abs(Date.now());
		var earlier = Math.abs(time_Earlier);
		return (Math.max(now, earlier) - Math.min(now, earlier));
	}
	
	const secondsConversion = [1, 1e3, 6e4, 3.6e6, 8.64e7, 6.048e8, 2.592e9, 31557600000, 315576000000, 3155760000000, 31557600000000, 2190728592000000];
	const timeAcronyms_shorter = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'de', 'c', 'mi', 'noup'];
	const timeAcronyms = ['mil', 'sec', 'min', 'hr', 'dy', 'wk', 'mth', 'yr', 'dec', 'cen', 'mlnm', 'noupdate'];
	const timeNames = ['Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade', 'Century', 'Millennium', 'Notoriety Update Interval'];
	const timeNamesPlural = ['Milliseconds', 'Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years', 'Decades', 'Centuries', 'Millennia', 'Notoriety Update Intervals'];
	
	this.startTimer = function() {
		this.stopTimer();
		 increaseTime = setInterval(function() {
			 setTimeout(function() {
				 time_Earlier = Date.now();
			 }, 1);
			 if (orig.max !== undefined && orig.max !== null) {
				 if (orig.amount < orig.max) {
					 switch (orig.direction) {
						 case 'down':
						 orig.amount -= orig.delta();
						 break;
						 default:
						 orig.amount += orig.delta();
					 }
				 } else {
					 orig.amount = orig.max;
				 }
			 } else {
				 switch (orig.direction) {
					case 'down':
					orig.amount -= orig.delta();
					break;
					default:
					orig.amount += orig.delta();
				}
			 }
			 if (editHTML !== undefined && editHTML !== null) {
				 editHTML.innerHTML = orig.formatAmount();
			 }
			 // console.log(orig.formatAmount());
		}, orig.interval);
	}
	this.stopTimer = function() {
		clearInterval(increaseTime);
	}
	
	this.formatAmount = function(config) {
		if (config == undefined) {
			config = {};
		}
		if (config.outputFormat == undefined) {
			config.outputFormat = 'words';
		}
		if (config.includedTimeNames == undefined) {
			config.includedTimeNames = ['ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'de', 'c', 'mi', 'noup'];
		}
		if (config.includedTimeNames != undefined) {
			var output = '';
			const entries = {};
			
			var loopLength = timeAcronyms_shorter.length;
			for (var x = 0; x < loopLength; x++) {
				entries[timeAcronyms_shorter[x]] = 0;
			}
			var excludeNext = false;
			var carryOverAmount = 0;
			
			// Check each time amount.
			var amount_abs = Math.max(0, Math.abs(orig.amount)); // In case of negative numbers. Note: Despite adding Math.abs, a max function with 0 as a parameter was also added, with it being used instead.
			// console.log(amount_abs);
			
			for (var i = loopLength - 2; i > 0; i--) {
				// console.log(entries[timeAcronyms_shorter[i]], extraAmountToNext);
				// console.log(amount_abs % secondsConversion[i +
				// excludeNext = false;
				// console.log(timeAcronyms_shorter[i]);
				// console.log('acronym: ', timeAcronyms_shorter[i]);
				// console.log('carryOverAmount: ', carryOverAmount);
				
				var temp_01 = amount_abs / secondsConversion[i]; // simple division result
				var temp_02 = Math.trunc(temp_01); // quantity of this current time name
				var temp_03 = temp_01 * (secondsConversion[i] / secondsConversion[i - 1]); // next lower time name's quantity equivalent
				var temp_04 = (temp_01 - temp_02) * (secondsConversion[i] / secondsConversion[i - 1]); // next lower time name's quantity equivalent, accounting for carry over
				
				var moduloThis = temp_01;
				var lastAmount = 0;
				if (amount_abs >= secondsConversion[i]) {
					// console.log('acronym + moduloThis: ', timeAcronyms_shorter[i], moduloThis);
					if (config.includedTimeNames.indexOf(timeAcronyms_shorter[i].toLowerCase()) != -1) {
						// if carryOverAmount can be added to this time value, then...
						if (carryOverAmount == 0) {
							carryOverAmount = moduloThis;
						}
						lastAmount = carryOverAmount;
						entries[timeAcronyms_shorter[i]] += Math.trunc(carryOverAmount);
						amount_abs -= (Math.trunc(carryOverAmount) * secondsConversion[i]);
						carryOverAmount = 0;
						// console.log(carryOverAmount);
					} else {
						/*
						// if not adding carryOverAmount to this time value, then...
						console.log(true);
						carryOverAmount += (lastAmount - Math.trunc(lastAmount)) * (secondsConversion[i] / secondsConversion[i - 1]);
						console.log(carryOverAmount);
						
						// carryOverAmount += temp_04;
						// amount_abs -= Math.floor(carryOverAmount * secondsConversion[i]);
						// carryOverAmount = Math.floor(carryOverAmount);
						// amount_abs = amount_abs * (secondsConversion[i] / secondsConversion[i - 1]);
						// excludeNext = true;
						*/
					}
				}
			}
			// replaced with the above loop
			/*
			if (amount_abs >= secondsConversion[3]) {
				if (config.includedTimeNames.indexOf(timeAcronyms_shorter[3].toLowerCase()) != -1) {
					if (removeCurrentAmount == false) {
						entries.h += Math.floor((amount_abs % secondsConversion[4]) / secondsConversion[3]);
					}
					removeCurrentAmount = false;
				} else {
					entries.m += Math.floor((amount_abs % secondsConversion[4]) / secondsConversion[3] * (secondsConversion[3] / secondsConversion[2])) - entries.m;
					removeCurrentAmount = true;
				}
			}
			if (amount_abs >= secondsConversion[2]) {
				if (config.includedTimeNames.indexOf(timeAcronyms_shorter[2].toLowerCase()) != -1) {
					if (removeCurrentAmount == false) {
						entries.m += Math.floor((amount_abs % secondsConversion[3]) / secondsConversion[2]);
					}
					removeCurrentAmount = false;
				} else {
					entries.s += Math.floor((amount_abs % secondsConversion[3]) / secondsConversion[2] * (secondsConversion[2] / secondsConversion[1])) - entries.s;
					removeCurrentAmount = true;
				}
			}
			if (amount_abs >= secondsConversion[1]) {
				if (config.includedTimeNames.indexOf(timeAcronyms_shorter[1].toLowerCase()) != -1) {
					if (removeCurrentAmount == false) {
						entries.s += Math.floor((amount_abs % secondsConversion[2]) / secondsConversion[1]);
					}
					removeCurrentAmount = false;
				} else {
					entries.ms += Math.floor((amount_abs % secondsConversion[2]) / secondsConversion[1] * (secondsConversion[1] / secondsConversion[0])) - entries.ms;
					removeCurrentAmount = true;
				}
			}
			*/
			// console.log(amount_abs);
			if (config.includedTimeNames.indexOf(timeAcronyms_shorter[0].toLowerCase()) != -1) {
				if (amount_abs >= secondsConversion[0]) {
					if (amount_abs < 100) {
						if (['digital'].indexOf(config.outputFormat) != -1) {
							entries.ms = '0' + (amount_abs).toFixed(0);
						} else {
							entries.ms = (amount_abs).toFixed(0);
						}
					} else if (amount_abs % 10 !== 0) {
						entries.ms = (amount_abs).toFixed(0) + '0';
					} else {
						entries.ms = (amount_abs).toFixed(0);
					}
				} else {
					entries.ms = 0;
				}
			}
			
			function zeroPadding(input) {
				var output_a = '';
				Number(input) < 10 ? output_a = '0' + input : output_a = input;
				return output_a;
			}
			function checkPluralTime(input, unit) {
				var output_a = '';
				Number(input) == 1 ? output_a = timeNames[timeAcronyms_shorter.indexOf(unit)].toLowerCase() : output_a = timeNamesPlural[timeAcronyms_shorter.indexOf(unit)].toLowerCase();
				return output_a;
			}
			
			const entries_output = [];
			const output_array = [];
			const reorderedTimeAcronyms = [];
			
			var loopLength = Object.keys(entries).length;
			switch (config.outputFormat) {
				case 'digital':
					for (var x = 0; x < loopLength; x++) {
						if (config.includedTimeNames.indexOf(Object.keys(entries)[x]) != -1) {
							entries_output.push(entries[Object.keys(entries)[x]]);
							reorderedTimeAcronyms.push(Object.keys(entries)[x]);
						}
					}
					// Example: 03:50:270 (minutes, seconds, milliseconds)
					if (amount_abs < secondsConversion[2]) {
						output += '00:';
					}
					if (amount_abs < secondsConversion[1]) {
						output += '00:';
					}
					output += entries_output.join(':');
				break;
				case 'words':
					// Example: 3 minutes, 50 seconds, 270 milliseconds
					for (var x = 0; x < loopLength; x++) {
						if (config.includedTimeNames.indexOf(Object.keys(entries)[x]) != -1) {
							entries_output.push(entries[Object.keys(entries)[x]]);
							reorderedTimeAcronyms.push(Object.keys(entries)[x]);
						}
					}
					for (var i = 0; i < entries_output.length; i++) {
						// console.log(Number(entries_output[i]));
						/*
						if (Number(entries_output[i]) < 0 && entries_output.length <= i) {
							output_array.push("Less than 1 millisecond");
						} else */
						if (Number(entries_output[i]) != 0 && i < entries_output.length) {
							output_array.push(entries_output[i].toLocaleString() + ' ' + checkPluralTime(entries_output[i], reorderedTimeAcronyms[i]));
						}
					}
					output_array.reverse();
					output = output_array.join(', ');
				break;
				case 'wordsShort':
					// Example: 3min50sec270msec
					for (var x = 0; x < loopLength; x++) {
						if (config.includedTimeNames.indexOf(Object.keys(entries)[x]) != -1) {
							entries_output.push(entries[Object.keys(entries)[x]]);
							reorderedTimeAcronyms.push(Object.keys(entries)[x]);
						}
					}
					for (var i = 0; i < entries_output.length; i++) {
						/*
						if (Number(entries_output[i]) == 0 && i < entries_output.length) {
							output_array.push("Under 1msec");
						} else */
						if (Number(entries_output[i]) != 0 && i < entries_output.length) {
							output_array.push(entries_output[i] + ' ' + timeAcronyms[i]);
						}
					}
					// output_array.reverse();
					output = output_array.join(', ');
				break;
				case 'wordsShorter':
					// Example: 3m50s270ms
					for (var x = 0; x < loopLength; x++) {
						if (config.includedTimeNames.indexOf(Object.keys(entries)[x]) != -1) {
							entries_output.push(entries[Object.keys(entries)[x]]);
							reorderedTimeAcronyms.push(Object.keys(entries)[x]);
						}
					}
					for (var i = 0; i < entries_output.length; i++) {
						/* if (Number(entries_output[i]) == 0 && i < entries_output.length) {
							output_array.push("<1ms");
						} else */
						if (Number(entries_output[i]) != 0 && i < entries_output.length) {
							output_array.push(entries_output[i] + timeAcronyms_shorter[i]);
						}
					}
					// output_array.reverse();
					output = output_array.join('');
			}
			return output;
		}
	}
}

// var timerTest = new Timer(0, 12.175, 1e2, 'digital', 'up', 1e6, document.getElementById('toc'));