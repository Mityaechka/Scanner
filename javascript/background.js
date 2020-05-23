// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         switch (request.type) {
//             case "codeRead":
//                 console.log(request.count);
//                 break;
//             case "saveData":
//                 console.log(request.count);
//                 chrome.storage.sync.set({ "settings": request.count }, function () {
//                     console.log(request.count);
//                 });
//                 break;
//             default:
//                 console.error("Unrecognised message: ", request);
//         }
//     }
// );
