
let token = null;



// login in
// async function logintoken() {
//     let result = await makeRequest("GET", "https://localhost:7206/api/Member/getMember");
// }


let login_in = document.querySelector(".js-login");
import { loginajax} from './fornt__api.js';





// sign up

document.addEventListener("DOMContentLoaded", function () {

    login_in.addEventListener("click",function(e){
        e.preventDefault();
        const params = {
            email_Address : document.getElementById("CustomerEmail").value,
            password : document.getElementById("CustomerPassword").value
        }
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
        
        // logintoken();
        
    });

    // sign in


    
});
