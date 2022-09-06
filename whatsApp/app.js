function init() {
    var firebaseConfig = {
        apiKey: "AIzaSyAJ0msrdfpNevjQ5nB98pM-xz0nukvEvPY",
        authDomain: "sohbetprojesi-652ee.firebaseapp.com",
        databaseURL: "https://sohbetprojesi-652ee.firebaseio.com",
        projectId: "sohbetprojesi-652ee",
        storageBucket: "sohbetprojesi-652ee.appspot.com",
        messagingSenderId: "1042234201526",
        appId: "1:1042234201526:web:96996a73aca06d41f09d17"
    };

    firebase.initializeApp(firebaseConfig);

    ref= firebase.database().ref("messages");

    firebase.database().ref("messages").on("child_added", (snaphot) => {
        var html = '';
        if (snaphot.val().sender === myName) {
            html += ' <li class="message mine">';
            html += ' <p class="text">' + snaphot.val().message + ' </p > ';
            html += ' <span class="date">' + tarihCevir(snaphot.val().time) + '</span>';
            html += ' </li>';
        } else {
            html += ' <li class="message">';
            html += ' <p class="text">' + snaphot.val().message + ' </p > ';
            html += ' <span class="date">' + tarihCevir(snaphot.val().time) + '</span>';
            html += ' <span class="sender">' + snaphot.val().sender + '</span>';
            html += ' </li>';
        }
        messages.innerHTML += html;
        messages.scroll({behavior:"smooth",top:99999999999999999999999999999});
    });
}


function sohbeteBasla() {
    myName = nameInput.value;
    if (myName.length > 0) {
        console.log(myName);
        login.classList.add("hidden");
        init();
    }
}


function tarihCevir(stamp){
    var dt =new Date(stamp);
    var s ="0"+ dt.getHours();
    var d = "0"+dt.getMinutes();
    var format = s.substr(-2) +":" +d.substr(-2);
    return format;
}


function mesajGonder(){
    var msg =document.getElementById("myInput").value;
    if(msg.length > 0){
        ref.push().set({
            sender:myName,
            message:msg,
            time:firebase.database.ServerValue.TIMESTAMP
        });
    }
    document.getElementById("myInput").value="";
}


var login = document.querySelector(".login");
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages");
messages.innerHTML ="";
var myName = "";
var ref;