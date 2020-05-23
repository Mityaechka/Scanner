let barcode = "";
let prevTime;
let firstInput = true;

document.onkeydown = function (e) {
  let time = Date.now();

  if (prevTime != undefined) {
    var delta = time - prevTime;

    console.log(delta);

    prevTime = time;

    if (!firstInput && delta > 20) {
      barcode = "";
      return;
    } else {
      firstInput = false;
    }
  } else {
    prevTime = time;
    firstInput = false;
    barcode = "";
  }

  let code = e.keyCode ? e.keyCode : e.which;

  if (code == 13 || code == 9) {
    SendBarcode(barcode);
    barcode = "";
    firstInput = true;
  } else {
    barcode = barcode + String.fromCharCode(code);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  SendBarcode(request);
});
