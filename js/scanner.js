let barcode = "";
let prevTime = Date.now();
let firstInput = true;

onScan.attachTo(document);

document.addEventListener('scan', function(scancode, iQuantity) {
    SendBarcode(scancode.detail.scanCode);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.barcode) SendBarcode(request.barcode);
});
