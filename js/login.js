
let token = null;



// login in
// async function logintoken() {
//     let result = await makeRequest("GET", "https://localhost:7206/api/Member/getMember");
// }


let login_in = document.querySelector(".js-login");
<<<<<<< Updated upstream
async function loginajax(params) {
    let result = await makeRequest("POST", "https://localhost:7206/api/Member/signin",params);
}
=======
import { loginajax} from './fornt__api.js';
>>>>>>> Stashed changes





// sign up

document.addEventListener("DOMContentLoaded", function () {

    login_in.addEventListener("click",function(e){
        e.preventDefault();
        const params = {
            email_Address : document.getElementById("CustomerEmail").value,
            password : document.getElementById("CustomerPassword").value
        }
<<<<<<< Updated upstream
        
        loginajax(params);
=======
        const  loginSuss = async(params) => {
            let res = await loginajax(params);

            localStorage.setItem('token', res.result);
            // console.log(localStorage.getItem('token'));
            localStorage.setItem('user', params.email_Address)

            if(!localStorage.getItem('user')){
                console.log(params.password);
                
                window.location.assign("login.html");
                
            }else{
                if(params.password === 'root'){
                    window.location.assign("test.html");
                }else{
                     window.location.assign("index.html");
                }
               
            }
        };
        loginSuss(params);
        
>>>>>>> Stashed changes
        // logintoken();
        
    });

    // sign in


    
});
<<<<<<< Updated upstream



function makeRequest(method, url,params) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(params));
        
        
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
                let aa = JSON.parse(xhr.response);
                // console.log((aa.result));
                localStorage.setItem('token', aa.result);
                // console.log(localStorage.getItem('token'));
                localStorage.setItem('user', params.email_Address)
                if(!localStorage.getItem('user')){
                    console.log(params.password);
                    
                    window.location.assign("login.html");
                    
                }else{
                    if(params.password === 'root'){
                        window.location.assign("test.html");
                    }else{
                         window.location.assign("index.html");
                    }
                   
                }
                
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
=======
>>>>>>> Stashed changes
