let submit__btn = document.querySelector(".js-form");
let token = null;
// export const params = {};
import { Login } from "./fornt__api.js";

document.addEventListener("DOMContentLoaded",  ()=> {

    submit__btn.addEventListener("click",function(e){
        e.preventDefault();
        // params.name = document.getElementById("Customername").value;
        // params.email_Address = document.getElementById("CustomerEmail").value;
        // params.password = document.getElementById("CustomerPassword").value;
        // params.second_verify = document.getElementById("CustomerPasswordCheck").value; 
        const params = {
            Name : document.getElementById("Customername").value,
            Email_Address : document.getElementById("CustomerEmail").value,
            password : document.getElementById("CustomerPassword").value,
            second_verify : document.getElementById("CustomerPasswordCheck").value,
            Address: document.getElementById("CustomerAddress").value,
            Phone_Number:document.getElementById("CustomerPhoneCheck").value,
            Gender: document.querySelector('input[name="gender"]:checked').value            ,
            Birthday: document.getElementById("CustomerDate").value,

        }
        const status = async(params) => {
            let res = await Login(params);
            if(res){
                window.location.assign("./login.html");
            }
            
        };
        status(params);

        
        
        
       
        // module.exports = params;
    });
    

    // sign in

    
    
});






// const params = require('./sign');
// console.log(params);
// sign up

async function doAjaxThings(params) {
    console.log(params);
    let result = await makeRequest("POST", "https://localhost:7206/api/Member/register",params);
    // console.log(result);
}


function makeRequest(method, url,params) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(params));
        if(token != null)
        {
            xhr.setRequestHeader('Authorization', token );
        }
        
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
                
                window.location.assign("./login.html");
                
                
                // console.log(xhr.responseText);
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


// export default makeRequest;