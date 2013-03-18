// Constructor
var Task = function(text) {
    this.text = text;
    this.createdAt = Date.now();
    this.completedAt = null;
    this.dayId = null;
};


// STATIC

Task.create = function(text) {
    var task = new Task(text);
    var id = Tasks.insert(task);
    Meteor.call('setTaskCreatedAt', id, function(){});
    return id;
};

Task.complete = function(id) {
    Meteor.call('completeTask', id);
};

Task.unComplete = function(id) {
    Meteor.call('unCompleteTask', id);
};

if (Meteor.isServer) {
    // Task functionality
    Meteor.methods({
        setTaskCreatedAt: function (taskId) {
            return Tasks.update({_id: taskId},
                                {$set: {createdAt: Date.now() - 100000}});
        },
        completeTask: function (taskId) {
            //@TODO try using an instance method task.complete() - does it get server time?
            return Tasks.update({_id: taskId, completedAt: null},
                                {$set: {completedAt: Date.now()}});
        },
        unCompleteTask: function (taskId) {
            //@TODO try using an instance method task.complete() - does it get server time?
            return Tasks.update({_id: taskId, completedAt: {$ne: null}},
                                {$set: {completedAt: null}});
        }
    });
}
