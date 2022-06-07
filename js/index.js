
// let token = null;


document.addEventListener("DOMContentLoaded", function () {

    // (async () => {
    //     try {
    //         // use object destructuring
    //         let {
    //             name,
    //             email_Address,
    //             password,
    //             second_verify
    //         } = await import('./sign.js');

    //         // use the functions
    //         console.log(name);
    //         if(!name && !email_Address && !password){
    //             console.log(email_Address);
    //         }else{
    //             console.log("not done");
    //         }
            
    //     } catch (err) {
    //         console.log(err);
    //     }
    // })();
    
});



// // login in
// // let login_in = document.querySelector(".js-login");
// // async function loginajax(params) {
// //     let result = await makeRequest("POST", "https://localhost:7206/api/Member/signin",params);
// // }


// const params = require('./sign');
// console.log(params);
// // sign up
// async function doAjaxThings(params) {
//     let result = await makeRequest("POST", "https://localhost:7206/api/Member/register",params);
//     console.log(result);
// }
// document.addEventListener("DOMContentLoaded", function () {

//     // submit__btn.addEventListener("click",function(e){
//     //     e.preventDefault();
//     //     const params = {
//     //         name : document.getElementById("Customername").value,
//     //         email_Address : document.getElementById("CustomerEmail").value,
//     //         password : document.getElementById("CustomerPassword").value,
//     //         second_verify : document.getElementById("CustomerPasswordCheck").value
//     //     }
        
//     //     doAjaxThings(params);
        
//     // });

//     // sign in


    
// });



// function makeRequest(method, url,params) {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send(JSON.stringify(params));
//         if(token != null)
//         {
//             req.setRequestHeader('Authorization', token );
//         }
        
//         xhr.onload = function () {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(xhr.responseText);
//                 if(!localStorage.getItem('user')){
//                     window.location.assign("login.html");
//                 }
                
//                 // console.log(xhr.responseText);
//             } else {
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//             }
//         };
//         xhr.onerror = function () {
//             reject({
//                 status: this.status,
//                 statusText: xhr.statusText
//             });
//         };
        
//     });
// }


// // export default makeRequest;