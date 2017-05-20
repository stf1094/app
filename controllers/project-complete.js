// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

//Save and sync with Katana

function backToDashBoard() {

	Alloy.Globals.Navigator.open("dashboard", args);
}

function navToMyProject() {

	Alloy.Globals.Navigator.open("pd", args);
}

function init() {
	var gargs = require('getArgsValue');
	var projectTitle = gargs.getArgsValue('projectInfo', args);
	var goalTitle = gargs.getArgsValue('goalTitle', args);
	gargs = null;

	$.lblCongrats.text = 'You\'ve just created a project and are one step closer to achieving your goal of:' + projectTitle;
	$.lblGoal.text = goalTitle;

}

init();
