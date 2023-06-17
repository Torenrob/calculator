// DOM Elements
let calcTopDisplay = document.getElementById("topDisplay");
calcMainDisplay = document.getElementById("mainDisplay");
calcBtns = Array.from(document.getElementsByClassName("btns"));

// Variables
let entry = "";
let result = "";

// DOM Manipulation (Listenters & Dynamic Changes)
calcBtns.forEach((element) => {
	element.addEventListener("click", (btn) => {
		if (btn.target.innerText == "ce") {
			entry = "";
		} else if (btn.target.innerText == "=") {
			console.log("equal");
		} else {
			entry += `${btn.target.innerText}`;
		}
		calcTopDisplay.innerText = `${entry}`;
	});
});

// functions
function getResult(entry) {}
