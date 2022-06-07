
// import CART from "./shoppingCart.js";
// import {showCart} from "./shoppingCart.js";
// import {incres} from "./shoppingCart.js";
// import {decrea} from "./shoppingCart.js";
import {getProfile} from "./fornt__api.js";
import {updateprofile, metMyOreder} from "./fornt__api.js";

document.addEventListener("DOMContentLoaded",  ()=> {

    



    const checkMyOrder = async() => {

        let res = await metMyOreder();
        console.log(res)
        getSaleHis(res);
        
    };
    checkMyOrder();


    form__edit.addEventListener("click", (e)=>{
        list__account.style.display = "none";
    
        js__account_form.style.display = "block";
    
    });
    cancel__form.addEventListener("click",(e)=>{
        e.preventDefault();
    
        list__account.style.display = "block";
    
        js__account_form.style.display = "none";
    
    });

   
    // sign in

    
    // logout
    document.querySelector(".js-logout").addEventListener("click",()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.assign("index.html");
    });



    






// // const params = require('./sign');
// // console.log(params);
// // sign up

function getSaleHis(res){
    let result = "";
    Array.from(res).forEach((element, i) => {
        
        console.log(element)
        
        let sendt = res.isChecked ? '已出貨':'處理中';
        let sendp = res.isPayed ? '已付款':'未付款';
        result += `
            <tr>
                <td>${element.Established}</td>
                <td class="ii" >
                    <a href="historyorder.html?${element.SaleID}">${element.SaleID}</a></td>
                <td>${sendt}</td>
                <td>${element.Delivery}</td>
                <td>${sendp}</td>
                <td>${element.Total_Price}</td>
            </tr>
        `;
       
        
    });
    salebody.insertAdjacentHTML('afterbegin', result);
}





});
