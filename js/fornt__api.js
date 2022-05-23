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






async function Delete(CommodityId){
    let result = await makeRequest("GET","/Commodity/Delete/"+CommodityId ,null);
    if(await result.status == 200){
        GetCommodities();
    }
}
<<<<<<< Updated upstream

=======
// search
>>>>>>> Stashed changes
export async function colectionsearch(params) {
    // console.log(params)
    let result = await makeRequest("POST", "/Commodity/Search",JSON.stringify(params));
    return result[0];
    
}
<<<<<<< Updated upstream
=======

// collection
>>>>>>> Stashed changes
export async function profiletoken() {
    let result = await makeRequest("GET", "/Commodity/GetTopCommodity");
    return result;
}

export async function GetColor(){
    let result = await makeRequest("GET","/Color/GetAll",null);
    return result;
}
export async function GetAllTags(){
    let result = await makeRequest("GET","/Tags/GetAll",null);
    return result;
}
<<<<<<< Updated upstream
=======

// detail
export async function getDetail(id) {
    let result = await makeRequest("GET","/Commodity/GetCommodity/full_info/" + id,null);
    return result;
}
export async function getrandom4(id) {
    let result = await makeRequest("GET","/Commodity/GetRandom/4",null);
    return result;
}
// addcart
export async function addCart(id) {
    let result = await makeRequest("POST","/Commodity/addshoppingcart",JSON.stringify(CART.contents));
    return result;
}

export async function Login(params) {
    let result = await makeRequest("POST", "/Member/register",params);
    return result;
}


export async function updateprofile(params) {
    let update = await makeRequest("POST", "/Member/update",params);
    return update;
}
export async function getProfile() {
    let result = await makeRequest("GET", "/Member/getMember");
    return result;
}

export async function loginajax(params) {
    let result = await makeRequest("POST", "/Member/signin",params);
    return result;
}
>>>>>>> Stashed changes
