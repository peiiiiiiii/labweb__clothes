
let token = localStorage.getItem('token');
let search__item = '';
let search__area = '';

// get url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let kindID= urlParams.get('kind');
console.log(kindID)
let kind  = '';
let navbtn = document.querySelector(".js-header-nav");

let header_navArea = document.querySelector(".js-header-navArea");


let header__side = document.querySelector(".js-header-cartArea");
let bgheader = document.querySelector(".js-header-bg");
let search__inner = document.querySelector(".js-header-searchArea");

let collection__list = document.getElementById("collection__list");

// let filter__all = document.querySelector("#filter__cc");

let fliter__btn = '';
let price__h = '';
let clear__btn = '';
let DATA = "";
let output = "";
let filter__content = "";
let tag__content = "";
let comparatext = "";
    
import CART from "./shoppingCart.js";
import {showCart} from "./shoppingCart.js";
import {incres} from "./shoppingCart.js";
import {decrea} from "./shoppingCart.js";

// api
import {profiletoken} from './fornt__api.js';
import {colectionsearch} from './fornt__api.js';
import {GetColor} from "./fornt__api.js";
import {GetAllTags} from "./fornt__api.js";;



document.addEventListener("DOMContentLoaded",  ()=> {

    
    
    // navbtn.classList.remove("is-active");
    CART.init();
    showCart();
    incres();
    decrea();


    const search_status =  async() =>{
        let params = JSON.parse(localStorage.getItem("search"));
        let res = await colectionsearch(params[0]);
        let res__arr = [];
        res__arr.push(res)
        localStorage.removeItem("search");
        showCollection(res__arr);
    }
    const status = async() => {
        let res = await profiletoken();
        showCollection(res);
    };
    const getColor = async() => {
        let res = await GetColor();
        showColor(res);
    };
    const getAllTags = async() => {
        let res = await GetAllTags();
        // console.log(res)
        showAllTag(res);
    };
    
    getAllTags();
    getColor();
    
    

    if(localStorage.getItem("search")){
        navbtn.classList.remove("is-active");
        setTimeout(function(){
            bgheader.style.display = "none";
            header_navArea.style.display = "none";
            search__inner.style.display = "none";
        }, 300);
        search_status();
        
    }else{
        status();       
    }
    
    function dis2(parentnode,element){
        // console.log(element)
        if(parentnode.classList.contains("is-open")){
            element.style.display = "block";
            element.classList.add("is-open");
            element.classList.remove("out");
        }else{
            element.classList.remove("is-open");
            element.classList.remove("out");
        }
    }
    
    
});


function dis2(element){
    if(navbtn.classList.contains("is-active")){
        // console.log(element)
        element.style.display = "block";
        element.classList.add("is-open");
        element.classList.remove("out");
    }else{
        element.classList.remove("is-open");
        element.classList.remove("out");
    }
}

// let collection__list = document.getElementById("collection__list");
// let filter__cc = document.getElementById("filter__cc");
let wraperrrr = document.querySelector(".wraperrrr");

async function showCollection(res){
    
    collection__list.innerHTML = "";
    output = "";
    DATA = res;
    
    let filterUrl = [];
    
    
    if(parseInt(kindID) === 1){
        comparatext = "上身";
        kind = "上身";
    }else if(parseInt(kindID) === 2){
        comparatext = "下身";
        kind = "下身";
    }else if(parseInt(kindID) === 3){
        comparatext = "配件";
        kind = "下身";
    }else{
        filterUrl = res;
        kind = "全部";
    }
    if(kindID){
        filterUrl = res.filter((element) => {
            let output  =  element.CommodityKinds.some((c) => {
                return c === comparatext
            })
            
            return output;
        });
    }
    showlist(filterUrl);
        
}
function dis332(parentnode,element){
    // console.log(element)
    if(parentnode.classList.contains("is-open")){
        element.style.display = "block";
        element.classList.add("is-open");
        element.classList.remove("out");
    }else{
        element.classList.remove("is-open");
        element.classList.remove("out");
    }
}
async function toggle_s(){
    // console.log('hiiihih');
    fliter__btn = document.querySelector(".js-toggleClick");
    clear__btn = document.querySelector(".item__list-clear");
    search__item = document.querySelectorAll(".js-toggleClick-filter");
    search__area = document.querySelectorAll(".js-toggleClickArea-filter");
    price__h = document.querySelectorAll(".js-sort");
    Array.from(search__item).forEach((element, i) => {
        element.addEventListener('click',(k) =>{
            // console.log('feef');
            element.classList.toggle("is-open");
            // console.log(k)
            if(search__item[0].classList.contains('is-open') && !search__item[1].classList.contains('is-open')){
                // element.classList.toggle("is-open");
                setTimeout(function(){
                    search__area[1].style.display = "none";
                }, 200);
                // console.log("hit 0")
            }
            if(search__item[1].classList.contains('is-open') && !search__item[0].classList.contains('is-open')){
                
                setTimeout(function(){
                    search__area[0].style.display = "none";
                }, 200);
                // console.log("hit 1")
            }
            // console.log(element.classList.contains('is-open'))
            if (element.classList.contains('is-open')) {
                
                dis332(element, search__area[i]);
            } else {
                dis332(element, search__area[i]);
                setTimeout(function(){
                    search__area[i].style.display = "none";
                }, 200);
            }
        })
        });
}

