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
		return +z + +y;
	},
	"-": (z, y) => {
		return +z - +y;
	},
	"÷": (z, y) => {
		return +z / +y;
	},
	"×": (z, y) => {
		return +z * +y;
	},
};

// DOM Manipulation (Listenters & Dynamic Changes)
calcBtns.forEach((element) => {
	element.addEventListener("click", function btnSelect(btn) {
		let usrInput = btn.target.innerText;

		if (usrInput == "ce") {
			entry = "";
			makeDisplay(entry);
		} else if (usrInput == "Del") {
			if (entry[entry.length - 1] == " ") {
				entry = entry.slice(0, -3);
				makeDisplay(entry);
			} else {
				entry = entry.slice(0, -1);
				makeDisplay(entry);
			}
		} else if (usrInput == "±") {
			console.log("plus minus sign");
		} else if (usrInput == "=") {
			makeDisplay(entry, getEquals(entry));
		} else {
			if (/[0-9]/.test(usrInput)) {
				entry += `${usrInput}`;
				makeDisplay(entry);
			} else if (/\./.test(usrInput)) {
				entry += `${usrInput}`;
				entry = noDblops(entry);
				entry = oneDecNum(entry);
				makeDisplay(entry);
			} else {
				entry += `${usrInput}`;
				entry = noDblops(entry);
				makeDisplay(entry);
			}
		}
	});
});

// All functions below

function makeDisplay(entry, result = "") {
	entry = entry.replaceAll(/(?<!\s)[^0-9\.\s](?!\s)/g, (oper) => {
		return ` ${oper} `;
	});
	calcMainDisplay.innerText = result != "" ? result : entry;
	calcTopDisplay.innerText = result != "" ? entry : result;
}

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
	eq = eq.trim().replaceAll(/(?<!\s)[^0-9\.\s](?!\s)/g, (oper) => {
		return ` ${oper} `;
	});
	let eqArr = eq.split(" ");
	let firstNum = NaN;
	oper = "";
	secNum = NaN;
	sectionResult = NaN;

	Number.prototype.countDecimals = function () {
		if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
		return this.toString().split(".")[1].length || 0;
	};

	do {
		firstNum = eqArr[0];
		oper = eqArr[1];
		secNum = eqArr[2];
		sectionResult = makeMath[oper](firstNum, secNum);

		eqArr.splice(0, 3, sectionResult);
	} while (eqArr.length > 1);
	return eqArr[0].countDecimals() > 3 ? eqArr[0].toFixed(3) : eqArr[0];
}
