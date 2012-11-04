Meteor.startup(function(){
    Session.set('tasksFilterIsToday', true);
});

Template.main.is_today = function() {
    return Session.equals('tasksFilterIsToday', true);
};
