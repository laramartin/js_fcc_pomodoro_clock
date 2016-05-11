var timetoWork = 1; // minutes
var timeToRest = 1; // minutes
var workLeft = 60; //seconds
var breakLeft = 60; //seconds
var time = 5;
//var interval = "";
var work = true;
var start = true;

$(document).ready(function() {

  function displaySetTime(id, input){
    var html = "<p>" + input + "</p>";
    var idStr = "#".concat(id);
    $(idStr).html(html);
  }

  function displayTimer(id, input){
    var sec = input % 60;
    var min = (input - sec) / 60;
    if (sec >= 0 && sec < 9){
      sec = "0".concat(sec);
    }
    var html = "<p>" + min + ":" + sec + "</p>";
    var idStr = "#".concat(id);
    $(idStr).html(html);
  }

  function workOrBreak(status){
    if (work){
      time = workLeft;
    } else {
      time = breakLeft;
    }
    displayTimer("timer", time);
  }

  $("button").click(function() {
    var val = $(this).attr("value");
    if (val === "minusBreak"){
      if (timeToRest > 0){
        timeToRest -= 1;
        breakLeft -= 60;
        displaySetTime("timeBreak", timeToRest);
      }
    } else if (val === "plusBreak"){
      timeToRest += 1;
      breakLeft += 60;
      displaySetTime("timeBreak", timeToRest);
    } else if (val === "minusWork"){
      if (timetoWork > 0){
        timetoWork -= 1;
        workLeft -= 60;
        time = workLeft
        displaySetTime("timeWork", timetoWork);
        displayTimer("timer", time);
      }
    } else if (val === "plusWork"){
      timetoWork += 1;
      workLeft += 60;
      time = workLeft
      displaySetTime("timeWork", timetoWork);
      displayTimer("timer", time);
    } else if (val === "counterButton"){
      if (start){
        interval = setInterval(function(){
          if (time > 0){
            time -= 1;
            displayTimer("timer", time);
            start = false;
            work = true;
          } else {
            start = true;
            clearInterval(interval);
            alert("BREAK TIME!!!!");
            work = false;
          }
        }, 1000);
      } else { // when timer is stopped
        start = true;
        clearInterval(interval);
      }
    }

  });


  displaySetTime("timeBreak", timeToRest);
  displaySetTime("timeWork", timetoWork);
  displayTimer("timer", time);



  /*
  while (workLeft !== 0){
    setInterval(function() {
      // method to be executed;
      timetoWork -= 1;
      displaySetTime("timeWork", timetoWork);
    }, 1000);
  }*/
});
