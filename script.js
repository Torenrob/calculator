let calcTopDisplay = document.getElementById("topDisplay");
calcMainDisplay = document.getElementById("mainDisplay");
calcBtns = Array.from(document.getElementsByClassName("btns"));

calcBtns.forEach((element) => {
	element.addEventListener("click", (btn) => {
		console.log(btn.target);
	});
});
