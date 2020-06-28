var view_team= ['team 1','team 2','team 3','team 4','team 5']
var view_team_link = ['../team_invitation/index.html','../team_invitation/index.html','../team_invitation/index.html','../team_invitation/index.html','../team_invitation/index.html']


var view_sent= ['person 1','person 2','person 3']
var view_sent_link= ['#','#','#']


for (let i = 0; i < view_team.length; i++){
    $(".view_team").append('<div class="field"> <p class="txt">'+ view_team[i] +'</p> <div class="lnk"> <a class="lnk_inside" href="'+view_team_link[i]+'">View</a> </div>' +'</div><br>')
}

for (let i = 0; i < view_sent.length; i++){
    $(".view_sent").append('<div class="field"> <p class="txt">'+ view_sent[i] +'</p> <div class="lnk"> <a class="lnk_inside" href="'+view_sent_link[i]+'">View</a> </div>' +'</div><br>')
}


