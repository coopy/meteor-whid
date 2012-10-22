Template.done_tasks.rendered = function(){
    var $handle = $('#drag_handle');
    $('ul.tasks').sortable({
        connectWith: '.tasks',
        // Do not allow sorting of tasks
        cancel:      'li.well',
        axis:        'y',
        update:      function(e) {
            // console.log($handle.siblings());
            var listId = $handle.parent().attr('id');
            console.log(listId);
            if (listId === 'todo_tasks') {
                // The handle was dropped in TODO list. complete some tasks.
                $handle.prevAll().each(function(index, el){
                    console.log(el.id);
                });
            } else {
                // The handle was dropped in DONE list; un-complete some tasks.
                $handle.nextAll().each(function(index, el){
                    console.log(el.id);
                });
            }
        }

    });
};