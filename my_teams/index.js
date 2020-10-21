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

$('.link3 a').css("color","#3D5A80");
$('.link3 a').css("font-weight","600");
$(".link3 a").click(function(){
  return false;
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
            alert(error)
          })

        // code for content

        var myHeaders = new Headers();
        myHeaders.append("authtoken", auth_tok);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://hackportal.herokuapp.com/users/", requestOptions)
          .then(response => response.json())
          .then(async (result) => {
            // console.log(result)

            var team_link = '../team_info/index.html'

            for (let i = 0; i < result.teams.length; i++) {


              var myHeaders = new Headers();
              myHeaders.append("authtoken", auth_tok);

              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };

              await fetch("https://hackportal.herokuapp.com/teams/getteaminfo/" + result.teams[i], requestOptions)
                .then(response => response.json())
                .then(results => {

                  var desc_limit = (results.description).split(" ")
                  // console.log(desc_limit)

                  var desc_text = ''
            
                  if (desc_limit.length > 40) {
            
                    
            
                    for (let j = 0; j < 40; j++) {
            
                      if (j == 39) {
                        desc_text += (desc_limit[j] + '....')
                      }
                      else {
                        desc_text += (desc_limit[j] + ' ')
                      }
            
                    }
                  }else{
                    desc_text+=results.description
                  }
            
                  // console.log(results)
                  $(".content").append('<div class="team"> <p class="team_name">' + results.teamName + '</p><p class="hack_name">' + results.nameOfEvent + '</p><p class="description">'
                    + desc_text + '</p><div class="list"><p class="item">Admin : ' + results.creatorInfo.name + '</p> <p class="item" id="view_team_link"><a href="' + team_link + '?' + results._id + '" style="color:#fff; ">View</p></div></div><br><br>')
                  // console.log('one')
                })
                .catch(error => {
                  // console.log('error', error)
                  // alert(error)
                });
            }

            if (result.teams.length == 0) {

              $('.content').append('<div class="no-res"><img src="../resources/illuspng.png"></img> <p>You are not part of any team yet</div><br><br><br>')

            }

            hidePreloader()

            // console.log($('.content').html())

            // console.log($('.pagination').html())

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



