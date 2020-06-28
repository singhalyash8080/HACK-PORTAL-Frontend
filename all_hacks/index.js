// code for getting hackathon details of some hackathons

var hack_names=["hackathon 1","hackathon 2","hackathon 3","hackathon 4","hackathon 5"]

var hack_text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English..."
var hack_link='../hack_details/index.html'


var ob_head ={
    1:"one-head",
    2:"two-head",
    3:"three-head",
    4:"four-head",
    5:"five-head"
}

var ob_txt={
    1:"one-txt",
    2:"two-txt",
    3:"three-txt",
    4:"four-txt",
    5:"five-txt"
}

var ob_butt={
    1:"one-butt",
    2:"two-butt",
    3:"three-butt",
    4:"four-butt",
    5:"five-butt"
}

for (let i = 0; i <5; i++) {
    $("#"+ob_head[i+1]).text(hack_names[i]);
    $("#"+ob_txt[i+1]).text(hack_text);
    $("#"+ob_butt[i+1]).html('<a id="one-butt" href="'+hack_link+'">Learn More</a>')
}

function change(){
    hack_names=["hackathon 6","hackathon 7","hackathon 8","hackathon 9","hackathon 10"]
    hack_text="New established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English..."
    hack_link='../hack_details/index.html'

    for (let i = 0; i <5; i++) {
        $("#"+ob_head[i+1]).text(hack_names[i]);
        $("#"+ob_txt[i+1]).text(hack_text);
        $("#"+ob_butt[i+1]).html('<a id="one-butt" href="'+hack_link+'">Learn More</a>')
    }
}

//end of code for getting hackathon details