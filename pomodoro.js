var timetoWork = 1; // minutes
var timeToRest = 1; // minutes
var workLeft = 60; //seconds
var breakLeft = 60; //seconds

$(document).ready(function() {

  function displaySetTime(id, input){
    var html = "<p>" + input + "</p>";
    var idStr = "#".concat(id);
    $(idStr).html(html);
  }

  $("button").click(function() {
    var val = $(this).attr("value");
    if (val === "minusBreak"){
      if (timeToRest > 0){
        timeToRest -= 1;
        displaySetTime("timeBreak", timeToRest);
      }
    }
    else if (val === "plusBreak"){
      timeToRest += 1;
      displaySetTime("timeBreak", timeToRest);
    }
    else if (val === "minusWork"){
      if (timetoWork > 0){
        timetoWork -= 1;
        displaySetTime("timeWork", timetoWork);
      }
    }
    else if (val === "plusWork"){
      timetoWork += 1;
      displaySetTime("timeWork", timetoWork);
    }
  });


  displaySetTime("timeBreak", timeToRest);
  displaySetTime("timeWork", timetoWork);
});
