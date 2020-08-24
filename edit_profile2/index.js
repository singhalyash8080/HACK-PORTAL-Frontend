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
                    authtoken:auth_tok,
                    "Content-Type": "application/json",
                }
            };
            
            fetch("https://hackportal.herokuapp.com/users/", requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((result) => {
            
                    console.log(result)
                    document.getElementById("name").defaultValue = result.name
            
                    document.getElementById("college").defaultValue = result.college
            
                    document.getElementById("yearOfGraduation").defaultValue = result.expectedGraduation
            
                    document.getElementById("bio").defaultValue = result.bio
            
                    for (let i = 1; i <= 9; i++) {
                        
                        var skilz = $('#'+i.toString()).val()
            
                        for (let j = 0; j < result.skills.length; j++) {
                            
                            
                            if(skilz.toLowerCase()==result.skills[j]){
            
                                $('#'+i.toString()).attr('checked',true)
                            }
                            
                        }
                        
                    }
            
                    document.getElementById("githubLink").defaultValue = result.githubLink
                    document.getElementById("stackOverFlowLink").defaultValue = result.stackOverflowLink
                    document.getElementById("externalLink").defaultValue = result.externalLink
            
                    
                })
                .catch(err =>{ 
                    console.log(err)

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

  async function confirm() {
            
    var name = ''
    var college = ''
    var year = ''
    var bio = ''
    var skillarray = []
    var github = ''
    var stack = ''
    var externallink = ''

    name += $('#name').val()
    college += $('#college').val()
    year += $('#yearOfGraduation').val()

    bio += $('#bio').val()

    for (let i = 1; i <= 9; i++) {
        if ($("#" + i.toString()).is(":checked")) {
            skillarray.push($('#' + i.toString()).val())
        }
    }

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

    var requestOptions = {
        method: 'PATCH',
        headers: {
            authtoken:auth_tok,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    await fetch("https://hackportal.herokuapp.com/users/", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            alert('profile was updated successfully')
        })
        .catch(error => {
            console.log('error', error)
            alert(error)
        });

    window.location.replace("../home_page/index.html");

}

function cancel() {
    window.location.replace("../home_page/index.html");
}
