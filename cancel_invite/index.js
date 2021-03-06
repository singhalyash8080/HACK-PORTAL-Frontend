// code for pre-loader

function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut();
}

// end of pre-loader

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems,{edge:'right'});
})

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
        // console.log(idToken)
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

              window.location.replace("../create_profile/index.html");

            }

            return response.json();
          })
          .catch(error => {
            // alert(error)
          })

        // code for getting content

        var label1 = 'Email:'
        var label2 = 'University name:'
        var label3 = 'Year of graduation:'
        var label4 = 'Description:'
        var label5 = 'Skills:'
        var label6 = 'Github link: '
        var label7 = 'Stackoverflow link: '
        var label8 = 'Website: '
        var label9 = 'Team invited to :'

        const queryString = window.location.search;

        // console.log(queryString)

        var array2 = decodeURI(queryString).split('&')

        // console.log(array2)
        var final = []

        for (let i = 0; i < array2.length; i++) {
          var x = ''
          var start = 9

          if (i == 0) {
            start = 10
          }
          for (let j = start; j < array2[i].length; j++) {
            x += array2[i][j]
          }
          final.push(x)
        }

        // console.log(final)

        var id = (final[2].split('='))[1]



        var requestOptions = {
          method: "GET",
          headers: {
            authtoken:
              auth_tok,
            "Content-Type": "application/json",
          }
        };

        fetch("https://hackportal.herokuapp.com/users/" + id, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((result) => {

            $(".name").text(result.name)

            $(".label1").text(label1)
            $(".email").text(result.email)

            $(".label2").text(label2)
            $(".university").text(result.college)

            $(".label3").text(label3)
            $(".year").text(result.expectedGraduation)

            $(".label4").text(label4)
            $(".description").text(result.bio)

            $(".label5").text(label5)
            for (let i = 0; i < result.skills.length; i++) {
              $(".skills").append('<p class="points">' + result.skills[i] + '</p>')
            }

            $(".label6").text(label6)

            if(result.githubLink!=undefined){
            $(".github").html('<a href=' + result.githubLink + '>' + result.githubLink + '</a>')
            }
            else{
            $(".github").html('<a href="#" style="text-decoration:none;">-</a>')
            }

            $(".label7").text(label7)

            if(result.stackOverflowLink!=undefined){
            $(".stackoverflow").html('<a href=' + result.stackOverflowLink + '>' + result.stackOverflowLink + '</a>')
            }
            else{
            $(".stackoverflow").html('<a href="#" style="text-decoration:none;">-</a>')

            }

            $(".label8").text(label8)

            if(result.externalLink!=undefined)
            {$(".website").html('<a href=' + result.externalLink + '>' + result.externalLink + '</a>')
            }
            else{

              $(".website").html('<a href="#" style="text-decoration:none;">-</a>')
            }

            $(".label9").text(label9)
            $(".team_invited_to").text(final[1])

            $(".invite").append('<button onclick="cancelInvite()" class="up cancel-invite"> <a href="' + '#' + '" style="text-decoration:none;">Cancel Invite</a> </button>')

          hidePreloader()

          })
          .catch(err => {
            // console.log(err)
          })

      })
  } else {

    window.location.replace("../index.html");
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})

function cancelInvite() {

  const queryString = window.location.search;

  // console.log(queryString)

  var array2 = decodeURI(queryString).split('&')

  // console.log(array2)
  var final = []

  for (let i = 0; i < array2.length; i++) {
    var x = ''
    if (i == 0) {
      for (let k = 8; k < array2[i].length; k++) {
        x += array2[i][k]
      }

      final.push(x)
    }
    else if (i == 2) {

      for (let k = 10; k < array2[i].length; k++) {
        x += array2[i][k]
      }

      final.push(x)

    }


  }

  // console.log(final)

  var raw = {
    teamId: final[0],
    inviteeId: final[1]
  }

  // console.log(raw)


  var requestOptions = {
    method: 'POST',
    headers: {
      authtoken:
        auth_tok,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  fetch("https://hackportal.herokuapp.com/teams/cancelinvite", requestOptions)
    .then(response => {

      if (response.status == 200) {

        Toastify({
          text: "Invite cancelled",
          duration:1000,
          backgroundColor: "linear-gradient(to right,#3D5A80, #507093,#7393B0)",
          offset: {
            y: 50 
          },
          className: "info",
        }).showToast();

        window.setTimeout(() => window.location.replace("../view_applications/index.html"), 2000);

      }

      return response.json()
    })
    .then(result => {
    })
    .catch(error => {
      // console.log('error', error)
      alert(error)
    });

    $('.cancel-invite').prop('disabled', true)
    setTimeout(function () { $('.cancel-invite').prop('disabled', false) }, 2000);
}

