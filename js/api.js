// --------- Change ----------------
var token = localStorage.getItem("token");
console.log(token);

async function img_Upload(e , id , input){
    let result;
    let form = new FormData();
    form.append("file", e[0]);
    result = await makeRequest("POST","/file/upload", form)
    document.getElementById(input).value = "";
    document.getElementById(id).src = "https://localhost:7206/api/file/" + result.FileName;
}

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
var New_Commodity = {};
async function Create_Commodity(){
    var Mast = Object.assign({},New_Commodity);
    for(var item in Mast){Mast[item] = "";};
    Mast.CommodityName = document.getElementById("I_CommodityName").value;
    Mast.Description = document.getElementById("I_Description").value;
    Mast.Material = document.getElementById("I_Material").value;
    console.log(document.getElementById("I_isReleased").value)
    Mast.isReleased = (document.getElementById("I_isReleased").value=="on")? true:false ;
    Mast.Price = document.getElementById("I_Price").value;
    Mast.S_Price = document.getElementById("I_S_Price").value;
    var kind_index = document.getElementById("I_CommodityKind").selectedIndex;
    Mast.CommodityKinds = document.getElementsByClassName("I_CommodityKind")[kind_index].value;
    Mast.CommodityTags = document.getElementById("I_CommodityTags").value;
    Mast.CommoditySizes = [1,2];
    Mast.CommodityColor = [1,2];
    Mast.CommodityImages = [];
    var url1 = document.getElementById("upload_img").src;
    var url2 = document.getElementById("upload_img1").src;
    var url3 = document.getElementById("upload_img2").src;
    if(url1 != undefined && url1 != window.location.href)
        Mast.CommodityImages.push(url1)
    if(url2 != undefined && url2 != window.location.href)
        Mast.CommodityImages.push(url2)
    if(url3 != undefined && url3 != window.location.href)
        Mast.CommodityImages.push(url3)

   let result = await makeRequest("POST","/Commodity/AddCommodity" ,JSON.stringify(Mast));
   if(result.status == 200){
        document.getElementById('signform').style.display="none";
        document.getElementById('registerform').style.display="none";
        GetCommodities();
   }
}

async function GetCommodities(){
    let result = await makeRequest("GET","/Commodity/GetTopCommodity",null);
    let Amount = 0;let img = ""; let Sizes = ""; let Tags = "";let colors="";
    var html = document.getElementById("Commodity_lists");
    var html2 = document.getElementById("PriceLists");
    var html3 = document.getElementById("InfoLists");
    // Clear
    html.innerHTML = "";
    html2.innerHTML = "";
    html3.innerHTML = "";

    for(var item in result)
    {
        for(var count in result[item].Amount)
        {
            Amount += parseInt(count);
        }
        if(result[item].CommodityImages.length > 0){
            img = result[item].CommodityImages[0];
        }
        for (var i = 0; i < result[item].CommoditySizes ; i++) {
           Sizes+= result[item].CommoditySizes[i];                     
        }
        for (var tag in result[item].CommodityTags) {
            Tags+= result[item].CommodityTags[tag];                     
        }
        for(var color in result[item].CommodityColor){
            colors+= result[item].CommodityColor[i];
        }
        var insert = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                        '<div style="width: 14%;display: flex;align-items: center;position: relative;">'+
                            '<label class="detailupload_cover img_update">'+
                            '<img src="'+ img +'" style="max-width: 100%;height: auto;"/>'+
                            '<span class="upload_icon"></span>'+
                            '<i class="delAvatar fa fa-times-circle-o" title="刪除"></i>'+
                            '</label>'+
                        '</div>'+
                        '<p style="width: 14%">' + result[item].CommodityId + '</p>'+
                        '<p style="width: 14%">' + result[item].CommodityName + '</p>'+
                        '<p style="width: 14%">NT$' + result[item].Price + '</p>'+
                        '<p style="width: 14%">' + Amount + '</p>'+
                        '<p style="width: 14%">' + ((result[item].isReleased)? '上架': '未上架') + '</p>'+
                        '<div style="width: 14%; display: flex; justify-content: center">'+
                            '<button style="margin: 5px" class="body_btn" onclick="Delete('+ result[item].CommodityId +')">刪除</button>'+
                        '</div>'+
                    '</div>';

        var insert2 = '<div style="width:100%;display:flex;align-items:center;text-align:center;border:#e3e5e5 1px solid;">'+
                            '<p style="width: 33%; line-height: 10px">'+ result[item].CommodityId + '</p>'+
                            '<p style="width: 33%">NT$' + result[item].Price + '</p>'+
                            '<p style="width: 33%">NT$' + result[item].S_Price +'</p>'+
                            '<p style="width: 33%">' + Amount + '</p>'+
                        '</div>';

        var insert3 = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                            '<p style="width: 16%; line-height: 10px">' + result[item].CommodityId + '</p>'+
                            '<p style="width: 16%">'+ result[item].CommodityName +'</p>'+
                            '<p style="width: 16%">' + result[item].CommodityKinds + '</p>'+
                            '<p style="width: 16%">' + Sizes +'</p>'+
                            '<p style="width: 16%">' + colors + '</p>'+
                            '<p style="width: 16%">'+ Tags +'</p>'+
                        '</div>';


        html.innerHTML += insert;
        html2.innerHTML += insert2;
        html3.innerHTML += insert3;

        Amount = 0 , img = "",Sizes = "",Tags="" , colors ="";
    }    
}

