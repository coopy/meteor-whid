/**
 * Date-context-sensitive header View.
 */

Template.header.date = function () {
    var d = new Date(Session.get('tasksFilterTs'));
    return Days[d.getDay()] + ', ' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getFullYear();
};

Template.header.is_today = function() {
    return Session.equals('tasksFilterIsToday', true);
};
