chrome.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
    if (message === "click"){

     
      
      let html = `<strong></strong><span id="start"></span>
                  <strong></strong><span id="end"></span>
                  <div id="selection"></div>
                  `;
                  
       document.body.innerHTML += html;


      var start = {};
      var end = {};
      var isSelecting = false;

    $(window)
      // Listen for selection
     .on('mousedown', function($event) {
        // Update our state
        isSelecting = true;
        $('#selection').removeClass('complete');
        start.x = $event.pageX;
        start.y = $event.pageY;
        // Display data in UI
        $('#start').text('(' + start.x + ',' + start.y + ')');
        
        // Add selection to screen
        $('#selection').css({
            left: start.x,
            top: start.y
        });
    })
    // Listen for movement
    .on('mousemove', function($event) {
        // Ignore if we're not selecing
        if (!isSelecting) { return; }
        
        // Update our state
        end.x = $event.pageX;
        end.y = $event.pageY;
        
        // Move & resize selection to reflect mouse position
        $('#selection').css({
            left: start.x < end.x ? start.x : end.x,
            top: start.y < end.y ? start.y : end.y,
            width: Math.abs(start.x - end.x),
            height: Math.abs(start.y - end.y)
        });
    })
    // listen for end
    .on('mouseup', function($event) {
      var width = Math.abs(start.x - end.x);
      var height  = Math.abs(start.y - end.y);
      var xa = start.x < end.x ? start.x : end.x;
      var ya =  start.y;
      console.log(ya)
       chrome.runtime.sendMessage({
                        handle: 'background',
                        points: [ya, height, xa, width]
                    });
        // Update our state
        isSelecting = false;
        $('#selection').addClass('complete');
        // Display data in UI
        $('#end').text('(' + end.x + ',' + end.y + ')');
        
    });           
  }

});

