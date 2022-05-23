import {convert} from './main.js';
let token = localStorage.getItem("token");

const CART = {
    KEY: "shopping cart",
    contents: [],
    init(){
        let _contents = localStorage.getItem(CART.KEY);
        if(_contents){
            CART.contents = JSON.parse(_contents);
        }
        CART.count__cart();
    },
    async sync(){
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
        await CART.count__cart();
        await CART.singleSync();
        
        // retrun 
        // let pust = {
        //     commodityID: PRODUCTS.CommodityId,
        //     sizeID: size,
        //     colorID: color,
        //     amount: qty_input
        // };

    },
    async singleSync(){
        console.log(CART.contents);
        // let res = await addCart(CART.contents);
        // console.log(res);
    },
    async count__cart(){
        let count_s = JSON.parse(localStorage.getItem("shopping cart"))
        if(count_s){
            const a = [...count_s].length;
            document.querySelector(".js-item-count").innerHTML = a;
        }else{
            document.querySelector(".js-item-count").innerHTML = 0;
        }
    },
    find(id,color,size){
        
        let match = CART.contents.filter(item=>{
            // console.log('item',item.id);
            // console.log('id',id);
            // console.log('item',item.color);
            // console.log('id',color);
            // console.log('item',item.size);
            // console.log('id',size);
            // console.log(item.color !== color);
            // console.log(item.size !== size);
            if((item.id === id) && (item.color === color) && (item.size === size))
                return true;
        });
        if(match && match[0]){
            return match[0];
        }
    },
    
    add(id,qty_input,size,color,img){
        
        let obj = {
            id: PRODUCTS.CommodityId,
            title: PRODUCTS.CommodityName,
            size: size,
            color: color,
            img: img,
            qty: qty_input,
            itemPrice: PRODUCTS.S_Price
        };
        

        
        if(CART.find(id,color,size)){
            CART.increase(id, qty_input);
        }else{
            // console.log('product',PRODUCTS);

            CART.contents.push(obj);
            // console.log('ooo');
            // doAjaxThings(pust);
            CART.sync();
           

            
            // console.log('p', PRODUCTS)
            // var result = Object.entries(PRODUCTS);
            // console.log('r',result)
            // let arr = PRODUCTS.filter(product=>{
            //     if(product.id == id){
            //         return true;
            //     }
            // });
            // if(arr && arr[0]){
            //     let obj = {
            //         id: arr[0].id,
            //         title: arr[0].title,
            //         qty: 1,
            //         itemPrice: arr[0].price
            //     };
            //     CART.contents.push(obj);
            //     //update localStorage
            //     CART.sync();
            // }else{
            //     //product id does not exist in products data
            //     console.error('Invalid Product');
            // }
        }
    },
    increase(id, qty=1,color, size){
        // console.log(CART.contents);
        CART.contents = CART.contents.map(item=>{
            if((item.id === id) && (item.color === color) && (item.size === size)){
                
                item.qty = item.qty + qty;
                // console.log(item.qty);
            }  
            return item;
        });
        
        CART.sync(id);
    },
    reduce(id, qty=1, color,size){
        
        CART.contents = CART.contents.map(item=>{
            if((item.id === id) && (item.color === color) && (item.size === size))
                item.qty = item.qty - qty;
            return item;
        });
        CART.contents.forEach(async item=>{
            if(item.id === id && item.qty === 0 && (item.color === color) && (item.size === size))
                await CART.remove(id, color,size);
        });
        
        CART.sync()
    },
    remove(id, color,size){
        CART.contents = CART.contents.filter(item=>{
            
            if(!(item.id === parseInt(id) && (item.color === color) && (item.size === size)))
                return true;
        });
        
        CART.sync()
        CART.count__cart();
    },
    empty(){
        
        CART.contents = [];
        
        CART.sync()
    },
    logContents(prefix){
        // console.log(prefix, CART.contents)
    },
    totalPrice(){
        let totalCart = 0;
        let a = CART.contents.map((item) => {
            totalCart += item.itemPrice * item.qty; 
        });
        return Number(totalCart.toFixed(2));
    }



};

let PRODUCTS = [];



