(function() {
    document.getElementById('MainSection').innerHTML = "<p style='text-align:center'><span style='font-size:2em'>Infinite Progress Bars, created by TheSeal27#1962 on Discord (release version in under an hour).</span><br>Every 10 levels unlocks a new progress bar, and every log10 of progress bars (not floored) reached provides a slightly-increasing boost (calculated as <code>2 ^ log10(x)</code>) to all progress bars! Reach progress bar 25 to perform a rebirth for a +0.2x boost to progress bar speed! How high can you go?<br>(Note: Does not save.)</p><p id='StatsSection' style='text-align:center'></p><p id='RebirthSection' style='text-align:center'></p><hr/>";
    document.getElementById('MainSection').innerHTML += "<div id='ProgressBarsSection'></div>";

    // Compute progress bar milestone multiplier.
    function StatsTracker(highestBar, rebirths) {
        this.barMulti = function() {
            return 2 ** Math.log10(progressBars.length);
        }
        this.highestBar = new Decimal(0);
        this.rebirths = new Decimal(0);
        this.rebirthMulti = function() {
            return new Decimal(1).add(new Decimal(0.2).times(stats.rebirths));
        }
        this.rebirthReq = new Decimal(25);
    }
    const stats = new StatsTracker(),
        progressBars = [];

    // Increment bar progression.
    function increment() {
        for (var x = 0; x < progressBars.length; x++) {
            if (progressBars[x].amount.greaterThanOrEqualTo(progressBars[x].amountNextLevel)) {
                progressBars[x].level = progressBars[x].level.add(new Decimal(0).add(progressBars[x].amount.dividedBy(100).floor()));
                progressBars[x].amount = progressBars[x].amount.sub(progressBars[x].amountNextLevel.times(progressBars[x].amount.dividedBy(100).floor()));
            }
            if (progressBars[progressBars.length - 1].level.greaterThanOrEqualTo(progressBars[progressBars.length - 1].nextBarReq)) {
                document.getElementById('ProgressBarsSection').innerHTML += createProgressBar();
            }
            progressBars[x].amount = progressBars[x].amount.add(new Decimal(5).times(stats.barMulti()).times(stats.rebirthMulti()));
        }
    }
    setInterval(increment, 100);

    // Update values.
    function updater() {
        for (var x = 0; x < progressBars.length; x++) {
            document.getElementById('ProgressBarProgression_' + x).innerHTML = progressBars[x].amount.toFixed(3) + '/' + progressBars[x].amountNextLevel + ' (level ' + progressBars[x].level + ')';
        }
        document.getElementById('StatsSection').innerHTML = 'Current progress bar: ' + progressBars.length + '<br>Highest progress bar: ' + stats.highestBar + '<br>Rebirths: ' + stats.rebirths + '<br>Total multiplier to amount gain: ' + stats.rebirthMulti().times(stats.barMulti()) + 'x';
        progressBars.length >= stats.rebirthReq ? document.getElementById('RebirthButton').style.display = '' : document.getElementById('RebirthButton').style.display = 'none';
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
        if (progressBars.length >= stats.highestBar) {
            stats.highestBar = stats.highestBar.add(1);
        }
        return "<progressbar id='ProgressBar" + (progressBars.length - 1) + "' style='background:rgb(" + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + "'>Progress Bar #" + (progressBars.length) + ": <span id='ProgressBarProgression_" + (progressBars.length - 1) + "'>?</span></progressbar><p/>";
    }

    // Add a rebirth system.
    function rebirth() {
        if (progressBars.length >= stats.rebirthReq) {
            document.getElementById('MainBody').style.animation = "rebirthAnimation 5s";
            setTimeout(function() {
                document.getElementById('MainBody').style.animation = '';
            }, 5e3);
            setTimeout(function() {
                progressBars.splice(0, progressBars.length);
                stats.rebirths = stats.rebirths.add(1);
                document.getElementById('ProgressBarsSection').innerHTML = createProgressBar();
            }, 1.5e3);
        }
    }

    // Add some HTML.
    document.getElementById('ProgressBarsSection').innerHTML = createProgressBar();
    document.getElementById('RebirthSection').innerHTML = "<resetbutton id='RebirthButton' class='unselectable' style='background:#64ABE5;display:none'>Perform a rebirth!</resetbutton>";
    document.getElementById('RebirthButton').addEventListener('click', function() {
        rebirth();
    });
}());