// MemberRecode
var MemberRecode = [];

// GetMembers /Member/GetTopMember/1000
async function GetMembers() {
  MemberRecode = await makeRequest("GET", "/Member/GetTopMember/1000", null);
  Render_Members(MemberRecode);
}
// Render Members
function Render_Members(object) {
  let Gender;
  let html = document.getElementById("Members__list");
  // Clear
  html.innerHTML = "";
  for (var item in object) {
    if(object[item].Gender == "Male")
      Gender = "男"
    else if(object[item].Gender == "Female")
      Gender = "女"
    else
      Gender = "";

    var insert =
      `<div style="width: 100%;display: flex;align-items: center;text-align: center;border: #e3e5e5 1px solid;">
        <p style="width: 16%"> ${object[item].MemberID} </p>
        <p style="width: 16%"> ${object[item].Name} </p>
        <p style="width: 16%"> ${object[item].Email_Address}  </p>
        <p style="width: 16%"> ${Gender} </p>
        <p style="width: 16%"> ${!object[item].LastSignin ? "":object[item].LastSignin} </p>

        <div style="width: 16%; display: flex; justify-content: center">
          <button style="margin: 3px" class="body_btn">編輯</button>
          <button style="margin: 3px" class="body_btn edit_btn">刪除</button>
        </div>
      </div>`
      
    html.innerHTML += insert;
  }
}