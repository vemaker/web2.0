window.onload = function() {
	startAmination();
	document.getElementById("stop").onclick = staticAmination;
	document.getElementById("start").onclick = walkAmination;
	document.getElementById("changeSize").onclick = changeSize;
	// document.getElementById("select").onchange = animationChange;
	document.getElementById("turbo").onclick = changeInterval;
	// document.getElementsByClassName("")
	// document.getElementById("isCheck").onclick = changeStyle;
	// document.getElementById("modify").onclick = modify;
	// document.getElementById("replace").onclick = replace1;
	// document.getElementById("replaceY").onclick = replaceTheY;
};

var time, interval = 200;

function changeInterval() {
	if (document.getElementById("turbo").checked)
		interval = 50;
	else
		interval = 200;
}

// function animationChange() {
// 	clearTimeout(time);
// 	walkAmination();
// }

function startAmination() {
	document.getElementById("stop").disabled = true;
	document.getElementById("displayarea").value = blank;
}

function changeSize() {
	var which = document.getElementsByName('cc');
	for (var i = 0; i < which.length; i++) {
		if (which[i].checked) {
			if (which[i].value == "small")
				document.getElementById("displayarea").className = "small";
			if (which[i].value == "medium")
				document.getElementById("displayarea").className = "medium";
			if (which[i].value == "large")
				document.getElementById("displayarea").className = "large";
		}
	}
}

function staticAmination() {
	document.getElementById("select").disabled = false;
	clearTimeout(time);
	document.getElementById("stop").disabled = true;
	if (document.getElementById("select").value == "Blank")
		document.getElementById("displayarea").value = blank;
	if (document.getElementById("select").value == "Exercise")
		document.getElementById("displayarea").value = exercise;
	if (document.getElementById("select").value == "Juggler")
		document.getElementById("displayarea").value = juggler;
	if (document.getElementById("select").value == "Dive")
		document.getElementById("displayarea").value = dive;
	if (document.getElementById("select").value == "Bike") {
		document.getElementById("displayarea").value = bike;
		// alert();
	}
	// document.getElementById("displayarea").value = ;

}

function walkAmination() {
	document.getElementById("select").disabled = true;
	document.getElementById("stop").disabled = false;
	if (document.getElementById("select").value == "Exercise") {
		var count = 0;
		setTimeout(exercise1(count), interval);
	}
	if (document.getElementById("select").value == "Juggler") {
		var count = 0;
		setTimeout(juggler1(count), interval);
	}
	if (document.getElementById("select").value == "Dive") {
		var count = 0;
		setTimeout(dive1(count), interval);
	}
	if (document.getElementById("select").value == "Bike") {
		var count = 0;
		setTimeout(bike1(count), interval);
	}
	// document.getElementById("displayarea").value = ANIMATIONS["Exercise"];
}

function exercise1(count) {
	return function() {
		var parts = exercise.split("=====");
		if (count == parts.length)
			count = 0;
		document.getElementById("displayarea").value = parts[count];
		count++;
		time = setTimeout(exercise1(count), interval);
	};
}

function juggler1(count) {
	return function() {
		var parts = juggler.split("=====");
		if (count == parts.length)
			count = 0;
		document.getElementById("displayarea").value = parts[count];
		count++;
		time = setTimeout(juggler1(count), interval);
	};
}

function bike1(count) {
	return function() {
		var parts = bike.split("=====");
		if (count == parts.length)
			count = 0;
		document.getElementById("displayarea").value = parts[count];
		count++;
		time = setTimeout(bike1(count), interval);
	};
}

function dive1(count) {
	return function() {
		var parts = dive.split("=====");
		if (count == parts.length)
			count = 0;
		document.getElementById("displayarea").value = parts[count];
		count++;
		time = setTimeout(dive1(count), interval);
	};
}


// ANIMATIONS["Blank"] = "";
// ANIMATIONS["Exercise"] = exercise;
// ANIMATIONS["Juggler"] = juggler;
// ANIMATIONS["Bike"] = bike;
// ANIMATIONS["Dive"] = dive;