var data = {preMoneyCapCheck: 0, cheaperPassCheck: 0};

function calcInfamyMoneyReq_v2(base, goal, cheaperInf, moneyCurrentNGain, preMoneyReqLimit) {
		base = new Decimal(base);
		goal = new Decimal(goal);
		moneyCurrentNGain[0] = new Decimal(moneyCurrentNGain[0]);
		moneyCurrentNGain[1] = new Decimal(moneyCurrentNGain[1]);
		// bools possibly not needed?
        const bools = [
            [0, 1][cheaperInf],
            [0, 1][preMoneyReqLimit]
        ];
        cheaperInf = bools[0];
        preMoneyReqLimit = bools[1];
		const infDiff = goal.sub(base).abs();

        function calcSingle(x) {
			x = new Decimal(x);
            var calcSingleRes = new Decimal();
            if (preMoneyReqLimit == true) {
				calcSingleRes = new Decimal(1e6).times(20).times(new Decimal(25).min(x))
				.add(new Decimal(1e6).times(new Decimal(20).times(new Decimal(0).max(x.sub(25)))))
				.add(new Decimal(10).times(new Decimal(0).max(x.sub(25)).times(new Decimal(0).max(x.sub(25)).add(1)).dividedBy(2)))
            } else {
				calcSingleRes = new Decimal(20).times(new Decimal(25).min(x))
				.add(new Decimal(875).min(new Decimal(20).times(new Decimal(0).max(x.sub(25)))
				.add(new Decimal(10).times(new Decimal(0).max(x.sub(25)).times(new Decimal(0).max(x.sub(25)).add(1)).dividedBy(2))))
				.add(new Decimal(125).times(new Decimal(0).max(x.sub(36))))
				).times(1e6)
            }
            calcSingleRes = calcSingleRes.sub(moneyCurrentNGain[1]);
            return calcSingleRes;
        }

        var result = calcSingle(goal).sub(calcSingle(base));
        if (cheaperInf == true) {
            result = result.times(0.5);
        }

        var resultWithMoneyGain = new Decimal(0);
        if (moneyCurrentNGain[1].notEquals(0) && moneyCurrentNGain !== undefined) {
            resultWithMoneyGain = result.sub(moneyCurrentNGain[0]);
            resultWithMoneyGain = ((result.sub(moneyCurrentNGain[0])).dividedBy(infDiff));
            resultWithMoneyGain = resultWithMoneyGain.times(infDiff);
        } else {
            resultWithMoneyGain = result;
        }
        return resultWithMoneyGain;
}
	
