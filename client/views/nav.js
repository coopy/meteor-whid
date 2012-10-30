var oneDayMs = (1000 * 60 * 60 * 24);
var handleClickNav = function(e) {
    var $target = $(e.target),
        currentDayTs = Session.get('tasksFilterTs'),
        thisDayTs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
        nextDayTs,
        includeTodos = false;

    // Remove selected marker
    $('#nav a').removeClass('selected');

    // Move timestamp pointer
    if ($target.hasClass('back')) {
        currentDayTs -= oneDayMs;
    } else if ($target.hasClass('forward')) {
        currentDayTs += oneDayMs;
    } else {
        currentDayTs = thisDayTs;
        includeTodos = true;
    }
    // Bracket the search
    nextDayTs = currentDayTs + oneDayMs;
    // Store stuff
    if (includeTodos) {
        Session.set('tasksFilter', {$or: [{createdAt: {$gt: currentDayTs, $lt: nextDayTs}}, {completedAt: null}]});
    } else {
        Session.set('tasksFilter', {createdAt: {$gt: currentDayTs, $lt: nextDayTs}, completedAt: {$ne: null}});
    }
    Session.set('tasksFilterTs', currentDayTs);

    // Select clicked link
    $target.addClass('selected');
};

Template.nav.events({
    'click .back': handleClickNav,
    'click .today': handleClickNav,
    'click .forward': handleClickNav
});