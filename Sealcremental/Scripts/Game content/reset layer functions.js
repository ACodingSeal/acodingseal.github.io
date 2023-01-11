function reset(layer) {
	switch(layer) {
		case "prestige":
		upgrade1Cost = new Decimal("10");
		upgrade2Cost = new Decimal("250");
		upgrade3Cost = new Decimal("1e6");
		upgrade4Cost = new Decimal("1e15");
		upgrade1Level = new Decimal(0);
		upgrade2Level = new Decimal(0);
		upgrade3Level = new Decimal(0);
		upgrade4Level = new Decimal(0);
		totalMulti = new Decimal(1);
		if (prestigesDone.equals(0)) {
			prestigePointGain = new Decimal(1);
			prestigepoints = prestigepoints.add(prestigePointGain);
		} else {
		prestigePointGain = num.log10().pow(0.9).times(totalPPMulti);
		if (prestigePointGain.isNan()) {
			prestigePointGain = new Decimal(1).times(totalPPMulti);
		}
		prestigepoints = prestigepoints.add(prestigePointGain);
		}
		prestigesDone = prestigesDone.add(1);
		num = new Decimal(0);
		updateNum();
		updateUpgradeData();
		updateStatistics("TotalPrestiges");
		updateStatistics("TotalPP");
		break;
		case "prestigeFirst":
		permMulti = permMulti.times(3);
		reset("prestige");
		break;
		default:
		reset("prestige");
	}
}