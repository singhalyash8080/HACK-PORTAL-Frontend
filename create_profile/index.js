const slidePage=document.querySelector(".slidepage");
const firtNextBtn=document.querySelector(".nextBtn");
const nextBtnSec=document.querySelector(".next-1");
const submitBtn=document.querySelector(".submit");
const progressCheck=document.querySelectorAll(".step .check");
const bullet=document.querySelectorAll(".step .bullet");
let max=4;
let current=1;
firtNextBtn.addEventListener("click",function(){
    slidePage.style.marginLeft="-25%";
    bullet[current-1].classList.add("active");
    progressCheck[current-1].classList.add("active");
    current += 1;
});

nextBtnSec.addEventListener("click",function(){
    slidePage.style.marginLeft="-50%";
    bullet[current-1].classList.add("active");
    progressCheck[current-1].classList.add("active");
    current += 1;
});
submitBtn.addEventListener("click",function(){
    bullet[current-1].classList.add("active");
    progressCheck[current-1].classList.add("active");
    current += 1;
    setTimeout(function(){
        alert("Your profile is complete!");
        location.reload();
    },800);
});
