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
firebase.analytics()

var auth_tok = ''

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //   console.log("USER LOGGED IN")
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
                    .then((result) => {

                        // console.log(result)
                        document.getElementById("name").defaultValue = result.name

                        document.getElementById("college").defaultValue = result.college

                        document.getElementById("yearOfGraduation").defaultValue = result.expectedGraduation

                        document.getElementById("bio").defaultValue = result.bio

                        for (let i = 1; i <= 9; i++) {

                            var skilz = $('#' + i.toString()).val()

                            for (let j = 0; j < result.skills.length; j++) {


                                if (skilz.toLowerCase() == result.skills[j]) {

                                    $('#' + i.toString()).attr('checked', true)
                                }

                            }

                        }

                        if(result.githubLink!=undefined)
                        document.getElementById("githubLink").defaultValue = result.githubLink

                        if(result.stackOverflowLink!=undefined)
                        document.getElementById("stackOverFlowLink").defaultValue = result.stackOverflowLink

                        if(result.externalLink!=undefined)
                        document.getElementById("externalLink").defaultValue = result.externalLink

                    hidePreloader()

                    })
                    .catch(err => {
                        alert(err)
                    })


            })
    } else {

        window.location.replace("../index.html");
        // No user is signed in.
        //   console.log("USER NOT LOGGED IN")
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


    if(name==''){

        Toastify({
          text: "Name must be filled",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
  
      }
  
      if(college==''){
        Toastify({
          text: "College name must be filled",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
      }
  
      if(bio==''){
        Toastify({
          text: "Bio must be filled",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
      }
  
      if(skillarray.length==0){
        Toastify({
          text: "Atleast one skill must be selected",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
  
      }
  
      if(!year.match(/^20\d\d$/)){
  
        Toastify({
          text: "Enter the expected year of graduation correctly",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
  
      }
  
      if(github!='' && !github.match(/^https?:\/\/github.com\/[^\/]*\/?$/)){
  
        Toastify({
          text: "Enter valid github handle",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
      }
  
      if(stack!='' && !stack.match(/^https?:\/\/stackoverflow.com\/users\/[0-9]+\/[\w\d-?_.!@#$%^&-()*]+$/)){
  
        Toastify({
          text: "Enter valid stackOverFlow handle",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
      }
  
      if(externallink!='' && !externallink.match(/^((http|https):\/\/[^ "]+)$/)){
  
        Toastify({
          text: "Enter valid website url",
          duration:5000,
          backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
          className: "info",
        }).showToast();
  
      }

    const raw = {
        name: name,
        college: college,
        expectedGraduation: year,
        bio: bio,
        skills: skillarray,
        githubLink: github || undefined,
        stackOverflowLink: stack || undefined,
        externalLink: externallink || undefined
    }

    var requestOptions = {
        method: 'PATCH',
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
                    text: "profile updated successfully",
                    backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
                    className: "info",
                }).showToast();

                window.setTimeout(() => window.location.replace("../edit_profile1/index.html"), 2000);


            }


            return response.json()
        })
        .then(result => {
            // console.log(result)
        })
        .catch(error => {
            // alert(error)
        });
}

function cancel() {
    window.location.replace("../edit_profile1/index.html");
}