async function GetSales(){
    let result = await makeRequest("GET","/Sales/GetAll",null);
    var html = document.getElementById("Sales_All");
    var html2 = document.getElementById("Sales_Prepare");
    var html3 = document.getElementById("Sales_UnPay");
    var html4 = document.getElementById("Sales_Colls");
    // Clear
    html.innerHTML = "";
    html2.innerHTML = "";
    html3.innerHTML = "";
    html4.innerHTML = "";

    for(var item in result) {
        console.log(result[item]);
        var insert = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                            '<p style="width: 20%; line-height: 10px">' + result[item].SaleID + '</p>'+
                            '<p style="width: 20%">' + result[item].Established.substring(0, 10) + '</p>'+
                            '<p style="width: 20%">NT$' + result[item].Total_Price +'</p>'+
                            '<p style="width: 20%">' + ((result[item].isChecked)? '出貨':'未出貨') + '</p>'+
                            '<p style="width: 20%">' + result[item].Address + '</p>'+
                        '</div>';
        html.innerHTML+= insert;

        if(result[item].SendDate == null && result[item].isChecked == false){
            var insert2 = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                                '<p style="width: 50%">' + result[item].SaleID + '</p>'+
                                '<p style="width: 50%">' + result[item].Established + '</p>'+
                                '<p style="width: 50%">收到訂單</p>'+
                            '</div>';

            html2.innerHTML+= insert2;
        }

        if(result[item].SendDate == null){
            var insert3 = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                                '<p style="width: 25%; line-height: 10px">' + result[item].SaleID + '</p>'+
                                '<p style="width: 25%">' + result[item].Established.substring(0, 10) + '</p>'+
                                '<p style="width: 25%">NT$' + result[item].Total_Price +'</p>'+
                                '<p style="width: 25%">'+
                                    '<span style="color: #ea3d2f">尚未付款</span>'+
                                '</p>'+
                            '</div>';      

            html3.innerHTML+= insert3;
        }
        
        let status = "";
        if(result[item].SendDate!= null){
            status= "已送出";
        }
        else if(result[item].isChecked){
            status= "準備出貨";
        }
        else{
            status= "準備中";
        }

        var insert4 = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                            '<p style="width: 50%">' + result[item].SaleID + '</p>'+
                            '<p style="width: 50%">' + status  + '</p>'+
                      '</div>';

        html4.innerHTML+= insert4;
    }
}

async function GetMembers(){
    let result = await makeRequest("GET","/Member/GetTopMember/1000",null);
    var html = document.getElementById("Memberslist");
    // Clear
    html.innerHTML = "";
    for(var item in result) {
        var insert = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                            '<p style="width: 20%">' + result[item].MemberID + '</p>'+
                            '<p style="width: 20%">' + result[item].Name + '</p>'+
                            '<p style="width: 20%">' + result[item].Email_Address + '</p>'+
                            '<p style="width: 20%">Y</p>'+
                            '<p style="width: 20%">' + result[item].CreateTime + '</p>'+
                        '</div>';
        html.innerHTML+= insert;
    }
}

async function GetCoupons(){
    let result = await makeRequest("GET","/Coupon/GetAll",null);
    var html = document.getElementById("coupon_lists");
    html.innerHTML = "";
    for(var item in result){
        var insert = '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">'+
                        '<div style="width: 14%;display: flex;align-items: center;position: relative;">'+
                            '<p style="margin-left: 30px;">' + result[item].CouponID + '</p>'+
                        '</div>'+
                        '<p style="width: 14%">' + result[item].Coupon_Title + '</p>'+
                        '<p style="width: 24%">' +  result[item].Issued_Date + ' 起'+'<br>'+ result[item].End_Date + ' 迄</p>'+
                        '<div style="margin-left: 84px;width: 63px;height: 38px;background-color:'+(result[item].isIssued? 'green' : 'brown') + '; color: white;">'+ 
                            (result[item].isIssued? '起用' : '未起用')
                        +'</div>'+
                        '<div style="width: 24%; display: flex; justify-content: center">'+
                            '<button style="margin-left: 150px; white-space:nowrap;" class="body_btn">編輯</button>'+
                            '<button style="margin-left: 25px; white-space:nowrap;" class="body_btn">刪除</button>'+
                        '</div>'+
                    '</div>';
        html.innerHTML += insert;
    }    
}

async function GetArticle(){
    let result = await makeRequest("GET","/article/GetAll",null);
    console.log(result)
}

async function change_root(menu_name , page_name){
    // clear
    var menu = document.getElementById("menu");
    var page = document.getElementById("page");
    menu.innerHTML = "";
    page.innerHTML = "";

    menu.innerHTML= '>'+ menu_name;
    if(page_name != null)
        page.innerHTML = '>' + page_name;
}

async function Delete(CommodityId){
    let result = await makeRequest("GET","/Commodity/Delete/"+CommodityId ,null);
    if(await result.status == 200){
        GetCommodities();
    }
}