// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function showDTPicker() {
	var dtp = require('getDTPicker');
	dtp.getDTPicker($.winDeadline, $.txtEndDate);
	dtp = null;
}

function confirmContacts() {

	if ($.txtEndDate.value === '') {
		alert('Please enter a deadline.');
	} else {

		var gargs = require('getArgsValue');
		var strStartDate = gargs.getArgsValue('startDate', args);
		var strEndDate = gargs.getArgsValue('endDate', args);
		var projectTitle = gargs.getArgsValue('projectInfo', args);
		var goalTitle = gargs.getArgsValue('goalTitle', args);
		gargs = null;
		if (strStartDate === '') {
			var startDate = new Date();
		} else {
			var startDate = new Date(strStartDate);
		}

		var p = require('projectManager');
		addSuccess = p.updateGoals(projectTitle, goalTitle, '', startDate, $.txtEndDate.value);
		p = null;

		var margs = require('manageArgs');
		args = margs.manageArgs('endDate', $.txtEndDate.value, args);
		margs = null;

		Alloy.Globals.Navigator.open("confirm-contacts", args);
	}

}

