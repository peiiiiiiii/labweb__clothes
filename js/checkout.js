let checkout = localStorage.getItem("shopping cart");
let ccheck = JSON.parse(checkout);
let put__conent = '';
let table__content = '';
let pay = '';
let addOption = 0;
let payWay = 0;
let totallll = 0;
let t2 = 0;
const PRO_RES = [];
let DISDETAIL = [];
let MINSHOW = 0;
let couponss = [];

let cart__form = document.querySelector(".cart__form");
// cart__form
import CART from "./shoppingCart.js";
import {showCart} from "./shoppingCart.js";
import {incres} from "./shoppingCart.js";
import {decrea} from "./shoppingCart.js";
import {convert} from './main.js';
import { getProfile } from "./fornt__api.js";
import { checkoutApi,couponCompare } from "./fornt__api.js";


// 
const circles = document.querySelectorAll('.circle');
const progress = document.querySelector('.progress');
const next = document.querySelector('#next');
const couponBtn = document.querySelector('#coupon__btn');
const couponInput = document.querySelector('#coupon__input');
const step2 = document.querySelector('#step2');
const step2Boreder = document.querySelector(".checkout__input");


const prev = document.querySelector('#prev');
let currentNumber = 1;
// 

document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.removeItem("coupons")
    CART.init();
    
    
    showCart();
    incres();
    decrea();
    outcheck(1);

    const resProfile = async() => {
        let res = await getProfile();
        PRO_RES.push(res[0]);
    };
    
    resProfile();
    // button
    next.addEventListener('click', e => {
        e.preventDefault();
        
        currentNumber ++
        if(currentNumber > 3 ) {
          currentNumber = 3;
        }
        update();
      })
      
    prev.addEventListener('click', e => {
        e.preventDefault();
        currentNumber --
        if(currentNumber < 1 ) {
            currentNumber = 1;
        }
        update();
    })
      
    


    // 
    function update() {
        circles.forEach((circle, index) => {
            if(index < currentNumber) {
            circle.classList.add('active');
            } else {
            circle.classList.remove('active');
            }
        })
        
        const actives = document.querySelectorAll('.active');
        progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';
        cart__form.innerHTML = "";
        if(currentNumber === 1) {
            prev.disabled = true;
            cart__form.innerHTML = "";
            next.childNodes[0].innerHTML = "結帳";
        } else if(currentNumber === 3) {
            
            prev.disabled = true;
            next.disabled = true;
            prev.style.cursor = 'not-allowed';
        } else {
            next.style.display = "none";
            step2.classList.add('actives');
            prev.disabled = false;
            next.disabled = false;
            // next.childNodes[0].innerHTML = "確認";
            
        }
        outcheck(currentNumber);

    }

    


    const circle__text = document.querySelectorAll(".circle__text");
    Array.from(circle__text).forEach((element, i) => {
        // console.log('increa',i)
            element.addEventListener('click',(ev) =>{
                ev.preventDefault();
                const step__level = parseInt(element.dataset.step);
                // update();
                if(step__level === 1){
                    currentNumber --
                    console.log(currentNumber)
                }else if(step__level === 2){
                    currentNumber ++
                }else{
                    currentNumber ++
                    circle__text[0].style.cursor = 'not-allowed';
                    circle__text[1].style.cursor = 'not-allowed';
                    element.disabled = true;
                }
                update();
            })
    
            
    });
    
    

    


