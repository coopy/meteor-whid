// **********************
// Handle is a singleton.
// **********************

var Handle = {
    update: function(){
        // Figure out which direction handle moved
        if ($handle.next().hasClass('done')) {
            // Moved back - unComplete some tasks
            $handle.nextAll('.done').each(function(_i, el){
                // @TODO remove hard wiring - fire an event with IDs in data instead
                Task.unComplete(el.id);
            });

        } else {
            // Complete tasks
            $handle.prevAll(':not(.done)').each(function(_i, el){
                // @TODO remove hard wiring - fire an event with IDs in data instead
                Task.complete(el.id);
            });
        }
    }
};