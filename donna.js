const {Wit, log} = require('node-wit');
var io = require('socket.io')(3500);

const client = new Wit({accessToken: 'A6QUE5LJ2R2IZMXNAHF577CFF4IMRVSN'});
var services = ["Haircut", "Haircut and Beard Trim", "The Gentlemens Cut", "Shave"];

var moment = require('moment');



/*
1 - Ask for service. Get service name.
2 - Did you get the date, time or assistant?
3 - Get what you need

*/


//set up socket io
io.on('connect',function(socket){
  console.log("Socket connected!");

  var newAppointment = {
    name : null,
    phone : null,
    email : null,
    service : null,
    date : null,
    time : null,
    attendant : null
  }

  socket.on("userMessage", function(message){
    client.message(message, {})
    .then((data) => {

      console.log("Entities are: " + JSON.stringify(data));

      if(data.entities.service_type){
        var s = data.entities.service_type[0].value;

        newAppointment.service = s; //Set new appointment service

        console.log(data.entities.service_type[0].value);
        var res = ("Ok. When do you want a " + s + "?");
        socket.emit("donnaReply", res);
      }

      if(data.entities.datetime){
        var dt = data.entities.datetime[0].value;
        console.log(moment(dt).isValid());
        var t = moment(dt).format("dddd, MMMM Do YYYY, h:mm:ss a");

        newAppointment.date = t; //Set new appointment date

        var res = "Sounds good! Choose a time for t from the menu below. ";
        socket.emit("donnaReply", res);
      }

      if(data.entities.contact){
        var c = data.entities.contact[0].value;

        newAppointment.attendant = c;

        console.log(data.entities.contact[0].value);
      }

      //extract user action intent
      if(data.entities.intent){
        console.log(data.entities.intent[0].value);
      }

    })
    .catch(console.error);
  })
})

console.log("Donna ready to listen....")
