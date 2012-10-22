Template.main.date = function () {
    var d = new Date();
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getFullYear();
};