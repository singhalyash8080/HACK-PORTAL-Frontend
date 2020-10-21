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



$('.link4 a').css("color","#3D5A80")
$('.link4 a').css("font-weight","600")
$(".link4 a").click(function(){
  return false;
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

function signOut() {

  firebase.auth().signOut()

  window.location.replace("../index.html");
}

var auth_tok = ''

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // console.log("USER LOGGED IN")

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

        var label1 = 'Email:'
        var label2 = 'University name:'
        var label3 = 'Year of graduation:'
        var label4 = 'Description:'
        var label5 = 'Skills:'
        var label6 = 'Github link: '
        var label7 = 'Stackoverflow link: '
        var label8 = 'Website: '


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
            $(".invite").append('<button> <a href="' + '#' + '" style="text-decoration:none;">Invite</a> </button>')

            hidePreloader()

          })
          .catch(err => {
            // console.log(err)
            // alert(error)
          })


      })
  } else {

    window.location.replace("../index.html");

    // hidePreloader()
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})
