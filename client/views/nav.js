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

    // Include any undone task in today's view
    if (currentDayTs === thisDayTs) {
        includeTodos = true;
    }

    // Bracket the search
    nextDayTs = currentDayTs + oneDayMs;

    // Store filter and timestamp
    Session.set('tasksFilterTs', currentDayTs);

    if (includeTodos) {
        Session.set('tasksFilter', {$or: [{createdAt: {$gt: currentDayTs, $lt: nextDayTs}}, {completedAt: null}]});
    } else {
        Session.set('tasksFilter', {createdAt: {$gt: currentDayTs, $lt: nextDayTs}, completedAt: {$ne: null}});
    }
};

// Hack because the nav template re-renders, losing state.
// Hence, need to know about state in template.
Template.nav.is_today = function() {
    return Session.equals('tasksFilterTs', new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime());
};

Template.nav.events({
    'click .back': handleClickNav,
    'click .today': handleClickNav,
    'click .forward': handleClickNav
});
