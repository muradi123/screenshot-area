chrome.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
    if (message === "click"){
       let html = `<div id="selection"></div>`;        
       document.body.innerHTML += html;

       let start = {};
       let end = {};
       let isSelecting = false;

     $(window)
      // Listen for selection
      .on('mousedown', function($event) {
         document.body.style.pointerEvents = "none";
        // Update our state
        isSelecting = true;
        $('#selection').removeClass('complete');
        start.x = $event.pageX;
        start.y = $event.pageY;
        // Display data in UI
        
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
      document.body.style.pointerEvents = "auto";
      let ya =  start.y;
      let height  =  Math.abs(start.y - end.y);
      let width = Math.abs(start.x - end.x);
      let xa = start.x < end.x ? start.x : end.x;
      
       chrome.runtime.sendMessage({
                        handle: 'background',
                        points: [ya - pageYOffset, height, xa, width]
                    });
        // Update our state
        isSelecting = false;
        $('#selection').addClass('complete');
        $('#end').text('(' + end.x + ',' + end.y + ')');
        document.getElementById('selection').remove();
    });           
  }

});

