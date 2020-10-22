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

            if (response.status != 200) {

              window.location.replace("../create_profile/index.html");

            }

            return response.json();
          })
          .then(result => { })
          .catch(error => {
            // alert(error)
          })

        const queryString = window.location.search;
        // console.log(queryString);

        var event_ID = ''

        for (let i = 0; i < queryString.length; i++) {
          if (i != 0) {
            event_ID += queryString[i]
          }

        }

        fetch("https://hackportal.herokuapp.com/events/geteventinfo/" + event_ID, requestOptions)
          .then(response => response.json())
          .then(result => {

            // console.log(result)

            document.getElementById("name").defaultValue = result.nameOfEvent

            document.getElementById("venue").defaultValue = result.location

            // document.getElementById("startDate").defaultValue = new Date(result.startDate ).toLocaleString()

            // document.getElementById("endDate").defaultValue = new Date(result.endDate ).toLocaleString()

            document.getElementById("description").defaultValue = result.description

            document.getElementById("event_url").defaultValue = result.eventUrl

            document.getElementById("minteam_size").defaultValue = result.minimumTeamSize

            document.getElementById("maxteam_size").defaultValue = result.maximumTeamSize

            hidePreloader()

          })
          .catch(result => {
            hidePreloader()

          })



      })
  } else {

    window.location.replace("../index.html");
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})


var base64code = ''

function encodeImageFileAsURL(element) {

  base64code = ''

  var file = element.files[0]
  var reader = new FileReader()

  reader.onloadend = function () {

    // console.log('RESULT',reader.result)
    base64code += reader.result
  }

  reader.readAsDataURL(file)
}


async function confirm() {


  if ($('#name').val() == '') {

    Toastify({
      text: "Name of hackathon is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();

  }

  if (new Date($('#startDate').val()).getTime() == '') {

    Toastify({
      text: "Start Date is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if (new Date($('#endDate').val()).getTime() == '') {

    Toastify({
      text: "Start Date is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#venue').val() == '') {

    Toastify({
      text: "Location is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();

  }

  if ($('.txt-inp').val() == '') {

    Toastify({
      text: "description is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();

  }

  if ($('#minteam_size').val() == '') {

    Toastify({
      text: "minimum team size is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#maxteam_size').val() == '') {

    Toastify({
      text: "maximum team size is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#event_url').val() == '') {

    Toastify({
      text: "Event url is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#event_url').val() != '' && !($('#event_url').val()).match(/^(http|https):\/\/[^ "]+$/)) {

    Toastify({
      text: "Enter valid url",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#startTime').val() == '') {

    Toastify({
      text: "Start time is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  if ($('#endTime').val() == '') {

    Toastify({
      text: "Start time is required",
      duration: 1000,
      backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
      className: "info",
    }).showToast();
  }

  var raw = {
    nameOfEvent: $('#name').val(),
    startDate: new Date($('#startDate').val() + 'T' + $('#startTime').val()).getTime(),
    endDate: new Date($('#endDate').val() + 'T' + $('#endTime').val()).getTime(),
    location: $('#venue').val(),
    description: $('.txt-inp').val(),
    minimumTeamSize: $('#minteam_size').val(),
    maximumTeamSize: $('#maxteam_size').val(),
    eventUrl: $('#event_url').val(),
    eventImage: base64code
  }

  // console.log(raw)

  var requestOptions = {
    method: 'PATCH',
    headers: {
      "authtoken": auth_tok
      , "Content-Type": "application/json"
    },
    body: JSON.stringify(raw)
  };


  const queryString = window.location.search;
  // console.log(queryString);

  var event_ID = ''

  for (let i = 0; i < queryString.length; i++) {
    if (i != 0) {
      event_ID += queryString[i]
    }

  }


  await fetch("https://hackportal.herokuapp.com/events/updateevent/" + event_ID, requestOptions)
    .then(response => {

      // console.log(response)

      if (response.status == 200) {

        // alert('Your hackathon has been added successfully')
        Toastify({
          text: "Your hackathon has been updated successfully",
          duration: 1000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();

        window.setTimeout(() => window.location.replace("../home_page/index.html"), 2000);

      }

      return response.json()
    })
    .then(result => {

      if (result.message) {
        // alert(result.message)
        Toastify({
          text: result.message,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();

      }

      // console.log(result)
    })
    .catch(error => {
      // console.log('error', error)
      // alert(error)
    });

  $('.accept').prop('disabled', true)
  setTimeout(function () { $('.accept').prop('disabled', false) }, 2000);
}

