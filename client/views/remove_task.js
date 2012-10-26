//
// Removes a task when the close button is clicked.
//

var handleRemoveTask = function(e) {
    var taskId = $(e.target).parent().attr('id');
    Tasks.remove({_id: taskId});
};

Template.task.events({
    'click .task .close': handleRemoveTask
});