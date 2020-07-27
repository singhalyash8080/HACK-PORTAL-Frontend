$(document).ready(function(){
    $("#signIN").click(function(){
      
        $(".auth").css("display","none")
        $("#SignIn").css("display","inherit")
        $(".shape2").css("top","-10px")
    });
  });

// code for getting hackathon details of some hackathons

var hack_names=[]

// var hack_text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English..."
var hack_text = []
var hack_link=[]


var ob_head = {
    1:"one-head",
    2:"two-head",
    3:"three-head"
}

var ob_txt={
    1:"one-txt",
    2:"two-txt",
    3:"three-txt"
}

var ob_butt={
    1:"one-butt",
    2:"two-butt",
    3:"three-butt"
}

var arrayy=['<div id="one"><h5 id="one-head"></h5><p id="one-txt"></p><a id="one-butt" ></a></div><br>','<div id="two"><h5 id="two-head"></h5><p id="two-txt"></p><a id="two-butt" ></a></div><br>',
'<div id="three"><h5 id="three-head"></h5><p id="three-txt"></p><a id="three-butt" ></a></div><br>']

const url= 'https://hackportal.herokuapp.com/events/getevents/1'

axios.get(url)
.then(data => {
    // console.log(data.data.documents.length)
    $('.part2-1').append('<h4 class="part2-1-head">All Hackathons</h4>')
    $('.part2-1').append('<br><br>')
    // $('.part2-1-head').append('<div id="one"><h5 id="one-head"></h5><p id="one-txt"></p><a id="one-butt" ></a></div><br>')

    if(data.data.documents.length>3){
        len=3
    }
    else{
        len=data.data.documents.length
    }

    for (let i = 0; i <len; i++) {

        $('.part2-1').append(arrayy[i])
    }

    $('.part2-1').append('<div id="view_more_link"><a href="../all_hacks/index.html" style="color: white;font-size:35px;text-decoration: none;">View All</a></div>')


    for (let i = 0; i < len; i++) {

        hack_names.push(data.data.documents[i].nameOfEvent)
        hack_text.push(data.data.documents[i].description)
        hack_link.push(data.data.documents[i].eventUrl)

    }

    for (let i = 0; i < len; i++) {
        $("#" + ob_head[i + 1]).text(hack_names[i]);
        $("#" + ob_txt[i + 1]).text(hack_text[i]);
        $("#" + ob_butt[i + 1]).html('<a id="one-butt" href="' + hack_link[i] + '">Learn More</a>')
    }

})
.catch(err=> console.log(err))



//end of code for getting hackathon details



// firebase for signIn

// Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyAPKlNwldNx9YCH4el1FFEuMJk1mQpIpp4",
//     authDomain: "hackportal-53efe.firebaseapp.com",
//     databaseURL: "https://hackportal-53efe.firebaseio.com",
//     projectId: "hackportal-53efe",
//     storageBucket: "hackportal-53efe.appspot.com",
//     messagingSenderId: "945327566569",
//     appId: "1:945327566569:web:04739afc0b939fcf658a78",
//     measurementId: "G-MTPN0JGL08"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//             console.log("USER LOGGED IN")
//             window.location.replace("http://localhost:5500/create_profile/index.html");
            
//     } else {
//             // No user is signed in.
//             console.log("USER NOT LOGGED IN")
//     }
// })

// $(document).ready(function(){
//     $("#signIn").submit(function(){
    
//     window.localStorage.setItem('emailForSignIn',$("#getmail").val())

//     alert('Please click ok to send a link to '+$("#getmail").val()+' to verify your email')
//     });
// });


// var email=''

// if((window.localStorage.getItem('emailForSignIn'))){
//     var email = (window.localStorage.getItem('emailForSignIn'))
//     window.localStorage.removeItem('emailForSignIn')
// }

// var actionCodeSettings = {
//     // URL you want to redirect back to. The domain (www.example.com) for this
//     // URL must be whitelisted in the Firebase Console.
//     url: 'http://localhost:5500/create_profile/index.html',
//     handleCodeInApp: true
// };

// firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//     .then(function () {
//         // The link was successfully sent. Inform the user.
//         // Save the email locally so you don't need to ask the user for it again
//         // if they open the link on the same device.
//         // console.log('success')
//         window.localStorage.setItem('emailForSignIn', email)
//     })
//     .catch(function (error) {
//         // Some error occurred, you can inspect the code: error.code
//     });
