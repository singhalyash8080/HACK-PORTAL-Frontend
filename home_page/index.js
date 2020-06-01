$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for getting all the hackathons on the page
var hack_names=["hackathon 1","hackathon 2","hackathon 3","hackathon 4","hackathon 5","hackathon 6","hackathon 7"]
var hack_text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
var view_link='../temp/hack_detail.html'


for (let i = 0; i < hack_names.length; i++) {
  $(".content").append('<br><h5>'+hack_names[i]+'</h5>');
  $(".content").append('<p>' + hack_text + '<p>');
  $(".content").append('<a id="one-butt" class="waves-effect waves-light btn" href="' + view_link + '">View Details</a><br>')
}

//end of code for getting all the upcoming hackathons