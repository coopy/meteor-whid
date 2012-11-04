var oneDayMs = (1000 * 60 * 60 * 24);
var handleClickNav = function(e) {
    e.preventDefault();
    var $target = $(e.target),
        currentDayTs = Session.get('tasksFilterTs'),
        thisDayTs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
        nextDayTs,
        includeTodos = false;

    // Move timestamp pointer
    if ($target.parent().hasClass('back')) {
        // Navigate back one day
        currentDayTs -= oneDayMs;
    } else if ($target.parent().hasClass('forward') && !$target.parent().hasClass('disabled')) {
        // Navigate one day forward
        currentDayTs += oneDayMs;
    } else {
        // Navigate to today
        currentDayTs = thisDayTs;
    }

    // Bracket the search
    nextDayTs = currentDayTs + oneDayMs;

    // Store filter and timestamp
    Session.set('tasksFilterIsToday', (thisDayTs === currentDayTs));
    Session.set('tasksFilterTs', currentDayTs);
    Session.set('tasksFilter', {completedAt: {$gt: currentDayTs, $lt: nextDayTs, $ne: null}});
};

// Hack because the nav template re-renders, losing state.
// Hence, need to know about state in template.
Template.nav.is_today = function() {
    return Session.equals('tasksFilterIsToday', true);
};

Template.nav.events({
    'click .back': handleClickNav,
    'click .today': handleClickNav,
    'click .forward': handleClickNav
});
