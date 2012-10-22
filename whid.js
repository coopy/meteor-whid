// Collections
var Tasks = new Meteor.Collection('Tasks');

if (Meteor.isClient) {
    Template.list.date = function () {
        var d = new Date();
        return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getFullYear();
    };

    Template.list.events({
        'click input[name="add_task"]' : function () {
            // template data, if any, is available in 'this'
            console.log('clickity');
        }
    });

    // Find tasks that have a completedAt timestamp set.
    // @TODO consider using Meteor.renderList instead - http://docs.meteor.com/#meteor_renderlist
    Template.tasks.done_tasks = function() {
        var ptr = Tasks.find({completedAt: {$ne: null}}, {sort: ['createdAt', 'asc']});
        return ptr;
    };

    // Find tasks that do not have a completedAt timestamp set.
    Template.tasks.todo_tasks = function() {
        return Tasks.find({completedAt: null}, {sort: ['createdAt', 'asc']});
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        // TEMP: fixtures
        Tasks.remove({});
        var doneTaskId = Meteor.call('createTask', 'Sample DONE task');
        Meteor.call('completeTask', doneTaskId);
        Meteor.call('createTask', 'First sample TODO task');
        Meteor.call('createTask', 'Second sample TODO task');
    });
}
