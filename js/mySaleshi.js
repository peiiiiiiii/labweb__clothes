
// import CART from "./shoppingCart.js";
// import {showCart} from "./shoppingCart.js";
// import {incres} from "./shoppingCart.js";
// import {decrea} from "./shoppingCart.js";
const salebody = document.querySelector(".responsive-table__body");
import { metMyOreder} from "./fornt__api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const salesID = urlParams.get('id')

document.addEventListener("DOMContentLoaded",  ()=> {

    



    const checkMyOrder = async() => {

        let res = await metMyOreder();
        console.log(res)
        getSaleHis(res);
        
    };
    checkMyOrder();


    
   
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
    
    let aa = res.filter((element, i) => {
        return element.SaleID === salesID
        
        
        
       
        
    });
    document.querySelector(".orednum").innerHTML = salesID
    document.querySelector(".totallid").innerHTML = aa[0].Total_Price
    let result = "";
    Array.from(aa[0].Items).forEach((element, i) => {
        console.log(element)

        
        result += `
                <tr class="responsive-table__row">
                    <td class="responsive-table__body__text responsive-table__body__text--name">${element.CommodityName}
                    </td>
                    <td class="responsive-table__body__text responsive-table__body__text--status">${element.Color}/${element.Size}</td>
                    <td class="responsive-table__body__text responsive-table__body__text--types">${element.Unit_Price}</td>
                    <td class="responsive-table__body__text responsive-table__body__text--update">${element.Amount}</td>
                    <td class="responsive-table__body__text responsive-table__body__text--country">${element.Total_Price}</td>
                </tr>
        `;

    });
    salebody.insertAdjacentHTML('afterbegin', result);
}





});
