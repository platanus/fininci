import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


exports.newEvent = functions.firestore
  .document('events/{eventId}')
  .onCreate(async (snap, context) => {

  const event = snap.data();

  const type = event.type;
  const data = event.data;

  var body = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            body += p + '::' + obj[p] + '\n';
        }
    }

  Object.keys(obj).sort()

  const payload = {
    notification: {
      title: 'New Subscriber',
      body: `${subscriber} is following your content!`,
      icon: 'https://goo.gl/Fz9nrQ'
    }
  }

  // ref to the parent document
  const db = admin.firestore()
  const devicesRef = db.collection('devices').where('userId', '==', userId)


  // get users tokens and send notifications

  const devices = await devicesRef.get()

  const tokens = []

  devices.forEach(result => {
    const token = result.data().token;

    tokens.push( token )
  })

  return admin.messaging().sendToDevice(tokens, payload)

});
