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

async function updateListReq() {
      try {
          const response = await fetch('/checkReq');
          const text = await response.text();
          document.getElementById('requesterListContent').innerHTML = text;
      } catch (error) {
          console.error('Erro ao atualizar a lista:', error);
      }
  }

  function solicitarPermissaoSom() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Permissão de som concedida.');
                fecharModal();
            });
        } else {
            fecharModal();
        }
    } catch (e) {
        console.error('Erro ao tentar acessar o contexto de áudio:', e);
    }
}

function sendToReceiver(element) {
  element.disabled = true;  // Desabilita o botão para evitar múltiplos cliques
  const requester = document.getElementById('requester').value;
  const msg = document.getElementById('msgRequester').value;

  fetch('/sendToReceiver', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requester: requester,
      msg: msg
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Supondo que o servidor retorne JSON
  })
  .then(data => {
    console.log(data);
    // Aqui você pode adicionar lógica para lidar com a resposta do servidor
    //alert('Mensagem enviada com sucesso!');
    refreshPage()
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Erro ao enviar mensagem, tente novamente.');
  })
  .finally(() => {
    element.disabled = false;  // Reabilita o botão
  });
}

module.exports = {getTimeWait, calcBetweenTime};