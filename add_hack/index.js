// code for pre-loader

$(document).ready(function() {
  //Preloader
  preloaderFadeOutTime = 5000;
  function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
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

  var auth_tok=''
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("USER LOGGED IN")
    //   window.location.replace("/home_page/index.html");

     if(user.emailVerified==false){

        window.location.replace("../verify_account/index.html");
  
      }


      firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
        //   console.log(idToken)
            auth_tok+=idToken

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
                .catch(error=>{
                    if(error.message=='email not verified'){

                    window.location.replace("../create_profile/index.html");

                    }
                })


        })
    } else {
      // No user is signed in.
      console.log("USER NOT LOGGED IN")
    }
  })


var base64code=''

function encodeImageFileAsURL(element){

    var file = element.files[0]
    var reader = new FileReader()

    reader.onloadend = function(){

        // console.log('RESULT',reader.result)
        base64code+=reader.result 
    }

    reader.readAsDataURL(file)
}


async function confirm() {

    var team_size=($("#team_size").val()).split('-')

    var raw = {
        nameOfEvent: $('#name').val(),
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        location: $('#venue').val(),
        description: $('.txt-inp').val(),
        minimumTeamSize: team_size[0],
        maximumTeamSize: team_size[1],
        eventUrl:$('#event_url').val(),
        eventImage:base64code
    }

    // console.log(raw)

    var requestOptions = {
        method: 'POST',
        headers: {
            "authtoken":auth_tok
            ,"Content-Type": "application/json"
        },
        body: JSON.stringify(raw)
    };

    await fetch("https://hackportal.herokuapp.com/events/setevent", requestOptions)
        .then(response => response.json())
        .then(result =>{
            // console.log(result)
            alert('Your hackathon has been added successfully')
        } )
        .catch(error =>{ 
            console.log('error', error)
            alert(error)
        });

    window.location.replace("../home_page/index.html");
}

