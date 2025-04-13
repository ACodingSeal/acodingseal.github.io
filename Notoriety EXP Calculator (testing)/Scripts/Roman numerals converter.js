function toRoman(input, separator, convertNum) {
	const letters = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
	input = new Decimal(input);
	var inputRemaining = input;
	var output = '';

    // CM, M
    if (inputRemaining.greaterThanOrEqualTo(900) && inputRemaining.lessThan(1000)) {
        inputRemaining = inputRemaining.sub(900);
        output += letters[4] + letters[6];
    } else if (inputRemaining.greaterThanOrEqualTo(1e5)) {
		var thousandCount = inputRemaining.dividedBy(1e3).floor();
		var inputRemaining_a = inputRemaining.dividedBy(1e5).floor().add(1);
        inputRemaining = inputRemaining.sub(thousandCount.times(1e3));
        output += letters[6] + '(' + thousandCount + ')';
	} else if (inputRemaining.greaterThanOrEqualTo(1000)) {
        var inputRemaining_a = inputRemaining.dividedBy(1000).floor();
		output += Array(inputRemaining_a.add(1).toNumber()).join(letters[6]);
        inputRemaining = inputRemaining.sub(inputRemaining_a.times(1000));
    }
	
	if (inputRemaining.greaterThanOrEqualTo(900) && inputRemaining.lessThan(1000)) {
        inputRemaining = inputRemaining.sub(900);
        output += letters[4] + letters[6];
    } else if (inputRemaining.greaterThanOrEqualTo(1000)) {
        var inputRemaining_a = inputRemaining.dividedBy(1000).floor();
		output += Array(inputRemaining_a.add(1).toNumber()).join(letters[6]);
        inputRemaining = inputRemaining.sub(inputRemaining_a.times(1000));
    }

    // CD, D
    if (inputRemaining.greaterThanOrEqualTo(400) && inputRemaining.lessThan(500)) {
        inputRemaining = inputRemaining.sub(400);
        output += letters[4] + letters[5];
    } else if (inputRemaining.greaterThanOrEqualTo(500)) {
        inputRemaining = inputRemaining.sub(500);
        output += letters[5];
    }

    // XC, C
    if (inputRemaining.greaterThanOrEqualTo(90) && inputRemaining.lessThan(100)) {
        inputRemaining = inputRemaining.sub(90);
        output += letters[2] + letters[4];
    } else if (inputRemaining.greaterThanOrEqualTo(100)) {
        var inputRemaining_a = inputRemaining.dividedBy(100).floor().add(1);
        inputRemaining = inputRemaining.sub(inputRemaining_a.sub(1).times(100));
        output += Array(inputRemaining_a.toNumber()).join(letters[4]);
    }
	
	if (inputRemaining.greaterThanOrEqualTo(90) && inputRemaining.lessThan(100)) {
        inputRemaining = inputRemaining.sub(90);
        output += letters[2] + letters[4];
    } else if (inputRemaining.greaterThanOrEqualTo(100)) {
        var inputRemaining_a = inputRemaining.dividedBy(100).floor().add(1);
        inputRemaining = inputRemaining.sub(inputRemaining_a.sub(1).times(100));
        output += Array(inputRemaining_a.toNumber()).join(letters[4]);
    }

    // XL, L
    if (inputRemaining.greaterThanOrEqualTo(40) && inputRemaining.lessThan(50)) {
        inputRemaining = inputRemaining.sub(40);
        output += letters[2] + letters[3];
    } else if (inputRemaining.greaterThanOrEqualTo(50)) {
        inputRemaining = inputRemaining.sub(50);
        output += letters[3];
    }

    // IX, X
    if (inputRemaining.greaterThanOrEqualTo(9) && inputRemaining.lessThan(10)) {
        inputRemaining = inputRemaining.sub(9);
        output += letters[0] + letters[2];
    } else if (inputRemaining.greaterThanOrEqualTo(10)) {
        var inputRemaining_a = inputRemaining.dividedBy(10).floor().add(1);
        inputRemaining = inputRemaining.sub(inputRemaining_a.sub(1).times(10));
        output += Array(inputRemaining_a.toNumber()).join(letters[2]);
    }

    // IX
    if (inputRemaining.equals(9)) {
        inputRemaining = inputRemaining.sub(9);
        output += letters[0] + letters[2];
    }

    // IV, V
    if (inputRemaining.equals(4)) {
        inputRemaining = inputRemaining.sub(4);
        output += letters[0] + letters[1];
    } else if (inputRemaining.greaterThanOrEqualTo(5) && inputRemaining.lessThan(9)) {
        inputRemaining = inputRemaining.sub(5);
        output += letters[1];
    }
	
    // I
    if (inputRemaining.greaterThanOrEqualTo(1)) {
        var inputRemaining_a = inputRemaining.dividedBy(1).floor().add(1);
        inputRemaining = inputRemaining_a.sub(1).times(1);
        output += Array(inputRemaining_a.toNumber()).join(letters[0]);
    }
	
	if (separator != false && input == 0 || (input.lessThan(1e21) && input.toString().match(/\d+/g) !== null && input.toString().match(/[a-z]/gi) !== null)) {
		output = new Decimal(0);
	}
	
	return output;
}
// console.log('expected: MCMXLII');
// console.log(toRoman(1942));