async function outcheck(count){
    // console.log(count);
    put__conent = '';
    table__content = '';
    if(count === 1){
        Array.from(ccheck).forEach((element, i) => {
            let subtotal = element.amount * element.itemPrice;
            // console.log(element);
            
            put__conent += `
                <div class="table__row">
                    <div class="table__cell table__cell--product">
                        <div class="product">
                            <div class="product__thumb">
                                <a href="detail.html?id=${element.commodityID}">
                                    <img src=${element.img} alt=${element.title}>
                                </a>
                            </div>
                            <div class="product__des">
                                <p class="product__title">
                                    <a href="detail.html?id=${element.commodityID}"><span class="product__ja"></span><span class="product__en">${element.title}</span>
                                    </a>
                                </p>
                                <p class="product__property">${element.size} / ${element.color}</p></div>
                        </div>
                    </div>
                    <div class="table__cell table__cell--price h-no-sp">
                        <p class="price item__price" id="item__price" data-price=${element.itemPrice}>NT ${convert(element.itemPrice)}</p>
                    </div>
                    <div class="table__cell table__cell--quantity">
                        
                        
                        <div class="form__select">
                            <div class="quantity__border"  data-id=${element.commodityID} data-color= ${element.color} data-size= ${element.size}>
                                <span class="quantity__Button Link Link--secondary  form__select-btn js-detail-mins">
                                    <svg class="Icon Icon--minus" role="presentation" viewBox="0 0 16 2">
                                        <path d="M1,1 L15,1" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square"></path>
                                    </svg>
                                </span>
                                <input type="text" class="quantity__current" id="add__input" pattern="[0-9]*" value=${element.amount}>
                                <span class="quantity__Button Link Link--secondary  form__select-btn js-detail-add">
                                    <svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
                                        <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
                                        <path d="M8,1 L8,15"></path>
                                        <path d="M1,8 L15,8"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="table__cell table__cell--total h-no-sp">
                        <p class="price small_count" data-total= ${subtotal}>
                            ${convert(subtotal)}
                        </p>
                    </div>
                    <div class="table__cell table__cell--remove">
                        <p class="remove productTag-item" data-id=${element.commodityID} data-color= ${element.color} data-size= ${element.size}>
                            <span>刪除</span>
                        </p>
                    </div>
                </div>
            `;
        });
        table__content = `
        <div class="table">
            <div class="table__row table__row--head">
                <div class="table__cell table__cell--product">
                    <p class="table__head">商品</p>
                </div>
                <div class="table__cell table__cell--price">
                    <p class="table__head">價格</p>
                </div>
                <div class="table__cell table__cell--quantity">
                    <p class="table__head">數量</p>
                </div>
                <div class="table__cell table__cell--total">
                    <p class="table__head">合計</p>
                </div>
                <div class="table__cell table__cell--remove">
                </div>
            </div>
            
        </div>
        <div class="all" id="checkout__form">
            ${put__conent}
        </div>
        <div class="total">
            <div class="dis_total">
                <div class="sub_content_left">
                    <p class="total__price"><small class="total__label small">小計  </small>
                </div>
                <div class="sub_content_right">
                    <span class="discount__yen" id="subCount" ></span></p>
                </div>
                
            </div>
            <div class="dis_total">
                <div class="sub_content_left">
                    <p class="total__price"><small class="total__label small">折扣 -  </small>
                </div>
                <div class="sub_content_right">
                    <span class="discount__yen" id="discount__way">0</span></p>
                </div>
            </div>
            
            <div class="total__contaner">
                <p class="total__price"><small class="total__label">總計  NT</small><span class="total__yen" id="total__yen"></span></p>
            </div>
            
        </div>
        `;
    }else if(count ===2){
        table__content = `
        <div class="payment__wrapper">
        <div class="payment__wrapper-left">
            <div class="location step">
                <h2 class="h2__payment">運送方式</h2>
                
                <label for="p3-option" class="l-radio-btn">
                    <input type="radio" id="p3-option" name="pay" tabindex="1" value="1">
                    <span>全家超商取貨</span>
                </label>
                <label for="p2-option" class="l-radio-btn">
                    <input type="radio" id="p2-option" name="pay" tabindex="2" value="2">
                    <span>7-11超商取貨</span>
                </label>
                <label for="p1-option" class="l-radio-btn">
                    <input type="radio" id="p1-option" name="pay" tabindex="3" value="3">
                    <span>宅配</span>
                </label>
            </div>
            <div class="location step">
                <h2 class="h2__payment">付款方式</h2>
                <label for="p4-option" class="l-radio-btn">
                    <input type="radio" id="p4-option" name="paymentway" tabindex="1" value="1">
                    <span>信用卡付款</span>
                </label>
                <label for="p5-option" class="l-radio-btn">
                    <input type="radio" id="p5-option" name="paymentway" tabindex="2" value="2">
                    <span>貨到付款</span>
                </label>
                <label for="p6-option" class="l-radio-btn">
                    <input type="radio" id="p6-option" name="paymentway" tabindex="3" value="3">
                    <span>ATM轉帳</span>
                </label>
            </div>
        </div>
        <div class="payment__wrapper-right">
            <h2 class="h2__payment">訂購資料</h2>
            <div class="wrapper__input">
                
                <div class="iput__info">
                    <label for="name__info"><span>姓名</span></label>
                    <input type="text" class="field__input" id="name__info" placeholder="姓名">
                </div>
                <div class="iput__info">
                    <label for="email__info"><span>電子郵件</span></label>
                    <input type="text" class="field__input" id="email__info" placeholder="Email">
                </div>
                <div class="iput__info">
                    <label for="phone__info"><span>行動電話</span></label>
                    <input type="text" class="field__input" id="phone__info" placeholder="行動電話">
                </div>
                <div class="iput__info">
                    <label ><span>收件地址</span></label>

                    <div class="right">
                        <select class="door__option" id="door__options">
                            <option value="0">請選擇門市</option>
                            <option value="door1">門市1</option>
                            <option value="door2">門市2</option>
                            <option value="door3">門市3</option>
                            <option value="door4">門市4</option>
                        </select>
                    <input type="text" class="field__input" id="address__info" placeholder="收件地址">
                    </div>
                </div>
                
                
                
            </div>
        </div>
    </div>
        `;
    }else{
        table__content = `
            <div class="modal" id="modal-one">
                <div class="modal-container">
                    <div>
                        <h1>您的訂單已完成付款！</h1>
                        <div class="www">
                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1NTAgNTUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NTAgNTUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRCNEI0Qjt9Cgkuc3Qxe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Qye2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTtmaWxsOiM0QjRCNEI7fQoJLnN0M3tjbGlwLXBhdGg6dXJsKCNTVkdJRF82Xyk7fQoJLnN0NHtjbGlwLXBhdGg6dXJsKCNTVkdJRF84Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDV7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMTBfKTt9Cgkuc3Q2e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzEyXyk7ZmlsbDojQ0FDQUNBO30KCS5zdDd7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMTRfKTt9Cgkuc3Q4e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzE2Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDl7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMThfKTt9Cgkuc3QxMHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8yMF8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QxMXtjbGlwLXBhdGg6dXJsKCNTVkdJRF8yMl8pO30KCS5zdDEye2NsaXAtcGF0aDp1cmwoI1NWR0lEXzI0Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDEze2NsaXAtcGF0aDp1cmwoI1NWR0lEXzI2Xyk7fQoJLnN0MTR7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMjhfKTtmaWxsOiNDQUNBQ0E7fQoJLnN0MTV7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMzBfKTt9Cgkuc3QxNntjbGlwLXBhdGg6dXJsKCNTVkdJRF8zMl8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QxN3tjbGlwLXBhdGg6dXJsKCNTVkdJRF8zNF8pO30KCS5zdDE4e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzM2Xyk7ZmlsbDojQ0FDQUNBO30KCS5zdDE5e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzM4Xyk7fQoJLnN0MjB7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNDBfKTtmaWxsOiNDQUNBQ0E7fQoJLnN0MjF7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNDJfKTt9Cgkuc3QyMntjbGlwLXBhdGg6dXJsKCNTVkdJRF80NF8pO2ZpbGw6I0NBQ0FDQTt9Cgkuc3QyM3tjbGlwLXBhdGg6dXJsKCNTVkdJRF80Nl8pO30KCS5zdDI0e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzQ4Xyk7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzIzLjExLDI4My40NWMtMTAuMzItMTMuNzEtMjMuMDEtMjguMTktMzcuNDEtNDIuNTljLTE5LjIzLTE5LjIxLTM4LjU1LTM1LjM4LTU2LjAyLTQ2LjkzCgkJYy04Ljc1LTUuNzgtMTcuMDMtMTAuNDEtMjQuNzctMTMuN2MtNy43NC0zLjI2LTE0LjkxLTUuMjctMjEuOTEtNS4zMWMtMy4wNiwwLjAxLTYuMTEsMC40Mi05LjA2LDEuNDYKCQljLTIuOTUsMS4wMi01Ljc3LDIuNzMtOC4wNSw1LjAyYy0yLjMsMi4yOS00LjAxLDUuMTEtNS4wNCw4LjA1Yy0wLjc1LDIuMTctMS4xNyw0LjM5LTEuMzUsNi42Mkw4Ny40NCw0MjcuMzIKCQljLTMuODksMi45MS03LjE5LDUuODQtOS45Nyw4LjgyYy01LjUsNS44NS04Ljk4LDExLjk3LTEwLjksMTcuOTdjLTEuOTUsNi0yLjM2LDExLjczLTIuMzYsMTYuOTJjMC4wMSw1LDAuMzcsOS41NSwwLjM1LDEzLjY5CgkJYzAuMDEsMi44My0wLjE0LDUuNDQtMC41OCw3Ljk0Yy0wLjY5LDMuNzUtMS45NCw3LjIyLTQuNTksMTEuMDhjLTIuNjcsMy44NC02Ljg4LDguMDktMTMuNjUsMTIuNzFsOC45MiwxMy4wOQoJCWM1LjMzLTMuNjIsOS42NS03LjI5LDEzLjEzLTExLjA1YzUuMjQtNS42Miw4LjU1LTExLjUzLDEwLjQtMTcuMzRjMS44NC01LjgsMi4yNC0xMS4zNywyLjI0LTE2LjQzCgkJYy0wLjAyLTQuOTctMC4zNy05LjUyLTAuMzUtMTMuNjljMC0yLjg5LDAuMTUtNS42MSwwLjYzLTguMmMwLjcyLTMuOSwyLjA0LTcuNTYsNC45LTExLjY1YzIuMzItMy4zLDUuNzYtNi45MSwxMC44NC0xMC43NwoJCWwyMzMuNC03My4zMmMyLjQ2LTAuMTUsNC44OC0wLjU2LDcuMjUtMS4zOWMyLjkzLTEuMDMsNS43Ni0yLjczLDguMDUtNS4wMmwtNi40LTYuNDFsNi40LDYuNGMyLjMtMi4yOSwzLjk5LTUuMTEsNS4wMi04LjA1CgkJYzEuMDUtMi45NSwxLjQ0LTYuMDEsMS40NC05LjA3Yy0wLjAzLTctMi4wNC0xNC4xNy01LjMtMjEuOTJDMzQxLjM4LDMxMC4wNSwzMzMuNDMsMjk3LjE3LDMyMy4xMSwyODMuNDV6IE0xMDkuNTQsNDE3LjI5CgkJbDExLjU4LTM3LjE3bDEzLjkxLDI5LjE2TDEwOS41NCw0MTcuMjl6IE0xNDUuOTQsNDA1Ljg2bC0xOS44Ni00MS42NGwxNC4yNy00NS44M2wzNy4wMyw3Ny41OUwxNDUuOTQsNDA1Ljg2eiBNMTg4LjI4LDM5Mi41NgoJCWwtNDIuOTctOTAuMDdsMTQuMjgtNDUuODNsNjAuMTQsMTI2LjAyTDE4OC4yOCwzOTIuNTZ6IE0yMzAuNjQsMzc5LjI2bC02Ni4xLTEzOC41bDMuODktMTIuNDVjNC44NSw5LjQ1LDExLjQ0LDE5LjYzLDE5LjQ3LDMwLjMyCgkJYzEwLjMyLDEzLjcxLDIzLjAyLDI4LjE5LDM3LjQzLDQyLjU5YzIuNjMsMi42NCw1LjI3LDUuMjEsNy45MSw3LjczbDI4Ljg0LDYwLjQ0TDIzMC42NCwzNzkuMjZ6IE0yNzIuOTgsMzY1Ljk1bC0xNy44OS0zNy41CgkJYzkuMDMsNy41LDE3Ljg2LDE0LjE0LDI2LjI2LDE5LjdjNS44MiwzLjg1LDExLjQxLDcuMTMsMTYuOCw5LjlMMjcyLjk4LDM2NS45NXoiLz4KCQoJCTxyZWN0IHg9IjIxMi4yNSIgeT0iMTIyLjUyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjMwOTkgLTAuOTUwOCAwLjk1MDggMC4zMDk5IDUzLjM5MDYgMzI5LjkxMDcpIiBjbGFzcz0ic3QwIiB3aWR0aD0iODMuNDEiIGhlaWdodD0iMTEuMzIiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMzYzLjk2LDI4MC44NiAzNjcuNTEsMjkxLjYyIDQzNC4zNywyNjkuNjUgNDMwLjg0LDI1OC44OSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjMwNC45NCwxNjIuMTUgMzE0LjI4LDE2OC41NyAzNjMuMzYsOTcuMzIgMzU0LjA0LDkwLjkgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzMjcuNzUsMjQxLjQ4IDQ0Mi42NCwxNjIuODEgNDM2LjI1LDE1My40NyAzMjEuMzQsMjMyLjE1IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNDg1LjU1LDIxOS42MSA0NjcuMzgsMjMxLjM0IDQ0Ny40MywyMjMuMDIgNDUyLjk2LDI0My45MiA0MzguODcsMjYwLjMzIDQ2MC40NywyNjEuNTIgNDcxLjcyLDI3OS45OSAKCQk0NzkuNTIsMjU5LjgyIDUwMC41NywyNTQuODIgNDgzLjgxLDI0MS4xNiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM3My45MSwxMzkuNDUgMzYzLjEsMTM0Ljk1IDM2Ni4wOSwxNDYuMjcgMzU4LjQ2LDE1NS4xNiAzNzAuMTYsMTU1LjgxIDM3Ni4yNiwxNjUuODIgMzgwLjUsMTU0Ljg5IAoJCTM5MS44OSwxNTIuMTggMzgyLjgsMTQ0Ljc4IDM4My43NiwxMzMuMSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjM4Ny4zMiwyNDMuNDUgMzkyLjA1LDI1MS4yMSAzOTUuMzMsMjQyLjc0IDQwNC4xOCwyNDAuNjMgMzk3LjEzLDIzNC44OSAzOTcuODcsMjI1LjgzIDM5MC4yMiwyMzAuNzUgCgkJMzgxLjg0LDIyNy4yNSAzODQuMTUsMjM2LjA1IDM3OC4yNCwyNDIuOTUgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyODguMDMsMTg4Ljc4IDI5Mi43NiwxOTYuNTQgMjk2LjA1LDE4OC4wNiAzMDQuODksMTg1Ljk2IDI5Ny44NCwxODAuMjEgMjk4LjU4LDE3MS4xNSAyOTAuOTMsMTc2LjA4IAoJCTI4Mi41NSwxNzIuNTggMjg0Ljg4LDE4MS4zNyAyNzguOTUsMTg4LjI4IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjE0LjM4LDEyMS41MiAyMTkuMTEsMTI5LjI4IDIyMi4zOSwxMjAuOCAyMzEuMjQsMTE4LjcgMjI0LjE5LDExMi45NiAyMjQuOTMsMTAzLjg5IDIxNy4yOCwxMDguODIgCgkJMjA4Ljg5LDEwNS4zMiAyMTEuMjEsMTE0LjEyIDIwNS4yOSwxMjEuMDIgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI0MDkuMzMsMzEzLjU2IDQwMy42MywzMDYuNDggNDAxLjQ2LDMxNS4zMSAzOTIuOTcsMzE4LjU0IDQwMC42OSwzMjMuMzIgNDAxLjE0LDMzMi40MSA0MDguMDgsMzI2LjUzIAoJCTQxNi44NSwzMjguOTEgNDEzLjQxLDMyMC41IDQxOC40LDMxMi45IAkiLz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMjc3LjExLDcwLjU4IDI4Ni4wNyw4NS4yNiAyOTIuMjksNjkuMjMgMzA5LjAxLDY1LjI1IDI5NS42OCw1NC40IDI5Ny4wNiwzNy4yNiAyODIuNjEsNDYuNTggCgkJMjY2Ljc1LDM5Ljk2IDI3MS4xNSw1Ni41OCAyNTkuOTQsNjkuNjMgCSIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIzNjkuNSw2Ni42OCAzNzcuNjYsOTEuNjUgMzkyLjUxLDcwIDQxOC43Nyw2OS45NSA0MDIuNzcsNDkuMTQgNDEwLjg1LDI0LjE2IDM4Ni4xMSwzMi45NCAKCQkzNjQuODMsMTcuNTQgMzY1LjU0LDQzLjc4IDM0NC4zMiw1OS4yNSAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjQ2MS4wNywxNjIuNDYgNDc3LjkzLDE1MS4yMyA0OTYuNzYsMTU4Ljc3IDQ5MS4yOSwxMzkuMjYgNTA0LjI3LDEyMy42OCA0ODQuMDEsMTIyLjg1IDQ3My4yMywxMDUuNyAKCQk0NjYuMTYsMTI0LjcgNDQ2LjUyLDEyOS42NiA0NjIuNDIsMTQyLjIzIAkiLz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF8xXyIgZD0iTS0xOTg2Ljk4LDE0Ni4wNGMtNC4zNiwxMi45Ni0xNC4xMywyMS41MS0yMS43OCwxOS4wOGMtNy42NC0yLjM4LTEwLjM3LTE0Ljg2LTUuOTYtMjcuODMKCQkJYzQuMzgtMTIuOTgsMTQuMjEtMjEuNSwyMS44Mi0xOS4wOEMtMTk4NS4yNSwxMjAuNi0xOTgyLjUxLDEzMy4wOC0xOTg2Ljk4LDE0Ni4wNHogTS0xOTcxLjQ4LDEwMS41bC0xMC4wMSw2LjkyCgkJCWMtMTAuNDctOC4yMi0yMC4wNi0xMy4zMS0zOC41MS00LjcyYy0yNS4xMiwxMS42OC00Ni4xNSwxMDEuMzgsMjMuMDUsNzEuODRsMy45Nyw0LjY4bDI3LjIzLDAuN2wxNy44Ny04MS40OEwtMTk3MS40OCwxMDEuNXoKCQkJIE0tMTkwMC45NSwxOTcuNjVjLTkuMSwxOS40My0xNy43NywzMC43NC0yMi44NywzNi4wMmMtNS4xMiw1LjIxLTE1LjIyLDE3LjMxLTM5LjU2LDE2LjRsMi4wOC0xNC44MwoJCQljMjAuNS02LjMzLDMxLjU4LTM0Ljg1LDM3Ljg5LTQ3LjVsLTcuNTMtOTMuMDdsMTUuODMtMC4yMWgxMy4yOWwxLjQ0LDU4LjM4bDI0LjkyLTU4LjM4aDI1LjIzTC0xOTAwLjk1LDE5Ny42NXogTS0yMTEzLjQsMTA1LjkxCgkJCWgyNy41NmM3LjIyLDAsMTIuOTItMS42NiwxNy4wOS00Ljk5YzQuMTItMy4zNSw2Ljg0LTguNDcsOC4zOC0xNS40MmMwLjI0LTEuMjcsMC4zOC0yLjQyLDAuNTctMy41YzAuMDgtMC45OSwwLjIxLTIsMC4yMS0yLjk4CgkJCWMwLTQuOTYtMS43Ny04LjU2LTUuMjktMTAuOGMtMy41Mi0yLjMtOS4wNS0zLjM5LTE2LjY3LTMuMzloLTIzLjQ3TC0yMTEzLjQsMTA1LjkxeiBNLTIxMjguOTQsNDAuODVoNjIuMDUKCQkJYzExLjk1LDAsMjEuMTgsMi42OSwyNy41MSw4LjAzYzYuMzIsNS4zOCw5LjQ5LDEzLjExLDkuNDgsMjMuMjF2MC4yOWMwLDEuOTItMC4xNCw0LjA5LTAuMzEsNi40M2MtMC4zMSwyLjMxLTAuNjgsNC42Ni0xLjIxLDcuMQoJCQljLTIuMzQsMTIuNjItOS4wMywyNC4wMS0xOC44OSwzMi4xOWMtOS44MSw4LjExLTIyLjIsMTIuNDItMzQuOTEsMTIuMTdoLTMzLjI3bC0xMC4yOSw1MC42NWgtMjguODJMLTIxMjguOTQsNDAuODV6CgkJCSBNLTIyOTAuNjEsMTU3LjJjNC4xNy00LjU0LDcuMTYtMTEuNDMsOC45OC0yMC41OWMwLjMxLTEuNDYsMC41NC0yLjkzLDAuNjgtNC40MWMwLjE1LTEuMzUsMC4yMi0yLjcxLDAuMjItNC4wOAoJCQljMC01LjM0LTEuMzQtOS40OC00LjA4LTEyLjRjLTIuNjktMi45Ny02LjUzLTQuNDEtMTEuNTItNC40MWMtNi4xMS0wLjE5LTExLjk5LDIuMzQtMTYuMDYsNi45MmMtNC4yNCw0LjY0LTcuMjMsMTEuNjQtOS4xMiwyMC45NwoJCQljLTAuMjQsMS40My0wLjQ3LDIuODctMC42Niw0LjI3Yy0wLjE0LDEuMzItMC4yLDIuNjUtMC4xOCwzLjk4YzAsNS4yOSwxLjM3LDkuMzcsNC4wOSwxMi4yN2MyLjY4LDIuOSw2LjUxLDQuMzMsMTEuNTIsNC4zMwoJCQlDLTIzMDAuNjEsMTY0LjI1LTIyOTQuNzIsMTYxLjc0LTIyOTAuNjEsMTU3LjJ6IE0tMjMzNS43MiwxNzQuMzJjLTYuMi01Ljk1LTkuMzMtMTMuOTUtOS4zNy0yNC4xMmMwLTEuNzQsMC4xMy0zLjcxLDAuMzQtNS44OAoJCQljMC4yNS0yLjE5LDAuNTMtNC4zMywwLjk0LTYuMzJjMi44MS0xNC4wMyw4LjgxLTI1LjE3LDE4LjAzLTMzLjM5YzkuMTEtOC4yMywyMS4wMS0xMi42NiwzMy4yNy0xMi40CgkJCWMxMC42MywwLDE5LjA5LDIuOTgsMjUuMjYsOC45NWM2LjE3LDUuOTksOS4yNiwxNC4xLDkuMjYsMjQuNDFjMCwxLjc1LTAuMTMsMy43OC0wLjM1LDUuOTljLTAuMjgsMi4yMS0wLjYsNC4zNi0wLjk5LDYuNDMKCQkJYy0yLjc0LDEzLjg1LTguNywyNC44OC0xNy45MywzMi45NGMtOS4xNCw4LjEtMjAuOTksMTIuNDUtMzMuMTksMTIuMTdDLTIzMjEuMTQsMTgzLjEyLTIzMjkuNTYsMTgwLjE4LTIzMzUuNzIsMTc0LjMyegoJCQkgTS0yMzcyLjkyLDYyLjk4aDIzLjg5bC00LjQ3LDIwLjk4aC0yMy44OEwtMjM3Mi45Miw2Mi45OHogTS0yMzgwLjM3LDk0LjQ3aDIzLjY5bC0xOC41Niw4Ni40M2gtMjMuNjJMLTIzODAuMzcsOTQuNDd6CgkJCSBNLTIyMzQuNTksOTQuNDRoMjEuMzhsLTIuNDMsMTIuNDhsMy4wNC0zLjU3YzYuNDMtNy4xOSwxNS42NC0xMS4yNCwyNS4yNy0xMS4xMWM4Ljk4LDAsMTUuNDgsMi42MywxOS41MSw3Ljg5CgkJCWMzLjk4LDUuMjgsNS4xMiwxMi41NSwzLjE4LDIxLjg5bC0xMS43MSw1OC45aC0yMS45NmwxMC42MS01My4zOGMxLjEtNS41MiwwLjgtOS42Mi0wLjg3LTEyLjI3Yy0xLjc1LTIuNjYtNC44Ny0zLjk1LTkuNDUtMy45NQoJCQljLTUuMjYtMC4xNC0xMC4zOCwxLjc0LTE0LjMxLDUuMjVjLTQuMDgsMy45Mi02Ljc3LDkuMDgtNy42NSwxNC42OGwtOS44Nyw0OS42N2gtMjEuOTVMLTIyMzQuNTksOTQuNDR6IE0tMjQ3OS40OSw5NC40NGgyMS4zMgoJCQlsLTIuNCwxMi40OGwzLjA2LTMuNTdjNi40Mi03LjIsMTUuNjMtMTEuMjUsMjUuMjYtMTEuMTFjOC45NiwwLDE1LjQ3LDIuNjMsMTkuNTEsNy44OWM0LjAzLDUuMjgsNS4xMiwxMi41NSwzLjI0LDIxLjg5CgkJCWwtMTEuNzcsNTguOWgtMjEuOTVsMTAuNjEtNTMuMzhjMS4wOS01LjUyLDAuNzgtOS42Mi0wLjg5LTEyLjI3Yy0xLjY4LTIuNjUtNC44NC0zLjk1LTkuNDctMy45NQoJCQljLTUuMjUtMC4xNS0xMC4zNSwxLjczLTE0LjI2LDUuMjVjLTQuMDksMy45My02LjgsOS4wOC03LjcyLDE0LjY4bC05Ljc2LDQ5LjY3aC0yMi4wMkwtMjQ3OS40OSw5NC40NHogTS0yNTA3LjM2LDEzMi41NwoJCQljLTMuMzUsMTYuNC0xMS4wNywyOS4wMi0yMy4xMSwzNy45OWMtMTEuOSw4LjgtMjcuMjQsMTMuMi00Ni4wMywxMy4yMWMtMTcuNjgsMC0zMC42NS00LjUyLTM4LjkzLTEzLjU2CgkJCWMtNS43Mi02LjQxLTguNTctMTQuNTktOC41Ny0yNC40NmMwLjA0LTQuNDMsMC41My04Ljg1LDEuNDUtMTMuMThsMjAuMDItOTYuODRoMzAuMjNsLTE5LjczLDk1Ljc0CgkJCWMtMC41NywyLjQxLTAuODUsNC44OC0wLjgyLDcuMzVjLTAuMjEsNC4zMSwxLjA3LDguNTcsMy42MywxMi4wNWMzLjU5LDQuNjYsOS40LDYuOTksMTcuNTIsNi45OWM5LjI4LDAsMTYuOTUtMi4zLDIyLjkxLTYuODkKCQkJYzUuOTMtNC41OCw5LjgyLTExLjA1LDExLjU3LTE5LjVsMTkuOC05NS43NGgzMC4wOUwtMjUwNy4zNiwxMzIuNTd6IE0tMjAxNi42NywyNTYuODVoODcuOTNsLTUuMTgsMTguMjhoLTI3Ljk4bC00LjgsMTYuOTloMjcuOTcKCQkJbC01LjIxLDE4LjI1aC0zMS4xMWwtNy4wNiwxMC42N2gxNS4yNWwzLjUzLDIxLjQyYzAuNDIsMi4xNCwyLjI4LDMuMTgsNS41MiwzLjE4aDQuNzNsLTUsMTcuNjJoLTE2LjczCgkJCWMtOC42OCwwLjQyLTEzLjE4LTIuNDktMTMuNTctOC44MWwtNC4wNC0xOS41NGwtMTMuODgsMjAuOGMtMi44Miw1LjY1LTguODUsOC45Mi0xNS4xMSw4LjE5aC0yNS41OWw0Ljk3LTE3LjYzaDgKCQkJYzMuMzYtMC4wNyw2LjQ5LTEuNyw4LjQ4LTQuNDFsMjEuNy0zMS40OWgtMjcuOTlsNS4xOS0xOC4yNWgzMC4zN2w0LjgyLTE2Ljk5aC0zMC4zOEwtMjAxNi42NywyNTYuODV6IE0tMjAwOC43MiwyMjAuMzNoMjcuMTYKCQkJbDEuMTYsMTAuMDRjLTAuMTgsMi41NiwxLjMxLDMuOCw0LjU1LDMuOGg0LjhsLTQuODYsMTdoLTE5Ljk1Yy03LjYyLDAuNDEtMTEuNTUtMi41Mi0xMS45MS04LjgyTC0yMDA4LjcyLDIyMC4zM3oKCQkJIE0tMjA3OC41LDMzNi44Mmw1LjUtMTkuNTVoLTIxLjU2bC01LjU0LDE5LjU1SC0yMDc4LjV6IE0tMjA4My45NCwyNzkuNTJsLTcuMzcsMjYuOTZjMCwwLDEzLjkyLTYuODgsMjMuNS03LjQ1CgkJCWMyLjc2LTEwLjQyLDUuNS0xOS41MSw1LjUtMTkuNTFILTIwODMuOTR6IE0tMjA3My4yLDI0MS43M2wtNy4zMiwyNS43NGM3LjU3LTIuODYsMTUuNDEtNC45NSwyMy40LTYuMjIKCQkJYzIuMzktOC45OCw1LjUtMTkuNTMsNS41LTE5LjUzSC0yMDczLjJ6IE0tMjEwNC4zNSwyNDEuNzNsNS43Mi0yMC4xNGgyOC44N2wtMS4yMyw3LjM4YzAsMCwxNC43Mi03LjM4LDI1LjM3LTcuMzhoMzUuNjcKCQkJbC01LjY1LDIwLjE0aC01LjYxbC0yNi45NSw5NS4wOWg1LjYzbC01LjM1LDE4Ljg4aC01LjYxbC0yLjMzLDguMTloLTI3Ljk3bDIuMzMtOC4xOWgtNTUuMTVsNS4zOC0xOC44OGg1LjUybDI2Ljk1LTk1LjA5CgkJCUgtMjEwNC4zNXogTS0yMjA4Ljk4LDMwMi43MmgyNC42M2wtMC40NiwxMC42OWg2LjU1YzMuMzEsMCw0Ljk2LTEuMDUsNC45Ni0zLjE4bDEuOTEtNi45MWgyMC40OGwtMi43NCwxMC4wOAoJCQljLTIuMjksOC40LTguNDMsMTIuNzktMTguMzksMTMuMjJoLTEzLjExbC0wLjA2LDE4LjI2Yy0wLjI0LDIuOTMsMi40LDQuNDMsNy44Miw0LjQzaDEyLjMzbC0zLjk4LDE0LjQ1aC0yOS41NwoJCQljLTguMjcsMC4zOS0xMi4zNy0zLjU2LTEyLjI5LTExLjk4TC0yMjA4Ljk4LDMwMi43MnogTS0yMTgwLjE4LDI4MS4yN2MzLjE3LDAuNDMsNC45MS0wLjgzLDUuMTItMy43OGwyLjYxLTkuNDRoLTQyLjcxCgkJCWwtMy41NywxMy4yMkgtMjE4MC4xOHogTS0yMTY0LjcyLDIzOS43M2gtNDIuNjZsLTUuMSwxNy45YzAsMCw3LjExLTUuMTQsMTguOTctNS4zMmMxMS44My0wLjE4LDI1LjM0LDAsMjUuMzQsMEwtMjE2NC43MiwyMzkuNzN6CgkJCSBNLTIyMDUuMiwyMjAuOThsLTEuMTksMTAuMzFjMCwwLDE0LjIzLTEwLjcsMjcuMTctMTAuN2g0Ny43OWwtMTguMjgsNjYuMzZjLTEuNTIsNy41Ni04LjAyLDExLjM1LTE5LjQ5LDExLjM2aC01NC4xNgoJCQlsLTEyLjY4LDQ2LjU5Yy0wLjc0LDIuNDksMC4zMSwzLjc4LDMuMDMsMy43OGgxMC42NWwtMy45MiwxNC40N2gtMjcuMDljLTEwLjQsMC0xNC43Mi0zLjE0LTEzLjAxLTkuNDVsMzUuODctMTMyLjcxSC0yMjA1LjJ6CgkJCSBNLTIzMjUuNjgsMjY0LjI4aDc1LjUxbC00LjgyLDE3LjYzaC0zMC40bC00LjYxLDE3LjAyaDI5LjU0bC00LjgsMTcuNjNoLTI5LjU3bC02LjgzLDI1LjE2Yy0xLjY5LDQuMiwwLjUzLDYuMDksNi42NSw1LjY2aDI0LjEKCQkJbC00LjQ4LDE2LjM5aC00Ni4yM2MtOC43NCwwLTExLjc1LTUuMDMtOS4wMi0xNS4xbDguOC0zMi4xaC0xOC44OWw0LjgtMTcuNjNoMTguODhsNC42NC0xNy4wMmgtMTguMDVMLTIzMjUuNjgsMjY0LjI4egoJCQkgTS0yMzIwLjk1LDI0MS4wMmg0LjEyYzMuNzgsMCw2LjM0LTEuMjksNy41NC0zLjgxbDEwLjcyLTE2LjExaDI4Ljc2bC01Ljk5LDEwLjU5aDM0LjQzbC00LjM2LDE2LjIzaC00MS4wMQoJCQljLTQuNzIsNy4xNC0xMC41NCwxMC40OC0xNy41NCwxMC4wN2gtMjEuMzNMLTIzMjAuOTUsMjQxLjAyeiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8yXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzNfIiB4PSItNzc0My41NCIgeT0iLTI0MTguNTMiIHdpZHRoPSI5Mzc5LjMxIiBoZWlnaHQ9IjYyNTIuODgiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF81XyIgZD0iTS03NjEuNCwxMDQyLjJoLTI0Ni4zMlY5MDkuNDVoMjQ2LjMyVjEwNDIuMnogTS03NTMuNDEsODg5LjE2aC0yNjIuM2MtNi43OSwwLTEyLjI5LDUuNS0xMi4yOSwxMi4yOQoJCQl2MTQ4Ljc0YzAsNi43OSw1LjUsMTIuMjksMTIuMjksMTIuMjloMjYyLjNjNi43OSwwLDEyLjI5LTUuNSwxMi4yOS0xMi4yOVY5MDEuNDZDLTc0MS4xMiw4OTQuNjctNzQ2LjYyLDg4OS4xNi03NTMuNDEsODg5LjE2eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF82XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QzIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzdfIiB4PSItNjY1MC42NyIgeT0iLTEyNDYuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF84XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF85XyIgZD0iTS04MDguMjYsOTY1LjA1bDEuMTUsNS4xN2wzLjk1LDE3LjI2aC0xNC4xN2gwTC04MDguMjYsOTY1LjA1eiBNLTg0Mi40MSwxMDA3Ljg3CgkJCWMwLjM1LDAuNTIsMC45NSwwLjgzLDEuNiwwLjgzaDEzLjY3YzAuNzksMCwxLjUtMC40NywxLjc4LTEuMTdjMS42OC00LjI0LDIuNzYtNi45MywzLjExLTcuODFjMC45MSwwLDUuMTEsMCw5LjYxLDAuMDFoMC4yNQoJCQljNS4xNywwLjAxLDEwLjY3LDAuMDEsMTEuOTksMC4wMWMwLjM5LDEuNTksMS4zNSw1Ljc5LDEuNzUsNy41MmMwLjE5LDAuODQsMC45NywxLjQzLDEuODYsMS40M2gxMS45MmMwLjU4LDAsMS4xMi0wLjI1LDEuNDktMC42OAoJCQljMC4zNi0wLjQzLDAuNS0wLjk5LDAuMzgtMS41M2wtMTIuOTctNTYuMTNjLTAuMTktMC44My0wLjk3LTEuNDMtMS44Ni0xLjQzaC0xMS42NWMtNC42NiwwLTcuMzMsMS40OC04Ljk0LDQuOTZsLTI0LjE1LDUyLjI1CgkJCUMtODQyLjgyLDEwMDYuNzEtODQyLjc2LDEwMDcuMzYtODQyLjQxLDEwMDcuODd6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzEwXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfOV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3Q1Ij4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzExXyIgeD0iLTY2NTAuNjciIHk9Ii0xMjQ2LjIxIiB3aWR0aD0iODMxOS42MiIgaGVpZ2h0PSI1NTQ2LjQxIi8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfMTJfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMTFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxwYXRoIGlkPSJTVkdJRF8xM18iIGQ9Ik0tODg5LjEzLDEwMDYuMThjNC45NSwxLjUxLDExLjg3LDIuNDYsMTguNDksMi41MmMwLjAxLDAsMC4wMSwwLDAuMDIsMGMxOS4wMSwwLDMxLjM3LTcuNzcsMzEuNTEtMTkuNzkKCQkJYzAuMDctNi42MS00Ljc2LTExLjYtMTUuMTUtMTUuN2MtNi4zNi0yLjY5LTEwLjI2LTQuNDgtMTAuMjItNy4yMmMwLTIuNDYsMy41Ni00Ljk2LDEwLjQxLTQuOTZjMC4xNywwLDAuMzYsMCwwLjU1LDAKCQkJYzUuNjksMCw5LjcsMS4xMiwxMi4yMywxLjk3YzAuNTksMC4yLDEuMjQsMC4xNSwxLjc5LTAuMTJjMC41NS0wLjI3LDAuOTItMC43NCwxLjAzLTEuMjhsMS43LTguN2MwLjE3LTAuOS0wLjQzLTEuNzctMS40My0yLjA1CgkJCWMtMy4xMi0wLjg3LTguMTctMS45MS0xNC40OS0xLjkxYy0xNy45MSwwLTMwLjQ5LDcuODYtMzAuNTksMTkuMWMtMC4xMSw4LjMzLDguOTksMTIuOTcsMTUuODYsMTUuNzQKCQkJYzcuMDQsMi44Myw5LjQxLDQuNjQsOS4zNyw3LjE4Yy0wLjA1LDMuODgtNS42NCw1LjY1LTEwLjgyLDUuNjVjLTcuMzcsMC0xMS4zNC0wLjk3LTE2Ljk2LTMuMDFjLTAuNTktMC4yMS0xLjI2LTAuMTgtMS44MiwwLjA5CgkJCWMtMC41NiwwLjI3LTAuOTUsMC43NC0xLjA1LDEuMjlsLTEuOCw5LjE2Qy04OTAuNjgsMTAwNS4wMi04OTAuMSwxMDA1Ljg4LTg4OS4xMywxMDA2LjE4eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8xNF8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzEzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDciPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMTVfIiB4PSItNjY1MC42NyIgeT0iLTEyNDYuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8xNl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzE3XyIgZD0iTS05ODQuOTMsOTQ2Ljg5YzEwLjY5LDQuMTgsMTkuNDQsMTAuODEsMjUuMywxOS4xN2MwLjM2LDAuNTIsMC45MiwwLjgsMS40OSwwLjgKCQkJYzAuMjYsMCwwLjUzLTAuMDYsMC43OC0wLjE4YzAuNzktMC4zOSwxLjIzLTEuMzMsMS4wNS0yLjI2bC0zLjExLTE1Ljk3Yy0wLjAxLTAuMDMtMC4wMS0wLjA3LTAuMDItMC4xCgkJCWMtMS4xMi00LjU2LTQuNjYtNS4yNC03LjIzLTUuMzVjLTAuMDIsMC0wLjA1LDAtMC4wNywwbC0xNy41NC0wLjAzYzAsMCwwLDAsMCwwYy0wLjkxLDAtMS42OCwwLjcxLTEuODQsMS42OAoJCQlDLTk4Ni4yOSw5NDUuNi05ODUuNzgsOTQ2LjU1LTk4NC45Myw5NDYuODl6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzE4XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMTdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0OSI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8xOV8iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzIwXyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzE5XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjFfIiBkPSJNLTkyMC4wMiwxMDA4LjA1YzAuMzIsMC40MSwwLjc5LDAuNjUsMS4yOSwwLjY1aDExLjY3YzAuODIsMCwxLjUyLTAuNjQsMS42Ni0xLjUxbDguODctNTYuMTMKCQkJYzAuMDgtMC41My0wLjA1LTEuMDctMC4zNy0xLjQ4Yy0wLjMyLTAuNDEtMC43OS0wLjY1LTEuMjktMC42NWgtMTEuNjhjLTAuODIsMC0xLjUyLDAuNjQtMS42NiwxLjUxbC04Ljg2LDU2LjEzCgkJCUMtOTIwLjQ4LDEwMDcuMS05MjAuMzQsMTAwNy42NC05MjAuMDIsMTAwOC4wNXoiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMjJfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8yMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxMSI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8yM18iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzI0XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzIzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjVfIiBkPSJNLTk3MS4wNCw5NjEuODNjLTAuNjgtMC40OC0xLjYxLTAuNS0yLjMyLTAuMDZjLTAuNywwLjQ1LTEuMDIsMS4yNi0wLjc4LDIuMDJsMTMuODEsNDMuNgoJCQljMC4yNSwwLjc4LDEuMDIsMS4zMSwxLjg5LDEuMzFjMCwwLDAsMCwwLDBsMTUuOTEtMC4wMmMwLjc5LDAsMS41LTAuNDMsMS44MS0xLjFsMjYuMTEtNTYuMWMwLjI2LTAuNTYsMC4yLTEuMjEtMC4xNi0xLjcyCgkJCWMtMC4zNi0wLjUxLTAuOTgtMC44Mi0xLjY1LTAuODJoMGwtMTQuMzYsMC4wMWMtMC44MSwwLTEuNTQsMC40Ni0xLjg0LDEuMTZsLTE2LjgsMzkuNjZsLTEuODEtNi4wNAoJCQljLTAuMDItMC4wOC0wLjA1LTAuMTYtMC4wOS0wLjI0Qy05NTMuOTYsOTc3Ljc5LTk2MS4wOSw5NjguODktOTcxLjA0LDk2MS44M3oiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMjZfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8yNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCTwvY2xpcFBhdGg+Cgk8ZyBjbGFzcz0ic3QxMyI+CgkJPGRlZnM+CgkJCTxyZWN0IGlkPSJTVkdJRF8yN18iIHg9Ii02NjUwLjY3IiB5PSItMTI0Ni4yMSIgd2lkdGg9IjgzMTkuNjIiIGhlaWdodD0iNTU0Ni40MSIvPgoJCTwvZGVmcz4KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzI4XyI+CgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzI3XyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCTwvY2xpcFBhdGg+Cgk8L2c+CjwvZz4KPGc+Cgk8ZGVmcz4KCQk8cGF0aCBpZD0iU1ZHSURfMjlfIiBkPSJNLTQ4MS4wOSw5NzQuNDRjLTIuODUsMC00LjkxLDMuMjctNC45MSw4LjAxYzAsMy4xNiwxLjAzLDQuNzQsMy4yLDQuNzRjMi45NywwLDUuMTQtMy4yNyw1LjE0LTguMTIKCQkJQy00NzcuNjcsOTc2LjAyLTQ3OC45Miw5NzQuNDQtNDgxLjA5LDk3NC40NHogTS00NjguNDIsOTYzLjE2bC00LjkxLDI5LjU3aC02LjA1bDAuMzQtMi4xNGMtMS44MywxLjgxLTMuNTQsMi42LTUuOTMsMi42CgkJCWMtNC42OCwwLTcuNzYtMy45NS03Ljc2LTkuOTNjMC04LjAxLDQuNzktMTQuNzgsMTAuNS0xNC43OGMyLjQsMCw0LjM0LDEuMDIsNi4wNSwzLjI3bDEuMzctOC41OEwtNDY4LjQyLDk2My4xNkwtNDY4LjQyLDk2My4xNnoKCQkJIE0tNDkzLjMsOTc1LjU3Yy0zLjY1LTAuMzQtNC4xMSwyLjQ4LTYuNTEsMTcuMTVoLTYuMzlsMC4zNC0xLjU4YzEuMzctNy40NSwyLjUxLTE1LjAxLDMuMzEtMjIuNDZoNS45MwoJCQljMCwxLjI0LTAuMjMsMi40OC0wLjQ2LDMuNzJjMi4wNS0yLjkzLDMuNTQtNC40LDYuMTYtMy44NEMtNDkxLjcxLDk2OS45My00OTIuNzMsOTcyLjUyLTQ5My4zLDk3NS41N3ogTS01MTUuNDUsOTgyCgkJCWMtMy42NSwwLTUuNDgsMS4yNC01LjQ4LDMuNjFjMCwxLjQ3LDAuOTEsMi40OCwyLjI4LDIuNDhjMi42MiwwLDQuNDUtMi40OCw0LjU3LTYuMDlILTUxNS40NXogTS01MDcuNDYsOTc5Ljk3CgkJCWMtMC41NywzLjUtMS43MSwxMC45NS0xLjk0LDEyLjc1aC01LjI1bDAuMTEtMi40OGMtMS42LDIuMDMtMy43NywyLjkzLTYuNzMsMi45M2MtMy41NCwwLTUuODItMi43MS01LjgyLTYuNTQKCQkJYzAtNS44Nyw0LjExLTkuMjUsMTEuMTktOS4yNWMwLjgsMCwxLjcxLDAsMi42MiwwLjExYzAuMjMtMC43OSwwLjIzLTEuMTMsMC4yMy0xLjQ3YzAtMS42OS0xLjE0LTIuMjYtNC4xMS0yLjI2CgkJCWMtMy4wOCwwLTUuNzEsMC43OS02LjczLDEuMTNjMCwwLDAtMC40NSwwLjkxLTUuNDJjMy4yLTAuOSw1LjI1LTEuMjQsNy42NS0xLjI0YzUuNDgsMCw4LjMzLDIuMzcsOC4zMyw3CgkJCUMtNTA3LDk3Ni40Ny01MDcuMTEsOTc3Ljk0LTUwNy40Niw5NzkuOTd6IE0tNTI2LjUyLDk3MC4zOGMtMi4yOC0xLjEzLTMuODgtMS41OC01LjcxLTEuNThjLTQuNzksMC04LjEsNC42My04LjEsMTEuMDYKCQkJYzAsNC41MSwyLjE3LDcuMjIsNS45NCw3LjIyYzEuNiwwLDMuMzEtMC40NSw1LjQ4LTEuNDdsLTEuMTQsNi42NmMtMi40LDAuNjgtMy44OCwwLjktNS43MSwwLjljLTYuODUsMC0xMS4xOS00Ljg1LTExLjE5LTEyLjc1CgkJCWMwLTEwLjYxLDUuOTQtMTcuOTQsMTQuNS0xNy45NGMyLjc0LDAsNi4wNSwxLjEzLDYuOTYsMS40N0wtNTI2LjUyLDk3MC4zOHogTS01NDkuMzUsOTc1LjU3Yy0zLjU0LTAuMzQtNC4xMSwyLjQ4LTYuMzksMTcuMTUKCQkJaC02LjM5bDAuMzQtMS41OGMxLjI2LTcuNDUsMi41MS0xNS4wMSwzLjMxLTIyLjQ2aDUuODJjMC4xMSwxLjI0LTAuMjMsMi40OC0wLjM0LDMuNzJjMS45NC0yLjkzLDMuNDItNC40LDYuMTYtMy44NAoJCQlDLTU0Ny42Myw5NjkuOTMtNTQ4LjY2LDk3Mi41Mi01NDkuMzUsOTc1LjU3eiBNLTU2OC42NCw5NzcuOTRjMC0wLjQ1LDAuNjgtNC4yOS0yLjk3LTQuMjljLTIuMDYsMC0zLjU0LDEuNTgtNC4xMSw0LjI5SC01NjguNjR6CgkJCSBNLTU2My41LDk4Mi43OWgtMTIuNjdjLTAuNDYsMy41LDEuODMsNC45Niw1LjQ4LDQuOTZjMi4yOCwwLDQuMzQtMC40NSw2LjYyLTEuNThsLTEuMDMsNi4wOWMtMi4xNywwLjU2LTQuMzQsMC45LTYuNTEsMC45CgkJCWMtNy4xOSwwLTEwLjg0LTMuNzItMTAuODQtMTAuNzJjMC04LjI0LDQuNjgtMTQuMjIsMTEuMDctMTQuMjJjNS4yNSwwLDguNjcsMy4zOSw4LjY3LDguNjkKCQkJQy01NjIuNyw5NzguNjItNTYyLjkzLDk4MC40Mi01NjMuNSw5ODIuNzl6IE0tNTgyLjY3LDk2OC42OWwtMC44LDUuODdoLTMuMzFjLTAuNjgsNC41MS0xLjgzLDEwLjI3LTEuODMsMTAuOTUKCQkJYzAsMS4yNCwwLjY4LDEuODEsMi4xNywxLjgxYzAuNjIsMCwxLjIzLTAuMDcsMS44My0wLjIzbC0wLjkxLDUuM2MtMS43MSwwLjU2LTMuMDgsMC43OS00LjU3LDAuNzljLTMuMzEsMC01LjAyLTEuODEtNS4xNC01LjMKCQkJYzAtMS4wMiwwLjQ2LTMuODQsMC45MS02LjMyYzAsMCwwLjM0LTIuMjYsMi44NS0xNi40OGg2LjI4bC0wLjY5LDMuNjFMLTU4Mi42Nyw5NjguNjlMLTU4Mi42Nyw5NjguNjl6IE0tNTk2LjgzLDk3NC4yMgoJCQljLTEuNzEtMC4yMy0zLjQyLTAuMzQtNC42OC0wLjM0Yy0yLjA2LDAtMy4wOCwwLjY4LTMuMDgsMS45MmMwLDEuMTMsMC4yMywxLjQ3LDIuOTcsMi42YzMuMiwxLjQ3LDQuNTcsMy41LDQuNTcsNi43NwoJCQljMCw1LjUzLTMuMiw4LjEyLTkuOTMsOC4wMWMtMy44OCwwLTUuMjUtMC4zNC02LjYyLTAuNjhjMCwwLDAtMC4yMywwLjgtNS41M2MyLjA1LDAuNTYsMy44OCwwLjksNS44MiwwLjkKCQkJYzIuNTEsMCwzLjY1LTAuNjgsMy42NS0yLjE0YzAtMS4xMy0wLjQ2LTEuNDctMi45Ny0yLjcxYy0zLjQyLTEuNTgtNC45MS0zLjYxLTQuOTEtNi42NmMwLTQuNTEsMi40LTguMTIsOS41OS04LjEyCgkJCWMxLjQ4LDAsMy45OSwwLjExLDUuNzEsMC40NUwtNTk2LjgzLDk3NC4yMnogTS02MjIuMjgsOTgyYy0zLjU0LDAtNS4zNiwxLjI0LTUuMzYsMy42MWMwLDEuNDcsMC44LDIuNDgsMi4yOCwyLjQ4CgkJCWMyLjYzLDAsNC40NS0yLjQ4LDQuNTctNi4wOUgtNjIyLjI4eiBNLTYxNC4xOCw5NzkuOTdjLTAuNTcsMy41LTEuODMsMTAuOTUtMS45NCwxMi43NWgtNS4zNmwwLjExLTIuNDgKCQkJYy0xLjYsMi4wMy0zLjc3LDIuOTMtNi42MiwyLjkzYy0zLjU0LDAtNS45NC0yLjcxLTUuOTQtNi41NGMwLTUuODcsNC4yMi05LjI1LDExLjMtOS4yNWMwLjY5LDAsMS42LDAsMi42MywwLjExCgkJCWMwLjExLTAuNzksMC4yMy0xLjEzLDAuMjMtMS40N2MwLTEuNjktMS4xNC0yLjI2LTQuMTEtMi4yNmMtMy4yLDAtNS43MSwwLjc5LTYuNzMsMS4xM2MwLDAsMC0wLjQ1LDAuOC01LjQyCgkJCWMzLjItMC45LDUuMzYtMS4yNCw3LjY1LTEuMjRjNS41OSwwLDguNDUsMi4zNyw4LjQ1LDdDLTYxMy43Miw5NzYuNDctNjEzLjk1LDk3Ny45NC02MTQuMTgsOTc5Ljk3eiBNLTYzMi42Nyw5NjMuMTZsLTUuMDIsMjkuNTcKCQkJaC02LjM5bDMuNjUtMjIuNjhsLTguMSwyMi42OGgtNC40NWwtMC40Ni0yMi41N2wtMy44OCwyMi41N2gtNi4wNWw1LjAyLTI5LjU3aDkuMjVsMC4yMywxOC4zOWw2LjI4LTE4LjM5SC02MzIuNjd6CgkJCSBNLTUyNC4yNCw5MTYuNDRjLTE0LjA0LDAtMjYuOTQsNC42My0zNy40NCwxMi40MWM5LjM2LDguNDYsMTYuMjEsMTkuNTIsMTkuNTIsMzIuMDVoLTUuNzFjLTMuMzEtMTEuMTctOS41OS0yMC45OS0xOC4wMy0yOC41NQoJCQljLTguNDUsNy41Ni0xNC43MiwxNy4zOC0xOC4wMywyOC41NWgtNS43MWMzLjMxLTEyLjUzLDEwLjE2LTIzLjU5LDE5LjUyLTMyLjA1Yy0xMC41LTcuNzktMjMuNC0xMi40MS0zNy40NC0xMi40MQoJCQljLTM0LjM2LDAtNjIuMDksMjcuNTMtNjIuMDksNjEuMzlzMjcuNzQsNjEuMzksNjIuMDksNjEuMzljMTQuMDQsMCwyNi45NC00LjYzLDM3LjQ0LTEyLjQxYy04Ljc5LTguMDEtMTUuNDEtMTguMjgtMTguODMtMjkuNzkKCQkJaDUuNzFjMy40MiwxMC4xNiw5LjQ3LDE5LjMsMTcuMzUsMjYuMjljNy44OC03LDEzLjkyLTE2LjE0LDE3LjM1LTI2LjI5aDUuNzFjLTMuNDIsMTEuNTEtMTAuMDQsMjEuNzgtMTguODMsMjkuNzkKCQkJYzEwLjUsNy43OSwyMy40LDEyLjQxLDM3LjQ0LDEyLjQxYzM0LjM2LDAsNjIuMDktMjcuNTMsNjIuMDktNjEuMzlTLTQ4OS44OCw5MTYuNDQtNTI0LjI0LDkxNi40NHogTS00MzQuNDEsMTA1MC4wNAoJCQljMCw3LjktNi42MiwxNC40NC0xNC42MSwxNC40NGgtMjMzLjc2Yy03Ljk5LDAtMTQuNjEtNi41NC0xNC42MS0xNC40NFY5MDUuNjFjMC03LjksNi42Mi0xNC40NCwxNC42MS0xNC40NGgyMzMuNzYKCQkJYzcuOTksMCwxNC42MSw2LjU0LDE0LjYxLDE0LjQ0VjEwNTAuMDR6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzMwXyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMjlfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MTUiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMzFfIiB4PSItNjYzNC42NyIgeT0iLTEyNDQuMjEiIHdpZHRoPSI4MzE5LjYyIiBoZWlnaHQ9IjU1NDYuNDEiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8zMl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zMV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzMzXyIgZD0iTS0xNTkuOTYsOTkzLjU1Yy0wLjQ1LDAuMTEtMS40OSwwLjIzLTIuMDYsMC4yM2gtMTcuNTl2LTE1LjY1aDE3LjU5YzAuNTcsMCwxLjYxLDAuMTEsMi4wNiwwLjIyCgkJCWMzLjQ1LDAuNjgsNi4yMiwzLjY5LDYuMjIsNy42Qy0xNTMuNzQsOTg5Ljk3LTE1Ni41LDk5Mi44OC0xNTkuOTYsOTkzLjU1eiBNLTE3OS42MSw5NTQuODdoMTUuOTljMC41NywwLDEuMzcsMC4xMSwxLjczLDAuMTEKCQkJYzMuMzMsMC41Niw2LjA4LDMuMjQsNi4wOCw3LjE1YzAsMy45MS0yLjc1LDYuNDktNi4wOCw3LjA0Yy0wLjM1LDAuMTEtMS4xNiwwLjExLTEuNzMsMC4xMWgtMTUuOTlWOTU0Ljg3eiBNLTE0NS4zNiw5NzMuODh2LTAuMzMKCQkJYzguOTYtMS4yMywxMy45MS02LjkzLDEzLjkxLTEzLjUyYzAtOC41LTcuMjQtMTMuNDItMTcuMDEtMTMuODdjLTAuNjksMC0xLjk0LTAuMTEtMi45OC0wLjExaC01Mi4zdjU3aDU2LjQzCgkJCWMxMS4xNCwwLDE5LjQyLTUuODEsMTkuNDItMTQuODZDLTEyNy44OCw5NzkuOTItMTM1LjQ3LDk3NC41NS0xNDUuMzYsOTczLjg4eiBNLTI4OC4xMSw5NzQuNTVjMCwxNi4yMSwxMS41LDMxLjc0LDUxLjk0LDI5Ljk2CgkJCWMwLDAsMTEuNjEtMC40NSwyMy45MS0zLjQ3di0xMi42M2MtNS45NywzLjAyLTEzLjU2LDUuOTItMjIuOTksNi42Yy0xNi41NCwxLjIyLTI2LjQyLTYuNi0yNi40Mi0yMC40NnM5Ljg5LTIxLjY4LDI2LjQyLTIwLjQ2CgkJCWM5LjQzLDAuNjgsMTYuOTEsMy40NywyMi45OSw2LjQ5di0xMi41MWMtMTIuMy0zLjAyLTIzLjkxLTMuNDctMjMuOTEtMy40N0MtMjc2LjYxLDk0Mi44MS0yODguMTEsOTU4LjM1LTI4OC4xMSw5NzQuNTV6CgkJCSBNLTMyMC41MSw5ODAuNDdjMCw4LjM4LTUuODYsMTQuNjQtMTYuNDQsMTQuNjRjLTguOTYsMC0xNy44MS0yLjU3LTI2LjMyLTYuNTl2MTIuNTFjMTMuNzksMy42OSwzMS4yNywzLjY5LDMxLjI3LDMuNjkKCQkJYzI5LjE5LDAsMzcuNy0xMC44NCwzNy43LTI0LjI2di0zNC40MmgtMjYuMjFWOTgwLjQ3eiBNLTEyMy40MiwxMDQ2LjQxYzAsNS4zNi00LjY2LDkuODktMTAuMTcsOS44OWgtMjMwLjAyCgkJCWMtNS41MSwwLTEwLjE3LTQuNTMtMTAuMTctOS44OVY5MDYuNmMwLTUuMzYsNC42Ni05Ljg5LDEwLjE3LTkuODloMjMwLjAyYzUuNTEsMCwxMC4xNyw0LjUzLDEwLjE3LDkuODlWMTA0Ni40MXogTS0xMjAuNDcsODkzLjg1CgkJCWMtMy41My0zLjQzLTguMTktNS4zMi0xMy4xMS01LjMyaC0yMzAuMDJjLTQuOTMsMC05LjU4LDEuODktMTMuMTEsNS4zMmMtMy41MywzLjQzLTUuNDcsNy45Ni01LjQ3LDEyLjc1djEzOS44MQoJCQljMCw0Ljc5LDEuOTQsOS4zMiw1LjQ3LDEyLjc1YzMuNTMsMy40Myw4LjE5LDUuMzIsMTMuMTEsNS4zMmgyMzAuMDJjNC45MywwLDkuNTgtMS44OSwxMy4xMS01LjMyYzMuNTMtMy40Myw1LjQ3LTcuOTYsNS40Ny0xMi43NQoJCQlWOTA2LjZDLTExNSw5MDEuODEtMTE2Ljk0LDg5Ny4yOS0xMjAuNDcsODkzLjg1eiIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF8zNF8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzMzXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDE3Ij4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzM1XyIgeD0iLTY3MDUuMzMiIHk9Ii0xMjc5LjI5IiB3aWR0aD0iODQ0Ni4wNiIgaGVpZ2h0PSI1NjMwLjciLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF8zNl8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zNV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHBhdGggaWQ9IlNWR0lEXzM3XyIgZD0iTTE3NS42OCw5MzcuNzZILTQwLjU1di0xNS41MmMwLTkuNjUsNy44LTE3LjQ5LDE3LjM5LTE3LjQ5aDE4MS40NmM5LjU5LDAsMTcuMzksNy44NCwxNy4zOSwxNy40OVY5MzcuNzZ6CgkJCSBNMTc1LjY4LDEwMzAuOTdjMCw5LjY1LTcuOCwxNy40OS0xNy4zOSwxNy40OUgtMjMuMTZjLTkuNTksMC0xNy4zOS03Ljg0LTE3LjM5LTE3LjQ5di02OS45aDIxNi4yNFYxMDMwLjk3eiBNMTU4LjI5LDg4OS4yCgkJCUgtMjMuMTZDLTQxLjI5LDg4OS4yLTU2LDkwNC01Niw5MjIuMjN2MTA4LjczYzAsMTguMjQsMTQuNzEsMzMuMDMsMzIuODQsMzMuMDNoMTgxLjQ2YzE4LjEzLDAsMzIuODQtMTQuNzksMzIuODQtMzMuMDNWOTIyLjIzCgkJCUMxOTEuMTMsOTA0LDE3Ni40Miw4ODkuMiwxNTguMjksODg5LjJ6Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzM4XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfMzdfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MTkiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfMzlfIiB4PSItMzk4NS40NyIgeT0iLTI0MTcuOTkiIHdpZHRoPSI4MzkwLjMzIiBoZWlnaHQ9IjU1OTMuNTUiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80MF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zOV8iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+CjxnPgoJPGRlZnM+CgkJPHJlY3QgaWQ9IlNWR0lEXzQxXyIgeD0iLTQ5LjAxIiB5PSI5NTkuMTIiIHdpZHRoPSIyMzAuNzMiIGhlaWdodD0iOTAuOSIvPgoJPC9kZWZzPgoJPGNsaXBQYXRoIGlkPSJTVkdJRF80Ml8iPgoJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzQxXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxnIGNsYXNzPSJzdDIxIj4KCQk8ZGVmcz4KCQkJPHJlY3QgaWQ9IlNWR0lEXzQzXyIgeD0iLTM5ODUuNDciIHk9Ii0yNDE3Ljk5IiB3aWR0aD0iODM5MC4zMyIgaGVpZ2h0PSI1NTkzLjU1Ii8+CgkJPC9kZWZzPgoJCTxjbGlwUGF0aCBpZD0iU1ZHSURfNDRfIj4KCQkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNDNfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+CgkJPC9jbGlwUGF0aD4KCTwvZz4KPC9nPgo8Zz4KCTxkZWZzPgoJCTxyZWN0IGlkPSJTVkdJRF80NV8iIHg9IjgzLjg0IiB5PSI5NTkuMTIiIHdpZHRoPSI5MC45IiBoZWlnaHQ9IjM0Ljk2Ii8+Cgk8L2RlZnM+Cgk8Y2xpcFBhdGggaWQ9IlNWR0lEXzQ2XyI+CgkJPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNDVfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+Cgk8L2NsaXBQYXRoPgoJPGcgY2xhc3M9InN0MjMiPgoJCTxkZWZzPgoJCQk8cmVjdCBpZD0iU1ZHSURfNDdfIiB4PSItMzk4NS40NyIgeT0iLTI0MTcuOTkiIHdpZHRoPSI4MzkwLjMzIiBoZWlnaHQ9IjU1OTMuNTUiLz4KCQk8L2RlZnM+CgkJPGNsaXBQYXRoIGlkPSJTVkdJRF80OF8iPgoJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF80N18iICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZTsiLz4KCQk8L2NsaXBQYXRoPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=" alt="您的訂單已完成付款！" />
                        </div>
                        <a class="form__btn" href="index.html"><span>確認</span></a>
                    </div>
                
                </div>
            </div>
        `;
        document.querySelector(".checkout").style.display = 'none';
    }
    

    cart__form.insertAdjacentHTML('afterBegin',table__content);
    
    if(count === 1){
        aftercheckout();
    }else if(count === 2){
        onchangepay();
        payment(PRO_RES);
        cart__detail();
        // resProfile();
    }else{
        
    }
    
    


}
async function onchangepay(){
    const shipOption = document.getElementsByName("pay");

    shipOption.forEach((element) => {
        // console.log(element)
        element.addEventListener("click" ,(i) => {
            if(i.target.value === "3"){
                document.querySelector(".door__option").style.display = "none";
            }else{
                document.querySelector(".door__option").style.display = "block";
            }
        });
        
    });
        
}

