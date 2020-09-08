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

$('.link2 a').css("background-color","#3D5A80");
$('.link2 a').css("color","white");
$('.link2 a').css("padding","5px 23px");
$('.link2 a').css("border-bottom-left-radius","50px");
$('.link2 a').css("border-top-left-radius","50px");
$('.link2 a').css("border-bottom-right-radius","50px");
$('.link2 a').css("border-top-right-radius","50px");
$(".link2 a").click(function(){
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

  // console.log(queryString)

  if(queryString!=''){

    var myHeaders = new Headers();
    // console.log(auth_tok)

    var requestOptions = {
      method: "POST",
      headers: {
        authtoken: auth_tok,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
    };

    fetch("https://hackportal.herokuapp.com/users/searchuserprofiles/1", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {

        if(result.documents.length!=0){

        window.location.replace("../user_finder2/index.html?" + queryString);

        }
        else{

          Toastify({
            text: "No user with such skill exists",
            duration:5000,
            offset: {
              y: 50 
            },
            backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
            className: "info",
          }).showToast();


        }
      })
      .catch()
     
  }
  else{
    Toastify({
      text: "Select atleast one skill to search",
      duration:5000,
      offset: {
        y: 50 
      },
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }
}

