$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for getting content

var hack_name= 'DevSoc'

var label1= 'Link :'

var venue= 'Anna Auditorium,VIT'
var days='Monday to Wednesday'
var date= '16th-18th March, 2020'

var description= 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum omnis tempora natus. Velit non omnis debitis, accusamus nemo ipsa porro temporibus labore maxime, dicta sint eveniet? Nobis facilis illum debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptates doloremque incidunt perferendis nesciunt ullam ut, voluptas delectus earum et nihil culpa iste ipsam voluptatum corporis optio dolor obcaecati fugiat.'


var skills= ['Mobile App Development','Design UI/UX','Management skills','Machine learning']
var team_mates=['John Foster(Admin)','Foster John','Itachi Uchiha']
var link='https://devsoc.codechefvit.com/ '
var invite_link='../add_team/index.html'


$(".hack_name").text(hack_name)

$(".venue").text(venue)

$(".days").text(days)
$(".date").text(date)

$(".description").text(description)

$(".label1").text(label1)
$(".link").html('<a href="https://devsoc.codechefvit.com/">'+link+'</a>')

$(".invite").append('<button> <a href='+invite_link+'>Create team</a> </button>')

// end of code for getting hackathon