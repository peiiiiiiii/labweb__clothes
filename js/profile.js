let form__edit = document.querySelector(".js-account-edit");
let list__account = document.querySelector(".js-account-list");
let js__account_form = document.querySelector(".account__address-form");
let cancel__form = document.querySelector(".form-canel");
let token = localStorage.getItem('token');
let show__email = document.querySelector(".show__email");
let get__name = document.querySelector(".get__name");
let show__address = document.querySelector(".show__address");
let update__confirm = document.getElementById("update__confirm");
// form
let getName = document.querySelector("#Customername");
let getEmail = document.querySelector("#CustomerEmail");
let getPhone = document.querySelector("#CustomerPhoneCheck");
let getGender = document.getElementsByName("gender");
let getBir = document.querySelector("#CustomerDate");
let tabLink = document.getElementById("tabs").querySelectorAll("a");
const salebody = document.getElementById("salebody");

    let tabContents = document.getElementById("tab-inner").querySelectorAll('.form-content');
// import CART from "./shoppingCart.js";
// import {showCart} from "./shoppingCart.js";
// import {incres} from "./shoppingCart.js";
// import {decrea} from "./shoppingCart.js";
import {getProfile} from "./fornt__api.js";
import {updateprofile, metMyOreder} from "./fornt__api.js";

