var timeWork = 25;    // minutes
var timeRest = 5;     // minutes
var time = 0;         // store time for counting
var work = true;      // if timer is for Work or Break
var started = false;  // if counter has started

$(document).ready(function() {
  
  // Show time chosen for break and for work
  function displaySetTime(id, input){
    var html = "<p>" + input + "</p>";
    var idStr = "#".concat(id);
    $(idStr).html(html);
  }

  // actual timer, either for work or for rest
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

  // show if it's break or work time
  function displayHint(){
    var hintstr = "Break!";
    if(work){
      hintstr = "Work!";
    }
    var html = "<p>" + hintstr + "</p>";
    $("#hint").html(html);
  }

  // call all display functions at once
  function display(){
    displaySetTime("timeBreak", timeRest);
    displaySetTime("timeWork", timeWork);
    if (!started){
      if(work){
        displayTimer("timer", timeWork * 60);
      } else {
        displayTimer("timer", timeRest * 60);
      }
    } else {
      displayTimer("timer", time);
    }
    displayHint();
  }

  function timer(){
    if (time > 0){
      time -= 1;
      started = true;
    } else {
      started = false;
      alert("IT'S TIME!!!!");
      work = !work;
      clearInterval(interval);
    }
    display();
  }

  $("button").click(function() {
    // var to verify if user stops the timer
    var hasStopped = false;
    // when click a button, if the timer is already running, stops
    if (started){
      started = false;
      hasStopped = true;
      clearInterval(interval);
    }
    // when clicking a button, check which button
    var val = $(this).attr("value");
    // add/substract 1 minute to break or work timers
    if (val === "minusBreak"){
      if (timeRest > 0){
        timeRest -= 1;
      }
    } else if (val === "plusBreak"){
      if (timeRest < 59){
        timeRest += 1;
      }
    } else if (val === "minusWork"){
      if (timeWork > 0){
        timeWork -= 1;
      }
    } else if (val === "plusWork"){
      if (timeWork < 59){
        timeWork += 1;
      }
    }
    /*  if timer button has been clicked, and wasn't stopped now
     the timer starts. With hasStopped, I avoid to start the
     timer when I stop*/
    else if (val === "counterButton" && !hasStopped){
      if (!started){
        if (work){
          time = timeWork * 60;
        } else {
          time = timeRest * 60;
        }
        interval = setInterval(timer, 1000);
      }
    }
    // update UI with every click
    display();
  });
  // initial display
  display();
});
