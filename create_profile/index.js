
$(document).ready(function(){
    $("#form1-butt").click(function(){

        $("#line1").css("visibility", "initial");
        $("#point1").css("background-color", "#3D5A80");
        $("#point1").css("color", "white");
        $(".form1").css("display", "none");
        $(".form2").css("display", "initial");
    });
  });

$(document).ready(function(){
    $("#form2-butt").click(function(){

        $("#line2").css("visibility", "initial");
        $("#point2").css("background-color", "#3D5A80");
        $("#point2").css("color", "white");
        $(".form2").css("display", "none");
        $(".form3").css("display", "initial");
    });
  });

// $(document).ready(function(){
//   $("#form3-butt").click(function(){
      
//   });
// });