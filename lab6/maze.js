window.onload = function() {
	var allDiv = $$("div.boundary");
	for (var whichDiv = 0; whichDiv < allDiv.length; whichDiv++) {
		hashappened = allDiv[whichDiv].onmouseover = becomeRed;
	}
	$("end").onmouseover = win;
	$("start").onclick = reset;
	$("maze").onmouseover = set_isInMaze;
	$("start").onmouseover = set_isFromStart;
};

var InMaze = false, isFromStart = false, isLose = false;

$ = function(id) {
	return document.getElementById(id);
};

$$ = function(selector) {
	return document.querySelectorAll(selector);
};

function set_isFromStart(event) {
    isFromStart = true;
    event.stopPropagation();
}

function set_isInMaze(event) {
	InMaze = true;
    event.stopPropagation();
}

function win() {
	if (InMaze && isFromStart)
		$("status").innerHTML = "You win!";
	else {
		alert("you cheat in the game!");
	}
}

function becomeRed(event) {
	var allDiv = $$("div.boundary");
	isLose = true;
	for (var i = 0; i < allDiv.length; i++)
		allDiv[i].style.background = "red";
	$("status").innerHTML = "You lose!";
}

function reset() {
	// $("status").innerHTML = "Move your mouse over the "S" to begin.";
	InMaze = false;
	isFromStart = true;
	isLose = false;
	var allDiv = $$(".boundary");
	for (var i = 0; i < allDiv.length; i++) {
		allDiv[i].style.background = "#eeeeee";
	}
}