// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var _args = arguments[0] || {};
var followupWith = '';
var userJSON = '';
function getFollowUpDate() {
	var dtp = require('getDTPicker');
	dtp.getDTPicker($.contactFollowup, $.txtFollowupDate);
	dtp = null;
}

function gotoProfile() {
	Alloy.Globals.Navigator.open("profile", args);
}

function saveEvent() {

	if ($.txtFollowupDate.value === '') {
		alert('Please select a follow-up date.');
		return;
	} else {

		var dt = new Date($.txtFollowupDate);
		var theDate = dt;
		//std.stringToDate($.txtFollowupDate, 'MM/dd/yyyy', '/');
		//alert(dt);
		var ce = require('addCalendarEvents');
		ce.addCalendarEvents('Network Ninjas: Follow up with: ' + _args.firstName + " " + _args.lastName, 'You have an appointment with ' + _args.firstName + " " + _args.lastName, 'The Dojo', theDate, theDate);
		ce = null;
		alert('Event saved');
		_args['followUpDate'] =   $.txtFollowupDate.value;
		Alloy.Globals.Navigator.open("profile", _args);
	}
}

function init() {
	var gargs = require('manageArgs');
	followupWith = gargs.getArgsValue('followupWith', args);
	alert(followupWith);
	userJSON = gargs.getArgsValue('userJSON', args);
	gargs = null;

}

