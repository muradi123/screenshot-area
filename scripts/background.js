chrome.browserAction.onClicked.addListener(function (){
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {message: "click"})
   
});
})


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
    var canvas = createCanvas(w, h);
    // get the context of your canvas
    var context = canvas.getContext('2d');
    // create a new image object
    var croppedImage = new Image();

    croppedImage.onload = function() {
         
        // this is where you manipulate the screenshot (cropping)
        // parameter 1: source image (screenshot)
        // parameter 2: source image x coordinate
        // parameter 3: source image y coordinate
        // parameter 4: source image width
        // parameter 5: source image height
        // parameter 6: destination x coordinate
        // parameter 7: destination y coordinate
        // parameter 8: destination width
        // parameter 9: destination height
        context.drawImage(croppedImage, x, y, w, h, 0, 0, w, h );

        // canvas.toDataURL() contains your cropped image
        console.log(canvas.toDataURL());
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
        });
        return true;
        }
    });