function calcInfamiesUntilPoor(currentInf, moneyCurrentNGain) {
	currentInf = new Decimal(currentInf);
	moneyCurrentNGain[0] = new Decimal(moneyCurrentNGain[0]);
	moneyCurrentNGain[1] = new Decimal(moneyCurrentNGain[1]);

    function binarySearch(low, high, target, tolerance, moneyCurrentValue) {
        function calculateValue(x, moneyCurrentValue) {
            var output = null;
            if (data.preMoneyCapCheck == 1) {
                output = (
                    new Decimal(1e6).times(20).times(new Decimal(25).min(x))
				.add(new Decimal(1e6).times(new Decimal(20).times(new Decimal(0).max(x.sub(25)))))
				.add(new Decimal(10).times(new Decimal(0).max(x.sub(25)).times(new Decimal(0).max(x.sub(25)).add(1)).dividedBy(2)))
                );
            } else {
                output = (
                    new Decimal(20).times(new Decimal(25).min(x))
				.add(new Decimal(875).min(new Decimal(20).times(new Decimal(0).max(x.sub(25)))
				.add(new Decimal(10).times(new Decimal(0).max(x.sub(25)).times(new Decimal(0).max(x.sub(25)).add(1)).dividedBy(2))))
				.add(new Decimal(125).times(new Decimal(0).max(x.sub(36))))
				).times(1e6)
                );
            }

            if (data.cheaperPassCheck == 1) {
                output = output.times(0.5);
            }
            output = output.sub(moneyCurrentValue);
            return output;
        }
        var loops = new Decimal(0);
        while (low.lessThan(high)) {
            // recently added math min number max value to mid:
            const mid = new Decimal(Number.MAX_VALUE).min((low.add(high))).dividedBy(2);
            const calculatedValue = calculateValue(mid, moneyCurrentValue);

            if (calculatedValue.sub(target).abs().lessThan(tolerance)) {
                return mid;
            }

            if (calculatedValue.lessThan(target)) {
                low = mid.add(tolerance);
            } else {
                high = mid.sub(tolerance);
            }

			// stops at 1e6 for performance reasons
            if (loops.greaterThanOrEqualTo(1e6)) {
                break;
            }
            loops = loops.add(1);
        }

        return low;
    }

    function calcAffordableInf(currentInf, moneyTotalCurrent) {
        const low = new Decimal(0),
            high = new Decimal(Number.MAX_VALUE),
            tolerance = new Decimal(0.00000000001);

        var resFromZero = calcInfamyMoneyReq_v2(new Decimal(0), currentInf, data.cheaperPassCheck, [new Decimal(0), new Decimal(0)], data.preMoneyCapCheck);
        var result = binarySearch(low, high, moneyTotalCurrent[0].add(moneyTotalCurrent[1]), tolerance, 0).sub(currentInf);
        var testingRes = calcInfamyMoneyReq_v2(currentInf, currentInf.add(result.ceil()), data.cheaperPassCheck, [moneyTotalCurrent[0], moneyTotalCurrent[1]], data.preMoneyCapCheck);

        var remainingGainsAfterCost = new Decimal(0);
        var remainingAffordabilityUntilNext = new Decimal(1).sub(result.sub(result.trunc()));
        var nextCost = calcInfamyMoneyReq_v2(currentInf.add(result.floor()), currentInf.add(result).add(1), data.cheaperPassCheck, [new Decimal(0), new Decimal(0)], data.preMoneyCapCheck).times(remainingAffordabilityUntilNext);
        var totalPassiveInfs = new Decimal(0);

        if (moneyTotalCurrent[1].notEquals(0) && moneyTotalCurrent[1].greaterThanOrEqualTo(testingRes.abs())) {
            result = (moneyTotalCurrent[1].greaterThanOrEqualTo(resFromZero.add(testingRes))) ? result.ceil() : result.floor();
        } else {
            result = (testingRes.equals(0)) ? new Decimal(0) : result;
        }

        return result;
    }

    var currentMoney = moneyCurrentNGain[0];
    var testingAvgGains = moneyCurrentNGain[1];
    var totalMoneyUntilCurrent = calcInfamyMoneyReq_v2(new Decimal(0), currentInf, data.cheaperPassCheck, [new Decimal(0), new Decimal(0)], data.preMoneyCapCheck)
    var affordHowMany = (calcAffordableInf(currentInf, [totalMoneyUntilCurrent, currentMoney, testingAvgGains]));
    var totalCost = calcInfamyMoneyReq_v2(currentInf, affordHowMany.add(currentInf).floor(), data.cheaperPassCheck, [currentMoney, new Decimal(0)], data.preMoneyCapCheck);
	var remainingMoney = currentMoney.sub(totalCost);
	remainingMoney = testingAvgGains.times(affordHowMany.floor()).add(remainingMoney);
	
	var totalInfamiesFromPassive = new Decimal(0);
    var totalExtraCostFromPassive = new Decimal(0);

    var maxMoneyReqWithLimit = new Decimal(125e6);
    if (data.cheaperPassCheck == 1) {
        maxMoneyReqWithLimit = maxMoneyReqWithLimit.times(0.5);
    }
	
    // 1e6 (previously 1e6 & 50) should be a high enough number for sufficient accuracy while still being performance efficient on any device or browser
    for (var i = 0; i < 1e6; i++) {
        if (data.preMoneyCapCheck == 0 && testingAvgGains.greaterThanOrEqualTo(maxMoneyReqWithLimit)) {
            totalInfamiesFromPassive = new Decimal(Infinity);
            break;
        } else {
			var nextPassiveCostCheck = calcInfamyMoneyReq_v2(currentInf.add(affordHowMany.floor().add(totalInfamiesFromPassive)), currentInf.add(affordHowMany.floor()).add(totalInfamiesFromPassive.add(1)), data.cheaperPassCheck, [remainingMoney, new Decimal(0)], data.preMoneyCapCheck);
			
			if (remainingMoney.greaterThanOrEqualTo(nextPassiveCostCheck)) {
				totalInfamiesFromPassive = totalInfamiesFromPassive.add(1);
				remainingMoney = remainingMoney.sub(nextPassiveCostCheck);
				totalExtraCostFromPassive = totalExtraCostFromPassive.add(nextPassiveCostCheck);
				remainingMoney = remainingMoney.add(testingAvgGains);
			} else {
				break;
			}
        }
    }
	
    var affordHowManyWithPassiveGains = affordHowMany.add(totalInfamiesFromPassive.floor());
	
	const outputObj = {
		infs: affordHowMany.floor(),
		passiveInfs: totalInfamiesFromPassive,
		infsWithPassive: affordHowManyWithPassiveGains.floor(),
		reachInf: currentInf.add(affordHowManyWithPassiveGains).floor(),
		totalCost: totalCost,
		totalCostWithPassive: totalExtraCostFromPassive.add(totalCost),
		remainingMoney: remainingMoney.floor(),
	}
	
	return outputObj;

}