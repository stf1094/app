// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var args = [];

var projectType = 'PER';

function createNew() {
	if ($.TextField_1.value.trim() === '') {
		alert('Please enter a project name');
	} else if (projectType === '') {
		alert('Please select a project type');
	} else {
		var margs = require('manageArgs');
		args = margs.manageArgs('projectInfo', $.TextField_1.value, args);
		args = margs.manageArgs('projectType', projectType, args);
		margs = null;

		//Manage project global
		var addSuccess = false;
		var p = require('projectManager');
		addSuccess = p.addProject($.TextField_1.value,projectType);
		p = null;

		if (addSuccess === true) {
			//Alloy.Globals.project.push($.TextField_1.value + '(' + projectType + ')');
			Alloy.Globals.Navigator.open("create-goal", args);
		}

	}
}

function personal() {
	$.btnPersonal.backgroundColor = '#8dc63f';
	$.btnProf.backgroundColor = "#ffffff";
	projectType = 'PER';
}

function prof() {
	$.btnProf.backgroundColor = '#8dc63f';
	$.btnPersonal.backgroundColor = "#ffffff";
	projectType = 'PRO';

}
