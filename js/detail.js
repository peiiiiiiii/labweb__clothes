// import dis2 from "./main";

let token = localStorage.getItem('token');





// Array.from(moblie_toogle).forEach((element,i) => {
//     element.addEventListener('click', (l)=>{
//         element.classList.toggle("is-active");
//         document.querySelectorAll(".js-header-inview dd")[i].style.display = dis(element)[0];
        
//         document.querySelectorAll(".js-header-inview dd")[i].style.opacity = dis(element)[1];
//     });
// });


// get url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get('id')



// new
// <div class="btn__box detail__btn js-add-cart">

import CART from "./shoppingCart.js";
import { addItem,addLikeItem } from "./shoppingCart.js";

import {showProducts} from "./shoppingCart.js";
import {showProducts2} from "./shoppingCart.js";
import {showCart} from "./shoppingCart.js";
import {incres} from "./shoppingCart.js";
import {decrea} from "./shoppingCart.js";
import {getDetail} from "./fornt__api.js";
import {ViewRecoder} from "./fornt__api.js";
import { getrandom4} from "./fornt__api.js";




// let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', ()=>{
    const status = async() => {
      let res = await getDetail(productID);
      let likeCount = await ViewRecoder(productID);
      // let likeCount = await LikeCommodity(productID);
      await getProducts(res,likeCount);
      // console.log(res);
    }
    const statusRandom = async() => {
      let res = await getrandom4();
      // console.log(res);
      showProducts2(res);
    }

    status();
    statusRandom();


    CART.init();
    
    
    showCart();
    incres();
    decrea();
    

    
    
    

    // plus_item.addEventListener("click" , function(ev){
    //     ev.preventDefault();
        
    //     let id = parseInt(ev.target.getAttribute('data-id'));
        
    //     CART.increase(id, 1);
    //     let controls = ev.target.parentElement;
    //     let qty = controls.querySelector('div:nth-child(2)');
    //     let item = CART.find(id);
        
    //     if(item){
    //         qty.textContent = item.qty;
    //     }else{
    //         document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement);
    //     }

        
    
    // });
    
    

    
    
        
    
});


//猜你喜歡



async function getProducts(res,likeCount){
    const status2 = async(res,likeCount) => {
      let ress = await showProducts(res,likeCount);
      
    }
    status2(res,likeCount);
    // ---------------
    let slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
    slide(slider, sliderItems, prev, next);
    
    // const slider = new Slider(
    //   document.querySelector(".slider")
    // );
    
    // detail add
    let mins_detail = document.querySelector(".js-detail-mins");
    let add__input = document.querySelector("#add__input");

    mins_detail.addEventListener("click" , function(ev){
        ev.preventDefault();
        if(parseInt(add__input.value)<= 1){
            add__input.value = parseInt(1);
        }else{
            add__input.value = parseInt(add__input.value) - parseInt(1);
        }
        

    })
        
    let add_detail = document.querySelector(".js-detail-add");
    
    add_detail.addEventListener("click" , function(ev){
        ev.preventDefault();
        add__input.value = parseInt(add__input.value) + 1;
    })
    function showcartlist(element){
        element.style.display = "block";
        element.classList.add("is-open");
        element.classList.remove("out");
    }

    let add__cart = document.querySelector(".js-add-cart");
    let add__wishlist = document.querySelector("#js-wishlistdetail");
    
    let input__q = document.querySelector("#add__input");
    let navbtn = document.querySelector(".js-header-nav");
    let bgheader = document.querySelector(".js-header-bg");
    let header__side = document.querySelector(".js-header-cartArea");
    let wish__side = document.querySelector(".js-header-wishArea");
    let final__size =document.getElementsByName('option-size');
    let final__color =document.getElementsByName('option-color');
    let SIZE = '';
    let COLOR = '';

    // cart show
    add__cart.addEventListener("click" , function(e){
        e.preventDefault();

        // size
        for( let i in final__size ){
            if (final__size[i].checked) {
                SIZE = final__size[i].value
                
                break;
            }
        }
        // color
        for( let i in final__color ){
            if (final__color[i].checked) {
                COLOR = final__color[i].value
                
                break;
            }
        }
        // console.log(COLOR);

        // color
        let qty_input = parseInt(input__q.value);
        addItem(e,qty_input,SIZE,COLOR);
        // location.reload();
        navbtn.classList.toggle("is-active");
        showcartlist(header__side);
        showcartlist(bgheader);
        incres();
        decrea();
    });
    add__wishlist.addEventListener("click" , function(e){
      console.log('fwefwe');
        e.preventDefault();

        addLikeItem(e);
        // location.reload();
        navbtn.classList.toggle("is-active");
        showcartlist(wish__side);
        showcartlist(bgheader);
    });
    

}