document.addEventListener('DOMContentLoaded', ()=>{
    
    // CART.init();
    
    
    // showCart();
    
    // incres();
    // decrea();

    
});
export function incres(){
    // console.log("incr");
    let plus_item = document.querySelectorAll(".product__amount-plus");
    let total_cart2 = document.getElementById("total-cart");
    Array.from(plus_item).forEach((element, i) => {
    // console.log('increa',i)
        element.addEventListener('click',(ev) =>{
            // console.log("click");
            ev.preventDefault();
        
            let controls = ev.target.parentElement;

            let id = parseInt(controls.getAttribute('data-id'));
            let color = controls.getAttribute('data-color');
            let size = controls.getAttribute('data-size');

            CART.increase(id, 1,color,size);
            
            let qty = controls.querySelector('div:nth-child(2)');
            let item = CART.find(id,color,size);
            
            if(item){
                qty.textContent = item.qty;
            }else{
                document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement);

            }
            // console.log(CART.totalPrice());
            total_cart2.innerHTML = "";
            total_cart2.innerHTML = convert(CART.totalPrice());
            // document.getElementById("total-cart")
        })

        
    });

}

export function decrea(){
    

    let mins_item = document.querySelectorAll(".product__amount-minus");
    let total_cart3 = document.getElementById("total-cart");
    Array.from(mins_item).forEach((element, i) => {
        element.addEventListener('click',(ev) =>{
            ev.preventDefault();
            let controls = ev.target.parentElement;

            let id = parseInt(controls.getAttribute('data-id'));
            let color = controls.getAttribute('data-color');
            let size = controls.getAttribute('data-size');

            CART.reduce(id, 1,color,size);
            
            let qty = controls.querySelector('div:nth-child(2)');
            let item = CART.find(id,color,size);
            
            if(item){
                qty.textContent = item.qty;
            }else{
                document.getElementById('cart__inner').removeChild(controls.parentElement.parentElement.parentElement.parentElement);
                showCart();
            }
            total_cart3.innerHTML = "";
            total_cart3.innerHTML = convert(CART.totalPrice());
        })
    });
}
// navbar cart
export function showCart(){
    // add id 把 ul 改掉
    // <div class="l-header__cart js-header-cartArea" id="cart__inner">
    let cartSection = document.getElementById('cart__inner');
    let total_cart = document.getElementById("total-cart");

    cartSection.innerHTML= "";
    let s = CART.contents;
    // console.log('s2',CART.contents);
    
    let total = convert(CART.totalPrice());
    // console.log('s3',CART.contents);
    let  cc = document.querySelector(".l-header__cart-bottom");
    
    let output__cart = '';
    // console.log(s.length !== 0)
    // console.log(s)
    if(s.length !== 0 ||s ){
        s.forEach( item => {
            output__cart += `
                <div class="product__list-item">
                    <figure>
                        <div class="product__img">
                            <a href= 'detail.html?id=${item.id}'>
                            <img src=${item.img}>
                            </a>
                        </div>
                        <figcaption>
                            <dl>
                            <dt>
                                <a href='detail.html?id=${item.id}'>
                                    ${item.title}
                                </a>
                                <p>${item.size} / ${item.color}</p>
                            </dt>
                            <dd>
                                <ul class="product__prices">
                                    <li class="product__price">NT${convert(item.itemPrice)}</li>
                                </ul>
                            </dd>
                            <div class="product__amount" data-id= ${item.id}  data-quantity=${item.qty} data-color= ${item.color} data-size= ${item.size}>
                                <div class="product__amount-minus" data-id= ${item.id}></div>
                                <div class="product__amount-curr">${item.qty}</div>
                                <div class="product__amount-plus" data-id= ${item.id}></div>
                            </div>
                            </dl>
                        </figcaption>
                    </figure>
                </div>
            
            `
        })
        cc.style.display = "block";
        total_cart.innerHTML = total;
    }
    if(s.length == 0){
        cc.style.display = "none";
        output__cart = `
            <div class="l-header__cart-message js-header-cartMessage" style="display:block;">
                <span>你的購物車是空的</span>
            </div>
        `;
        
    }
    cartSection.insertAdjacentHTML('afterbegin',output__cart);
    
}

