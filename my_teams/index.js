$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for content

var myHeaders = new Headers();
myHeaders.append("authtoken", "vaibhav");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://hackportal.herokuapp.com/users/getuserprofile", requestOptions)
  .then(response => response.json())
  .then(async (result) => {
    // console.log(result.teams)
    var team_link = '../team_info/index.html'

    for (let i = 0; i < result.teams.length; i++) {


      var myHeaders = new Headers();
      myHeaders.append("authtoken", "vaibhav");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch("https://hackportal.herokuapp.com/teams/getteaminfo/"+result.teams[i], requestOptions)
        .then(response => response.json())
        .then(results =>{
          $(".content").append('<div class="team"> <p class="team_name">'+results.teamName+'</p><p class="hack_name">'+results.nameOfEvent+'</p><p class="description">'
          +results.description+'</p><div class="list"><p class="item">Admin : '+'you'+'</p> <p class="item"><a href="'+team_link+'" style="color:#fff;">View</p></div></div><br><br>')
          // console.log('one')
        })
        .catch(error => console.log('error', error));
    }

    // console.log($('.content').html())

    // console.log($('.pagination').html())

  })
  .catch(error => console.log('error', error));





