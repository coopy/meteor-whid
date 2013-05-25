/**
 * Collections
 */

/**
 * All of the Tasks - completed and pending.
 * @type {Meteor.Collection}
 */
var Tasks = new Meteor.Collection('Tasks');

/**
 * Static enumeration of weekdays
 * @type {array}
 */
Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
