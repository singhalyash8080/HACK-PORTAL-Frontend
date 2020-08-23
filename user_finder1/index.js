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

var auth_tok=''

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("USER LOGGED IN")
  //   window.location.replace("/home_page/index.html");

    if(user.emailVerified==false){

      window.location.replace("../verify_account/index.html");

    }

    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
      //   console.log(idToken)
          auth_tok+=idToken

          var requestOptions = {
            method: "GET",
            headers: {
              authtoken: auth_tok,
              "Content-Type": "application/json",
            }
          };
  
          fetch("https://hackportal.herokuapp.com/users/", requestOptions)
            .then((response) => {
              return response.json();
            })
            .catch(error=>{
                if(error.message=='email not verified'){
  
                window.location.replace("../create_profile/index.html");
  
                }
            })

      })
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN")
  }
})

$(document).ready(function () {
  $(".sidenav").sidenav();
});

var array = [];

function skill() {

  for (let i = 1; i <= 9; i++) {
    if ($("#" + i.toString()).is(":checked")) {
      array.push($("#" + i.toString()).val());
    }
  }

  var raw = {
    skills: array
  };

  var params = raw
  var queryString = $.param(params);

  console.log(queryString)

  window.location.replace("../user_finder2/index.html?"+queryString);
}