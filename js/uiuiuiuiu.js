
//let token = localStorage.getItem('token');
let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwic2lkIjoiMSIsImp0aSI6IjUzNzY1YzMzLTUyYTYtNGRjMi1hNTU3LWQzMWI2MDNhYzhjYSIsInJvbGVzIjpbIkFkbWluIiwiVXNlcnMiXSwibmJmIjoxNjUxNDA3ODYyLCJleHAiOjE2Njk0MDc4NjIsImlhdCI6MTY1MTQwNzg2MiwiaXNzIjoiSnd0QXV0aCJ9.0Ggmv5zbBgarsL_hXaqXkOtS-zLA7LcYbBYyk8K-_UI'
console.log(token)


document.addEventListener("DOMContentLoaded",  ()=> {
    
    const params = {
        "commodityName": "Era Vans World Code 休閒鞋",
        "description": "中信兄弟 X plain-me聯名系列商品",
        "material": "立體前袋：軍式感十足的前袋設計，展現粗曠的帥氣感",
        "isReleased": true,
        "price": 1246,
        "commodityKinds": 3,
        "commodityTags": 3,
        "commoditySizes": [
            1
            
        ],
        "commodityColors": [
            1,
            5,
            9
            
        ],
        "commodityImages": [
            'https://cdn-plain-me.fonlego.com//upload_files/fonlego-rwd/prodpic/D_vans1999_1_01.jpg',
            'https://cdn-plain-me.fonlego.com//upload_files/fonlego-rwd/prodpic/D_pln3003-221_2_03.jpg',
            'https://cdn-plain-me.fonlego.com//upload_files/fonlego-rwd/prodpic/D_cop3563_13_1_06.jpg',
            'https://cdn-plain-me.fonlego.com//upload_files/fonlego-rwd/prodpic/D_cop3563_13_1_05.jpg',
            'https://cdn-plain-me.fonlego.com//upload_files/fonlego-rwd/prodpic/D_cop3563_13_1_02.jpg'
        ]
    }
    updateprofile(params);


    // sign in

    
    // doAjaxThings();
});


async function updateprofile(params) {
    let update = await makeRequest("POST", "https://localhost:7206/api/Commodity/AddCommodity",params);
}
// let productID
// async function doAjaxThings(params) {
    
//     let result = await makeRequest("POST", "https://localhost:7206/api/Commodity/full_info/" + productID);
//     // console.log(result);
// }



function makeRequest(method, url,params) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
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
                resolve(xhr.response);
                console.log("done");
                
                
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


// function getProducts(res){
//     showProducts(res);
// }

// function makeRequest(method, url,params) {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send();
//         if(token != null)
//         {
//             req.setRequestHeader('Authorization', token );
//         }
//         // if(method == "GET"){
//         //     xhr.send();
//         // }else{
//         //     xhr.send(JSON.stringify(params));
//         // }
        
//         xhr.onload = function () {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(JSON.parse(xhr.response));
//                 console.log(JSON.parse(xhr.response))
//                 // getProducts(res);
                
                
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