 
let image = document.querySelector(".cropped-image");

chrome.storage.local.get(['Img'], function(result) {
       image.src = result.Img
  jQuery('.save').attr({
		'href': result.Img,
		'download': 'screenshot.png'
	});
        });
jQuery('.close').click(function(){
		window.close();
	})

