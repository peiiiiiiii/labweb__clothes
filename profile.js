let form__edit = document.querySelector(".js-account-edit");

let list__account = document.querySelector(".js-account-list");

let js__account_form = document.querySelector(".account__address-form");


let cancel__form = document.querySelector(".form-canel");




let token = localStorage.getItem('token');

let show__email = document.querySelector(".show__email");
let get__name = document.querySelector(".get__name");
let show__address = document.querySelector(".show__address");

let update__confirm = document.getElementById("update__confirm");
// import CART from "./shoppingCart.js";
// import {showCart} from "./shoppingCart.js";
// import {incres} from "./shoppingCart.js";
// import {decrea} from "./shoppingCart.js";

document.addEventListener("DOMContentLoaded",  ()=> {

    profiletoken();

    
    form__edit.addEventListener("click", (e)=>{
        list__account.style.display = "none";
    
        js__account_form.style.display = "block";
    
    });
    cancel__form.addEventListener("click",(e)=>{
        e.preventDefault();
    
        list__account.style.display = "block";
    
        js__account_form.style.display = "none";
    
    });

    update__confirm.addEventListener("click",function(e){
        e.preventDefault();
        // params.name = document.getElementById("Customername").value;
        // params.email_Address = document.getElementById("CustomerEmail").value;
        // params.password = document.getElementById("CustomerPassword").value;
        // params.second_verify = document.getElementById("CustomerPasswordCheck").value; 

        const params = {
            name : document.getElementById("Customername").value,
            Address : document.getElementById("CustomerEmail").value,
            phoneNumber: document.getElementById("CustomerPhone").value
            // ,
            // password : document.getElementById("CustomerPassword").value
        }
        updateprofile(params);

        
        
        
       
    //     // module.exports = params;
    });
    

    // sign in

    
    // logout
    document.querySelector(".js-logout").addEventListener("click",()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.assign("index.html");
    });
});

async function updateprofile(params) {
    let update = await makeRequest("POST", "https://localhost:7206/api/Member/update",params);
}




// // const params = require('./sign');
// // console.log(params);
// // sign up

async function profiletoken() {
    let result = await makeRequest("GET", "https://localhost:7206/api/Member/getMember");
    console.log(result)
    // getpro(result[0]);
}


function getpro(res){
    console.log(res)
    show__email.innerHTML = email;
    get__name.innerHTML = name;
}


function makeRequest(method, url,params) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        // xhr.setRequestHeader('Content-type', 'application/json');
        if(token != null)
        {
            xhr.setRequestHeader('Authorization', token );
        }
        if(method == "GET"){
            xhr.send();
        }else{
            xhr.send(JSON.stringify(params));
        }
        
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
                let bb = JSON.parse(xhr.response);
                // console.log(bb)
                // if(method == "GET"){
                //    getpro(bb[0]["Name"],bb[0]["Email_Address"],bb[0]["Address"]);
                // }else{  
                //     location.reload();
                // }
                
                
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        
    });
}

