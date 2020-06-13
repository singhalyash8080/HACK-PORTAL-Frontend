
// code for getting hackathon details of some hackathons

var hack_names=["hackathon 1","hackathon 2","hackathon 3","hackathon 4","hackathon 5","hackathon 6","hackathon 7"]

var hack_text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English..."
var hack_link='temp/join_first.html'


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

//end of code for getting hackathon details

//code for getting popular teams

var team_names=["team 1","team 2","team 3","team 4","team 5 ","team 6","team 7"]

var team_descp='njfenvj dsnfkjnsfj kns gkjnsjkjkgn dsjg sjgknskgs kgkms gknskjgnks mk dksgmklsdmgklds mk sklgklsmd ngjndfjgnjf ndf gkj df jgdfn gj jdf gkj df njkdf jg dfj gjjj kj nj fdj...'
var team_link='nothing'


var ob_head={
    1:"one-head2",
    2:"two-head2",
    3:"three-head2",
    4:"four-head2",
    5:"five-head2"
}

var ob_txt={
    1:"one-txt2",
    2:"two-txt2",
    3:"three-txt2",
    4:"four-txt2",
    5:"five-txt2"
}


var ob_butt={
    1:"one-butt2",
    2:"two-butt2",
    3:"three-butt2",
    4:"four-butt2",
    5:"five-butt2"
}


for (let i = 0; i <5; i++) {
    $("#"+ob_head[i+1]).text(team_names[i]);
    $("#"+ob_butt[i+1]).html('<a id="one-butt" href="'+team_link+'">View</a>')
    $("#"+ob_txt[i+1]).text(team_descp);
}

//end of code for getting teams




