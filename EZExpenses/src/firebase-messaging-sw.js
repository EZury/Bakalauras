importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js');

  firebase.initializeApp({
    apiKey: "AIzaSyBcRVxSsUP_DWhqIrjTclKp9EDVWI5C9WY",
    authDomain: "ezexpenses-d96fc.firebaseapp.com",
    databaseURL: "https://ezexpenses-d96fc.firebaseio.com",
    projectId: "ezexpenses-d96fc",
    storageBucket: "ezexpenses-d96fc.appspot.com",
    messagingSenderId: "246095721697",
    appId: "1:246095721697:web:7c5b9f575412751f9733a0",
    measurementId: "G-L0MVYQ5401"
});
  const messaging = firebase.messaging();