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

// code for getting hackathon details of some hackathons

var hack_names=[]

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
    console.log(data.data)
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


        hack_link.push(data.data.documents[i]._id)

    }


    for (let i = 0; i < len; i++) {
        $("#" + ob_head[i + 1]).text(hack_names[i]);
        $("#" + ob_txt[i + 1]).text(hack_text[i]);
        $("#" + ob_butt[i + 1]).html('<a id="one-butt" href="../hack_details/index.html?' + hack_link[i] + '">Learn More</a>')
    }

})
.catch(err=> console.log(err))
//end of code for getting hackathon details


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
  auth_tok=''
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("USER LOGGED IN")

      if(user.emailVerified==false){

        window.location.replace("../verify_account/index.html");
  
      }
    //   window.location.replace("/home_page/index.html");
    //   firebase.auth().currentUser.getIdToken(true)
    //     .then((idToken) => {
    //       console.log(idToken)
    //     })

    firebase.auth().currentUser.getIdToken(true)
    .then((idToken) => {
      //   console.log(idToken)
      
      auth_tok += idToken

      // code for getting content
      var requestOptions = {
        method: "GET",
        headers: {
          authtoken: auth_tok,
          "Content-Type": "application/json",
        }
      };

      fetch("https://hackportal.herokuapp.com/users/", requestOptions)
        .then((response) => {
          return response.json();
        })
        .catch(error=>{
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