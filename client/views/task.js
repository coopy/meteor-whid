var handleCheckboxClick = function(e) {
    var taskId = $(e.target).parent().attr('id');
    Task.complete(taskId);
};

var handleTaskTextClick = function(e) {
    var $target            = $(e.target),
        $parent            = $target.parent(),
        $input             = $('<input type="text" class="edit input-xlarge" autofocus/>'),
        text               = $target.text(),
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

Template.task.events({
    'change .task input[type="checkbox"]': handleCheckboxClick,
    'click .task p': handleTaskTextClick
});