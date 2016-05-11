var timeWork = 1; // minutes
var timeRest = 1; // minutes
var time = 0;
var work = true;
var started = false;


$(document).ready(function() {

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

  function displayHint(){
  console.log("work: " + work);
    var hintstr = "Break!";
    if(work){
      hintstr = "Work!";
    }
    var html = "<p>" + hintstr + "</p>";
    console.log("hintstr: " + hintstr);
    $("#hint").html(html);
  }

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
    var hasStopped = false;
    if (started){
      started = false;
      hasStopped = true;
      clearInterval(interval);
    }
    var val = $(this).attr("value");
    if (val === "minusBreak"){
      if (timeRest > 0){
        timeRest -= 1;
      }
    } else if (val === "plusBreak"){
      timeRest += 1;
    } else if (val === "minusWork"){
      if (timeWork > 0){
        timeWork -= 1;
      }
    } else if (val === "plusWork"){
      timeWork += 1;
    } else if (val === "counterButton" && !hasStopped){
      if (!started){
        if (work){
          time = timeWork * 60;
        } else {
          time = timeRest * 60;
        }
        interval = setInterval(timer, 1000);
      }
    }



    display();

  });

  display();

});
