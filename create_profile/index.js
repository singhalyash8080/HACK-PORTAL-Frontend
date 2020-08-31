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

      })
  } else {
    // No user is signed in.
    // console.log("USER NOT LOGGED IN")
  }
})

var name = ''
var college = ''
var year = ''
var bio = ''
var skillarray = []
var github = ''
var stack = ''
var externallink = ''


$(document).ready(function () {
  $("#form1-butt-2").click(function () {

    $("#line1").css("visibility", "initial");
    $("#point1").css("background-color", "#3D5A80");
    $("#point1").css("color", "white");
    $(".form1").css("display", "none");
    $(".form2").css("display", "initial");

    name = ''
    college = ''
    year = ''

    name = $('#name').val()
    college = $('#college').val()
    year = $('#yearOfGraduation').val()
  });
});


$(document).ready(function () {
  $("#form2-butt-1").click(function () {

    $("#line1").css("visibility", "hidden");
    $("#point1").css("background-color", "white");
    $("#point1").css("color", "initial");
    $(".form2").css("display", "none");
    $(".form1").css("display", "initial");

  });
});

$(document).ready(function () {
  $("#form2-butt-2").click(function () {

    $("#line2").css("visibility", "initial");
    $("#point2").css("background-color", "#3D5A80");
    $("#point2").css("color", "white");
    $(".form2").css("display", "none");
    $(".form3").css("display", "initial");

    bio = ''

    bio = $('#bio').val()

    skillarray = []

    for (let i = 1; i <= 9; i++) {
      if ($("#" + i.toString()).is(":checked")) {
        skillarray.push($('#' + i.toString()).val())
      }
    }

  });
});

$(document).ready(function () {
  $("#form3-butt-1").click(function () {

    $("#line2").css("visibility", "hidden");
    $("#point2").css("background-color", "white");
    $("#point2").css("color", "initial");
    $(".form3").css("display", "none");
    $(".form2").css("display", "initial");

  });
});



$(document).ready(function () {
  $("#form3-butt-2").click(async function () {

    github = ''
    stack = ''
    externallink = ''

    github = ($('#githubLink').val())
    stack = ($('#stackOverFlowLink').val())
    externallink = ($('#externalLink').val())

    const raw = {
      name: name,
      college: college,
      expectedGraduation: year,
      bio: bio,
      skills: skillarray,
      githubLink: github,
      stackOverflowLink: stack,
      externalLink: externallink
    }

    console.log(raw)

    var requestOptions = {
      method: 'POST',
      headers: {
        authtoken: auth_tok,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    await fetch("https://hackportal.herokuapp.com/users/", requestOptions)
      .then(response => {

        if (response.status == 200) {

          Toastify({
            text: "Your profile has been created successfully",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
          }).showToast();

          window.setTimeout(() => window.location.replace("../home_page/index.html"), 2000);

        }
        else {
          alert(response.error)
        }
        return response.json()
      })
      .then(result => {
      })
      .catch(error => {
        // console.log('error', error)
        alert(error)
      });

  });
});