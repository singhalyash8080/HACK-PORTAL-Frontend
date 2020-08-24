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

var auth_tok = ''

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


// code for getting hackathon details of some hackathons

var hack_names = []

var hack_text = []
var hack_link = []


var ob_head = {
    1: "one-head",
    2: "two-head",
    3: "three-head",
    4: "four-head",
    5: "five-head"
}

var ob_txt = {
    1: "one-txt",
    2: "two-txt",
    3: "three-txt",
    4: "four-txt",
    5: "five-txt"
}

var ob_butt = {
    1: "one-butt",
    2: "two-butt",
    3: "three-butt",
    4: "four-butt",
    5: "five-butt"
}

var arrayy = ['<div id="one"><h5 id="one-head"></h5><p id="one-txt"></p><a id="one-butt" ></a></div><br>', '<div id="two"><h5 id="two-head"></h5><p id="two-txt"></p><a id="two-butt" ></a></div><br>',
    '<div id="three"><h5 id="three-head"></h5><p id="three-txt"></p><a id="three-butt" ></a></div><br>', '<div id="four"><h5 id="four-head"></h5><p id="four-txt"></p><a id="four-butt" ></a></div><br>',
    '<div id="five"><h5 id="five-head"></h5><p id="five-txt"></p><a id="five-butt" ></a></div><br>']

const url = 'https://hackportal.herokuapp.com/events/getevents/1'

var num_pages=''

axios.get(url)
    .then(data => {
        console.log(data.data)
        $('.part2-1').append('<h4 class="part2-1-head">All Hackathons</h4>')
        $('.part2-1').append('<br><br>')
        // $('.part2-1-head').append('<div id="one"><h5 id="one-head"></h5><p id="one-txt"></p><a id="one-butt" ></a></div><br>')

        var page_count = data.data.totalPageCount

        num_pages = page_count

        if (data.data.documents.length > 5) {
            len = 5
        }
        else {
            len = data.data.documents.length
        }

        for (let i = 0; i < len; i++) {

            $('.part2-1').append(arrayy[i])
        }

        $('.part2-1').append('<div id="pages"><div class="pagination"></div></div>')


        for (let i = 0; i < len; i++) {

            hack_names.push(data.data.documents[i].nameOfEvent)

            var desc_limit = (data.data.documents[i].description).split(" ")
            // console.log(desc_limit)

            if (desc_limit.length > 40) {

                var desc_text = ''

                for (let j = 0; j < 40; j++) {

                    if (j == 39) {
                        desc_text += (desc_limit[j] + '....')
                    }
                    else {
                        desc_text += (desc_limit[j] + ' ')
                    }

                }

                hack_text.push(desc_text)

            }
            else {
                hack_text.push(data.data.documents[i].description)
            }

            hack_link.push(data.data.documents[i]._id)
        }

        for (let i = 0; i < len; i++) {
            $("#" + ob_head[i + 1]).text(hack_names[i]);
            $("#" + ob_txt[i + 1]).text(hack_text[i]);
            $("#" + ob_butt[i + 1]).html('<a id="one-butt" href="../hack_details/index.html?' + hack_link[i] + '">Learn More</a>')
        }

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
    .catch(err => console.log(err))

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

        hack_names = []
        hack_text = []
        hack_link = []

        const url = 'https://hackportal.herokuapp.com/events/getevents/' + curr

        console.log(url)

        axios.get(url)
            .then(data => {
                console.log(data.data)
                $('.part2-1').empty()

                // console.log($('.part2-1').html())

                $('.part2-1').append('<h4 class="part2-1-head">All Hackathons</h4>')
                $('.part2-1').append('<br><br>')

                // console.log(arrayy)

                var page_count = num_pages

                // console.log('PA '+page_count)

                if (data.data.documents.length > 5) {
                    len = 5
                }
                else {
                    len = data.data.documents.length
                }

                for (let i = 0; i < len; i++) {

                    $('.part2-1').append(arrayy[i])
                }

                $('.part2-1').append('<div id="pages"><div class="pagination"></div></div>')


                for (let i = 0; i < len; i++) {

                    hack_names.push(data.data.documents[i].nameOfEvent)

                    var desc_limit = (data.data.documents[i].description).split(" ")
                    // console.log(desc_limit)

                    if (desc_limit.length > 40) {

                        var desc_text = ''

                        for (let j = 0; j < 40; j++) {

                            if (j == 39) {
                                desc_text += (desc_limit[j] + '....')
                            }
                            else {
                                desc_text += (desc_limit[j] + ' ')
                            }

                        }

                        hack_text.push(desc_text)

                    }
                    else {
                        hack_text.push(data.data.documents[i].description)
                    }


                    hack_link.push(data.data.documents[i]._id)

                }

                // console.log(hack_names)
                // console.log(hack_text)
                // console.log(hack_link)

                for (let i = 0; i < len; i++) {
                    $("#" + ob_head[i + 1]).text(hack_names[i]);
                    $("#" + ob_txt[i + 1]).text(hack_text[i]);
                    $("#" + ob_butt[i + 1]).html('<a id="one-butt" href="../hack_details/index.html?' + hack_link[i] + '">Learn More</a>')
                }

                if (page_count <= 6) {
                    var end = page_count
                }
                else {
                    var end = 6
                }

                console.log('pages '+end)

                $('.pagination').append('<a href="#" class="backpg" onclick="change3(' + beg + ',' + end + ',' + curr + ')">&laquo;</a>')

                for (let i = 1; i <= end; i++) {
                    $('.pagination').append('<a href="#" class="disable pgs" id="page' + i.toString() + '" onclick="change(' + beg + ',' + i.toString() + ',' + curr + ')">' + i + '</a>')
                }

                $('.pagination').append('<a href="#" class="nextpg" onclick="change2(' + beg + ',' + end + ',' + curr + ',' + page_count + ')">&raquo;</a>')

                $('#page' + curr.toString()).attr("class", "active pgs")

            })
            .catch(err => console.log(err))

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