export async function showProducts( product ){
    // console.log("p",product)
    console.log(product);
    // console.log(JSON.stringify(product))
    // console.log( JSON.parse(product))
    PRODUCTS = product;
    //take data.products and display inside <section id="products">
    
    let productSection = document.getElementById('product__item');
    productSection.innerHTML = "";
    let relatedSection = document.getElementById('related__list');
    relatedSection.innerHTML = "";
    
    // slider
    let sliders = product.CommodityImages;
    // console.log(sliders);
    let slider__content = "";
    let active__slider = '';
    for(let slider in sliders)
    {   
        active__slider = (slider == 0) ? 'active': '';
        slider__content += `
            <div class="slider-item slide img-zoom-container" >
                <img src=${sliders[slider]} alt="" >
            </div>
        `;
    }
    // size
    let sizes = product.CommoditySizes;
    // console.log(sizes);
    const collator = new Intl.Collator('en');
    let size__content = "";
    function SortArray(a, b){
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
    }
    sizes = sizes.sort(SortArray);
    for(let size in sizes)
    {   
        
        size__content += `
            <li class="s-select__item">
                <input type="radio" class="input_radio" id="option-size-${size}" value=${sizes[size]} name="option-size">    
                <label for="option-size-${size}" class="size-radio">${sizes[size]}</label>
            </li>
        `;
    }
    // color
    let colors= product.CommodityColors;
    let color_content = "";
    let c = [];
    let d = [];
    
    for(var color in colors)
    {   
        if(color % 2 == 0){
            c.push(colors[color]);
        }else{
            d.push(colors[color]);
        }
        
        
    }
    Array.from(c).forEach((element, i) => {
        color_content += `
            <li class="color__wrapper--item">
                <input type="radio" class="input_radio" id="option-color-${i}" value=${element} name="option-color">    
                <label for="option-color-${i}" class="color-radio">
                    <img src=${d[i]} alt="">
                </label>
            </li>
        `
    });
    
    // kind
    let kinds = product.CommodityTags;
    let lind__text = "";
    for(var kind in kinds)
    {   
        lind__text += `
            <li class="productTag-item"><a href="">${ kinds[kind]}</a></li>
        `;
    }
    

{/* 
     <ol class="slide-indicators">
                            <li class="slide-indicator"></li>
                            <li class="slide-indicator"></li>
                            <li class="slide-indicator"></li>
                            <li class="slide-indicator"></li>
                            <li class="slide-indicator"></li>
                        </ol>
    <span class="slider-control-prev" role="button">
        <img aria-hidden="true" src="img/prev.svg" alt="Previous Slide Button">
    </span>
    <span class="slider-control-next" role="button">
        <img aria-hidden="true" src="img/next.svg" alt="Next Slide Button">
    </span>*/}

    let product__list = "";
     product__list = `

    <div class="item__wrapper" >
    
        <div class="item__wrapper-left">
            <div id='lens'></div>
            <div class="item__wrapper-slider slider slides" id="slides">
                ${slider__content}
               
            </div>
            <span class="slider-control-prev control prev" role="button" id="prev">
                    
            </span>
            <span class="slider-control-next control next" role="button" id="next">
                
            </span> 
            
        </div>
        <div id='result' class="img-zoom-result"></div>
        <div class="item__wrapper-right">
            <div class="item__wrapper-list">
                <h3 class="item__wrapper-title u-margin-bottom-small">${product.CommodityName}</h3>
                <p class="item__wrapper-price u-margin-bottom-medium">NT ${convert(product.S_Price)}</p>
                <div class="item__wrapper-select">
                    <p class="s_title">
                        尺寸
                    </p>
                    <div>
                        <ul class="s-select__list u-margin-bottom-small">
                            ${size__content}
                        </ul>
                    </div>
                </div>
                <div class="color__wrapper u-margin-bottom-small">
                    <p class="s_title">
                        顏色
                    </p>
                    <div>
                        <ul class="color__wrapper--list">
                            ${color_content}
                        </ul>
                    </div>
                </div>
                <div class="quantity__wrapper u-margin-bottom-medium">
                    <p class="s_title">數量</p>
                    <div class="quantity__border">
                        <span class="quantity__Button Link Link--secondary js-detail-mins" >
                            <svg class="Icon Icon--minus" role="presentation" viewBox="0 0 16 2">
                                <path d="M1,1 L15,1" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square"></path>
                            </svg>
                        </span>
                        <input  id="add__input" type="text" class="quantity__current" pattern="[0-9]*" value="1" >
                        <span class="quantity__Button Link Link--secondary js-detail-add">
                            <svg class="Icon Icon--plus" role="presentation" viewBox="0 0 16 16">
                                <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="square">
                                <path d="M8,1 L8,15"></path>
                                <path d="M1,8 L15,8"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="addcart__wrapper">
                    

                    <div class="btn__box detail__btn js-add-cart" >
                        <button class="form__btn" data-id=${product.CommodityId}><span>加入購物車</span></button>
                    </div>

                    
                </div>
                <div class="wishlist__wrapper">
                    <button class="wishtlist">
                        <div>
                            <svg version="1.1" xmlns="https://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                                <path d="M47.199 4c-6.727 0-12.516 5.472-15.198 11.188-2.684-5.715-8.474-11.188-15.201-11.188-9.274 0-16.8 7.527-16.8 16.802 0 18.865 19.031 23.812 32.001 42.464 12.26-18.536 31.999-24.2 31.999-42.464 0-9.274-7.527-16.802-16.801-16.802z" fill="#000"></path>
                            </svg>
                            <span>收藏</span>
                        </div>
                    </button>
                </div>
                <div class="description__wrapper">
                    <dl class="description__wrapper-des">
                        <dt class="description__wrapper-title js-toggleClick">
                            描述
                        </dt>
                        <dd class="description__wrapper-content js-toggleClickArea">
                            <ul>
                                <li>${product.Description}</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="description__wrapper-matrial">
                        <dt class="description__wrapper-title js-toggleClick">
                            材質
                        </dt>
                        <dd class="description__wrapper-content js-toggleClickArea">
                            <ul>
                                <li>${product.Material}</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="description__wrapper-size">
                        <dt class="description__wrapper-title js-toggleClick">
                            尺寸
                        </dt>
                        <dd class="description__wrapper-content js-toggleClickArea">
                            <ul>
                                <li>MARK - 184cm / 75kg / size XL</li>
                                <li>WILLY - 182cm / 75kg / size XL</li>
                                <li>黃翊 - 182cm / 64kg /size L</li>
                            </ul>
                        </dd>
                    </dl>
                </div>

                <div class="productTag__wrapper">
                    <ul class="productTag-list">
                        ${lind__text}
                    </ul>
                </div>
            </div>
        </div>
        
    
    </div>
    `;
    // console.log(productSection);
    productSection.innerHTML = " ";
    // console.log(productSection);
    productSection.insertAdjacentHTML('afterbegin',product__list);
    // console.log(productSection);
    // des js
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
            // console.log(toggle__content[i]);
        })
    });
    // console.log(productSection);

    
      
    return "done";
    
     
}

