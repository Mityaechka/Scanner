function LoadSettings(onload) {
  chrome.storage.sync.get(["settings"], function (result) {
    if (result.settings == undefined) {
      onload({
        callFunction: false,
        function: "",
        embedHtml: false,
        embedText: true,
        id: "",
        attribute: "",
      });
    } else {
      var settings = JSON.parse(result.settings);
      onload(settings);
    }
  });
}

function SaveSettings(settings) {
  chrome.storage.sync.set({ settings: JSON.stringify(settings) });
}
/**
 *
 * @param {string} barcode
 */
function SendBarcode(barcode) {
  if (!barcode.match(/^[0-9]{13,20}/)) {
    console.error(`${barcode} has incorrect format`);
    return;
  }
  LoadSettings(function (settings) {
    if (settings.callFunction && settings.function != undefined) {
      try {
        location.href = `javascript:${settings.function}('${barcode}'); void 0`;
      } catch (e) {
        console.error(`function ${settings.function} not found`);
      }
    }
    if (settings.embedHtml) {
      var element = document.getElementById(settings.id);
      if (element == null) {
        console.error(`element ${settings.id} not found`);
        return;
      }
      if (settings.embedText) element.innerText = barcode;
      else if (settings.attribute != "") {
        element.removeAttribute(settings.attribute);
        element.setAttribute(settings.attribute, barcode);
      }
    }
  });
}
