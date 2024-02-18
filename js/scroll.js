window.addEventListener("scroll",function(){
    var header=document.querySelector("nav");
    var header1=document.getElementById("navbar");

        header.classList.toggle("abajo",window.scrollY>0);
        if(window.scrollY>0){
        header.style.backdropFilter="blur(20px)";   
        }
        if(window.scrollY==0){
        header.style.backdropFilter="blur(0px)";           
        }
})