function toRomanWithSeparator(x, y, conversionAllowed, includeSeparator) {
	x = new Decimal(x);
	y = new Decimal(y);
	var output;
	if (conversionAllowed == 1) {
		if (x.greaterThan(0)) {
			if (includeSeparator == true) {
				output = toRoman(x) + '-' + y;
			} else {
				output = toRoman(x);
			}
		} else {
			output = y;
		}
	} else {
		if (x.greaterThan(0)) {
			if (includeSeparator == true) {
				output = x + '-' + y;
			} else {
				output = x;
			}
		} else {
			output = y;
		}
	}
	if (x.greaterThan(0) && conversionAllowed == 1) {
		if (x.greaterThanOrEqualTo(1) && x.lessThan(5)) {
			output = "<span class='NotorietyEXPCalculator_InfamyRanks1to4'>" + output + "</span>";
		} else if (x.greaterThanOrEqualTo(5) && x.lessThan(10)) {
			output = "<span class='NotorietyEXPCalculator_InfamyRanks5to9'>" + output + "</span>";
		} else if (x.greaterThanOrEqualTo(10) && x.lessThan(15)) {
			output = "<span class='NotorietyEXPCalculator_InfamyRanks10to14'>" + output + "</span>";
		} else if (x.greaterThanOrEqualTo(15) && x.lessThan(20)) {
			output = "<span class='NotorietyEXPCalculator_InfamyRanks15to19'>" + output + "</span>";
		} else if (x.greaterThanOrEqualTo(20)) {
			output = "<span class='NotorietyEXPCalculator_InfamyRanks20to25'>" + output + "</span>";
		}
	}
	return output;
}

function fromRoman(input) {
	var output = '';
	var input_a = input;
	var formingNum = new Decimal(0);
	
	if (input_a.match(/M[(].+?(?=[)])/g) !== null) {
		formingNum = formingNum.add(new Decimal(1000).times((input_a.match(/M[(].+?(?=[)])[)]/g)[0].match(/\d+.+?(?=[)])/g)[0])));
		if (input_a.match(/M/g) !== null) {
			formingNum = formingNum.sub(1000);
		}
	}
	
	if (input_a.match(/M/g) !== null) {
		formingNum = formingNum.add(new Decimal(1000).times((input_a.match(/M/g).length)));
		if (input_a.match(/CM/g) !== null) {
			formingNum = formingNum.sub(1000);
		}
	}
	if (input_a.match(/CM/g) !== null) {
		formingNum = formingNum.add(900);
		input_a = input_a.replace(/CM/g, '');
	}
	input_a = input_a.replace(/M/g, '');
	
	if (input_a.match(/CD/g) !== null) {
		formingNum = formingNum.add(400);
		input_a = input_a.replace(/CD/g, '');
	} else if (input_a.match(/D/g) !== null) {
		formingNum = formingNum.add(500);
		input_a = input_a.replace(/D/g, '');
	}
	
	if (input_a.match(/XC/g) !== null) {
		formingNum = formingNum.add(90);
		input_a = input_a.replace(/XC/g, '');
	} else if (input_a.match(/C/g) !== null) {
		formingNum = formingNum.add(new Decimal(100).times((input_a.match(/C/g).length)));
		input_a = input_a.replace(/C/g, '');
	}
	
	if (input_a.match(/XC/g) !== null) {
		formingNum = formingNum.add(90);
		input_a = input_a.replace(/XC/g, '');
	} else if (input_a.match(/C/g) !== null) {
		formingNum = formingNum.add(new Decimal(100).times((input_a.match(/C/g).length)));
		input_a = input_a.replace(/C/g, '');
	}
	
	if (input_a.match(/XL/g) !== null) {
		formingNum = formingNum.add(40);
		input_a = input_a.replace(/XL/g, '');
	} else if (input_a.match(/L/g) !== null) {
		formingNum = formingNum.add(50);
		input_a = input_a.replace(/L/g, '');
	}
	
	if (input_a.match(/X/g) !== null) {
		formingNum = formingNum.add(new Decimal(10).times((input_a.match(/X/g).length)));
		if (input_a.match(/IX/g) !== null) {
			formingNum = formingNum.sub(10);
		}
	}
	if (input_a.match(/IX/g) !== null) {
		formingNum = formingNum.add(9);
		input_a = input_a.replace(/IX/g, '');
	}
	input_a = input_a.replace(/X/g, '');
	
	if (input_a.match(/IV/g) !== null) {
		formingNum = formingNum.add(4);
		input_a = input_a.replace(/IV/g, '');
	} else if (input_a.match(/V/g) !== null) {
		formingNum = formingNum.add(5);
		input_a = input_a.replace(/V/g, '');
	}
	
	if (input_a.match(/I/g) !== null) {
		formingNum = formingNum.add(new Decimal(1).times((input_a.match(/I/g).length)));
		input_a = input_a.replace(/I/g, '');
	}
	
	if (input.toString().match(/\d+/g) !== null && input.toString().match(/[a-z]/gi) !== null) {
		formingNum = new Decimal(0);
	}
	
	output = formingNum;
	return output;
}

// fromRoman('CDLXXVI');

/*
var randomNum = randomBetween(1, 1e6);
var expectedNum = randomNum * (randomNum + 1) / 2
var sum = 0;

for (var x = 1; x < (randomNum + 1); x++) {
	sum += fromRoman(toRoman(x));
}
console.log('Chosen infamy: ' + randomNum);
console.log('Expected: ' + expectedNum);
console.log('Got: ' + sum)
console.log('Match?: ' + (sum == expectedNum))
*/