//referencing DOM 
var tempValue = document.getElementById('tempValue');
var cryingState = document.getElementById('cryingState');
var humidValue = document.getElementById('humidValue');
var fan = document.getElementById('fan');
var swinging = document.getElementById('swinging');
var toy = document.getElementById('toy');

console.log(fan.state);

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

//function to generate noise and detect crying
var noise = randomNumber(60, 120);
console.log(noise);
function detectCrying(int){
    if(int>90)
    return "Yes"
}


////      SENDIND PART  //////////////////////////////////////////////////////////////////////////////////////
//referencing database
dbsend = firebase.database().ref();

//sending values to database
dbsend.set({
    temperature:randomNumber(20, 35),
    humidity:randomNumber(65, 100),
    crying:detectCrying(noise)
})


////      DISPLAYING PART  //////////////////////////////////////////////////////////////////////////////////////
//displaying temperature values to webapp
var dbtemp = firebase.database().ref('temperature/');
dbtemp.on('value',snap => tempValue.innerText = snap.val());

//displaying humidity values to webapp
var dbhumid = firebase.database().ref('humidity/');
dbhumid.on('value',snap => humidValue.innerText = snap.val());

//displaying crying values to webapp
var dbcrying = firebase.database().ref('crying/');
dbcrying.on('value',snap => cryingState.innerText = snap.val());