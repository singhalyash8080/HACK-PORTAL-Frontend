// code for pre-loader

$(document).ready(function () {
  //Preloader
  function hidePreloader() {
    var preloader = $('.spinner-wrapper');
    preloader.fadeOut();
  }

  hidePreloader()
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

var auth_tok = ''

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log("USER LOGGED IN")
    //   window.location.replace("/home_page/index.html");

    if (user.emailVerified == false) {

      window.location.replace("../verify_account/index.html");

    }
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        //   console.log(idToken)
        auth_tok += idToken

        var requestOptions = {
          method: "GET",
          headers: {
            authtoken: auth_tok,
            "Content-Type": "application/json",
          }
        };

        fetch("https://hackportal.herokuapp.com/users/", requestOptions)
          .then((response) => {

            if (response.status == 400) {

              window.location.replace("../create_profile/index.html");

            }

            return response.json();
          })
          .catch(error => {
            // alert(error)
          })

      })
  } else {

    window.location.replace("../index.html");
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})

async function confirm() {

  // console.log($('#team_name').val())
  // console.log($('.txt-inp').val())
  // console.log($('#team_skills').val())

  const queryString = window.location.search;
  // console.log(queryString);
  var event_id = ''

  for (let i = 0; i < queryString.length; i++) {
    if (i != 0) {
      event_id += queryString[i]
    }

  }

  // console.log(event_id)

  var skill_array = []

  for (let i = 1; i <= 9; i++) {
    if ($("#" + i.toString()).is(":checked")) {
      skill_array.push($('#' + i.toString()).val())
    }
  }

  var raw = {
    teamName: $('#team_name').val(),
    eventId: event_id,
    description: $('.txt-inp').val(),
    skillsRequired: skill_array
  }

  // console.log(raw)

  var requestOptions = {
    method: 'POST',
    headers: {
      "authtoken": auth_tok
      , "Content-Type": "application/json"
    },
    body: JSON.stringify(raw)
  };

  await fetch("https://hackportal.herokuapp.com/teams/setteam", requestOptions)
    .then(response => {

      if (response.status == 200) {

        Toastify({
          text: "Your team has been created successfully",
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();

        window.setTimeout(() => window.location.replace("../home_page/index.html"), 2000);

      }

      return response.json()
    })
    .then(result => {

      // if(result.message){

      //   Toastify({
      //     text: result.message,
      //     backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      //     className: "info",
      //   }).showToast();

      // }
    })
    .catch(error => {
      // console.log('error', error)
      // alert(error)
    });
}

