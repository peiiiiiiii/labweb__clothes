// import dis2 from "./main";

let toggle__title = document.querySelectorAll(".js-toggleClick");

let toggle__content = document.querySelectorAll(".js-toggleClickArea");

function toggledispaly(element){
    let isor = (element.classList.contains("is-open")? "block" : "none");
    let opa = (element.classList.contains("is-open")? "1" : "0");

    return [isor,opa];
}


Array.from(toggle__title).forEach((element, i) => {
    element.addEventListener('click',() =>{
        element.classList.toggle("is-open");
        toggle__content[i].style.display = toggledispaly(element)[0];
        console.log(toggle__content[i]);
    })
});



// Array.from(moblie_toogle).forEach((element,i) => {
//     element.addEventListener('click', (l)=>{
//         element.classList.toggle("is-active");
//         document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
        
//         document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
//     });
// });


// detail
let search__item = document.querySelectorAll(".js-toggleClick-filter");
let search__area = document.querySelectorAll(".js-toggleClickArea-filter");



function dis2(parentnode,element){
    if(parentnode.classList.contains("is-open")){
        element.style.display = "block";
        element.classList.add("is-open");
        element.classList.remove("out");
    }else{
        element.classList.remove("is-open");
        element.classList.remove("out");
    }
}

// detsal


Array.from(search__item).forEach((element, i) => {
    element.addEventListener('click',() =>{
        element.classList.toggle("is-open");
        console.log(i)
        if(search__item[0].classList.contains('is-open') && !search__item[1].classList.contains('is-open')){
            // element.classList.toggle("is-open");
            setTimeout(function(){
                search__area[1].style.display = "none";
            }, 200);
            console.log("hit 0")
        }
        if(search__item[1].classList.contains('is-open') && !search__item[0].classList.contains('is-open')){
            
            setTimeout(function(){
                search__area[0].style.display = "none";
            }, 200);
            console.log("hit 1")
        }

        if (element.classList.contains('is-open')) {
            dis2(element, search__area[i]);
        } else {
            dis2(element, search__area[i]);
            setTimeout(function(){
                search__area[i].style.display = "none";
            }, 200);
        }
    })
});