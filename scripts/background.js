chrome.browserAction.onClicked.addListener(function (){
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {message: "click"})
   
});
})

function openNewPage(){
  chrome.tabs.create({'url': chrome.extension.getURL('newPage.html')});
}
chrome.runtime.onMessage.addListener(
    function(msg, sender, sendResponse) {
        if (msg.handle ==='background' && msg.points) {
         var w = msg.points[3];
         var h = msg.points[1];
         var x = msg.points[2];
         var y = msg.points[0];
         // here we create a new image
function createImage(dataURL) {
    // create a canvas
    let canvas = createCanvas(w, h);
    // get the context of your canvas
    let context = canvas.getContext('2d');
    // create a new image object
    let croppedImage = new Image();

    croppedImage.onload = function() {
        context.drawImage(croppedImage, x, y, w, h, 0, 0, w, h );

        canvas.toDataURL();
        //cropped image 
        let croppedimg = canvas.toDataURL();
        
       
      chrome.storage.local.set({Img: croppedimg}, function() {
          console.log(croppedimg);
        });
 
       // var a = document.createElement("a"); //Create <a>
       // a.href = `${croppedimg}`; //Image Base64 Goes here
       // a.download = "Image.png"; //File name Here
       // a.click();
    };
    croppedImage.src = dataURL; // screenshot (full image)
}

// creates a canvas element
function createCanvas(canvasWidth, canvasHeight) {
    var canvas = document.createElement("canvas");
     canvas.width = canvasWidth;
     canvas.height = canvasHeight;
    // size of canvas in pixels
    return canvas;
}

// calling the captureVisibleTab method takes a screenhot
function createScreenshot(callback) {
    // you can have two image formats (jpeg and png)
    // for jpeg use { format: "jpeg", quality: 100 } (you can adjust the jpeg image quality from 0-100) 
    // for png use { format: "png" }
    chrome.tabs.captureVisibleTab(null, { format: "png" }, callback);
}
 createScreenshot(function (dataURL) {
            createImage(dataURL);
            openNewPage();
        });
        return true;

        }
    
    });


