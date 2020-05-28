

  $(document).ready(function(){
    $('.modal').modal();
  });
 function myfunction()
 {
     var x=document.getElementById("mydiv");
     if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
 }
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
  });


        