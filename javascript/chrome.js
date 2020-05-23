function LoadSettings(onload) {
  chrome.storage.sync.get(["settings"], function (result) {
    var settings = JSON.parse(result.settings);
    onload(settings);
  });
}

function SaveSettings(settings) {
  chrome.storage.sync.set({ settings: JSON.stringify(settings) });
}
function SendBarcode(barcode) {
  LoadSettings(function (settings) {
    if (settings.callFunction && settings.function != undefined)
      location.href = `javascript:${settings.function}('${barcode}'); void 0`;

    if (settings.embedHtml) {
      var element = document.getElementById(settings.id);
      if (element == null) return;
      if (settings.embedText) element.innerText = barcode;
      else {
        element.removeAttribute(settings.attribute);
        element.setAttribute(settings.attribute, barcode);
      }
    }
  });
}
