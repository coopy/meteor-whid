/**
 * Single Task View
 */

/**
 * Event handler for the "complete/uncomplete task" checkbox control
 * @param {object} e Event object
 */
var handleCheckboxClick = function(e) {
    var $target = $(e.target),
        completed = $target.attr('checked'),
        taskId = $target.parent().attr('id');
    if (completed) {
        Task.complete(taskId);
    } else {
        Task.unComplete(taskId);
    }
};

/**
 * Event handler for task text click event.
 * Lets user edit task text.
 * @param {object} e Event object
 */
var handleTaskTextClick = function(e) {
    var $target            = $(e.target),
        $parent            = $target.parent(),
        $input             = $('<input type="text" class="edit input-xlarge" autofocus/>'),
        text               = $target.text(),
        /**
         * Handle edit end
         * @param {object} editEvent Event object
         */
        handleTaskTextEdit = function(editEvent) {
            var escPressed    = (editEvent.type === 'keyup' && editEvent.keyCode === 27),
                returnPressed = (editEvent.type === 'keyup' && editEvent.keyCode === 13);
            if (editEvent.type === 'blur' || returnPressed || escPressed) {
                $input.remove();
                $parent.append($target);
                if (!escPressed) {
                    // Store new text in DOM and collection
                    text = $input.val();
                    $target.text(text);
                    Tasks.update({_id: $parent.attr('id')}, {$set: {text:text}});
                }
            }
        };
        // Input events
        $input
            .on('blur', handleTaskTextEdit)
            .on('keyup', handleTaskTextEdit);
        // Insert input element
        $input.val(text);
        $target.remove();
        $parent.append($input);
};

/**
 * Event handler for task "close" button.
 * Removes (deletes) a task.
 * @param e
 */
var handleRemoveTask = function(e) {
    var taskId = $(e.target).parent().attr('id');
    Tasks.remove({_id: taskId});
};

Template.task.events({
    'change .task input[type="checkbox"]': handleCheckboxClick,
    'click .task .close': handleRemoveTask,
    'click .task p': handleTaskTextClick
});
