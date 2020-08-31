// code for pre-loader

$(document).ready(function() {
  //Preloader
  function hidePreloader() {
  var preloader = $('.spinner-wrapper');
  preloader.fadeOut();
  }

  hidePreloader()
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
      // console.log("USER LOGGED IN")
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

                  if(response.status!=200){

                    window.location.replace("../create_profile/index.html");
                    
                  }

                  return response.json();
                })
                .then(result=>{})
                .catch(error=>{
                  // alert(error)
                })


        })
    } else {
      // No user is signed in.
      // console.log("USER NOT LOGGED IN")
    }
  })


var base64code=''

function encodeImageFileAsURL(element){

    base64code=''

    var file = element.files[0]
    var reader = new FileReader()

    reader.onloadend = function(){

        // console.log('RESULT',reader.result)
        base64code+=reader.result 
    }

    reader.readAsDataURL(file)
}


async function confirm() {

    var raw = {
        nameOfEvent: $('#name').val(),
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        location: $('#venue').val(),
        description: $('.txt-inp').val(),
        minimumTeamSize: $('#minteam_size').val(),
        maximumTeamSize: $('#maxteam_size').val(),
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
        .then(response => {
        
        if(response.status==200){

          // alert('Your hackathon has been added successfully')
          Toastify({
            text: "Your hackathon has been added successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
          }).showToast();

          window.setTimeout(()=>window.location.replace("../home_page/index.html"), 2000);

        }
        
          return response.json()
        })
        .then(result =>{

            if(result.message){
              // alert(result.message)
              Toastify({
                text: result.message,
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                className: "info",
              }).showToast();

            }

            // console.log(result)
        } )
        .catch(error =>{ 
            // console.log('error', error)
            alert(error)
        });

}

