// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// Handle the date time pickers
var d = new Date();
var yyyy = d.getFullYear();
var dDay = d.getDay();
var mMonth = d.getMonth();

//Read passed in args
var gargs = require('getArgsValue');
var projectTitle = gargs.getArgsValue('projectInfo', args);

gargs = null;



function init() {

}

init();
function createNew() {
	if ($.txtGoalName.value.trim() === '') {
		alert('Please enter a project goal');
	} else {
		var startDate =     new Date(yyyy, mMonth, dDay);
		var margs = require('manageArgs');
		args = margs.manageArgs('goalStartDate', startDate, args);
		args = margs.manageArgs('goalEndDate','', args);
		args = margs.manageArgs('goalTitle', $.txtGoalName.value, args);
		margs = null;

		//Manage project global
		var addSuccess = false;
		var p = require('projectManager');
		
		addSuccess = p.addGoals(projectTitle, $.txtGoalName.value, '', startDate,  '');
		
		p = null;

		if (addSuccess === true) {
			
			Alloy.Globals.Navigator.open("contacts-number", args);
		}
	}
}

function setStartDate() {
	$.Window_1.add(startDatePicker);
}

function setEndDate() {
	$.Window_1.add(endDatePicker);
}

