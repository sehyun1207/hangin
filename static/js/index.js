var socket=io()

socket.on('connect', function(){
    var name = prompt('반갑습니다.','')
    if(!name){
        name='tmp'
    }
})

socket.on('update', function(data){
    console.log()
})

var green = document.getElementById('green');
var inp = document.getElementById('ipnut');

var ms = document.getElementById('msg');
var chat = document.getElementById('chat');

inp.onclick = function(){
    var inp_vl = document.getElementById('ipnut').value;
    green.classList.add('Oab');
    if (inp_vl!="") ms.classList.add("nd");

}

function f2(){
    var inp_vl = document.getElementById('ipnut').value;
    green.classList.remove('Oab');
    if (inp_vl=="") ms.classList.remove("nd");
}

function enter(){
    var inp_vl = document.getElementById('ipnut').value;
    
    var ti = new Date();
    var mmsg = "";
    var hour = ti.getHours();
    if (hour>12){
        mmsg="오후 ";
        mmsg+=hour-12+":";
    }
    else {mmsg="오전 "; mmsg+=hour+":";}
    if (inp_vl!=""){
        var box1 = document.createElement('div');
        var txt = document.createTextNode("나"+"  "+inp_vl);
        
        box1.setAttribute('class','word');
        box1.appendChild(txt);
        chat.append(box1);
        
        var box = document.createElement('div');
        var txt = document.createTextNode(mmsg+ti.getMinutes());
        box.setAttribute('class','tim');
        box.appendChild(txt);
        chat.append(box);
    }
    socket.emit('send',inp_vl)
    inp.value="";
    chat.scrollTop = chat.scrollHeight;
}