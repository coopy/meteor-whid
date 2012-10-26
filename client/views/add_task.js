var handleAddTask = function(e){

    // Enter new task if return was pressed, or if this event is blur.
    if (e.type === 'blur' || (e.type === 'keyup' && e.keyCode === 13)) {
        var $el = $(e.target),
            text = $.trim($el.val());

        // Abort on empty string.
        if (text.length === 0) {
            return;
        }

        Task.create(text);
        $el.val('');
        $el.parent().hide();
    }
};

Template.add_task.events({
    'blur .add_task input': handleAddTask,
    'keyup .add_task input': handleAddTask
});