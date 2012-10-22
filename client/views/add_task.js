var handleAddTask = function(e){
    var $el = $(e.target),
        text = $el.val();
    Task.create(text);
    $el.val('');
    $el.parent().hide();
};

Template.add_task.events({
    'blur .add_task input': handleAddTask
});