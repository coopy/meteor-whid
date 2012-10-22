Template.main.date = function () {
    var d = new Date();
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getFullYear();
};

Template.main.events({
    'click input[name="add_task"]' : function () {
        // template data, if any, is available in 'this'
        console.log('clickity');
    }
});
