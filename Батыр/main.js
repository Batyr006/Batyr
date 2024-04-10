var icon = document.getElementById("mobil_menu");
var jsMenu = document.getElementById("idMenu");


icon.addEventListener("click", cntrol)
function cntrol(){
if(jsMenu.className === "menu"){
       jsMenu.className += " adaptive";
      }else{
        jsMenu.className = "menu";
    }
}

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors){
    anchor.addEventListener("click", function(event){
    event.preventDefault();
        
    const blockID = anchor.getAttribute("href")
        document.querySelector("" + blockID ).scrollIntoView({
        behavior: "smooth",
            block: "start"
        })
    
    })
}

