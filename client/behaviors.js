var $handle,
    $doneEls;

Template.tasks.rendered = function(){
    if (!$handle) {
        $handle = $('#drag_handle');
        $('.tasks').sortable({
            connectWith: '.tasks',
            // Do not allow sorting of tasks
            cancel:      'li.well',
            axis:        'y',
            update:      function(e) {
                if ($handle.next().hasClass('done')) {
                    // Moved back - unComplete some tasks
                    console.log('Handle moved backward');
                    $handle.nextAll('.done').each(function(_i, el){
                        Task.unComplete(el.id);
                    });

                } else {
                    // Complete tasks
                    console.log('Handle moved forward');
                    $handle.prevAll(':not(.done)').each(function(_i, el){
                        Task.complete(el.id);
                    });
                }
            }

        });
    } else if ($('#drag-handle').length === 0) {
        // Template re-rendered, and the handle has been removed
        // @TODO why isn't the handle re-rendered as it is part of the template?
        $doneEls = $('.done');
        if ($doneEls.length > 0) {
            $doneEls.last().after($handle);
        } else {
            $('.tasks .well').first().before($handle);
        }
    }
};