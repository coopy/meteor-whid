/**
 *  "Add Task" View - handles entering a new task and persisting it.
 */

/**
 * Event handler for "Add Task" text input box.
 * Designed to listen for keyup and blur events.
 * Aborts if keycode isn't "Return" or if value is zero-length.
 * @param {object} e Event object
 */
var handleAddTask = function(e){

    // Enter new task if return was pressed, or if this event is blur.
    if (e.type === 'blur' ||
        (e.type === 'keyup' && e.keyCode === 13)) {
        var $el = $(e.target),
            text = $.trim($el.val());

        // Abort on empty string.
        if (text.length === 0) {
            return;
        }

        Task.create(text);

        // Reset UI state
        $el.val('');
    }
};

Template.add_task.events({
    'blur .add_task input': handleAddTask,
    'keyup .add_task input': handleAddTask
});
