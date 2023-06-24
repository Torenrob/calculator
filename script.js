// DOM Elements
let calcTopDisplay = document.getElementById("topDisplay");
calcMainDisplay = document.getElementById("mainDisplay");
calcBtns = Array.from(document.getElementsByClassName("btns"));

//Global Variables
let entry = " ";
let result = "";
let equation = "";

//Global Objects
const makeMath = {
	"+": (z, y) => {
		return z + y;
	},
	"-": (z, y) => {
		return z - y;
	},
	"÷": (z, y) => {
		return z / y;
	},
	"×": (z, y) => {
		return z * y;
	},
};

// DOM Manipulation (Listenters & Dynamic Changes)
calcBtns.forEach((element) => {
	element.addEventListener("click", (btn) => {
		let usrInput = btn.target.innerText;

		if (usrInput == "ce") {
			entry = "";
		} else if (usrInput == "Del") {
			if (entry[entry.length - 1] == " ") {
				entry = entry.slice(0, -3);
			} else {
				entry = entry.slice(0, -1);
			}
		} else if (usrInput == "±") {
			console.log("plus minus sign");
		} else if (usrInput == "=") {
			calcMainDisplay.innerText = `${getEquals(equation)}`;
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

		entry = entry.replaceAll(/(?<!\s)[^0-9\.\s](?!\s)/g, (oper) => {
			return ` ${oper} `;
		});

		equation = entry.replaceAll(" ", "");
		calcTopDisplay.innerText = `${entry}`;
	});
});

// All functions below

// Only one operator at a time
function noDblops(string) {
	str = string.replaceAll(" ", "");
	str = str.substring(str.length - 2);
	if (/[^0-9]{2}/.test(str)) {
		return string.substring(0, string.length - 1);
	} else {
		return string;
	}
}

// confines a string of numbers to one decimal
function oneDecNum(string) {
	let numStrt = string.lastIndexOf(" ");
	curNumb = string.substring(numStrt + 1, string.length - 2);
	if (/\./.test(curNumb)) {
		return string.substring(0, string.length - 1);
	} else {
		return string;
	}
}

function getEquals(eq) {
	let eqRegex = /(\d+\.?\d+)([^\d\.])(\d+\.?\d+)/g;
	eqArr = [];
	firstNum = undefined;
	oper = "";
	secNum = undefined;
	sectionResult = undefined;

	do {
		eqRegex.lastIndex = 0;
		eqArr = [...eq.matchAll(eqRegex)];
		firstNum = +eqArr[0][1];
		oper = eqArr[0][2];
		secNum = +eqArr[0][3];
		sectionResult = makeMath[oper](firstNum, secNum);

		eq = eq.replace(eqArr[0][0], sectionResult);
		eqRegex.lastIndex = 0;
	} while (eqRegex.test(eq));

	return eq;
}
