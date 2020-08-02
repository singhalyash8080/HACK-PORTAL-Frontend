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

async function confirm() {

    // console.log($('#team_name').val())
    // console.log($('.txt-inp').val())
    // console.log($('#team_skills').val())

    const queryString = window.location.search;
    // console.log(queryString);
    var event_id=''

    for (let i = 0; i < queryString.length; i++) {
        if(i!=0){
            event_id+=queryString[i]
        }
        
    }

    // console.log(event_id)

    var skill_array=[]

    for (let i = 0; i < $('#team_skills').val().length; i++) {
        skill_array.push(($('#team_skills').val())[i])
        
    }

    var raw = {
        teamName: $('#team_name').val(),
        eventId: event_id,
        description: $('.txt-inp').val(),
        skillsRequired: skill_array
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

    await fetch("https://hackportal.herokuapp.com/teams/setteam", requestOptions)
        .then(response => response.json())
        .then(result =>{
            // console.log(result)
            alert('Your team has been created successfully')
        } )
        .catch(error => console.log('error', error));

    window.location.replace("../home_page/index.html");
}

