(function() {
    document.getElementById('MainSection').innerHTML = "<p style='text-align:center'><span style='font-size:2em'>Infinite Progress Bars, created by TheSeal27#1962 on Discord (release version in under an hour).</span><br>Every 10 levels unlocks a new progress bar, and every log10 of progress bars (not floored) reached provides a slightly-increasing boost (calculated as <code>2 ^ log10(x)</code>) to all progress bars! Reach progress bar 25 to perform a rebirth for a +0.2x boost to progress bar speed! How high can you go? (Note: The game may not perform well later on.)<br>(Auto-saves every 10 seconds.)</p><p id='StatsSection' style='text-align:center'></p><p id='RebirthSection' style='text-align:center'></p><p id='ImportExportSection'></p><hr/>";
    document.getElementById('MainSection').innerHTML += "<div id='ProgressBarsSection'></div>";
    document.getElementById('JSRequirementNotice').remove();

    // Compute progress bar milestone multiplier.
    function StatsTracker(highestBar, rebirths) {
        this.barMulti = function() {
            return 2 ** Math.log10(progressBars.length);
        }
        this.currentBar = new Decimal(0);
        this.highestBar = new Decimal(0);
        this.rebirths = new Decimal(0);
        this.rebirthMulti = function() {
            return new Decimal(1).add(new Decimal(0.2).times(stats.rebirths));
        }
        this.rebirthReq = new Decimal(25);
    }
    const stats = new StatsTracker(),
        progressBars = [],
        rENC_k = (14159.26535).toString();

    // Increment bar progression.
    function increment() {
        for (var x = 0; x < progressBars.length; x++) {
            if (progressBars[x].amount.greaterThanOrEqualTo(progressBars[x].amountNextLevel())) {
                progressBars[x].level = progressBars[x].level.add(new Decimal(0).add(progressBars[x].amount.dividedBy(progressBars[x].amountNextLevel()).floor()));
                progressBars[x].amount = progressBars[x].amount.sub(progressBars[x].amountNextLevel().times(progressBars[x].amount.dividedBy(progressBars[x].amountNextLevel()).floor()));
            }
            if (progressBars[progressBars.length - 1].level.greaterThanOrEqualTo(progressBars[progressBars.length - 1].nextBarReq)) {
                document.getElementById('ProgressBarsSection').innerHTML += createProgressBar();
            }
            progressBars[x].amount = progressBars[x].amount.add(new Decimal(2.5).times(stats.barMulti()).times(stats.rebirthMulti()));
        }
    }
    setInterval(increment, 50);

    // Add style to the progress bar. Credit: Various threads on Stack Overflow.
    function invertHex(hex) {
        return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Update values.
    function updater() {
        stats.currentBar.add(1).greaterThan(stats.highestBar) ? stats.highestBar = stats.currentBar.add(1) : null;
        for (var x = 0; x < progressBars.length; x++) {
            var hexFromRGB = rgbToHex(progressBars[x].colour[0], progressBars[x].colour[1], progressBars[x].colour[2]);
			
            document.getElementById('ProgressBarProgression_' + x).innerHTML = progressBars[x].amount.toFixed(3) + '/' + progressBars[x].amountNextLevel() + ' (level ' + progressBars[x].level + ')';
            document.getElementById('ProgressBar' + x).style.background = "linear-gradient(90deg, #" + invertHex(hexFromRGB.replace(/#/, '')) + ' ' + Math.max(0, 100 * progressBars[x].amount / progressBars[x].amountNextLevel()) + '%, ' + hexFromRGB + ' 0%)';
        }
        document.getElementById('StatsSection').innerHTML = 'Current progress bar: ' + progressBars.length + '<br>Highest progress bar: ' + stats.highestBar + '<br>Rebirths: ' + stats.rebirths + '<br>Total speed multiplier: ' + stats.rebirthMulti().times(stats.barMulti()).toFixed(3) + 'x';
        progressBars.length >= stats.rebirthReq ? document.getElementById('RebirthButton').style.display = '' : document.getElementById('RebirthButton').style.display = 'none';
    }
    setInterval(updater, 50);

    // Internal progress bar.
    function ProgressBar(colour) {
        this.amount = new Decimal(0);
        this.amountNextLevel = function() {
            return new Decimal(100).add(new Decimal(10).times(this.id));
        }
        this.level = new Decimal(0);
        this.nextBarReq = new Decimal(10);
        this.colour = [];
        this.id = new Decimal(0);
    }

    // UI progress bar.
    function createProgressBar() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const newBar = new ProgressBar();
        newBar.colour.push(r);
        newBar.colour.push(g);
        newBar.colour.push(b);
        newBar.id = new Decimal(0).add(progressBars.length);
        progressBars.push(newBar);
        stats.currentBar = stats.currentBar.add(1);
        return "<progressbar id='ProgressBar" + (progressBars.length - 1) + "' style='background:rgb(" + r + ',' + g + ',' + b + "'>Progress Bar #" + (progressBars.length) + ": <span id='ProgressBarProgression_" + (progressBars.length - 1) + "'>?</span></progressbar><p/>";
    }

    // Add a rebirth system.
    function rebirth(animation, bypassReq) {
        if (progressBars.length >= stats.rebirthReq || bypassReq === true) {
            function resetLayer_Rebirth() {
                progressBars.splice(0, progressBars.length);
                stats.rebirths = stats.rebirths.add(1);
                document.getElementById('ProgressBarsSection').innerHTML = createProgressBar();
            }
            if (animation === false) {
                resetLayer_Rebirth();
            } else {
                document.getElementById('MainBody').style.animation = "rebirthAnimation 5s";
                setTimeout(function() {
                    document.getElementById('MainBody').style.animation = '';
                }, 5e3);
                setTimeout(function() {
                    resetLayer_Rebirth();
                }, 1.5e3);
            }
        }
    }

    // Add some HTML.
    document.getElementById('ProgressBarsSection').innerHTML = createProgressBar();
    document.getElementById('RebirthSection').innerHTML = "<resetbutton id='RebirthButton' class='unselectable' style='background:#64ABE5;display:none'>Perform a rebirth!</resetbutton>";
    document.getElementById('RebirthButton').addEventListener('click', function() {
        rebirth();
    });

    function hardReset() {
        rebirth(false, true);
        stats.currentBar = new Decimal(0);
        stats.highestBar = new Decimal(0);
        stats.rebirths = new Decimal(0);
    }

    // Add a saving system.
    function importSave(saveString) {
        if (saveString !== undefined && (window.localStorage.InfiniteProgressBarsSaveString !== 'undefined' || window.localStorage.InfiniteProgressBarsSaveString !== '')) {
            hardReset();
            if (saveString === undefined) {
                saveString = decrypt(rENC_k, window.localStorage.InfiniteProgressBarsSaveString.replace(/InfiniteProgressBars_SaveString___/, ''));
            } else {
                saveString = decrypt(rENC_k, saveString.replace(/InfiniteProgressBars_SaveString___/, ''));
            }

            function findInString(content, matchSecondary, returnLength) {
                if (matchSecondary === undefined) {
                    matchSecondary = 0;
                }
                const regex = new RegExp(content + '[=].+', 'g');
                const stage1 = saveString.match(regex)[0];
                const stage2 = stage1.match(/\d+[.]*\d*[e]*\d*/g);
                var result;
                returnLength === true ? result = stage2 : result = stage2[matchSecondary];
                return result;
            }
            const progressBarLevels = [];
            for (var y = 0; y < findInString('barLevels', null, true).length; y++) {
                progressBarLevels.push(findInString('barLevels', y));
            }
			
            for (var x = 0; x < progressBarLevels.length; x++) {
                document.getElementById('ProgressBarsSection').innerHTML += createProgressBar();
            }

            for (var x = 0; x < progressBarLevels.length; x++) {
                progressBars[x].level = new Decimal(progressBarLevels[x]);
            }

            stats.highestBar = new Decimal(findInString('highestBar'));
            stats.rebirths = new Decimal(findInString('rebirths'));
        }
    }

    // Credit for encryption/decryption functions: Stack Overflow.
    function encrypt(key, value) {
        var result = "";
        for (i = 0; i < value.length; ++i) {
            result += String.fromCharCode(key[i % key.length] ^ value.charCodeAt(i));
        }
        return result;
    }

    function decrypt(key, value) {
        var result = "";
        for (i = 0; i < value.length; ++i) {
            result += String.fromCharCode(key[i % key.length] ^ value.charCodeAt(i));
        }
        return result;
    }

    function exportSave(output) {
        var saveString = '';
        saveString += 'currentBar=' + stats.currentBar + '_-_';
        saveString += 'highestBar=' + stats.highestBar + '_-_';
        saveString += 'rebirths=' + stats.rebirths + '_-_';
        saveString += 'barLevels=';
        const progressBarLevels = [];
        for (var x = 0; x < progressBars.length; x++) {
            progressBarLevels.push(progressBars[x].level);
        }
        saveString += progressBarLevels.join('_');
        if (output === true) {
            document.getElementById('SaveStringInput').value = "InfiniteProgressBars_SaveString___" + encrypt(rENC_k, saveString);
        } else {
            return "InfiniteProgressBars_SaveString___" + encrypt(rENC_k, saveString);
        }
    }

    function saveGame(auto) {
        window.localStorage.InfiniteProgressBarsSaveString = exportSave();
        if (auto === true) {
            console.log('Successfully auto-saved string: ' + window.localStorage.InfiniteProgressBarsSaveString);
        }
    }

    document.getElementById('ImportExportSection').innerHTML = "Import/export save string:<p><textarea placeholder='Save string goes here...' id='SaveStringInput'></textarea><br><button id='ImportSaveButton'>Import</button><button id='ExportSaveButton'>Export</button><button id='ManualSaveButton'>Manual Save</button></p>";
    document.getElementById('ImportSaveButton').addEventListener('click', function() {
        if (document.getElementById('SaveStringInput').value !== '') {
            importSave(document.getElementById('SaveStringInput').value);
        }
    });
    document.getElementById('ExportSaveButton').addEventListener('click', function() {
        exportSave(true);
    });
    document.getElementById('ManualSaveButton').addEventListener('click', function() {
        var x = exportSave();
        window.localStorage.InfiniteProgressBarsSaveString = x;
        console.log('Successfully manually saved string: ' + x);
    });

    setInterval(function() {
        saveGame(true);
    }, 1e4);
    importSave(window.localStorage.InfiniteProgressBarsSaveString);
}());