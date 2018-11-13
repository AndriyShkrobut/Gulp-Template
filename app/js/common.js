var i;
var x = document.querySelector('.menu');
var h = document.querySelector('body');
var y = document.getElementById('Burger');
var z = document.querySelectorAll('.menu a');
var t1 = document.querySelectorAll('.burg span:nth-child(1)');
var t2 = document.querySelectorAll('.burg span:nth-child(2)');

Burger.onclick = function showMenu(){
    if(y.className == "burg")
    {
        y.className += " clicked";
        t1[0].style.width = 50 + "%";
        t2[0].style.width = 75 + "%";
        // x.style.width = 80.3 + "%";
        x.style.height = 66 + "px";
        setTimeout(function() {
            for (i = 0; i < z.length; i++) {
                z[i].style.opacity = 1;
            }
        }, 150);
    }
    else
    {
        y.className = "burg";
        t1[0].style.width = 100 + "%";
        t2[0].style.width = 100 + "%";
        // x.style.width = 0;
        x.style.height = 0;
        setTimeout(function() {
            for (i = 0; i < z.length; i++) {
                z[i].style.opacity = 0;
            }
        }, 10);        
    }
}