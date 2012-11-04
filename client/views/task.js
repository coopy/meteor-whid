var handleCheckboxClick = function(e) {
    var taskId = $(e.target).parent().attr('id');
    Task.complete(taskId);
};

Template.task.events({
    'change .task input[type="checkbox"]': handleCheckboxClick
});