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
        console.log("USER LOGGED IN")
        //   window.location.replace("/home_page/index.html");
        firebase.auth().currentUser.getIdToken(true)
            .then((idToken) => {
                //   console.log(idToken)
                auth_tok += idToken

                var view_team_link = '../team_invitation/index.html'

                var view_sent_link = '#'


                // for (let i = 0; i < view_team.length; i++) {
                //     $(".view_team").append('<div class="field"> <p class="txt">' + view_team[i] + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_team_link[i] + '">View</a> </div>' + '</div><br>')
                // }

                // for (let i = 0; i < view_sent.length; i++) {
                //     $(".view_sent").append('<div class="field"> <p class="txt">' + view_sent[i] + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_sent_link[i] + '">View</a> </div>' + '</div><br>')
                // }


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
                        console.log(result)

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
                                    console.log(result)
                                    $(".view_team").append('<div class="field"> <p class="txt">' + result.teamName + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_team_link + '?' + result._id + '">View</a> </div>' + '</div><br>')


                                })
                                .catch(error => console.log('error', error));

                        }

                        // for (let i = 0; i < result.teams.length; i++) {

                        //     var myHeaders = new Headers();
                        //     myHeaders.append("authtoken", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1NGE3NTQ3Nzg1ODdjOTRjMTY3M2U4ZWEyNDQ2MTZjMGMwNDNjYmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGFja3BvcnRhbC01M2VmZSIsImF1ZCI6ImhhY2twb3J0YWwtNTNlZmUiLCJhdXRoX3RpbWUiOjE1OTYzMTU3ODEsInVzZXJfaWQiOiJMZDFPZmF0V0ZHVlZOQzlBOHFyOUxlQ0RrVjMzIiwic3ViIjoiTGQxT2ZhdFdGR1ZWTkM5QThxcjlMZUNEa1YzMyIsImlhdCI6MTU5NjMxNjI5MSwiZXhwIjoxNTk2MzE5ODkxLCJlbWFpbCI6InNpbmdoYWwueWFzaDgwODBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2luZ2hhbC55YXNoODA4MEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.IgkqGqnQ3GT7aBWo4DbBQvgGDpL7jnvOX3M-lGXlraymr9N5RTP2hyaDS6tCEoEelO4RTP_fEUS0PMFUkjbcRdVP7Ei1EmJatrEULurT1RLzZ1mul1iGjrYWqtptJcW7qcHi8_ZqhN9XZu7aqNGz3uVe-jyzkTMIvyAOLxoO57AIZmloRw_2NFKEdnZGnsd2Att58XyqveoueHTlUTANUwPM7JabGO0o9p7QfxEZfpRmzxQMuH8BoTD139fF5X-gRffSqKdBMakcQWklFpavF2vmBHmyEbj_fVmJjIr2rmQRl4oUlgYSAwSmUIuAFqXozWlnGqjeyxVYYNaVjPdkXA");

                        //     var requestOptions = {
                        //         method: 'GET',
                        //         headers: myHeaders,
                        //         redirect: 'follow'
                        //     };

                        //     fetch("https://hackportal.herokuapp.com/teams/getteaminfo/"+result.teams[i], requestOptions)
                        //         .then(response => response.json())
                        //         .then(result => {
                        //             console.log(result)
                        //             $(".view_sent").append('<div class="field"> <p class="txt">' + result.teamName + '</p> <div class="lnk"> <a class="lnk_inside" href="' + view_sent_link[i] + '">View</a> </div>' + '</div><br>')

                        //         })
                        //         .catch(error => console.log('error', error));

                        // }
                    })
                    .catch(error => console.log('error', error));

            })
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN")
    }
})

