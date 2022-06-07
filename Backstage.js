//var token = localStorage.getItem("token");
var token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbmlzdHJhdG9yIiwic2lkIjoiMSIsImp0aSI6IjIwZjVhZWY5LTRjZWMtNDA0MS04Y2FmLWNkOTJmMzUzOTY3MCIsInJvbGVzIjpbIkFkbWluIiwiVXNlcnMiXSwibmJmIjoxNjUzOTE2MDk0LCJleHAiOjE2NTQwOTYwOTQsImlhdCI6MTY1MzkxNjA5NCwiaXNzIjoiSnd0QXV0aCJ9.h3FuE1PoA_DgkHkRg2yXYJEwrpMGp_7PdvchJdM5JuM";

var obPage = {
  betablink: "scc",
  patablink: "pap",
  tictablink: "tic",
  usertablink: "user",
};
// 點選各管理
function opentab(evt, cityName) {
  let i;
  let item = evt.currentTarget;
  let cur_content = document.getElementById(cityName);
  let contents = document.getElementsByClassName("tabcontent");
  let links = document.getElementsByClassName("tablinks");
  // Set Tab Page active to none
  for (i of contents) i.style.display = "none";
  // Set Tag Menu style to none
  for (i of links) i.classList.remove("active");
  // Change this item Style display to block
  cur_content.style.display = "block";
  item.classList.add("active");
  // Set Path " Home > Menu > Page "
  change_root(item.children[1].innerHTML, null);
}
// 點選各頁面
function openPage(evt, PageId) {
  let i;
  let item = evt.currentTarget;
  let ClassControl = item.classList[0];
  let contents = document.getElementsByClassName(obPage[ClassControl]);
  let links = document.getElementsByClassName(ClassControl);
  // Set Contents display style none
  for (i of contents) i.style.display = "none";
  // Set Tag Page style to none
  for (i of links) i.classList.remove("active");
  document.getElementById(PageId).style.display = "block";
  item.classList.add("active");
  // Set Path " Home > Menu > Page "
  change_root(null, item.innerHTML);
}
// change path > menu > page
async function change_root(menu_name, page_name) {
    // clear
    var menu = document.getElementById("menu");
    var page = document.getElementById("page");
    if (menu_name != null) {
      menu.innerHTML = "";
      menu.innerHTML = " > " + menu_name;
    }
    page.innerHTML = "";
    if (page_name != null) page.innerHTML = " > " + page_name;
}
// Get Checkbox Value Array
function getCheckboxValue(CheckboxName) {
  let result = [];
  let target = document.querySelectorAll('[name="' + CheckboxName + '"]');
  for (let i of target) {
    if (i.checked) {
      result.push(i.value);
    }
  }
  return result;
}
// Set Checkbox Value Array
function setCheckboxValue(CheckboxName , valueList) {
  let target = document.querySelectorAll('[name="' + CheckboxName + '"]');
  for (let i of target) {
    if(!valueList){
      i.checked = false;
    }
    else{
      if(valueList.includes(i.closest('label').innerHTML.split('>')[1])){
        i.checked = true;
      }
    }
  }
}
// Get All Value By Object List in Object.js
function GetAllFromObject(object){
    let Mast = new Object();
    for (let item of object) {
      switch (item.Element) {
        case "input[type=text]":
          Mast[item.ColumnName] = document.getElementById(item.Connect).value;
          break;

        case "input[type=checkbox]":    
          if(item.Amount == "Multiple"){
            Mast[item.ColumnName] = getCheckboxValue(item.Connect);
          }
          else if(item.Amount == "Single"){
            if(document.getElementById(item.Connect).checked)
              Mast[item.ColumnName] = document.getElementById(item.Connect).value;
            else
              Mast[item.ColumnName] = false;
          }
          else {
            // do nothing
          }
          break;

        case "input[type=number]":
          if(item.Amount == "Single")
            Mast[item.ColumnName] = document.getElementById(item.Connect).value;
          break; 
        
        case "textarea":
          Mast[item.ColumnName] = document.getElementById(item.Connect).value;
          break;

        case "select":
          if(item.Amount == "Single")
            Mast[item.ColumnName] = document.getElementById(item.Connect).value;
          break;

        case "src":
          let url = document.getElementById(item.Connect).src;
          if(item.Amount == "Complex"){
            if (url != undefined && url != window.location.href){
              if(Array.isArray(Mast[item.ColumnName])){
                Mast[item.ColumnName].push(url);
              }
              else{
                Mast[item.ColumnName] = [];
                Mast[item.ColumnName].push(url);
              }
            }
          }
          break;

        default:
          // do nothing
          break;
      }
    }
    return Mast;
}
// Set All Value by Object List in Object.js
function SetAllFromObject(object , value){
  let counter = 0;
  for (let item of object) {
    switch (item.Element) {
      case "input[type=text]":
        if (!value || !value[item.ColumnName]){
          document.getElementById(item.Connect).value = "";
        }
        else{
          document.getElementById(item.Connect).value = value[item.ColumnName];
        }
        break;

      case "input[type=checkbox]":    
        if(item.Amount == "Multiple"){
          if (!value || !value[item.ColumnName]){
            setCheckboxValue(item.Connect , null);
          }
          else{
            setCheckboxValue(item.Connect , value[item.ColumnName]);
          }
        }
        else if(item.Amount == "Single"){
          if (!value || !value[item.ColumnName]){
            document.getElementById(item.Connect).checked = false;
          }
          else{
            if(value[item.ColumnName] == 1 || value[item.ColumnName] == true){
              document.getElementById(item.Connect).checked = true;
            }
            else{
              document.getElementById(item.Connect).checked = false;
            }
          }
        }
        else {
          // do nothing
        }
        break;

      case "input[type=number]":
        if(item.Amount == "Single"){
          if (!value || !value[item.ColumnName]){
            document.getElementById(item.Connect).value = 0;
          }
          else{
            document.getElementById(item.Connect).value = value[item.ColumnName];
          }
        }
        break; 
      
      case "textarea":
        if (!value || !value[item.ColumnName]){
          document.getElementById(item.Connect).value = "";
        }
        else{
          document.getElementById(item.Connect).value = value[item.ColumnName];
        }
        break;

      case "select":
        let target = document.getElementById(item.Connect);
        if(item.Amount == "Single"){
          if (!value || !value[item.ColumnName] || value[item.ColumnName] == ""){
            target.value = "";
          }
          else{
            let cur_val;
            target.childNodes.forEach((element , index) => {
              if(element.text == value[item.ColumnName][0]){
                cur_val = element.value;
              }
            });
            target.value = cur_val;
          }

          let tar_attr = target.attributes;
          for(let i = 0 ; i < tar_attr.length; i++){
            if(tar_attr[i].name.startsWith('on')){
              eval(target.getAttribute(tar_attr[i].name));
            }
          }

        }
        break;

      case "src":
        if(item.Amount == "Complex"){
          if (!value || !value[item.ColumnName]){
            document.getElementById(item.Connect).src = "";
          }
          else{
            if(counter < value[item.ColumnName].length)
              document.getElementById(item.Connect).src = value[item.ColumnName][counter++];
          }
        }
        break;

      default:
        // do nothing
        break;
    }
  }
}