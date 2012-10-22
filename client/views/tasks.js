var $handle,
    $doneEls,
    now = new Date(),
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    nowTs = now.getTime(),
    todayTs = today.getTime();

//@TODO Why isn't the handle preserved?
Template.tasks.preserve(['#drag_handle']);

// View event handlers
// *******************

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
                        // @TODO remove hard wiring - fire an event with IDs in data instead
                        Task.unComplete(el.id);
                    });

                } else {
                    // Complete tasks
                    console.log('Handle moved forward');
                    $handle.prevAll(':not(.done)').each(function(_i, el){
                        // @TODO remove hard wiring - fire an event with IDs in data instead
                        Task.complete(el.id);
                    });
                }
            }

        });
    } else if ($('#drag-handle').length === 0) {
        // Template re-rendered, and the handle has been removed; re-insert it (see line 4).
        $doneEls = $('.done');
        if ($doneEls.length > 0) {
            $doneEls.last().after($handle);
        } else {
            $('.tasks .well').first().before($handle);
        }
    }
};

// View data
// *********

// Find tasks that have a completedAt timestamp set.
// @TODO consider using Meteor.renderList instead - http://docs.meteor.com/#meteor_renderlist
Template.tasks.done_tasks = function() {
    return Tasks.find({completedAt: {$ne: null}, createdAt: {$gt: todayTs}}, {sort: ['createdAt', 'asc']});
};

// Find tasks that do not have a completedAt timestamp set.
Template.tasks.todo_tasks = function() {
    return Tasks.find({completedAt: null, createdAt: {$gt: todayTs}}, {sort: ['createdAt', 'asc']});
};
