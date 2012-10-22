Template.actions.events({
    'click .btn-primary': function(e) {
        $('.tasks .add_task').show();
    },
    'click .btn-danger': function() {
        Tasks.remove({});
    }
});