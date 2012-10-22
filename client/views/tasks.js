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
