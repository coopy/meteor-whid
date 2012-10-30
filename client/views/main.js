Template.main.is_today = function() {
    return (Session.get('tasksFilterTs') === Session.get('todayTs'));
};