export function showProducts2( product ){
    // console.log(product)
    let relatedSection = document.getElementById('related__list');
    relatedSection.innerHTML = "";
    
    let like__content = "";
    product.forEach( item => {
        // console.log(item)
        let image = item.CommodityImages[0];
        like__content += `
            <li class="item__list-item">
                <a href="detail.html?id=${item.CommodityId}">
                    <figure>
                        <div class="item__list-photo js-follower-Area">
                            <img src="${image}" alt="">
                        </div>
                        <figcaption>
                        <p class="item__list-sale"></p>
                        <p class="item__list-name">${item.CommodityName}</p>
                        
                        <ul class="item__list-prices price-group item__state">
                                <li class="item__list-price">
                                    <del class="price-delete">
                                        <span class="price-amount">NT$ ${item.Price}</span>
                                    </del>
                                    <ins class="price-insert">
                                        <span class="price-amount">NT$ ${item.S_Price}</span>
                                    </ins>
                                </li>
                        </ul>
                        </figcaption>
                    </figure>
                </a>
            </li>
        `;


    });
    relatedSection.insertAdjacentHTML('beforeEnd',like__content)


    


    
    
    
    

     
}

let QTY = 0;
let IMG = '';
export function addItem(ev,qty_input,size,color){
    
    ev.preventDefault();
    // console.log(ev.target);
    // console.log(ev.target);
    // console.log(qty_input);
    getslider0();
    let id = parseInt(ev.target.getAttribute('data-id'));
    // console.log('add to cart item', id);
    // console.log(CART.contents)
    QTY = qty_input;
    CART.add(id,qty_input,size,color,IMG);
    showCart();
}

export function errorMessage(err){
    //display the error message to the user
    // console.error(err);
}

function getslider0(){
    
    let sliderss = PRODUCTS.CommodityImages;
    for(let slider in sliderss)
    {   
        IMG = sliderss[0];
    }
}
export default CART;
