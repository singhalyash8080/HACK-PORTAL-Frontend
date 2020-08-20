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
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
      //   console.log(idToken)
          auth_tok+=idToken

      })
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN")
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
  $("#form1-butt").click(function () {

    $("#line1").css("visibility", "initial");
    $("#point1").css("background-color", "#3D5A80");
    $("#point1").css("color", "white");
    $(".form1").css("display", "none");
    $(".form2").css("display", "initial");

    name += $('#name').val()
    college += $('#college').val()
    year += $('#yearOfGraduation').val()
  });
});

$(document).ready(function () {
  $("#form2-butt").click(function () {

    $("#line2").css("visibility", "initial");
    $("#point2").css("background-color", "#3D5A80");
    $("#point2").css("color", "white");
    $(".form2").css("display", "none");
    $(".form3").css("display", "initial");

    bio += $('#bio').val()

    for (let i = 1; i <= 9; i++) {
      if ($("#" + i.toString()).is(":checked")) {
        skillarray.push($('#' + i.toString()).val())
      }
    }

  });
});

$(document).ready(function () {
  $("#form3-butt").click(async function () {

    github += ($('#githubLink').val())
    stack += ($('#stackOverFlowLink').val())
    externallink += ($('#externalLink').val())

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
        authtoken:auth_tok,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    await fetch("https://hackportal.herokuapp.com/users/", requestOptions)
      .then(response => response.json())
      .then(result =>{
        alert('Your profile has been created successfully')
      })
      .catch(error => {
        console.log('error', error)
        alert(error)
      });

    window.location.replace("../home_page/index.html");

  });
});