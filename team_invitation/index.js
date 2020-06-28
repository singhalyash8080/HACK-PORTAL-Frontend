$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for getting content

var name= 'Team name'

var label1= 'Hackathon: '
var label2= 'Teamsize: '
var label3= 'Project Description:'
var label4= 'Skills Required:'
var label5= 'Team mates: '

var hackathon= 'DevSoc'
var team_size= '2/4'

var description= 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum omnis tempora natus. Velit non omnis debitis, accusamus nemo ipsa porro temporibus labore maxime, dicta sint eveniet? Nobis facilis illum debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptates doloremque incidunt perferendis nesciunt ullam ut, voluptas delectus earum et nihil culpa iste ipsam voluptatum corporis optio dolor obcaecati fugiat.'


var skills= ['Mobile App Development','Design UI/UX','Management skills','Machine learning']
var team_mates=['John Foster(Admin)','Foster John','Itachi Uchiha']


$(".team_name").text(name)

$(".label1").text(label1)
$(".hackathon_name").text(hackathon)

$(".label2").text(label2)
$(".team_size").text(team_size)

$(".label3").text(label3)
$(".description").text(description)

$(".label4").text(label4)
for (let i = 0; i < skills.length; i++) {
  $(".skills").append('<p class="points">'+skills[i]+'</p>')
}

$(".label5").text(label5)
for (let i = 0; i < team_mates.length; i++) {
  $(".team_mates").append('<p class="points">'+team_mates[i]+'</p>')
}

// end of code for getting hackathon