couponBtn.addEventListener("click",triggerCoupon);
    couponInput.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            triggerCoupon();
            
            // let discountMoney =  document.querySelector('#discount__way');
        }
    });

    const CouponCodintion = async(code) => {
        let res = await couponCompare(code);
        
        if(res === 400){
            step2Boreder.classList.add("error");
            step2Boreder.children[2].classList.add("error");
            step2Boreder.children[2].innerHTML = `請輸入有效的折扣碼`;
            // 

        }else{
            step2Boreder.children[2].classList.remove("error");
            step2Boreder.classList.remove("error");
            let ru =  disCountIf(res);
            let discountMoney =  document.querySelector('#discount__way');
            if(ru === "NOUP"){
                step2Boreder.classList.add("error");
                step2Boreder.children[2].classList.add("error");
                step2Boreder.children[2].innerHTML = `須滿${res.Amount_Achieved} 元`;
                discountMoney.innerHTML = 0;
            }else if(ru === "NOUP" && ru === 'noFree'){
                discountMoney.innerHTML = 0;
            }else if(!ru){
                step2Boreder.classList.add("error");
                step2Boreder.children[2].classList.add("error");
                step2Boreder.children[2].innerHTML = `無效的折扣碼`;
                discountMoney.innerHTML = 0;
            }else{
                couponss.push(couponInput.value);
                localStorage.setItem("coupons", JSON.stringify(couponss) );
                couponInput.value = "";
                
                if(res.Free_Shipping){
                    discountMoney.innerHTML = `免運費`;
                }else{
                   

                    if((+res.DisCount) < 1 && (+res.DisCount) !== 0){
                        let dd = (+res.DisCount) * 10
                        MINSHOW += Math.ceil(totallll * (+res.DisCount)) ;
                        MINSHOW = totallll - MINSHOW;
                        discountMoney.innerHTML = `${dd}折`;
                    }else{
                        MINSHOW += (+res.Rebate) ;
                        discountMoney.innerHTML = res.Rebate;
                    }
                }
                
                aftercheckout();
            }

        }
    }
    function triggerCoupon(){
        
        CouponCodintion(couponInput.value)
    }
    

    function disCountIf(res){
        DISDETAIL.push(res);
        console.log(res)
        // aftercheckout();
        // Amount_Achieved: 1
        // DisCount: 0.9
        // Free_Shipping: false
        // Rebate: 0

        if((+res.Amount_Achieved) > (+totallll)){
            return 'NOUP';
        }
        if((+res.DisCount) <= 0 && (+res.Rebate) < 0){
            return false;
        }
        if(!res.Free_Shipping){
            return 'noFree';
        }

        if((+res.Rebate) < 0 ){
            return false;
        }
        
        return true;
    }

