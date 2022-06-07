// SalesRecode
var SalesRecode = [];

async function GetSales(){
    SalesRecode = await makeRequest("GET", "/Sales/GetAll", null);
    RenderSales(SalesRecode);
}

async function RenderSales(result) {
    var html = document.getElementById("Sales_All");
    var html2 = document.getElementById("Sales_Prepare");
    var html3 = document.getElementById("Sales_UnPay");
    var html4 = document.getElementById("Sales_Colls");
    // Clear
    html.innerHTML = "";
    html2.innerHTML = "";
    html3.innerHTML = "";
    html4.innerHTML = "";
  
    for (var item in result) {
      var insert =
        '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
        '<p style="width: 20%; line-height: 10px">' +
        result[item].SaleID +
        "</p>" +
        '<p style="width: 20%">' +
        result[item].Established.substring(0, 10) +
        "</p>" +
        '<p style="width: 20%">NT$' +
        result[item].Total_Price +
        "</p>" +
        '<p style="width: 20%">' +
        (result[item].isChecked ? "出貨" : "未出貨") +
        "</p>" +
        '<p style="width: 20%">' +
        result[item].Address +
        "</p>" +
        "</div>";
        
      html.innerHTML += insert;
  
      if (result[item].SendDate == null && result[item].isChecked == false) {
        var insert2 =
          '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
          '<p style="width: 50%">' +
          result[item].SaleID +
          "</p>" +
          '<p style="width: 50%">' +
          result[item].Established +
          "</p>" +
          '<p style="width: 50%">收到訂單</p>' +
          "</div>";
  
        html2.innerHTML += insert2;
      }
  
      if (result[item].SendDate == null) {
        var insert3 =
          '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
          '<p style="width: 25%; line-height: 10px">' +
          result[item].SaleID +
          "</p>" +
          '<p style="width: 25%">' +
          result[item].Established.substring(0, 10) +
          "</p>" +
          '<p style="width: 25%">NT$' +
          result[item].Total_Price +
          "</p>" +
          '<p style="width: 25%">' +
          '<span style="color: #ea3d2f">尚未付款</span>' +
          "</p>" +
          "</div>";
  
        html3.innerHTML += insert3;
      }
  
      let status = "";
      if (result[item].SendDate != null) {
        status = "已送出";
      } else if (result[item].isChecked) {
        status = "準備出貨";
      } else {
        status = "準備中";
      }
  
      var insert4 =
        '<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">' +
        '<p style="width: 50%">' +
        result[item].SaleID +
        "</p>" +
        '<p style="width: 50%">' +
        status +
        "</p>" +
        "</div>";
  
      html4.innerHTML += insert4;
    }
}