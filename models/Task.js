// Constructor
var Task = function(text) {
    this.text = text;
    this.createdAt = Date.now();
    this.completedAt = null;
    this.dayId = null;
};


// STATIC

Task.complete = function(id) {
    Meteor.call('completeTask', id);
};

Task.unComplete = function(id) {
    Meteor.call('unCompleteTask', id);
};

if (Meteor.isServer) {
    // Task functionality
    Meteor.methods({
        createTask: function (text) {
            var task = new Task(text);
            task.createdAt = Date.now(); // ms since epoch
            return Tasks.insert(task);
        },
        completeTask: function (taskId) {
            //@TODO try using an instance method task.complete() - does it get server time?
            return Tasks.update({_id: taskId, completedAt: null}, {$set: {completedAt: Date.now()}});
        },
        unCompleteTask: function (taskId) {
            console.log('unCompleting task with id ', taskId);
            //@TODO try using an instance method task.complete() - does it get server time?
            return Tasks.update({_id: taskId, completedAt: {$ne: null}}, {$set: {completedAt: null}});
        }
    });
}
