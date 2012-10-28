// List the titles all done tasks.
// Keep the list updated as new tasks are created.
 // doneFrag = Meteor.renderList(
 //    Tasks.find({completedAt: {$ne: null}}, {sort: ['createdAt', 'asc']}),
 //    function(task) {
 //        var classList = ['well','task','done'],
 //            html;
 //        html =  '<li class="' + classList.join(' ') + '" id="' + task._id + '">';
 //        html += '    <span>' + task.text + '</span>';
 //        html += '    <button class="close">&times;</button>';
 //        html += '</li>';
 //        return html;
 //    });