async function aftercheckout(){
    
    
    let small_count =  document.querySelectorAll('.small_count');
    let totalllllll =  document.querySelector('#subCount');
    let totalAfterDisCount =  document.querySelector('#total__yen');
    let TOTAL = 0;
    

    // console.log(total__c.replace(/\B(?=(\d{3})+(?!\d))/g, ",")) 
    // console.log(convert(parseInt(totalllllll.innerHTML)))
    update__total();

    // detail add

    let mins_detail = document.querySelectorAll(".js-detail-mins");
    let add__input = document.querySelectorAll("#add__input");
    let del__btn = document.querySelectorAll(".productTag-item");
    const PRICE = document.querySelectorAll('.item__price');
    let addtext = document.getElementById("checkout__form");
    
    function getdataset(element){
        let id = parseInt(element.dataset.id);
        let color = element.dataset.color;
        let size = element.dataset.size;

        return [id,color,size];
    }
    
    // console.log(small_count[0])

    Array.from(mins_detail).forEach((element, i) => {
        // console.log('increa',i)
            element.addEventListener('click',(ev) =>{
                
                
                ev.preventDefault();
                if(parseInt(add__input[i].value)<= 1){
                    add__input[i].value = parseInt(1);
                }else{
                    add__input[i].value = parseInt(add__input[i].value) - parseInt(1);
                }
                // console.log(PRICE.dataset.price);
                small_count[i].innerHTML = "";
                small_count[i].innerHTML = convert(add__input[i].value * PRICE[i].dataset.price);
                small_count[i].setAttribute("data-total", add__input[i].value * PRICE[i].dataset.price);
                let [id,color,size] = getdataset(element.parentElement);
                CART.reduce(id, 1,color,size);
                CART.count__cart();
                update__total();
            })
    
            
    });
    
    let add_detail = document.querySelectorAll(".js-detail-add");

    Array.from(add_detail).forEach((element, i) => {
        // console.log('increa',i)
            element.addEventListener('click',(ev) =>{
               
                ev.preventDefault();
                add__input[i].value = parseInt(add__input[i].value) + parseInt(1);
                small_count[i].innerHTML = "";
                let mul = parseInt(add__input[i].value * PRICE[i].dataset.price);
                // console.log(convert(mul));
                small_count[i].innerHTML = convert(mul);
                small_count[i].setAttribute("data-total", mul);
                let [id,color,size] = getdataset(element.parentElement);
                
                CART.increase(id, 1,color,size);
                CART.count__cart();
                update__total();
            })
    
            
    });
    function update__total(){
        totallll = 0;
        Array.from(small_count).forEach((element, i) => {
            // console.log(element.dataset.total)
            totallll += parseInt(element.dataset.total);

            
        });
        t2 = totallll
        totallll -= MINSHOW;

        totalllllll.innerHTML = convert(t2);
        totalAfterDisCount.innerHTML = convert(totallll);
    }

    

    // del
    Array.from(del__btn).forEach((element, i) => {
        element.addEventListener('click',(ev) =>{
            ev.preventDefault();
            let [id,color,size] = getdataset(element);
            CART.remove(id,color,size);
            addtext.removeChild(document.querySelectorAll(".table__row")[i+1]);
            CART.count__cart();
            update__total();
        })
    
            
    });

    
    // const modals = document.querySelectorAll("[data-modal]");

    //     modals.forEach(function (trigger) {
    //     trigger.addEventListener("click", function (event) {
    //         event.preventDefault();
    //         const modal = document.getElementById(trigger.dataset.modal);
    //         modal.classList.add("open");
    //         const exits = modal.querySelectorAll(".modal-exit");
    //         exits.forEach(function (exit) {
    //         exit.addEventListener("click", function (event) {
    //             event.preventDefault();
    //             modal.classList.remove("open");
    //         });
    //         });
    //     });
}
const ADDRESS_KEYS = {
    door1: '台中市西屯區華美西街二段82巷17號2樓',
    door2: '台中市太平區大源十八街168巷27號',
    door3: '台中市西區五廊街101號',
    door4: '台中市北屯區崇德路二段292號s',
}