function errorMessage(err){
    //display the error message to the user
    console.error(err);
}



// slider


function slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;
    items.appendChild(cloneLast);
    console.log(firstSlide)
    items.insertBefore(cloneFirst,cloneLast);
    firstSlide.classList.add('active');
    // wrapper.classList.add('loaded');

    
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });
  
  // Transition events
  // items.addEventListener('webkitTransitionEnd', checkIndex);
  // items.addEventListener('transitionend', checkIndex);
  ["transitionend", "webkitTransitionEnd", "mozTransitionEnd"].forEach(function(transition) {
    items.addEventListener(transition, checkIndex, false);
  });

  // function handler() {
  //   // thing
  // }
  

  const lens = document.querySelector("#lens");
  const resultimg = document.querySelector("#result");
  const slideractive = document.querySelector('.slider-item.active img');
  // document.addEventListener("mousemove", function(e){
   
  //   let xs = e.clientX; 
  //   let ys = e.clientY;

  //   function outerWidth(el) {
  //     var width = el.offsetWidth;
  //     var style = getComputedStyle(el);
    
  //     width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  //     return width;
  //   }
  //   function outerHeight(el) {
  //     var height = el.offsetHeight;
  //     var style = getComputedStyle(el);
    
  //     height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  //     return height;
  //   }
    

  //   let imgx1 = slideractive.offsetLeft;
  //   let imgx2 = outerWidth(slideractive) + imgx1;
  //   let imgy1 = slideractive.offsetTop;
  //   let imgy2 = outerHeight(slideractive) + imgy1;

  //   // console.log("x", xs);
  //   // console.log("imgx1", imgx1);
  //   // console.log("imgx2", imgx2);
  //   // console.log("y", ys);
  //   // console.log("imgy", slideractive.offsetTop);
  //   // console.log("imgy2", imgy2);
  //   if ( xs > imgx1 && xs < imgx2 && ys > imgy1 && ys < imgy2 ) {
  //     lens.style.display = "block"; 
  //     resultimg.style.display = "block"; 
      
  //     imageZoom( slideractive, resultimg,lens);
  //   } else {
  //     lens.style.display="none"; 
  //     resultimg.style.display = "none"; 
  //   }
    
  // })

  function imageZoom(imgID, resultID,lens) {
    let img, result, cx, cy;
    img = imgID;
    result = resultID;
    /*create lens:*/
    // lens = document.createElement("DIV");
    // lens.setAttribute("class", "img-zoom-lens");
    console.log(img.offsetWidth)
    lens.style.width =  img.offsetWidth / 2;
    lens.style.height = img.offsetWidth / 2;
    /*insert lens:*/
    // img.parentElement.insertBefore(lens, img);
    
    cx = result.offsetWidth / lens.offsetWidth;
    
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    slides[index].classList.add('active');
    allowShift = true;
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }
      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++; 
        slides[index].classList.add('active');
        slides[index-1].classList.remove('active');     
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;   
        slides[index].classList.add('active');
        slides[index +1].classList.remove('active');   
      }
    };
    
    allowShift = false;
    checkIndex();
  }
    
  function checkIndex (){
    // slides[index-1].classList.remove('active');
    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    allowShift = true;
  }
}