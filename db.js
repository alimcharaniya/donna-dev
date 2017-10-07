var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var moment = require('moment');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'serviceAccountKey.json';

var token;

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  token = JSON.parse(content);
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function addEvent(auth){
  var event = {
  'summary': 'Askey and Alim',
  'location': '',
  'description': 'Inserted by Donna',
  'start': {
    'dateTime': '2017-10-07T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2017-10-07T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [

  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};


var calendar = google.calendar('v3');
console.log("About to insert to google calendar");
calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}


//Initalize firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://donna-60361.firebaseio.com"
});

console.log("Db.js compiled");

var i = 0;

admin.database().ref('/bookings').limitToLast(1).on('child_added', function(snapshot){
  console.log("BOOKING ADDED!");

  var newEvent = {
    "name":snapshot.val().name,
    "phone":snapshot.val().phone,
    "email": snapshot.val().email,
    "service" : snapshot.val().service,
    "attendant" : snapshot.val().attendant
  };

  var name = snapshot.val().name;
  var phone = snapshot.val().phone;
  var email = snapshot.val().email;
  var attendant = snapshot.val().attendant;
  var service = snapshot.val().service;
  var date = snapshot.val().date;
  var time = snapshot.val().time;
  var notes = snapshot.val().note;

  var eventTitle = name + " for service: " + service;
  console.log(eventTitle);

  authorize(token, addEvent);

  i++;
});
