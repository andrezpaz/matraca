function getTimeWait(dateReg) {
    let time = (new Date() - new Date(dateReg)) /1000;
    console.log(time);
    return time.toFixed(0)
}
function startCounter(source) {
  
    let counter = document.querySelectorAll(".timer-req");
    counter.forEach((element)=>{
      let hours = element.children[0];
      let minutes = element.children[1];
      let seconds = element.children[2];
      let time = element.children[2].innerHTML;
      let interval;
      if (source === 'requester' ) {
        element.className.includes('no-counter') ? insertTimeClock(time, hours, minutes, seconds):
        interval = setInterval(function() {
          ++time;
          insertTimeClock(time, hours, minutes, seconds)
        },1000)
      } else {
        element.className.includes('no-counter') ? insertTimeClock(time, hours, minutes, seconds):
        interval = setInterval(function() {
          ++time;
          insertTimeClock(time, hours, minutes, seconds)
        },1000)
        //play sound
        let existsPend = document.getElementsByClassName("div-container circle-pend");
        if (existsPend[0]) {
          console.log("Pend Found, playing de sound...");
          play_single_audio()
        }
      }
    })
    
  }
function insertTimeClock(time, hours, minutes, seconds) {
    let hour = pad(parseInt(time/3600));
        hours.innerHTML = hour
        minutes.innerHTML = pad(parseInt( (time -hour*3600)/60)); 
        seconds.innerHTML = pad(time % 60);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
function calcBetweenTime(dateStart, dateStop) {
    let time = (new Date(dateStop) - new Date(dateStart))/1000;
    console.log(dateStart)
    return time
    }

function refreshPage(){  
    window.location = window.location.href;
    }

module.exports = {getTimeWait, calcBetweenTime};



