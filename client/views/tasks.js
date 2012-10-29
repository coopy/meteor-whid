var $handle,
    $doneEls,
    now = new Date(),
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    nowTs = now.getTime(),
    todayTs = today.getTime();

//@TODO Why isn't the handle preserved?
// Template.tasks.preserve(['#drag_handle']);

// View event handlers
// *******************

Template.tasks.rendered = function(){
    console.log('done_tasks:',Template.tasks.done_tasks().collection.docs);
    console.log('todo_tasks:',Template.tasks.todo_tasks().collection.docs);
    // Initialize handle
    if (!$handle) {
        $handle = $('#drag_handle');
        $('.tasks').sortable({
            connectWith: '.tasks',
            // Do not allow sorting of tasks
            cancel:      'li.well',
            axis:        'y',
            update:      function(e) {
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

        });
    }
    // Template re-rendered, and the handle has been removed; re-insert it (see line 4).
    $doneEls = $('.done');
    if ($doneEls.length > 0) {
        $doneEls.last().after($handle);
    } else {
        $('.tasks .well').first().before($handle);
    }
};

// View data
// *********

Template.tasks.todays_tasks = function() {
    return Tasks.find({createdAt: {$gt: todayTs}}, {sort: ['createdAt', 'asc']});
};


// Find tasks that have a completedAt timestamp set.
// @TODO consider using Meteor.renderList instead - http://docs.meteor.com/#meteor_renderlist
Template.tasks.done_tasks = function() {
    // var doneTasks = Tasks.find({text: 'Complete'}, {sort: ['createdAt', 'asc']});
    var doneTasks = Tasks.find({completedAt: {$ne: null}}, {sort: ['createdAt', 'asc']});
    // console.log('* done_tasks', doneTasks);
    return doneTasks;
    // return Tasks.find({completedAt: {$ne: null}, createdAt: {$gt: todayTs}}, {sort: ['createdAt', 'asc']});
};

// Find tasks that do not have a completedAt timestamp set.
Template.tasks.todo_tasks = function() {
    var todoTasks = Tasks.find({completedAt: null}, {sort: ['createdAt', 'asc']});
    // var todoTasks = Tasks.find({}, {sort: ['createdAt', 'asc']});
    // console.log('* todo_tasks', todoTasks);
    return todoTasks;
    // return Tasks.find({completedAt: null, createdAt: {$gt: todayTs}}, {sort: ['createdAt', 'asc']});
};