async function showAllTag(res){
    localStorage.setItem("tags", JSON.stringify(res))
    let con ="";
    tag__content="";
    await res.forEach((element) => {
        (element.Tag).forEach((item, i) => {
            if(item.Tag === "新品"){
                con = `${element.Kinds} - ${item.Tag}`;
            }else{
                con = `${item.Tag}`;
            }
            tag__content += `
                    <li>
                        <input type="radio" id="category_${item.TagsID}" name="kinds" data-kind="${element.Kinds}" value="${item.Tag}">
                        <label class="js-toggleInview-item" for="category_${item.TagsID}"  >${con}</label>
                    </li>
                    `;
        });
        
    });
    
}
async function showColor(res){
    // console.log(res)
    localStorage.setItem("color", JSON.stringify(res))
    let color__con ="";
    filter__content = "";
    color__con += `
        <li>
            <input type="radio" id="color_0" name="colorss" value="全部">
            <label class="js-toggleInview-item" for="color_0" >全部</label>
        </li>
    `;
    await res.forEach((element,i) => {
        color__con += `
        <li>
            <input type="radio" id="color_${element.ColorId}" name="colorss" value="${element.ColorName}">
            <label class="js-toggleInview-item" for="color_${element.ColorId}" >${element.ColorName}</label>
        </li>
        `;
    });
    filter__content = `
    <div class="item__list-tool" id="filter__cc">
    <h2 class="filter__title" >男裝 - ${kind}</h2>
    <ul class="item__list-filter">
        <li class="item__list-filter-item">
            <p class="js-toggleClick-filter filter__icon">篩選</p>
            <div class="item__list-check js-toggleClickArea-filter">
            <dl class="js-toggleInview">
                <dt><span class="js-toggleInview-item" >CATEGORY</span></dt>
                <dd>
                <ul class="item__list-check-list list-category js-toggleInview" id="kinds">
                    ${tag__content}
                </ul>
                </dd>
            </dl>
            <dl class="js-toggleInview">
                <dt><span class="js-toggleInview-item" >顏色</span></dt>
                <dd>
                <ul class="item__list-check-list list-color js-toggleInview" id="colorss">
                    ${color__con}
                </ul>
                </dd>
            </dl>
            <ul class="item__list-buttons">
                <li class="item__list-ok js-toggleClick">
                <span>確定</span>
                </li>
                <li class="item__list-clear">
                <div class="item__list-clear-icon"></div>
                <span>清除</span>
                </li>
            </ul>
            </div>
        </li>

        <li>
            <p class="js-toggleClick-filter oreder">排序</p>
            <div class="item__list-sort js-toggleClickArea-filter" >
            <ul class="js-toggleInview">
                <li><a class="js-sort-price-desc js-toggleInview-item js-sort" data-price="0">價格： 最低到最高</a></li>
                <li><a class="js-sort-price js-toggleInview-item js-sort" data-price="1">價格： 最高到最低</a></li>
                
            </ul>
            </div>
        </li>
    </ul>
    </div>
    `;
}
async function showlist(res){
    output = "";
    
    collection__list.innerHTML ="";
    
    
    if(res){
        res.forEach(element => {
            if(!element.CommodityPrice){
                element.CommodityPrice = 0;
            }
            // console.log(element)
            output+= `
            <div class="item__list-item" >
                <a href="detail.html?id=${element.CommodityId}" data-id="${element.CommodityId}">
                    <figure>
                        <div class="item__list-photo js-follower-Area">
                            <img src=${element.CommodityImages[0]}>
                            
                        </div>
                        <figcaption>
                        
                        <p class="item__list-name">${element.CommodityName}</p>
                        <ul class="item__list-prices price-group">
                                <li class="item__list-price">
                                    <del class="price-delete">
                                        <span class="price-amount">NT$ ${element.Price}</span>
                                    </del>
                                    <ins class="price-insert">
                                        <span class="price-amount">NT$ ${element.S_Price}</span>
                                    </ins>
                                </li>
                        </ul>
                        </figcaption>
                    </figure>
                </a>
            </div>
            `;
        });
    }else{
        output = `<p class="item__list-notfound">查無資料</p>`;
    }
    
    collection__list.insertAdjacentHTML('beforeEnd',filter__content);
    collection__list.insertAdjacentHTML('beforeEnd',output);
    const filter__title = document.querySelector(".filter__title");
    filter__title.innerHTML = `男裝 - ${kind}`
    toggle_s();
    filter__sub();
    price__filter();
    
}
async function filter__sub(){
    // toggle_s();
    await fliter__btn.addEventListener("click",()=>{
        const kinds = document.getElementsByName('kinds');
        const colorss =document.getElementsByName('colorss');
        
        kind = '';
        let coloo = '';
        let tagsss = '';
        // CommodityKinds
        
        for (let radio of kinds)
        {   
            
            if (radio.checked) {
                tagsss = radio.dataset.kind;
                kind = radio.value;
            }
        }
        for (let l of colorss)
        {
            if (l.checked) {
                coloo = l.value;
            }
        }
        // console.log(kind);
        // console.log(coloo);
        // console.log(DATA);

        // kind = "新品";
        // tagsss = "上身";
       function byTags(wantedkinds) {
        if(kind === "新品"){
            return(element) => {
                let output  =  element.CommodityTags.some((c) => {
                    return c === wantedkinds && (
                        element.CommodityKinds.some((k) => {
                            return  k === tagsss
                        })
                    )
                });
                return output;
            };
            
            
        }else{
            return (element) => {
                let output  =  element.CommodityTags.some((c) => {
                    return (c === wantedkinds && (
                        element.CommodityKinds.some((c) => {
                            return c === tagsss
                        })
                    ))
                })
                
                return output;
            };
        }
        
        
      }

       function byColors(wantedColors) {
        return (element) => {
            let output  =  element.CommodityColors.some((c) => {
                return c === wantedColors
            })
            
            return output;
        };
        
      }
        let resultFilter = () => {
            
            if(coloo !== "" && kind === ""){
                return (DATA.filter(byColors(coloo)))
                console.log(aa)
            }else if((kind !== "" && coloo === "") || (coloo === "全部" && kind !== "")){
                return (DATA.filter(byTags(kind)))
                
            }else if(kind !== "" && coloo !== ""){
                return DATA.filter(byTags(kind)).filter(byColors(coloo))
            }else{
                console.log("no happen");
            }
        }

        // console.log(resultFilter())
        showlist(resultFilter());



       
        
        // console.log(fimal)
        // showlist(fimal);
        

    });
    clear__btn.addEventListener("click",()=>{
        const kinds = document.getElementsByName('kinds');
        const colorss =document.getElementsByName('colorss');
        for(let i=0;i<kinds.length;i++){
            kinds[i].checked = false;
        }
        for(let i=0;i<colorss.length;i++){
             colorss[i].checked = false;
        }
    });

}
async function price__filter(){
    Array.from(price__h).forEach((element,i) => {
        element.addEventListener('click', (item)=>{

            if(parseInt(element.dataset.price) === 0){
                DATA.sort(function(a,b){
                    if (a.S_Price > b.S_Price) return 1;
                    if (a.S_Price < b.S_Price) return -1;
                    return 0;
                })
            }else{
                DATA.sort(function(a,b){
                    if (a.S_Price < b.S_Price) return 1;
                    if (a.S_Price > b.S_Price) return -1;
                    return 0;
                })
            }
            showlist(DATA);
        });
    });
}