document.addEventListener("DOMContentLoaded",  ()=> {

    

    const resProfile = async() => {

        let res = await getProfile();
        getpro(res[0]);
        
    };
    resProfile();


    const checkMyOrder = async() => {

        let res = await metMyOreder();
        console.log(res)
        getSaleHis(res);
        
    };
    checkMyOrder();


    form__edit.addEventListener("click", (e)=>{
        list__account.style.display = "none";
    
        js__account_form.style.display = "block";
    
    });
    cancel__form.addEventListener("click",(e)=>{
        e.preventDefault();
    
        list__account.style.display = "block";
    
        js__account_form.style.display = "none";
    
    });

    update__confirm.addEventListener("click",function(e){
        e.preventDefault();
        // params.name = document.getElementById("Customername").value;
        // params.email_Address = document.getElementById("CustomerEmail").value;
        // params.password = document.getElementById("CustomerPassword").value;
        // params.second_verify = document.getElementById("CustomerPasswordCheck").value; 
        
        // getName.value =  res.Name
        // getEmail.innerHTML = res.Email_Address
        // getPhone
        // getGender.value = res.Gender
        // getBir.value = res.BirthDay
        let Gender_fm = 0;
        for (let radio of getGender)
        {   
            
            if (radio.checked) {
                Gender_fm = (+radio.value);
            }
        }
        const params = {
            Name : getName.value,
            Email_Address: getEmail.innerHTML,
            Gender : Gender_fm,
            BirthDay: getBir.value
            // ,
            // password : document.getElementById("CustomerPassword").value
        }
        const updatestatus = async(params) => {
            let res = await updateprofile(params);
            if(res){
                window.location.assign("./profile.html");
            }
            
        };
        updatestatus(params);

        
        
        
       
    //     // module.exports = params;
    });
    

    // sign in

    
    // logout
    document.querySelector(".js-logout").addEventListener("click",()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.assign("index.html");
    });



    

        // window.onload = function (){

    
     panelDisplay(tabLink[0]);
     for(let i = 0; i < tabLink.length; i++){
       tabLink[i].addEventListener('click',function(e){
        e.preventDefault();
         panelDisplay(this);
         // return false;
       });
       
       };
   
       function panelDisplay(activePanel){
          // Do something...
          for(let i =0;i<tabLink.length;i++){
            
           
              if(tabLink[i] == activePanel){
                tabLink[i].classList.add("active");
                tabContents[i].style.display="block";
                
              }else{
                tabLink[i].classList.remove("active");
                tabContents[i].style.display="none";
              }
          }
       }
  
    //  };
   
   
    //    tabel
    //表組み スクロール切り替え
const tables = document.querySelectorAll('table');
if(tables.length > 0) {
	//スクロール処理を発火させるブレイクポイント
	const breakPoint = 767;
	//tableごとの処理
	tables.forEach((table) => {
		//tableに除外class "is-no-scroll" が付与されている場合は処理しない
		if(!table.classList.contains('is-no-scroll')) {
			//スクロール用div要素作成
			const inner = document.createElement('div');
			inner.classList.add('table-inner');
			const wrap = document.createElement('div');
			wrap.classList.add('table-wrap');

			//スクロール用div要素挿入
			table.parentNode.insertBefore(inner, table);
			inner.appendChild(table);
			inner.parentNode.insertBefore(wrap, inner);
			wrap.appendChild(inner);

			//スクロール発火フラグ
			let scrollFlg = false;
			//table widthの設定値を取得
			table.baseWidth = table.style.width;

			//スクロール関数
			const tableScroll = () => {
				//スクロールが発火していたら設定をリセット
				if(scrollFlg) {
					inner.removeAttribute('style');
					wrap.removeAttribute('style');
					table.style.width = table.baseWidth;
					scrollFlg = false;
				}
				//ブレイクポイント以下の場合のみ処理
				const winWidth = window.innerWidth;
				if(winWidth > breakPoint) {
					return;
				}

				//tableのベース幅を取得
				let tableWidth = table.offsetWidth;
				const wrapWidth = wrap.offsetWidth;

				//tableの幅がwrapの幅以上の場合は本来の幅をチェック
				if(wrapWidth <= tableWidth) {
					//tableに100%以外のwidth指定が入っている場合
					if(table.baseWidth !== '' && table.baseWidth !== '100%') {
						tableWidth = parseFloat(table.baseWidth) + 1;

					} else {
						table.baseWidth = table.style.width;
						table.style.width = 'auto';
						inner.style.width = '9999px';
						tableWidth = table.offsetWidth;
						inner.style.width = '';
						table.style.width = table.baseWidth;
						console.log(tableWidth,table.baseWidth);
					}
				}

				//tableがwrapの幅を超えている場合スクロール発火
				if(wrapWidth < tableWidth) {
					//wrapリセット
					wrap.removeAttribute('style');
					wrap.style.overflowX = 'hidden';

					//wrapの左右の余白を取得
					const wrapLeftMargin = wrap.getBoundingClientRect().left;
					const wrapRightMargin = winWidth - parseFloat(wrap.getBoundingClientRect().right);

					//wrapを画面幅いっぱいに広げる
					wrap.style.overflowX = 'scroll';
					wrap.style.marginLeft = '-' + wrapLeftMargin + 'px';
					wrap.style.marginRight = '-' + wrapRightMargin + 'px';

					//innerにtable本来の幅 + 左右余白を設定
					inner.style.boxSizing = 'content-box';
					inner.style.paddingLeft = wrapLeftMargin + 'px';
					inner.style.paddingRight = wrapRightMargin + 'px';
					inner.style.width = (tableWidth + 1) + 'px'; //少数点分の繰り上げ

					//スクロール発火フラグセット
					scrollFlg = true;
				}
			}

			//スクロール関数呼び出し
			tableScroll();

			//リサイズイベント
			let lastInnerWidth = window.innerWidth;
			window.addEventListener('resize', function() {
				//画面の横サイズが変わった時のみ発火
				if (lastInnerWidth !== window.innerWidth) {
					//スクロール関数呼び出し
					tableScroll();
					//横幅を保存
					lastInnerWidth = window.innerWidth;
				}
			});
		}
	});
}


});






// // const params = require('./sign');
// // console.log(params);
// // sign up

function getSaleHis(res){
    let result = "";
    Array.from(res).forEach((element, i) => {
        console.log(element)
        
        let sendt = res.isChecked ? '已出貨':'處理中';
        let sendp = res.isPayed ? '已付款':'未付款';
        result += `
            <tr>
                <td>${element.Established}</td>
                <td class="ii" >
                    <a href="historyorder.html?id=${element.SaleID}">${element.SaleID}</a></td>
                <td>${sendt}</td>
                <td>${element.Delivery}</td>
                <td>${sendp}</td>
                <td>${element.Total_Price}</td>
            </tr>
        `;
       
        
    });
    salebody.insertAdjacentHTML('afterbegin', result);
}


function getpro(res){
    console.log(res)
    show__email.innerHTML = res.Email_Address;
    get__name.innerHTML = res.Name;

    getName.value =  res.Name
    getEmail.innerHTML = res.Email_Address
    // getPhone
    // getGender.value = res.Gender
    // getBir.value = res.BirthDay
}



