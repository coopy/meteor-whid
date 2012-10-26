var handleAddTask = function(e){
    var $el = $(e.target),
        text = $.trim($el.val());
    if (text.length > 0) {
        Task.create(text);
        $el.val('');
        $el.parent().hide();
    }
};

Template.add_task.events({
    'blur .add_task input': handleAddTask
});