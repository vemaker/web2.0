$(document).ready(function() {
   var div = $("#puzzlearea"), y, append = document.createElement("div");
   append.setAttribute("id", "square_3_3");
   $(append).text("16");
   div.append(append);
   $("#puzzlearea div").each(function() {

      $(this).mouseover(
         function() { // the setStyle function, change the background position of each square
            var id = this.getAttribute("id"), pos = id.split("_"), row = parseInt(pos[1]), col = parseInt(pos[2]);
            if ((row == currentRow - 1 && col == currentCol) || (row == currentRow + 1 && col == currentCol) || (row == currentRow && col == currentCol - 1) || (row == currentRow && col == currentCol + 1)) {
               $("#puzzlearea div").each(function() {
                  this.setAttribute("class", "puzzlepiece")
               });
               this.className = "puzzlepiece movablepiece";
            }
         });

      $(this).click(function() { // when it is clicked and move it! the move function
         var id = this.getAttribute("id"), pos = id.split("_"), row = parseInt(pos[1]), col = parseInt(pos[2]);
         if ((row == currentRow - 1 && col == currentCol) || (row == currentRow + 1 && col == currentCol) || (row == currentRow && col == currentCol - 1) || (row == currentRow && col == currentCol + 1)) {
            var currentId = "#square_" + currentRow + "_" + currentCol,
               number = $(this).text() - 1,
               rowInInnerhtml = parseInt(number / 4),
               colInInnerhtml = parseInt(number % 4),
               y = 0 - colInInnerhtml * 100 + "px",
               x = 0 - rowInInnerhtml * 100 + "px";
            $(currentId).text($(this).text());
            $(this).text("16");
            $(this).css("display", "none");
            $(currentId).css("display", "block");
            $(currentId).css("background-position", y + " " + x);
            currentCol = col;
            currentRow = row;
         }
      });
   });

   setBackgroundAndothers(); //some startup operation

   $("#shufflebutton").click(
      function() { //change to the radom sort
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
            var currentId = "#square_" + currentRow + "_" + currentCol, number = $("#square_" + row + "_" + col).text() - 1,
               rowInInnerhtml = parseInt(number %4), colInInnerhtml = parseInt(number / 4),
               y = 0 - colInInnerhtml * 100 + "px", x = 0 - rowInInnerhtml * 100 + "px";
            $(currentId).css("background-position", x + " " + y); //change the background of the blank square
            $(currentId).text($("#square_" + row + "_" + col).text()); //exchange the innerHTML between the blank and the moveing square
            $("#square_" + row + "_" + col).text("16");
            $("#square_" + row + "_" + col).css("display", "none");
            $(currentId).css("display", "block");
            currentCol = col; //refresh  the blank saqure position
            currentRow = row;
         }
      });
});

var currentRow = 3, //the startup blank square blank position
   currentCol = 3; //the startup background

function setBackgroundAndothers() {
   var Alldiv = $("#puzzlearea div"), i, j;
   for (i = 0; i < Alldiv.length; i++) {
      whichDiv = Alldiv[i];
      var i = parseInt($(whichDiv).text()) - 1;
      whichDiv.setAttribute("id", "square_" + parseInt(i / 4) + "_" + parseInt(i % 4));
      whichDiv.className = "puzzlepiece";
      var moveDivX = parseInt(i % 4) * 100 + "px", moveDivY = 0 - parseInt(i / 4) * 100 + 300 + "px";
      $(whichDiv).css("left", moveDivX);
      $(whichDiv).css("bottom", moveDivY);
      var y = 0 - parseInt(i / 4) * 100 + "px", x = 0 - parseInt(i % 4) * 100 + "px";
      $(whichDiv).css("background-position", x + " " + y);
      if ($(whichDiv).text() == 16) {
         $(whichDiv).css("display", "none"); //the blank could not display
      }
   }
}
