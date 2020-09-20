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

var auth_tok = ''

var currentUserId=''

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

        // code for getting content
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
          .then(result=>{
            currentUserId+=result._id
          })
          .catch(error => {
            if (error.message == 'email not verified') {

              window.location.replace("../create_profile/index.html");

            }
          })

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
        // console.log(queryString);

        var event_ID = ''

        for (let i = 0; i < queryString.length; i++) {
          if (i != 0) {
            event_ID += queryString[i]
          }

        }

        // console.log(event_ID)

        fetch("https://hackportal.herokuapp.com/events/geteventinfo/" + event_ID, requestOptions)
          .then(response => response.json())
          .then(result => {

            // console.log(result)


            $(".hack_name").text(result.nameOfEvent)

            $(".venue").text(result.location)

            $(".date").text(new Date(result.startDate ).toLocaleString()+ ' to ' + new Date(result.endDate).toLocaleString())
            // $(".date").text(date)

            $(".description").text(result.description)

            $(".label1").text(label1)
            $(".link").html('<a href="https://devsoc.codechefvit.com/">' + result.eventUrl + '</a>')


            if (!result.hasTeamForEvent && currentUserId!=result.creatorId){
              $(".invite").append('<button> <a href=' + '../add_team/index.html?' + result._id + '>Create team</a> </button>')
              
            }
            else if(currentUserId==result.creatorId){

              $('.invite').css('display','none')

              $('.content').append('<div class="team-butt"><div class="team-butt-cover"></div></div>')

              $(".team-butt-cover").append('<button class="delete-team" > <a href="' + '#' + '" style="color:#3D5A80;">Delete</a> </button>')

              $(".team-butt-cover").append('<button class="edit-team"> <a href="' + '../edit_hack/index.html?' + result._id + '" style="color:white;">Edit</a> </button>')
            }

            $('.shapes').append('<img src="' + result.eventImage + '" alt="cant display image">')

            $('.delete-team').click(async function () {

              var myHeaders = new Headers();
              myHeaders.append("authtoken", auth_tok);

              var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };

              // console.log(team_id)

              await fetch("https://hackportal.herokuapp.com/events/deleteevent/" + result._id, requestOptions)
                .then(response => {

                  if (response.status == 200) {

                    Toastify({
                      text: "Hack deleted successfully",
                      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                      className: "info",
                    }).showToast();

                    window.setTimeout(() => window.location.replace("../home_page/index.html"), 2000);

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
            // alert(error)
          });

        // end of code for getting hackathon

      })
  } else {

    window.location.replace("../index.html");
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})

$(document).ready(function () {
  $('.sidenav').sidenav();
});

