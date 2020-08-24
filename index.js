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

$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(document).ready(function(){
    $("#signIN").click(function(){
      
        $(".auth").css("display","none")
        $("#SignIn").css("display","inherit")
        $(".shape2").css("top","-10px")
    });
  });

  $(document).ready(function(){
    $("#signUP").click(function(){
      
        $(".auth").css("display","none")
        $("#SignUp").css("display","inherit")
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

    $('.part2-1').append('<div id="view_more_link"><a href="#" onclick="signInFirst()" style="color: white;font-size:35px;text-decoration: none;">View All</a></div>')


    for (let i = 0; i < len; i++) {

        hack_names.push(data.data.documents[i].nameOfEvent)

        var desc_limit= (data.data.documents[i].description).split(" ")
        // console.log(desc_limit)

        if(desc_limit.length>40){

          var desc_text=''

          for (let j = 0; j < 40; j++) {
            
            if(j==39){
              desc_text+=(desc_limit[j]+'....')
            }
            else{
              desc_text+=(desc_limit[j]+' ')
            }

          }

          hack_text.push(desc_text)

        }
        else{
          hack_text.push(data.data.documents[i].description)
        }


        hack_link.push(data.data.documents[i].eventUrl)

    }

    for (let i = 0; i < len; i++) {
        $("#" + ob_head[i + 1]).text(hack_names[i]);
        $("#" + ob_txt[i + 1]).text(hack_text[i]);
        $("#" + ob_butt[i + 1]).html('<a id="one-butt" href="#" onclick="signInFirst()">Learn More</a>')
    }

})
.catch(err=> console.log(err))



//end of code for getting hackathon details

//firebase for signIn

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

  document.getElementById("SignIn").addEventListener("click", function(event){
    event.preventDefault()
  });

  document.getElementById("SignUp").addEventListener("click", function(event){
    event.preventDefault()
  });
  
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {

      var email = $('.mail').val();
      var password = $('.password').val();

      // console.log(email)
      // console.log(password)
      if (email.length < 4) {
        alert('Please enter a valid email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{ 
        console.log('signed-in')
        window.location.replace("./home_page/index.html");
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        alert(error)
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
    // document.getElementById('quickstart-sign-in').disabled = true;
  }
  
  function handleSignUp() {
    var email = $('.emaill').val();
    var password = $('.pass').val();

    console.log(email)
    console.log(password)

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{ 
      console.log('user created')
      window.location.replace("./verify_account/index.html")

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  }
  
  function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function () {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("USER LOGGED IN")
      // window.location.replace("/home_page/index.html");
    //   firebase.auth().currentUser.getIdToken(true)
    //     .then((idToken) => {
    //       console.log(idToken)
    //     })
    } else {
      // No user is signed in.
      console.log("USER NOT LOGGED IN")
    }
  })

  function signInFirst(){
    alert('Sign In first')
  }