// Constructor
Task = function(text) {
    this.text = text;
    this.createdAt = Date.now();
    this.completedAt = null;
};

// STATIC
// Meteor makes it really awkward to use instance methods, since you'd have to
// constantly recreate your instances from serialized documents in collections.
// You can't serialize functions to EJSON. Static methods is the Meteor way.

/**
 * Create a new Task.
 * @param {string} text The task title.
 * @return {number} Task id
 */
Task.create = function(text) {
    var task = new Task(text);
    var id = Tasks.insert(task);
    // Set createdAt using server time
    Meteor.call('setTaskCreatedAt', id);
    return id;
};

/**
 * Complete a task
 * @param {number} id Task id
 */
Task.complete = function(id) {
    Meteor.call('completeTask', id);
};

/**
 * Un-complete a task
 * @param {number} id Task id
 */
Task.unComplete = function(id) {
    Meteor.call('unCompleteTask', id);
};

if (Meteor.isServer) {
    /**
     * Task server-side update methods
     */
    Meteor.methods({
        /**
         * Set createdAt timestamp for a Task
         * @param {number} taskId Task id
         */
        setTaskCreatedAt: function (taskId) {
            return Tasks.update({_id: taskId},
                {$set: {createdAt: Date.now()}});
        },
        /**
         * Complete task with _id `taskId`, if it doesn't have `completedAt` set.
         * @param {number} taskId
         */
        completeTask: function (taskId) {
            Tasks.update({_id: taskId, completedAt: null},
                {$set: {completedAt: Date.now()}});
        },
        /**
         * Uncomplete task with _id `taskId`, if it has `completedAt` set.
         * @param {number} taskId
         */
        unCompleteTask: function (taskId) {
            Tasks.update({_id: taskId, completedAt: {$ne: null}},
                {$set: {completedAt: null}});
        }
    });
}