async function payment(res){
    const { Name, Email_Address } = res[0] ;
    let name__info__input = document.getElementById("name__info");
    let email__info__input = document.getElementById("email__info");
    
    name__info__input.value = Name || '';
    email__info__input.value = Email_Address || '';
    
}
function cart__detail(){
    step2.addEventListener('click', e => {
        e.preventDefault();
        let phone__info__input = document.getElementById("phone__info");
        let address__info__input = document.getElementById("address__info");
    
    
    // tt.addEventListener("click", () => {
        const shipOption = document.getElementsByName("pay");
        for (let radio of shipOption)
        {   
            
            if (radio.checked) {
                addOption = (+radio.value);
            }
        }

        const paymenyWay = document.getElementsByName("paymentway");
        for (let radio of paymenyWay)
        {   
            
            if (radio.checked) {
                payWay = (+radio.value);
            }
        }
       
        const door__option = document.getElementById('door__options');
        let door__option_value = door__option.options[door__option.selectedIndex].value;
        let addres_content =  (addOption === 3) ? address__info__input.value : ADDRESS_KEYS[door__option_value];
        let cart__pay = JSON.parse(localStorage.getItem("shopping cart"));
        let ccc = JSON.parse(localStorage.getItem("coupons"));
        ccc = ccc.filter((item, index) => ccc.indexOf(item) === index && item !='');
        // console.log(ccc);
        // 
        let params = {
            deliveryOptionsID: addOption,
            paymentID: payWay,
            address: addres_content,
            phone_Number: phone__info__input.value,
            coupons: [...ccc],
            carts: [...cart__pay]
        }
        
        // console.log(params)
        localStorage.removeItem("shopping cart");
        const resProfile = async(params) => {
            let res = await checkoutApi(params);
        };
        
        resProfile(params);
        currentNumber ++;
        update();
    })
    
}
});


// ※付款後，1-3 個工作天內出貨。訂單之預購商品，最晚將於 2020/01/30 前出貨，出貨後將以 Email 通知您。
// ※結帳若含多商品，為加速出貨速度，商品可能分開出貨。
// ※到貨另需 2-4 天，恕無法指定日期，您也可於訂單查詢追蹤配送進度。