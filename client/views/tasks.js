var $handle,
    $doneEls,
    $todoEls,
    now = new Date(),
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    nowTs = now.getTime(),
    todayTs = today.getTime();

Session.set('todayTs', todayTs);
Session.set('tasksFilterTs', todayTs);

// View event handlers
// *******************

Template.tasks.rendered = function(){
    // Initialize handle
    if (!$handle) {
        // Dynamically render handle
        $handle = $(Template.handle());
    } else if ($('.tasks #handle').length === 0 && Session.equals('tasksFilterTs', todayTs)) {
        // Template re-rendered, and the handle has been removed (meteor clears the <ul/>); re-insert it.
        $doneEls = $('.done');
        $todoEls = $('.todo');
        if ($doneEls.length > 0) {
            $doneEls.last().after($handle);
        } else if ($todoEls.length > 0) {
            $('.tasks .well').first().before($handle);
        }
    }

    // Make the handle sortable within the tasks.
    $('.tasks').sortable({
        // Do not allow sorting of tasks
        cancel:      'li.well',
        axis:        'y',
        update:      Handle.update
    });
};

// View data
// *********

var gettasksFilter = function() {
    if (Session.equals('tasksFilter', undefined)) {
        return {$or: [{createdAt: {$gt: todayTs}}, {completedAt: null}]};
    }
    return Session.get('tasksFilter');
};

Template.tasks.todays_tasks = function() {
    return Tasks.find(gettasksFilter(), {sort: [['createdAt', 'asc'],['completedAt', 'asc']]});
};
