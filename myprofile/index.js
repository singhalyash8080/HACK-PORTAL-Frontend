$(document).ready(function() {
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
    

    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});

// function to edit profile

function myEdit(button) {
    var x = document.getElementById("first_name").readOnly;
    if (x == true) {
        document.getElementById("first_name").readOnly = false;
        document.getElementById("last_name").readOnly = false;
        document.getElementById("password").readOnly = false;
        document.getElementById("email").readOnly = false;
    }
}

function mySave(button) {
    var x = document.getElementById("first_name").readOnly;

    if (x == false) {
        document.getElementById("first_name").readOnly = true;
        document.getElementById("last_name").readOnly = true;
        document.getElementById("password").readOnly = true;
        document.getElementById("email").readOnly = true;
    }
}

//end of function to edit profile
  