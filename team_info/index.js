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
        //   console.log(idToken)
        auth_tok += idToken

        var myHeaders = new Headers();
        myHeaders.append("authtoken", auth_tok);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        var currentUserId = ''

        fetch("https://hackportal.herokuapp.com/users/", requestOptions)
          .then(response => {

            if (response.status == 404) {
              window.location.replace("../create_profile/index.html");
            }

            return response.json()
          })
          .then(result => {
            currentUserId += result._id
            // console.log(result)
          })
          .catch(error => {
            // alert(error)
          });

        // code for getting content

        var name = 'Team name'

        var label1 = 'Hackathon: '
        var label2 = 'Teamsize: '
        var label3 = 'Project Description:'
        var label4 = 'Skills Required:'
        var label5 = 'Team mates: '

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

            $(".team_name").text(result.teamName)

            $(".label1").text(label1)
            $(".hackathon_name").text(result.nameOfEvent)

            // $(".label2").text(label2)
            // $(".team_size").text('2/4')

            $(".label3").text(label3)

            if(result.description!=undefined){
            $(".description").text(result.description)
            }
            else{
            $(".description").text('-')
            }
            $(".label4").text(label4)
            for (let i = 0; i < result.skillsRequired.length; i++) {
              $(".skills").append('<p class="points">' + result.skillsRequired[i] + '</p>')
            }

            $(".label5").text(label5)
            for (let i = 0; i < result.membersInfo.length; i++) {

              if (result.creatorId == result.membersInfo[i]._id) {
                $(".team_mates").append('<p class="points">' + result.membersInfo[i].name + ' (Admin)</p>')
              }
              else {
                $(".team_mates").append('<p class="points">' + result.membersInfo[i].name + '</p>')
              }

            }

            if (currentUserId != result.creatorId) {
              $('.team-butt').css("display", "none")
            }

            $(".team-butt-cover").append('<button class="delete-team" > <a href="' + '#' + '" style="color:#3D5A80;">Delete</a> </button>')

            $(".team-butt-cover").append('<button class="edit-team"> <a href="' + '../edit_team/index.html?' + result._id + '" style="color:white;">Edit</a> </button>')



            $('.delete-team').click(async function () {

              var myHeaders = new Headers();
              myHeaders.append("authtoken", auth_tok);

              var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };

              // console.log(team_id)

              await fetch("https://hackportal.herokuapp.com/teams/deleteteam/" + team_id, requestOptions)
                .then(response => {

                  if (response.status == 200) {

                    Toastify({
                      text: "Team deleted successfully",
                      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                      className: "info",
                    }).showToast();

                    window.setTimeout(() => window.location.replace("../my_teams/index.html"), 2000);

                  }

                  return response.json()
                })
                .then(result => {

                  // console.log(result)


                })
                .catch(error => {
                  // console.log('error', error)
                  // alert(error)
                });

            }
            )

            hidePreloader()

          })
          .catch(error => {
            // console.log('error', error)
          });

      })
  } else {

    window.location.replace("../index.html");
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})
