
function signclose() {
  document.getElementById("signform").style.display = "none";
  document.getElementById("registerform").style.display = "none";
  
}
// function loading() {
//   document.getElementById("registerloading").style.display = "";
// }
// 編輯商品
// $(function () {
//   $(".change a").click(function () {
//     $(".editform").animate({ height: "toggle", opacity: "toggle" }, "slow");
//   });
// });
function edit() {
  document.getElementById("editform").style.display = "";
}

function editclose() {
  document.getElementById("editform").style.display = "none";
  document.getElementById("editregister").style.display = "none";
}
function loading() {
  document.getElementById("editregister").style.display = "";
}

function ticket() {
  document.getElementById("ticketsign").style.display = "";
}

function ticketclose() {
  document.getElementById("ticketsign").style.display = "none";
  document.getElementById("ticketregister").style.display = "none";
}
function loading() {
  document.getElementById("ticketregister").style.display = "";
}


function editticket() {
  document.getElementById("editticket").style.display = "";
}

function editticketclose() {
  document.getElementById("editticket").style.display = "none";
  document.getElementById("editticketcontain").style.display = "none";
}
function loading() {
  document.getElementById("editticketcontain").style.display = "";
}
