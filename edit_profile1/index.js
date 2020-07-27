$(document).ready(function(){
    $('.sidenav').sidenav();
  });

// code for getting content

var label1= 'Email:'
var label2= 'University name:'
var label3= 'Year of graduation:'
var label4= 'Description:'
var label5= 'Skills:'
var label6= 'Github link: '
var label7= 'Stackoverflow link: '
var label8= 'Website: '


const url='https://hackportal.herokuapp.com/users/getuserprofile'
const params={
  headers:{
    authtoken:'vaibhav'
  }
}

axios.get(url,params)
      .then(data => {
        
        var name=data.data.name
        $(".name").text(name)

        var email= data.data.email
        $(".label1").text(label1)
        $(".email").text(email)

        var university= data.data.college
        $(".label2").text(label2)
        $(".university").text(university)

        var year= data.data.expectedGraduation
        $(".label3").text(label3)
        $(".year").text(year)

        var description= data.data.bio
        $(".label4").text(label4)
        $(".description").text(description)

        $(".label5").text(label5)
        for (let i = 0; i < data.data.skills.length; i++) {

          $(".skills").append('<p class="points">'+data.data.skills[i]+'</p>')
        }

        $(".label6").text(label6)
        $(".github").html('<a href='+data.data.githubLink+'>'+ data.data.githubLink +'</a>')

        $(".label7").text(label7)
        $(".stackoverflow").html('<a href='+data.data.stackOverflowLink+'>'+ data.data.stackOverflowLink +'</a>')


        $(".label8").text(label8)
        $(".website").html('<a href='+data.data.externalLink+'>'+ data.data.externalLink +'</a>')
      })
      .catch(err=> console.log(err))

// end of code for getting hackathon