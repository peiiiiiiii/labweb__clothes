// --------- Change ----------------
var Commodities = [];
// TagRecode
var TagRecode = [];
// Show Tags
var TagView = [];
// ColorRecode
var ColorRecode = [];
// KindRecode
var KindRecode = [];
// SizeRecode
var SizeRecode = [];
// Create Commodity Object
var Gen_Commodity = {};

async function img_Upload(e, id, input) {
  let result;
  let form = new FormData();
  form.append("file", e[0]);
  result = await makeRequest("POST", "/file/upload", form);
  document.getElementById(input).value = "";
  document.getElementById(id).src =
    "https://localhost:7206/api/file/" + (await result);
  //document.getElementById(id).nextElementSibling.style.display = "none";
}
// Create Commodity Send /Commodity/AddCommodity
async function Create_Commodity() {
  let Mast = GetAllFromObject(Ob_Insert_Commodity);
  Mast.isReleased = Mast.isReleased == "on" ? true : false;
  if(Mast.S_Price > Mast.Price){
    alert("優惠價不可大於標價");
    return;
  }
  let result = await makeRequest("POST","/Commodity/AddCommodity",JSON.stringify(Mast));
  if ((await result.status) == 200) {
    document.getElementById("signform").style.display = "none";
    document.getElementById("registerform").style.display = "none";
    GetCommodities();
  }
}
// Update Commodity Send /Commodity/UpdateCommodity
async function Update_Commodity(CommodityId){
  let Mast = GetAllFromObject(Ob_Insert_Commodity);
  Mast.isReleased = Mast.isReleased == "on" ? true : false;
  Mast.CommodityID = CommodityId;
  if(Mast.S_Price > Mast.Price){
    alert("優惠價不可大於標價");
    return;
  }
  let result = await makeRequest("POST","/Commodity/UpdateCommodity",JSON.stringify(Mast));
  console.log(result)
  if ((await result.status) == 200) {
    document.getElementById("signform").style.display = "none";
    document.getElementById("registerform").style.display = "none";
    GetCommodities();
  }
}
// Get Commodity /Commodity/GetTopCommodity
async function GetCommodities(){
  Commodities = await makeRequest("GET", "/Commodity/GetTopCommodity", null);
  RenderCommodity(Commodities);
}
// Get Colors From /Color/GetAll"
async function GetColor() {
  let insert = "";
  let result = await makeRequest("GET", "/Color/GetAll", null);
  let color__list = document.getElementById("color__list");
  ColorRecode = result;
  color__list.innerHTML = "";
  for (var item in result) {
    insert += `<div class="color_card" data-id="${result[item].ColorId}">
                    <img src="${result[item].ColorUrl}" style="border-bottom:#e5e5e5 solid 1px;"/>
                    <label style="font-size:10px;"><input type="checkbox" value="${result[item].ColorId}" class="checkbox" name="I_CommodityColor""/>${result[item].ColorName}</label>
                </div>`;
                // id="${result[item].ColorId}"
    color__list.innerHTML = insert;
  }
}
// Get Size From /Sizes/GetAll
async function GetSize() {
  SizeRecode = await makeRequest("GET", "/Sizes/GetAll", null);
}
// Get From Tags
async function GetTags() {
  TagRecode = await makeRequest("GET", "/Tags/GetAll", null);
}
// Get From TagsRecode Kinds
function GetKinds() {
  // 初始化
  KindRecode = [];
  TagRecode.forEach((ele) => {
    // 新增種類
    let new_obj = new Object();
    new_obj["KindsID"] = ele.KindsID;
    new_obj["Kinds"] = ele.Kinds;
    KindRecode.push(new_obj);
  });
}
// New Commodity Listener
function New_Commodity() {
  SetAllFromObject(Ob_Insert_Commodity , null);
  document.getElementById("signform").style.display = null;
  document.getElementById("registerform").style.display = null;
  document.getElementById("New_Commodity_Title").innerHTML = "新增商品";
  Insert_Commodity();
}
// Modify Commodity Listener
async function Commodity_Modify(CommodityId){
  let cur = Commodities.filter(c => c.CommodityId == CommodityId)[0];
  document.getElementById("signform").style.display = null;
  document.getElementById("registerform").style.display = null;
  document.getElementById("New_Commodity_Title").innerHTML = "編輯商品";
  await Insert_Commodity();
  SetAllFromObject(Ob_Insert_Commodity , cur);
  document.getElementById("Commodity_Commit").setAttribute('onclick',  'Update_Commodity('+CommodityId+ ');');
}
// Insert Loading List
async function Insert_Commodity() {
  // must
  await GetTags();
  await GetColor();
  await GetKinds();
  // can wait
  await GetSize();
  await RenderKinds();
  SetAllFromObject(Ob_Insert_Commodity,null);
  document.getElementById("Commodity_Commit").setAttribute('onclick',  'Create_Commodity();');
}
// 商品搜尋
function Commodity_Search(value){
  if(value != ""){
    let reg = new RegExp('^.*'+ value +'.*$');
    let search = Commodities.filter(c => reg.test(c.CommodityId));
    if(search.length > 0){
      RenderCommodity(search);
    }
    else{
      alert("找不到此訊息");
      document.getElementById("phonesear").value = "";
      RenderCommodity(Commodities);
    }
  }
  else{
    RenderCommodity(Commodities);
  }
}
// 商品搜尋
function Commodity_Search_back(value){
  if(value != ""){
    let reg = new RegExp('^.'+ value +'.*$');
    let search = Commodities.filter(c => reg.test(c.CommodityId));
    if(search.length > 0){
      RenderCommodity(search);
    }
    else{
      alert("找不到此訊息");
      document.getElementById("phonesear").value = "";
      RenderCommodity(Commodities);
    }
  }
  else{
    RenderCommodity(Commodities);
  }
}
// 渲染 Commodity
async function RenderCommodity(result) {
  let Amount = 0;
  let img = "", Sizes = "", Tags = "", Colors = "";
  let CommodityImagesList = [];
  let ImgMap = new Array();
  let html = document.getElementById("Commodity_lists");
  let html2 = document.getElementById("ImageLists");
  let html3 = document.getElementById("PriceLists");
  let html4 = document.getElementById("InfoLists");
  // Clear
  html.innerHTML = "";
  html2.innerHTML = "";
  html3.innerHTML = "";
  html4.innerHTML = "";

  for (var item in result) {
    
    for (var count of result[item].Amount) {
      Amount += parseInt(count);
    }
    if (result[item].CommodityImages.length > 0) {
      img = result[item].CommodityImages[0];
      ImgMap.push({
        Name: result[item].CommodityName,
        Count: result[item].CommodityImages.length
      });
      CommodityImagesList = CommodityImagesList.concat(result[item].CommodityImages);
    }
    for (var size in result[item].CommoditySizes) {
      Sizes += result[item].CommoditySizes[size] + "、";
    }
    Sizes = Sizes.substring(0, Sizes.length - 1);

    for (var tag in result[item].CommodityTags) {
      Tags += result[item].CommodityTags[tag] + "、";
    }
    Tags = Tags.substring(0, Tags.length - 1);

    for (let i = 0; i < result[item].CommodityColors.length; i += 2) {
      Colors += result[item].CommodityColors[i] + "、";
    }
    Colors = Colors.substring(0, Colors.length - 1);

    var insert =
      '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
      '<div style="width: 14%;display: flex;align-items: center;position: relative;">' +
      '<label class="detailupload_cover img_update">' +
      '<img src="' + img + '" style="max-width: 100%;height: auto;"/>' +
      '<span class="upload_icon"></span>' +
      '<i class="delAvatar fa fa-times-circle-o" title="刪除"></i>' +
      "</label>" +
      "</div>" +
      '<p style="width: 14%">' + result[item].CommodityId + "</p>" +
      '<p style="width: 14%">' + result[item].CommodityName + "</p>" +
      '<p style="width: 14%">NT$' + result[item].Price + "</p>" +
      '<p style="width: 14%">' + Amount + "</p>" +
      '<p style="width: 14%">' + (result[item].isReleased ? "上架" : "未上架") + "</p>" +
      '<div style="width: 14%; display: flex; justify-content: center">' +
      '<button style="margin: 5px" class="body_btn" onclick="Commodity_Modify(' + result[item].CommodityId + ')">編輯</button>' +
      '<button style="margin: 5px" class="body_btn edit_btn" onclick="Delete(' + result[item].CommodityId + ')">刪除</button>' +
      "</div>" + "</div>";

    let insert3 =
      '<div style="width:100%;display:flex;align-items:center;text-align:center;border:#e3e5e5 1px solid;">' +
      '<p style="width: 33%; line-height: 10px">' + result[item].CommodityId +"</p>" +
      '<p style="width: 33%">NT$' + result[item].Price + "</p>" +
      '<p style="width: 33%">NT$' + result[item].S_Price + "</p>" +
      '<p style="width: 33%">' + Amount + "</p>" +
      "</div>";

    let insert4 =
      '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
      '<p style="width: 16%; line-height: 10px">' + result[item].CommodityId + '</p>' +
      '<p style="width: 16%">' + result[item].CommodityName + '</p>' +
      '<p style="width: 16%">' + result[item].CommodityKinds + '</p>' +
      '<p style="width: 16%">' + Sizes + '</p>' +
      '<p style="width: 16%">' + Colors + "</p>" +
      '<p style="width: 16%">' + Tags + "</p>" +
      "</div>";

    html.innerHTML += insert;
    html3.innerHTML += insert3;
    html4.innerHTML += insert4;

    (Amount = 0), (img = ""), (Sizes = ""), (Tags = ""), (Colors = "");
  }
  let insert2 = "" ,  co = 0 , index = ImgMap.shift();
  for(let i = 0 ; i < CommodityImagesList.length ; i++) {
    // count
    co++;

    if(i % 5 == 0){
      insert2 += ' <div style="width: 96%;margin: auto;display: flex;background-color: #ffffff;">';
    }

    insert2 += `<div style="width: 20%; border: 1px solid #595656; margin: 15px">
                  <img src="${CommodityImagesList[i]}" width="100%" alt="" />
                  <p style="text-align: center">${index.Name}</p>
                </div>`

    if(i % 5 == 4){
      insert2 += '</div>'
    }

    if(co == index.Count){
      index = ImgMap.shift();
      co = 0;
    }
  }
  html2.innerHTML = insert2;
}
// Commodity Insert Render
function Render_Commodity() {
  RenderTags();
  RenderSizes();
}
// 渲染商品種類
function RenderKinds() {
  let target = document.getElementById("I_CommodityKind");
  target.innerHTML = "";
  target.innerHTML += `<option value="" selected> -- 請選擇 -- </option>`;
  KindRecode.forEach((ele) => {
    target.innerHTML += `<option value="${ele.KindsID}">${ele.Kinds}</option>`;
  });
}
// 渲染商品標籤
function RenderTags() {
  let val = document.getElementById("I_CommodityKind").value;
  let target = document.getElementById("Tag__list");
  target.innerHTML = "";
  if(!val){
    return;
  }
  let cur_tag = TagRecode.filter((tag) => tag.KindsID == val)[0]["Tag"];
  cur_tag.forEach((ele) => {
    target.innerHTML += `<label for="news"><input type="checkbox" name="I_CommodityTag" class="ml-5 mr-5" value="${ele.TagsID}"/>${ele.Tag}</label>`;
  });
}
// 渲染尺寸標籤
function RenderSizes() {
  let val = document.getElementById("I_CommodityKind").value;
  let target = document.getElementById("Size__list");
  target.innerHTML = "";
  if(!val){
    return;
  }
  let cur_tag = SizeRecode.filter((size) => size.CommodityKindID == val);
  cur_tag.forEach((ele) => {
    target.innerHTML += `<label for="news"><input type="checkbox" name="I_CommoditySize" class="ml-5 mr-5" id="news" value="${ele.SizeID}"/>${ele.Size}</label>`;
  });
}
// make Request
async function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    method = method.toUpperCase();
    xhr.open(method, "https://localhost:7206/api" + url);
    xhr.setRequestHeader("Authorization", token);
    if (url != "/file/upload" && method == "POST") {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        if (xhr.response != "") {
          resolve(JSON.parse(xhr.response));
        } else {
          resolve({
            status: this.status,
            statusText: xhr.statusText,
          });
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };

    if (method == "POST") xhr.send(data);
    else xhr.send();
  });
}



async function Delete(CommodityId) {
  let result = await makeRequest(
    "GET",
    "/Commodity/Delete/" + CommodityId,
    null
  );
  if ((await result.status) == 200) {
    GetCommodities();
  }
}