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

function toScientific(e) { // Ensure a user-inputted value is a scientific notation Decimal number.
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

        function notateInt(e) { // Convert a Decimal number to a string and notate it using either locale string (comma-separated numbers), scientific notation with a fixed number of decimals or suffix notation.
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
			} else if (e.greaterThanOrEqualTo(1e3) && e.lessThan(1e6)) {
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

        function getTierImgFilter(x, y) {
            var yOrig = y;
            if (y === 20) {
                y = 10;
            } else if (y > 10) {
                y = y % 10;
            }
            switch (y) {
                case 2:
                    if (yOrig === 12 && (x === 'grid' || x === 'ray' || x === 'star' || x === 'improver')) {
                        result = 'filter: brightness(0) saturate(100%) invert(57%) sepia(66%) saturate(2052%) hue-rotate(1deg) brightness(104%) contrast(105%)';
                    } else {
                        result = 'filter: brightness(0) saturate(100%) invert(99%) sepia(81%) saturate(1346%) hue-rotate(51deg) brightness(102%) contrast(102%)';
                    }
                    break;
                case 3:
                    result = 'filter: brightness(0) saturate(100%) invert(83%) sepia(26%) saturate(926%) hue-rotate(158deg) brightness(105%) contrast(106%)';
                    break;
                case 4:
                    result = 'filter: brightness(0) saturate(100%) invert(70%) sepia(76%) saturate(3938%) hue-rotate(209deg) brightness(104%) contrast(102%)';
                    break;
                case 5:
                    result = 'filter: brightness(0) saturate(100%) invert(57%) sepia(26%) saturate(3346%) hue-rotate(231deg) brightness(101%) contrast(101%)';
                    break;
                case 6:
                    result = 'filter: brightness(0) saturate(100%) invert(64%) sepia(18%) saturate(1687%) hue-rotate(282deg) brightness(101%) contrast(101%)';
                    break;
                case 7:
                    result = 'filter: brightness(0) saturate(100%) invert(64%) sepia(57%) saturate(4545%) hue-rotate(321deg) brightness(115%) contrast(101%)';
                    break;
                case 8:
                    result = 'filter: brightness(0) saturate(100%) invert(77%) sepia(30%) saturate(803%) hue-rotate(333deg) brightness(100%) contrast(102%)';
                    break;
                case 9:
                    result = 'filter: brightness(0) saturate(100%) invert(83%) sepia(64%) saturate(385%) hue-rotate(352deg) brightness(105%) contrast(103%)';
                    break;
                case 10:
                    result = 'filter: brightness(0) saturate(100%) invert(69%) sepia(0%) saturate(71%) hue-rotate(137deg) brightness(98%) contrast(89%)';
                    break;
                default:
                    if (yOrig === 11 && (x === 'grid' || x === 'ray' || x === 'star' || x === 'improver')) {
                        result = 'filter: brightness(0) saturate(100%) invert(18%) sepia(94%) saturate(4965%) hue-rotate(355deg) brightness(87%) contrast(135%)';
                    } else {
                        result = 'filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(267deg) brightness(105%) contrast(101%)';
                    }
            }
            return result;
        }
