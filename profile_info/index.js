$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for getting content

var name= 'Pamela Foster'

var label1= 'Email:'
var label2= 'University name:'
var label3= 'Year of graduation:'
var label4= 'Description:'
var label5= 'Skills:'
var label6= 'Github link: '
var label7= 'Stackoverflow link: '
var label8= 'Website: '

var email= 'pamela.foster@example.com'
var university= 'Vellore Institute of Technology'
var year= '2020'

var description= 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum omnis tempora natus. Velit non omnis debitis, accusamus nemo ipsa porro temporibus labore maxime, dicta sint eveniet? Nobis facilis illum debitis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptates doloremque incidunt perferendis nesciunt ullam ut, voluptas delectus earum et nihil culpa iste ipsam voluptatum corporis optio dolor obcaecati fugiat.'


var skills= ['Mobile App Development','Design UI/UX','Management skills','Machine learning']

var invite_link='../add_to_team/index.html'

var github= 'https://devsoc.codechefvit.com/ '
var stackoverflow= 'https://devsoc.codechefvit.com/ '
var website= 'https://devsoc.codechefvit.com/ '


$(".name").text(name)

$(".label1").text(label1)
$(".email").text(email)

$(".label2").text(label2)
$(".university").text(university)

$(".label3").text(label3)
$(".year").text(year)

$(".label4").text(label4)
$(".description").text(description)

$(".label5").text(label5)
for (let i = 0; i < skills.length; i++) {
  $(".skills").append('<p class="points">'+skills[i]+'</p>')
}

$(".label6").text(label6)
$(".github").html('<a href='+github+'>'+ github +'</a>')

$(".label7").text(label7)
$(".stackoverflow").html('<a href='+stackoverflow+'>'+ stackoverflow +'</a>')

$(".label8").text(label8)
$(".website").html('<a href='+website+'>'+ website +'</a>')

$(".invite").append('<button> <a href="'+invite_link+'" style="text-decoration:none;">Invite</a> </button>')
// end of code for getting hackathon