// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var numberOfDailyContacts = 0;
var contactsNumber  =0;
var projectTitle = '';
function init() {

	var gargs = require('getArgsValue');
	var strStartDate = gargs.getArgsValue('startDate', args);
	var strEndDate = gargs.getArgsValue('endDate', args);
	projectTitle = gargs.getArgsValue('projectInfo', args);
	var endDate = new Date(strEndDate);

	contactsNumber = gargs.getArgsValue('contactsNumber', args);

	gargs = null;

	if (strStartDate === '') {
		var d = new Date();
		var yyyy = d.getFullYear();
		var dDay = d.getDay();
		var mMonth = d.getMonth();
		var startDate = new Date();
	} else {
		var startDate = new Date(strStartDate);
	}
	//alert(startDate + '  ' + endDate);
	var gcpd = require('getContactsPerDay');
	numberOfDailyContacts = gcpd.getContactsPerDay(contactsNumber, startDate, endDate);
	$.lblReality.text = 'If you start today, you\'ll have to contact ' + numberOfDailyContacts + ' people per day. Is this correct?';
	gcpd = null;

}

function projectComplete() {
	var pm = require('projectManager');
	pm.addContactsNumberForGoal(projectTitle, contactsNumber);
	pm = null;

	var p = require('projectManager');
	p.addProjectContactsNumberPerDay(projectTitle, numberOfDailyContacts);
	p = null;
	Alloy.Globals.Navigator.open("project-complete", args);
}

function addMoreContacts() {
	Alloy.Globals.Navigator.open("add-contacts", args);
}

function setADifferentStartDate() {
	Alloy.Globals.Navigator.open("start", args);
}

init();
