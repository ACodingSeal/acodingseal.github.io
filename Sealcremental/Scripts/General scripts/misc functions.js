// Reveal the current endgame in the credits section.
document.getElementById('EndgameCredits').addEventListener("click", currentEndgameSpoiler);
function currentEndgameSpoiler() {
	if (document.getElementById('EndgameCredits').getAttribute('class') === 'SpoilerText') {
	document.getElementById('EndgameCredits').setAttribute('class', 'SpoilerTextReveal');
	} else {
		document.getElementById('EndgameCredits').setAttribute('class', 'SpoilerText')
	}
}
// Set the seal background. Temporarily disabled due to poor graphical design.
// document.getElementById("MainBody").setAttribute("style", "color:#FFF;background-image:url('./Sealcremental/Assets/sealbackground1.jpg');background-position:50% 70%");