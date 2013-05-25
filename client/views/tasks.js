/**
 * Task list View
 */

var now = new Date(),
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    todayTs = today.getTime();

Session.set('todayTs', todayTs);
Session.set('tasksFilterTs', todayTs);

// View data
// *********

var gettasksFilter = function() {
    if (Session.equals('tasksFilter', undefined)) {
        return {completedAt: {$gt: todayTs}};
    }
    return Session.get('tasksFilter');
};

Template.tasks.incomplete_tasks = function() {
    var tasks = Tasks.find({completedAt: null}, {sort: {'createdAt': 1}});
    return tasks;
};

Template.tasks.complete_tasks = function() {
    var tasks = Tasks.find(gettasksFilter(), {sort: {'completedAt': 1}});
    return tasks;
};

Template.tasks.is_today = function() {
    return Session.equals('tasksFilterIsToday', true);
};
