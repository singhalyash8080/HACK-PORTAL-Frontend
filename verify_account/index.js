// code for pre-loader

$(document).ready(function() {
  //Preloader
  preloaderFadeOutTime = 5000;
  function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
  });

// end of pre-loader

$(document).ready(function(){
    $('.sidenav').sidenav();
  });


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPKlNwldNx9YCH4el1FFEuMJk1mQpIpp4",
  authDomain: "hackportal-53efe.firebaseapp.com",
  databaseURL: "https://hackportal-53efe.firebaseio.com",
  projectId: "hackportal-53efe",
  storageBucket: "hackportal-53efe.appspot.com",
  messagingSenderId: "945327566569",
  appId: "1:945327566569:web:04739afc0b939fcf658a78",
  measurementId: "G-MTPN0JGL08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("USER LOGGED IN")

    $('.txt-mail').text(user.email)

    $('.verify-account').append('<button onclick="sendEmailVerification()">Send</button><br>')

    if(user.emailVerified==true){
      window.location.replace("../create_profile/index.html")
    }
  }
  else{
    console.log('user not logged in ')
  }
})

function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function () {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}



