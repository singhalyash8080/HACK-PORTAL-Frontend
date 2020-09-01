// code for pre-loader

function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut();
}

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

            if (response.status == 404) {

              window.location.replace("../create_profile/index.html")
            }
            return response.json();
          })
          .catch(error => {
            // alert(error)
          })

        const queryString = window.location.search;
        // console.log(queryString);
        var team_id = ''

        for (let i = 0; i < queryString.length; i++) {
          if (i != 0) {
            team_id += queryString[i]
          }

        }

        var myHeaders = new Headers();
        myHeaders.append("authtoken", auth_tok);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://hackportal.herokuapp.com/teams/getteaminfo/" + team_id, requestOptions)
          .then(response => response.json())
          .then(result => {
            // console.log(result)

            // $(".team_name").defaultV(result.teamName)
            document.getElementById('team_name').defaultValue = result.teamName

            document.getElementById('description').defaultValue = result.description

            // $(".label4").text(label4)

            for (let i = 1; i <= 9; i++) {

              var skilz = $('#' + i.toString()).val()

              for (let j = 0; j < result.skillsRequired.length; j++) {


                if (skilz.toLowerCase() == result.skillsRequired[j]) {

                  $('#' + i.toString()).attr('checked', true)
                }

              }

            }

          hidePreloader()

          })
          .catch(error => console.log('error', error));


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
  var team_id = ''

  for (let i = 0; i < queryString.length; i++) {
    if (i != 0) {
      team_id += queryString[i]
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
    eventId: team_id,
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

  await fetch("https://hackportal.herokuapp.com/teams/updateteam/" + team_id, requestOptions)
    .then(response => {

      if (response.status == 200) {

        Toastify({
          text: "Your team has been updated successfully",
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();

        window.setTimeout(() => window.location.replace("../my_teams/index.html"), 2000);

      }

      return response.json()
    })
    .then(result => {
    })
    .catch(error => {
      // console.log('error', error)
      // alert(error)
    });

}

