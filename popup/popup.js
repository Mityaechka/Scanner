document.addEventListener("DOMContentLoaded", function () {
  let idValueInput = document.getElementById("idValue");
  let attributeValueInput = document.getElementById("attributeValue");

  let idValueDiv = document.getElementById("idValueDiv");
  let attributeValueDiv = document.getElementById("attributeValueDiv");

  let saveBtn = document.getElementById("saveBtn");

  let embedHtmlInput = document.getElementById("embedHtml");
  let embedTextInput = document.getElementById("embedText");

  let settings;

  let callFunctionValueInput = document.getElementById("callFunction");

  let functionValueInput = document.getElementById("functionValue");
  let functionValueDiv = document.getElementById("functionValueDiv");

  let sendBarcodeBtn = document.getElementById("sendBarcode");
  let barcodeInput = document.getElementById("barcode");
  LoadSettings(function (s) {
    settings = s;
    idValueInput.value = settings.id;
    embedHtmlChanged(settings.embedHtml);
    attributeValueInput.value = settings.attribute;
    embedTextChanged(settings.embedText);
    functionValueInput.value = settings.function;
    callFunctionChanged(settings.callFunction);
  });

  saveBtn.addEventListener("click", Save);
  sendBarcodeBtn.addEventListener("click", function () {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { barcode: barcodeInput.value });
      });
    });
  });

  embedHtmlInput.addEventListener("click", function () {
    settings.embedHtml = !settings.embedHtml;
    embedHtmlChanged(settings.embedHtml);
  });

  embedTextInput.onchange= function () {
    settings.embedText = embedTextInput.value;
    embedTextChanged(settings.embedText);
  };
  callFunctionValueInput.addEventListener("click", function () {
    settings.callFunction = !settings.callFunction;
    callFunctionChanged(settings.callFunction);
  });
  function embedHtmlChanged(state) {
    embedHtmlInput.checked = state;
    if (state) {
      idValueDiv.hidden = false;
    } else {
      idValueDiv.hidden = true;
    }
  }
  function embedTextChanged(state) {
    embedTextInput.value = state;
    if (state=="attribute") {
      attributeValueDiv.hidden = false;
    } else {
      attributeValueDiv.hidden = true;
    }
  }
  function callFunctionChanged(state) {
    callFunctionValueInput.checked = state;
    if (state) {
      functionValueDiv.hidden = false;
    } else {
      functionValueDiv.hidden = true;
    }
  }
  function Save() {
    var data = {};

    data.callFunction = callFunctionValueInput.checked;
    data.function = functionValueInput.value;

    data.embedHtml = embedHtmlInput.checked;
    data.embedText = embedTextInput.value;
    data.id = idValueInput.value;
    data.attribute = attributeValueInput.value;

    SaveSettings(data);
  }
});

// var showInit = document.getElementById("showInit");
//     showInit.checked = settings.showInit;
