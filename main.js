


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
    console.log('hihihi');
} else {
    console.log("nonno");
    ready();
}

let navbtn = document.querySelector(".js-header-nav");
    let closebtn = document.querySelector("#nav-close");

    let bgheader = document.querySelector(".js-header-bg");

    let header_navArea = document.querySelector(".js-header-navArea");

    let moblie_toogle = document.querySelectorAll(".js-header-toggleClick");

    let add_cart = document.querySelector(".js-cart-btn");
    let header__side = document.querySelector(".js-header-cartArea");

    let search__btn = document.querySelector(".js-search-btn");
    let search__inner = document.querySelector(".js-header-searchArea");


    let mobile__cart = document.querySelector(".js-header-cart");
    let mobile__cart2 = document.querySelector(".js-cart-two");
function ready(){

    
    
    navbtn.addEventListener('click', function(e) {
        
        navbtn.classList.toggle("is-active");
        // header_navArea.classList.toggle("is-open");
        if(header__side.classList.contains('is-open') || search__inner.classList.contains('is-open')){
            setTimeout(function(){
                header__side.style.display = "none";
                search__inner.style.display = "none";
                // bgheader.style.display = "none";
            }, 300);
        }
        if (navbtn.classList.contains('is-active')) {
            dis2(header_navArea);
            dis2(bgheader);
            
            
        } else  {
            dis2(header_navArea);
            dis2(bgheader);
            
            setTimeout(function(){
                bgheader.style.display = "none";
            }, 300);
            setTimeout(function(){
                header_navArea.style.display = "none";
            }, 300);
            
        }
    },false)

    add_cart.addEventListener('click',function(e) {

        cart();

    },false);  

    mobile__cart.addEventListener('click',function(e) {

        cart();

    },false);  

    mobile__cart2.addEventListener('click',function(e) {

        cart();

    },false);  

    search__btn.addEventListener('click',function(e) {


        
        if(!header_navArea.classList.contains('is-open') ){
            navbtn.classList.toggle("is-active");
        }
        
        if (navbtn.classList.contains('is-active')) {
            dis2(search__inner);
            // header__side.style.display = "block";
            dis2(bgheader);
        } else {
            
            dis2(search__inner);
            dis2(bgheader);
            
            setTimeout(function(){
                search__inner.style.display = "none";
                bgheader.style.display = "none";
            }, 300);
            
        }

    },false);   



    Array.from(moblie_toogle).forEach((element,i) => {
        element.addEventListener('click', (l)=>{
            element.classList.toggle("is-active");
            document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
            
            document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
        });
    });
}
function dis(element){
    let isor = (element.classList.contains("is-active")? "block" : "none");
    let opa = (element.classList.contains("is-active")? "1" : "0");

    return [isor,opa];
}
function dis2(element){
    if(navbtn.classList.contains("is-active")){
        element.style.display = "block";
        element.classList.add("is-open");
        element.classList.remove("out");
    }else{
        element.classList.remove("is-open");
        element.classList.remove("out");
    }
}

function cart(){
    if(!header_navArea.classList.contains('is-open') ){
        navbtn.classList.toggle("is-active");
    }

    if(search__inner.classList.contains('is-open')){
        setTimeout(function(){
            search__inner.style.display = "none";
        }, 300);
    }
    
    if (navbtn.classList.contains('is-active')) {
        dis2(header__side);
        // header__side.style.display = "block";
        dis2(bgheader);
    } else {
        
        dis2(header__side);
        dis2(bgheader);
        
        setTimeout(function(){
            header__side.style.display = "none";
            bgheader.style.display = "none";
        }, 300);
        
    }

    
}


// export default dis2();