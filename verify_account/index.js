// code for pre-loader

function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut();
}


// end of pre-loader

$(document).ready(function () {
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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log("USER LOGGED IN")

    $('.txt-mail').text(user.email)

    $('.verify-account').append('<button onclick="sendEmailVerification()">Send</button><br>')

    if (user.emailVerified == true) {
      window.location.replace("../create_profile/index.html")
    }
  }
  else {
    window.location.replace("../index.html");
    // console.log('user not logged in ')
  }

  hidePreloader()
})

function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function () {
    // Email Verification sent!
    // [START_EXCLUDE]
    // alert('Email Verification Sent!');

    Toastify({
      text: "Email Verification Sent!",
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      offset: {
        y: 50 
      },
      className: "info",
    }).showToast();
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}




