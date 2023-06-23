// DOM Elements
let calcTopDisplay = document.getElementById("topDisplay");
calcMainDisplay = document.getElementById("mainDisplay");
calcBtns = Array.from(document.getElementsByClassName("btns"));

// Variables
let entry = " ";
let result = "";
let operInds = [];

// DOM Manipulation (Listenters & Dynamic Changes)
calcBtns.forEach((element) => {
	element.addEventListener("click", (btn) => {
		let usrInput = btn.target.innerText;
		if (usrInput == "ce") {
			entry = "";
		} else if (usrInput == "=") {
			console.log("equal");
		} else {
			if (/[0-9]/.test(usrInput)) {
				entry += `${usrInput}`;
			} else if (/\./.test(usrInput)) {
				entry += `${usrInput}`;
				entry = noDblops(entry);
				entry = oneDecNum(entry);
			} else {
				entry += `${usrInput}`;
				entry = noDblops(entry);
			}
		}
		entry = entry.replaceAll(/(?<!\s)[^0-9\.\s](?!\s)/g, (x) => {
			return ` ${x} `;
		});
		console.log(entry);
		calcTopDisplay.innerText = `${entry}`;
	});
});

// functions
function noDblops(string) {
	str = string.replaceAll(" ", "");
	str = str.substring(str.length - 2);
	if (/[^0-9]{2}/.test(str)) {
		return string.substring(0, string.length - 1);
	} else {
		return string;
	}
}

function oneDecNum(string) {
	let numStrt = string.lastIndexOf(" ");
	curNumb = string.substring(numStrt + 1, string.length - 2);
	if (/\./.test(curNumb)) {
		return string.substring(0, string.length - 1);
	} else {
		return string;
	}
}

function getEquals(equation) {}
