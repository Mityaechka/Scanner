let barcode = "";
let prevTime = Date.now();
let firstInput = true;

document.onkeydown = function (e) {
  let time = Date.now();

  var delta = time - prevTime;

  prevTime = time;
  let code = e.keyCode ? e.keyCode : e.which;
  console.log(String.fromCharCode(code));
  if (!firstInput) {
    if (delta > 20) {
      barcode = "";
    }
  } else {
    firstInput = false;
  }

  if (code == 13 || code == 9) {
    if (barcode != "") {
      SendBarcode(barcode);
      barcode = "";
    }
    firstInput = true;
  } else {
    let key =String.fromCharCode(code);
    if (key.match(/^[0-9a-zA-Z]/))
    barcode = barcode + key;
  }
  
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.barcode) SendBarcode(request.barcode);
});
