window.onload = function() {
   var div = $("puzzlearea"), y, append = document.createElement("div");
   append.setAttribute("id", "square_3_3");
   append.innerHTML = "16";
   div.appendChild(append);
   var allDiv = $$("#puzzlearea div");
   setBackgroundAndothers();      //some startup operation
   for (y = 0; y < allDiv.length; y++) {
      allDiv[y].onmouseover = setStyle;
      allDiv[y].onclick = move;
   }
   $("shufflebutton").onclick = shuttle;
   $("backgroundChange").onclick = changeBackground;
}

var currentRow = 3,  //the startup blank square blank position
   currentCol = 3,
   currentBackground = "background1.jpg", //the startup background
   count = 0; //rember the number of the ways of the user

function setStyle() {  //change the background position of each square
   var id = this.getAttribute("id"),
      pos = id.split("_"),
      row = parseInt(pos[1]),
      col = parseInt(pos[2]);
   if ((row == currentRow - 1 && col == currentCol) || (row == currentRow + 1 && col == currentCol) || (row == currentRow && col == currentCol - 1) || (row == currentRow && col == currentCol + 1)) {
      for (var t = 0; t < $$("#puzzlearea div").length; t++)
         $$("#puzzlearea div")[t].setAttribute("class", "puzzlepiece");
      // alert(this.getAttribute("id"));
      this.className = "puzzlepiece movablepiece";
   }
}


function move() {
   var id = this.getAttribute("id"),
      pos = id.split("_"),
      row = parseInt(pos[1]),
      col = parseInt(pos[2]);
   if ((row == currentRow - 1 && col == currentCol) || (row == currentRow + 1 && col == currentCol) || (row == currentRow && col == currentCol - 1) || (row == currentRow && col == currentCol + 1)) {
      var currentId = "square_" + currentRow + "_" + currentCol;
      var number = this.innerHTML - 1,
      rowInInnerhtml = parseInt(number / 4),
      colInInnerhtml = parseInt(number % 4),
      y = 0 - colInInnerhtml * 100 + "px",
      x = 0 -  rowInInnerhtml * 100 + "px";
      alert(number + x + y);
      $(currentId).innerHTML = this.innerHTML;
      this.innerHTML = "16";
      this.style.display = "none";
      $(currentId).style.display = "block";
      $(currentId).style.backgroundPosition = y + " " + x;
      currentCol = col;
      currentRow = row;
      count++; //the number of the user has used
      $("move").innerHTML = count;
   }
}

$ = function(id) {
   return document.getElementById(id);
};

$$ = function(selector) {
   return document.querySelectorAll(selector);
};



function setBackgroundAndothers() {
   var Alldiv = $$("#puzzlearea div"),
      i, j;
   for (i = 0; i < Alldiv.length; i++) {
      // alert(Alldiv.length);
      whichDiv = Alldiv[i];
      var i = parseInt(whichDiv.innerHTML) - 1;
      whichDiv.setAttribute("id", "square_" + parseInt(i / 4) + "_" + parseInt(i % 4));
      // alert($("square_" + parseInt(i / 4) + "_" + parseInt(i % 4)).getAttribute("id"));
      whichDiv.className = "puzzlepiece";
      var moveDivX = parseInt(i % 4) * 100 + "px",
         moveDivY = 0 - parseInt(i / 4) * 100 + 300 + "px";
      whichDiv.style.left = moveDivX;
      whichDiv.style.bottom = moveDivY;
      var y = 0 - parseInt(i / 4) * 100 + "px",
         x = 0 - parseInt(i % 4) * 100 + "px";
      whichDiv.style.backgroundPosition = x + " " + y;
      if (whichDiv.innerHTML == 16) {
         whichDiv.style.display = "none";//the blank could not display
      }
   }

}

function shuttle() { //change to the radom sort
   var row, col, whichDirection;
   for (var u = 0; u < 200; u++) {
      whichDirection = parseInt(Math.random() * 4); //0 up, 1 down, 2 left, 3 rigth
      if (whichDirection == 0) {
         row = currentRow - 1;
         col = currentCol;
      }
      if (whichDirection == 1) {
         row = currentRow + 1;
         col = currentCol;
      }
      if (whichDirection == 2) {
         row = currentRow;
         col = currentCol - 1;
      }
      if (whichDirection == 3) {
         row = currentRow;
         col = currentCol + 1;
      }
      if (col < 0 || col > 3 || row < 0 || row > 3) //refuse the invalid moving 
         continue;
      var currentId = "square_" + currentRow + "_" + currentCol;
      // if (!$("square_" + row + "_" + col)) {
      //    alert(whichDirection);
      //    alert(currentRow + "" + currentCol);
      //    alert(row + "" + col);
      //    break;
      // }
      var number = $("square_" + row + "_" + col).innerHTML,
      rowInInnerhtml = parseInt(number / 4),
      colInInnerhtml = parseInt(number % 4),
      y = 0 - colInInnerhtml * 100 + "px",
      x = 0 -  rowInInnerhtml * 100 + "px";
      $(currentId).style.backgroundPosition = x + " " + y; //change the background of the blank square
      $(currentId).innerHTML = $("square_" + row + "_" + col).innerHTML; //exchange the innerHTML between the blank and the moveing square
      $("square_" + row + "_" + col).innerHTML = "16";
      $("square_" + row + "_" + col).style.display = "none";
      $(currentId).style.display = "block";
      currentCol = col; //refresh  the blank saqure position
      currentRow = row;
   }
   var time = 1;  //remeber the time
   setTimeout(timeConsuming(time), 1000);
   $("time").innerHTML = "1";
}

function timeConsuming(time) { //remenber the time 
   return function() {
      time++;
      $("time").innerHTML = time;
      setTimeout(timeConsuming(time), 1000);
   }
}

function changeBackground() {    //change the background
   var background = ["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg", "background5.jpg"];
   while (1) {
      var whichBackground = parseInt(Math.random() * 6), //the background selector
         last = "background" + whichBackground + ".jpg",
         all = $$(".puzzlepiece");
      for (var i = 0; i < all.length; i++) {
         if (whichBackground == 1)
            all[i].style.backgroundImage = "url(background1.jpg)";
         if (whichBackground == 2)
            all[i].style.backgroundImage = "url(background2.jpg)";
         if (whichBackground == 3)
            all[i].style.backgroundImage = "url(background3.jpg)";
         if (whichBackground == 4)
            all[i].style.backgroundImage = "url(background4.jpg)";
         if (whichBackground == 5)
            all[i].style.backgroundImage = "url(background5.jpg)";
      }
      if (last == currentBackground)    //if the background is the same, change it again
         continue;
      else {
         currentBackground = last;
         break;
      }
   }
   // setBackgroundAndothers();
}