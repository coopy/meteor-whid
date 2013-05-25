/**
 * Main View
 */

// Show today by default on startup
Meteor.startup(function(){
    Session.set('tasksFilterIsToday', true);
});

// Bind template variable to session variable
Template.main.is_today = function() {
    return Session.equals('tasksFilterIsToday', true);
};
