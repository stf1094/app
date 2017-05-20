// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function getStartDate() {
	var dtp = require('getDTPicker');
	dtp.getDTPicker($.start, $.txtDate);
	dtp = null;
}

function navNext() {
	if ($.txtDate.value === '') {
		alert('Please enter a start date.');
	} else {

		var gargs = require('getArgsValue');
		var strEndDate = gargs.getArgsValue('endDate', args);
		var projectTitle = gargs.getArgsValue('projectInfo', args);
		var goalTitle = gargs.getArgsValue('goalTitle', args);
		gargs = null;

		var p = require('projectManager');
		addSuccess = p.updateGoals(projectTitle, goalTitle, '', $.txtDate.value, strEndDate);
		p = null;

		var margs = require('manageArgs');
		args = margs.manageArgs('startDate', $.txtDate.value, args);
		margs = null;

		Alloy.Globals.Navigator.open("confirm-contacts", args);
	}
}