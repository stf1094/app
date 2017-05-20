// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var goalStartDate = '';
var goalEndDate = '';
var goalTitle = '';
var goalData = [];
var taskData = [];
var projectTitle = '';
var projectType = '';
var goalTitle = '';

function init() {

	//Add code to change the properties of the nav window back button.
	var navCtrl = require('overrideNavigation');

	navCtrl.overrideNavigation($.Window_1, args, 'Dashboard', 'dashboard');
	navCtrl = null;

	var gargs = require('getArgsValue');
	projectTitle = gargs.getArgsValue('projectInfo', args);
	projectType = gargs.getArgsValue('projectType', args);
	goalTitle = gargs.getArgsValue('goalTitle', args);
	gargs = null;
	loadGoalData(projectTitle);
	$.txtPDProjectName.text = projectTitle;
	$.lblGoal.text = goalTitle;

	loadWaitingToHear();
	loadYes();
	loadNo();
}

function loadWaitingToHear() {

	//var p = require('projectManager');
	//p.addProjectContactsPerDay($.txtPDProjectName.text);
	//p = null;

	var isCorrectProject = false;

	var data = [];

	var numberForGoal = 0;

	for (var i = 0; i < Alloy.Globals.nnContactsNumberForGoal.length; i++) {

		if (Alloy.Globals.nnContactsNumberForGoal[i] != undefined) {
			if (Alloy.Globals.nnContactsNumberForGoal[i].projectName === projectTitle) {
				numberForGoal = Alloy.Globals.nnContactsNumberForGoal[i].contactsNumberForGoal;
				var gcpd = require('getContactsPerDay');
				var startDate = new Date(goalStartDate);
				var endDate = new Date(goalEndDate);

				numberOfDailyContacts = gcpd.getContactsPerDay(numberForGoal, startDate, endDate);
				gcpd = null;
				//Alloy.Globals.nnProjectContactNumberPerDay
				var p = require('projectManager');
				////Ti.API.info('PD.xml addProjectContactsNumberPerDay: ' + projectTitle + '|' + numberOfDailyContacts);
				p.addProjectContactsNumberPerDay(projectTitle, numberOfDailyContacts);
				//Ti.API.info('PD.xml addProjectContactsPerDay: ' + projectTitle);
				p.addProjectContactsPerDay(projectTitle, numberOfDailyContacts);
				p = null;
				break;
			}
		}
	}

	for (var i = 0; i < Alloy.Globals.nnProjectContactsPerDay.length; i++) {

		if (Alloy.Globals.nnProjectContactsPerDay[i].projectName === $.txtPDProjectName.text) {
			isCorrectProject = true;

			//if (Alloy.Globals.nnProjectContactsPerDay[i].fullName != undefined) {

				data.push({

					properties : {
						title : Alloy.Globals.nnProjectContactsPerDay[i].fullName,
						contactJSON : Alloy.Globals.nnProjectContactsPerDay[i].contactJSON,
						color : 'black',
						itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					}
				});
			//}
		}

	}
	if (isCorrectProject === true) {
		$.lsWaitingToHear.setItems(data);
	}
	//}

}

function loadYes() {
	var isCorrectProject = false;

	var data = [];

	if (Alloy.Globals.nnProjectContactsYes.length > 0) {
		for (var i = 0; i < Alloy.Globals.nnProjectContactsYes.length; i++) {

			if (Alloy.Globals.nnProjectContactsYes[i].projectName === $.txtPDProjectName.text) {
				isCorrectProject = true;

				data.push({

					properties : {
						title : Alloy.Globals.nnProjectContactsYes[i].fullName,
						contactJSON : Alloy.Globals.nnProjectContactsPerDay[i].contactJSON,
						color : 'black',
						itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK
					}
				});
			}

		}
		if (isCorrectProject === true) {
			$.lsYes.setItems(data);
		}
	}
}

function loadNo() {
	var isCorrectProject = false;

	var data = [];

	if (Alloy.Globals.nnProjectContactsNo.length > 0) {
		for (var i = 0; i < Alloy.Globals.nnProjectContactsNo.length; i++) {

			if (Alloy.Globals.nnProjectContactsNo[i].projectName === $.txtPDProjectName.text) {
				isCorrectProject = true;

				data.push({

					properties : {
						title : Alloy.Globals.nnProjectContactsNo[i].fullName,
						contactJSON : Alloy.Globals.nnProjectContactsPerDay[i].contactJSON,
						color : 'black',
						itemId : i,
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					}
				});
			}

		}
		if (isCorrectProject === true) {
			$.lsNo.setItems(data);
		}
	}
}

function loadGoalData(pt) {
	var isCorrectProject = false;
	if (Alloy.Globals.nnGoals.length > 0) {
		for (var i = 0; i < Alloy.Globals.nnGoals.length; i++) {

			if (Alloy.Globals.nnGoals[i].projectName === pt) {
				isCorrectProject = true;
				//data[i].projectName, data[i].goalName, data[i].goalDesc, data[i].startDate, data[i].endDate, data[i].numberOfContacts);
				$.lblGoal.text = Alloy.Globals.nnGoals[i].goalName;
				goalStartDate = Alloy.Globals.nnGoals[i].startDate;
				goalEndDate = Alloy.Globals.nnGoals[i].endDate;
				goalTitle = Alloy.Globals.nnGoals[i].goalName;
				$.txtPDProjectName.text = pt;
				projectTitle = pt;
				return;
			}

		}

	}

}

init();

function projectContacts() {
	var margs = require('manageArgs');
	args = margs.manageArgs('isProjectContactsFromPD', "true", args);
	args = margs.manageArgs('projectInfo', $.txtPDProjectName.text, args);

	margs = null;
	Alloy.Globals.Navigator.open("add-contacts", args);

}

function projectHotlist() {
	var margs = require('manageArgs');
	args = margs.manageArgs('isProjectContactsFromPD', "true", args);
	args = margs.manageArgs('hot-list', $.txtPDProjectName.text, args);

	margs = null;
	Alloy.Globals.Navigator.open("hot-list", args);
}

function onItemClick(e) {

	//defaultProjectGoal = Alloy.Globals.nnGoals[parseInt(e.itemId)].goalName;
	//alert(defaultProjectGoal);
	//loadTaskList();

}

function onItemClickWTH(e) {
	var jsonString = Alloy.Globals.nnProjectContactsPerDay[parseInt(e.itemId)].contactJSON;

	var _args = jsonString || {};
	_args['projectName'] = projectTitle;
	//$.txtPDProjectName.text;
	Alloy.Globals.Navigator.open("profile", _args);
}

function onItemClickYES(e) {
	//alert(Alloy.Globals.nnProjectContacts[parseInt(e.itemId)].contactJSON);

	var _args = Alloy.Globals.nnProjectContactsYes[parseInt(e.itemId)].contactJSON || {};
	_args['projectName'] = projectTitle;
	//$.txtPDProjectName.text;
	Alloy.Globals.Navigator.open("profile", _args);
}

function onItemClickNO(e) {
	//alert(Alloy.Globals.nnProjectContacts[parseInt(e.itemId)].contactJSON);

	var _args = Alloy.Globals.nnProjectContactsNo[parseInt(e.itemId)].contactJSON || {};
	_args['projectName'] = projectTitle;
	//$.txtPDProjectName.text;
	Alloy.Globals.Navigator.open("profile", _args);
}

