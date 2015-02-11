window.onload = function() {
  document.getElementById("isClick").onclick = changeSize;
  // document.getElementsByClassName("")
  document.getElementById("isCheck").onclick = changeStyle;
  document.getElementById("modify").onclick = modify;
  document.getElementById("replace").onclick = replace1;
  document.getElementById("replaceY").onclick = replaceTheY;
};

var time;
function changeSize() {
	time = setInterval("setSizeAgain()", 500);
	// $("#textarea").css("font-size", parseInt($("textarea").css('font-size')) + 2 + "pt");
}

function setSizeAgain() {
	$("#textarea").css("font-size", parseInt($("textarea").css('font-size')) + 2 + "pt");
	// if (parseInt($("textarea").css('font-size')) == 24) {

	// }
	// setTimeout(setSizeAgain(), 500);
	if (parseInt($("textarea").css('font-size')) >= 24) {
		clearInterval(time);
	}
}

function changeStyle() {
	if (document.getElementById("isCheck").checked) {
    document.getElementById("textarea").className = "become";
    document.getElementById("background").className= "background";
}
}

function modify() {
	var valueInTextarea = document.getElementById("textarea").value;
	valueInTextarea = valueInTextarea.toUpperCase();
	var parts = valueInTextarea.split(".");
	valueInTextarea = parts.join("-izzle.")
	document.getElementById("textarea").value = valueInTextarea;
}

function replace1() {
	var temp = document.getElementById("textarea").value, temp1;
	var parts = temp.split(/[^a-zA-Z]/);
	for (var i = 0; i < parts.length; i++) {
		if (parts[i].length >= 5) {
			temp1 = temp.replace(parts[i], "Malkovich");
		}
	}
	document.getElementById("textarea").value = temp1	;
}
 
function replaceTheY() {
	var temp = document.getElementById("textarea").value, parts =document.getElementById("textarea").value.split(" ");
	for (var i = 0; i < parts.length; i++) {
		if (parts[i][0].search(/[AaEeIiOoUu]{1}/) == -1) {
			var temp1 ="";
            for (var j = 1; j < parts[i].length; j++)
            	temp1 += parts[i][j];
            temp1 += parts[i][0];
            parts[i] = temp1;
            parts[i] += "-ay";
		} else {
			alert("2");
			parts[i] += "-ay";
		}
	}
	document.getElementById("textarea").value = parts.join(" ");
}

// function delayMsg() {
//   setTimeout(booyah, 5000);
//   $("output").innerHTML = "Wait for it...";
// }

// function booyah() {   // called when the timer goes off
//   $("output").innerHTML = "BOOYAH!";
// }