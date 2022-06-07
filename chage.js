// 點選各管理內容頁
// function openefe(evt, sccName) {
//   var i;
//   var x = document.getElementsByClassName("scc");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   betablink = document.getElementsByClassName("betablink");
//   for (i = 0; i < betablink.length; i++) {
//     betablink[i].className = betablink[i].className.replace(" active", "");
//   }
//   document.getElementById(sccName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// //paper
// function openpap(evt, papName) {
//   var i;
//   var x = document.getElementsByClassName("pap");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   patablink = document.getElementsByClassName("patablink");
//   for (i = 0; i < patablink.length; i++) {
//     patablink[i].className = patablink[i].className.replace(" active", "");
//   }
//   document.getElementById(papName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// // tic
// function opentic(evt, ticName) {
//   var i;
//   var x = document.getElementsByClassName("tic");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   tictablink = document.getElementsByClassName("tictablink");
//   for (i = 0; i < tictablink.length; i++) {
//     tictablink[i].className = tictablink[i].className.replace(" active", "");
//   }
//   document.getElementById(ticName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// // user
// function openuser(evt, userName) {
//   var i;
//   var x = document.getElementsByClassName("user");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   usertablink = document.getElementsByClassName("usertablink");
//   for (i = 0; i < usertablink.length; i++) {
//     usertablink[i].className = usertablink[i].className.replace(" active", "");
//   }
//   document.getElementById(usercName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

// 新增商品
// $(function () {
//   $(".change a").click(function () {
//     $(".signform").animate({ height: "toggle", opacity: "toggle" }, "slow");
//   });
// });

// 新增優惠券
// $(function () {
//   $(".change a").click(function () {
//     $(".ticketsign").animate({ height: "toggle", opacity: "toggle" }, "slow");
//   });
// });

// 編輯優惠券
// $(function () {
//   $(".change a").click(function () {
//     $(".editticket").animate({ height: "toggle", opacity: "toggle" }, "slow");
//   });
// });

// Color List
// var listArray = [];
// var checkboxes = document.querySelectorAll(".checkbox");
// for (var checkbox of checkboxes) {
//   checkbox.addEventListener("click", function () {
//     if (this.checked == true) {
//       listArray.push(this.value);
//       console.log(this.value);
//       console.log(listArray);
//     } else {
//       listArray = listArray.filter((e) => e !== this.value);
//       console.log(listArray);
//     }
//   });
// }

// Create Commodity
// Mast.CommodityName = document.getElementById("I_CommodityName").value;
// Mast.Description = document.getElementById("I_Description").value;
// Mast.Material = document.getElementById("I_Material").value;
// Mast.isReleased = document.getElementById("I_isReleased").value == "on" ? true : false;
// Mast.Price = document.getElementById("I_Price").value;
// Mast.S_Price = document.getElementById("I_SPrice").value;
// Mast.CommodityKinds = document.getElementById("I_CommodityKind").value;
// Mast.CommoditySizes = getCheckboxValue("I_CommoditySize");
// Mast.CommodityColors = getCheckboxValue("I_CommodityColor");
// Mast.CommodityTags = getCheckboxValue("I_CommodityTag");
