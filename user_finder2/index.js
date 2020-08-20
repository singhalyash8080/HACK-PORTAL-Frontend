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

        var names = []

        var college = []

        var profile_links = []

        var bio = []

        const queryString = window.location.search;
        console.log(queryString);

        var array2 = decodeURI(queryString).split('&')

        console.log(array2)
        var final = []

        for (let i = 0; i < array2.length; i++) {
          var x = ''
          var start = 9

          if (i == 0) {
            start = 10
          }
          for (let j = start; j < array2[i].length; j++) {
            x += array2[i][j]
          }
          final.push(x)
        }

        console.log(final)

        var raw = {
          skills: final
        }
        var myHeaders = new Headers();

        var requestOptions = {
          method: "POST",
          headers: {
            authtoken:auth_tok,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(raw),
        };

        fetch("https://hackportal.azurewebsites.net/users/searchuserprofiles/1", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            console.log(result);

            var page_count = result.totalPageCount

            if (result.documents.length > 5) {
              len = 5
            }
            else {
              len = result.documents.length
            }


            for (let i = 0; i < result.documents.length; i++) {
              names.push(result.documents[i].name)
              college.push(result.documents[i].college)
              bio.push(result.documents[i].bio)

              profile_links.push('../profile_info/index.html?' + result.documents[i]._id)

            }

            for (let i = 0; i < len; i++) {

              $(".content").append(
                '<a href="' + profile_links[i] + '"><div class="profiles"> <p class="text">' + names[i] + '</p><p class="text">' + college[i] + '</p><p class="text">' + bio[i] + '</p></div></a> <br>'
              )

            }

            $('.content').append('<div id="pages"><div class="pagination"></div></div>')

            var beg = 1
            var curr = 1

            if (page_count <= 6) {
              var end = page_count
            }
            else {
              var end = 6
            }

            $('.pagination').append('<a href="#" class="backpg" onclick="change3(' + beg + ',' + end + ',' + curr + ')">&laquo;</a>')

            for (let i = 1; i <= end; i++) {
              $('.pagination').append('<a href="#" class="disable pgs" id="page' + i.toString() + '" onclick="change(' + beg + ',' + i.toString() + ',' + curr + ')">' + i + '</a>')
            }

            $('.pagination').append('<a href="#" class="nextpg" onclick="change2(' + beg + ',' + end + ',' + curr + ',' + page_count + ')">&raquo;</a>')

            $('#page' + curr.toString()).attr("class", "active pgs")
          })
          .catch((error) => console.log("error", error));



        function change(beg, x, curr) {
          // console.log(
          //     $('#page'+x).attr("class")
          //     )

          // console.log(
          //     $('#page'+x).attr("id")
          //     )

          if (('page' + x) != ('page' + curr.toString())) {

            $("#page" + curr.toString()).attr("class", "disable pgs")
            $('#page' + x).attr("class", "active pgs")

            curr = x.toString()
            // console.log('curr : '+curr)

            var names = []

            var college = []

            var profile_links = '#'

            var bio = []

            for (let i = 0; i < result.documents.length; i++) {
              names.push(result.documents[i].name)
              college.push(result.documents[i].college)
              bio.push(result.documents[i].bio)

            }

            const queryString = window.location.search;
            console.log(queryString);

            var array2 = decodeURI(queryString).split('&')

            console.log(array2)
            var final = []

            for (let i = 0; i < array2.length; i++) {
              var x = ''
              var start = 9

              if (i == 0) {
                start = 10
              }
              for (let j = start; j < array2[i].length; j++) {
                x += array2[i][j]
              }
              final.push(x)
            }

            console.log(final)

            var raw = {
              skills: final
            }

            var requestOptions = {
              method: "POST",
              headers: {
                authtoken:auth_tok,
                    "Content-Type": "application/json",
              },
              body: JSON.stringify(raw),
            };

            fetch("https://hackportal.azurewebsites.net/users/searchuserprofiles/" + curr, requestOptions)
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                console.log(result);

                var page_count = result.totalPageCount

                if (result.documents.length > 5) {
                  len = 5
                }
                else {
                  len = result.documents.length
                }

                for (let i = 0; i < len; i++) {

                  $(".content").append(
                    '<a href="' + profile_links[i] + '"><div class="profiles"> <p class="text">' + names[i] + '</p><p class="text">' + college[i] + '</p><p class="text">' + bio[i] + '</p></div></a> <br>'
                  )

                }

                $('.content').append('<div id="pages"><div class="pagination"></div></div>')

                var beg = 1
                var curr = 1

                if (page_count <= 6) {
                  var end = page_count
                }
                else {
                  var end = 6
                }

                $('.pagination').append('<a href="#" class="backpg" onclick="change3(' + beg + ',' + end + ',' + curr + ')">&laquo;</a>')

                for (let i = 1; i <= end; i++) {
                  $('.pagination').append('<a href="#" class="disable pgs" id="page' + i.toString() + '" onclick="change(' + beg + ',' + i.toString() + ',' + curr + ')">' + i + '</a>')
                }

                $('.pagination').append('<a href="#" class="nextpg" onclick="change2(' + beg + ',' + end + ',' + curr + ',' + page_count + ')">&raquo;</a>')

                $('#page' + curr.toString()).attr("class", "active pgs")
              })
              .catch((error) => console.log("error", error));

          }

        }

        function change2(beg, end, curr, page_count) {

          if (end == page_count) {
          }
          else {

            if ((page_count - end) < 6) {
              beg = end + 1
              end += (page_count - end)
            }
            else {
              beg = end + 1
              end += 6
            }

          }

          curr = beg

          $('.pagination').empty()

          $('.pagination').append('<a href="#" class="backpg" onclick="change3(' + beg + ',' + end + ',' + curr + ')">&laquo;</a>')

          for (let i = beg; i <= end; i++) {
            $('.pagination').append('<a href="#" class="disable pgs" id="page' + i.toString() + '" onclick="change(' + beg + ',' + i.toString() + ',' + curr + ')">' + i + '</a>')
          }

          $('.pagination').append('<a href="#" class="nextpg" onclick="change2(' + beg + ',' + end + ',' + curr + ',' + page_count + ')">&raquo;</a>')

          $('#page' + curr.toString()).attr("class", "active pgs")

        }

        function change3(beg, end, curr) {

          if (beg > 6) {

            end = beg - 1
            beg -= 6


            curr = end

            $('.pagination').empty()

            $('.pagination').append('<a href="#" class="backpg" onclick="change3()">&laquo;</a>')

            for (let i = beg; i <= end; i++) {
              $('.pagination').append('<a href="#" class="disable pgs" id="page' + i.toString() + '" onclick="change(' + beg + ',' + i.toString() + ')">' + i + '</a>')
            }

            $('.pagination').append('<a href="#" class="nextpg" onclick="change2()">&raquo;</a>')

            $('#page' + curr.toString()).attr("class", "active pgs")

          }

        }


        //end of code for getting hackathon details

      })
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN")
  }
})

$(document).ready(function () {
  $('.sidenav').sidenav();
});


