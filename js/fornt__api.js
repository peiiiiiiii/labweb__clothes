// --------- Change ----------------
var token = localStorage.getItem("token");
// console.log(token);



async function makeRequest(method, url , data) {
return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    method= method.toUpperCase();
    xhr.open(method, "https://localhost:7206/api" + url);
    xhr.setRequestHeader("Authorization",token);
    if(url != "/file/upload" && method == "POST"){
        xhr.setRequestHeader("Content-Type", "application/json")
    }

    xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            if(xhr.response != "")
                resolve(JSON.parse(xhr.response));
            else
                resolve("");
        } else {
            if (this.status === 400) {
                resolve(JSON.parse(this.status)); 
             }
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
    if(method == "POST"){
        xhr.send(data);
    }
    else{
        xhr.send();
    }     
});
}





// search
export async function colectionsearch(params) {
    // console.log(params)
    let result = await makeRequest("POST", "/Commodity/Search",JSON.stringify(params));
    return result[0];
    
}

// 
export async function profiletoken() {
    let result = await makeRequest("GET", "/Commodity/GetTopCommodity");
    return result;
}

export async function GetColor(){
    let result = await makeRequest("GET","/Color/GetAll",null);
    return result;
}
// 取的所有(篩選)
export async function GetAllTags(){
    let result = await makeRequest("GET","/Tags/GetAll",null);
    return result;
}

// 商品詳細
export async function getDetail(id) {
    let result = await makeRequest("GET","/Commodity/GetCommodity/full_info/" + id,null);
    return result;
}
// 瀏覽次數
export async function ViewRecoder(id) {
    let result = await makeRequest("GET", "/Commodity/View_Recoder?CommodityID=" + id, null);
    return result;
}
// 案讚次數
export async function LikeCommodity(id) {
    let result = await makeRequest("GET", "/Commodity/LikeCommodity?CommodityID=" + id, null);
    return result;
}
// 猜你喜歡
export async function getrandom4(id) {
    let result = await makeRequest("GET","/Commodity/GetRandom/4",null);
    return result;
}
// addcart
export async function addCart(params) {
    let result = await makeRequest("POST","/Commodity/addshoppingcart",JSON.stringify(params));
    return result;
}

export async function Login(params) {
    let result = await makeRequest("POST", "/Member/register",params);
    return result;
}


export async function updateprofile(params) {
    let update = await makeRequest("POST", "/Member/update",JSON.stringify(params));
    return update;
}
export async function getProfile() {
    let result = await makeRequest("GET", "/Member/getMember");
    return result;
}

export async function loginajax(params) {
    let result = await makeRequest("POST", "/Member/signin",JSON.stringify(params));
    return result;
}
// 結帳
export async function checkoutApi(params) {
    console.log(params)
    let result = await makeRequest("POST","/Sales/checkout",JSON.stringify(params));
    return result;
}

// 折價券
export async function couponCompare(id) {
    let result = await makeRequest("POST","/Coupon/Condition?Coupon_Key=" + id, null);
    return result;
}



export async function metMyOreder() {
    let result = await makeRequest("GET", "/Sales/GetAll");
    return result;
}