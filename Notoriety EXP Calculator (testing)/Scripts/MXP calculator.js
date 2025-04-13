function calcMXPReq(settings, input) {
	input.currentRank = new Decimal(input.currentRank);
	input.goalRank = new Decimal(input.goalRank);
	input.remainingMXP = new Decimal(input.remainingMXP);
	input.extraMXP = new Decimal(input.extraMXP);
	
	const formula = function(x) { return new Decimal(5000).add(new Decimal(x).pow(1.25)).floor()};
	// Math.floor(5000 + (x ** 1.25))
	var output = null;
	if (input.remainingMXP == null || input.remainingMXP == undefined || input.remainingMXP.greaterThan(formula(input.currentRank)) || input.remainingMXP.lessThanOrEqualTo(0)) {
		input.remainingMXP = formula(input.currentRank);
	}
	
	if (settings.untilMXP == true) {
		if (input.remainingMXP == null || input.remainingMXP.greaterThan(formula(input.currentRank)) || input.remainingMXP.lessThanOrEqualTo(0)) {
			input.remainingMXP = formula(input.currentRank);
		}
		
		output = {extraRanks:new Decimal(0), newRank:new Decimal(0), totalMXP:new Decimal(0), leftoverMXP:new Decimal(0), nextRankRemainingReq:new Decimal(0)};
		var totalMXP = new Decimal(0);
		var extraMXP_a = input.extraMXP;
		
		
		// add total MXP until current rank and current MXP
		for (var x = 0; input.currentRank.greaterThan(x); x++) {
			totalMXP = totalMXP.add(formula(x));
		}
		var mxpTowardsNextRank = formula(input.currentRank).sub(formula(input.currentRank).min(input.remainingMXP)).abs();
		totalMXP = totalMXP.sub(mxpTowardsNextRank);
		extraMXP_a = extraMXP_a.add(mxpTowardsNextRank);
		
		var sum = new Decimal(0);
		
		// add remaining ranks based on remaining MXP
		for (var x = 0; extraMXP_a.greaterThanOrEqualTo(formula(input.currentRank.add(x))); x++) {
			output.extraRanks = output.extraRanks.add(1);
			var amount = formula(input.currentRank.add(x));
			sum = sum.add(amount);
			extraMXP_a = extraMXP_a.sub(amount);
			if (x >= 1e12) {
				// capped at rank 1e12 for performance reasons
				break;
			}
		}
		output.newRank = input.currentRank.add(output.extraRanks);
		
		output.totalMXP = output.totalMXP.add(totalMXP);
		output.leftoverMXP = output.leftoverMXP.add(extraMXP_a);
		output.nextRankRemainingReq = formula(output.newRank).sub(output.leftoverMXP);
	} else {
		const reqs = [new Decimal(0), new Decimal(0)];
		for (var x = 0; input.currentRank.greaterThan(x); x++) {
			if (input.currentRank.notEquals(0)) {
				reqs[0] = reqs[0].add(formula(x));
			}
		}
		for (var x = 0; input.goalRank.greaterThan(x); x++) {
			reqs[1] = reqs[1].add(formula(x));
		}
		
		output = reqs[1].sub(reqs[0]);
		
		output = output.sub(formula(input.currentRank).sub(formula(input.currentRank).min(input.remainingMXP)).abs());
		output = output.toLocaleString();
	}
	return output;
}