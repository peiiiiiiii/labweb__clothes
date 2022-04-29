let xhr = new XMLHttpRequest();




xhr.onload = function() {
    xhr.send(null);
}

let request = new XMLHttpRequest();
request.onreadystatechange = function(evt) {
    let req = evt.target;
    if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        console.log(req);
    }
};
request.open("GET", "https://apiservice.mol.gov.tw/OdService/doc/v3.json");
request.send(null);