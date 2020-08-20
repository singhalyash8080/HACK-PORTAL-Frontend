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

        var name = 'Team name'

        var label1 = 'Hackathon: '
        var label2 = 'Teamsize: '
        var label3 = 'Project Description:'
        var label4 = 'Skills Required:'
        var label5 = 'Team mates: '

        const queryString = window.location.search;
        console.log(queryString);

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
            console.log(result)

            $(".team_name").text(result.teamName)

            $(".label1").text(label1)
            $(".hackathon_name").text(result.nameOfEvent)

            $(".label2").text(label2)
            $(".team_size").text('2/4')

            $(".label3").text(label3)
            $(".description").text(result.description)

            $(".label4").text(label4)
            for (let i = 0; i < result.skillsRequired.length; i++) {
              $(".skills").append('<p class="points">' + result.skillsRequired[i] + '</p>')
            }

            $(".label5").text(label5)
            for (let i = 0; i < result.membersInfo.length; i++) {
              $(".team_mates").append('<p class="points">' + result.membersInfo[i].name + '</p>')
            }

            $(".invite").append('<button> <a href=' + '#' + '>Invite</a> </button>')

          })
          .catch(error => console.log('error', error));

      })
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN")
  }
})

$(document).ready(function () {
  $('.sidenav').sidenav();
});
