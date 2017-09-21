var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'serviceAccountKey.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), addEvent);
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
  'summary': 'Inserted by Donna',
  'location': '',
  'description': '',
  'start': {
    'dateTime': '2017-09-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2017-09-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=1'
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
// console.log("About to insert to google calendar");
// calendar.events.insert({
//   auth: auth,
//   calendarId: 'primary',
//   resource: event,
// }, function(err, event) {
//   if (err) {
//     console.log('There was an error contacting the Calendar service: ' + err);
//     return;
//   }
//   console.log('Event created: %s', event.htmlLink);
// });
}

//Initalize firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://donna-60361.firebaseio.com"
});

console.log("Db.js compiled");

var i = 0;
admin.database().ref('/bookings').limitToLast(1).on('value', function(snapshot){
  console.log("VALUE CHANGED IN DATABASE");
  var lastAdded = snapshot.val();
  console.log(lastAdded);
  console.log(i);
  i++;
})
