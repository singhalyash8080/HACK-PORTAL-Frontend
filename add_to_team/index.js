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

                const queryString = window.location.search;


                $('.sendInvite-inside').append('<br><input type="text" id="email"><br><br>')

                document.getElementById('email').defaultValue = (queryString.split('?'))[1]

                $('.sendInvite-inside').append('<h4>Choose team :</h4><br>')

                $('.sendInvite-inside').append('<div class="add_to_team"></div><br>')

                $('.sendInvite-inside').append('<div class="invite-butt"> <button onclick="sendInvite()">Send invite</button> </div>')



                var requestOptions = {
                    method: 'GET',
                    headers: {
                        authtoken: auth_tok
                        , "Content-Type": "application/json"
                    },
                    redirect: 'follow'
                };

                fetch("https://hackportal.herokuapp.com/users/", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result.email)
                        const creater_id = result._id

                        for (let i = 0; i < result.teams.length; i++) {


                            var requestOptions = {
                                method: 'GET',
                                headers: {
                                    authtoken: auth_tok
                                    , "Content-Type": "application/json"
                                },
                                redirect: 'follow'
                            };

                            fetch("https://hackportal.herokuapp.com/teams/getteaminfo/" + result.teams[i], requestOptions)
                                .then(response => response.json())
                                .then(data => {

                                    if (data.creatorId == creater_id) {

                                        $('.add_to_team').append('<label><input type="checkbox" class="filled-in" value="' + data._id + '" /><span>' + data.teamName + '</span></label><br><br>')
                                    }

                                })
                                .catch(error => {
                                    console.log('error', error)
                                    // alert(error)
                                });

                        }

                        hidePreloader()

                    })
                    .catch(error => { console.log('error', error) });

                
            })
    } else {

        window.location.replace("../index.html");
        // No user is signed in.
        // console.log("USER NOT LOGGED IN")
    }
})



function sendInvite() {

    var selchbox = [];// array that will store the value of selected checkboxes
    // gets all the input tags in frm, and their number
    var inpfields = $('.add_to_team input');
    var nr_inpfields = inpfields.length;
    // traverse the inpfields elements, and adds the value of selected (checked) checkbox in selchbox
    for (var i = 0; i < nr_inpfields; i++) {
        if (inpfields[i].type == 'checkbox' && inpfields[i].checked == true) selchbox.push(inpfields[i].value);
    }

    // console.log(selchbox)
    // console.log(inpfields)


    for (let k = 0; k < selchbox.length; k++) {

        var raw = {
            inviteeEmail: $('#email').val(),
            teamId: selchbox[k]
        }

        // console.log(raw)


        var requestOptions = {
            method: 'POST',
            headers: {
                authtoken:
                    auth_tok,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        fetch("https://hackportal.herokuapp.com/teams/sendinvite", requestOptions)
            .then(response => {

                if (response.status == 200) {

                    Toastify({
                        text: "request sent successfully",
                        backgroundColor: "linear-gradient(to right, #3D5A80, #507093,#7393B0)",
                        className: "info",
                    }).showToast();

                    window.setTimeout(() => window.location.replace("../home_page/index.html"), 2000);


                }

                return response.json()
            })
            .then(result => {
                // console.log(result)

                // if(result.message){

                //     Toastify({
                //       text: result.message,
                //       backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                //       className: "info",
                //     }).showToast();

                //   }
            })
            .catch(error => {
                // console.log('error', error)
                alert(error)
            });


    }
}

$(document).ready(function () {
    $('.sidenav').sidenav();
});