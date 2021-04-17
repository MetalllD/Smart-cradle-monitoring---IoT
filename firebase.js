////  referencing DOM  /////////////////////////////////////////////////////////////////////////
var tempValue = document.getElementById('tempValue');
var cryingState = document.getElementById('cryingState');
var humidValue = document.getElementById('humidValue');
var fan = document.getElementById('fan');
var swinging = document.getElementById('swinging');
var toy = document.getElementById('toy');
var fanPrev = 0;
var swingPrev = 0;
var toyPrev = 0;
/*Email.send({
    Host : "smtp.gmail.com",
    Username : "mitalkamani500@gmail.com",
    Password : "janetusala",
    To : "mitalkamani500@gmail.com",
    From : "mitalkamani500@gmail.com",
    Subject : "Baby cradle warning",
    Body : "your baby is crying"
}).then(
  message => alert(message)
);*/
////      FUNCTIONS  //////////////////////////////////////////////////////////////////////////////////////
//function to generate random numbers in a range
function randomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}

//function to detect crying
var noiseRandom ,tempRandom, humidRandom = 0;
function detectCrying(int){
    if(int>90){
    return "Yes"
    }
    else{
    return "No"
    }
}
////      SENDIND PART  //////////////////////////////////////////////////////////////////////////////////////
//referencing database
dbsend = firebase.database().ref();
dbsend.set({fan:0,swinging:0})
//sending values to database
function sendData(){

    noise = randomNumber(60, 120); 
    tempRandom = randomNumber(20, 35);
    humidRandom = randomNumber(65, 100);

    if(tempRandom>30){
      fanPrev=1;
    }
    else{
      fanPrev=0;
    }

    if(noise>90){
      swingPrev=1;
    }
    else{
      swingPrev=0;
    }

    dbsend.set({
        toy:toyPrev,
        swinging:swingPrev,
        fan:fanPrev,
        temperature:tempRandom,
        humidity: humidRandom,
        crying:detectCrying(noise) 
    })

    fan.addEventListener('change', function(event) {
        if(event.target.checked){
        console.log("Fan On");
          fanPrev = 1;
          dbsend.set({
              fan:1,
              toy:toyPrev,
              swinging:swingPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
        }
        else{
          fanPrev = 0;
          dbsend.set({
              fan:0,
              toy:toyPrev,
              swinging:swingPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
          console.log("Fan Off");
        }
      });

      swinging.addEventListener('change', function(event) {
        if(event.target.checked){
        console.log("Swinging On");
          swingPrev = 1;
          dbsend.set({
              swinging:1,
              fan:fanPrev,
              toy:toyPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
        }
        else{
          swingPrev = 0;
          dbsend.set({
              swinging:0,
              fan:fanPrev,
              toy:toyPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
          console.log("Swinging Off");
        }
      });


      toy.addEventListener('change', function(event) {
        if(event.target.checked){
        console.log("toy On");
          toyPrev = 1;
          dbsend.set({
              toy:1,
              fan:fanPrev,
              swinging:swingPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
        }
        else{
          toyPrev = 0;
          dbsend.set({
              toy:0,
              fan:fanPrev,
              swinging:swingPrev,
              temperature:tempRandom,
              humidity: humidRandom,
              crying:detectCrying(noise) 
          });
          console.log("toy Off");
        }
      });
      console.log(noise);
}
   


setInterval(sendData,5000);





////      DISPLAYING PART  //////////////////////////////////////////////////////////////////////////////////////
//displaying temperature values to webapp
var dbtemp = firebase.database().ref('temperature/');
dbtemp.on('value',snap =>  tempValue.innerText = snap.val());

//displaying humidity values to webapp
var dbhumid = firebase.database().ref('humidity/');
dbhumid.on('value',snap => humidValue.innerText = snap.val());

//displaying crying values to webapp
var dbcrying = firebase.database().ref('crying/');
dbcrying.on('value',snap => cryingState.innerText = snap.val());

var fanState = firebase.database().ref('/fan');                  
fanState.on("value", function (snap) {
            if(snap.val()==1){
              fan.checked=true;
              fanPrev=1;
            }
            else{
                fan.checked=false;
                fanPrev=0;
            }
    })

var swingState = firebase.database().ref('/swinging');                  
swingState.on("value", function (snap) {
            if(snap.val()==1){
              swinging.checked=true;
              swingPrev=1;
             }
            else{
            swinging.checked=false;
            swingPrev=0;
            }
    })


var toyState = firebase.database().ref('/toy');                  
toyState.on("value", function (snap) {
                if(snap.val()==1){
                  toy.checked=true;
                  toyPrev=1;
            }
            else {
              toy.checked=false;
              toyPrev=0;
        }
        })
    

////// Toggles //////////////////////////////////////////////////////////////////////////////////////////////////
