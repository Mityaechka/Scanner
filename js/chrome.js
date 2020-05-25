function LoadSettings(onload) {
  chrome.storage.sync.get(["settings"], function (result) {
    if (result.settings == undefined) {
      onload({
        callFunction: false,
        function: "",
        embedHtml: false,
        embedText: "text",
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
  if (!barcode.match(/^[0-9a-zA-Z]{10,20}/)) {
    console.error(`Barcode "${barcode}" has incorrect format`);
    return;
  }
  LoadSettings(function (settings) {
    if (settings.callFunction && settings.function != undefined) {
      try {
        location.href = `javascript:${settings.function}('${barcode}'); void 0`;
      } catch (e) {
        console.error(`Function ${settings.function} not found`);
      }
    }
    if (settings.embedHtml) {
      var element = document.getElementById(settings.id);
      if (element == null) {
        console.error(`Element "${settings.id}" not found`);
        return;
      }
      switch (settings.embedText) {
        case "text":
          element.innerText = barcode;
          break;
        case "value":
          element.value = barcode;
          break;
        case "attribute":
          element.removeAttribute(settings.attribute);
          element.setAttribute(settings.attribute,barcode);
          break;
      }
    }
  });
}
