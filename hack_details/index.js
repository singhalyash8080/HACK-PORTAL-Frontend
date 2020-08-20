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
    console.log("USER LOGGED IN")
    //   window.location.replace("/home_page/index.html");
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        //   console.log(idToken)
        auth_tok += idToken

        // code for getting content


        var label1 = 'Link :'

        var myHeaders = new Headers();
        myHeaders.append("authtoken", auth_tok);

        var raw = "";

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const queryString = window.location.search;
        console.log(queryString);

        var event_ID = ''

        for (let i = 0; i < queryString.length; i++) {
          if (i != 0) {
            event_ID += queryString[i]
          }

        }

        fetch("https://hackportal.herokuapp.com/events/geteventinfo/" + event_ID, requestOptions)
          .then(response => response.json())
          .then(result => {

            console.log(result)


            $(".hack_name").text(result.nameOfEvent)

            $(".venue").text(result.location)

            $(".date").text(result.startDate + ' to ' + result.endDate)
            // $(".date").text(date)

            $(".description").text(result.description)

            $(".label1").text(label1)
            $(".link").html('<a href="https://devsoc.codechefvit.com/">' + result.eventUrl + '</a>')

            $(".invite").append('<button> <a href=' + '../add_team/index.html?' + result._id + '>Create team</a> </button>')

            $('.shapes').append('<img src="' + result.eventImage + '">')

          })
          .catch(error => console.log('error', error));

        // end of code for getting hackathon

      })
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN")
  }
})

$(document).ready(function () {
  $('.sidenav').sidenav();
});

