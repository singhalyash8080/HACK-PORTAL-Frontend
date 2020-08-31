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
                        alert(error)
                    })

                var view_team_link = '../team_invitation/index.html'

                var view_sent_link = '../cancel_invite/index.html'


                // for (let i = 0; i < view_team.length; i++) {
                //     $(".view_team").append('<div class="field"> <p class="txt">' + view_team[i] + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_team_link[i] + '">View</a> </div>' + '</div><br>')
                // }

                // for (let i = 0; i < view_sent.length; i++) {
                //     $(".view_sent").append('<div class="field"> <p class="txt">' + view_sent[i] + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_sent_link[i] + '">View</a> </div>' + '</div><br>')
                // }

                var currentUserId = ''


                var myHeaders = new Headers();
                myHeaders.append("authtoken", auth_tok);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("https://hackportal.herokuapp.com/users/", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)

                        currentUserId = result._id

                        for (let i = 0; i < result.teamInvites.length; i++) {

                            var myHeaders = new Headers();
                            myHeaders.append("authtoken", auth_tok);

                            var requestOptions = {
                                method: 'GET',
                                headers: myHeaders,
                                redirect: 'follow'
                            };

                            fetch("https://hackportal.herokuapp.com/teams/getteaminfo/" + result.teamInvites[i], requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    // console.log(result)
                                    $(".view_team").append('<div class="field"> <p class="txt">' + result.teamName + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_team_link + '?' + result._id + '">View</a> </div>' + '</div><br>')


                                })
                                .catch(error => {
                                    console.log('error', error)
                                    alert(error)
                                });

                        }

                        if (result.teamInvites.length == 0) {
                            $(".view_team").append('<p id="zero_result">There are no invites !<p>')
                        }


                        for (let i = 0; i < result.teams.length; i++) {

                            var myHeaders = new Headers();
                            myHeaders.append("authtoken", auth_tok);

                            var requestOptions = {
                                method: 'GET',
                                headers: myHeaders,
                                redirect: 'follow'
                            };

                            fetch("https://hackportal.herokuapp.com/teams/getteaminfo/" + result.teams[i], requestOptions)
                                .then(response => response.json())
                                .then(Result => {
                                    // console.log(Result)




                                    if (Result.pendingRequestsInfo) {
                                        for (let k = 0; k < Result.pendingRequestsInfo.length; k++) {

                                            var params = {
                                                teamId: Result._id,
                                                teamName: Result.teamName,
                                                profileId: Result.pendingRequestsInfo[k]._id
                                            }

                                            var queryString = $.param(params);

                                            // console.log(queryString)

                                            if (currentUserId == Result.creatorId) {

                                                $(".view_sent").append('<div class="field"> <p class="txt">' + Result.pendingRequestsInfo[k].name + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_sent_link + '?' + queryString + '">View</a> </div>' + '</div><br>')
                                            }

                                        }
                                    }

                                    // if(Result.pendingRequests.length==0){
                                    //     $(".view_sent").append('<p id="zero_result"> There are no sent invites !</p>')
                                    // }

                                    hidePreloader()

                                })
                                .catch(error => {
                                    // console.log('error', error)
                                });

                        }


                        // $(".view_sent").append('<p id="zero_result"> There are no sent invites !</p>')

                    })
                    .catch(error => {

                        // console.log('error', error)
                    });


            })
    } else {
        // No user is signed in.
        // console.log("USER NOT LOGGED IN")
    }
})

$(document).ready(function () {
    $('.sidenav').sidenav();
});

