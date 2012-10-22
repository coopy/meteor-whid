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
    Template.done_tasks.tasks = function() {
        var ptr = Tasks.find({
            completedAt: {
                $ne: null
            }
        });
        console.log(ptr);
        return ptr;
    };

    // Find tasks that do not have a completedAt timestamp set.
    Template.todo_tasks.tasks = function() {
        return Tasks.find({
            completedAt: null
        });
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        // TEMP: fixtures
        Tasks.remove({});
        Meteor.call('createTask', 'First sample TODO task');
        Meteor.call('createTask', 'Second sample TODO task');
        var doneTaskId = Meteor.call('createTask', 'Sample DONE task');
        Meteor.call('completeTask', doneTaskId);
    });

    // Add functionality
    Meteor.methods({
        createTask: function (text) {
            var task = new Task(text);
            task.createdAt = Date.now(); // ms since epoch
            return Tasks.insert(task);
        },
        completeTask: function (taskId) {
            //@TODO try using an instance method task.complete() - does it get server time?
            return Tasks.update({_id: taskId}, {$set: {completedAt: Date.now()}});
        }
    });
}


