$(document).ready(function(){
    $('.sidenav').sidenav();
  });


var profile_count= 5

var names= ['Sample name 1','Sample name 2','Sample name 3','Sample name 4','Sample name 5']

var skills= [['<p class="item">Devops</p>','<p class="item">Artificial Intelligence </p>','<p class="item"> Design UI/UX </p>','<p class="item"> Mobile App Development </p>'],['<p class="item">Devops</p>','<p class="item">Artificial Intelligence </p>','<p class="item"> Design UI/UX </p>'],['<p class="item"> Devops </p>','<p class="item"> Artificial Intelligence </p>'],['<p class="item">Devops </p>','<p class="item"> Artificial Intelligence </p>'],['<p class="item"> Devops </p>']]

var profile_links= ['../profile_info/index.html','../profile_info/index.html','../profile_info/index.html','../profile_info/index.html','../profile_info/index.html']

var store_skills=[]

for (let i = 0; i < profile_count; i++){
    var temp= ''

    for(let j = 0; j < 4; j++) {

        if(skills[i][j]){
            temp+=skills[i][j]
        }
    }

    store_skills.push(temp)
} 

for (let i = 0; i < profile_count; i++) {

    $(".content").append(
        '<div class="profiles"> <a href="'+ profile_links[i] +'"> <p class="text">'+ names[i] + '</p> <div class="list">'+ store_skills[i] +'</div> </a> </div> <br>'
    )
    
}