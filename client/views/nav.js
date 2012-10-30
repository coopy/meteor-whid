var oneDayMs = (1000 * 60 * 60 * 24);
var handleClickNav = function(e) {
    e.preventDefault();
    var $target = $(e.target),
        currentDayTs = Session.get('tasksFilterTs'),
        thisDayTs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(),
        nextDayTs,
        includeTodos = false;

    // Move timestamp pointer
    if ($target.hasClass('back')) {
        // Navigate back one day
        $('#nav .forward').removeClass('noclick');
        currentDayTs -= oneDayMs;

    } else if ($target.hasClass('forward')) {
        // Disallow navigating to the future (Until there is logic to render future tasks properly)
        if (currentDayTs === thisDayTs) {
            return;
        }
        // Navigate one day forward
        currentDayTs += oneDayMs;

    } else {
        // Navigate to today
        currentDayTs = thisDayTs;
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

    // Remove selected marker
    $('#nav a').removeClass('selected');
    // Select clicked link
    $target.addClass('selected');
};

Template.nav.events({
    'click .back': handleClickNav,
    'click .today': handleClickNav,
    'click .forward': handleClickNav
});

Template.nav.rendered = function() {
    // Default: no forward movement
    $('#nav .forward').addClass('noclick');
};