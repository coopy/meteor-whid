// Constructor
var Task = function(text) {
    this.text = text;
    this.createdAt = Date.now();
    this.completedAt = null;
    this.dayId = null;
};

// // Complete a task
// Task.prototype.complete = function() {
//     this.completedAt = Date.now();
// };


