$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for content

var team_names= ['team 1','team 2','team 3','team 4']
var hack_names= ['hack 1','hack 2','hack 3','hack 4']
var description = ['Team ABC is a one of a kind team where you can grow your various skills in tech and other domains.Our project idea is to make a ...',
'Team ABC is a one of a kind team where you can grow your various skills in tech and other domains.Our project idea is to make a ...',
'Team ABC is a one of a kind team where you can grow your various skills in tech and other domains.Our project idea is to make a ...',
'Team ABC is a one of a kind team where you can grow your various skills in tech and other domains.Our project idea is to make a ...']

var admin_name = ['you','John Foster','Yash','You']

var team_link = ['../team_info/index.html','../team_info/index.html','../team_info/index.html','../team_info/index.html']


for (let i = 0; i < team_names.length; i++) {

  $(".content").append('<div class="team"> <p class="team_name">'+team_names[i]+'</p><p class="hack_name">'+hack_names[i]+'</p><p class="description">'
  +description+'</p><div class="list"><p class="item">Admin : '+admin_name[i]+'</p> <p class="item"><a href="'+team_link[i]+'" style="color:#fff;">View</p></div></div><br><br>')
}






