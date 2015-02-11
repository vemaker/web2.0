$(document).ready(function(){
  $("#ascend").click(function() {
  	var allContent = [];
  	alert();
     $("td").each(function(index) {
     	that = this;
     	var str = "" + $(that).text();
         allContent[index] = str;
     });
     allContent.sort();
     	$("td").each(function(index) {
     		var str = "" + allContent[index];
     		$(this).text(str);
     	});
  });
  $("#descend").click(function() {
     var allContent1 = [];
     $("td").each(function(index) {
     	that = this;
     	var str = "" + $(that).text();
         allContent1[index] = str;
     });
     allContent1.sort();
     	$("td").each(function(index) {
     		var str = "" + allContent1[allContent1.length - 1 - index];
     		$(this).text(str);
     	});
  });
});