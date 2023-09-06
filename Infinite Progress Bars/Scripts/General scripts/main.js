(function() {
    document.getElementById('MainSection').innerHTML = "<p style='text-align:center'><span style='font-size:2em'>Infinite Progress Bars, created by TheSeal27#1962 on Discord in under an hour.</span><br>Every power of 10 of progress bars (not floored) reached provides a slightly-increasing 2x boost (calculated as <code>2 ^ log10(x)</code>) to all progress bars! How high can you go?<br>(Note: Does not save.)</p><hr/>";
    document.getElementById('MainSection').innerHTML += "<div id='ProgressBarsSection'></div>";

    // Compute permanent multiplier.
    function StatsTracker(permMulti) {
        this.permMulti = function() {
            return 2 ** Math.log10(progressBars.length);
        }
    }
    const stats = new StatsTracker(),progressBars = [];

    // Increment bar progression.
    function increment() {
        for (var x = 0; x < progressBars.length; x++) {
            if (progressBars[x].amount.greaterThanOrEqualTo(progressBars[x].amountNextLevel)) {
                progressBars[x].amount = progressBars[x].amount.sub(progressBars[x].amountNextLevel);
                progressBars[x].level = progressBars[x].level.add(1);
            }
            if (progressBars[progressBars.length - 1].level.greaterThanOrEqualTo(progressBars[progressBars.length - 1].nextBarReq)) {
                document.getElementById('ProgressBarsSection').innerHTML += createProgressBar();
            }
            progressBars[x].amount = progressBars[x].amount.add(new Decimal(1).times(stats.permMulti()));
        }
    }
    setInterval(increment, 20);

    // Update values.
    function updater() {
        for (var x = 0; x < progressBars.length; x++) {
            document.getElementById('ProgressBarProgression_' + x).innerHTML = progressBars[x].amount.toFixed(3) + '/' + progressBars[x].amountNextLevel + ' (level ' + progressBars[x].level + ')';
        }
    }
    setInterval(updater, 100);

    // Internal progress bar.
    function ProgressBar() {
        this.amount = new Decimal(0);
        this.amountNextLevel = new Decimal(100);
        this.level = new Decimal(0);
        this.nextBarReq = new Decimal(10);
    }

    // UI progress bar.
    function createProgressBar() {
        progressBars.push(new ProgressBar());
        return "<progressbar id='ProgressBar" + (progressBars.length - 1) + "' style='background:rgb(" + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + "'>Progress Bar #" + (progressBars.length) + ": <span id='ProgressBarProgression_" + (progressBars.length - 1) + "'>?</span></progressbar><p/>";
    }
    document.getElementById('ProgressBarsSection').innerHTML = createProgressBar();
}());